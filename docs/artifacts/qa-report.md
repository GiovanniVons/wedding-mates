# QA Report
**Phase:** 4
**Agent:** qa-auditor
**Date:** 2026-06-22
**Status:** revised (fix pass #1)

---

## Resolution Log
- A11Y-1 (`<h3>` inside `<label>` on the extras toggle): FIXED. Title changed to a `<span>` accessible name; standalone card headings untouched.
- A11Y-2 (`Field.tsx` module-counter ids): FIXED. Switched to React `useId()`.
- RESP-1 (hero lockup wrap at ~375px): FIXED. Word-boundary wrap, verified at 375/390px.
- SEO-1 (OG dimensions): VERIFIED. `og-default.png` measured at exactly 1200x630; metadata is truthful.
- CQ-1 (duplicated nav source): FIXED. `site.ts` `NAV_LINKS` is now the single source; `Header` imports it.
- CQ-2 (`ensureAuthUser` pages `listUsers`): DEFERRED. Fine at expected volume; revisit if the buyer list grows large.

---

## Verdict

**PASS WITH NOTES.**

Wedding Mates is a technically strong build. Accessibility, responsive behaviour, SEO implementation, and the security-critical commerce/gating code are all correct and, in several places, exemplary. `pre-review-facts.md` reports 21/21 deterministic checks PASS (token compliance clean, 0 dead components/deps, fonts local, build green, em-dash/console.log/TODO all zero, skip link + focus-visible + reduced-motion + ARIA all present). I accept those as ground truth and do not re-verify them.

I found **zero Critical** and **zero Major** issues. Everything below is **Minor** (polish or defence-in-depth). The build clears the pass bar (0 critical, <=3 major) comfortably.

Highlights worth calling out because they are the things that usually go wrong and here did not:
- **Server-side total recompute is correct.** The client sends extra KEYS only; `computeTotal()` in `src/lib/stripe/pricing.ts` is the sole source of the charged amount, used by both the Checkout Session line items and the `orders` row. A tampered client total cannot affect the charge. (`src/app/api/stripe/checkout/route.ts`.)
- **Stripe webhook is signature-verified and idempotent.** `constructEvent` with the raw body, early `if (order.status === "paid") return`, and the route is excluded from the proxy matcher so the raw body survives. `charge.refunded` is also idempotent on order status. (`src/app/api/stripe/webhook/route.ts`.)
- **RLS gates the course content.** `modules` / `module_downloads` / `readings` SELECT require `has_course_access() OR is_admin()`; `course_access` and `orders` have no client write policy, so only the service-role client writes. (`supabase/migrations/001`, `002`, `004`.)
- **The preview-gating bypass cannot weaken production.** `hasRealSupabase()` fails the moment a real Supabase URL is present, and the bypass requires BOTH the explicit dev flag AND no real Supabase. The course `(course)/layout.tsx` and the middleware honour the same predicate. (`src/lib/auth/preview.ts`.)
- **Mobile menu focus trap is complete** (Tab/Shift-Tab wrap, Escape closes, body scroll lock, focus returned to the trigger on close, `role="dialog"` + `aria-modal`). (`src/components/layout/Header.tsx`.)
- **The persistent overlay contract is honoured.** The sticky CTA bar reserves its height via a spacer in the marketing layout, keeps `display` in a CSS class so `lg:hidden` wins (avoids the known desktop-leak bug), and samples the surface BELOW the bar (`y = innerHeight - 1`) to invert colour over dark sections (avoids the known sample-inside-the-bar bug). (`StickyCtaBar.tsx`, `StickyCtaController.tsx`, `(marketing)/layout.tsx`.)

---

## Accessibility Issues: PASS

No Critical or Major accessibility issues. The forms (booking wizard, contact, login, register) are all visibly labelled with associated `<label htmlFor>`, errors are programmatically associated (`aria-describedby` + `role="alert"` + `aria-invalid`), the booking wizard manages focus to the step region and exposes step changes via `aria-live`, the accordion is fully keyboard-operable with `aria-expanded`/`aria-controls`/`region`, every page has exactly one `<h1>`, the skip link targets `#main`, and `prefers-reduced-motion` is guarded across every animation (verified in `pre-review-facts.md`, 26 hits). Touch targets on the mobile trigger and close button are 44x44.

**A11Y-1 (Minor) -- `<h3>` heading nested inside a `<label>` on the extras toggle.**
- File: `src/components/ui/BookingExtras.tsx` (ExtrasToggleCard, lines ~30-71).
- What is wrong: the toggle is a `<label>` wrapping a visually hidden checkbox plus an `<h3>` (the extra name) and a `<p>`. Putting a heading inside a label is structurally odd: the checkbox's accessible name becomes the concatenation of the heading + description + price, and the `<h3>` injects a heading into the document outline for what is really a form control, not a section heading.
- Fix: change the `<h3>` to a non-heading element (a `<span>`/`<div>` styled with the `.h4` class) inside the label, OR keep the visible heading outside the label and give the input an explicit `aria-label={extra.name}`. Functionally it works today (the control is reachable and named), so this is polish, not a blocker.
- Evidence: read the component; the only label content is the h3 + p + price spans.

**A11Y-2 (Minor) -- field IDs come from a module-level counter, not `useId`.**
- File: `src/components/ui/Field.tsx` (`useFieldId`, lines 3-8).
- What is wrong: `fieldIdSeq` is a module-scoped integer incremented on each render. The Accordion already uses React's `useId()` (correct); the Field primitives do not. For server-rendered forms this risks a server/client ID mismatch (hydration) and the counter is shared across all field instances mounted in a session. In practice every consumer of `TextField` here is inside a `"use client"` form (BookingWizard, ContactForm, LoginForm, RegisterForm), so the fields render client-side and the label/`htmlFor`/`aria-describedby` association is intact, which is why this is Minor and not a functional break.
- Fix: replace `useFieldId` with React's `useId()` (same one-line pattern the Accordion uses) so IDs are SSR-stable and collision-proof if a Field is ever used in a server component.
- Evidence: read Field.tsx vs Accordion.tsx.

**A11Y-3 (Minor, informational) -- contrast was pre-computed by the brand; spot-check confirms.**
- The as-built buttons and chips spot-check fine: primary CTA is grape (#2b1a4a-family) on coral (booking step 1, home, pricing screenshots) with strong contrast in default state; the sticky bar inverts to page-white on grape over dark sections; coral price figures sit on light card fields. The brand pre-computed accent-on-background ratios at Phase 2 per the Hard Rules, and `pre-review-facts.md` confirms `:focus-visible` is globally styled. No new contrast failure found in the rendered states reviewed. Likely overlaps with the design-review contrast pass.

---

## Responsive Issues: PASS

Reviewed the rendered build at mobile width via the Phase 4 gate screenshots (`.tmp/gate/`, desktop + mobile, fold by fold) and traced the structural CSS. No horizontal scroll at mobile width on home, pricing, booking, contact, faq, about, or course. The booking wizard is single-column and full-width at mobile; the pricing extras stack; the sticky bar reserves its spacer and inverts correctly; cards distribute content with no top-clipping.

**RESP-1 (Minor) -- hero display lockup breaks one or two letters per line at the narrowest width.**
- File: `src/components/sections/HomeHero.tsx` (the `HypeLine` lockup, `scale="hero"`, `className="max-w-[16ch]"`, lines ~77-90).
- What is wrong: at 375-390px the "GET WED YOUR WAY" display type is large enough that, constrained to `max-w-[16ch]`, it wraps as "GE / T / WE / D / YO / U / R / WA / Y" (visible in `home-m-01.png`). Words split mid-syllable rather than wrapping on whole words, which reads as a layout accident even though it is the intended bleed. It does not cause overflow and the semantic `<h1>` is a separate `sr-only` element so crawlers/AI are unaffected, but it is a visible polish blemish on the most important fold.
- Fix: at the smallest breakpoint either step the hero font-size clamp down a notch, widen the measure so whole words fit (e.g. allow the line to use more of the viewport on mobile), or apply `word-break: keep-all` / a non-breaking strategy so the three words wrap as units. Verify on the rendered 375px fold.
- Evidence: `.tmp/gate/home-m-01.png`. This is the responsive twin of a likely design-critic typography/art-direction note (flag for dedup with design-review).

**RESP-2 (Minor, informational) -- min mobile font sizes look compliant.**
- Body and helper text use `var(--font-size-text-small)` and up; no text below ~14px observed in the mobile screenshots reviewed. No fix needed; noted for completeness.

---

## SEO Implementation Issues: PASS

Cross-referenced the implementation against `seo.md`. The implementation is faithful and, in the conditional-content gating, better than most builds.

Verified correct:
- **robots.ts** disallows `/book`, `/book/`, `/login`, `/register`, `/forgot-password`, `/reset-password`, `/course`, `/course/`, `/design-book`, `/api/` for `*`, blocks the AI-training crawler list entirely, and emits the absolute `Sitemap:` URL. Matches the seo.md Sitemap/Robots Config. (`src/app/robots.ts`.)
- **sitemap.ts** lists only indexable marketing pages and gates `/faq`, `/reviews`, `/blog`, `/terms` behind `CONTENT_FLAGS`, so empty conditional pages are auto-excluded until real content ships (exactly the seo.md rule). `/privacy` is included; functional/gated/`/design-book` are never listed. (`src/app/sitemap.ts`, `src/lib/site.ts`.)
- **Per-route metadata** sets a self-referential canonical (clean absolute URL, no trailing slash, `/` normalised), OG + Twitter cards, `en_AU` locale, and `robots: { index:false, follow:false }` on every functional/gated/auth/booking/course page (`(course)/layout.tsx`, `(auth)/layout.tsx`, `(booking)/layout.tsx`, and each auth/book page set it). The root layout sets `metadataBase`, the default title, and a `%s | Wedding Mates` template. (`src/lib/metadata.ts`, `src/app/layout.tsx`.)
- **OG image exists and is referenced.** `public/og/og-default.png` and `public/og/logo.png` are present on disk and referenced via `SITE.ogImage` / `SITE.logo`; favicon `public/images/cropped-favicon.png` exists.
- **JSON-LD shapes match seo.md.** Organization + WebSite site-wide in the root layout; Course on `/how-it-works`; Product+Offer (with the four `addOn` offers) + Course on `/pricing`; FAQPage on `/faq`; Person (Sarah) on `/about`. `sameAs` is correctly omitted (client social URLs pending, not fabricated); no `aggregateRating`/`Review` until real reviews exist; no GST `priceSpecification` until confirmed. All schema is server-rendered via `dangerouslySetInnerHTML` with JSON.stringify (no user input). (`src/components/seo/JsonLd.tsx`.)
- **FAQ schema/visible parity is guaranteed by construction.** `/faq` builds the FAQPage from `ALL_FAQ_ITEMS`, which is `FAQ_GROUPS.flatMap(g => g.items)` -- the exact same array the visible accordion renders. They cannot drift. Home renders the inline FAQ visible-only with no competing FAQPage node, per the seo.md recommendation. (`src/app/(marketing)/faq/page.tsx`, `src/content/copy.ts`.)
- **Noindex coverage on gated/booking/auth + `/course/*` and `/design-book` disallow** is implemented both ways (per-page metadata noindex AND robots.txt Disallow), the belt-and-braces seo.md asked for. `/design-book` additionally lives under the `(internal)` route group so it never enters the sitemap registry.
- `<html lang="en-AU">` set; `inLanguage: "en-AU"` in WebSite/Course schema; no hreflang (correct for single-language).

**SEO-1 (Minor) -- OG image dimensions are asserted as 1200x630 but not verified against the actual file.**
- File: `src/lib/metadata.ts` (line ~48), `src/app/layout.tsx` (line ~28).
- What is wrong: the metadata hardcodes `width: 1200, height: 630` for `og-default.png`. The file exists (53 KB) but I did not confirm its pixel dimensions are actually 1200x630. If the asset is a different ratio, the declared dimensions will mislead scrapers.
- Fix: confirm the PNG is genuinely 1200x630 (a one-line `sips -g pixelWidth -g pixelHeight public/og/og-default.png` or equivalent) before launch; if it differs, correct the declared width/height. No code change if it already matches.
- Evidence: declared in metadata; file present but dimensions not measured.

**SEO-2 (Minor, pre-launch reminder, not a code defect) -- production host + redirects + social URLs are still pending per seo.md.**
- The build correctly hardcodes `https://letsgetwed.com.au` in `src/lib/site.ts`, which is the seo.md domain assumption. Before launch the team still owes (per seo.md, not a build bug): confirm the apex host and `trailingSlash`/`www` 301s at the Netlify layer, build the old->new 301 map from the live WordPress sitemap, and supply real `sameAs` social URLs. These are client-data/infra tasks flagged in seo.md, surfaced here only so they are not lost. No fix in code now.

---

## Code Quality Notes: PASS

No Critical or Major code-quality issues. `pre-review-facts.md` confirms 0 `console.log`, 0 TODO/FIXME, 0 em dashes, 0 dead components, 0 unused dependencies, and a clean TypeScript build. My read adds:

- **No `any` types** found in `src` (grep clean); discriminated-union props on `Button` (`as: "a"` vs `as?: "button"`) keep the anchor/button split type-safe and semantic (`<a>` for navigation CTAs, `<button>` for actions). Correct native-element usage throughout.
- **Error handling is graceful and consistent.** Checkout returns 503 with a typed code when Stripe is unconfigured (rendered as a calm "payments not configured" state, never a 500); the contact route degrades to `{ delivered: false }` with a 200 when Resend is absent; the webhook prefers log-and-200 for handler errors to avoid Stripe retry storms that could double-send emails, and only returns non-2xx for signature/config failures. Booking and contact both validate with zod before acting.
- **No secrets committed.** `src` contains only the placeholder constant `["sk_test_xxx","sk_live_xxx",""]`; real keys live in `.env.local` (not in a tracked location), and `.env.example` documents the shape. No `sk_live`/service-role values in source.
- **HTML injection guarded** in the contact email (`escapeHtml` on name/email/message before interpolation). XSS-safe.
- **`target="_blank"` links all carry `rel="noopener noreferrer"`** (course readings, CourseUI download card, SupportBlock, LessonBody) and the footer credit link to `giovannivons.com` carries `rel="noopener"`. No tab-nabbing exposure.
- **Viewport zoom is not disabled** (no `user-scalable=no` / `maximum-scale`; Next 16 default viewport is used).

**CQ-1 (Minor) -- duplicated `NAV_LINKS` source of truth.**
- Files: `src/lib/site.ts` (`NAV_LINKS`, which already conditionally includes Reviews via `CONTENT_FLAGS`) and `src/components/layout/Header.tsx` (`DEFAULT_NAV`, a hardcoded copy that omits the conditional Reviews logic).
- What is wrong: the marketing header is fed nav by `MarketingHeader` (not audited line-by-line here), but `Header.tsx` carries its own `DEFAULT_NAV` constant that duplicates the link set and will silently diverge from `NAV_LINKS` if the menu ever changes (e.g. when `reviewsHaveContent` flips true, the Header default would not pick it up).
- Fix: have `Header`'s default fall back to `NAV_LINKS` from `src/lib/site.ts` rather than a local hardcoded array, so there is one source of truth for the nav and the conditional Reviews item stays consistent.
- Evidence: read both files; two independent nav arrays.

**CQ-2 (Minor) -- `ensureAuthUser` pages `listUsers` up to 10x200 to find an existing buyer.**
- File: `src/app/api/stripe/webhook/route.ts` (`ensureAuthUser`, lines ~292-319).
- What is wrong: when `admin.createUser` reports the email already exists, the code linearly pages through `listUsers` (up to 2000 users) to find the match. This is correct and bounded, but at scale it is O(users) per returning-buyer webhook and depends on email-case matching. It is not a bug today.
- Fix (future-proofing, not required for launch): prefer a direct lookup by email if the Supabase admin API/Postgres function exposes one (e.g. a `get_user_by_email` RPC against `auth.users` via the service role), falling back to the paged scan. Low priority given expected volume.
- Evidence: read the helper.

## Token Compliance: PASS

Transcribed from `pre-review-facts.md` (ground truth; not re-run): `rgba()` 0 hits, bare Tailwind spacing 0 hits, bare Tailwind radius 0 hits, `var(--space-*)` 475 references, Zone 5 cascade split clean, `@theme inline` registration clean (20 colours registered, 0 opacity/state misuse). No new token violation found during this audit; every visual value I read in components used `var(--*)` tokens or registered Tailwind utilities. **PASS.**

---

## Overlap Notes (for consolidated-fixes dedup)

- **RESP-1** (hero lockup letter-breaking at 375px) likely overlaps a design-critic typography/art-direction finding.
- **A11Y-3** (contrast spot-check) overlaps the design-review contrast pass.
- No performance findings here by design; bundle/JS budgets are the performance-report's mandate.
