# Pitch Brief -- Wedding Mates
**Phase:** 4
**Agent:** orchestrator (improvement-tracker)
**Date:** 2026-06-22
**Status:** draft

---

## Client Snapshot

**Wedding Mates** (brand also "Let's Get Wed", letsgetwed.com.au) is an Australian wedding business with one ownable idea: instead of hiring a stranger celebrant, a couple's own best mate leads the ceremony. The mate is trained through an 8-module gated video course ("The Wedding Ceremony Blueprint"); a registered celebrant quietly handles the Australian legal requirements. One flat package: $950 AUD, plus four optional paid extras. Founder Sarah became a registered celebrant over 300 hours of study to marry her own best friend, and turned that coaching into the Blueprint. The build serves two users: the couple (the buyer) and the mate (the course student).

## Before/After

**Before.** A pretty but non-functional WordPress/Bricks brochure on a developer's staging domain. The revenue mechanic did not exist: no booking, no payment, no login, no course delivery. Placeholder content was live in production (a lorem-ipsum blog, empty reviews/T&C/FAQ, a placeholder phone number). Competent-but-generic execution with no concept, no signature, no design system, and no structured data.

**After.** An ownable, fast, accessible, fully working digital product: an elevated marketing site, the net-new 7-step booking + Stripe payment portal, real Supabase auth, and the gated 8-module course rendered from the client's own content, with access granted automatically on payment. A distinctive concept ("Recessional Pop": the brand is a marked-up ceremony script) carried by a bespoke signature component. Every content gap ships as an honest flagged empty state, never fabricated.

## Feature Highlights

- **Bespoke concept + signature.** "Recessional Pop" and the Hype Line (a cue chip + a colour-flipped hit word + a held beat + one rationed confetti burst) carry the brand across marketing, the booking wizard, and the course. Passes the Ownability and Three-Things tests; deliberately avoids the category's warm-cream-serif default.
- **Dual register.** One design system that dials from loud (marketing, the kiss/confirmation beat) to calm (the payment wizard, the 15-hour course) by changing only scale, saturation, and motion. A buyer mid-payment and a nervous mate mid-lesson are never shouted at.
- **The 7-step booking + payment portal** (net-new): wedding date with a reassuring sub-4-week legal note, details, optional celebrant + location, the four extras with a live running total, Stripe hosted checkout, and a confirmation that grants course access.
- **Real auth + gated course.** Supabase SSR auth; RLS-gated course content; the webhook creates the buyer's account and grants access on payment; the 8 modules render from the client's own course text with video slots, real download links, progress tracking, a readings library, and performance strategies.
- **Production engineering.** Next.js 16 + Tailwind 4, a 3-layer token system (zero violations), full SEO technical (robots, sitemap, canonicals, OG, JSON-LD: Organization, Product+Offer, Course, FAQPage), WCAG-AA accessibility, branded 404 + error states, and a security-correct Stripe integration (server-side total recompute, signature-verified idempotent webhook). Images optimized -61%.

## Deliverables

- The deployed Next.js application (marketing + auth + booking + gated course) building clean with zero errors.
- The full artifact trail in `docs/artifacts/` (Phases 0-4) + the live-site capture and source-doc references.
- Supabase migrations (001-004) + a setup README; the course content as typed data; the `/design-book` living style guide.
- Pre-review audit at 21 pass / 0 fail; all three Phase 4 reviews PASS WITH NOTES with the fix pass applied.

## Scores

| Dimension | Score | Source |
|---|---|---|
| Design verdict | PASS WITH NOTES (0 Critical, 0 Major) | design-critic |
| QA verdict | PASS WITH NOTES (0 Critical, 0 Major) | qa-auditor |
| Performance verdict | PASS WITH NOTES (CWV projected pass) | performance-expert |
| Typography | 9/10 | design-critic |
| Color | 9/10 | design-critic |
| Layout | 9/10 | design-critic |
| Copy | 9/10 | design-critic |
| Responsive | 9/10 | design-critic |
| Distinctiveness | 9/10 | design-critic |
| Conversion clarity | 9/10 | design-critic |
| Craft | 8/10 | design-critic |
| Animation | 8/10 | design-critic |
| Pre-review audit | 21 pass / 0 fail | pre-review-audit.py |

**Credit:** Site by Giovanni Vons / giovannivons.com.

**To go live (client-supplied):** Supabase project + keys + migrations applied; Stripe account + keys + webhook secret + GST decision; Resend key + verified letsgetwed.com.au domain; the onboarding-call URL; the 9 lesson videos + 2 missing download links; real reviews/blog/legal copy; and the Wedding Mates vs Let's Get Wed primary-name decision.
