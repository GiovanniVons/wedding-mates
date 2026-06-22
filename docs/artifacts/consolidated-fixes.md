# Consolidated Fixes -- Wedding Mates
**Phase:** 4
**Agent:** orchestrator
**Date:** 2026-06-22
**Status:** draft

---

Compiled from design-review.md, qa-report.md, performance-report.md. Deduplicated; ranked content > contrast > fonts > colors > states > layout > animation > polish. All three reviews returned **PASS WITH NOTES** (0 Critical, 0 Major on design + QA). The developer works this list top to bottom.

## Critical

_None._ All three reviews returned zero Critical issues. The 4->5 gate requirement (all Critical resolved) is met. The items below are improvements, not blockers.

## Major

### M1 -- Pre-compress the large hero/product images (LCP + transfer)
**Reported by:** performance-expert.
The real WP photos ship at full weight: `wedding-mates-package.jpg` ~569KB, hero `wedding-banner1.jpg` ~316KB (the home LCP), plus three secondary banners 200KB+. Run a Sharp pass: generate AVIF/WebP + responsive widths, ensure `next/image` `sizes` are correct, and confirm `priority` is on the TRUE LCP image (home hero) and lazy on below-fold. Verify the about-page founder photo `priority` matches its LCP role. Expected: meaningful LCP + total-transfer win on mobile.
**Files:** `public/images/*` (re-encode), the home hero + founder + pricing image components.

## Minor

### m2 -- Sticky CTA bar does not invert over the full-coral Final-CTA section (mobile)
**Reported by:** design-critic (`home-m-12.png`).
Over the one full-coral section, the sticky bar stays coral-on-coral (legible at 4.5:1 but loses separation). Add `data-theme="coral"` to that section so the existing per-surface inversion detection flips the bar to grape.
**File:** the home Final-CTA section + `StickyCtaController.tsx`.

### m3 -- Hero lockup wraps awkwardly at ~375px
**Reported by:** design-critic + qa-auditor (RESP-1, `HomeHero.tsx`).
"GET WED YOUR WAY" breaks one or two letters per line at 375px. Tune the clamp / line-break so it stacks cleanly (word-level, not mid-word) at the smallest width.
**File:** `src/components/sections/HomeHero.tsx`.

### m4 -- `<h3>` nested inside a `<label>` (extras toggle)
**Reported by:** qa-auditor (A11Y-1).
The extras toggle card puts a heading inside a label. Change the title to a non-heading element (or restructure so the label wraps only the control + accessible name).
**File:** `src/components/ui/BookingExtras.tsx`.

### m5 -- Use `useId()` instead of a module counter for field ids
**Reported by:** qa-auditor (A11Y-2).
`Field.tsx` uses a module-level counter for input ids (SSR/hydration risk); `Accordion.tsx` already uses `useId()`. Switch Field to `useId()`.
**File:** `src/components/ui/Field.tsx`.

### m6 -- Consolidate the duplicated nav source
**Reported by:** qa-auditor (CQ-1).
Nav links are defined in both `Header.tsx` (`DEFAULT_NAV`) and `site.ts` (`NAV_LINKS`). Make `site.ts` the single source and import it.
**Files:** `src/components/layout/Header.tsx` / `MarketingHeader.tsx`, `src/lib/site.ts`.

### m7 -- Verify OG image dimensions
**Reported by:** qa-auditor (SEO-1).
OG dimensions are hardcoded 1200x630; confirm the generated `public/og/og-default.png` is actually 1200x630 (measure, do not assume).
**Files:** `public/og/og-default.png`, `src/lib/metadata.ts`.

## Deferred / Won't fix (documented)

- **About page craft (design m2-note):** on-spec (it tilts editorial-quiet by design); optional POP detail later. Defer.
- **Locked-module thumbnails muted (design m3-note):** correct as a locked affordance. Won't fix unless the client wants them warmer.
- **`ensureAuthUser` pages `listUsers` (qa CQ-2):** fine at expected volume; revisit only if the buyer list grows large. Defer.
- **`/blog/[slug]` static-params/ISR (perf):** moot until real blog content exists. Defer with the blog content gap.
- **Font manifest 0KB in pre-review-facts (perf Minor-4):** script path bug (fonts live in `src/fonts/`, script scans `public/fonts/`); fonts are correctly loaded at 46.5KB. Not a build defect; note for the audit script.
