import { centsToDollars, type ComputedTotal } from "@/lib/stripe/pricing";
import { supportEmail, supportWhatsApp } from "./resend";

/**
 * templates.ts -- the transactional email bodies as HTML strings (no React-email
 * dependency needed; inline-styled tables for broad client support). Voice:
 * warm, from Sarah, AU English. No em dashes, no double hyphens in any string a
 * recipient reads. Colours are inlined hex (email clients do not resolve our CSS
 * custom properties); the values mirror the brand tokens 1:1 and are documented.
 *
 * Brand hex (mirrors src/styles/tokens.css Zone 1a, for email only):
 *   grape #2b1a4a · page #fbf7ef · coral #ff5a4d · marigold #ffb43d · mint #b7e4c7
 */

// --- Email-only brand palette (mirrors tokens.css; email cannot read var()) ---
const C = {
  grape: "#2b1a4a",
  grapeSoft: "#5a4a76",
  page: "#fbf7ef",
  pageTint: "#f3ecdf",
  coral: "#ff5a4d",
  coralDeep: "#d63a2e",
  marigold: "#ffb43d",
  mint: "#b7e4c7",
  border: "#e3d9c8",
  white: "#ffffff",
} as const;

export interface ReceiptLine {
  label: string;
  amountDollars: number;
}

export interface EmailContext {
  firstName: string;
  fullName: string;
  email: string;
  orderRef: string;
  total: ComputedTotal;
  /** Magic / set-password link into /course. */
  accessUrl: string;
  /** Onboarding-call booking link, or null (renders the fallback line). */
  onboardingUrl: string | null;
  /** Module-1 timeline checklist (Canva). */
  checklistUrl: string;
  /** Provided only when the buyer gave a celebrant email (welcome-pack send). */
  celebrantName?: string;
  celebrantEmail?: string;
}

function firstNameFrom(fullName: string): string {
  const f = fullName.trim().split(/\s+/)[0];
  return f || "there";
}

export { firstNameFrom };

/** Shared shell: page-tint ground, white card, grape header, Sarah signature. */
function shell(opts: {
  preheader: string;
  heading: string;
  bodyHtml: string;
}): string {
  const { preheader, heading, bodyHtml } = opts;
  return `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${heading}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.pageTint};">
<span style="display:none!important;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${preheader}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.pageTint};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:${C.white};border:1px solid ${C.border};border-radius:18px;overflow:hidden;">
<tr><td style="background-color:${C.grape};padding:24px 32px;">
<span style="font-family:'Archivo Black',Arial,sans-serif;font-size:20px;letter-spacing:0.04em;color:${C.page};text-transform:uppercase;">Wedding Mates</span>
</td></tr>
<tr><td style="padding:32px;font-family:Arial,Helvetica,sans-serif;color:${C.grape};font-size:16px;line-height:1.6;">
<h1 style="margin:0 0 20px;font-family:'Archivo Black',Arial,sans-serif;font-size:24px;line-height:1.2;color:${C.grape};">${heading}</h1>
${bodyHtml}
<div style="margin-top:32px;padding-top:24px;border-top:1px solid ${C.border};font-size:15px;color:${C.grapeSoft};">
<p style="margin:0 0 4px;">Warmly,</p>
<p style="margin:0 0 12px;font-weight:bold;color:${C.grape};">Sarah, Wedding Mates</p>
<p style="margin:0;font-size:14px;">Questions any time. Email <a href="mailto:${supportEmail()}" style="color:${C.coralDeep};font-weight:bold;">${supportEmail()}</a> or message us on WhatsApp ${supportWhatsApp()}.</p>
</div>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function button(label: string, href: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px 0;"><tr><td style="background-color:${C.coral};border-radius:999px;">
<a href="${href}" style="display:inline-block;padding:14px 28px;font-family:'Archivo Black',Arial,sans-serif;font-size:15px;color:${C.white};text-decoration:none;text-transform:uppercase;letter-spacing:0.03em;">${label}</a>
</td></tr></table>`;
}

export interface RenderedEmail {
  subject: string;
  html: string;
}

/* ========================================================================
 * 1. Course access / set-password (the magic link into /course)
 * ===================================================================== */
export function courseAccessEmail(ctx: EmailContext): RenderedEmail {
  const body = `
<p style="margin:0 0 16px;">Congratulations, you are booked. Everything your mate needs to lead your ceremony is ready and waiting.</p>
<p style="margin:0 0 16px;">Your course login is below. Set your password and you are straight into the Wedding Ceremony Blueprint.</p>
${button("Open your course", ctx.accessUrl)}
<p style="margin:16px 0 0;font-size:14px;color:${C.grapeSoft};">If the button does not work, copy this link into your browser:<br/><span style="word-break:break-all;color:${C.coralDeep};">${ctx.accessUrl}</span></p>
<p style="margin:16px 0 0;font-size:14px;color:${C.grapeSoft};">This sign-in link is for you. Please do not forward it.</p>`;
  return {
    subject: "You're booked. Welcome to Wedding Mates.",
    html: shell({
      preheader: "Your course login is ready. Let's get you wed.",
      heading: `You're booked, ${ctx.firstName}.`,
      bodyHtml: body,
    }),
  };
}

/* ========================================================================
 * 2. Itemised AUD receipt
 * ===================================================================== */
export function receiptEmail(ctx: EmailContext): RenderedEmail {
  const lines: ReceiptLine[] = [
    { label: ctx.total.tier.name, amountDollars: centsToDollars(ctx.total.baseCents) },
    ...ctx.total.extras.map((e) => ({
      label: e.name,
      amountDollars: centsToDollars(e.amountCents),
    })),
  ];
  const rows = lines
    .map(
      (l) => `<tr>
<td style="padding:10px 0;border-bottom:1px solid ${C.border};color:${C.grapeSoft};">${l.label}</td>
<td align="right" style="padding:10px 0;border-bottom:1px solid ${C.border};color:${C.grape};font-weight:bold;">$${l.amountDollars}</td>
</tr>`,
    )
    .join("");
  const totalDollars = centsToDollars(ctx.total.totalCents);
  const body = `
<p style="margin:0 0 16px;">Here is your receipt. Your booking reference is <strong>${ctx.orderRef}</strong>.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 0;font-size:15px;">
${rows}
<tr>
<td style="padding:14px 0 0;font-family:'Archivo Black',Arial,sans-serif;color:${C.grape};">Total paid</td>
<td align="right" style="padding:14px 0 0;font-family:'Archivo Black',Arial,sans-serif;color:${C.grape};font-size:20px;">$${totalDollars}</td>
</tr>
</table>
<p style="margin:18px 0 0;font-size:14px;color:${C.grapeSoft};">All prices in AUD. Paid securely via Stripe.</p>`;
  return {
    subject: `Your Wedding Mates receipt (${ctx.orderRef})`,
    html: shell({
      preheader: `Receipt for your $${totalDollars} Wedding Mates booking.`,
      heading: "Your receipt",
      bodyHtml: body,
    }),
  };
}

/* ========================================================================
 * 3. Onboarding-call link (with fallback when ONBOARDING_CALL_URL is unset)
 * ===================================================================== */
export function onboardingEmail(ctx: EmailContext): RenderedEmail {
  const cta = ctx.onboardingUrl
    ? `<p style="margin:0 0 8px;">Pick a time that suits you both and we will see you there.</p>${button("Book your onboarding call", ctx.onboardingUrl)}`
    : `<p style="margin:0 0 8px;">We will email you a booking link for your onboarding call very soon. Keep an eye on your inbox.</p>`;
  const body = `
<p style="margin:0 0 16px;">Next up is your onboarding call. It is a relaxed chat where we walk through the legal steps, how the support works, and answer any questions you and your mate have.</p>
${cta}`;
  return {
    subject: "Let's book your Wedding Mates onboarding call",
    html: shell({
      preheader: "Book your onboarding call: legal steps, support, and Q&A.",
      heading: "Book your onboarding call",
      bodyHtml: body,
    }),
  };
}

/* ========================================================================
 * 4. Timeline checklist (links the Module-1 Canva checklist)
 * ===================================================================== */
export function timelineEmail(ctx: EmailContext): RenderedEmail {
  const body = `
<p style="margin:0 0 16px;">To help your mate plan their time, here is your timeline checklist. It maps the whole journey from the first couple interview to the morning of the wedding.</p>
<p style="margin:0 0 8px;">Download it, print it or keep it on your phone, and tick things off as you go.</p>
${button("Open your timeline checklist", ctx.checklistUrl)}
<p style="margin:16px 0 0;font-size:14px;color:${C.grapeSoft};">You will also find this checklist inside the course, in the Introduction module.</p>`;
  return {
    subject: "Your Wedding Mates timeline checklist",
    html: shell({
      preheader: "Download your timeline checklist to map the journey.",
      heading: "Your timeline checklist",
      bodyHtml: body,
    }),
  };
}

/* ========================================================================
 * 5. Celebrant welcome pack (CONDITIONAL: only when a celebrant email exists)
 *    Sent TO the celebrant, cc context for the couple.
 * ===================================================================== */
export function celebrantWelcomeEmail(ctx: EmailContext): RenderedEmail {
  const celebrant = ctx.celebrantName?.trim() || "there";
  const body = `
<p style="margin:0 0 16px;">Hello ${celebrant},</p>
<p style="margin:0 0 16px;">${ctx.fullName} has chosen you to lead their wedding ceremony, and they have just booked Wedding Mates to help you do it brilliantly. What an honour.</p>
<p style="margin:0 0 16px;">Here is what happens now. ${ctx.fullName} has access to the Wedding Ceremony Blueprint, the course that teaches you to interview the couple, write their love story, and deliver the day with confidence. The legal side is fully handled by a registered celebrant, so you get to focus on the personal moment.</p>
<p style="margin:0 0 8px;">We will be in touch with everything you need. In the meantime, if you have any questions at all, just reply to this email.</p>`;
  return {
    subject: `You're going to lead a wedding. Here's your welcome pack.`,
    html: shell({
      preheader: `${ctx.fullName} has chosen you to lead their ceremony.`,
      heading: "Welcome, celebrant",
      bodyHtml: body,
    }),
  };
}
