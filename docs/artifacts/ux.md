# UX
**Phase:** 1
**Agent:** ux-architect
**Date:** 2026-06-21
**Status:** draft

---

This product is a funnel with a fulfilment system bolted to its end. There are two users (the **couple**, who buys, and the **mate**, who learns) and four surfaces (public marketing, auth, the 7-step booking portal, and the gated course). The marketing site has exactly one job: drive the couple into the booking portal and complete the $950 booking. The course exists to serve the mate after the sale. Auth is the bridge. Every architectural decision below resolves to that single primary action: **complete the $950 booking.**

The primary conversion is reachable in 2 clicks or fewer from every public page (a persistent "Book Now" lives in the header and as a sticky mobile bar). The booking portal itself is treated as a first-class conversion flow, not a checkout afterthought, because it is where the money is made and where drop-off is most expensive.

---

## Page Inventory

Lean by design. Every route below has real content to fill it, or is a functional surface required by the product. Content gaps flagged in the dossier (FAQ answers, blog posts, reviews, T&C, the 9 videos, 2 missing downloads) are noted; routes that depend entirely on missing content are marked CONDITIONAL and gated behind client supply rather than padded with filler.

### Surface A: Public Marketing

| Route | Purpose | Primary action |
|---|---|---|
| `/` (Home) | The full sales narrative: hook, problem/reframe, 4-step process, legality reassurance, the Blueprint, pricing, founder story, proof, FAQ. | Book Now (start the $950 booking) |
| `/how-it-works` | Deep-dive on the 4-step model and the couple-plus-mate relationship for researchers who need more than the home scroll. | Book Now |
| `/pricing` | Standalone pricing: the $950 package contents + the 4 optional extras, plainly. The decision page. | Book Now |
| `/faq` | Answer the two anxieties (is it legal / can my friend do it) plus logistics. CONDITIONAL on client-supplied Q&A. | Book Now |
| `/reviews` | Real testimonials + featured love stories (Kat+David, Kristi+Mark). CONDITIONAL on client rights + content. | Book Now |
| `/blog` | Wedding inspiration index. CONDITIONAL on real posts (live site is lorem ipsum). | Read a story (secondary), Book Now (persistent) |
| `/blog/[slug]` | Individual inspiration story. CONDITIONAL. | Book Now |
| `/about` | Sarah's founder story at full length, the credibility + 300-hours + 2019-wedding origin. Second-most-visited page; treated with respect. | Book Now |
| `/contact` | Capture qualified-but-not-ready couples. Form + email + WhatsApp. | Send message / Book Now |
| `/terms` | Terms & Conditions + refund policy. CONDITIONAL on client-supplied legal copy. | (none; legal reference) |
| `/privacy` | AU Privacy Act notice for booking PII. Hosted via Vonzie Nexus post-launch; placeholder route present. | (none; legal reference) |

### Surface B: Auth

| Route | Purpose | Primary action |
|---|---|---|
| `/login` | Mate (and couple) sign in to the course. | Sign in |
| `/register` | Account creation. Primarily auto-provisioned at booking; manual path for the mate invited by the couple. | Create account |
| `/forgot-password` | Request a reset link. | Send reset link |
| `/reset-password` | Set a new password from the emailed token. | Save password |

### Surface C: Booking Portal (net-new, the conversion engine)

| Route | Purpose | Primary action |
|---|---|---|
| `/book` | The 7-step wizard. Single route, step state in URL (`/book?step=2` or `/book/details`) so progress is shareable/recoverable. | Continue (per step) -> Pay |
| `/book/confirmation` | Step 7 success state after Stripe returns. Access + next steps. | Go to your course |

### Surface D: Gated Course (members only, serves the mate)

| Route | Purpose | Primary action |
|---|---|---|
| `/course` | Dashboard: welcome, progress ring, continue-where-you-left-off, module tree, support. | Continue learning |
| `/course/introduction` | The intro lesson (welcome, what you get, how to use, time-to-allow, first task). | Start Module 1 |
| `/course/module-[1-8]` | The 8 sequential lesson pages: video slot + long-form text + downloads + complete-and-continue. | Mark complete and continue |
| `/course/readings` | The readings library (5 Canva collections), accessible from Module 5 and the nav. | Open a collection |
| `/course/strategies` | Performance strategies (nerves, delivery, day-of), surfaced from Module 7. | (reference) |
| `/course/locked` | Paywall state shown to authenticated users without a paid booking. | Book Now |

**Total public-marketing routes: 11 (4 conditional). Functional routes: auth 4, booking 2, course 13 (8 modules + intro + dashboard + readings + strategies + locked).** No padding pages. The conditional routes ship as scaffolded shells with an "Add content" state if the client has not supplied content by build time, never as lorem ipsum.

---

## Navigation Structure

The site has **two distinct navigation contexts** because it has two audiences. The chrome changes the moment a user crosses from marketing into the gated course.

### Public / Marketing chrome (logged-out, and logged-in-but-on-marketing)

**Primary nav (header):**
- Logo "WEDDING MATES" (left, links to `/`)
- How It Works (`/how-it-works`)
- Pricing (`/pricing`)
- Reviews (`/reviews`) (hidden until content exists)
- About (`/about`)
- FAQ (`/faq`)
- **Book Now** (primary button, always visible, right) -> `/book`
- Login (text link, far right, smaller) -> `/login`

**Footer nav:**
- Column 1 (Explore): Home, How It Works, Pricing, About
- Column 2 (More): Reviews, Blog, FAQ, Contact
- Column 3 (Legal): Terms, Privacy, Refund Policy
- Column 4 (Get in touch): Email sarah@letsgetwed.com.au, WhatsApp 0410 820 300, "Got questions?" prompt
- Bottom bar: copyright, "Designed by Giovanni Vons" credit (per personal-brand-credits rule, not Vonzie Studio)

**Persistent CTAs:**
- Header "Book Now" button on every marketing page (desktop)
- **Sticky bottom CTA bar on mobile** ("Book Now -- $950") that appears after the hero scrolls out of view. Reserves its own space (no content overlap); inverts colour over dark sections per the persistent-overlay contract.

### Course chrome (logged-in, paid, inside `/course/*`)

The marketing nav is replaced. The voice shifts from selling-the-couple to supporting-the-mate.

**Course nav (persistent left sidebar on desktop, slide-in drawer on mobile):**
- Logo -> `/course` (dashboard)
- Progress ring / "X of 9 complete"
- Module tree: Introduction, Module 1 ... Module 8 (each shows complete / in-progress / locked state)
- Resources: Readings Library, Performance Strategies, Downloads
- Support: "Stuck? Message Sarah" (email + WhatsApp)
- Account menu: profile, sign out

**Course top bar (mobile + desktop):** hamburger (mobile) to open module tree, current-lesson title, progress, account avatar.

No "Book Now" in course chrome (the user has already paid). The only cross-link back to marketing is via the logo if they want the public site, and the footer legal links.

### Locked-state chrome

A user who is authenticated but has no paid booking (e.g. a mate who registered before the couple paid, or a lapsed/incomplete order) sees the course nav greyed/locked and a single primary action: **Book Now -> `/book`**, plus a "Already booked? Contact support" link.

---

## Conversion Flows

### Flow 1 (PRIMARY): Couple discovers, decides, books

Entry (Google / Instagram / referral) -> `/` Home
-> scrolls the narrative (hook -> reframe -> 4 steps -> "yes it's legal" -> Blueprint -> pricing -> Sarah -> proof -> FAQ)
-> clicks **Book Now** (header, hero, or any in-page CTA; sticky bar on mobile)
-> `/book` Step 1 Wedding Date -> Step 2 Details -> Step 3 Celebrant (skippable) -> Step 4 Location (skippable) -> Step 5 Extras (running total) -> Step 6 Payment (Stripe) -> Step 7 `/book/confirmation`
-> account auto-provisioned, email sent, gated course access granted.

**Friction points and mitigations:**
- *"Is this actually legal?"* -> the "Yes, Your Mate Can Really Marry You" section on Home + the `/faq` legality answers + the booking Step 1 < 4-week legal note framed as reassurance, not alarm.
- *"Can my friend really do this?"* -> the 4-step process + the Blueprint feature grid + Sarah's credentials.
- *Booking abandonment* -> only 2 of 7 steps are required gates (Date, Details); steps 3 and 4 are explicitly optional and skippable; progress is saved per step; the running total on Step 5 removes payment surprise; a single trust line ("secure checkout, you can reach Sarah any time") near the pay button.
- *Two-CTA temptation* -> every marketing page states ONE primary action (Book Now). Contact is a secondary, lower-emphasis path for the not-ready.

### Flow 2: Researcher comparing options (longer consideration)

Entry (search "friend officiate wedding Australia") -> `/` Home -> `/how-it-works` (the model in depth) -> `/pricing` (the number + what's included) -> `/about` (does Sarah know what she's doing) -> `/reviews` (proof) -> **Book Now** -> `/book`.

Mitigation: pricing transparency early (a `/pricing` route they can reach directly), founder credibility on `/about`, and proof on `/reviews`. Every one of these pages funnels to `/book` with no dead ends.

### Flow 3: Not-ready couple captures interest

Entry -> `/` -> reads FAQ, still has a specific question -> `/contact` -> submits form (or taps WhatsApp) -> Sarah follows up -> later returns to `/book`.

Mitigation: contact form is short (name, email, message), WhatsApp is one tap on mobile, and the contact page still carries a soft "Ready now? Book Now" so the captured lead can self-convert.

### Flow 4: The mate gets access and learns (post-sale, retention)

Couple completes booking -> mate receives course login email -> `/login` -> `/course` dashboard -> `/course/introduction` (maps the timeline, sets expectations) -> works sequentially Module 1 -> 8, each lesson video + read + download + **Mark complete and continue** -> uses `/course/readings` and `/course/strategies` as needed -> finishes Module 8 with a ceremony ready.

Friction points and mitigations:
- *Overwhelm* -> sequential gating (one module unlocks the next), a visible progress ring, and the intro's time-to-allow table set realistic expectations.
- *Nerves / getting stuck* -> persistent "Stuck? Message Sarah" support link in every lesson; the course voice is warm and reassuring.
- *Missing media* -> video slots render a friendly "Video coming soon, read the full guide below" placeholder so a missing video never blocks progress; the long-form text is the source of truth and is always complete.

### Flow 5: Returning mate resumes

Entry -> `/login` -> `/course` -> "Continue where you left off" jumps straight to the in-progress lesson. One click from login to the exact next action.

---

## Per-Page Wireframes

### Global Elements

**Marketing header:** logo left, nav centre/right, "Book Now" primary button + "Login" link far right. Sticky on scroll, condenses (reduced height) after the hero. Mobile: logo + hamburger; nav items and "Book Now" + "Login" inside the slide-in drawer; the drawer has a focus trap and closes on route change. Responsive: full horizontal nav at >=1024px; hamburger drawer below.

**Marketing footer:** 4-column link grid (Explore / More / Legal / Get in touch) over a warm dark or tonal surface, brand mark, contact (email + WhatsApp), copyright + Giovanni Vons credit. Responsive: 4 columns desktop, 2 columns tablet, single stacked accordion-free column on mobile.

**Sticky mobile CTA bar:** appears after hero, "Book Now -- $950", reserves layout space, inverts over dark sections, hidden inside the booking portal and course (already converting / already paid).

**Course sidebar / drawer:** described in Navigation Structure. Persistent on desktop (>=1024px), slide-in drawer on mobile/tablet with focus trap.

---

### Page: Home (`/`)

**Layout approach:** full-bleed photographic hero, then an alternating editorial rhythm of contained and full-bleed sections. This is the master sales narrative; section order moves emotion -> evidence -> action, never the reverse.

**Section 1: Hero**
- Height: ~90vh desktop, ~80svh mobile.
- Content: brand hook "GET WED YOUR WAY" as the display lockup; supporting line "Say I do with your best mate marrying you. More laughter. More tears. More magic."; primary CTA "Book Now"; secondary text link "See how it works". Full-bleed wedding photograph behind.
- Layout: headline lockup left or centre per brand direction; CTA directly under subhead; photo full-bleed with a legibility scrim.
- Interaction: subtle entrance reveal of headline; scrim ensures AA text contrast over photo.
- Content constraints: hero headline <= 3 words ("GET WED YOUR WAY" reads as the lockup), subhead 1-2 short lines, CTA <= 2 words, image 16:9 desktop / 4:5 mobile.

**Section 2: The Reframe ("Why Choose A Celebrant, When You Could Choose A Mate?")**
- Content: the section headline (the rhetorical question), then the two-beat problem/solution: "Finding the right celebrant is tough" (the stranger problem) then "Now picture a more personal option" (the mate stepping forward). 2 short paragraphs.
- Layout: headline full width; two stacked or side-by-side text beats; one supporting image of a friend at the front leading.
- Interaction: scroll-reveal per beat.
- Content constraints: headline <= 9 words (rhetorical question is an allowed override), 2 paragraphs max per beat, image 4:3.

**Section 3: The 4-Step Process**
- Content: section headline "4 Steps To A Ceremony You'll Relive For Years"; the four numbered steps verbatim from source: 01 Choose your celebrant, 02 They get trained and supported, 03 We handle the legals, 04 You get a wedding that goes down in the books. Each step = number, title, 1 short paragraph, optional line-icon.
- Layout: 4-up grid desktop, 2-up tablet, vertical stepped timeline mobile.
- Interaction: staggered reveal; on mobile a connecting vertical line ties the steps into a journey.
- Content constraints: section headline <= 8 words, step titles <= 5 words, step body 1 paragraph (<= 40 words), CTA "Start Your Journey" <= 3 words, icons 1:1.

**Section 4: Legality Reassurance ("Yes, Your Mate Can Really Marry You")**
- Content: the headline; the two-anxiety framing ("Is it legal? And how will a friend know how to pull off an amazing ceremony?"); the truthful answer that a registered celebrant handles the legals while the mate delivers the experience; "we've helped countless friends become incredible unofficial celebrants". 2-3 paragraphs.
- Layout: contained, calmer surface (lower visual noise to signal trust); optional supporting image.
- Interaction: minimal; this is a trust beat, restraint is the craft.
- Content constraints: headline <= 8 words, 3 paragraphs max, no CTA competing here (the section ends with a soft link to FAQ).

**Section 5: The Blueprint (4-feature grid)**
- Content: section headline "Elevate Your Wedding Ceremony To Be Unforgettable"; the 4 Blueprint features verbatim themes: capture the heart of your love story; write a ceremony that reflects you; performance tips for confidence and timing; coordinate music/readings/vows/special moments. Each = custom line-icon (camera/edit/performance/music), title, 1 paragraph.
- Layout: 4-feature grid (2x2 desktop, 1-col mobile).
- Interaction: hover lift on cards (desktop); reveal on scroll.
- Content constraints: headline <= 8 words, feature titles <= 6 words, feature body 1 paragraph (<= 35 words), icons 1:1.

**Section 6: Pricing teaser ("The Investment: $950. The Memories: Priceless.")**
- Content: the package headline; "All The Good Stuff In Your Wedding Mates Package"; a checklist of the inclusions (onboarding call, legal paperwork handled, Blueprint course, templates, readings/music help, sample scripts, performance tips, peace of mind); a one-line mention that optional extras exist; primary CTA "Book Now".
- Layout: a single emphasised package card; inclusions as a checked list; price prominent.
- Interaction: the card is the visual anchor of the page; gentle emphasis, not gaudy.
- Content constraints: headline <= 6 words, inclusion list items <= 8 words each, CTA <= 2 words, full link to `/pricing` for the extras detail.

**Section 7: Founder Story ("Hi, I'm Sarah")**
- Content: portrait (sarah-wedding.jpg, the 2019 wedding); "Hi, I'm Sarah"; the 300-hours-of-study credential; the proudest-moment story; "READ MORE" expands to the longer version or links to `/about`. 2 paragraphs visible, rest on `/about`.
- Layout: image + text split (image left, text right desktop; stacked mobile, image first).
- Interaction: "Read more" expands inline or routes to `/about`.
- Content constraints: heading <= 4 words, 2 visible paragraphs, image 4:5 portrait, expand control <= 2 words.

**Section 8: Featured Love Stories**
- Content: 2 featured couples (Kat+David, Kristi+Mark) with "View Gallery". CONDITIONAL on client rights; if unconfirmed, this section is hidden, not faked.
- Layout: 2 large image cards side by side desktop, stacked mobile.
- Interaction: hover reveal of couple name; click to gallery.
- Content constraints: card label = couple names only, "View Gallery" <= 2 words, image 3:2.

**Section 9: Wedding Inspiration Blog teaser**
- Content: 3 most-recent real posts (not the live site's 10x lorem ipsum). CONDITIONAL on real posts; hidden if none exist.
- Layout: 3-card row desktop, horizontal scroll or stack mobile.
- Interaction: "Read the story" per card.
- Content constraints: post title <= 9 words, excerpt 1 short sentence, CTA <= 3 words, image 3:2.

**Section 10: Final CTA ("Ready To Pop The Question To Your Mate?")**
- Content: the emotional close (imagine looking back, the laughter, the tears, the inside jokes); primary CTA "Get Started Today" -> `/book`.
- Layout: full-bleed emotive image or warm solid; centred headline + CTA.
- Interaction: the page's strongest visual punctuation; one button.
- Content constraints: headline <= 9 words, 1 paragraph, CTA <= 3 words.

**Section 11: FAQ (inline)**
- Content: 5-7 most common questions as an accordion, led by the two anxieties. CONDITIONAL on client answers; render the legality + "can my friend do it" pair from existing approved copy, the rest gated. A link to the full `/faq`.
- Layout: accordion, single column, contained.
- Interaction: accordion expand/collapse, one open at a time, animated height; full keyboard support.
- Content constraints: question <= 12 words, answer 1-2 paragraphs, CTA "More questions? Contact us" link.

---

### Page: How It Works (`/how-it-works`)

**Layout approach:** contained editorial, deeper than the home teaser.

**Section 1: Intro** -- restate the couple-plus-mate model in one tight paragraph; CTA "Book Now". Constraints: H1 <= 6 words, 1 paragraph.
**Section 2: The 4 steps expanded** -- each step its own block with more detail than the home grid (what the couple does, what the mate does, what Wedding Mates handles). Constraints: per-step headline <= 5 words, 2 paragraphs each, alternating image side.
**Section 3: Who does what** -- a plain 2-column "Couple / Mate / We handle" responsibility split, the clearest possible answer to "what am I actually buying". Constraints: column headers <= 3 words, bullet items <= 10 words.
**Section 4: Legality** -- the truthful registered-celebrant explanation, mirroring the home trust beat but fuller. Constraints: headline <= 8 words, 3 paragraphs.
**Section 5: CTA** -- "Book Now". Constraints: headline <= 7 words, CTA <= 2 words.
Responsive: alternating splits stack image-first on mobile; the responsibility table becomes stacked labelled groups on mobile.

---

### Page: Pricing (`/pricing`)

**Layout approach:** decision page, contained, generous whitespace.

**Section 1: The package** -- "$950. Everything your mate needs." One emphasised card listing the 8 inclusions; "The Memories: Priceless" line; primary CTA "Book Now". Constraints: H1 <= 6 words, inclusion items <= 8 words, CTA <= 2 words.
**Section 2: Optional extras** -- the 4 add-ons with prices and one-line plain explanations (Certificate $69, Celebrant in attendance $299, Zoom rehearsal $99, Script review $129), framed as "add at booking, no pressure". Constraints: extra title <= 6 words, description 1 sentence, price displayed as token.
**Section 3: GST note** -- a single honest line on GST once the client confirms inclusive/exclusive (flagged; render a neutral placeholder until confirmed, do not fabricate a tax claim).
**Section 4: CTA** -- "Book Now". 
Responsive: package card full-width mobile; extras as stacked rows mobile, 2x2 grid desktop.

---

### Page: About (`/about`)

The second-most-visited page; treated with respect, full founder narrative.

**Layout approach:** editorial long-form, image-led.

**Section 1: Hero** -- "Hi, I'm Sarah" + the 2019 wedding portrait, one warm line. Constraints: H1 <= 4 words.
**Section 2: The origin** -- becoming a celebrant to marry her best friend, the 300+ hours, the cost, the proudest moment. 2-3 paragraphs. Image 4:5.
**Section 3: The feedback** -- friends over the moon, "I wasn't a stranger delivering a script". 2 paragraphs.
**Section 4: Why the Blueprint exists** -- turning the coaching into the 8-lesson course so more friends can do the same. 2 paragraphs.
**Section 5: CTA** -- "Book Now" + a soft "Questions first? Contact me". Constraints: CTA <= 2 words.
Responsive: image/text splits stack image-first on mobile; comfortable measure (60-70 chars) for long reading.

---

### Page: FAQ (`/faq`) (CONDITIONAL)

**Layout approach:** single-column accordion, contained.
**Section 1: Intro** -- one reassuring line. 
**Section 2: Grouped accordions** -- groups: Legality, The Mate / can-they-do-it, Pricing & extras, Logistics & timing, The course. The two-anxiety questions lead. Each answer 1-2 paragraphs. CONDITIONAL: only ship questions with client-approved answers; never fabricate. 
**Section 3: Still stuck CTA** -- "Contact us" + "Book Now". 
Responsive: full-width accordions on all sizes; one open at a time; keyboard accessible.

---

### Page: Reviews (`/reviews`) (CONDITIONAL)

**Layout approach:** proof-led grid.
**Section 1: Intro** -- one line. 
**Section 2: Testimonials** -- real quotes with attribution (couple + the mate who led). CONDITIONAL; hidden until supplied. 
**Section 3: Featured love stories** -- Kat+David, Kristi+Mark galleries. CONDITIONAL on rights. 
**Section 4: CTA** -- "Book Now". 
Responsive: masonry/2-up desktop, single column mobile.

---

### Page: Blog index + post (`/blog`, `/blog/[slug]`) (CONDITIONAL)

**Index:** intro line + card grid of real posts (title, excerpt, image, "Read the story"). Hidden/empty-state if no real posts. **Post:** title, hero image, body (editorial measure), a "Ready for your own day? Book Now" CTA block at the end. Constraints: post title <= 9 words, excerpt 1 sentence. Responsive: 3-up grid desktop, stack mobile; post is single-column readable measure.

---

### Page: Contact (`/contact`)

**Layout approach:** split, form + info.
**Section 1: Intro** -- "Got questions? Let's talk." 1 line. 
**Section 2: Form** -- Name, Email, Message, submit "Send message". All labelled. 
**Section 3: Direct contact** -- email sarah@letsgetwed.com.au, WhatsApp 0410 820 300 (one-tap on mobile). 
**Section 4: Soft convert** -- "Ready now? Book Now". 
Responsive: form left / info right desktop; stacked form-first mobile.

---

### Page: Terms (`/terms`) and Privacy (`/privacy`) (CONDITIONAL / hosted)

Single-column long-form legal. Terms CONDITIONAL on client-supplied copy (no fabricated refund policy). Privacy points to the Vonzie Nexus hosted page post-launch; ships as a labelled placeholder route. No CTA. Responsive: single readable column all sizes.

---

### Booking Portal: `/book` (the 7-step wizard)

**Layout approach:** focused single-task surface. Marketing header is replaced by a minimal booking header (logo + "Step X of 7" + a "Save & exit" / phone-support affordance). No marketing nav distractions, no sticky Book Now bar (they are already booking). Centred form column (max ~640px), generous spacing, large tap targets.

**Progress indicator:** a 7-segment stepper across the top (numbered + labelled on desktop, compact dots + "Step X of 7: [label]" on mobile). Completed steps show a check; current step highlighted; optional steps (3, 4) labelled "Optional". The stepper is informational; users move via the primary Continue button, and may tap back to a completed step to edit.

**Save & validation behaviour:** each step validates on Continue (Zod). Required fields gate (Steps 1 and 2 only); optional steps allow Continue with no input. Form state persists in the URL step + local/session storage and, once an email is captured at Step 2, server-side draft so a refreshed or returning user resumes where they left off. A "< 4 weeks" date triggers the legal note as inline reassurance, not a blocker.

**Step 1: Your Wedding Date**
- Content: heading "When's the big day?"; a date picker; conditional legal note when the date is under 4 weeks out ("Less than 4 weeks away? No problem. Your legal marriage will be registered after the ceremony and we'll guide you through it."). 
- Primary action: **Continue**. 
- Validation: a valid future date required. 
- Constraints: step heading <= 5 words, the legal note <= 2 sentences, field label "Wedding date".
- Responsive: full-width native date input on mobile, calendar widget on desktop; legal note sits directly under the field, reserving space so it never shifts the button.

**Step 2: Your Details** (the only other required gate)
- Content: heading "A bit about you two". Fields, all labelled: Your full name; Partner's full name; Email address; Mobile number; Home suburb (helper: "used to plan your legal face-to-face meeting"); Preferred contact method (Email / Phone radio). 
- Primary action: **Continue**. 
- Validation: name, partner name, valid email, valid AU mobile, suburb required; preferred contact required (default Email). 
- Constraints: step heading <= 5 words, field labels per Content Constraints Brief, helper text <= 12 words. 
- Responsive: single column stack on mobile; 2-column pairing (you / partner) on desktop where natural; radio group full width.

**Step 3: Your Chosen Celebrant (Optional)**
- Content: heading "Who's your mate?"; helper "You can add this now or later"; a checkbox "We haven't chosen one yet" that, when ticked, hides/disables the fields and enables Continue; otherwise fields: celebrant name, email, phone. 
- Primary action: **Continue** (also a "Skip for now" text link). 
- Validation: none required; if fields are partially filled, validate format only. 
- Constraints: heading <= 4 words, helper <= 8 words, checkbox label verbatim "We haven't chosen one yet". 
- Responsive: checkbox first on mobile so the skip is obvious; fields collapse when checked.

**Step 4: Ceremony Location (Optional)**
- Content: heading "Where will it happen?"; a single free-text field "Ceremony location" with helper "A venue, a backyard, a beach, anywhere". 
- Primary action: **Continue** ("Skip for now" link). 
- Validation: none. 
- Constraints: heading <= 4 words, free-text label "Ceremony location". 
- Responsive: full-width textarea on all sizes.

**Step 5: Optional Extras (running total)**
- Content: heading "Want to add anything?"; the 4 add-ons as toggle cards, each showing name, price, and the one-line plain explanation verbatim from the booking doc: Official Marriage Certificate $69 ("Only required for name changes and visa applications"), Celebrant in Attendance on the day $299 ("A registered celebrant attends in person as backup or to legally officiate"), Zoom Rehearsal $99 ("30-minute rehearsal to review flow and delivery"), Custom Script Review $129 ("We'll review your script and suggest improvements"). A persistent running total updates as toggles change: "Base $950 + extras = $X". 
- Primary action: **Continue to payment**. 
- Validation: none (all optional). 
- Constraints: heading <= 5 words, extra titles <= 6 words, descriptions 1 sentence, total line always visible. 
- Responsive: stacked toggle cards mobile with a sticky running-total bar at the bottom of the step; 2-col grid desktop with the total in a summary rail.

**Step 6: Payment**
- Content: heading "Secure checkout"; an order summary (base $950 + each selected extra + total, GST line pending client confirmation); the Stripe payment element; a trust line ("Secure payment via Stripe. Questions? Message Sarah."). 
- Primary action: **Pay $X** (button shows the live total). 
- Validation: Stripe-handled; clear inline error states; disabled-until-valid button with strong contrast in every state. 
- Constraints: heading <= 3 words, the pay button shows the amount, trust line 1 sentence. 
- Responsive: summary above the payment element on mobile, summary in a right rail on desktop; the pay button is full-width and thumb-reachable on mobile.

**Step 7: Confirmation & Access** (`/book/confirmation`)
- Content: a celebratory confirmation heading ("You're booked. Let's get you wed."); an order-reference line; a "what happens next" checklist mirroring the email: (1) your course login is in your inbox, (2) download your timeline checklist, (3) book your onboarding call (legal steps, support, Q&A), (4) celebrant welcome pack sent if you provided their contact. Primary action **Go to your course** -> `/course`; secondary **Book your onboarding call**. 
- Validation: this state only renders on a verified successful Stripe return (server-confirmed via webhook); a pending state shows "confirming your payment" while the webhook settles. 
- Constraints: heading <= 6 words, checklist items <= 10 words, primary CTA <= 4 words. 
- Responsive: single centred column all sizes; the next-steps checklist is the visual focus.

> The Step 7 transactional email (sent via Resend) carries: login details, timeline checklist download, onboarding-call link, and the optional celebrant welcome pack. The confirmation screen and the email are kept in sync.

---

### Auth screens

**Layout approach:** minimal, centred single card on a warm brand surface, booking-style chrome (logo only). All inputs labelled, all states (default/focus/error/disabled) defined, button contrast AA in every state.

**Page: Login (`/login`)** -- heading "Welcome back"; Email, Password; primary **Sign in**; links "Forgot password?" and "New here? Create account". Error state for bad credentials. Constraints: heading <= 3 words, CTA <= 2 words. Responsive: full-width card on mobile, centred ~420px card desktop.

**Page: Register (`/register`)** -- heading "Create your account"; Name, Email, Password (with rule hints), confirm; primary **Create account**; link to Login. Note: most accounts are auto-provisioned at booking; this page primarily serves a mate invited by the couple. Constraints: heading <= 3 words, CTA <= 2 words. Responsive: same as Login.

**Page: Forgot password (`/forgot-password`)** -- heading "Reset your password"; Email; primary **Send reset link**; success state "Check your inbox". Constraints: heading <= 3 words, CTA <= 3 words.

**Page: Reset password (`/reset-password`)** -- heading "Set a new password"; New password, confirm; primary **Save password**; reads token from the email link; success routes to Login or straight into `/course`. Constraints: heading <= 4 words, CTA <= 2 words.

---

### Course: Dashboard (`/course`)

**Layout approach:** functional learning home; persistent sidebar (desktop) / drawer (mobile) + main content. Warm but calmer than marketing (this user has bought; now they need clarity and confidence).

**Section 1: Welcome + progress** -- "Welcome, [name]" (the mate); a progress ring "X of 9 complete" (Intro + 8 modules); a single primary **Continue learning** button that deep-links to the current in-progress lesson. Constraints: heading <= 4 words, CTA <= 2 words.
**Section 2: Module tree / map** -- all 9 items (Intro + Modules 1-8) as a vertical list/cards showing title, one-line summary, status (complete / current / locked-until-previous-complete), and estimated time from the time-to-allow table. Sequential: a module unlocks when the prior is marked complete. Constraints: item title <= 7 words, summary <= 12 words.
**Section 3: Resources** -- quick links to Readings Library, Performance Strategies, all Downloads. 
**Section 4: Support** -- "Stuck? Message Sarah" (email + WhatsApp), always visible.
Responsive: sidebar collapses to a top hamburger drawer on mobile; the module tree is the primary mobile content; progress ring sits at top.

---

### Course: Lesson page (`/course/introduction`, `/course/module-[1-8]`)

**Layout approach:** long-form reading surface. This is where the mate spends hours; reading comfort and a clear next-step are the whole job. Sidebar/drawer for navigation; a comfortable single reading column (measure 60-70 chars) in the main area.

**Section 1: Lesson header** -- module number + title; estimated time; a small progress indicator (lesson X of 9). Constraints: title <= 8 words.
**Section 2: Video slot** -- a 16:9 placeholder with a friendly "Video coming soon. The full written guide is below." message (single `videoUrl` swap-point; when a real URL exists it renders the player). Never blocks reading. Constraints: placeholder line <= 12 words.
**Section 3: Long-form lesson text** -- the verbatim module body from `course-layout.txt`, structured with H2/H3 subheads, bulleted lists, callout boxes for tips and the warm voice asides ("This part will be fun!", "Stilettos + soft grass = wobbly celebrant"), and example boxes (the fact-vs-story steakhouse example, the welcome structure, the cue lists). Reading constraints: paragraphs <= ~75 words, subheads every 2-4 paragraphs, lists for any enumerated guidance, callouts visually distinct but AA-contrast.
**Section 4: Downloads** -- the module's resource(s) as labelled download cards (Canva / Drive links from the source map). The 2 missing links (Module 5 vows guide, Module 7 nerves tips) render as a "Coming soon" pending card, flagged, never fabricated. Constraints: download label = resource name, link opens new tab with rel noopener.
**Section 5: Complete & continue** -- a primary **Mark complete and continue** button that records completion and routes to the next module; a secondary "Back" to the previous. The Wrap-Up (Module 8) ends with a celebratory finish state and a pointer to the Module-1 checklist's final section. Constraints: CTA <= 4 words.
**Section 6: Support footer** -- "Stuck? Message Sarah" repeated.
Responsive: nav drawer hidden behind hamburger on mobile; reading column full-width with comfortable padding; video slot full-bleed-to-column 16:9; downloads stack; the complete-and-continue button is a sticky bottom bar on mobile so the next step is always one thumb-tap away.

---

### Course: Readings Library (`/course/readings`)

**Layout approach:** resource index. The 5 Canva collections (Readings for young people, Song Lyrics, Literary and poetic, Romantic readings, Funny and light-hearted) as cards with a one-line description and an "Open collection" link (new tab). Reached from Module 5 and the resources nav. Constraints: collection title <= 6 words, description <= 12 words. Responsive: 2-up grid desktop, single column mobile.

### Course: Performance Strategies (`/course/strategies`)

**Layout approach:** reference reading. The Module 7 nerves/delivery techniques (reframe nerves, 3-3-3 breathing, friendly face, grounding, eye contact, smiling, handling the unexpected) as a scannable, callout-rich reference the mate revisits before the day. Constraints: technique titles <= 6 words, each technique 1 short paragraph. Responsive: single readable column; callouts stack.

### Course: Locked / Paywall (`/course/locked`)

**Layout approach:** centred, single message. Shown to an authenticated user without a paid booking. Content: warm heading "Your course is waiting"; one line explaining access comes with the $950 booking; primary **Book Now** -> `/book`; secondary "Already booked? Contact support". The module tree behind is visible but greyed/locked. Constraints: heading <= 4 words, CTA <= 2 words. Responsive: single centred column all sizes.

---

## Responsive Behavior

Mobile is the primary experience (wedding research and course reading are both phone-heavy). Default model: **mobile stack -> tablet hybrid -> desktop spec.** Breakpoints reasoned at 375px / 768px / 1280px.

**Marketing pages (375px):** single-column stack; hero text over a legibility-scrimmed photo at 4:5; the 4-step process becomes a vertical connected timeline; feature/pricing grids collapse to one column; image+text splits stack image-first; sticky bottom "Book Now -- $950" bar appears after the hero and reserves its own height; header collapses to logo + hamburger with a focus-trapped drawer.

**Marketing pages (768px):** 2-column grids (4-step as 2x2, features 2x2, footer 2-col); image+text splits may sit side by side; horizontal header nav may still be a drawer depending on item count; sticky CTA bar persists.

**Marketing pages (1280px):** full spec; horizontal nav; alternating contained/full-bleed rhythm; 4-up grids; founder split side by side; footer 4-col.

**Booking portal:** the most mobile-critical surface. 375px: full-width single-column form, native inputs, large 44px+ tap targets, the stepper compacts to "Step X of 7: [label]" with dots; Step 5 gets a sticky running-total bar; Step 6 pay button is full-width and thumb-reachable; the legal note and helper text reserve space so the Continue button never jumps. 768px+: centred ~640px column, full labelled stepper, you/partner field pairing, Step 5/6 summary moves to a right rail. The wizard never relies on hover; everything is tap-first.

**Auth:** 375px full-width card with comfortable padding; 420px centred card from 768px up. Inputs always full-width, labels always visible (no placeholder-only labels).

**Course dashboard + lessons:** 375px: navigation sidebar collapses behind a hamburger drawer (focus-trapped); the lesson reading column is full-width with generous line spacing and a 60-70 char measure preserved via padding; the video slot is a column-width 16:9; "Mark complete and continue" is a sticky bottom bar. 768px: drawer may persist as an overlay; reading column gains side margin. 1280px: persistent left sidebar + reading column + comfortable right margin; progress and module tree always visible.

**Persistent-overlay contract (all surfaces):** the sticky mobile CTA bar, the sticky course complete-and-continue bar, and the Step 5 running-total bar each reserve their own layout space (never overlap content), anchor to the content they reference, and invert colour over dark sections. Verified on the Visual Pixel Pass, not assumed in code.

**Reduced motion:** all entrance reveals, the 4-step stagger, accordion height animation, and progress-ring animation respect `prefers-reduced-motion` and degrade to instant.

---

## Content Constraints Brief

Phase 2 (ui-designer, copywriter) design and write to these limits. Defaults apply unless a per-section override is listed. AU English. No em dashes; no double hyphens in client-facing copy.

**Global defaults**
- Hero headline: max ~6 words (Home hero override: <= 3 words, the "GET WED YOUR WAY" lockup).
- Section headlines: max ~8 words (rhetorical-question overrides allowed up to ~9 words: Home Section 2 "Why Choose A Celebrant, When You Could Choose A Mate?").
- CTA button text: max 3 words (preferred: "Book Now", "Start Your Journey", "Get Started", "Continue").
- Body paragraphs per section: 1-3 (founder/about sections allow up to 4 for narrative; legality beats max 3).
- Image aspect ratios: hero 16:9 desktop / 4:5 mobile; founder portrait 4:5; feature/step icons 1:1; love-story + blog cards 3:2; reframe/support images 4:3.
- Reading-comfort measure (long-form): 60-70 characters.

**Per-page / per-section overrides**

*Home:* hero <= 3 words; the reframe headline up to ~9 words; 4-step titles <= 5 words with 1 paragraph (<= 40 words) each; pricing headline <= 6 words with inclusion items <= 8 words; founder heading <= 4 words; final-CTA headline <= 9 words.

*How It Works:* per-step headline <= 5 words, 2 paragraphs each; responsibility-column headers <= 3 words, bullets <= 10 words.

*Pricing:* package inclusion items <= 8 words; extra titles <= 6 words with 1-sentence descriptions; GST line is a flagged placeholder until the client confirms inclusive/exclusive (do not fabricate).

*About:* up to 4 narrative paragraphs per section; H1 <= 4 words.

*FAQ:* question <= 12 words; answer 1-2 paragraphs; CONDITIONAL on client-approved answers (no fabricated legal or refund answers).

**Booking-field labels (verbatim source of truth -> `orders` table)**
- Step 1: field label "Wedding date"; legal note (shown when < 4 weeks): "Less than 4 weeks away? No problem. Your legal marriage will be registered after the ceremony and we'll guide you through it." (max 2 sentences).
- Step 2: "Your full name", "Partner's full name", "Email address", "Mobile number", "Home suburb" (helper: "Used to plan your legal face-to-face meeting"), "Preferred contact method" (options: Email / Phone).
- Step 3: "Name of your chosen celebrant", "Email", "Phone", checkbox label verbatim "We haven't chosen one yet".
- Step 4: "Ceremony location" (helper: "A venue, a backyard, a beach, anywhere").
- Step 5 extras (title + price + 1-line description): "Official Marriage Certificate" $69 ("Only required for name changes and visa applications"); "Celebrant in Attendance on Your Wedding Day" $299 ("A registered celebrant attends in person as backup or to legally officiate"); "Zoom Rehearsal with Your Celebrant" $99 ("30-minute rehearsal to review flow and delivery"); "Custom Script Review" $129 ("We'll review your script and suggest improvements"). Running-total line always visible: "Base $950 + extras".
- Step 6: heading <= 3 words ("Secure checkout"); pay button shows the live amount ("Pay $X"); trust line 1 sentence.
- Step 7: heading <= 6 words; next-steps checklist items <= 10 words each; primary CTA <= 4 words ("Go to your course").
- Step labels (stepper): "Date", "Details", "Celebrant", "Location", "Extras", "Payment", "Done". Optional badge on "Celebrant" and "Location".

**Auth-screen constraints**
- Headings <= 4 words ("Welcome back", "Create your account", "Reset your password", "Set a new password").
- CTAs <= 3 words ("Sign in", "Create account", "Send reset link", "Save password").
- Every input visibly labelled (no placeholder-only labels); password rule hints <= 10 words.

**Course-lesson reading constraints**
- Lesson title <= 8 words; estimated-time chip from the time-to-allow table.
- Paragraphs <= ~75 words; insert an H2/H3 subhead every 2-4 paragraphs.
- Use lists for all enumerated guidance (interview topics, ceremony structure, cue lists, nerves techniques).
- Callout/aside boxes for the warm voice lines ("This part will be fun!", "Stilettos + soft grass = wobbly celebrant") and tips; must hold AA contrast.
- Example boxes for the fact-vs-story example, the welcome structure, and the kiss line.
- Video-slot placeholder line <= 12 words ("Video coming soon. The full written guide is below.").
- Download card label = the resource's real name; the 2 missing links (Module 5 vows guide, Module 7 nerves tips) render a "Coming soon" pending card, flagged, never fabricated.
- "Mark complete and continue" CTA <= 4 words.

**Course dashboard / locked constraints**
- Dashboard welcome heading <= 4 words; "Continue learning" CTA <= 2 words; module-tree item title <= 7 words, summary <= 12 words.
- Locked-state heading <= 4 words; primary CTA "Book Now" <= 2 words.

**Content honesty flags (carry to Phase 2, never fill with filler):** FAQ answers, blog posts, reviews/testimonials, featured-love-story galleries (rights), Terms + refund policy, GST inclusive/exclusive line, the exact legal mechanism wording, the 9 course videos, and the 2 missing download links. Conditional routes/sections ship as scaffolded shells with an explicit empty state, never lorem ipsum.

## Content Requirements

- **Home:** real hero + section photography (live-site assets reusable); confirmed 4-step + Blueprint + pricing copy (already approved on live site); founder portrait (sarah-wedding.jpg available). Featured-love-story and blog teaser sections require client-confirmed content/rights or stay hidden.
- **About:** founder long-form (live-site source available) + portrait (available).
- **Pricing:** package + extras confirmed; GST line pending client confirmation.
- **FAQ / Reviews / Blog / Terms / Privacy:** CONDITIONAL on client supply; build scaffolds with empty states.
- **Booking:** all field labels + extra descriptions + Step 7 email contents are confirmed (booking doc). Confirm GST treatment and the precise legal-mechanism wording for the < 4-week note.
- **Course:** all 9 lessons' long-form body copy is confirmed (course doc, verbatim). Videos are placeholder slots (single swap-point). Downloads: 7 live links present, 2 pending (flag). Confirm the Module 5/6 vows-blueprint placement inconsistency with the client.
- **Contact info (real, overrides live-site placeholders):** email sarah@letsgetwed.com.au; WhatsApp 0410 820 300.
