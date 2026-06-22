import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { bookingPayloadSchema } from "@/lib/booking/schema";
import {
  BASE_AMOUNT_CENTS,
  CURRENCY,
  computeTotal,
} from "@/lib/stripe/pricing";
import { getStripe, isStripeConfigured } from "@/lib/stripe/server";
import { createServiceClient } from "@/lib/supabase/server";
import { hasRealSupabase } from "@/lib/auth/preview";

/**
 * POST /api/stripe/checkout -- the booking submit handler.
 *
 * Flow:
 *   1. Validate the booking payload (zod). The client sends extra KEYS, never
 *      prices.
 *   2. Recompute the total SERVER-SIDE from pricing.ts (the only trusted total).
 *   3. Insert an `orders` row (status 'pending') via the service-role client so
 *      the order exists before payment and the webhook can reconcile by id.
 *   4. Create a Stripe Checkout Session (base + selected extras as line items,
 *      AUD, customer_email, metadata.order_id, success/cancel URLs).
 *   5. Return the session URL for the client to redirect to.
 *
 * GRACEFUL DEGRADATION: when Stripe is not configured (placeholder keys, a
 * flagged client decision), this returns 503 with a clear code the Pay button
 * renders as a dev-only "payments not configured" state -- it never throws a 500.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function siteOrigin(request: NextRequest): string {
  // On localhost the request origin is correct; in deploy NEXT_PUBLIC_SITE_URL
  // is the canonical origin for the Stripe return URLs.
  return process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  // --- Config gate: degrade gracefully when Stripe is not provisioned ---------
  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        error: "payments_not_configured",
        message:
          "Payments are not configured in this environment. Add real Stripe keys to enable checkout.",
      },
      { status: 503 },
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "payments_not_configured" },
      { status: 503 },
    );
  }

  // --- 1. Validate the payload -----------------------------------------------
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { error: "invalid_json", message: "Could not read the booking details." },
      { status: 400 },
    );
  }

  const parsed = bookingPayloadSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_payload", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const booking = parsed.data;

  // --- 2. Recompute the total server-side (never trust the client) -----------
  const total = computeTotal(booking.extras);

  // --- 3. Insert the pending order (service role; bypasses RLS) ---------------
  // Stored extras as a jsonb array of {key,label,amount_cents} so the receipt
  // and confirmation can render without re-deriving from keys.
  const extrasJson = total.extras.map((e) => ({
    key: e.key,
    label: e.name,
    amount_cents: e.amountCents,
  }));

  let orderId: string | null = null;

  if (hasRealSupabase()) {
    try {
      const supabase = createServiceClient();
      const { data, error } = await supabase
        .from("orders")
        .insert({
          email: booking.email,
          status: "pending",
          base_amount_cents: BASE_AMOUNT_CENTS,
          extras: extrasJson,
          total_amount_cents: total.totalCents,
          currency: CURRENCY,
          wedding_date: booking.weddingDate,
          partner_name: booking.partnerName,
          mobile: booking.mobile,
          suburb: booking.suburb,
          preferred_contact: booking.preferredContact,
          celebrant_name: booking.celebrantNotChosen ? null : booking.celebrantName || null,
          celebrant_email: booking.celebrantNotChosen ? null : booking.celebrantEmail || null,
          celebrant_phone: booking.celebrantNotChosen ? null : booking.celebrantPhone || null,
          ceremony_location: booking.ceremonyLocation || null,
        })
        .select("id")
        .single();

      if (error || !data) {
        return NextResponse.json(
          { error: "order_create_failed", message: "We could not start your booking. Please try again." },
          { status: 500 },
        );
      }
      orderId = data.id as string;
    } catch {
      return NextResponse.json(
        { error: "order_create_failed" },
        { status: 500 },
      );
    }
  }

  // --- 4. Create the Checkout Session ----------------------------------------
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      quantity: 1,
      price_data: {
        currency: CURRENCY,
        unit_amount: BASE_AMOUNT_CENTS,
        product_data: {
          name: "Wedding Mates package",
          description: "The Wedding Ceremony Blueprint, onboarding, and the legals handled.",
        },
      },
    },
    ...total.extras.map((e) => ({
      quantity: 1,
      price_data: {
        currency: CURRENCY,
        unit_amount: e.amountCents,
        product_data: { name: e.name, description: e.description },
      },
    })),
  ];

  const origin = siteOrigin(request);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      currency: CURRENCY,
      customer_email: booking.email,
      // The webhook reconciles by order_id; the session id is stored on success.
      metadata: {
        order_id: orderId ?? "",
        full_name: booking.fullName,
        partner_name: booking.partnerName,
      },
      payment_intent_data: {
        metadata: { order_id: orderId ?? "" },
      },
      success_url: `${origin}/book/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/book?step=6&canceled=1`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "session_no_url" },
        { status: 502 },
      );
    }

    // Persist the session id on the pending order so the webhook is idempotent
    // on stripe_session_id and the confirmation page can look the order up.
    if (orderId && hasRealSupabase()) {
      try {
        const supabase = createServiceClient();
        await supabase
          .from("orders")
          .update({ stripe_session_id: session.id })
          .eq("id", orderId);
      } catch {
        // Non-fatal: the webhook also stores the session id by metadata.order_id.
      }
    }

    return NextResponse.json({ url: session.url, orderId });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Stripe session creation failed.";
    return NextResponse.json(
      { error: "stripe_error", message },
      { status: 502 },
    );
  }
}
