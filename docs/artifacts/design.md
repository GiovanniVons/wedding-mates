# Design
**Phase:** 2
**Agent:** ui-designer
**Date:** 2026-06-21
**Status:** draft

---

## Aesthetic Direction (summary)

"Recessional Pop": a flat saturated screen-printed celebration anchored by a structural grape-ink. The look is the moment a friend lands a line and the room goes off, rendered as a gig poster you can read across the room, then dropped to a clean column when you need to pay or learn. Heavy condensed grotesque (Anton) carries every Hype Line; Archivo is the calm workhorse; no serif, no mono, no grain, no gradients, no shadow pillows. Colour is the structure: a confetti-paper near-white surface (`--color-page`), grape-ink anchor (`--color-grape`), and a confetti palette of coral-red (`--color-coral`), marigold (`--color-marigold`), and mint (`--color-mint`) used as confident flat blocks with risograph overprint logic. Dials are DESIGN_VARIANCE 6, MOTION_INTENSITY 6, VISUAL_DENSITY 5 as marketing magnitudes; the booking wizard and the course deliberately run their own effective 3 (structured single column, near-zero motion, accent rationed to the cue chip and the one primary button).

The non-negotiable discipline is the **dual register**, carried in tokens by two orthogonal attributes: `data-surface` (`loud` / `calm`) controls scale, motion, and whether a burst is allowed; `data-theme` (default page / `tint` / `grape` / `coral`) controls the colour inversion of a section. The same grape headings, the same Archivo family, the same cue-chip shape, and the same coral button carry both volumes; only scale, saturation, and motion change. The signature component (the Hype Line) is the loud peak of each marketing section and is rationed; it never leaks into nav, body, labels, or general chrome.

---

## Component Library

Every component below renders in `/design-book`. The signature component is shown over both a light and a grape section so its per-surface adaptation is reviewable at the 2.5 gate. Plumbing is copy-adapted from `patterns/`; the Hype Line, the booking wizard chrome, and the course shell are bespoke.

### SIGNATURE: The Hype Line (bespoke, NOT from patterns/)

**Concept tie:** the Hype Line is the brand's central idea made visible. It renders one line of the ceremony the way a confident delivery actually lands (a cue to the moment, a word hit hard, a held beat, a burst on the payoff), and every Hype Line is an unfinished ceremony that only the $950 booking completes. It carries the argument FOR the CTA; it never competes with it.

**Anatomy (single bespoke React component, `HypeLine`):**
1. **Cue chip** (top-left of the lockup): a solid pill naming the ceremony moment (`THE WELCOME`, `THE VOWS`, `THE LEGALS`, `THE KISS`). Loud register: grape text on a marigold pill (`--chip-loud-bg` / `--chip-loud-text`, 9.0:1). Font `--font-body` 800, `--font-size-chip`, `--letter-spacing-wider`, uppercase.
2. **The line**: set in `--font-display` (Anton) at `.hype-hero` (hero) or `.hype` (section) scale, uppercase, `--line-height-small`/`--line-height-snug`, `--letter-spacing-tight`/`--letter-spacing-snug`. The line IS the visual, never a caption.
3. **The hit word**: one or two words wrapped in `.hit`, rendered in `--theme-heading-accent` (coral `--color-coral` at display scale on light, which is AA-large at >=44px; grape on coral bands; coral on grape bands). Colour-and-weight emphasis, never italic.
4. **The held beat**: an oversized centred middot `·` (Anton, `--theme-text-muted`) or a deliberate gap before the payoff clause, set with `--space-3` side margins.
5. **The burst**: a single confetti/streamer burst fired once on the payoff word, using the real confetti palette (`--color-coral`, `--color-marigold`, `--color-mint`, `--color-grape`), `--burst-particle-count` particles, `--burst-duration`. Canvas or absolutely-positioned SVG shards; pointer-events none; reserves no layout space (fires within the section's own padding, never overflowing into neighbours).

**States / reveal (loud register, Framer Motion + a tiny burst util):**
- Initial: cue chip `opacity: 0, scale: 0.8`; line `opacity: 0, y: 16px`; hit word at `--theme-text` colour.
- Beat 1 (`--motion-duration-fast`, `--motion-easing-pop`): cue chip pops in (scale 0.8 -> 1, opacity 1).
- Beat 2 (`--motion-duration-base`): the line lands (`y: 0, opacity: 1`).
- Beat 3 (`--motion-duration-fast`): the hit word colour-flips to `.hit` and the burst fires once.
- Total sequence ~0.9s. Triggered on first scroll into view (IntersectionObserver, once), or on page load for the hero.

**Variants:**
- **Light** (default `data-theme`): grape line, coral hit word, marigold cue chip, grape middot.
- **Grape** (`data-theme="grape"`): page-white line, coral hit word (`--theme-heading-accent` flips to bright coral), marigold cue chip, page-white middot.
- **Over-photo**: the line sits in a flat colour field beside or below the photo, never typed over a busy face. If type must sit over an image, a flat grape or coral colour-block panel (`--color-grape` / `--color-coral`) holds the line at AAA/AA, and the photo bleeds adjacent. A scrim is the fallback only when no panel placement works.

**Rationing (where allowed / banned):**
- ALLOWED: the marketing hero (one, the loudest on the site), exactly one per major marketing section as that section's emotional peak, the booking confirmation (`THE KISS`, the single earned burst of the whole flow), and inside course lessons as a QUIET teaching object (no burst, no oversized scale, `.hype` capped at section scale, accent at `--theme-heading-accent`).
- BANNED: nav, buttons, body paragraphs, form labels, page background texture, behind long-form course reading, the wizard body (chip-only there). The burst fires at most once per page and only on a genuine celebration beat.

**Layout contract (it is not persistent, but it bleeds):** the Hype Line may bleed off the container edge (`--container-default` to `--container-wide`) on desktop; on mobile it always sits inside `--site-margin` with no horizontal overflow, and the line wraps to 2-3 stacked lines at `--line-height-small`. The burst is clipped to the section (`overflow: clip` on the section, never the body) so it cannot overlap the next section's content.

**Reduced motion:** the full line renders at once with final colours; no burst, no snap-in.

**Responsive:** desktop hero `--font-size-display` (up to 128px); mobile clamps to 72px and stacks; section Hype Line `--font-size-hype` (44-72px) stacks to 2 lines on mobile.

---

### Buttons

Pill radius (`--btn-radius` = `--radius-round`), Archivo 800 (`--btn-font-weight`), `--letter-spacing-wide`, sentence case. Min 44px touch on all; padding steps down between tiers. The primary button is the most saturated object on every page so the colour logic pulls the eye to the conversion.

| Variant | Use | min-height | padding-x |
|---|---|---|---|
| Primary | The conversion (Book Now / Start Your Journey / Continue / Pay / Mark complete) | `--btn-size-large` (60px) on marketing/pay, `--btn-size-medium` (52px) inline | `--btn-padding-x-lg` |
| Secondary | Lower-priority real action (See how it works, Skip for now as a button) | `--btn-size-medium` (52px) | `--btn-padding-x` |
| Tertiary / text-link button | Utility (Read more, Back, soft links) | `--btn-size-small` (44px) | `--space-3` |
| Success | Course "Mark complete and continue" only | `--btn-size-medium` (52px) | `--btn-padding-x` |

**Primary (grape label on coral fill, the default everywhere):**
- Default: bg `--btn-primary-bg` (coral), text `--btn-primary-text` (grape, 4.5:1, holds every size and state), border `--btn-primary-border`.
- Hover: bg `--btn-primary-bg-hover` (coral-deep), text `--btn-primary-text-hover` (page-white, 5.6:1), plus a 2px upward `translateY(-2px)` and a flat poster offset shadow `0 6px 0 var(--color-grape-o08)` (no blur pillow). Transition `--motion-duration-fast`.
- Active: bg `--btn-primary-bg-active` (coral-deep), `translateY(0)`, offset shadow removed (presses down).
- Focus-visible: `--focus-width` solid `--color-grape` outline, `--focus-offset-outer`.
- Disabled: bg `--btn-primary-bg-disabled` (coral at 40%), text `--btn-primary-text-disabled` (grape 60%), opacity 0.5 via base rule, pointer-events none.
- On `data-theme="grape"`: stays coral fill, label flips to page-white (large bold CTA, 3.5:1 acceptable for >=18px bold). On `data-theme="coral"`: flips to grape fill, page-white label (AAA).

**Display-CTA (hero only):** bg `--btn-display-bg` (coral), text `--btn-display-text` (page-white, 3.5:1, valid because the hero CTA label is >=18px bold). One per page maximum.

**Secondary (grape outline, fills on hover):**
- Default: transparent bg, `--btn-border-width` `--btn-secondary-border` (grape), text `--btn-secondary-text` (grape).
- Hover: fills to `--btn-secondary-bg-hover` (grape), text `--btn-secondary-text-hover` (page-white). Clear shift to a filled state, not a faint tint.
- On dark sections: border + text flip to page-white, fill-to-white on hover with grape text.

**Tertiary / text-link button:** transparent, text `--btn-tertiary-text` (coral-deep, 5.6:1) with the standard styled coral underline; hover adds a faint `--color-coral-o12` background wash and thickens the underline. On grape sections the text flips to marigold.

**Success:** bg `--btn-success-bg` (mint), text `--btn-success-text` (grape); hover bg `--btn-success-bg-hover` (mint-deep) with page-white text (4.6:1). Used ONLY for course completion so green reads as "progress" without gamification chrome.

**Icon behaviour:** primary/secondary may carry a trailing arrow; on hover the arrow slides `--space-1` right (CSS transform, `--motion-duration-fast`). Icon 1.25em, gap `--space-2`.

**Adjacent-button gap:** `--space-3` when primary + secondary sit side by side. On mobile they stack with `--space-3` vertical gap, primary first.

### Cue Chip (the dual-register bridge component)

A solid pill, the one thing that carries identity across the volume drop. Same shape in both registers; only the fill changes.
- **Loud** (`Chip variant="loud"`): grape text on marigold (`--chip-loud-bg` / `--chip-loud-text`, 9.0:1). Marketing Hype Lines, section eyebrows tied to a Hype Line.
- **Calm** (`Chip variant="calm"`): grape text on `--chip-calm-bg` (page-tint) with a `--chip-calm-border` hairline. The wizard stepper label (`STEP 3 · YOUR CELEBRANT`), course lesson chips.
- **Mint** (`Chip variant="mint"`): grape on mint (`--chip-mint-bg`). The legals/reassurance/success beat ("LEGALS SORTED").
- Font `--chip-font` (Archivo) 800, `--font-size-chip`, `--letter-spacing-wider`, uppercase, padding `--chip-padding-y` / `--chip-padding-x`, `--chip-radius` (full pill).
- On dark sections the calm chip inverts to page-white on a `--color-page` 14% wash.

### Cards

Flat by default (risograph): `--card-bg`, `--card-border` hairline at `--card-border-width`, `--card-radius` (10px), `--card-shadow` none. Hover lift (marketing only, desktop): `translateY(-3px)` + `--card-shadow-hover` (flat `0 8px 0 var(--color-grape-o08)` poster offset, no blur). Variants vary in size to avoid uniform grids (DESIGN_VARIANCE 6):
- **Feature card** (Blueprint 2x2): icon chip + H3 + 1 paragraph; one of the four sits on a `--color-field-mint`/`--color-field-marigold` tinted field for overprint rhythm rather than four identical white boxes.
- **Step card** (4-step process): oversized Anton poster numeral (`01`-`04`) in `--color-coral` / `--color-marigold` / `--color-mint` / `--color-grape` rotating, title, 1 paragraph; the numeral bleeds partly behind the title (overprint).
- **Pricing card**: the single emphasised package card, grape border at `--border-width-bold`, `$950` in Anton at `--font-size-h1`, checked inclusion list.
- **Module card** (course): thumbnail image in a flat colour field, calm grape-on-tint chip, title, status pill (mint complete / coral current / grey locked), est-time meta.
- **Extras toggle card** (Step 5): see Booking components below.
- **Love-story / blog card** (3:2 image, label): conditional; renders an honest empty state when content is unconfirmed.

### Form Inputs

Calm register, legible, AA in every state. Copy-adapt `patterns/form-inputs/`.
- Label always visible above the field (`--font-body` 600, `--font-size-text-small`, grape). No placeholder-only labels.
- Field: `--input-height` (52px), bg `--input-bg`, text `--input-text`, `--input-border` at `--card-border-width`, `--input-radius`, padding-x `--input-padding-x`, placeholder `--input-placeholder` (grape-soft).
- Focus: border `--input-border-focus` (grape) + a `--input-ring-focus` (marigold 30%) 3px halo via box-shadow; the visible focus is bold but warm.
- Error: border `--input-border-error` (coral-deep) + a coral-deep helper line below; never colour-only (an inline error icon + text).
- Disabled: opacity 0.5, page-tint bg.
- Radio / checkbox: 24px, grape border, checked fill `--color-mint` with grape tick (`--toggle-check-bg` / `--toggle-check-mark`).
- Select: same field chrome; empty-state text uses `--input-placeholder`.
- Textarea (Step 4 location, contact message): same chrome, min-height 7rem.

### Navigation (smart header)

Copy-adapt `patterns/smart-header/`. Desktop horizontal nav at >=1024px; focus-trapped slide-in drawer below.
- **Transparent-on-load** over the photographic hero (Home only): logo + nav links in page-white (`--header-text` resolves over the hero's grape scrim); "Book Now" primary button stays coral with white label.
- **Always-solid** on light pages (How It Works, Pricing, About, etc.): logo + links in grape from the start.
- **Scrolled** (threshold 80px): `--header-bg-scrolled` (page at 92%) + `backdrop-filter: blur(var(--header-blur))` + a `--header-border-scrolled` hairline bottom border; height shrinks `--header-height` -> `--header-height-scrolled`; text -> `--header-text-scrolled` (grape).
- Links: grape, active link `--nav-link-active` (coral-deep) with the styled underline. Two cues (colour + underline).
- "Login" is a smaller text link far right; "Book Now" is the primary pill.
- **Mobile drawer** (`--nav-drawer-bg` grape field, page-white links): slide-in from right, Framer Motion, focus trap, closes on route change, `--nav-menu-open-duration`. Hamburger 3px bars (`--nav-hamburger-thickness`). The drawer is one of the few loud-grape moments on otherwise-calm chrome.

### Sticky Mobile CTA Bar (persistent overlay)

"Book Now -- $950" (note: en-dash-free; rendered as "Book Now $950" with the price in marigold). Appears after the hero scrolls out (IntersectionObserver on the hero). **Layout contract:** reserves its own `--sticky-cta-height` via a spacer so it never overlaps content; bg `--sticky-cta-bg` (coral) with `--sticky-cta-text` (grape) on light sections; inverts to a grape bar with page-white label when scrolled over a `data-theme="grape"` section (detected by sampling the section under the bar, not a point inside the bar). Hidden entirely inside `/book` and `/course` (already converting / already paid). Reduced-motion: appears with no slide.

### Accordion (FAQ)

Copy-adapt `patterns/accordion/`. Single column, one open at a time, animated height (`--motion-duration-base`), full keyboard support, panels stay in the DOM on load. Question row: Archivo 700 grape, a `+`/`-` glyph that rotates on open; open panel bg subtly `--color-page-tint`. Hairline `--theme-border` between rows. Calm register; no burst, no Hype Line inside.

### Booking components (bespoke, CALM register)

- **Step indicator (stepper):** 7 segments. Desktop: numbered dots (`--step-dot-size`) + labels (Date, Details, Celebrant, Location, Extras, Payment, Done) connected by a `--step-track` line; done = `--step-done-bg` (mint) with grape tick; current = `--step-current-bg` (coral) with page-white number + a `--step-current-ring` halo; upcoming = `--step-upcoming-bg` with `--step-upcoming-border` and `--step-upcoming-text`. Optional steps (Celebrant, Location) carry a small "Optional" label in `--step-optional-label` (marigold-deep). Mobile: compacts to dots + "Step X of 7: [label]". Each label uses the calm cue chip vocabulary so the buyer recognises the brand assembling their ceremony. Completed steps are tappable to edit.
- **Field group:** a labelled cluster (one step's fields) on `--color-page`, generous `--space-5` vertical rhythm, max `--container-form` (640px). You/partner pairing is a 2-col grid on desktop, stacked on mobile.
- **Extras toggle card (Step 5):** name + price + 1-line description; off = `--toggle-bg` with `--toggle-border`; on = `--toggle-bg-on` (mint-tinted field) with `--toggle-border-on` (mint-deep) and a mint check (`--toggle-check-bg`). Price in Archivo 800 grape. Toggling animates the running total.
- **Running-total bar (persistent overlay):** "Base $950 + extras = $X". Desktop: a summary rail to the right of the field column. Mobile: a sticky bottom bar (`--total-bar-height`, `--total-bar-bg` grape, `--total-bar-text` page-white, the figure in `--total-bar-accent` marigold) that **reserves its own height** and never overlaps the last field or the Continue button; the figure ticks up (`--motion-duration-base`, count-up) when a toggle changes. Anchored to the step content, not floating on independent spacing.
- **Order summary (Step 6):** base + each selected extra + total + a GST line (rendered as a neutral flagged placeholder until the client confirms inclusive/exclusive). Above the payment element on mobile, in the right rail on desktop.
- **Stripe payment panel:** the Stripe Payment Element styled to the token chrome (`--input-*` borders/radius); inline error states; the "Pay $X" button is `--btn-size-large`, full-width on mobile, disabled-until-valid with strong contrast in the disabled state. A single trust line below ("Secure payment via Stripe. Questions? Message Sarah.").
- **Confirmation / celebration screen (Step 7):** the ONE permitted loud eruption inside the flow. A full `THE KISS` Hype Line ("and just like that, you're married") with the single earned confetti burst, then drops back to calm for the next-steps checklist. Primary "Go to your course", secondary "Book your onboarding call". Pending state ("Confirming your payment") while the webhook settles, with no burst until confirmed.

### Course components (bespoke, CALM register)

- **Course sidebar / drawer:** persistent `--course-sidebar-width` (280px) left rail on desktop (`--course-sidebar-bg` page-tint), slide-in focus-trapped drawer on mobile. Contains: logo -> dashboard, progress ring, module tree (Intro + Modules 1-8 with complete/current/locked state), Resources (Readings, Strategies, Downloads), Support ("Stuck? Message Sarah"), account menu. No "Book Now" (already paid).
- **Progress ring:** SVG ring, `--ring-track` background, `--ring-fill` (mint) arc, `--ring-label` "X of 9 complete" centred (Anton numeral). Animates fill on mount (`--motion-duration-base`); reduced-motion renders the final arc.
- **Lesson shell:** lesson header (module number + title, est-time chip, "lesson X of 9"), then the reading column at `--lesson-measure` (60-70ch).
- **Video placeholder slot:** 16:9, `--video-slot-bg` (grape) with a `--video-slot-icon` (marigold) play glyph and "Video coming soon. The full written guide is below." (`--video-slot-text`). Single `videoUrl` swap-point renders the player when a real URL exists. Never blocks reading.
- **Long-form lesson text (`.prose-course`):** grape-soft body at `--line-height-huge`, H2/H3 subheads in Archivo Black/Archivo, lists for enumerated guidance.
- **Callout / aside boxes:** warm-voice asides on `--lesson-callout-bg` (marigold-tint) with a `--lesson-callout-border` left rule; tips on `--lesson-tip-bg` (mint-tint); example boxes on `--lesson-example-bg` (page-tint). All AA-contrast, all flat (no shadow).
- **Downloads list:** labelled download cards (resource real name, opens new tab, rel noopener). The 2 missing links render a "Coming soon" pending card, flagged, never fabricated.
- **Complete-and-continue:** primary Success button "Mark complete and continue" (records completion, routes to next module) + secondary "Back". On mobile this is a sticky bottom bar (reserves space, anchored to the lesson, never overlapping the last paragraph).
- **Readings library:** 5 collection cards (title + 1-line description + "Open collection", new tab).
- **Performance strategies:** scannable callout-rich reference (technique title + 1 short paragraph), single readable column.
- **Locked / paywall state:** the module tree visible but greyed under a `--lesson-locked-overlay`; a centred message "Your course is waiting", one line, primary "Book Now" -> `/book`, secondary "Already booked? Contact support".

### Auth screens (CALM register)

Minimal, centred ~420px card on a `--color-page-tint` surface, booking-style chrome (logo only). All inputs labelled; all states defined; AA in every state. Heading in Archivo Black, fields per the Form Inputs spec, one primary button per screen, supporting text links with the styled underline. Used by Login, Register, Forgot password, Reset password.

### Footer

4-column link grid (Explore / More / Legal / Get in touch) on a `data-theme="grape"` field (page-white text, marigold links). Brand mark (footer logo, re-coloured to page-white), contact (sarah@letsgetwed.com.au, WhatsApp 0410 820 300), copyright + "Designed by Giovanni Vons" credit. Responsive: 4 cols desktop, 2 cols tablet, single stacked column mobile. One restrained marigold cue chip ("GOT QUESTIONS?") above the contact column is the only loud note.

### Image treatment system

Risograph logic, no texture: photos sit as flat confident blocks in or across flat colour fields, edge-to-field, often bleeding off an edge, often overlapping a cue chip or flat shape (overprint).
- **Grade:** true-to-life, bold contrast and saturation; NOT honeyed golden-hour.
- **Crops:** intentionally varied (tight close on the mate mid-line / hands on the page; one bold wider frame per page). Never all-same-rectangle.
- **Duotone:** loud beats may duotone a supporting photo to `--color-grape` or `--color-coral` (used only where the photo supports type, never where faces need true skin tone).
- **Bleed rule:** at least two images per marketing page bleed (full-width or break the content gutter); at least one moment where an image overlaps type or a chip.
- **No texture, no grain, no drop-shadow pillow, no paper-mount border.**
- **Honest empty state:** where a real rights-cleared photo is unavailable (love-story galleries, testimonials, blog), the flat-colour-and-type poster carries the slot; a missing photo never leaves a hole, and conditional sections hide rather than fake.

### Editorial detail layer (POP vocabulary)

The detail that rewards looking, in the pop family rather than editorial: solid cue chips, the held-beat middot `·` as the recurring graphic mark, overprint overlaps (a flat shape or numeral sitting partly behind type), oversized Anton poster numerals on the steps and the price, the running-order numbering of the stepper, and the colour-flip of the hit word. These are the "icons" of the brand; line icons (camera/edit/performance/music) appear only where they label a real product feature, re-coloured to `--color-grape` with `--color-coral-deep` active state, optionally in a small marigold/mint chip.

---

## Spacing Scale

Token to use-case mapping. All section vertical padding uses `--section-space-*`; all component spacing uses `--space-*`. No bare Tailwind spacing anywhere.

| Token | Use |
|---|---|
| `--space-1` | icon gaps, chip inner padding, hairline offsets |
| `--space-2` | button icon gap, tight stack, meta gaps |
| `--space-3` | adjacent-button gap, input padding-x, list item gap, held-beat margins |
| `--space-4` | card internal rhythm, paragraph rhythm, default component gap |
| `--space-5` | card padding, field-group rhythm, generous block gap |
| `--space-6` | sub-section gaps, heading-to-body within a dense section |
| `--space-7` | heading top margin, generous inter-block gap |
| `--space-8` | major in-section breaks |

**Section spacing rhythm (per surface):**
- **Marketing (loud rhythm, VARIES for poster pace):** alternate `--section-space-large` before a Hype Line peak (the "big breath") with `--section-space-main` for support sections and `--section-space-small` for tight trust beats. Example Home cadence: Hero (page-top), Reframe (`large`), 4-step (`main`), Legality (`small`, the calm trust beat), Blueprint (`large`), Pricing (`main`), Founder (`large`), Final CTA (`large`), FAQ (`main`). The variance is which token each section picks, never new tokens.
- **Booking wizard (calm rhythm):** even `--section-space-main` top padding, `--space-5` between field groups, predictable, no surprises.
- **Course (calm rhythm):** even `--section-space-small` between lesson sections, `--space-5` paragraph-block rhythm, generous reading.
- **Auth:** `--section-space-page-top` to centre the card vertically on tall viewports.

**Container widths:** marketing `--container-default` (1248px) with full-bleed sections to `--container-wide` (1440px); booking `--container-form` (640px); course reading `--container-read` (624px, ~60-70ch); auth ~420px; narrow editorial `--container-narrow` (800px). Horizontal padding `--container-padding-x` (`--site-margin`, fluid 1.25rem -> 3rem).

---

## Color Tokens

Semantic mapping lives in tokens.css Zone 3a (`--theme-*`) per `data-theme` (default page / `tint` / `grape` / `coral`); component bridge in Zone 3b; buttons in Zone 4. Distribution 60/30/10 tuned loud: ~50% page surface, ~30% grape + grape-soft + page-tint, ~15% coral + marigold + mint accents, with coral rationed so the CTA and the kiss beat stay loudest.

**Accent-as-text rule (carried from brand-guidelines, enforced in tokens):** bright accents (`--color-coral`, `--color-marigold`, `--color-mint`) are FILLS or display-scale hit words only. Any accent rendered as body-size text uses the `-deep` variant (`--color-coral-deep`, `--color-marigold-deep`, `--color-mint-deep`).

### Contrast ratio table (pre-computed, WCAG AA, all combinations including new pairs)

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| Grape `#2A1840` | Page `#FBFAFF` | 15.6:1 | PASS AAA (all text) |
| Grape-soft `#3D2A55` | Page `#FBFAFF` | 11.6:1 | PASS AAA (long-form body) |
| Grape-soft `#3D2A55` | Page-tint `#F2EEFB` | 10.6:1 | PASS AAA (body on alt) |
| Page `#FBFAFF` | Grape `#2A1840` | 15.6:1 | PASS AAA (inverted text, footer, dark beats) |
| Grape `#2A1840` | Coral `#F2484E` | 4.5:1 | PASS normal (primary button label, default) |
| Page `#FBFAFF` | Coral `#F2484E` | 3.5:1 | PASS large/bold only (hero display CTA, sticky bar label >=18px bold) |
| Page `#FBFAFF` | Coral-deep `#C9242A` | 5.6:1 | PASS normal (primary hover/active label, error fills) |
| Coral-deep `#C9242A` | Page `#FBFAFF` | 5.6:1 | PASS normal (links, small coral emphasis, tertiary button) |
| Coral-deep `#C9242A` | Page-tint `#F2EEFB` | 5.1:1 | PASS normal (links on alt sections) |
| Coral `#F2484E` | Page `#FBFAFF` | 3.5:1 | PASS large only (hit word >=44px); FAIL at body size |
| Grape `#2A1840` | Marigold `#F6A623` | 9.0:1 | PASS AAA (cue chip label, loud) |
| Marigold-deep `#A66A05` | Page `#FBFAFF` | 4.6:1 | PASS normal (marigold-as-text, "Optional" labels) |
| Grape `#2A1840` | Mint `#3FB39A` | 7.4:1 | PASS AAA (success/mint chip label, toggle-on check region) |
| Mint-deep `#1F7A66` | Page `#FBFAFF` | 4.6:1 | PASS normal (success text, calm mint chip text) |
| Page `#FBFAFF` | Mint-deep `#1F7A66` | 4.6:1 | PASS normal (success fills, completion button hover) |
| Grape `#2A1840` | Coral `#F2484E` (CTA on coral band) | 4.5:1 | n/a (on coral band CTA flips to grape fill + white label) |
| Page `#FBFAFF` | Grape `#2A1840` (CTA on grape) | 15.6:1 | PASS AAA (CTA coral fill + white label on dark verified separately at 3.5:1 large) |
| Marigold `#F6A623` | Grape `#2A1840` (link on dark) | 8.7:1 | PASS AAA (links + tertiary text on grape/coral sections) |
| Page-on-grape 70% blend `#8A7E96`-eq | Grape `#2A1840` | ~5.0:1 | PASS normal (muted text on dark, `--theme-text-muted`) |

**Newly introduced pairs verified here (not in the brand file):**
- Grape on Mint `#3FB39A` = 7.4:1 (mint chip label, toggle-on region) -> PASS.
- Marigold on Grape `#2A1840` = 8.7:1 (links/tertiary on dark) -> PASS.
- Page-white on Grape for the muted-text 70% blend = ~5.0:1 -> PASS normal text.

**Decorative-only colours (never as body text):** `--color-coral` (fill / display hit word only), `--color-marigold` (fill / chip bg / burst only), `--color-mint` (fill / tick / progress only). The toggle-on tinted field `--toggle-bg-on` and all `--color-field-*` tints are background-only and pair with grape/grape-soft text (verified >10:1).

**Opacity-reduced text check:** `--theme-text-muted` on dark = ~5.0:1 (PASS). No opacity-reduced text is used below /70 on dark or /80 on light without the verification above. Borders (`--color-grape-o12/o20/o40`) and scrims are decorative, never carry text.

---

## Typography Scale

Anton carries Hype Lines + display headings; Archivo Black carries calm H1/H2; Archivo carries H3, body, UI, course, and the tracked-caps cue chip and meta labels. No serif, no mono.

| Level | Class / element | Font / weight | Size token (range) | Line-height | Letter-spacing | Margin (top/bottom) |
|---|---|---|---|---|---|---|
| Hero Hype Line | `.hype-hero` | Anton 400 | `--font-size-display` (72-128px) | `--line-height-small` (0.92) | `--letter-spacing-tight` | n/a (composed) |
| Section Hype Line | `.hype` | Anton 400 | `--font-size-hype` (44-72px) | `--line-height-snug` (0.96) | `--letter-spacing-snug` | `--space-7` / `--space-5` |
| H1 (calm pages) | `h1` / `.h1` | Anton 400 | `--font-size-h1` (40-52px) | `--line-height-tight` (1.0) | `--letter-spacing-snug` | `--space-7` / `--space-5` |
| H2 | `h2` / `.h2` | Archivo Black 900 | `--font-size-h2` (30-34px) | `--line-height-tight` (1.0) | `--letter-spacing-normal` | `--space-7` / `--space-5` |
| H3 | `h3` / `.h3` | Archivo 800 | `--font-size-h3` (22-24px) | `--line-height-medium` (1.15) | `--letter-spacing-normal` | `--space-7` / `--space-4` |
| Body large (intros) | `.text-large` | Archivo 500 | `--font-size-text-large` (18-19px) | `--line-height-large` (1.55) | normal | `--space-4` / `--space-4` |
| Body (course long-form) | `.prose-course` / `p` | Archivo 400 | `--font-size-text-main` (16-17px) | `--line-height-huge` (1.7) | normal | `--space-4` / `--space-4` |
| Small / meta | `.meta-caps` / `small` | Archivo 600, caps, tracked | `--font-size-text-small` (13-14px) | `--line-height-relaxed` (1.4) | `--letter-spacing-wide` | n/a |
| Cue chip | `Chip` | Archivo 800, caps, in pill | `--font-size-chip` (12-13px) | 1.0 | `--letter-spacing-wider` | n/a |

**Type as image:** the hero Hype Line (128px Anton bleeding the edge), the `$950` pricing numeral (Anton at `--font-size-h1`), and the oversized step numerals (`01`-`04`) are the composed type-as-image moments. The size jump from body (17px) to hero (128px) is >7x, well above the 3x contrast minimum.

---

## Animation System

MOTION_INTENSITY 6, rationed by surface. Framer Motion for component entrances/layout, a tiny bespoke burst util for confetti, CSS transitions for hover/focus. No GSAP scroll-story (the concept demands speech timing + a celebration burst, not scroll-as-narrative). All reveals respect `prefers-reduced-motion` (collapse to instant; bursts killed via Zone 2 token override).

### Page-load sequence (marketing, Framer Motion)

Hero only runs an orchestrated load: header fades in (`--motion-duration-fast`), then the hero Hype Line runs its 3-beat reveal (cue chip pop `--motion-easing-pop`, line land, hit-word colour-flip + single burst), then the CTA + subhead stagger in (`staggerChildren: 0.08`, `delayChildren` after the line lands). Total ~1.1s. Initial states: chip `opacity:0, scale:0.8`; line `opacity:0, y:16`; CTA `opacity:0, y:12`.

### Scroll-triggered reveals (Framer Motion `whileInView`, NOT GSAP)

Each marketing section reveals once at ~25% in viewport: support content fades + rises (`opacity:0 -> 1, y:20 -> 0`, `--motion-duration-base`); the section's one Hype Line runs its snap-in beats (and its single burst if it is a genuine celebration peak: hero, final CTA, confirmation only). 4-step process staggers its cards (`staggerChildren: 0.1`); Blueprint cards stagger. Explicit initial states on every animated element so nothing flashes visible before its trigger.

### Hover / interaction (CSS transitions)

- Primary button: bg shift to coral-deep + `translateY(-2px)` + flat offset shadow, arrow slides `--space-1` right (`--motion-duration-fast`).
- Secondary button: fill-to-grape transition.
- Card (marketing desktop): `translateY(-3px)` + flat poster offset shadow.
- Link: underline thickens `--link-thickness` -> `--link-thickness-hover`.
- Image (love-story/blog cards): subtle `scale(1.03)` within an overflow-clip frame; couple name fades in.

### Calm-surface motion (wizard / course / auth)

Near-zero (`data-surface="calm"` shrinks durations). Allowed: quiet field-group fade on step change (`--motion-duration-base`), the running-total count-up tick, the progress-ring fill on mount, the stepper current-dot pulse (a single `--step-current-ring` halo, no loop). BANNED: bursts, snap-in beats, poster-scale type. The single exception is the Step 7 confirmation `THE KISS` Hype Line + its one burst.

### The confetti burst (rationed)

Fires at most once per page, only on hero peak, final marketing CTA, and the booking confirmation. `--burst-particle-count` flat shards in the confetti palette, `--burst-duration`, pointer-events none, clipped to the section. Reduced-motion sets particle count to 0 and duration to 0.

### Layout transitions (Framer Motion)

Mobile nav drawer (slide from right, focus trap), course drawer (slide), accordion height, modal/overlay enter/exit (`AnimatePresence`). Wizard step transitions: the field column cross-fades + slides `--space-4` (`--motion-duration-base`); the stepper updates with no motion beyond the dot state change.

---

## Page Index

| Page | Surface | Sections |
|---|---|---|
| [Home](#page-home) | Marketing (loud) | Hero, Reframe, 4-Step Process, Legality Reassurance, Blueprint, Pricing teaser, Founder, Featured Love Stories (cond.), Blog teaser (cond.), Final CTA, FAQ |
| [How It Works](#page-how-it-works) | Marketing (loud) | Intro, 4 Steps expanded, Who does what, Legality, CTA |
| [Pricing](#page-pricing) | Marketing (loud) | Package, Optional extras, GST note, CTA |
| [About](#page-about) | Marketing (loud->editorial) | Hero, Origin, Feedback, Why the Blueprint, CTA |
| [FAQ](#page-faq) | Marketing (loud) | Intro, Grouped accordions, Still-stuck CTA |
| [Reviews](#page-reviews) | Marketing (loud) | Intro, Testimonials (cond.), Featured stories (cond.), CTA |
| [Blog index + post](#page-blog) | Marketing (loud) | Index grid (cond.), Post body + end CTA |
| [Contact](#page-contact) | Marketing (loud) | Intro, Form, Direct contact, Soft convert |
| [Terms / Privacy](#page-legal) | Marketing (calm) | Long-form legal (cond. / hosted) |
| [Booking wizard](#page-book) | Booking (calm) | Stepper + Steps 1-6 + Confirmation |
| [Auth](#page-auth) | Auth (calm) | Login, Register, Forgot, Reset |
| [Course dashboard](#page-course-dashboard) | Course (calm) | Welcome + progress, Module tree, Resources, Support |
| [Course lesson](#page-course-lesson) | Course (calm) | Header, Video slot, Long-form, Downloads, Complete-and-continue, Support |
| [Course readings / strategies / locked](#page-course-aux) | Course (calm) | Resource indexes + paywall |
| [Design Book](#page-design-book) | Internal | Brand, Components, Layout, Pages, Motion, Assets |

---

## Per-Page Sections

### <a id="page-home"></a>Page: Home (`/`) -- Marketing, `data-surface="loud"`

**Overall:** background `--color-page`; max content width `--container-default` with full-bleed sections to `--container-wide`; loud-rhythm vertical spacing (varies, see Spacing Scale cadence). Art-directed moments named per section.

**Section 1: Hero** (`data-theme="grape"` over photo, `--section-space-page-top` top)
- Layout: full-bleed (`--container-wide`) photographic hero (`wedding-banner1.jpg` or `wedding2.jpg`, re-treated, bold crop, grape scrim `--color-grape-fill-o50` for legibility); the Hype Line lockup left-aligned on desktop, centred-stacked on mobile.
- **Hype Line (the loudest on the site):** cue chip `THE WELCOME` (marigold), line "THE MUSIC DROPS, AND YOUR BEST MATE STEPS *UP*" with "UP" as the coral hit word, `.hype-hero` (`--font-size-display`), page-white on the grape scrim. One confetti burst on "UP".
- Subhead: "Say I do with your best mate marrying you. More laughter. More tears. More magic." `.text-large`, page-white.
- CTAs: Display-CTA "Book Now" (`--btn-display-bg`, white label, `--btn-size-large`); secondary text-link "See how it works" (page-white styled underline).
- **Art-directed moment:** the 128px Anton line bleeds off the left edge; the photo bleeds full-width behind; the marigold cue chip overlaps the top of the line (overprint).
- Animation: page-load 3-beat Hype Line reveal + burst, then CTA stagger.
- Responsive: 90vh desktop / 80svh mobile; image 16:9 desktop / 4:5 mobile; line clamps to 72px and stacks to 3 lines mobile; CTA full-width mobile.

**Section 2: The Reframe** (`data-theme="tint"`, `--section-space-large`)
- Headline (rhetorical-question override, <=9 words): "WHY CHOOSE A CELEBRANT, WHEN YOU COULD CHOOSE A MATE?" as a `.hype` Section Hype Line, cue chip `THE CHOICE`, hit word "MATE" coral-deep at this scale (still >=44px so coral is allowed; uses `.hit`).
- Two beats: "Finding the right celebrant is tough" / "Now picture a more personal option" as two stacked paragraphs (`.text-large`, grape-soft), with a supporting 4:3 image of a friend leading, bleeding the right gutter (overprint over the tint field).
- **Art-directed moment:** asymmetric two-column: text left at 55%, image bleeding off the right at 45%, the held-beat middot `·` separating the two beats.
- Animation: scroll-reveal per beat; the Hype Line snaps in (no burst, this is not a celebration peak).

**Section 3: The 4-Step Process** (`data-theme` default page, `--section-space-main`)
- Headline (<=8 words): "4 STEPS TO A CEREMONY YOU'LL RELIVE FOR YEARS" (`.h2`, Archivo Black) -- calm H2, NOT a Hype Line (rationing: one peak per section, the peak here is the composed numerals).
- Four step cards verbatim: 01 Choose your celebrant / 02 They get trained and supported / 03 We handle the legals / 04 You get a wedding that goes down in the books. Each: oversized Anton poster numeral (rotating coral / marigold / mint / grape), title (<=5 words), 1 paragraph (<=40 words), optional line-icon in a small chip.
- CTA: "Start Your Journey" primary.
- **Art-directed moment:** the poster numerals are oversized and bleed partly behind each title (overprint); on mobile a connecting vertical line ties the four into a journey.
- Layout: 4-up desktop, 2x2 tablet, vertical stepped timeline mobile. Animation: staggered card reveal.

**Section 4: Legality Reassurance** (`data-theme="tint"`, `--section-space-small`, CALM trust beat within loud page)
- Headline (<=8 words): "YES, YOUR MATE CAN REALLY MARRY YOU" -- a `.hype` Section Hype Line but with a MINT cue chip `LEGALS SORTED` (the reassurance variant) and NO burst; this is the deliberate volume drop, restraint as craft.
- 2-3 paragraphs (grape-soft) on the two anxieties and the truthful registered-celebrant framing; ends with a soft link to `/faq` (no competing CTA).
- **Art-directed moment:** lowest-noise section on the page, a single mint reassurance tick mark as the only graphic; the calm is the composition.
- Layout: contained `--container-narrow`, generous spacing. Animation: minimal fade, no snap-in.

**Section 5: The Blueprint (4-feature grid)** (`data-theme` default, `--section-space-large`)
- Headline (<=8 words): "ELEVATE YOUR WEDDING CEREMONY TO BE UNFORGETTABLE" (`.hype` Section Hype Line, cue chip `THE BLUEPRINT`, hit word "UNFORGETTABLE" coral-deep).
- 4 feature cards (2x2): camera/edit/performance/music icons (re-coloured grape, coral-deep active), title (<=6 words), 1 paragraph (<=35 words). One card sits on a `--color-field-mint` tint for overprint rhythm.
- **Art-directed moment:** the 2x2 grid is offset (one column shifted `--space-5` down) to break the uniform grid; icons sit in small marigold/mint chips.
- Animation: stagger + hover lift (desktop). One Hype Line peak (the headline).

**Section 6: Pricing teaser** (`data-theme` default, `--section-space-main`)
- Headline (<=6 words): "THE INVESTMENT: $950. THE MEMORIES: PRICELESS." with `$950` as an Anton poster numeral.
- A single emphasised pricing card (grape `--border-width-bold` border): "All the good stuff in your Wedding Mates package", checked inclusion list (items <=8 words, mint ticks), one line that extras exist (link to `/pricing`), primary "Book Now".
- **Art-directed moment:** the `$950` numeral is oversized and overlaps the card's top edge (overprint); the package image (`wedding-mates-package.jpg`) bleeds into the card's flat colour field.
- Layout: card centred, `--container-narrow`. Animation: card reveal, gentle (not gaudy).

**Section 7: Founder Story** (`data-theme="tint"`, `--section-space-large`)
- Portrait `sarah-wedding.jpg` (4:5, re-treated, flat colour field) image-left; "HI, I'M SARAH" (`.h1` Anton, <=4 words) + 300-hours credential + proudest-moment story (2 paragraphs) + `sign.png` signature graphic + "Read more" tertiary -> `/about`.
- **Art-directed moment:** the signature graphic overlaps the portrait's bottom-right corner (overprint); image bleeds the left gutter.
- Layout: image-left / text-right desktop, stacked image-first mobile.

**Section 8: Featured Love Stories** (CONDITIONAL, `--section-space-main`)
- 2 large 3:2 image cards (Kat+David, Kristi+Mark) side by side, hover reveals couple name, "View Gallery". If rights unconfirmed: section hidden, NOT faked (honest empty state in the Design Book).

**Section 9: Blog teaser** (CONDITIONAL, `--section-space-main`)
- 3 real-post cards (title <=9 words, 1-sentence excerpt, 3:2 image, "Read the story"). Hidden if no real posts; never lorem.

**Section 10: Final CTA** (`data-theme="coral"`, `--section-space-large`, the second permitted loud eruption)
- Full coral band; headline (<=9 words) "READY TO POP THE QUESTION TO YOUR MATE?" as a `.hype` Hype Line, grape hit word on coral (4.5:1), one confetti burst (palette pops against coral), primary "Get Started Today" (flips to grape fill + white label on the coral band).
- **Art-directed moment:** the page's strongest punctuation, full saturated field, one button, the burst.
- Layout: centred, `--container-narrow`.

**Section 11: FAQ (inline)** (`data-theme` default, `--section-space-main`)
- Accordion (5-7 questions, two anxieties lead), one open at a time, animated height, link to full `/faq`. Calm register; only client-approved answers render, the rest gated.

**Responsive (Home):** desktop 1280px full spec (alternating contained/full-bleed, 4-up grids, founder split); tablet 768px 2x2 grids, splits side by side; mobile 375px single-column stack, 4-step vertical timeline, sticky "Book Now $950" bar after hero (reserves height, inverts over the grape/coral sections).

---

### <a id="page-how-it-works"></a>Page: How It Works (`/how-it-works`) -- Marketing, loud

**Overall:** `--color-page`, `--container-default`, always-solid header.
- **Section 1 Intro:** H1 (<=6 words, `.h1` Anton) + 1 paragraph + "Book Now". `--section-space-page-top`.
- **Section 2 The 4 steps expanded:** each step a block (per-step headline <=5 words, 2 paragraphs) with an alternating-side re-treated image; one Section Hype Line as the section peak ("WE HANDLE THE LEGALS" with mint cue chip). `--section-space-main` between blocks. **Art-directed moment:** alternating image bleed left/right, poster numerals overprinting each block's heading.
- **Section 3 Who does what:** a plain 3-column responsibility split (Couple / Mate / We handle, headers <=3 words, bullets <=10 words) as a flat-colour-blocked table (each column a different tinted field, `--color-field-*`). **Art-directed moment:** the three flat colour columns are the composition (colour-as-structure). Mobile: stacked labelled groups.
- **Section 4 Legality:** fuller trust beat, `data-theme="tint"`, calm, mint chip, no burst.
- **Section 5 CTA:** `data-theme="coral"` final band, "Book Now", one burst.

---

### <a id="page-pricing"></a>Page: Pricing (`/pricing`) -- Marketing, loud (decision page, generous whitespace)

**Overall:** `--color-page`, `--container-narrow`, VISUAL_DENSITY effectively lower here (decision clarity).
- **Section 1 The package:** "$950. EVERYTHING YOUR MATE NEEDS." (H1, `$950` Anton numeral), one emphasised pricing card (8 inclusions, mint ticks), "The memories: priceless" line, primary "Book Now". **Art-directed moment:** oversized `$950` overprinting the card.
- **Section 2 Optional extras:** the 4 add-ons (Certificate $69, Celebrant in attendance $299, Zoom rehearsal $99, Script review $129) as toggle-style cards (here display-only, "add at booking"), title <=6 words, 1-sentence description, price as Anton numeral. 2x2 desktop, stacked mobile.
- **Section 3 GST note:** a single neutral flagged placeholder line until the client confirms inclusive/exclusive (never fabricated).
- **Section 4 CTA:** "Book Now", `data-theme="coral"` band, one burst.

---

### <a id="page-about"></a>Page: About (`/about`) -- Marketing tilting editorial, loud opener then calm long-form

**Overall:** `--color-page`, `--container-narrow` for reading comfort (60-70ch), image-led. Second-most-visited; treated with respect.
- **Section 1 Hero:** "HI, I'M SARAH" (`.h1` Anton, <=4 words) + `sarah-wedding.jpg` 2019 portrait (4:5, re-treated, bleeds the gutter) + one warm line. `--section-space-page-top`. **Art-directed moment:** type-as-image name beside the bleeding portrait.
- **Section 2 The origin:** becoming a celebrant, the 300+ hours, the cost, the proudest moment (up to 4 paragraphs, grape-soft, `.prose-course` measure). Image 4:5.
- **Section 3 The feedback:** "I wasn't a stranger delivering a script" (2 paragraphs), one calm pull-quote in `.hype` at reduced scale as the type-as-image moment.
- **Section 4 Why the Blueprint exists:** turning coaching into the 8-lesson course (2 paragraphs).
- **Section 5 CTA:** "Book Now" + soft "Questions first? Contact me" (`data-theme="tint"`, calm close, NO burst here, restraint).
- Responsive: splits stack image-first mobile; comfortable measure preserved via padding.

---

### <a id="page-faq"></a>Page: FAQ (`/faq`) -- Marketing, loud (CONDITIONAL)

**Overall:** `--color-page`, `--container-narrow`, single-column accordion.
- **Section 1 Intro:** one reassuring line + a marigold cue chip `THE TWO BIG QUESTIONS`.
- **Section 2 Grouped accordions:** Legality / The Mate / Pricing & extras / Logistics & timing / The course; two-anxiety questions lead; one open at a time; only client-approved answers render, the rest as a flagged empty state.
- **Section 3 Still-stuck CTA:** "Contact us" + "Book Now".

---

### <a id="page-reviews"></a>Page: Reviews (`/reviews`) -- Marketing, loud (CONDITIONAL)

**Overall:** `--color-page`, proof-led. Intro line; testimonials grid (real quotes + attribution, CONDITIONAL, hidden until supplied); featured love stories (CONDITIONAL on rights); "Book Now". When empty, an honest "real reviews coming soon" state, never fabricated. Masonry/2-up desktop, single column mobile.

---

### <a id="page-blog"></a>Page: Blog index + post (`/blog`, `/blog/[slug]`) -- Marketing, loud (CONDITIONAL)

**Index:** intro line + 3-up card grid of REAL posts (title <=9 words, 1-sentence excerpt, 3:2 image, "Read the story"); empty state if none. **Post:** title (`.h1`), hero image (bleeds), body at `--container-read` measure, a "Ready for your own day? Book Now" CTA block (`data-theme="coral"`) at the end. Responsive: 3-up desktop, stack mobile; post single-column readable measure.

---

### <a id="page-contact"></a>Page: Contact (`/contact`) -- Marketing, loud opener / calm form

**Overall:** `--color-page`, `--container-default`, split form + info.
- **Section 1 Intro:** "GOT QUESTIONS? LET'S TALK." (`.h1`) 1 line.
- **Section 2 Form:** Name, Email, Message (all labelled, Form Inputs spec), primary "Send message". Calm register.
- **Section 3 Direct contact:** email sarah@letsgetwed.com.au, WhatsApp 0410 820 300 (one-tap on mobile, the link styled with two cues).
- **Section 4 Soft convert:** "Ready now? Book Now".
- Responsive: form left / info right desktop; stacked form-first mobile.

---

### <a id="page-legal"></a>Page: Terms / Privacy (`/terms`, `/privacy`) -- Marketing, CALM

**Overall:** `--color-page`, `--container-read` single readable column, `data-surface="calm"`. Terms CONDITIONAL on client copy (no fabricated refund policy). Privacy points to the Vonzie Nexus hosted page post-launch (labelled placeholder). No CTA, no Hype Line, no burst. Headings Archivo Black, body `.prose-course`.

---

### <a id="page-book"></a>Booking Portal (`/book`, `/book/confirmation`) -- Booking, `data-surface="calm"`

**Overall:** focused single-task surface. Marketing header replaced by a minimal booking header (`--header-booking-height`: logo + "Step X of 7" + "Save & exit"). No marketing nav, no sticky Book Now bar. Centred form column `--container-form` (640px), `--color-page` only (NO saturated fields, NO bursts except Step 7), even calm spacing. The cue chip is the only accent besides the primary button (the bridge).

**Stepper:** the 7-segment Step indicator component (Date, Details, Celebrant, Location, Extras, Payment, Done), current = coral dot, done = mint tick, optional badge on Celebrant + Location. Reserves its own height above the field column; on mobile compacts to "Step X of 7: [label]".

**Step 1 Your Wedding Date** (`data-surface="calm"`)
- Heading "When's the big day?" (<=5 words, Archivo Black H2). Cue chip `STEP 1 · DATE` (calm tint).
- Date field (native on mobile, calendar widget desktop). Conditional legal note when <4 weeks (reassurance, mint chip, reserves space so the Continue button never shifts).
- Primary "Continue". Validation: valid future date.

**Step 2 Your Details** (the only other required gate)
- Heading "A bit about you two". Cue chip `STEP 2 · DETAILS`.
- Fields (labelled): Your full name, Partner's full name, Email address, Mobile number, Home suburb (helper "Used to plan your legal face-to-face meeting"), Preferred contact method (Email/Phone radio).
- 2-column you/partner pairing desktop, stacked mobile. Primary "Continue". Validation per ux.md.

**Step 3 Your Chosen Celebrant (Optional)**
- Heading "Who's your mate?". Cue chip `STEP 3 · CELEBRANT` + "Optional" marigold-deep label.
- Helper "You can add this now or later"; checkbox "We haven't chosen one yet" (verbatim) collapses the fields when checked; otherwise name/email/phone. Primary "Continue" + "Skip for now" tertiary. Checkbox first on mobile.

**Step 4 Ceremony Location (Optional)**
- Heading "Where will it happen?". Cue chip `STEP 4 · LOCATION` + "Optional".
- Single free-text "Ceremony location" textarea (helper "A venue, a backyard, a beach, anywhere"). Primary "Continue" + "Skip for now".

**Step 5 Optional Extras (running total)**
- Heading "Want to add anything?". Cue chip `STEP 5 · EXTRAS`.
- 4 extras toggle cards (Certificate $69, Celebrant in attendance $299, Zoom rehearsal $99, Script review $129) with verbatim descriptions; on = mint-tinted field + mint check. Running-total bar "Base $950 + extras = $X" (count-up tick on toggle).
- Desktop: 2-col grid + total in a right summary rail. Mobile: stacked cards + sticky running-total bar (reserves height, anchored, never overlapping). Primary "Continue to payment".

**Step 6 Payment**
- Heading "Secure checkout" (<=3 words). Order summary (base + extras + total + GST placeholder line), Stripe Payment Element in token chrome, trust line. Primary "Pay $X" (live total, full-width mobile, disabled-until-valid with strong contrast in disabled state).
- Desktop: summary in right rail; mobile: summary above the payment element.

**Step 7 Confirmation & Access** (`/book/confirmation`, the ONE permitted loud eruption)
- A full `THE KISS` Hype Line "AND JUST LIKE THAT, YOU'RE *MARRIED*" with the single earned confetti burst of the whole flow (`data-theme` may briefly go coral for this beat), then drops to calm.
- Order-reference line + "what happens next" checklist (4 items <=10 words: course login in inbox, download timeline checklist, book onboarding call, celebrant welcome pack sent). Primary "Go to your course" -> `/course`; secondary "Book your onboarding call".
- Pending state "Confirming your payment" (no burst) until the webhook settles.
- Responsive: single centred column all sizes; checklist is the visual focus.

---

### <a id="page-auth"></a>Auth screens (`/login`, `/register`, `/forgot-password`, `/reset-password`) -- Auth, calm

**Overall:** centred ~420px card on `--color-page-tint`, booking-style chrome (logo only), `data-surface="calm"`. All inputs labelled, all states defined, button AA in every state. One marigold cue chip per card (e.g. `SIGN IN`) is the only accent besides the primary button.
- **Login:** "Welcome back" (Archivo Black, <=3 words), Email + Password, primary "Sign in", links "Forgot password?" + "New here? Create account", bad-credentials error state.
- **Register:** "Create your account", Name + Email + Password (rule hints <=10 words) + confirm, primary "Create account", link to Login.
- **Forgot password:** "Reset your password", Email, primary "Send reset link", success "Check your inbox".
- **Reset password:** "Set a new password", New password + confirm, primary "Save password", success routes to Login or `/course`.
- Responsive: full-width card mobile, 420px centred from 768px.

---

### <a id="page-course-dashboard"></a>Course: Dashboard (`/course`) -- Course, `data-surface="calm"`

**Overall:** course chrome (persistent `--course-sidebar-width` left sidebar desktop / drawer mobile), `--color-page` main, warm but calm. No Book Now (paid).
- **Section 1 Welcome + progress:** "Welcome, [name]" (<=4 words) + progress ring "X of 9 complete" (mint arc, Anton numeral) + primary "Continue learning" (deep-links to current lesson).
- **Section 2 Module tree:** 9 items (Intro + Modules 1-8) as module cards (thumbnail in flat colour field, calm grape-on-tint chip, title <=7 words, summary <=12 words, status pill mint/coral/grey, est-time meta). Sequential unlock.
- **Section 3 Resources:** quick links to Readings, Strategies, Downloads.
- **Section 4 Support:** "Stuck? Message Sarah" (email + WhatsApp), always visible.
- Responsive: sidebar -> top hamburger drawer mobile (focus-trapped); progress ring at top; module tree is the primary mobile content.

---

### <a id="page-course-lesson"></a>Course: Lesson (`/course/introduction`, `/course/module-[1-8]`) -- Course, calm

**Overall:** long-form reading surface, sidebar/drawer + reading column at `--lesson-measure` (60-70ch), `--color-page`. The Hype Line appears here ONLY as a quiet teaching object (a marked example line, `.hype` capped at section scale, no burst, no oversized scale, accent at `--theme-heading-accent`).
- **Section 1 Header:** module number + title (<=8 words) + est-time chip + "lesson X of 9".
- **Section 2 Video slot:** 16:9 grape placeholder, marigold play glyph, "Video coming soon. The full written guide is below." Single swap-point. Never blocks reading.
- **Section 3 Long-form text (`.prose-course`):** verbatim module body, H2/H3 subheads every 2-4 paragraphs, lists for enumerated guidance, callout boxes (marigold-tint warm asides "This part will be fun!", mint-tint tips, page-tint example boxes), all AA-contrast, all flat.
- **Section 4 Downloads:** labelled download cards (real resource names, new tab, rel noopener); the 2 missing links (Module 5 vows guide, Module 7 nerves tips) as a flagged "Coming soon" pending card, never fabricated.
- **Section 5 Complete & continue:** Success button "Mark complete and continue" + secondary "Back"; Module 8 ends with a celebratory finish state (a single quiet Hype Line, NO burst) pointing to the Module-1 checklist's final section. Sticky bottom bar on mobile (reserves space, anchored).
- **Section 6 Support footer:** "Stuck? Message Sarah" repeated.
- Responsive: drawer behind hamburger mobile; reading column full-width with comfortable padding; video slot column-width 16:9; downloads stack; complete-and-continue sticky bottom bar mobile.

---

### <a id="page-course-aux"></a>Course: Readings / Strategies / Locked -- Course, calm

- **Readings Library (`/course/readings`):** 5 collection cards (title <=6 words, description <=12 words, "Open collection" new tab). 2-up desktop, single column mobile.
- **Performance Strategies (`/course/strategies`):** scannable callout-rich reference (technique title <=6 words, 1 short paragraph), single readable column, callouts stack.
- **Locked / Paywall (`/course/locked`):** centred message "Your course is waiting" (<=4 words), one line, primary "Book Now" -> `/book`, secondary "Already booked? Contact support". Module tree visible but greyed under `--lesson-locked-overlay`. Single centred column all sizes. This is the one course surface where the Book Now CTA returns.

---

### <a id="page-design-book"></a>Page: Design Book (`/design-book`) -- internal review surface

Renders, per `patterns/design-book/README.md`: (1) Brand (palette swatches with hex + the contrast table, type specimens at every level with line-height/letter-spacing, 3-5 voice samples, the three dials); (2) Components (every Button variant x state x size, the Cue Chip in all three variants, every Card variant, every Form input x state, Navigation desktop + mobile drawer, Accordion, and EVERY bespoke component: the Hype Line shown over BOTH a light and a grape section, the Stepper, the Running-total bar, the Extras toggle, the Progress ring, the Video slot, the Course sidebar, the Locked state); (3) Layout (the `--space-*` scale as sized bars, the section-spacing rhythm, breakpoint markers, container widths); (4) Pages (thumbnail grid of every page above, linking through); (5) Motion (every animation in one catalog with a `prefers-reduced-motion` toggle, including the single rationed burst); (6) Assets (logo variants re-coloured, the 4 Blueprint + 3 course SVG icons re-coloured, the held-beat middot, the cue chip, the honest empty-state placeholders). The Hype Line over light + grape is the required dual-surface review at the 2.5 gate.
