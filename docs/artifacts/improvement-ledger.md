# Improvement Ledger -- Wedding Mates
**Phase:** 0
**Agent:** orchestrator (improvement-tracker)
**Date:** 2026-06-21
**Status:** draft (living document)

---

Tracks the before → after delta across the build, for the Phase 4 pitch-brief. The "before" is the live WordPress/Bricks site at `https://wedding-mates.aaronknightdev.com` plus the two unbuilt surfaces (booking portal, gated course) that only exist on paper.

## Baseline

**Platform (before):** WordPress 7.0 + Bricks page builder + bricks-child theme, built by a third-party dev. Marketing pages only are live; the booking portal and the gated course are specced in client docs but **not built**.

**What works in the baseline:**
- A genuinely ownable core idea ("your best mate marries you") with warm, well-written marketing copy.
- A clear single price ($950) and a strong founder story.
- Real brand assets (logo, founder photo, custom feature icons, module thumbnails).

**Baseline weaknesses (the "before" we improve on):**
- **No working product.** No booking flow, no payment, no login, no course delivery. "Start Your Journey" leads nowhere functional. The actual revenue mechanic does not exist.
- **Placeholder content shipped to production:** blog is 10× "Janina & Steven's Mudgee Wedding" + lorem ipsum; reviews page empty; Terms & Conditions empty; FAQ has a heading but no questions; footer contact is placeholder ("WA 12345678", obfuscated email).
- **Generic execution.** Photography-driven warm-neutral layout with no distinctive concept; reads like a competent template, not an ownable brand. (No Concept, no signature component, no craft layer.)
- **Page-builder bloat & SEO/perf unknowns** typical of Bricks/WordPress (render-blocking, no structured data plan, no token system).
- **Two-sided story underbuilt:** the couple ↔ mate relationship and the course value are barely shown on the marketing site.
- **Legal framing is loose** ("your mate can really marry you") without clearly explaining the registered-celebrant legal layer.

**Baseline metrics to beat (to capture at Phase 4 on the new build):** Core Web Vitals (the WP build's LCP/CLS), accessibility pass rate, structured-data coverage (currently none planned), and "does the primary conversion actually function" (currently: no).

**The target delta in one line:** turn a pretty-but-non-functional brochure into an ownable, fast, accessible, **fully working digital product** (marketing → booking → payment → gated course) with a distinctive concept and real content.

## Phase 1 Observations

**Concept (the biggest before/after).** Baseline had a strong *idea* but no *concept* and a generic warm-photographic execution. Phase 1 forged an ownable concept: **"the brand is a marked-up ceremony script"** (signature = the Prompt Line: cue tag + emphasis mark + breath-mark, revealed at delivery pace). Passes the Ownability Test (reads false for a traditional celebrant / directory / DIY). This is the difference between "another pretty wedding site" and a brand.

**Anti-editorial-default win (took two passes).** A wedding brand is the textbook warm-cream-serif gravity well, and the sibling `sarah-emery-celebrant` build already lives there. The first Phase 1 pass diverged only at the palette layer (cool ink vs warm cream) but kept the editorial *structure* (Fraunces serif display, paper-and-ink typesetting) and even named the family "editorial" -- the gravity well reasserting itself via the script concept. The user caught it and re-aimed the family to **Bold / Celebratory Pop**. Final direction: **"Recessional Pop"** -- celebration like a screen-printed gig poster, palette sourced from real confetti at a recessional (grape-ink `#2A1840` anchor + confetti-white `#FBFAFF` + coral-red `#F2484E` + marigold `#F6A623` + mint `#3FB39A`), heavy condensed grotesque (Anton + Archivo), zero serif/mono/grain, flat risograph ink. Signature re-expressed loud as the **Hype Line**. New post-hoc archetype "Recessional Pop" added to the library (a bright multi-colour pop counterweight to its editorial + dark-manifesto leans). Lesson reinforced: a concept can be an editorial attractor for its category; check the *structure*, not just the palette.

**Dual register is the key innovation.** A loud brand that must also run a 7-step payment wizard and a 15-hour course: the system dials LOUD (marketing, the kiss/confirmation beat) ↔ CALM (wizard, course) using the same family/grid/palette/cue-chips, changing only scale, saturation, and motion. Marketing runs the 6/6/5 dials; the functional surfaces run an effective 3.

**Contrast pre-computed (Hard Rule honoured at design time).** Saturated pop palettes fail AA easily; pre-made darker text variants (coral-deep `#C9242A`, marigold-deep `#A66A05`, mint-deep `#1F7A66`) exist for any accent used as text; the bright hit-word is allowed only at display scale. Zero Phase 4 contrast surprises expected.

**Product architecture, not a brochure.** UX defines all four surfaces (marketing, auth, 7-step booking, gated course) with the $950 booking as the single spine, two nav contexts (couple vs mate), and content honesty enforced architecturally (conditional routes ship as scaffolded empty states, never lorem). Baseline had none of this (no booking, no course, no auth, lorem blog).

**Dials:** DESIGN_VARIANCE 4 / MOTION_INTENSITY 4 / VISUAL_DENSITY 3 (magnitudes, justified for both the celebratory couple and the trust-critical payment/course surfaces).

## Phase 2 Observations

**Design system carries the dual register cleanly.** The ui-designer split the two axes into orthogonal token attributes: `data-surface` (loud/calm) controls scale + motion + whether a confetti burst is allowed; `data-theme` (page/tint/grape/coral) controls per-section colour. Same grape headings, Archivo family, cue-chip, and coral button at both volumes. The wizard and course pick the calm tokens (near-zero motion, no saturated fields, accent rationed to the cue chip + primary button); marketing goes full saturated. This is the mechanism that keeps "loud brand + 15-hour course" from splitting into two brands.

**tokens.css is fully compliant** (all 7 zones, canonical prefixes, zero real `rgba()` -- opacity via 38 `color-mix()` calls, section padding via `--section-space-*`). New contrast pairs the designer introduced were pre-computed and pass (grape-on-mint 7.4:1, marigold-on-grape 8.7:1). Buttons default to grape-on-coral; accent-as-text uses the `-deep` variants.

**Copy holds the voice + the legal honesty.** page-copy.md covers all four surfaces with Hype Lines on marketing peaks and the calm coaching voice in the wizard/course. Legal-honesty enforced everywhere (never "your mate legally marries you"; always "we handle the legals"). SEO coexistence applied: Hype Lines carry emotion, one plain semantic sentence per page carries the keyword/entity. Content honesty enforced: FAQ answers shipped only where truthfully derivable, refund/GST/legal-mechanism flagged for the client, reviews/blog/love-stories as honest empty states (never lorem).

**SEO is answer-shaped for AU + AI surfaces.** Classified as a national service/personal-brand (not local), so the strategy weights answer-shaped content + question keywords + entity clarity over local SEO. Structured data: Organization, Product+Offer ($950 AUD + 4 extras), Course (PT16H), FAQPage, BlogPosting; Review/AggregateRating gated until real reviews exist. Gated `/course/*` + `/design-book` + auth + booking set to noindex; marketing/blog indexed.

**Two client decisions surfaced (flagged, non-blocking):** (1) brand-name primary -- "Wedding Mates" (current, used everywhere) vs "Let's Get Wed" (matches the domain; SEO prefers it for LLM entity consolidation); (2) Sarah's surname + social `sameAs` URLs missing (the single biggest LLM entity signal), left empty rather than guessed.

**Writing-rule self-heal:** the copywriter + findability agents used em-dash separators in artifact prose (35 total across page-copy + seo + the Phase 0/1 files). Caught at validation and replaced with `--` (rule-compliant in internal prose); zero em-dashes now in any artifact, and zero em-dash/`--` inside any shipping copy string (the one `Book Now -- $950` wireframe label is flagged to ship as `Book Now · $950`).

## Phase 3 Observations

**The brochure became a working product.** Baseline was a non-functional WordPress brochure. The build now ships a complete Next.js 16 app: the elevated marketing site (home + how-it-works + pricing + about + faq + contact + conditional reviews/blog + terms/privacy), the 4 auth screens, the net-new 7-step booking wizard, the full Stripe checkout -> webhook -> entitlement -> Resend flow, and the gated 8-module course (dashboard + lessons from `course.ts` + readings + strategies + progress). Plus branded 404 + error boundaries and a wired contact form.

**Design Book first, then pages (2.5 gate worked).** The Design Book caught real design issues before any page was built: the human review flagged a systemic heading->description overlap (root cause: an Anton-tuned leading-trim over-pulling Archivo body and yanking paragraphs under multi-line headings), pricing-number overflow, uneven checklist rhythm, stocky voice callouts, and checkbox centering. All fixed at the system level via scoped trim + new rhythm tokens BEFORE page build-out, so the pages inherited correct spacing.

**Dual register holds on real pages.** Verified on pixels: loud marketing (Anton hero, confetti palette, Hype Line over photo, the one confirmation burst) vs calm functional surfaces (the booking wizard and the 15-hour course read quiet, legible, near-white, accent rationed). Same family, volume dialled by surface.

**Functional layer copy-adapted from the Vonzie Portal core** (Supabase SSR/PKCE auth, role-gated routes) + the Nexus migration-024 patterns (enums, RLS, SECURITY DEFINER functions) -> a standalone course-access entitlement model. The webhook creates the account on payment and grants `has_course_access()`; RLS gates all course content. A DEV-only, env-gated preview bypass lets the gated course be reviewed locally without a live Supabase, and disables itself the moment real Supabase env is present.

**Pre-flight clean: pre-review-audit 21 pass / 0 fail.** Zero token violations, removed 5 unused deps, zero em-dashes in src, contact form wired, 404/error pages added, accessibility baseline met. The 2.5 fixes (link/CTA scoping, rhythm tokens) held through every batch with no regressions.

**Pixel-pass defects caught and fixed in-flight** (the reason the pass exists): the sticky mobile CTA bar leaking onto desktop (inline display beating `lg:hidden`), a mobile horizontal-scroll from a poster word overflowing, and the header anchor-CTA rendering as an underlined link (unlayered `a{}` beating `.btn-primary`). All runtime-only, all caught on pixels.

**Phase 3.5 analytics:** GA4/Meta/Plausible IDs were not provided in the dossier, so analytics is correctly NOT fabricated or hardcoded; it integrates post-launch behind the Vonzie Nexus consent bridge once the client supplies IDs. No tracking fires on localhost.

**Blocked on client for go-live (flagged, not faked):** a standalone Supabase project + keys + migrations applied; a Stripe account + test/live keys + webhook secret + the GST decision; a Resend API key + verified letsgetwed.com.au domain; the onboarding-call URL; the 9 lesson videos; 2 missing download links; real reviews/blog/love-story content + legal/T&C copy; and the Wedding Mates vs Let's Get Wed primary-name decision.

## Phase 4 Observations

**All three reviews: PASS WITH NOTES, zero Critical, zero Major (design + QA).** The strongest concept-to-pixel translation the design-critic has reviewed in this pipeline: the Three-Things Test passed, zero house-style drift (left the warm-serif-editorial well entirely AND avoided pop's own slop), the signature rationed correctly, the dual register holding across all three surfaces. Design scores 8-9 across typography/color/layout/copy/responsive/distinctiveness/conversion/craft.

**Security-critical commerce + gating verified correct** (the things that usually break): server-side total recompute (client sends extra KEYS only, a tampered total cannot affect the charge), signature-verified idempotent Stripe webhook on the raw body, RLS gating all course content (service-role-only writes to `course_access`/`orders`), the preview-gating bypass provably cannot weaken production, no secrets committed, contact email HTML-escaped.

**Performance is genuinely fast by architecture:** all marketing routes static, Stripe.js never shipped to the client (server redirect to hosted Checkout), react-markdown renders server-side (zero client cost on lessons), the 5 removed deps confirmed gone, fonts 46.5KB self-hosted used-weights-only, analytics correctly absent pending consent. All three CWV projected to pass.

**Fix pass #1 resolved every actionable note:** images -61% (package 569KB->68KB, hero 309KB->126KB), the sticky-bar per-surface inversion rewritten with reliable geometry detection, hero mobile wrap, two a11y items (heading-in-label, useId), nav dedup, OG dims verified. Deferred (documented): About-page optional craft, locked-thumbnail grade, `listUsers` at scale, blog ISR (content-gated). Post-fix: build PASS, audit 21/0.

## Final Delta

**Before:** a pretty but non-functional WordPress/Bricks brochure. Placeholder content shipped to production (lorem blog, empty reviews/T&C/FAQ, placeholder phone). No booking, no payment, no login, no course delivery: the revenue mechanic did not exist. Generic execution with no concept, no signature, no design system, no structured data.

**After:** an ownable, fast, accessible, fully working digital product.
- **Concept where there was none:** "Recessional Pop" / the brand is a marked-up ceremony script, expressed through the bespoke Hype Line signature. Passes the Ownability + Three-Things tests; deliberately not the category's warm-serif-editorial default.
- **The product the brochure only implied:** the net-new 7-step booking + Stripe payment portal, real Supabase auth, the gated 8-module course rendered from the client's own content, Resend transactional email, RLS-gated access granted on payment.
- **Engineering quality floor:** Next.js 16 + Tailwind 4, a 3-layer token system (0 violations), full SEO technical (robots/sitemap/canonicals/OG/JSON-LD), WCAG-AA accessibility, branded 404/error states, pre-review audit 21/0, all three Phase 4 reviews PASS.
- **Honesty preserved throughout:** every content gap (reviews, blog, FAQ, T&C, the 9 videos, 2 download links, real love-story photos) ships as a flagged empty state, never fabricated; the legal framing stays truthful (registered celebrant handles the legals).

**Remaining to go live (client-supplied, all flagged):** Supabase project + keys + migrations; Stripe account + keys + GST decision; Resend key + verified domain; onboarding-call URL; the 9 videos + 2 download links; real reviews/blog/legal copy; the Wedding Mates vs Let's Get Wed name decision.
