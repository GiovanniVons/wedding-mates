import { NextResponse, type NextRequest } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe/server";
import { createServiceClient } from "@/lib/supabase/server";
import { hasRealSupabase } from "@/lib/auth/preview";
import { orderRefFromId } from "@/lib/booking/order";

/**
 * GET /api/stripe/session-status?session_id=... -- the confirmation page polls
 * this to learn whether the payment is settled. It returns:
 *   - state: "paid"      -> Stripe says payment_status === 'paid'. Show the
 *                           celebration. (The order row may flip to 'paid' a beat
 *                           later when the webhook lands; access is granted there.)
 *   - state: "pending"   -> session exists but not yet paid. Keep polling.
 *   - state: "unknown"   -> no session id / not configured. Generic state.
 *   - orderRef           -> the human reference when the order is located.
 *
 * Reading the session directly from Stripe (not only the DB) means the
 * confirmation never hangs on "pending" if the webhook is briefly delayed: a
 * paid Checkout Session is itself proof of payment for the success screen, while
 * the webhook remains the single source of truth for granting access + emails.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ state: "unknown" }, { status: 200 });
  }

  if (!isStripeConfigured()) {
    return NextResponse.json({ state: "unknown", configured: false }, { status: 200 });
  }
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ state: "unknown", configured: false }, { status: 200 });
  }

  let orderRef: string | null = null;
  if (hasRealSupabase()) {
    try {
      const supabase = createServiceClient();
      const { data } = await supabase
        .from("orders")
        .select("id, status")
        .eq("stripe_session_id", sessionId)
        .maybeSingle();
      if (data?.id) orderRef = orderRefFromId(data.id);
    } catch {
      // non-fatal; the Stripe session below is the authority for the state
    }
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === "paid";
    return NextResponse.json(
      {
        state: paid ? "paid" : "pending",
        orderRef,
        email: session.customer_details?.email ?? null,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ state: "unknown" }, { status: 200 });
  }
}
