import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getStripe, isWebhookConfigured } from "@/lib/stripe/server";
import { createServiceClient } from "@/lib/supabase/server";
import { hasRealSupabase } from "@/lib/auth/preview";
import { computeTotal } from "@/lib/stripe/pricing";
import { orderRefFromId } from "@/lib/booking/order";
import { sendBookingEmails } from "@/lib/email/send-booking-emails";

/**
 * POST /api/stripe/webhook -- the fulfilment route. EXCLUDED from the proxy
 * matcher (proxy.ts) so the raw body reaches us untouched for signature
 * verification.
 *
 * On `checkout.session.completed`:
 *   1. Verify the signature (STRIPE_WEBHOOK_SECRET).
 *   2. IDEMPOTENCY: if the order is already 'paid', return 200 and stop (Stripe
 *      retries are normal; this must be safe to run twice).
 *   3. Mark the order 'paid' + store payment_intent.
 *   4. Create-or-locate the auth user (admin API) + upsert the profiles row from
 *      the booking details.
 *   5. Set course_access.status = 'active'.
 *   6. Generate a set-password (magic) link and fire the Resend emails.
 *
 * On `charge.refunded`: mark the order 'refunded' + set course_access 'refunded'
 * (revoke). Idempotent on the order status.
 *
 * Node runtime + raw body are required. Always returns 200 for handled-but-
 * non-fatal cases so Stripe does not hammer retries; only signature / config
 * failures return non-2xx.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5067";

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  if (!stripe || !isWebhookConfigured()) {
    // Not configured: acknowledge without acting (no real events on localhost).
    return NextResponse.json(
      { received: true, configured: false },
      { status: 200 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  // Raw body for signature verification (runtime=nodejs preserves it).
  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "signature verification failed";
    return NextResponse.json(
      { error: "invalid_signature", message },
      { status: 400 },
    );
  }

  // Without a real Supabase project there is nothing to fulfil; ack the event.
  if (!hasRealSupabase()) {
    return NextResponse.json({ received: true, fulfilled: false }, { status: 200 });
  }

  const supabase = createServiceClient();

  try {
    if (event.type === "checkout.session.completed") {
      await handleCheckoutCompleted(
        stripe,
        supabase,
        event.data.object as Stripe.Checkout.Session,
      );
    } else if (event.type === "charge.refunded") {
      await handleChargeRefunded(
        supabase,
        event.data.object as Stripe.Charge,
      );
    }
    // Other event types: acknowledged, no-op.
  } catch (err) {
    // Log-and-200: returning 500 makes Stripe retry the whole event, which can
    // double-send emails if a later step failed after a successful grant. We
    // prefer to ack and surface the error for manual reconciliation.
    const message = err instanceof Error ? err.message : "webhook handler error";
    return NextResponse.json(
      { received: true, error: message },
      { status: 200 },
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

/* ========================================================================
 * checkout.session.completed -- grant access + send emails (idempotent)
 * ===================================================================== */
async function handleCheckoutCompleted(
  stripe: Stripe,
  supabase: SupabaseClient,
  session: Stripe.Checkout.Session,
) {
  const orderId = session.metadata?.order_id || null;
  const sessionId = session.id;

  // Locate the order by stripe_session_id first (set in the checkout route),
  // falling back to the metadata order_id.
  const { data: order } = await locateOrder(supabase, sessionId, orderId);
  if (!order) {
    // No matching order: ack so Stripe stops retrying. (Manual reconcile.)
    return;
  }

  // --- IDEMPOTENCY: already paid -> stop -------------------------------------
  if (order.status === "paid") return;

  const email =
    (session.customer_details?.email || session.customer_email || order.email)!;
  const fullName =
    session.metadata?.full_name || order.full_name_hint || extractName(session);
  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id || null;

  // --- 1. Mark the order paid -------------------------------------------------
  await supabase
    .from("orders")
    .update({
      status: "paid",
      stripe_session_id: sessionId,
      stripe_payment_intent: paymentIntentId,
    })
    .eq("id", order.id);

  // --- 2. Create-or-locate the auth user -------------------------------------
  const userId = await ensureAuthUser(supabase, email, {
    full_name: fullName,
    partner_name: order.partner_name ?? undefined,
    mobile: order.mobile ?? undefined,
  });

  if (userId) {
    // Upsert the profiles row from the booking details (the trigger creates a
    // base row; this fills the booking-specific columns).
    await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        partner_name: order.partner_name,
        email,
        mobile: order.mobile,
        suburb: order.suburb,
        preferred_contact: order.preferred_contact,
      })
      .eq("id", userId);

    // Link the order to the buyer.
    await supabase.from("orders").update({ user_id: userId }).eq("id", order.id);

    // --- 3. Grant course access ----------------------------------------------
    await supabase.from("course_access").upsert(
      {
        user_id: userId,
        status: "active",
        order_id: order.id,
        granted_at: new Date().toISOString(),
        source: "stripe_checkout",
      },
      { onConflict: "user_id" },
    );
  }

  // --- 4. Trigger the transactional emails -----------------------------------
  // Re-derive the total from the stored extras keys so the receipt matches what
  // was charged (single source of truth).
  const extraKeys: string[] = Array.isArray(order.extras)
    ? (order.extras as { key?: string }[]).map((e) => e.key ?? "").filter(Boolean)
    : [];
  const total = computeTotal(extraKeys);

  const accessUrl = await buildAccessUrl(supabase, email);

  await sendBookingEmails({
    email,
    fullName: fullName || "there",
    orderRef: orderRefFromId(order.id),
    total,
    accessUrl,
    celebrantName: order.celebrant_name ?? undefined,
    celebrantEmail: order.celebrant_email ?? undefined,
  });
}

/* ========================================================================
 * charge.refunded -- revoke access (idempotent)
 * ===================================================================== */
async function handleChargeRefunded(
  supabase: SupabaseClient,
  charge: Stripe.Charge,
) {
  const piId =
    typeof charge.payment_intent === "string"
      ? charge.payment_intent
      : charge.payment_intent?.id || null;
  if (!piId) return;

  const { data: order } = await supabase
    .from("orders")
    .select("id, user_id, status")
    .eq("stripe_payment_intent", piId)
    .maybeSingle();

  if (!order || order.status === "refunded") return;

  await supabase.from("orders").update({ status: "refunded" }).eq("id", order.id);

  if (order.user_id) {
    await supabase
      .from("course_access")
      .update({ status: "refunded" })
      .eq("user_id", order.user_id);
  }
}

/* ========================================================================
 * Helpers
 * ===================================================================== */
async function locateOrder(
  supabase: SupabaseClient,
  sessionId: string,
  orderId: string | null,
): Promise<{ data: OrderRow | null }> {
  const cols =
    "id, email, status, partner_name, mobile, suburb, preferred_contact, celebrant_name, celebrant_email, extras";
  // Prefer the session id (most precise), then the metadata order id.
  const bySession = await supabase
    .from("orders")
    .select(cols)
    .eq("stripe_session_id", sessionId)
    .maybeSingle();
  if (bySession.data) return { data: bySession.data as OrderRow };

  if (orderId) {
    const byId = await supabase
      .from("orders")
      .select(cols)
      .eq("id", orderId)
      .maybeSingle();
    if (byId.data) return { data: byId.data as OrderRow };
  }
  return { data: null };
}

interface OrderRow {
  id: string;
  email: string;
  status: string;
  partner_name: string | null;
  mobile: string | null;
  suburb: string | null;
  preferred_contact: string | null;
  celebrant_name: string | null;
  celebrant_email: string | null;
  extras: unknown;
  full_name_hint?: string | null;
}

function extractName(session: Stripe.Checkout.Session): string {
  return session.customer_details?.name || "there";
}

/**
 * ensureAuthUser -- create the auth user if absent, return the user id. The
 * profiles row is auto-created by the handle_new_user() trigger; metadata seeds
 * full_name / partner_name / mobile. If the user already exists (a returning
 * buyer or a mate who registered first), we locate and return their id.
 */
async function ensureAuthUser(
  supabase: SupabaseClient,
  email: string,
  metadata: { full_name?: string; partner_name?: string; mobile?: string },
): Promise<string | null> {
  // Try to create. Supabase returns an error if the email already exists.
  const created = await supabase.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: metadata,
  });

  if (created.data?.user?.id) return created.data.user.id;

  // Already exists (or transient): locate by listing and matching the email.
  // listUsers is paginated; the buyer is almost always on page 1 right after
  // their own checkout, but we page through defensively.
  for (let page = 1; page <= 10; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
    if (error || !data?.users?.length) break;
    const match = data.users.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase(),
    );
    if (match) return match.id;
    if (data.users.length < 200) break;
  }
  return null;
}

/**
 * buildAccessUrl -- a set-password / sign-in magic link into /course. Uses the
 * Supabase admin generateLink (recovery) so the buyer can set their password and
 * land straight in the course. Falls back to the bare /course URL if link
 * generation is unavailable (the user can still use /login).
 */
async function buildAccessUrl(
  supabase: SupabaseClient,
  email: string,
): Promise<string> {
  try {
    const { data, error } = await supabase.auth.admin.generateLink({
      type: "recovery",
      email,
      options: { redirectTo: `${SITE_URL}/auth/callback?next=/course` },
    });
    if (!error && data?.properties?.action_link) {
      return data.properties.action_link;
    }
  } catch {
    // fall through to the plain course URL
  }
  return `${SITE_URL}/course`;
}
