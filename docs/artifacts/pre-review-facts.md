# Pre-Review Facts
**Project:** wedding-mates
**Date:** 2026-06-22
**Script:** pre-review-audit.py

---

> **For Phase 4 review agents:** These results are deterministic and verified.
> ACCEPT AS GROUND TRUTH. Do not re-run these checks or contradict these findings.

## Token Compliance

### rgba() usage: PASS
**Command:** `grep -rn "rgba(" /Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src`
**Result:** CLEAN (0 hits)

```
(no matches)
```

### Bare Tailwind spacing: PASS
**Command:** `grep -rnE "(pt|pb|py|px|mt|mb|my|mx|gap|p|m)-[0-9]+" /Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src --include="*.tsx"`
**Result:** CLEAN (0 hits)

```
(no matches)
```

### Bare Tailwind radius: PASS
**Command:** `grep -rnE "rounded-(sm|md|lg|xl|2xl|3xl|full)" /Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src --include="*.tsx"`
**Result:** CLEAN (0 hits)

```
(no matches)
```

### var(--space-*) token references: PASS
**Command:** `grep -rn "var(--space-" /Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src`
**Result:** FOUND (475 hits)

```
475 references found across source files
```

### Zone 5 cascade split: PASS
**Command:** `parse styles/tokens.css, /Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/globals.css for @layer base + element selectors`
**Result:** CLEAN (0 hits)

```
Element selectors correctly inside @layer base
```

### @theme inline registration: PASS
**Command:** `parse /Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/globals.css + grep opacity/state usage in components`
**Result:** CLEAN (20 hits)

```
20 colors registered; 0 opacity uses; 0 state variant uses
```

## File Existence

### Infrastructure files: PASS
**Command:** `os.path.isfile() for sitemap.ts, robots.ts, error.tsx, not-found.tsx, layout.tsx`
**Result:** CLEAN (0 hits)

```
  FOUND: sitemap.ts
  FOUND: robots.ts
  FOUND: error.tsx
  FOUND: not-found.tsx
  FOUND: layout.tsx
```

### Design Book route: PASS
**Command:** `os.path.isfile() across design-book route candidates`
**Result:** CLEAN (0 hits)

```
  FOUND: src/app/(internal)/design-book/page.tsx
```

### Skip-to-content link: PASS
**Command:** `grep -n "skip" /Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/layout.tsx`
**Result:** FOUND (1 hits)

```
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/layout.tsx:39:        <a href="#main" className="skip-link">
```

### JSON-LD imports: PASS
**Command:** `grep -rn "JsonLd" /Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src`
**Result:** FOUND (13 hits)

```
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/(marketing)/faq/page.tsx:10:import { JsonLd, faqSchema } from "@/components/seo/JsonLd";
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/(marketing)/faq/page.tsx:27:      <JsonLd data={faqSchema(ALL_FAQ_ITEMS)} />
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/(marketing)/about/page.tsx:9:import { JsonLd, personSchema } from "@/components/seo/JsonLd";
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/(marketing)/about/page.tsx:24:      <JsonLd data={personSchema()} />
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/(marketing)/how-it-works/page.tsx:11:import { JsonLd, courseSchema } from "@/components/seo/JsonLd";
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/(marketing)/how-it-works/page.tsx:96:      <JsonLd data={courseSchema()} />
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/(marketing)/pricing/page.tsx:10:import { JsonLd, productSchema, courseSchema } from "@/components/seo/JsonLd";
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/(marketing)/pricing/page.tsx:26:      <JsonLd data={[productSchema(), courseSchema()]} />
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/layout.tsx:5:  JsonLd,
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/layout.tsx:8:} from "@/components/seo/JsonLd";
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/layout.tsx:44:        <JsonLd data={[organizationSchema(), websiteSchema()]} />
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/seo/JsonLd.tsx:4: * JsonLd -- server-rendered structured data. A single <script type=
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/seo/JsonLd.tsx:9:export function JsonLd({ data }: { data: object | object[] }) {
```

## Accessibility

### ARIA attributes: PASS
**Command:** `grep -rn "aria-expanded|aria-current|aria-label" in src/`
**Result:** CLEAN (28 hits)

```
  aria-expanded (menu toggle): 4 hits
  aria-current (nav links): 5 hits
  aria-label (interactive elements): 19 hits
```

### focus-visible global styles: PASS
**Command:** `grep -rn "focus-visible" /Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/styles /Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app`
**Result:** FOUND (9 hits)

```
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/styles/tokens.css:854:  :focus-visible {
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/styles/tokens.css:859:  [data-theme="grape"] :focus-visible,
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/styles/tokens.css:860:  [data-theme="coral"] :focus-visible {
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/styles/tokens.css:900:a:focus-visible {
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/globals.css:65:   Pseudo-selectors (:hover, :focus-visible, :active) that inline
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/globals.css:242:  .field-input:focus-visible,
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/globals.css:243:  .field-textarea:focus-visible,
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/globals.css:244:  .field-select:focus-visible {
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/globals.css:287:  .peer:focus-visible ~ .choice-box {
```

### prefers-reduced-motion: PASS
**Command:** `grep -rnE "useReducedMotion|prefers-reduced-motion" /Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src`
**Result:** FOUND (26 hits)

```
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/(internal)/design-book/sections/MotionSection.tsx:42:      intro="MOTION_INTENSITY 6, rationed by surface. Framer Motion for entrances, a tiny burst util for the single confetti beat, CSS for hover/focus. No GSAP scroll-story. Every reveal respects prefers-reduced-motion (collapse to instant; bursts killed)."
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/(internal)/design-book/sections/MotionSection.tsx:54:          Preview prefers-reduced-motion (note)
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/app/globals.css:215:  @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/styles/tokens.css:330:/* prefers-reduced-motion collapses every reveal to instant and kills bursts. */
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/styles/tokens.css:331:@media (prefers-reduced-motion: reduce) {
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/ui/ProgressRing.tsx:4:import { useReducedMotion } from "framer-motion";
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/ui/ProgressRing.tsx:18:  const reduceMotion = useReducedMotion();
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/ui/Accordion.tsx:4:import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/ui/Accordion.tsx:19:  const reduceMotion = useReducedMotion();
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/ui/HypeLine.tsx:4:import { motion, useInView, useReducedMotion } from "framer-motion";
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/ui/HypeLine.tsx:23: * prefers-reduced-motion: the full line renders at once with final colours,
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/ui/HypeLine.tsx:63:  const reduceMotion = useReducedMotion();
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/sections/HomeHero.tsx:4:import { motion, useReducedMotion } from "framer-motion";
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/sections/HomeHero.tsx:23:  const reduce = useReducedMotion();
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/booking/BookingWizard.tsx:5:import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/booking/BookingWizard.tsx:97:  const reduceMotion = useReducedMotion();
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/booking/BookingConfirmation.tsx:262:        @media (prefers-reduced-motion: reduce) { [style*="wm-spin"] { animation: none !important; } }
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/layout/StickyCtaController.tsx:21: * prefers-reduced-motion is irrelevant here (the bar uses a CSS transform
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/layout/Header.tsx:4:import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/layout/Header.tsx:35:  const reduceMotion = useReducedMotion();
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/animations/ConfettiBurst.tsx:10: * duration come from Zone 2 tokens, which prefers-reduced-motion sets to 0,
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/animations/ConfettiBurst.tsx:132:        @media (prefers-reduced-motion: reduce) {
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/animations/ScrollReveal.tsx:3:import { motion, useReducedMotion, type Variants } from "framer-motion";
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/animations/ScrollReveal.tsx:10: * prefers-reduced-motion: renders final state instantly, no transform, no fade.
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/animations/ScrollReveal.tsx:37:  const reduce = useReducedMotion();
/Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/src/components/animations/ScrollReveal.tsx:92:  const reduce = useReducedMotion();
```

## Build

### Build output: PASS
**Command:** `npm run build (cwd: /Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates)`
**Result:** CLEAN (0 hits)

```

> wedding-mates@0.1.0 build
> next build

▲ Next.js 16.2.9 (Turbopack)
- Environments: .env.local

  Creating an optimized production build ...
✓ Compiled successfully in 2.7s
  Running TypeScript ...
  Finished TypeScript in 3.0s ...
  Collecting page data using 11 workers ...
  Generating static pages using 11 workers (0/23) ...
  Generating static pages using 11 workers (5/23) 
  Generating static pages using 11 workers (11/23) 
  Generating static pages using 11 workers (17/23) 
✓ Generating static pages using 11 workers (23/23) in 237ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ƒ /api/contact
├ ƒ /api/stripe/checkout
├ ƒ /api/stripe/session-status
├ ƒ /api/stripe/webhook
├ ƒ /auth/callback
├ ○ /blog
├ ƒ /blog/[slug]
├ ƒ /book
├ ƒ /book/confirmation
├ ○ /contact
├ ƒ /course
├ ƒ /course/[moduleSlug]
├ ƒ /course/introduction
├ ƒ /course/locked
├ ƒ /course/readings
├ ƒ /course/strategies
├ ○ /design-book
├ ○ /faq
├ ƒ /forgot-password
├ ○ /how-it-works
├ ƒ /login
├ ○ /pricing
├ ○ /privacy
├ ƒ /register
├ ƒ /reset-password
├ ○ /reviews
├ ○ /robots.txt
├ ○ /sitemap.xml
└ ○ /terms


ƒ Proxy (Middleware)

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand



```

### Font payload: PASS
**Command:** `sum file sizes in /Users/vonzie./web-app projects/vonzie-in-house/vonzie-agency-agents.code-workspace/website-projects/client-projects/wedding-mates/public/fonts`
**Result:** CLEAN (0 hits)

```
Total: 0.0 KB across 0 font files
```

### Dead dependencies: PASS
**Command:** `package.json deps (12) vs import grep (19)`
**Result:** CLEAN (0 hits)

```
(all dependencies are imported)
```

## Manifests

### Component manifest: PASS
**Command:** `list src/components/ + grep imports`
**Result:** CLEAN (0 hits)

```
36 component files, 0 orphans

All components:
  components/animations/ConfettiBurst.tsx IMPORTED
  components/animations/ScrollReveal.tsx IMPORTED
  components/booking/BookingConfirmation.tsx IMPORTED
  components/booking/BookingWizard.tsx IMPORTED
  components/course/CourseMobileNav.tsx IMPORTED
  components/course/CourseSidebarLive.tsx IMPORTED
  components/course/DashboardProgress.tsx IMPORTED
  components/course/LessonActions.tsx IMPORTED
  components/course/LessonBody.tsx IMPORTED
  components/course/LessonView.tsx IMPORTED
  components/course/SupportBlock.tsx IMPORTED
  components/layout/BookingHeader.tsx IMPORTED
  components/layout/Footer.tsx IMPORTED
  components/layout/Header.tsx IMPORTED
  components/layout/MarketingHeader.tsx IMPORTED
  components/layout/StickyCtaBar.tsx IMPORTED
  components/layout/StickyCtaController.tsx IMPORTED
  components/sections/ContactForm.tsx IMPORTED
  components/sections/CtaBand.tsx IMPORTED
  components/sections/HomeHero.tsx IMPORTED
  components/seo/JsonLd.tsx IMPORTED
  components/ui/Accordion.tsx IMPORTED
  components/ui/AuthShell.tsx IMPORTED
  components/ui/BookingExtras.tsx IMPORTED
  components/ui/Button.tsx IMPORTED
  components/ui/Card.tsx IMPORTED
  components/ui/Chip.tsx IMPORTED
  components/ui/Container.tsx IMPORTED
  components/ui/CourseUI.tsx IMPORTED
  components/ui/Field.tsx IMPORTED
  components/ui/FormAlert.tsx IMPORTED
  components/ui/HypeLine.tsx IMPORTED
  components/ui/Logo.tsx IMPORTED
  components/ui/ProgressRing.tsx IMPORTED
  components/ui/Section.tsx IMPORTED
  components/ui/Stepper.tsx IMPORTED
```

### Font manifest: PASS
**Command:** `grep localFont + next/font/google in src/`
**Result:** CLEAN (0 hits)

```
9 fonts loaded, 0 next/font/google imports (should be 0)

  anton (next/font/local) -- --font-anton -- src: ../fonts/anton.woff2
  archivoBlack (next/font/local) -- --font-archivo-black -- src: ../fonts/archivo-black.woff2
  archivo (next/font/local) -- --font-archivo -- src: ../fonts/archivo-variable.woff2
  anton (next/font/local) -- --font-anton -- src: ../fonts/anton.woff2
  archivoBlack (next/font/local) -- --font-archivo-black -- src: ../fonts/archivo-black.woff2
  archivo (next/font/local) -- --font-archivo -- src: ../fonts/archivo-variable.woff2
  anton (next/font/local) -- --font-anton -- src: ../fonts/anton.woff2
  archivoBlack (next/font/local) -- --font-archivo-black -- src: ../fonts/archivo-black.woff2
  archivo (next/font/local) -- --font-archivo -- src: ../fonts/archivo-variable.woff2
```

### Dependency manifest: PASS
**Command:** `package.json dependencies + grep imports`
**Result:** CLEAN (0 hits)

```
15 dependencies, 14 imported, 1 build-only, 0 unused

  @hookform/resolvers@^3.9.1 -- IMPORTED
  @supabase/ssr@^0.5.2 -- IMPORTED
  @supabase/supabase-js@^2.47.10 -- IMPORTED
  clsx@^2.1.1 -- IMPORTED
  framer-motion@^11.15.0 -- IMPORTED
  next@^16.0.0 -- IMPORTED
  react@^19.0.0 -- IMPORTED
  react-dom@^19.0.0 -- BUILDONLY
  react-hook-form@^7.54.2 -- IMPORTED
  react-markdown@^9.0.1 -- IMPORTED
  remark-gfm@^4.0.0 -- IMPORTED
  resend@^4.0.1 -- IMPORTED
  stripe@^17.5.0 -- IMPORTED
  tailwind-merge@^2.6.0 -- IMPORTED
  zod@^3.24.1 -- IMPORTED
```

## Content

### Content quality: PASS
**Command:** `grep for em dashes, console.log, TODO/FIXME in src/`
**Result:** CLEAN (0 hits)

```
  em_dashes: 0 hits
  console_log: 0 hits
  todos: 0 hits
```

## Images

### Image optimization props: PASS
**Command:** `grep -rn "priority" and "sizes=" in src/`
**Result:** FOUND (26 hits)

```
  priority prop: 15 hits
  sizes prop: 11 hits
```

---

## Summary

- **Total checks:** 21
- **Pass:** 21
- **Fail:** 0
- **Skipped:** 0