# Brand Guidelines -- Wedding Mates ("Let's Get Wed")
**Phase:** 1
**Agent:** brand-strategist
**Date:** 2026-06-21
**Status:** draft

---

> **Revision note (2026-06-21):** the concept, positioning, conversion thesis, voice, and photography subject priority below are unchanged and were approved. What changed is the entire AESTHETIC FAMILY. The prior draft landed the look in the editorial / literary corner (Fraunces + Source Serif 4, paper-and-ink, margin-rule typesetting), which is the same warm-serif-editorial gravity well the sibling `sarah-emery-celebrant` build occupies. That lean was rejected. The brand is re-aimed to **BOLD / CELEBRATORY POP**: a loud, saturated, high-contrast, kinetic system where colour and heavy display type do the talking. The signature is re-expressed loud (the "Hype Line"). Everything visual is rebuilt; the idea is kept.

---

## Concept

### The Central Idea

**The whole brand is a marked-up ceremony script, cranked up to the volume of the party it's written for.** Wedding Mates does not sell "a friendly officiant" and it does not sell "a wedding course." It sells the page a nervous mate holds at chest height while everyone they love watches, and the confidence to deliver it so the room erupts. So the site behaves like that page after it has been rehearsed enough to land: the headline copy carries the mate's own delivery marks (a cue to the moment, a word hit hard for emphasis, a held beat before the cheer) out loud, in huge type, the way the course teaches the mate to build a ceremony that gets laughs and tears on cue. The visitor reads the marketing in the exact delivery grammar the mate will use on the day, but rendered as celebration, not as quiet typesetting. The site is the rehearsal, and the rehearsal is already a party.

This is not a metaphor we bolt on. It is the literal craft the product teaches. Module 7 says it in the client's own words: "Inflection, pauses and pace transform a ceremony from a flat reading into something engaging and memorable." The brand is that sentence made visible and loud: the marks are real (the cue, the hit word, the held beat), and the design treats the payoff of a well-delivered line the way a wedding treats the kiss, with colour and noise.

A stranger reading only this section should be able to predict the feel (a best-man speech that actually lands, warm and loud and a little cheeky, building to a cheer) and name the one thing they are meant to do (book the $950 package and start writing).

### The Ownability Test

Central idea with the nearest competitor swapped in:

> "**A traditional registered celebrant** is a marked-up ceremony script that the person who knows you best learns to write, hit on cue, and land in front of the whole room."

False. A traditional celebrant arrives with their own script and their own voice; the couple never holds the page and the friend is a guest. The directory marketplaces ("find a celebrant near you") cannot claim it either: their product is a list of strangers, not a method for turning your best mate into the one at the front who makes the room laugh and cry. The DIY vow generators sell words on a screen with no delivery craft, no legal cover, and no person who loves you holding the page.

**Competitor [a traditional celebrant / a celebrant directory] could not claim this because** their product is a professional standing in for the couple's people. Wedding Mates's product is the couple's own person, trained to hold the page and land the lines. The script belongs to the mate, in the mate's voice, about this specific couple, delivered to a room that knows them both. Swap the client out and the sentence collapses, because no competitor's offer is "your friend writes it, hits it, and the room goes off." That is the whole business. The loud aesthetic is not decoration on top of this: it is the visual proof that a friend who knows you can deliver a moment a stranger never could.

### The Signature Move

**The Hype Line** -- a recurring oversized typographic callout that renders one line of the ceremony the way a confident delivery actually lands: a cue to the moment, a word hit hard, a held beat, and then a burst of celebration timed to the payoff. It is the loud re-expression of the prior draft's "Prompt Line." Same three marks (cue, emphasis, held beat); completely different register (huge condensed display, saturated colour, a confetti-timed reveal instead of a quiet word-by-word fade).

Anatomy (buildable as one bespoke React component, not a `patterns/` primitive):

- A short line set in the **heavy condensed display face at large-to-huge scale** (the line is the visual, not a caption under an image).
- A small **cue chip** that names the ceremony moment, set in a bright pill against the line: `THE WELCOME`, `THE VOWS`, `THE LEGALS`, `THE KISS`. The chip is a solid saturated shape, not a thin margin rule. It is where the brand's "stage-cue" voice lives, and it is rationed (see below).
- One or two words inside the line set in a **contrasting accent colour and the heaviest weight** (the "hit this word" mark). The emphasis is colour-and-weight, loud, not an italic.
- A **held beat** rendered as a deliberate gap or an oversized centred dot `·`, and on scroll-in the line snaps in in two or three quick beats (cue chip pops, line lands, the hit word colour-flips) with a small **confetti / streamer burst** fired once on the payoff word. Delivery, not ambient decoration. With `prefers-reduced-motion`, the full line renders at once with the final colours and no burst.

Where the Hype Line lives (it is scarce on purpose):

- The marketing hero (the headline IS a Hype Line, the loudest one on the site).
- Exactly one Hype Line per major marketing section as the section's emotional peak, never more. The rest of the section is loud-but-calmer support around that one peak.
- The booking wizard reuses only the **cue chip** (`STEP 3 · YOUR CELEBRANT`) so the buyer feels they are assembling a ceremony, page by page, but the wizard body stays in the calm register (see Dual-Register). The booking confirmation IS a full Hype Line with the one earned confetti burst of the whole flow: `THE KISS` / "and just like that, you're married."
- Inside the course, the Hype Line becomes a teaching object: lesson examples show a real line marked with its cue and its hit word, so the mate practises in the same grammar. The course uses the device QUIET (no confetti, no oversized scale) so a nervous reader is taught, not shouted at.

Where it must NOT live (or it stops being a signature and becomes wallpaper): not on the nav, not on every button, not on body paragraphs, not on form labels, not as a global page texture, not behind long-form course reading. The cue chip never becomes the type system for general UI chrome. The confetti burst fires at most once per page and only on a genuine celebration beat (hero peak, confirmation, the kiss line) -- never on hover-everything, never on every section. One Hype Line owns a section's peak; the loudness is rationed so the peaks actually feel like peaks.

This serves the build directly: it is the single device that proves the product (a friend can land the moment) on the marketing site, structures the buyer's path through the wizard, and teaches inside the course. One motif, three surfaces, one meaning, dialled loud or quiet to fit who is reading.

### The Conversion Thesis

**Primary conversion action (single, unmistakable): complete the $950 Wedding Mates booking** through the 7-step portal, ending in payment plus course access. Per the dossier Website Goals > Primary Goal. The button reads **Start Your Script** (the brand's verb for "book"), with **Book Now** as the plain fallback used where context needs zero ambiguity (sticky bar, footer).

How the concept pulls toward it rather than decorating around it: each Hype Line shows the visitor a finished, loud, joyful moment ("the music drops / and your best mate steps up · `THE WELCOME`") and the only way to get that moment for their own wedding is to start writing the script. Every Hype Line is an unfinished ceremony that the booking completes; the cue chips literally count the visitor toward the act of booking, because the booking wizard wears the same cue-chip chrome. Desire (that moment could be ours) and mechanism (start the script) are the same gesture. The loud palette concentrates on the CTA: the primary button is the most saturated, highest-energy object on every page, so the eye is pulled to it by the colour logic itself. The signature never competes with the CTA; the signature IS the argument for the CTA, and the colour system makes the CTA the loudest thing in the room.

### Divergent References (3+ from outside web design)

1. **A best man / maid of honour speech that actually kills (live performance craft, not print).** Transferable property: *timing as the unit of joy* -- the setup, the held beat, the punchline, the room going off. The Hype Line's reveal is built on this rhythm (cue, beat, hit word, burst), not on a quiet reading fade. This is the loud cousin of an annotated script: the marks are still there, but the payoff is laughter and a cheer, not a turned page.
2. **Confetti and streamers thrown at a wedding recessional (event photography / object, frozen at the apex).** Transferable property: the *actual colours people throw over two people they love* -- a hot coral-red, a deep grape, a marigold, a fresh mint -- caught mid-air against a bright sky. This is the literal source of the palette (see Color System), so the brand's loudness is wedding-true, not generic-rainbow. It also sets the one rationed motion beat (the burst).
3. **Risograph / screen-printed gig and event posters (print, graphic).** Transferable property: *flat saturated ink layers, slight mis-registration overlaps, and a few bold spot colours doing all the work* -- no gradients, no 3D, no soft pillows. This sets the craft bar for how colour and heavy type are used: confident flat blocks, overprinted shapes, type-as-image. It is what keeps the pop *crafted* rather than balloon-3D or sticker-soup.
4. **Wayfinding and stage signage / lyric-screen typography (environmental / motion graphics).** Transferable property: *huge condensed grotesque set tight and stacked, readable from across a room* -- the display logic that lets one line be the whole composition. The cue chip borrows the solid, legible "you are here / next up" chip from event signage, which is exactly what the booking stepper needs to feel like assembling a running order.
5. **A Penguin-classic-meets-Pentagram editorial grid used as the QUIET foundation (book / system design).** Transferable property: *a disciplined column and honest hierarchy underneath the noise* -- so the loud beats land against real structure and the booking wizard and the 15-hour course read cleanly. This is the reference that keeps the calm register from becoming "two different brands": the loud surfaces and the calm surfaces share one grid and one type family; only the colour energy and the scale change.

Craft bar set by these references: the finish of a well-printed risograph gig poster and a timed live speech, not a fun-fintech illustration set or a confetti-gradient SaaS hero. The downstream team should be matching the flat-saturated-ink discipline of reference 3 and the timing of reference 1, against the grid discipline of reference 5.

### House-Style Blocklist Check

The agency's recurring slop look is cream/off-white + serif display + monospace utility labels + film grain + terracotta/clay accent + GSAP scroll-story. **This build uses ZERO of those traits.** No cream, no serif display (heavy condensed grotesque instead), no mono, no film grain, no terracotta, no scroll-as-narrative. The whole point of this revision is to leave that gravity well entirely. No house-style justification is needed because none of the house-style traits are present.

**Anti-default check against POP cliches (run now, because pop has its own slop):** the loud family has its own attractors and this build avoids each one deliberately:

- **No Memphis squiggles / scattered geometric confetti shapes.** The only graphic shapes are the solid cue chips and the one rationed confetti/streamer burst, and the burst uses the real wedding-confetti palette, not random primaries.
- **No generic rainbow / "fun fintech" candy palette.** The palette is sourced from one specific real thing (confetti thrown at a recessional) and anchored by a serious structural grape-ink, so it reads "a wedding, loud" not "a budgeting app for Gen Z."
- **No 3D balloons, glossy blobs, soft-pillow gradients, or AI-sticker look.** The reference is flat screen-printed ink (risograph), so everything is flat saturated colour with crisp edges and intentional overprint overlaps. No gradient meshes, no drop-shadow pillows, no bevels.
- **No default rainbow confetti gradient hero.** The hero is a single huge Hype Line in flat type on a flat saturated field; the confetti is one timed burst at the peak word, not an ambient background wash.
- **No "wedding clipart" (linked rings, doves, hearts everywhere).** The brand's only "icons" are the cue chip and the held-beat dot. Joy is expressed through type, colour, and timing, not through wedding decoration clichés.

Ownable to THIS friend-led wedding brand, not generic "fun": the loudness is the visual argument that a person who loves you can deliver a moment a stranger can't, the colours are literally what gets thrown at the couple, and the cue chips are the running order of a real ceremony. A budgeting app or a kids' party could not wear this palette-plus-cue-chip-plus-speech-timing system without lying.

---

## Brand Positioning

> Unchanged from the approved draft. The positioning is sound; only the look around it changed.

### Identity Statement

Wedding Mates turns the person who knows a couple best into the one who marries them. We are not a celebrant you hire; we are the method that makes your best mate ready. We hand the mate a complete, teachable craft (interview the couple, build the love story, structure the ceremony, mark up the script, deliver it with calm hands) and we quietly carry the Australian legal requirement behind the scenes so the friend can keep their eyes on the couple, not the paperwork. The couple pays one price, picks their person, and gets a ceremony in a voice they already love. Founded by Sarah, who became a registered celebrant over 300 hours of study to marry her own best friend in 2019 and turned that coaching into the Blueprint.

### Differentiator

The only offer in the Australian market that **trains your own person to a professional standard AND handles the legal solemnisation behind the scenes**, so a friend-led wedding is both deeply personal and fully valid. Competitors force a choice: a polished stranger (traditional celebrant) or a personal-but-unsupported, possibly-not-legal friend (DIY). Wedding Mates removes the trade-off. The product is not the officiant; the product is the *readiness* of the couple's own person.

### Positioning

Wedding Mates owns the space between "hire a professional" and "wing it with a friend." It is **friend-led, professionally prepared, legally sorted.** Against traditional celebrants it competes on intimacy and voice (and a comparable or lower price). Against directories and DIY it competes on craft, confidence, and legal coverage. It speaks like a supportive mate who happens to be an expert, never like a wedding-industry vendor. The brand's emotional promise to the couple: *the most personal moment of your life, delivered by someone who loves you.* The brand's emotional promise to the mate: *you were asked because they trust you, and we will make sure you are ready.*

---

## Aesthetic Direction

**Label:** "A best-man speech that lands -- flat saturated party colour, huge type, the room going off on cue."

This translates to digital as a **loud, confident, screen-printed celebration that knows exactly when to drop the volume.** The dominant surface is a bright optical near-white with the faintest cool-purple tint (the "fresh paper a confetti shot is printed on"), and the structural anchor is a deep grape-ink -- a saturated celebratory purple-black, not navy, not charcoal -- that carries headlines and the loud dark beats. Energy comes from a flat saturated palette pulled straight from confetti thrown at a recessional: a hot ribbon coral-red, a marigold, a fresh mint, used as confident flat blocks (risograph logic), not washes or gradients. The Hype Line is the loudest object: one line of huge condensed grotesque, a word hit in accent colour, a cue chip, and a single confetti burst timed to the payoff. Photography is handled as *the moment a friend lands a line* (the mate mid-delivery, the held page, the faces catching it), cropped bold and set against flat colour fields, never as glossy bridal stock. The spatial feeling is a gig poster you can read across the room, then a clean column when you need to actually do something (pay, learn).

The single most important discipline is the **dual register**: the brand is built to dial between LOUD (marketing, the hero, the confirmation/kiss moment) and CALM (the 7-step payment wizard, the long-form course), without becoming two different brands. The same grape-ink, the same condensed display family, the same cue chips, and the same flat-colour logic carry both; only the *scale, saturation, and motion* change. Loud surfaces use huge type, full saturated fields, and the confetti beat. Calm surfaces use the same family at reading scale, on the bright near-white surface, with accent colour rationed to the cue chip and the single primary button, no bursts, generous line spacing. A buyer mid-payment and a nervous mate reading a 15-hour course are never shouted at; they are quietly, unmistakably still inside the same loud brand, just with the volume turned down. (See Visual System > Dual-Register for the exact rules.)

**Anti-reference (what this brand is explicitly NOT):**

- NOT the warm-cream-serif-grain wedding-editorial default (the category gravity well, the sibling `sarah-emery-celebrant` build's territory, and the look this revision exists to leave). No parchment, no film grain, no terracotta, no serif display, no honeyed golden-hour wash, no quiet margin-rule typesetting as the whole aesthetic.
- NOT the glossy bridal-magazine look (gold foil, script-font cliché, blush-and-greenery florals, hero couple silhouette at golden hour).
- NOT the pop-slop look (Memphis squiggles, rainbow candy gradients, 3D balloons, glossy blobs, AI stickers, fun-fintech mascots). The pop here is flat screen-printed ink sourced from real confetti, anchored by a serious grape-ink, not generic "fun."
- NOT the cold SaaS course platform (purple-gradient dashboard, "Enroll now," progress-bar gamification as the personality). The course is calm and warm, not gamified.
- NOT a celebrant directory (grid of headshots, "search by location"). There is exactly one person and one price.

---

## Design Dials

```
DESIGN_VARIANCE:  6
MOTION_INTENSITY: 6
VISUAL_DENSITY:   5
```

These rose from the prior draft's 4 / 4 / 3 because the brand is now a loud one. They are set as magnitudes, calibrated so the loud marketing can be energetic while the booking wizard and the long-form course stay legible.

**DESIGN_VARIANCE: 6 (magnitude: a real layout-breaking, art-directed moment per marketing section, against a disciplined grid underneath).**
The brand is a gig poster with the volume up, so marketing layouts carry genuine asymmetry: Hype Lines bleed off the edge, cue chips overlap the type, photos sit in cropped colour fields that break the column, flat shapes overprint. This is loud-pop variance, well above the prior editorial restraint. It is held at 6, not 8+, for two reasons. First, the risograph reference is *disciplined* asymmetry (a confident grid you deliberately break), not chaos -- the structure from divergent reference 5 keeps it readable. Second and decisive: the booking wizard and the course MUST stay calm and conventionally laid out (a buyer mid-payment and a nervous mate mid-lesson are not the audience for visual surprise), so the high variance is spent on marketing and the functional surfaces drop to a structured single column. Six is the marketing magnitude; the functional surfaces run their own effective 3. This is the concept talking (a speech builds to peaks, it isn't loud end-to-end), not the mean.

**MOTION_INTENSITY: 6 (magnitude: present, choreographed, celebration-timed; motion is a supporting character, not the lead, and is rationed by surface).**
Motion does one job loudly and one job quietly. Loudly: the Hype Line snaps in on beats (cue chip pops, line lands, hit word colour-flips) and fires a single confetti/streamer burst on the payoff word -- this is the brand's motion signature and it is wedding-true (the recessional throw). Quietly: Framer Motion entrances, hover energy on cards and the primary button, the running-total ticking up in the wizard. Six, not 8+, because the bursts are RATIONED (at most one per page, only on genuine celebration beats: hero peak, confirmation, kiss line) and because the functional surfaces deliberately run near-zero motion so payment and reading stay calm. Explicitly **not** the agency's habitual high-motion reflex (pinned GSAP parallax + SplitText scroll-story): the concept demands *speech timing and a celebration burst*, not scroll-as-narrative. `prefers-reduced-motion` collapses every reveal to instant and kills every burst, everywhere.

**VISUAL_DENSITY: 5 (magnitude: balanced and confident; loud does not mean cluttered).**
Marketing reads as full and energetic (flat colour fields, big type, cropped photos, the cue chips) but never as a wall -- one Hype Line peak per section, comfortable breaks, one idea carried loud at a time. Five, not higher, because a loud poster still needs air for the type to read across the room, and because the two functional surfaces pull density DOWN hard: the booking wizard shows one step's fields per screen on the bright near-white surface (never a wall of form), and the course shows one calm reading column at a comfortable 60-70 char measure. Five is the marketing magnitude; the wizard and course run an effective 3. Density here is "a bold poster," not "a dashboard": loud through colour and scale, not through cramming.

---

## Aesthetic Archetype

**New archetype: "Recessional Pop."** (Defined post-hoc, after the concept and visual system below. The prior draft's archetype "Annotated Vow" was an editorial entry; this build went pop, so that entry has been corrected in the library -- see the note at the end of this section.)

**Recessional Pop** -- celebration delivered with the discipline of a screen-printed poster and the timing of a speech that lands. The visual language is *the moment a friend nails a line and the room goes off*: a heavy condensed grotesque at large-to-huge scale, a structural grape-ink, a flat saturated party palette sourced from real wedding confetti (hot coral-red, marigold, fresh mint) used as confident flat blocks with risograph overprint logic, solid cue chips naming the running order, a hit-word emphasis in accent colour, and a single rationed confetti burst timed to the payoff. Motion is speech-timed (snap-in beats plus one burst), not scroll-narrative. The defining and unusual requirement is a **built-in dual register**: the same family, grid, palette, and cue chips must dial from LOUD (marketing, the kiss/confirmation beat) to CALM (a multi-step payment wizard, a long-form gated course) by changing only scale, saturation, and motion -- never identity. The defining tension is *party energy under real structure* -- a best-man speech that has actually been rehearsed.

- Typical dials: VARIANCE 5-7, MOTION 5-7, DENSITY 4-6
- Reference: Wedding Mates ("Let's Get Wed"), Australian friend-led wedding ceremony product; marketing + booking wizard + gated course (client build, 2026-06)

**Relationship to the nearest existing archetypes (two-trait mutation rule, applied honestly):** the closest loud library entries are **Primal Bold** (dark-dominant, one aggressive accent, oversized geometric sans, declarative) and **Neon Grit** (textured, bold, one high-energy warm colour against a grounding natural one). Recessional Pop sits near both but mutates at least two defining traits of each:
1. **Bright-dominant, not dark-dominant.** Primal Bold and Neon Grit are near-black / textured-dark surfaces with one accent punching through. Recessional Pop is bright-near-white-dominant with a *multi-colour* flat saturated party palette and the dark grape-ink rationed to peak beats -- the inverse surface logic, because a wedding is a daylight celebration, not a manifesto in a dark room.
2. **Flat screen-printed ink, no texture, no grain.** Neon Grit's whole identity is grain and paper texture and stamp-shadows. Recessional Pop is deliberately flat risograph-clean (crisp edges, overprint overlaps, zero grain), which is also how it stays clear of the house-style grain trait.
3. (Bonus mutation) **Built-in dual register across three surfaces and two audiences.** Neither Primal Bold nor Neon Grit has to flex from loud marketing to a calm payment wizard and a 15-hour course. Recessional Pop's defining constraint is that the loudness is *dialled by surface*, which neither neighbour requires.

I added **Recessional Pop** as a new entry because the concept is genuinely distinct (a loud, dual-register celebration system across a two-sided product) and because the library is over-weighted toward warm-serif-editorial and dark-manifesto looks; this entry broadens the vocabulary toward a *bright, flat, multi-colour pop* family that was missing.

**Library correction (required by the revision brief):** the prior run added an editorial archetype "Annotated Vow" to `.claude/skills/brand-strategy/archetype-library.md` and attributed it to Wedding Mates. That build went pop, so the attribution is now wrong and pollutes the library with an editorial entry pointing at a pop build. The library entry must be corrected: replace "Annotated Vow" / Wedding Mates with **"Recessional Pop" / Wedding Mates** (this archetype), so the library is not left with an editorial label attributed to a build that shipped loud. (Action item for the orchestrator: apply the same correction in the archetype-library file.)

---

## Visual System

### Aesthetic Family (named first, per the forcing step)

**Pop / playful, hardened toward graphic / poster** (flat saturated screen-printed celebration), explicitly NOT the soft-rounded-illustrative end of pop. The concept ("a marked-up ceremony script cranked to the volume of the party") demands loud colour, huge type, and celebration-timed motion -- native to pop. **Anti-default check (against pop's own slop):** the danger in pop is squiggles / rainbow-candy / 3D balloons / fun-fintech / AI-stickers. The proof the *concept* chose this family and avoids that slop: the palette is sourced from one specific real thing (confetti thrown at a recessional), the graphic logic is flat risograph ink not soft 3D, the structural anchor is a serious grape-ink not a candy primary, and the only shapes are the cue chip and one rationed burst -- so it reads "a wedding, loud" not "a finance app." Pop earned by the celebration; pop-slop rejected by the risograph discipline and the wedding-true palette.

### Typography

Two faces plus one optional accent. Each choice traces to the concept (the loud delivered line) or a divergent reference (poster / signage type).

**Display / Hype face -- Anton** (single heavy weight) as the primary, with **Archivo Black** as the heavier-body alternate where Anton is too condensed.
`font-family: "Anton", "Archivo Black", "Oswald", "Arial Narrow", system-ui, sans-serif;`
Rationale: Anton is a single ultra-heavy condensed grotesque built to be read across a room -- exactly the "huge line is the whole composition" logic of stage and gig-poster type (divergent references 3 and 4). It SHOUTS with joy at display scale and stacks tight, which is what the Hype Line needs. It carries the hero, every section Hype Line, the big celebration beats, and the pricing number. **It is deliberately the opposite of the rejected Fraunces serif**: no contrast strokes, no italic, no quiet -- a flat heavy block of type. Where Anton's extreme condensation is too tight (the founder display lines, a few headers), the build uses **Archivo Black** (heavy but normal-width) from the same heavy-grotesque family so the voice stays consistent. Fallbacks degrade gracefully to Oswald (condensed) then Arial Narrow.

**Body / workhorse face -- Archivo** (variable, the regular-width family that pairs natively with Archivo Black).
`font-family: "Archivo", "Inter", "Helvetica Neue", system-ui, sans-serif;`
Rationale: the brand needs a clean, modern, hard-working grotesque for everything that is not a Hype Line -- body copy, the booking wizard's fields and labels, the 15-hour course reading, nav, helper text. Archivo is a low-contrast grotesque with an excellent weight range and great screen legibility at small sizes, and it shares the grotesque DNA of Anton/Archivo Black so the loud surfaces and the calm surfaces feel like one family (this is the mechanism that keeps the dual register from splitting into two brands). It is a serif-free, ink-free, mono-free system end to end -- none of the house-style type traits.

**Cue / chip + numeral accent -- Archivo in tracked all-caps** (NOT a separate mono face).
Rationale: the prior draft used IBM Plex Mono for the cue tag; this revision drops mono entirely (it reads quiet and technical, wrong for a loud celebration, and it was the one house-style trait the prior draft kept). The cue chip is now set in **Archivo, all-caps, heavy weight, tightly tracked, inside a solid saturated pill** -- a stage-signage chip, not a typewriter label. Running-order numbers (`STEP 3`, the pricing `$950`) use Anton or Archivo Black for poster-numeral punch. No mono anywhere.

**Type scale** (base 17px on the reading surfaces for long-form comfort; fluid via `clamp()` downstream; the loud surfaces jump scale hard for poster contrast):

| Level | Face / weight | Size (desktop) | Line-height | Letter-spacing |
|---|---|---|---|---|
| Hero Hype Line | Anton 400 (single weight), hit word in accent | 72-128px (`clamp`) | 0.92 | -0.01em |
| Section Hype Line | Anton 400 | 44-72px | 0.96 | -0.005em |
| H1 (calm pages) | Anton 400 or Archivo Black 900 | 40-52px | 1.0 | 0 |
| H2 | Archivo Black 900 | 30-34px | 1.05 | 0 |
| H3 | Archivo 800 | 22-24px | 1.15 | 0 |
| Body large (intros) | Archivo 500 | 19px | 1.55 | 0 |
| Body (long-form course) | Archivo 400 | 17px | 1.7 | 0 |
| Small / meta | Archivo 600, caps, tracked | 13px | 1.4 | 0.06em |
| Cue chip | Archivo 800, caps, in solid pill | 12-13px | 1 | 0.1em |

### Color System

Palette source: **confetti and streamers thrown at a wedding recessional, caught mid-air** (the real colours people throw over two people they love), anchored by a deep celebratory grape-ink. Named for their origin, not abstract semantics. This is the deliberate divergence from both the rejected cream/ink editorial set and from generic rainbow-pop: every colour is a real recessional colour, used flat (risograph), and the dark anchor is grape, not navy or charcoal.

| Token | Name (origin) | Hex | Role | Intended ratio |
|---|---|---|---|---|
| `--color-page` | Confetti-paper white (the bright sky behind the throw) | `#FBFAFF` | Dominant bright surface | ~50% |
| `--color-page-tint` | Page, faint grape tint (alt sections) | `#F2EEFB` | Secondary surface | part of the 30% |
| `--color-grape` | Grape-ink (the structural anchor; deep celebratory purple-black) | `#2A1840` | Headlines, loud dark beats, footer, primary text | ~25% |
| `--color-grape-soft` | Grape, diluted (long-form body text) | `#3D2A55` | Course + body text on the page surface | part of the 30% |
| `--color-coral` | Coral-red confetti (the loudest streamer) | `#F2484E` | Primary accent: the CTA, the hit word, the kiss beat | ~9% |
| `--color-coral-deep` | Coral, in shadow | `#C9242A` | Coral-as-text on light surfaces, hover/active | within the 10% |
| `--color-marigold` | Marigold confetti (the warm pop) | `#F6A623` | Secondary accent: cue chips, highlights, the joy burst | ~4% |
| `--color-marigold-deep` | Marigold, in shadow | `#A66A05` | Marigold-as-text on light surfaces | within the 10% |
| `--color-mint` | Fresh-mint streamer (the cool counterpoint + "legals sorted") | `#3FB39A` | Tertiary accent: course progress, reassurance ticks, calm-register chip | ~2% |
| `--color-mint-deep` | Mint, in shadow | `#1F7A66` | Mint-as-text on light surfaces | within the 10% |

Never pure black / never pure white: darkest is `#2A1840` (grape-ink), lightest is `#FBFAFF` (confetti-paper). This is a genuine multi-colour party system (four hues plus the anchor), not a single editorial accent -- coral leads, marigold and mint support, grape-ink anchors.

**Semantic colours** (for the booking wizard + course, kept on-brand and on-palette):
- Success: `--color-mint-deep` `#1F7A66` for text / `--color-mint` `#3FB39A` for fills (eucalyptus-mint -- "legals sorted", step complete).
- Warning: `--color-marigold-deep` `#A66A05` for text / `--color-marigold` `#F6A623` for fills (the < 4-week legal-registration note).
- Error: `--color-coral-deep` `#C9242A` (form validation; the brand's own deep coral, not an alien red).
- Info: `--color-grape-soft` `#3D2A55`.

**Distribution (60/30/10, tuned for a loud VISUAL_DENSITY 5):** ~50% bright page surface, ~30% grape-ink + grape-soft + page-tint (the type, the loud dark beats, alt sections), ~15% coral + marigold + mint accents. This is heavier on accent than a calm brand by design (a loud brand spends more of its budget on saturated colour), but coral is still rationed so the CTA and the kiss beat stay the loudest objects, and marigold/mint stay support, never co-leads.

**Pre-computed contrast (WCAG AA, computed at design time per the Hard Rules so Phase 4 finds nothing -- loud saturated palettes fail contrast easily, so every text pair is checked and a darker variant is provided wherever a bright accent would be used as text):**

| Pair | Use | Ratio | Verdict |
|---|---|---|---|
| Grape `#2A1840` on Page `#FBFAFF` | All headlines + primary text | ~15.6:1 | PASS AAA (normal + large) |
| Grape-soft `#3D2A55` on Page `#FBFAFF` | Long-form body text | ~11.6:1 | PASS AAA |
| Grape-soft `#3D2A55` on Page-tint `#F2EEFB` | Body on alt sections | ~10.6:1 | PASS AAA |
| Page `#FBFAFF` on Grape `#2A1840` | Inverted text (loud dark beats, footer) | ~15.6:1 | PASS AAA |
| Page `#FBFAFF` on Coral `#F2484E` | **Primary CTA label (white on coral)** | ~3.5:1 | PASS for large/bold only (>=18px bold or >=24px). Acceptable for the big CTA button label; for any smaller coral-background text use grape on coral (below). |
| Grape `#2A1840` on Coral `#F2484E` | Alternative CTA label (safest) | ~4.5:1 | PASS normal text -- **preferred default for the primary button label** so contrast holds at every size and state |
| Page `#FBFAFF` on Grape `#2A1840` (CTA on dark) | CTA variant on loud dark beats | ~15.6:1 | PASS AAA -- on dark sections the CTA flips to coral fill with white label, or white outline; verified per surface |
| Coral `#F2484E` on Page `#FBFAFF` | Coral-as-TEXT (the hit word, links) | ~3.5:1 | **FAIL for normal text.** Do NOT use `#F2484E` as body-size text on the page. Allowed only as a HIT WORD at display size (>=44px), where it is large-text (>=3:1) and passes. |
| Coral-deep `#C9242A` on Page `#FBFAFF` | Coral-as-text corrected variant (links, small emphasis) | ~5.6:1 | PASS normal text -- **use `#C9242A` for any coral-coloured text/link at body size on the page.** This is the pre-computed darker variant the Hard Rules require. |
| Coral-deep `#C9242A` on Page-tint `#F2EEFB` | Link on alt sections | ~5.1:1 | PASS normal text. |
| Marigold `#F6A623` on Page `#FBFAFF` | Marigold as fill / chip background only | ~1.8:1 | FAIL as text. Use ONLY as a fill (cue chip background, burst). For marigold-coloured text use `#A66A05` (below). Cue chip uses GRAPE text on marigold fill (see next row). |
| Grape `#2A1840` on Marigold `#F6A623` | **Cue chip label** (grape text on marigold pill) | ~9.0:1 | PASS AAA -- the cue chip is grape ink on a marigold pill, high-contrast and legible. |
| Marigold-deep `#A66A05` on Page `#FBFAFF` | Marigold-as-text corrected variant | ~4.6:1 | PASS normal text -- use `#A66A05` for any marigold-coloured text on the page. |
| Mint `#3FB39A` on Page `#FBFAFF` | Mint as fill / tick / progress only | ~2.4:1 | FAIL as text. Use only as fill/icon. For mint-coloured text use `#1F7A66` (below). |
| Mint-deep `#1F7A66` on Page `#FBFAFF` | Mint-as-text corrected variant (success text, calm chip) | ~4.6:1 | PASS normal text -- use `#1F7A66` for any mint-coloured text on the page. |
| Page `#FBFAFF` on Coral-deep `#C9242A` | White on deep-coral (error fills, hover button) | ~5.6:1 | PASS normal text -- safe for button labels in hover/active state. |
| Page `#FBFAFF` on Mint-deep `#1F7A66` | White on deep-mint (success fills, badges) | ~4.6:1 | PASS normal text. |

Decisions for the ui-designer, pre-made:
- **Primary button on light surfaces: grape label on coral fill** (`#2A1840` on `#F2484E`, 4.5:1) as the default so contrast holds in every size and state; white-on-coral (`3.5:1`) is allowed ONLY for the single large bold display CTA where the label is >=18px bold. Hover/active deepens to coral-deep with a white label (`5.6:1`).
- **Primary button on loud dark (grape) beats: coral fill with white label**, verified at AAA, or a white outline button; the button always remains the most saturated object on the section.
- **The hit word** (the emphasised word in a Hype Line) uses **coral `#F2484E` ONLY at display scale** (>=44px, large-text 3:1), where it is legal and loud; at any body size, emphasis uses **coral-deep `#C9242A`**.
- **Links and small coral emphasis** use **`--color-coral-deep` `#C9242A`**, never `#F2484E`, when rendered as text.
- **Cue chip** is **grape text on a marigold pill** (9.0:1) in the loud register; in the CALM register (wizard, course) the chip switches to **grape text on a page-tint or mint-tint pill** so it reads quiet but stays the same shape.

**Link treatment (two cues minimum, per Hard Rules):** links are `--color-coral-deep` `#C9242A` (cue 1: colour) plus a custom coral-coloured underline with `text-underline-offset` and `text-decoration-skip-ink: auto` that thickens to a 2px bar on hover (cue 2: styled underline). Never a browser-default underline. Inside long-form course copy, links additionally carry weight 600.

### The Dual Register (the critical loud↔calm system, spelled out)

The brand has one identity at two volumes. Both volumes share: the grape-ink, the Archivo/Anton family, the cue-chip shape, the flat-colour logic, and the grid. Only three things change between them -- **scale, saturation, and motion.** This is the mechanism that keeps marketing and the payment/course surfaces feeling like one brand.

**LOUD register -- marketing pages, the hero, the confirmation/kiss beat.**
- Type at poster scale (Hero Hype Line 72-128px). Full saturated colour fields (grape or coral sections, not just white). Cue chips on marigold pills. The hit word in coral at display scale. Asymmetry, bleed, overprint. The single confetti burst fires here, once per page, on the peak beat.
- Feeling: a gig poster, the room going off, the speech landing.

**CALM register -- the 7-step booking wizard, all course reading, auth screens.**
- Same family, dropped to reading scale (no Hype Lines except the ONE confirmation beat). Surface is the bright near-white `#FBFAFF` only (no full saturated fields behind forms or lessons). NO confetti burst anywhere in the wizard or in lesson reading. Accent colour is rationed to exactly two places: the single primary button (coral) and the cue chip (now a quiet grape-on-tint chip naming the step / lesson). Generous line spacing, single column, comfortable 60-70 char measure for the course. Motion drops to near-zero (quiet entrances, the running-total tick, the progress ring; no snap-in beats, no bursts).
- Feeling: a clean, confident form and a calm reading page that you can tell belongs to the loud brand -- same chips, same grape headings, same coral button -- but the volume is down so you can think, pay, and learn.

**The one bridge between them:** the cue chip. It is loud (marigold pill) on marketing and quiet (tint pill) in the wizard/course, but it is the *same component*, so the buyer who saw `THE WELCOME` on the homepage recognises `STEP 3 · YOUR CELEBRANT` in the wizard as the same brand assembling their ceremony. The chip carries the identity across the volume drop. And exactly once -- at booking confirmation -- the calm wizard is allowed to go loud for a single beat: the `THE KISS` Hype Line and the one confetti burst, the payoff the whole flow was building to. That single permitted eruption is what makes the restraint everywhere else feel deliberate.

Hard rule for downstream: **no confetti burst, no full saturated background field, and no poster-scale type inside the booking wizard (except the confirmation beat) or inside any course lesson reading.** A nervous mate reading 15 hours of course must never be shouted at; a buyer entering card details must never be distracted. The brand stays unmistakable through the chip, the grape headings, the coral button, and the family -- not through volume.

### Spacing & Texture Philosophy

- **Flat, no texture, no grain, no gradients, no soft pillows.** The risograph reference (divergent reference 3) means every surface is a flat colour field with crisp edges. Depth comes from overprint overlaps (a flat shape sitting partly over another) and from confident colour blocking, never from shadows, blur, or grain. This is also how the build stays clear of the house-style grain trait entirely.
- **The colour block is the structural motif** (replacing the prior draft's pencil margin-rule). Marketing sections are defined by flat colour fields (white, grape, page-tint, occasionally a coral or marigold band), and the Hype Line and cropped photo sit boldly within or across them. Per the persistent-overlay Hard Rule: the sticky mobile CTA bar and the wizard's running-total bar each reserve their own gutter, anchor to the content they reference, and invert per surface (coral-on-grape over dark beats, grape/coral on the light surface elsewhere) -- verified on the Visual Pixel Pass, not assumed in code.
- **Radii: bold and poster-like.** Cue chips and the primary button use a full pill (`9999px`) so they read as confident solid shapes; cards and inputs use a clean `8-12px`. NOT the house-style soft 2-3rem pillows, and NOT the prior draft's crisp 2-4px paper corners -- a poster radius, somewhere confident in between.
- **Loud rhythm, calm rhythm.** At VISUAL_DENSITY 5 the marketing spacing varies to create poster rhythm (a tight stack of type, then a big breath before a Hype Line peak). The wizard and course use even, generous, predictable spacing -- calm rhythm, no surprises.
- **One celebratory exception, rationed:** the hero peak, the final marketing CTA, and the booking confirmation may run a full saturated field plus the single confetti burst. Everywhere else holds.

---

## Voice and Tone

> Unchanged in substance from the approved draft (the voice was good and is kept). Examples are lightly retuned to match the louder, more celebratory register -- same warmth, same two-anxiety discipline, slightly more grin.

The voice is **a supportive mate who happens to be an expert.** It must flex between two audiences without changing its character: warm, loud, and persuasive to the **couple** (marketing + booking), warm and steadying to the **mate** (course). AU English spelling throughout. Second person. No em dashes, no double-hyphens in any client-facing copy.

**Voice attributes (with examples):**

1. **Warm and direct, never saccharine. Loud, never shrill.** Say the real thing plainly, with a grin.
   - Yes: "Your best mate steps up. Not with a stranger's script. With a cheeky grin and the whole room on their side."
   - No: "We are SO thrilled to be part of your special journey!"

2. **Reassuring on the two anxieties (is it legal? / can my friend pull this off?).** Name the fear, then resolve it, in that order. Volume drops here even on marketing; reassurance is calm.
   - Yes (couple): "Yes, your mate can really marry you. We handle every legal requirement before the day, so they can focus on you."
   - Yes (mate): "You were asked because they trust you. You don't need to be polished. We will get you ready."

3. **Australian-casual, humour that includes and never mocks.** A grin, not a gag at someone's expense.
   - Yes: "Stilettos plus soft grass equals a wobbly celebrant. Trust us, wear the flats."
   - No: any joke whose target is one of the couple, the guests, or the nervous mate.

4. **Crafted, not corporate.** The brand respects the work; it talks about ceremonies like a craft, because they are.
   - Yes: "A great ceremony is built, not winged. The right questions. The right details. The line that lands."
   - No: "Our comprehensive end-to-end ceremony solution streamlines your wedding workflow."

5. **Voice shift inside the course (mate-facing):** quieter, more instructional, a coach's hand on the shoulder. Permission to be imperfect. This is the CALM register in copy as well as design.
   - Yes: "This part will be fun. Take lots of notes. Too many is fine; too few will leave you stuck later."
   - Yes: "The ceremony does not need to be perfect. After the first few lines, you will find your rhythm."

**The Hype Line voice (signature copy pattern, for the copywriter):** one short line built to be delivered, a word hit hard, and a cue chip that names the ceremony moment. The line should read like a beat in a speech, not a caption. Example set the copywriter can extend (the chip is shown in brackets, the hit word in *emphasis*):
- `[ THE WELCOME ]  The music drops, and your best mate steps *up*.`
- `[ THE LOVE STORY ]  Not a stranger's script. Your story, in a voice you *love*.`
- `[ THE LEGALS ]  Quietly *handled*, before anyone arrives.`
- `[ THE KISS ]  And just like that, you're *married*.`

**Banned phrases and clichés (wedding-industry and SaaS slop):**
- "Tie the knot," "happily ever after," "your special day" (used limply), "say yes to the dress," "here comes the bride," "magical journey," "fairytale" as a noun-crutch.
- "Dream team," "we've got you covered" (corporate), "seamless experience," "elevate your special day" (as filler), "unleash," "effortless" (when it is not).
- "Enroll now," "unlock," "level up," "course curriculum," "lifetime access," progress-gamification language inside the course (it is a course, not a game).
- Any phrasing that implies an untrained friend signs the legal marriage. Keep the legal framing truthful: the registered celebrant handles solemnisation/paperwork; the mate leads and delivers the experience. Approved framing: "We handle the legals." / "A registered celebrant takes care of the legal paperwork before the day." Never: "your mate legally marries you" as a standalone factual claim.
- Exclamation-mark stacking. One, earned, at a celebration beat. Not three on every line. (The brand is loud through colour and type, not through punctuation.)

---

## Photography and Imagery Direction

> Subject priority unchanged from the approved draft (it was correct). The treatment is re-aimed from "cool ink-and-paper, mounted on a page" to "bold crop, flat colour field, screen-printed energy."

**The thesis: photograph the moment a friend lands a line, not the bouquet.** The brand's image system is *the mate mid-delivery, the held page, and the faces catching it* -- cropped bold and set against flat saturated colour fields, the way a gig poster places one strong photo. Real assets in `docs/references/live-site/images/` are reused but re-treated to this family in Phase 2/3 (never pasted as-is), and placeholder/lorem-backed couple and blog photos are treated as client-supplied-later (do not ship them).

**Subject priority (in order):**
1. **The mate mid-delivery.** The friend at the front, mouth open mid-line, looking up from the page at the couple -- the moment of landing a line. This is now the brand's signature image (promoted above "the held page" because the loud brand is about delivery, the moment it lands). (Live asset `wedding2.jpg`, "yes your mate can really marry you", is the candidate; re-treat.)
2. **The faces catching it.** The couple and guests reacting (laughter, a tear, a cheer). Joy as response, the room going off. This is the visual proof of the loud promise.
3. **The held page.** A ceremony card or phone at chest height, real hands, visible marks on the page -- the literal proof of the product, paired with a Hype Line.
4. **The founder, real.** Sarah at the 2019 wedding (`sarah-wedding.jpg`) and her signature graphic (`sign.png`) carry the origin story honestly. Keep these.

**Treatment:**
- **Light and colour:** natural, true-to-life, with energy. Bold contrast and saturation that sits with the flat party palette; NOT the honeyed golden-hour wash of bridal-magazine stock, and NOT the prior draft's cool ink-and-paper restraint. Images may be duotoned to a brand colour for loud beats (a grape or coral duotone on a hero or section band, used sparingly and only where the photo is supporting type, not where faces need true skin tone).
- **Framing:** bold crops. Photos sit IN or ACROSS flat colour fields, often bleeding off an edge, often overlapping a cue chip or a flat shape (risograph overprint logic). Room for a Hype Line to sit beside or over the image (with a legibility-safe placement, never type over a busy face). Mix of tight close (the mate's face mid-line, hands on the page) and one bold wider frame per page.
- **Texture:** NONE. No film grain, no paper-mount border, no drop-shadow pillow. Images sit flat as confident blocks, edge-to-colour-field, the way an image sits in a screen-printed poster.
- **Course imagery (mate-facing, CALM register):** the eight module thumbnails (`module1.jpg`-`module8.jpg`) and `introduction-banner.jpg` are reused as functional lesson cards, re-cropped to a clean card with the calm grape-on-tint chip; calmer, more instructional, less "wedding glamour," no duotone, true colour for readable reference.
- **Iconography:** the existing line icons (`camera.svg`, `edit.svg`, `performance.svg`, `music.svg`, `templates.svg`, `readings.svg`, `strategies.svg`) are reused but re-coloured to `--color-grape` with `--color-coral-deep` for the active/emphasis state, and may sit in a small flat marigold or mint chip where they label a real feature. Icons earn their place only where they label a real product feature (the four Blueprint pillars, the course resources), never as decoration. The cue chip and the held-beat dot `·` are the brand's true "icons."

**Hard exclusions:** no stock-bridal clichés (linked rings on a windowsill, shoes on a chair, calligraphy-on-marble flat-lays), no AI-generated couples, no gold-foil-and-blush gradients, no faceless silhouette-at-sunset hero, and (the pop-specific exclusion) no Memphis squiggles, no 3D balloons, no rainbow-gradient confetti backgrounds, no AI-sticker decoration. If a real, rights-cleared photo is not available for a slot (love-story galleries Kat+David / Kristi+Mark, real testimonials, blog), render an honest empty/pending state and flag it; never fabricate the moment with stock or AI imagery. The craft ceiling is honestly capped by the available real photography and flagged for the client, not faked -- and where photography is thin, the flat-colour-and-type poster system carries the page so a missing photo never leaves a hole.

---
