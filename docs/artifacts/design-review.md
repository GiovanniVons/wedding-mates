# Design Review
**Phase:** 4
**Agent:** design-critic
**Date:** 2026-06-22
**Status:** revised (fix pass #1)

---

## Resolution Log
- Sticky CTA bar not inverting over the full-coral Final-CTA section (Minor): FIXED. Geometry-based per-surface detection now flips the bar to grape over coral/grape bands (verified at 390px).
- Hero lockup wrapping awkwardly at ~375px (Minor, also in qa): FIXED. Word-boundary wrap, verified at 375/390px.
- About page thin loud-register craft (Minor): DEFERRED. On-spec quiet-by-design; optional POP detail later.
- Locked-module thumbnails muted (Minor): WON'T FIX. Correct as a locked affordance.

---

## Verdict

**PASS WITH NOTES.**

This is the strongest concept-to-pixel translation I have reviewed in this pipeline. "Recessional Pop" is not a label sitting on top of a generic build; it is visible in every fold. The Hype Line carries the central idea (the brand is a marked-up ceremony script, cranked to party volume), the signature is genuinely rationed (one peak per marketing section, two confetti beats total, chip-only inside the wizard), and the dual register holds across all three surfaces without splitting into two brands. The house-style gravity well (warm cream, serif display, mono labels, film grain, terracotta, scroll-story) is left entirely; the build does not drift back toward the sibling sarah-emery direction for a single fold. Polish is high: I found no content-on-overlay overlap, no ink-on-dark invisibility on the surfaces that matter, no top-clipped cards, no accidental ghosting. Craft is in the POP vocabulary (poster numerals, overprint, type-as-image, flat colour fields, the held-beat dot), not faked editorial.

It earns PASS WITH NOTES rather than a clean PASS only because of a small set of genuinely minor issues: the sticky CTA bar does not invert over the one full-coral section (coral-on-coral, legible but loses separation), and the About page runs the thinnest craft of any marketing page (on-spec, but the softest moment). There are zero Critical issues and zero Major issues. The notes below are polish, not blockers.

I reviewed the full Visual Pixel Pass: home (13 desktop folds + 14 mobile), pricing, about, faq, contact, login, register, book wizard, course dashboard, course introduction lesson, course readings, course strategies, course locked, and the /design-book (18 desktop + 18 mobile folds), desktop and mobile.

## Scores

- Typography: 9/10 -- Anton carries every Hype Line and the $950/poster numerals; Archivo Black on H2, Archivo on H3/body/UI/chip. Per-level font assignment matches design.md exactly (verified on the Design Book type specimen: H1 Anton 400, H2 Archivo Black 900, H3 Archivo 800, body Archivo). No serif, no mono anywhere. The >7x size jump from 17px body to 128px hero hero lands as type-as-image.
- Color: 9/10 -- The confetti palette reads wedding-true, not rainbow-candy: grape-ink anchor, coral CTA/hit word, marigold chips, mint reassurance/progress. Distribution is loud but disciplined (bright surface dominant, grape structural, coral rationed to the CTA and kiss beat). Pre-computed contrast pairs hold on the rendered page (grape on coral CTA, white "MARRIED" hit on coral, grape on marigold chip).
- Layout: 9/10 -- Real art-directed moments per marketing section: hero line bleeding the left edge, the offset 2x2 Blueprint grid (one card on mint tint, right column shifted down), poster numerals overprinting step titles, the founder signature overprinting the portrait. Not a uniform-card-grid in sight on the loud surfaces; the calm surfaces are correctly single-column.
- Animation: 8/10 -- Not directly observable in static pixels, but the reduced-motion guards, the rationed-burst architecture (hero peak + final CTA + confirmation only), and the speech-timed reveal are all present in the manifest and the Design Book Motion catalog. MOTION_INTENSITY 6 magnitude with calm surfaces at effective 3 is the right read.
- Copy: 9/10 -- On voice, AU spelling, no em dashes, no double-hyphens in client copy. "GET WED YOUR WAY", "YES, YOUR MATE CAN REALLY MARRY YOU", "AND JUST LIKE THAT, YOU'RE MARRIED" are speech-beats, not captions. Real contact data throughout (sarah@letsgetwed.com.au, WhatsApp 0410 820 300). Honest empty states ("Photos coming soon, once the couple says yes", "Video coming soon").
- Responsive: 9/10 -- Mobile hero stacks the Anton line cleanly with the coral hit word; the wizard stepper compacts to a segmented progress bar + "Step 1 of 7: Date"; the course sidebar is the desktop rail; the sticky CTA bar reserves its height and anchors. No atmosphere-cluster-on-one-side issue (the build does not use background decoration layers, consistent with the flat risograph spec).
- Distinctiveness: 9/10 -- Passes the Three-Things Test comfortably (see below). Concept is visible to a stranger.
- Conversion clarity: 9/10 -- One unmistakable primary action per page (the coral Book Now / Start Your Journey), the most saturated object on every surface, mobile sticky bar carrying "Book Now $950". The Hype Line argues FOR the CTA rather than competing with it (each line is an unfinished ceremony the booking completes).
- Craft: 8/10 -- Bespoke-crafted in the POP family, not merely competent-clean. Named art-directed moments below. Held back from 9-10 only by the About page's thin loud-register craft and the single-real-photo dependency on the love-story slots (honestly flagged, not faked).

## Distinctiveness & Conversion

**Three-Things Test (PASS):** three concrete elements that appear on no competitor wedding/celebrant/course site:
1. **The Hype Line as the site's headline grammar** -- a cue chip naming a ceremony moment (THE WELCOME, THE KISS, THE LEGALS) sitting on a marigold pill above a huge Anton line with one word colour-hit in coral, recurring as each section's emotional peak. No celebrant directory or DIY-vow site renders its marketing as a delivered, marked-up ceremony script.
2. **The dual-register cue chip as a single bridge component** -- the SAME pill carries the buyer from THE WELCOME (loud marigold, marketing) to STEP 3 . CELEBRANT (calm tint, wizard) to LESSON 4 OF 9 (inverted on grape, course). One component dialled across three surfaces; documented side by side on the Design Book.
3. **The booking confirmation as the one earned eruption** -- a full THE KISS Hype Line ("AND JUST LIKE THAT, YOU'RE MARRIED", coral hit word) with the single permitted confetti burst of the entire flow, in a wizard that is otherwise deliberately silent. Competitors run a generic "thank you / check your email" screen.

**Concept fidelity (PASS):** the central idea is unmistakable from the hero alone. The signature move (the Hype Line) recurs as a rationed peak (hero, the Reframe, the Blueprint, the Legality reassurance variant with a mint chip and no burst, the final coral CTA), never leaking into nav, buttons, body, or form labels. It appears QUIET inside the course as a teaching object ("INFLECTION, PAUSES AND PACE MAKE A LINE LAND", reduced scale, no burst), which is exactly the spec.

**House-style drift (NONE):** zero of the six blocklist traits present. No cream (confetti-paper near-white with a cool grape tint instead), no serif display (Anton heavy condensed grotesque), no mono utility labels (Archivo tracked caps in solid pills), no film grain (flat risograph surfaces), no terracotta (grape-ink anchor), no GSAP scroll-story (speech-timed Framer reveals + one burst). The build also avoids POP's own slop: no Memphis squiggles, no rainbow-candy gradient, no 3D balloons, no AI stickers, no wedding clipart.

**Signature over-application (NONE):** the loudness is genuinely rationed. The confetti burst fires at most twice on the loudest page (hero + final CTA) and is absent from the entire wizard except confirmation. The cue chip is NOT smeared across general chrome; nav is plain grape links, buttons are not chips, eyebrows on calm surfaces use the quiet tint variant. The peaks feel like peaks because the support is loud-but-calmer.

**Conversion clarity (PASS):** single primary action per page, reachable early on desktop and thumb-reachable on mobile via the sticky "Book Now $950" bar. Friction on the path is low: the wizard front-loads only Date + Details as required gates and marks Celebrant + Location Optional (with marigold-deep "Optional" labels), so intent-to-payment is short. Trust signals sit at the decision point (the $950 inclusion list with mint ticks, "Legal paperwork handled by a registered celebrant", the founder credential) rather than only on About.

## Critical Issues (Must Fix)

None.

## Major Issues (Should Fix)

None.

## Minor Issues (Nice to Fix)

### Issue 1: Sticky CTA bar does not invert over the full-coral final-CTA section
- **Location:** Home mobile, around the final "AND JUST LIKE THAT, YOU'RE MARRIED" coral band (`.tmp/gate/home-m-12.png`); component `src/components/layout/StickyCtaBar.tsx` / `StickyCtaController.tsx`.
- **Expected:** the persistent overlay should read as a distinct floating element over every surface it crosses. The Design Book documents two states only: coral bar over light sections, grape bar over grape sections (`.tmp/fix1/design-book-d-13.png`).
- **Actual:** while scrolling over the full-coral Final CTA band, the sticky bar stays coral. It sits coral-on-coral, separated only by a faint hairline, so the bar briefly loses its edge and reads as part of the section. The label ("Book Now $950", grape text, marigold price) is still legible at 4.5:1, so this is cosmetic separation, not a contrast failure.
- **Fix:** extend the surface-detection in the sticky controller to invert (to the grape bar variant, or a grape outline) over `data-theme="coral"` sections as well as `data-theme="grape"`. This is the same inversion mechanism already built; it just needs the coral surface added to the detected set. Confirm on the rendered page over the coral band.
- **Evidence:** compared `.tmp/gate/home-m-12.png` (coral-on-coral) against `.tmp/gate/home-m-13.png` (correct grape inversion over the grape footer) and `.tmp/fix1/design-book-d-13.png` (the documented two-state spec).

### Issue 2: About page runs the thinnest loud-register craft of the marketing set
- **Location:** About (`.tmp/gate/about-d-02.png`, `about-d-03.png`); `src/app/(marketing)/about/page.tsx`.
- **Expected:** design.md frames About as "Marketing tilting editorial, loud opener then calm long-form" with `--container-narrow` and one reduced-scale pull-quote as the type-as-image moment, so a quieter page is on-spec.
- **Actual:** the hero and the "THE MOST PERSONAL CEREMONY THEY HAD EVER BEEN TO." pull-quote land well, but the middle (the "Why I Became A Celebrant" / "Why I Built The Blueprint" sections) is a long single-column reading run with no image and no graphic punctuation across two folds, so it is the one marketing page that drifts toward flat. This is the softest craft moment in an otherwise crafted build.
- **Fix:** optional polish only. Add one POP-vocabulary detail to the long-form middle (a held-beat dot rule between the origin beats, a small marigold/mint chip eyebrow per sub-section, or one re-treated image bleeding the gutter against the second body block) to keep the page from reading as a plain article. Do not over-load it; the page is meant to be the calm-tilting one.
- **Evidence:** `.tmp/gate/about-d-02.png` and `about-d-03.png` show two consecutive image-free reading folds.

### Issue 3: Course module thumbnails read slightly muted at the locked state
- **Location:** Course dashboard module tree (`.tmp/gate/course-d-02.png`, `course-d-03.png`); module card component.
- **Expected:** calm-register course imagery, true colour for readable reference (per Photography Direction: "calmer, no duotone, true colour").
- **Actual:** the locked module thumbnails read a touch desaturated/grey, which is correct as a "locked" affordance but means the module imagery overall sits quieter than the "true colour" direction implies. Nothing renders broken or accidentally ghosted; this is a judgement-call on grade, not a defect.
- **Fix:** optional. If the client wants the locked modules to feel more inviting, lift the locked-state opacity/grade a little so the photos stay legible-warm while still reading as locked. Acceptable to leave as-is.
- **Evidence:** `.tmp/gate/course-d-02.png` (LOCKED module cards).

## AI-Slop Flags

None. This build is the positive case. No uniform card grids on the loud surfaces (the Blueprint grid is deliberately offset), nothing is generically centered (the hero is left-aligned and bleeds, the Reframe is asymmetric), section spacing varies for poster rhythm, the hero could not belong to another brand, no default rounded-everything (poster pill radius on chips/buttons, clean 8-12px on cards, per spec), no generic blur-pillow shadows (flat poster offset shadows only), no decorative icon spam (line icons appear only where they label a real Blueprint pillar). Links carry two cues (coral-deep colour + styled underline), never browser default.

## Brand Consistency Assessment

Cover the logo and you would still know this is one specific friend-led Australian wedding brand: the cue chips name a real ceremony running order, the colours are literally what gets thrown at a recessional, and the voice is a supportive mate who happens to be an expert. The site is cohesive across all 14 routes because the dual register is doing exactly its job. The loud marketing (gig-poster energy, the room going off) and the calm functional surfaces (a clean payment wizard, a warm 15-hour course) are visibly the same brand at two volumes, bridged by the cue chip, the grape headings, the coral button, and the shared Anton/Archivo family. The target audience (a nervous couple choosing their person, and the mate who said yes) would feel this was built for them, not templated.

## Polish Notes

- No overlap anywhere I checked: the header stays clear of content, the sticky CTA bar reserves its own height, the founder signature overprint is intentional and clears the text, the Hype Line bleeds without colliding with neighbours.
- Persistent-overlay adaptation works on the surface that matters (grape inversion verified on mobile); the one gap is the coral-band case in Minor Issue 1.
- Spacing rhythm reads intentional: the loud-rhythm cadence (big breath before a Hype Line peak, tight trust beat for the Legality section) is visible, with no accidental dead gaps. The apparent mid-card text in `home-d-05` is a screenshot fold boundary, not a clip; confirmed the 4-step cards distribute content top-to-bottom on `home-m-04`.
- Card content distributes correctly everywhere (pricing inclusions, extras cards, Blueprint cards, module cards) with no top-clipping or empty bottoms.
- Nothing renders accidentally ghosted or disabled. The locked module grade (Minor 3) is a deliberate affordance, not an accident.
- CTA labels legible in every observed state: grape on coral (default), white on coral-deep (the documented hover), grape-fill + white label on the coral band. Disabled-state contrast is specified and shown in the Design Book.
- Focus-visible styling present (grape outline on buttons, marigold halo on inputs per the field spec), confirmed in the Design Book form-state row.

## Commendations

- **The dual register is the hardest thing this brief asked for, and it holds.** The booking wizard and the course are unmistakably the same brand as the loud marketing without ever shouting at a buyer mid-payment or a nervous mate mid-lesson. That is the calibration most builds get wrong, and it is right here.
- **The signature is rationed with real discipline.** Two confetti beats on the loudest page, chip-only in the wizard, a quiet teaching Hype Line in the course. The peaks feel like peaks because the loudness was spent sparingly. This is the lesson from the sarah-emery and mattie-chein builds landed correctly on the first pass.
- **Honest empty states everywhere photography is thin** (love-story cards, video slots, the GST line) carried by the flat-colour-and-type poster system, so a missing asset never leaves a hole and nothing is faked with stock or AI imagery.
- **The Design Book is exemplary as a review surface:** every button variant x size x state, the cue chip in all variants including on-dark, the Hype Line over light/grape/over-photo, the sticky bar in both documented states, the dual-register loud-vs-calm comparison side by side. It made this review faster and the inconsistencies (there were almost none) trivially findable.
- **Zero house-style drift on the first build.** The revision brief asked the team to leave the warm-serif-editorial gravity well entirely and own a bright flat POP corner instead. It did, cleanly, without sliding back for a single fold.

WROTE: docs/artifacts/design-review.md -- 119 lines, verdict: PASS WITH NOTES, sections: [Verdict, Scores, Distinctiveness & Conversion, Critical Issues, Major Issues, Minor Issues]
