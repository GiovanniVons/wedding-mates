# Project State
**Project:** Wedding Mates ("Let's Get Wed")
**Location:** website-projects/client-projects/wedding-mates
**Phase:** refinement (Phase 4 passed 2026-06-22)
**Dev Server:** localhost:5067 (build + `next start`, NOT turbopack dev -- the path has spaces)
**Status:** active -- functionally complete, blocked on client credentials + content for go-live

---

## Design Quick Reference
- **Archetype:** Recessional Pop (DESIGN_VARIANCE 6, MOTION_INTENSITY 6, VISUAL_DENSITY 5; functional surfaces run an effective 3)
- **Concept:** the brand is a marked-up ceremony script, cranked to party volume. Signature = the Hype Line (cue chip + colour-flipped hit word + held beat + one rationed confetti burst).
- **Fonts:** Anton (display/Hype Line), Archivo Black (H2/heavy), Archivo (body/UI). No serif, no mono.
- **Primary colors:** grape-ink `#2A1840`, coral `#F2484E` (CTA/hit word), confetti-paper `#FBFAFF`; accents marigold `#F6A623`, mint `#3FB39A`; `-deep` variants for accent-as-text.
- **Dual register:** `data-surface` (loud/calm) + `data-theme` (page/tint/grape/coral). Loud marketing vs calm wizard/course.
- **Key tokens:** `--section-space-*` rhythm, `--gap-title-body` (the 2.5-fix rhythm tokens), radius 10px cards / pill CTAs, `a:not(.btn):not(.link-plain)` link scoping.

## Current Status
The full site is built and passes all pipeline gates through Phase 4 (all three reviews PASS WITH NOTES, 0 Critical/Major, pre-review audit 21/0, fix pass applied). Surfaces: marketing (home + how-it-works + pricing + about + faq + contact + conditional reviews/blog + terms/privacy), the 4 auth screens, the net-new 7-step booking + Stripe portal, the gated 8-module course (dashboard + lessons + progress + readings + strategies + locked), branded 404/error, wired contact form. It builds with zero errors. The functional layer (auth/payments/email/gated content) is correct and wired to env, but does not run end-to-end until the client provides external services (below). A DEV-only preview-gating flag lets the gated course be reviewed locally.

## File Manifest
See `docs/artifacts/file-manifest.md` (routes, components, lib, migrations). Key entry points: `src/app/(marketing)`, `(auth)`, `(booking)`, `(course)`; `src/lib/{supabase,stripe,email,auth,booking,course}`; `src/content/{course,copy,booking}.ts`; `src/styles/tokens.css`; `supabase/migrations/001-004`.

## Active Issues
- [ ] Deferred polish (non-blocking): About-page optional POP craft detail; locked-module thumbnail grade; `ensureAuthUser` `listUsers` at scale; `/blog/[slug]` ISR (content-gated).
- [ ] None blocking. All Critical/Major resolved.

## Recent Changes (Change Log)
### 2026-06-22
- Phase 4 fix pass: images -61% (Sharp), sticky-bar per-surface inversion (geometry detection), hero mobile wrap, a11y (heading-in-label, useId), nav dedup, OG dims verified. Build PASS, audit 21/0.
- Phase 4 reviews complete (design/qa/performance all PASS WITH NOTES); consolidated-fixes + pitch-brief + ledger finalized.
### 2026-06-21
- Phases 0-3 built end to end. Phase 1 re-aimed from editorial to "Recessional Pop" per user. 2.5 Design Book review + typography/spacing fix pass.

## Open Questions (for the client)
- Brand-name primary: **Wedding Mates** (current) vs **Let's Get Wed** (matches domain; SEO prefers it). Currently built with Wedding Mates primary.
- GST: are the $950 + extras GST-inclusive or exclusive? (Affects receipts + T&C.)
- Exact legal mechanism wording (registered celebrant attends-and-officiates vs separate registration) + Sarah's surname + social `sameAs` URLs.
- Module 5/6 "vows blueprint" download placement (source-doc inconsistency).

## Next Actions (Phase 5 / launch -- BLOCKED ON CLIENT)
1. **Supabase:** create a standalone project; paste URL + anon + service-role keys; apply migrations 001-004 (see `supabase/README.md`); set auth redirect URLs + SMTP.
2. **Stripe:** create the account (Sarah's); add TEST keys + webhook secret (`stripe listen --forward-to localhost:5067/api/stripe/webhook`); run the full test-mode booking -> webhook -> entitlement -> email round-trip (the recommended checkpoint); then LIVE keys.
3. **Resend:** API key + verified `letsgetwed.com.au` sending domain; set `EMAIL_FROM`.
4. **Content:** the 9 lesson videos; the 2 missing download links (Module 5 vows guide, Module 7 nerves tips); real reviews/love-story photos (+ rights); real blog posts; Terms + refund policy + privacy copy; the onboarding-call URL.
5. **Launch:** confirm host supports Next server runtime (Netlify Next runtime / Vercel -- NOT static export, the webhook needs server functions); deploy; integrate Vonzie Nexus CMP + consent-gated analytics post-launch; run the pre-launch checklist (CTA destination audit, pattern graduation, dead-file sweep, footer legal -> Nexus, third-party widget verification, lesson harvest).

## Artifact Authority
- client-dossier.md: CURRENT
- brand-guidelines.md: CURRENT (Recessional Pop)
- ux.md: CURRENT
- design.md: CURRENT
- tokens.css: CURRENT (incl. 2.5 rhythm tokens + link scoping + fix-pass updates)
- page-copy.md: CURRENT
- seo.md: CURRENT
- pre-review-facts.md / design-review.md / qa-report.md / performance-report.md / consolidated-fixes.md: CURRENT (Phase 4, fix pass #1 annotated)
- improvement-ledger.md / pitch-brief.md: CURRENT (finalized)
