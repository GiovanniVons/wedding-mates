import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import {
  emailFrom,
  getResend,
  isResendConfigured,
  supportEmail,
} from "@/lib/email/resend";

/**
 * POST /api/contact -- the contact-form submit handler.
 *
 * Flow:
 *   1. Validate the payload (zod): name, email, message. The client sends only
 *      these three fields; everything is trimmed and length-bounded here.
 *   2. Send one plain transactional email to SUPPORT_EMAIL (sarah@letsgetwed.com.au)
 *      via the shared Resend client, with reply_to set to the visitor so Sarah
 *      can reply straight from her inbox.
 *
 * GRACEFUL DEGRADATION: identical contract to the booking emails. When Resend is
 * not configured (placeholder key, a flagged client decision), this returns 200
 * with `delivered: false` so the form shows its calm success state without a
 * crash. It never throws a 500 just because the key is absent.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please add your name.").max(120),
  email: z
    .string()
    .trim()
    .min(1, "Please add your email.")
    .max(200)
    .email("That email does not look quite right."),
  message: z.string().trim().min(1, "Please add a message.").max(4000),
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: NextRequest) {
  // --- 1. Validate the payload -----------------------------------------------
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { error: "invalid_json", message: "We could not read your message." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_payload", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const { name, email, message } = parsed.data;

  // --- Config gate: degrade gracefully when Resend is not provisioned --------
  // No real key yet (a flagged client decision): accept the message and show
  // the calm success state. The form never crashes on a placeholder key.
  if (!isResendConfigured()) {
    return NextResponse.json({ delivered: false });
  }

  const resend = getResend();
  if (!resend) {
    return NextResponse.json({ delivered: false });
  }

  // --- 2. Send the notification to Sarah -------------------------------------
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#2b1a4a;">
      <p style="margin:0 0 16px;"><strong>New message from the Let's Get Wed contact form.</strong></p>
      <p style="margin:0 0 8px;"><strong>Name:</strong> ${safeName}</p>
      <p style="margin:0 0 8px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:#d63a2e;font-weight:bold;">${safeEmail}</a></p>
      <p style="margin:16px 0 4px;"><strong>Message:</strong></p>
      <p style="margin:0;padding:16px;background:#f3ecdf;border-radius:8px;">${safeMessage}</p>
    </div>
  `.trim();

  const text = `New message from the Let's Get Wed contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  try {
    const { error } = await resend.emails.send({
      from: emailFrom(),
      to: supportEmail(),
      replyTo: email,
      subject: `New contact form message from ${name}`,
      html,
      text,
    });

    if (error) {
      return NextResponse.json(
        { error: "send_failed", message: error.message },
        { status: 502 },
      );
    }

    return NextResponse.json({ delivered: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "We could not send your message.";
    return NextResponse.json(
      { error: "send_failed", message },
      { status: 502 },
    );
  }
}
