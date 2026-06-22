import Stripe from "stripe";

/**
 * server.ts -- the server-only Stripe client. The apiVersion is pinned so the
 * shape of objects we depend on (Checkout Session, PaymentIntent, the
 * checkout.session.completed and charge.refunded events) never silently shifts
 * under us on a Stripe-side default bump.
 *
 * CONFIG GATE: the client has not provisioned a real Stripe account yet (a
 * flagged client decision). .env.local ships placeholder keys so `npm run build`
 * compiles; the placeholder keys are recognised here so the checkout route and
 * the Pay button can degrade gracefully (a clear "payments not configured"
 * state) instead of throwing a 500 in preview. The moment real keys are set,
 * isStripeConfigured() flips true and live behaviour is enabled.
 */

// Pinned to the version the stripe@17.7 types ship with (LatestApiVersion). The
// pin keeps the object shapes we depend on stable across Stripe-side bumps.
const API_VERSION = "2025-02-24.acacia" as const;

/** Placeholder sentinels from .env.example / .env.local. Treated as "not real". */
const PLACEHOLDER_SECRETS = ["sk_test_xxx", "sk_live_xxx", ""];

/** True when a real (non-placeholder) Stripe secret key is configured. */
export function isStripeConfigured(): boolean {
  const key = process.env.STRIPE_SECRET_KEY ?? "";
  if (PLACEHOLDER_SECRETS.includes(key)) return false;
  return key.startsWith("sk_");
}

/** True when the webhook signing secret is configured (real, non-placeholder). */
export function isWebhookConfigured(): boolean {
  const secret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
  return secret.startsWith("whsec_") && secret !== "whsec_xxx";
}

let cached: Stripe | null = null;

/**
 * getStripe -- the configured client, or null when Stripe is not configured.
 * Callers MUST handle null (return the graceful "not configured" path). We never
 * construct a client with a placeholder key, so a stray live call cannot fire
 * against a fake key in preview.
 */
export function getStripe(): Stripe | null {
  if (!isStripeConfigured()) return null;
  if (cached) return cached;
  cached = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: API_VERSION,
    appInfo: { name: "Wedding Mates", url: "https://letsgetwed.com.au" },
  });
  return cached;
}
