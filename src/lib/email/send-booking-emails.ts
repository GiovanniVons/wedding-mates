import type { ComputedTotal } from "@/lib/stripe/pricing";
import {
  emailFrom,
  getResend,
  isResendConfigured,
  onboardingCallUrl,
} from "./resend";
import {
  celebrantWelcomeEmail,
  courseAccessEmail,
  firstNameFrom,
  onboardingEmail,
  receiptEmail,
  timelineEmail,
  type EmailContext,
} from "./templates";

/**
 * send-booking-emails.ts -- the transactional email orchestrator fired by the
 * Stripe webhook AFTER an order is marked 'paid'. Sends, in order:
 *   1. course access / set-password link
 *   2. itemised AUD receipt
 *   3. onboarding-call link (or the "we'll email you the link" fallback)
 *   4. timeline checklist (Module-1 Canva)
 *   5. celebrant welcome pack -- ONLY when a celebrant email was provided
 *
 * Every send is wrapped: a single failed email never blocks the others or the
 * webhook's 200 (Stripe would otherwise retry the whole event). When Resend is
 * not configured (placeholder key, a flagged client decision) the orchestrator
 * no-ops and reports `sent: false, configured: false` so the webhook can log it.
 */

// The Module-1 timeline checklist, the canonical course source of truth.
import { MODULES } from "@/content/course";

function checklistUrl(): string {
  const intro = MODULES.find((m) => m.isIntro);
  const checklist = intro?.downloads.find((d) => d.label === "Checklist");
  // Fall back to the course itself if the link is ever missing (never fabricate a URL).
  return checklist?.url ?? "";
}

export interface BookingEmailInput {
  email: string;
  fullName: string;
  orderRef: string;
  total: ComputedTotal;
  /** The set-password / magic link into /course (from the webhook). */
  accessUrl: string;
  celebrantName?: string;
  celebrantEmail?: string;
}

export interface BookingEmailResult {
  configured: boolean;
  sent: string[];
  failed: { name: string; error: string }[];
  /** Flag surfaced when the onboarding link is unset (fallback copy used). */
  onboardingUrlMissing: boolean;
  celebrantPackSent: boolean;
}

export async function sendBookingEmails(
  input: BookingEmailInput,
): Promise<BookingEmailResult> {
  const onboardingUrl = onboardingCallUrl();
  const result: BookingEmailResult = {
    configured: isResendConfigured(),
    sent: [],
    failed: [],
    onboardingUrlMissing: onboardingUrl === null,
    celebrantPackSent: false,
  };

  const resend = getResend();
  if (!resend) return result; // not configured: no-op, flagged via result.configured

  const ctx: EmailContext = {
    firstName: firstNameFrom(input.fullName),
    fullName: input.fullName,
    email: input.email,
    orderRef: input.orderRef,
    total: input.total,
    accessUrl: input.accessUrl,
    onboardingUrl,
    checklistUrl: checklistUrl(),
    celebrantName: input.celebrantName,
    celebrantEmail: input.celebrantEmail,
  };

  const from = emailFrom();

  async function send(name: string, to: string, subject: string, html: string) {
    try {
      const { error } = await resend!.emails.send({ from, to, subject, html });
      if (error) {
        result.failed.push({ name, error: error.message });
      } else {
        result.sent.push(name);
      }
    } catch (err) {
      result.failed.push({
        name,
        error: err instanceof Error ? err.message : "unknown send error",
      });
    }
  }

  // 1-4 go to the buyer.
  const access = courseAccessEmail(ctx);
  await send("course-access", input.email, access.subject, access.html);

  const receipt = receiptEmail(ctx);
  await send("receipt", input.email, receipt.subject, receipt.html);

  const onboarding = onboardingEmail(ctx);
  await send("onboarding", input.email, onboarding.subject, onboarding.html);

  const timeline = timelineEmail(ctx);
  await send("timeline", input.email, timeline.subject, timeline.html);

  // 5. Celebrant welcome pack -- conditional on a provided celebrant email.
  const celebrantEmail = input.celebrantEmail?.trim();
  if (celebrantEmail) {
    const welcome = celebrantWelcomeEmail(ctx);
    await send("celebrant-welcome", celebrantEmail, welcome.subject, welcome.html);
    result.celebrantPackSent = result.sent.includes("celebrant-welcome");
  }

  return result;
}
