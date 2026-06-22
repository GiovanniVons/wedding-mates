import { Resend } from "resend";

/**
 * resend.ts -- the server-only Resend client + config gate. Same graceful-
 * degradation contract as Stripe: .env.local ships a placeholder key so the
 * build compiles; emails do not fire until a real key + verified domain are
 * provisioned (a flagged client decision). isResendConfigured() guards every
 * send so a placeholder key never attempts a real call.
 */

const PLACEHOLDER_KEYS = ["re_xxx", ""];

export function isResendConfigured(): boolean {
  const key = process.env.RESEND_API_KEY ?? "";
  if (PLACEHOLDER_KEYS.includes(key)) return false;
  return key.startsWith("re_");
}

/** The verified sender, from EMAIL_FROM (letsgetwed.com.au). */
export function emailFrom(): string {
  return process.env.EMAIL_FROM ?? "Wedding Mates <hello@letsgetwed.com.au>";
}

export function supportEmail(): string {
  return process.env.SUPPORT_EMAIL ?? "sarah@letsgetwed.com.au";
}

export function supportWhatsApp(): string {
  return process.env.SUPPORT_WHATSAPP ?? "0410 820 300";
}

/**
 * onboardingCallUrl -- the booking link for the onboarding call. When unset, the
 * confirmation email renders a "we'll email you the booking link" fallback and
 * the webhook flags it (see booking-portal-copy step 7). Never fabricated.
 */
export function onboardingCallUrl(): string | null {
  const url = process.env.ONBOARDING_CALL_URL ?? "";
  if (!url || url === "https://calendly.com/letsgetwed/onboarding") {
    // The .env.example value is a documented example, not a confirmed real link.
    return url && url !== "" ? url : null;
  }
  return url;
}

let cached: Resend | null = null;

/** The Resend client, or null when not configured (callers must handle null). */
export function getResend(): Resend | null {
  if (!isResendConfigured()) return null;
  if (cached) return cached;
  cached = new Resend(process.env.RESEND_API_KEY!);
  return cached;
}
