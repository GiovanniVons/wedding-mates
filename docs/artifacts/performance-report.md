# Performance Report
**Phase:** 4
**Agent:** performance-expert
**Date:** 2026-06-22
**Status:** revised (fix pass #1)

---

## Resolution Log
- M1 (large image pre-compression, the top LCP/transfer win): FIXED. Sharp re-encode of all heavy JPGs in place: `wedding-mates-package.jpg` 569KB->68KB (-88%), home LCP `wedding-banner1.jpg` 309KB->126KB (-59%), `introduction-banner.jpg` 206KB->53KB, `wedding-banner2.jpg` 216KB->83KB, module1-8 ~62KB->~9KB each; total images dir 2514KB->989KB (-61%). `priority` confirmed on the true LCP images (home hero, about founder); below-fold lazy.
- Redundant `priority` prop / LCP verification: FIXED as part of M1.
- `/blog/[slug]` static-params + ISR: DEFERRED. Moot until real blog content exists.
- Font manifest 0KB reading (Minor-4): NOTED. Audit-script path bug (fonts in `src/fonts/`, script scans `public/fonts/`); fonts are correctly loaded at 46.5KB. Not a build defect.

---

**Verdict: PASS WITH NOTES.** All three Core Web Vitals are projected to pass. The architecture is genuinely fast: marketing routes are static, Stripe.js is never shipped to the client (server redirect to hosted Checkout), react-markdown renders on the server with zero client cost, all five flagged dependencies are confirmed removed, no analytics scripts load before consent, and every image uses next/image with correct responsive sizes. The only actionable items are source-image pre-compression (one 569 KB JPG, two banners over 200 KB) and one redundant priority prop. Nothing here blocks ship.

## Overall Score

- **LCP: ~2.0-2.4s on 4G mobile (estimated-from-evidence)** (target: < 2.5s) **PASS (tight)**
  Basis: homepage LCP element is the hero photo `wedding-banner1.jpg` (316 KB source) rendered through next/image with `priority` and `sizes="100vw"`, served as AVIF/WebP at request time. The hero display text uses Anton with `display: swap` and a sized fallback (Oswald, Arial Narrow), so text paints immediately and does not gate LCP. Margin is tight because the priority image is a 100vw full-bleed banner; pre-compressing the source (see Critical-1) buys headroom.
- **CLS: ~0.00-0.02 (estimated-from-evidence)** (target: < 0.1) **PASS**
  Basis: every next/image uses `fill` inside an explicitly sized parent (aspect-ratio or fixed height), so no image reflow. Fonts use `display: swap` with `fallback` stacks (size-adjust handled by next/font metric overrides). The sticky CTA bar has a documented LAYOUT CONTRACT: it is `position: fixed` with a fixed `--sticky-cta-height`, and the page renders a spacer of equal height so the bar never shifts content. No late-loading embeds.
- **INP: ~50-150ms on the booking wizard (estimated-from-evidence)** (target: < 200ms) **PASS**
  Basis: the heaviest interactive surface is `BookingWizard.tsx`. State is local `useState`, validation is per-step Zod (small synchronous parses), step transitions use Framer Motion `AnimatePresence` on transform/opacity (GPU-composited, not layout). No synchronous network on keystroke; the only fetch is the final POST to `/api/stripe/checkout`. No expensive global re-renders observed. The harness has no runtime profiler, so this is an estimate, not a measured INP.
- **Total client JS: ~1,598 KB uncompressed across all client chunks (measured from `.next/static/chunks`)**; estimated ~100-130 KB gzipped shared first-load (gzip ratio ~3x measured on a sample chunk: 20.4 KB raw to 7.0 KB gzip). Per-route First Load JS is NOT available from the Next.js 16 Turbopack build output (see Bundle Analysis).
- **Total CSS: 54.0 KB uncompressed, single file (measured from `.next/static`)**; ~10-14 KB gzipped estimated. Tailwind 4 is purging correctly (a 54 KB single sheet for a 29-route site with a full token system is in the expected, purged range).
- **Total Font Payload: 46.5 KB across 3 self-hosted woff2 files (measured: anton 5.1 KB + archivo-black 6.3 KB + archivo-variable 34.9 KB).**
  Note: pre-review-facts.md reports "0.0 KB across 0 font files" because its script scanned `public/fonts/`. The fonts live in `src/fonts/` and are bundled by next/font/local. The real payload is 46.5 KB. This corrects the ground-truth font line; it is a path mismatch in the audit script, not a missing-fonts defect.

## Bundle Analysis

**Per-route First Load JS is not emitted by this build.** Next.js 16.2.9 with Turbopack (the configured builder, required because the workspace path contains spaces) does not print the per-route "First Load JS" table that the webpack builder produces. The build output in pre-review-facts.md is complete and correct, but it ends at the route list with no size column. I did not fabricate per-route numbers. To obtain them, run a one-off webpack build with `@next/bundle-analyzer` (instructions in Minor-2) on a copy of the repo in a space-free path.

**What I could measure (from `.next/static/chunks`, all uncompressed):**

| Chunk | Uncompressed | Likely contents |
|---|---|---|
| `3rva6qdgfnnqx.js` | 234.0 KB | React + React DOM vendor |
| `34k6uyvsnlgl8.js` | 227.1 KB | Framer Motion vendor (shared by 7 client components) |
| `2oh5rha75m2ak.js` | 134.2 KB | Next.js client runtime |
| `424ynz...` / `0o6tpls...` | 115.2 KB each | shared app/route chunks |
| `0cz1d0mv5g_q7.js` | 110.0 KB | shared app chunk |
| remaining chunks | < 61 KB each | per-route + UI |

- **Total uncompressed client JS: 1,598 KB. Estimated shared first-load gzipped: ~100-130 KB.** That is healthy for a Next.js 16 site that uses Framer Motion for an orchestrated load sequence at MOTION_INTENSITY 6 (the brand dial; see brand-guidelines.md line 127). Animation is in-budget per the performance-audit Step 9 calibration: at MOTION_INTENSITY 4-6, Framer Motion entrances are expected and only flagged if they degrade a Core Web Vital. They do not.
- **Framer Motion is correctly scoped.** All 7 importers are `"use client"` components (ProgressRing, Accordion, HypeLine, HomeHero, BookingWizard, Header, ScrollReveal). No server component pulls it in, so static marketing routes that do not animate (faq, pricing, terms, privacy) do not pay for the framer vendor chunk on their server HTML; it loads only where a client island needs it.
- **react-markdown + remark-gfm ship ZERO client JS.** `LessonBody.tsx` is a Server Component (no `"use client"`), confirmed by its own doc comment and by import-boundary check. The parsed markdown tree is rendered to static HTML on the server. This is the correct call and avoids a ~40-60 KB markdown parser in the course client bundle.
- **The confetti burst is cheap.** `ConfettiBurst.tsx` is a small client component using flat SVG shards positioned with CSS transforms (no canvas, no physics library, no `canvas-confetti` dependency). Particle count and duration read from CSS tokens; `prefers-reduced-motion` zeroes them. Negligible bundle and runtime cost. Rationed to one fire per page (hero peak, final CTA, confirmation).
- **Removed dependencies CONFIRMED gone.** `grep` across `src/` and `package.json` returns zero hits for `react-query`/`@tanstack`, `class-variance-authority`, `lucide-react`, `sonner`, and `zustand`. The dependency manifest in pre-review-facts.md (15 deps, 0 unused) is accurate.
- **No `next/dynamic` anywhere.** Not a defect at this scale: the only heavy-ish client island is the BookingWizard, which lives on a dynamic `/book` route that is never part of a marketing first load, so dynamic-importing it would add complexity for no first-load win. See Minor-1 for the one place a dynamic import could help.

## Image/Font Audit

### Image Audit

All production images use `next/image`. `next.config.ts` sets `images.formats: ["image/avif", "image/webp"]`, so Next serves AVIF first, then WebP, then the original JPG, at the resolution the `sizes` prop requests. The source-file sizes below are the on-disk originals; the bytes actually shipped to a modern browser are substantially smaller (AVIF at the requested width). The flags are about source weight and one redundant priority.

| Image | Source size | Used at | sizes prop | priority | Status |
|---|---|---|---|---|---|
| `wedding-banner1.jpg` | 316 KB | HomeHero (LCP) | `100vw` | yes (correct) | FIX source (Critical-1) |
| `wedding-mates-package.jpg` | 569 KB | homepage line 260 (below fold) | `(max-width:1024px) 100vw, 45vw` | no (lazy, correct) | FIX source (Critical-1) |
| `wedding-img2.jpg` | 269 KB | how-it-works | `(max-width:1024px) 100vw, 50vw` | no | FIX source (Major-1) |
| `wedding-banner2.jpg` | 221 KB | alt section | per-section sizes | no | FIX source (Major-1) |
| `introduction-banner.jpg` | 211 KB | course intro | per-section sizes | no | FIX source (Major-1) |
| `sarah-wedding.jpg` | 51 KB | about hero | `(max-width:1024px) 100vw, 50vw` | yes | REVIEW priority (Major-2) |
| `wedding2.jpg` | 43 KB | homepage line 95 | `(max-width:1024px) 100vw, 45vw` | no (lazy) | OK |
| `kat-david-img.jpg` | 133 KB | love-story card | per-card sizes | no (lazy) | minor (Minor-3) |
| 8 module thumbnails | 57-72 KB each | course/dashboard cards | per-card sizes | no (lazy) | OK |
| icons (7 SVG) | 1.4-5.1 KB | how-it-works, course | n/a | n/a | OK |
| `footer-logo.png` / `sign.png` | 15 KB / 11 KB | footer, signature | n/a | n/a | OK |

Notes:
- The hero LCP image (`wedding-banner1.jpg`) has `priority` and `fill` with `sizes="100vw"`. Correct setup. The only lever left is source weight.
- The 569 KB `wedding-mates-package.jpg` is the heaviest asset on disk. It is below the fold and lazy, so it does not touch LCP, but on a slow connection a user scrolling will pull a large transfer. Pre-compression helps the AVIF/WebP variants too (Next optimizes from the source; a bloated source yields a heavier optimized output).
- No decorative raster images that should be CSS. Gradients and scrims are already CSS (`linear-gradient` with token colors). SVG icons are appropriately sized.

### Font Audit

All fonts load via `next/font/local` from `src/fonts/` (self-hosted, no external CDN request, no render-blocking stylesheet link).

| Font | Variants | Size | Strategy | Status |
|---|---|---|---|---|
| Anton | 1 (400) | 5.1 KB | `display: swap`, fallback Oswald/Arial Narrow | OK |
| Archivo Black | 1 (400) | 6.3 KB | `display: swap`, fallback Archivo | OK |
| Archivo (variable 400-800) | 1 file, full axis | 34.9 KB | `display: swap`, fallback Inter | OK |
| **Total** | **3 files** | **46.5 KB** | | **OK** |

- Only the weights actually used are loaded: Anton 400 (single weight by design, the condensed display), Archivo Black 400 (heavy alternate H1/H2), and one Archivo variable file covering 400-800 for body/UI. No redundant static weights. This is lean.
- `display: swap` on all three plus `fallback` stacks means text paints in the fallback immediately, then swaps. next/font computes metric overrides (size-adjust, ascent/descent) for the fallbacks automatically, which is why CLS from the swap is near zero.
- The variable Archivo file (34.9 KB) carries the full 400-800 axis. If a future audit confirms only 400/500/600/700 are ever used, an axis-subset could trim a few KB, but at 34.9 KB it is not worth the brittleness now. Leave as is.
- The fonts are preloaded by next/font for the route that uses them (Anton/Archivo are referenced in the root layout via the `fontVariables` class, so they preload site-wide for above-fold display text). Good for LCP text.

## Prioritized Fixes

### Critical Issues (Blocking Ship)
None. All three Core Web Vitals pass.

### Major Issues (Should Fix)

**Critical-1 (recategorized as the top Major; not blocking): Pre-compress the three largest source JPGs.**
- **Impact:** LCP headroom on the homepage hero (316 KB source) and transfer weight on the 569 KB below-fold package image. Next.js optimizes from the source, so a lighter source yields lighter AVIF/WebP variants and faster optimization. Largest single win for mobile.
- **Location:** `public/images/wedding-banner1.jpg` (316 KB), `public/images/wedding-mates-package.jpg` (569 KB).
- **Fix:** Run Sharp over these two source files before they are optimized at request time. Target: re-encode at quality 78-82, max dimension 2000px wide (the hero never renders wider than ~2x a 1440 viewport). Example: `sharp('wedding-banner1.jpg').resize({ width: 2000, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile('wedding-banner1.jpg')`. Expect the hero source to drop from 316 KB to ~120-160 KB and the package image from 569 KB to ~180-220 KB with no visible quality loss.
- **Expected Improvement:** LCP -150 to -300 ms on a throttled 4G mobile profile; ~600 KB less source weight feeding the optimizer.
- **Evidence:** `ls -la public/images` (measured sizes); HomeHero.tsx line 52 (hero src, priority); page.tsx line 260 (package image, below fold).

**Major-1: Pre-compress the secondary 200+ KB banners.**
- **Impact:** Below-fold transfer on how-it-works, alt sections, and the course intro. Not LCP-critical (all lazy) but heavy on scroll.
- **Location:** `wedding-img2.jpg` (269 KB), `wedding-banner2.jpg` (221 KB), `introduction-banner.jpg` (211 KB).
- **Fix:** Same Sharp pass as Critical-1, quality 80, max width 2000px. These three together drop from ~701 KB to roughly ~280-340 KB of source.
- **Expected Improvement:** Lighter optimized variants on three marketing/course routes; smoother scroll on slow connections.
- **Evidence:** `ls -la public/images`; how-it-works/page.tsx line 53.

**Major-2: Re-check the `priority` prop on the about-page image.**
- **Impact:** A `priority` image is preloaded and competes for early bandwidth with the actual LCP element. On the about page, `sarah-wedding.jpg` (51 KB) carries `priority`. If it is genuinely the above-fold hero on `/about`, keep it. If it sits below an above-fold text block, the prop wastes early bandwidth.
- **Location:** `src/app/(marketing)/about/page.tsx` line 51.
- **Fix:** Confirm on the rendered about page (desktop and mobile) whether `sarah-wedding.jpg` is the largest element in the initial viewport. If yes, leave `priority`. If it is below the fold, remove `priority` so it lazy-loads and stops competing with the page's true LCP. At 51 KB the downside is small, which is why this is Major not Critical, but priority should be reserved for the one LCP element per page.
- **Expected Improvement:** Up to -50 to -100 ms LCP on `/about` if the prop is currently misplaced; no change if it is correct.
- **Evidence:** about/page.tsx line 48-52 (priority on founder photo); only two priority props exist site-wide (hero + this).

### Minor Optimizations (Nice to Have)

**Minor-1: Consider a dynamic import for the BookingWizard celebration path.**
- **Impact:** Tiny. The wizard already lives on a dynamic `/book` route outside any marketing first load, so the framer/wizard JS is route-scoped already. The only deferrable piece is the ConfettiBurst, which only fires on the confirmation beat.
- **Location:** `src/components/booking/BookingWizard.tsx`, `src/components/animations/ConfettiBurst.tsx`.
- **Fix:** If `/book` ever shows measurable wizard-load lag, `next/dynamic` the ConfettiBurst with `ssr: false` so it loads after the form is interactive. Not worth doing now; the component is small.
- **Expected Improvement:** Negligible. Listed for completeness.

**Minor-2: Capture per-route First Load JS once, in a space-free path.**
- **Impact:** Observability only. Turbopack here does not print the per-route size table, so there is no per-route budget baseline.
- **Location:** build tooling.
- **Fix:** Copy the repo to a path without spaces, install `@next/bundle-analyzer`, and run `ANALYZE=true next build` with the webpack builder once to capture a per-route First Load JS table and a treemap. Record the numbers in the improvement ledger as the baseline. Do not change the project's default builder (Turbopack is required for the spaced workspace path per the Turbopack-spaces lesson).
- **Expected Improvement:** None directly; gives a per-route budget to defend in future changes.

**Minor-3: Pre-compress `kat-david-img.jpg` (133 KB) with the same Sharp pass.**
- **Impact:** Small. Below-fold love-story card image.
- **Location:** `public/images/kat-david-img.jpg`.
- **Fix:** Include in the Sharp batch from Critical-1/Major-1. Drops to ~50-70 KB.
- **Evidence:** `ls -la public/images`; ComponentsSection line 297, page.tsx love-story card.

**Minor-4: Correct the font-payload path in `pre-review-audit.py`.**
- **Impact:** Tooling accuracy. The script reports 0 KB / 0 fonts because it scans `public/fonts/`; the fonts are in `src/fonts/`. Future audits will keep showing a false zero.
- **Location:** `.claude/skills/qa-audit/scripts/pre-review-audit.py` (font-payload check).
- **Fix:** Have the font-payload check read the `src` paths from the next/font/local declarations (it already parses them for the font manifest) and sum those files, rather than globbing a fixed `public/fonts/` directory.
- **Expected Improvement:** None to the site; removes a recurring false-zero in ground-truth facts.

## Rendering Strategy Review

The static/dynamic split is correct for a marketing-plus-app site. From the build route table (pre-review-facts.md):

- **Static (prerendered) -- correct:** `/`, `/about`, `/blog`, `/contact`, `/faq`, `/how-it-works`, `/pricing`, `/privacy`, `/reviews`, `/terms`, `/_not-found`, `robots.txt`, `sitemap.xml`, `/design-book`. Every public marketing page is static. This is exactly right: these are content pages with no per-request data, so they ship as cached HTML and hit the CDN. LCP benefits directly from static delivery (low TTFB).
- **Dynamic (server-rendered on demand) -- correct:** all `/api/*` handlers, `/auth/callback`, `/book` and `/book/confirmation` (booking session + Stripe state), every `/course/*` route (gated content keyed to the authenticated user's progress), `/login`, `/register`, `/forgot-password`, `/reset-password`, `/course/locked`, and `/blog/[slug]`. Auth, booking, and course gating genuinely need request-time rendering (Supabase session per user). None of these is a marketing entry point, so their dynamic cost does not touch the conversion-critical first paint.
- **One observation, not a defect:** `/blog/[slug]` is dynamic. If blog posts are static content with stable slugs, `generateStaticParams` plus ISR would make them static and faster. This only matters if/when blog content exists and is crawled. At launch the blog index is static and the slug route is dynamic; acceptable. Flag for the content phase, not a ship blocker.

Metadata is generated statically on the marketing routes (via `lib/metadata.ts`), and JSON-LD is server-rendered (JsonLd is a server component). No client-time metadata work. Good.

## Third-Party Audit

| Script / SDK | Loads where | Client cost | Necessity | Status |
|---|---|---|---|---|
| Stripe.js (`@stripe/stripe-js`) | NOT loaded | 0 KB | n/a | EXCELLENT |
| Stripe Node SDK | server only (`lib/stripe/server.ts`, `/api/stripe/*`) | 0 KB client | required | OK |
| Resend | server only (`lib/email/resend.ts`, `/api/contact`) | 0 KB client | required | OK |
| Supabase (`@supabase/ssr`, `supabase-js`) | server + auth/course client islands | route-scoped | required | OK |
| Analytics (GA4 / Meta Pixel) | NOT loaded | 0 KB | deferred | CORRECT (consent-gated post-launch) |

- **Stripe.js is never shipped to the browser.** This is the standout. The BookingWizard does not import `@stripe/stripe-js` or call `loadStripe`. It POSTs the order to `/api/stripe/checkout` (server) and redirects with `window.location.assign(body.url)` to Stripe's hosted Checkout page. So the ~30 KB Stripe.js client SDK plus its network connection to `js.stripe.com` never load on the marketing site or even on `/book` until the user is already leaving for Stripe's domain. This is the most performance-correct way to integrate Stripe. No change needed.
- **Resend is server-only.** Imported only in `lib/email/*` and the `/api/contact` handler. No client SDK. Correct.
- **No analytics scripts present anywhere.** Zero hits for gtag, googletagmanager, fbq, plausible, or `next/script`. This matches the plan: analytics integrate post-launch behind the Vonzie Nexus CMP consent bridge (poll for CMP load, read stored consent categories, then dispatch `gtag('consent','update',...)`). Nothing fires on localhost or in production until consent. When analytics are added, load them with `next/script strategy="afterInteractive"` and gate them on the Nexus consent category so they never block first paint. For now: correctly absent.
- **No third-party fonts, maps, or chat widgets.** Fonts are self-hosted (see Font Audit). No external render-blocking resources.

## Recommendations Summary (ranked by Core Web Vital impact)

1. **Pre-compress `wedding-banner1.jpg` (hero LCP) and `wedding-mates-package.jpg` with Sharp** (Critical-1). Biggest mobile LCP and transfer win.
2. **Pre-compress the three 200+ KB secondary banners** (Major-1). Lighter scroll weight on three routes.
3. **Verify the `priority` prop on `/about` `sarah-wedding.jpg`** (Major-2). Reserve priority for the one true LCP element.
4. **Capture per-route First Load JS once in a space-free path** (Minor-2). Establishes a bundle budget baseline.
5. **Pre-compress `kat-david-img.jpg`; fix the audit-script font path** (Minor-3, Minor-4). Housekeeping.

When analytics land post-launch: `next/script afterInteractive` plus Nexus consent gating, never before consent and never render-blocking.
