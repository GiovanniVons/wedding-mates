# Page Copy
**Phase:** 2
**Agent:** copywriter
**Date:** 2026-06-21
**Status:** draft

---

## How to read this file

One H2 per route in the `ux.md` Page Inventory, plus the functional surfaces grouped (Booking Wizard, Auth, Course Shell). Under each page, every text string a component needs is given in full. AU English throughout. No em dashes; no double hyphens in any client-facing string.

**Hype Line notation (the signature copy pattern):** written as `[ CUE CHIP ] line with the *hit word* in asterisks`. The cue chip is the saturated pill; the asterisked word is the accent-colour, heaviest-weight emphasis; the dot `·` marks a held beat. This notation is for the developer/designer to render; the asterisks and brackets never ship as literal characters.

**Flags used below:**
- `FLAG (client):` content that cannot ship until the client confirms or supplies it. Honest holding copy is given where one is needed; never lorem.
- `FLAG (decision):` a naming or policy decision the client must make.
- `EMPTY STATE:` scaffolded empty-state copy for a conditional section/page with no real content yet.

**Brand-name decision carried from the brief.** `FLAG (decision):` The SEO expert recommends "Let's Get Wed" as the primary public name to match the domain `letsgetwed.com.au` for LLM entity consolidation; the dossier and all other artifacts use "Wedding Mates". This copy uses **Wedding Mates** as the primary visible name and **Let's Get Wed** as the consistent alias (it owns the email, the domain, and the SEO meta titles). The client must pick one primary public name before launch; if they choose "Let's Get Wed", swap the visible name token site-wide and keep "Wedding Mates" as the alias.

**Legal-honesty rule applied everywhere below:** the registered celebrant handles the legal solemnisation and paperwork; the mate leads and delivers the ceremony. Approved framings only ("We handle the legals." / "A registered celebrant takes care of the legal paperwork before the day."). Never "your mate legally marries you" as a standalone factual claim.

---

## Global Copy

### Navigation Labels (marketing chrome)
- Logo wordmark: `WEDDING MATES`
- Nav: `How It Works` · `Pricing` · `Reviews` (hidden until content exists) · `About` · `FAQ`
- Primary button (header, always visible): `Book Now`
- Login text link (far right, smaller): `Login`
- Mobile drawer adds the same items plus `Contact`.

### Persistent CTAs
- Header primary button: `Book Now`
- Hero primary CTA: `Book Now`
- In-page section CTAs (varied, never repeated on one page): `Start Your Journey`, `Get Started`, `See the Price`, `Book Your Ceremony`, `Get Started Today`
- The brand's verb-for-book where the design wants flavour: `Start Your Script`
- Sticky mobile bar (appears after hero scrolls out): `Book Now -- $950`
  - `FLAG (copy):` the double hyphen in the wireframe label is a writing-rule violation in client-facing copy. Ship as **`Book Now · $950`** (mid-dot separator). Keep the price visible; never use `--` on screen.

### Footer
**Tagline line (above the columns):** `Married by the one who knows you best.`

**Column 1 -- Explore:** `Home` · `How It Works` · `Pricing` · `About`
**Column 2 -- More:** `Reviews` · `Blog` · `FAQ` · `Contact`
**Column 3 -- Legal:** `Terms` · `Privacy` · `Refund Policy`
(`Reviews`, `Blog`, `Refund Policy`, `Terms` link out only when their content exists; until then they are hidden, not dead links. `Privacy` points to the Vonzie Nexus hosted page post-launch.)
**Column 4 -- Get in touch:**
- Heading: `Got questions?`
- Line: `We are happy to talk it through before you book.`
- Email: `sarah@letsgetwed.com.au`
- WhatsApp: `0410 820 300`

**Bottom bar:**
- Copyright: `© 2026 Wedding Mates. All rights reserved.`
- Credit: `Designed by Giovanni Vons`

### Course chrome labels (logged-in, paid)
- Logo links to `/course` (Dashboard)
- Progress label: `{n} of 9 complete`
- Module tree heading: `Your modules`
- Module items: `Introduction`, `Module 1`–`Module 8` (full titles in the Course Shell section), each showing `Complete` / `In progress` / `Locked` state.
- Resources heading: `Resources`
- Resource links: `Readings Library`, `Performance Strategies`, `Downloads`
- Support block: `Stuck? Message Sarah`
- Account menu: `Profile`, `Sign out`

### Course chrome microcopy (states)
- Locked module tooltip: `Finish the module before this one to unlock it.`
- In-progress badge: `In progress`
- Complete badge: `Complete`
- Mobile top bar current-lesson prefix: `Now reading:`

---

## Home

### Meta
- Title: `Friend Led Wedding Ceremonies | Let's Get Wed` (45)
- Description: `Have your best mate lead your wedding ceremony while a registered celebrant handles the legals. One package, fully sorted. Book your friend led ceremony today.` (158)
- OG Title: `Get wed your way: married by the one who knows you best`
- OG Description: `Your best mate leads the ceremony, a registered celebrant handles the legals. One $950 package, training and all. Book your friend led ceremony.`

### Accessible H1 (one only, for crawlers + AI, per seo.md Placement)
`Get wed your way: a friend led wedding ceremony, legally sorted.`
(The visible hero lockup below is the styled display; this is the single semantic `<h1>`. Do not ship two competing H1s.)

### Section 1: Hero
**Display lockup (visible, <= 3 words):** `GET WED YOUR WAY`
**Cue chip on the lockup:** `THE WELCOME`
**Sub-headline (verbatim brand sample, kept):** `Say "I do" with your best mate marrying you. More laughter. More tears. More magic.`
**SEO first-paragraph line (sits under the subhead, plain semantic, carries the keyword):** `A friend led wedding ceremony, with the legals handled. Your person leads the day; a registered celebrant takes care of the legal paperwork.`
**Primary CTA:** `Book Now` -> `/book`
**Secondary text link:** `See how it works` -> `/how-it-works`
**Hero image alt:** `A friend leading a wedding ceremony, reading from the page and looking up at the couple`

### Section 2: The Reframe
**Section headline (rhetorical-question override, verbatim sample):** `Why Choose A Celebrant, When You Could Choose A Mate?`
**Hype Line (section peak):** `[ THE STRANGER ]  A name off a list, hoping they get you *right*.`
**Beat 1 -- the stranger problem (verbatim-derived):**
`You scroll through endless websites, check availability, and hope a stranger you have never met will nail the most special day of your life. Why leave the most personal moment of your wedding to chance?`
**Beat 2 -- the mate steps forward (verbatim-derived):**
`Now picture a more personal option. You are standing in front of everyone you love, the music fades, and your best mate steps forward. Not with a generic script, but with a cheeky grin and the whole room on their side.`
**Supporting image alt:** `A close friend at the front of a wedding, leading the ceremony for the couple`

### Section 3: The 4-Step Process
**Section headline (<= 8 words):** `Four Steps To A Ceremony You'll Relive`
**Intro line (1 sentence):** `A great ceremony is built, not winged. Here is how it goes.`

| Step | Title (<= 5 words) | Body (1 paragraph, <= 40 words) | Icon alt |
|---|---|---|---|
| 01 | `Choose Your Celebrant` | `Pick the person who knows you best. A sibling, a parent, the mate who has been there for everything. The one whose voice already means something to you both.` | `Choosing your celebrant` |
| 02 | `They Get Trained And Supported` | `Your mate works through the Blueprint course at their own pace. We teach them how to interview you, write your story, and deliver it with calm hands. Sarah is one message away the whole time.` | `Training and support` |
| 03 | `We Handle The Legals` | `A registered celebrant takes care of the legal paperwork and requirements before the day, so your mate can keep their eyes on you and not on the admin.` | `We handle the legals` |
| 04 | `A Wedding That Goes Down In The Books` | `Your mate leads a ceremony in a voice you already love. More laughter, more tears, more of you two. The kind of wedding people talk about for years.` | `A wedding to remember` |

**Step CTA (<= 3 words):** `Start Your Journey` -> `/book`

### Section 4: Legality Reassurance (trust beat, calm register)
**Headline (<= 8 words):** `Yes, Your Mate Can Really Marry You`
**Body (3 paragraphs max, reassurance is calm):**
`Two questions come up every time. Is it legal? And how will a friend know how to pull off an amazing ceremony? Fair questions. Here are the honest answers.`
`The legal part is handled by us. A registered celebrant takes care of the legal solemnisation and paperwork before the day, so your marriage is fully valid. Your mate leads and delivers the ceremony itself, the part that makes it yours.`
`And the delivery? That is exactly what the Blueprint course is for. We have helped friends with no public-speaking experience stand up and lead ceremonies that left the whole room in happy tears. Your mate does not need to be polished. They just need to love you, and we get them ready.`
**Soft link (no competing CTA here):** `Read the full legality answers` -> `/faq` (anchor: `is a friend led ceremony legal`)

### Section 5: The Blueprint (4-feature grid)
**Section headline (<= 8 words, verbatim-derived):** `Elevate Your Ceremony To Unforgettable`
**Intro line:** `The Blueprint is the craft, broken into four things your mate will learn to do well.`

| Feature | Title (<= 6 words) | Body (1 paragraph, <= 35 words) | Icon alt |
|---|---|---|---|
| camera | `Capture Your Love Story` | `We teach your mate the questions that uncover the real story. The meet-cute, the turning point, the proposal. The little moments that make the room lean in.` | `Capturing your love story` |
| edit | `Write A Ceremony That's You` | `Facts become a story. Your mate learns to turn "they met at work" into the version that makes people laugh, then reach for a tissue. In your voice, about you.` | `Writing your ceremony` |
| performance | `Deliver With Confidence` | `Pace, pauses, and the line that lands. Performance tips that calm the nerves and turn a flat reading into a moment the whole room feels.` | `Performance and delivery tips` |
| music | `Coordinate Every Moment` | `Music, readings, vows, the cue for the kiss. Your mate learns to weave in everyone else so the whole ceremony flows without a hitch.` | `Coordinating music, readings and vows` |

### Section 6: Pricing Teaser
**Headline (<= 6 words, verbatim line kept as the visual peak):**
**Hype Line:** `[ THE INVESTMENT ]  The investment, *$950*. The memories, priceless.`
**Sub-headline (<= 8 words):** `All The Good Stuff, In One Package`
**SEO line (plain, carries the cost keyword):** `A friend led wedding ceremony for one price of $950, the Blueprint course and the legals included.`
**Inclusion checklist (items <= 8 words each):**
- `The full Blueprint course, eight modules`
- `Onboarding video call with you and your mate`
- `Legal paperwork handled by a registered celebrant`
- `Ceremony templates and sample scripts`
- `A readings and music library`
- `Performance and nerves strategies`
- `Real human support the whole way`
- `Peace of mind on the day`
**Extras mention (1 line):** `A few optional extras can be added at booking, no pressure.`
**Primary CTA (<= 2 words):** `Book Now` -> `/book`
**Secondary link:** `See the full pricing` -> `/pricing` (anchor: `what the $950 package includes`)
**Package image alt:** `What is included in the $950 Wedding Mates package`

### Section 7: Founder Story
**Heading (<= 4 words, verbatim):** `Hi, I'm Sarah`
**Body (2 visible paragraphs, rest on /about):**
`In 2019 I trained as a registered celebrant for one reason: to marry my best friend. Over 300 hours of study later, I stood up at her wedding and led the most personal ceremony I have ever been part of. It was the proudest moment of my career.`
`Friends started asking me to coach them through doing the same for their people. So I turned that coaching into the Blueprint, the course your mate uses now, so any couple can be married by someone who actually loves them.`
**Expand control (<= 2 words):** `Read more` -> `/about`
**Portrait alt:** `Sarah, founder of Wedding Mates and a registered marriage celebrant, at the 2019 wedding where she married her best friend`

### Section 8: Featured Love Stories
`EMPTY STATE (conditional on client rights):` this section is **hidden** until the client confirms rights to the Kat+David and Kristi+Mark galleries. Do not fake it with stock.
- If/when supplied, card labels are couple names only: `Kat & David`, `Kristi & Mark`.
- Card CTA (<= 2 words): `View Gallery`
- `FLAG (client):` confirm photo rights and the real couple names/spellings before this section ships.

### Section 9: Wedding Inspiration Blog Teaser
`EMPTY STATE (conditional on real posts):` **hidden** until at least one real blog post exists (the live site is lorem ipsum). Do not publish placeholder posts.
- If/when real posts exist, render the 3 most recent: title (<= 9 words), one-sentence excerpt, CTA `Read the story`.
- `FLAG (client):` real posts needed; no fabricated articles.

### Section 10: Final CTA
**Headline (<= 9 words, verbatim-derived):** `Ready To Pop The Question To Your Mate?`
**Body (1 paragraph):**
`Picture it years from now. The laughter, the happy tears, the inside joke only your room would get. All of it led by the person who knows you best. That is the wedding waiting on the other side of one decision.`
**Hype Line (the page's strongest punctuation, the one confetti beat the home page is allowed):** `[ THE KISS ]  And just like that, you're *married*.`
**Primary CTA (<= 3 words):** `Get Started Today` -> `/book`
**Final image alt:** `A couple laughing together during their friend led wedding ceremony`

### Section 11: FAQ (inline accordion)
**Section headline (<= 8 words):** `The Questions Everyone Asks First`
**Render set (per seo.md: questions 1, 2, 3, 5, and one logistics question only):**

**Q1. Can a friend really marry us in Australia?**
`Yes. Your mate leads and delivers the ceremony, and a registered celebrant handles the legal side, the solemnisation and paperwork, so the marriage is fully valid. Your friend gets the personal moment; we make sure the legals are sorted.`
`FLAG (client): general form is safe to ship. Confirm exact legal-mechanism wording before final sign-off.`

**Q2. Is a friend led ceremony actually legal?**
`Yes. In Australia the law requires a Commonwealth-registered celebrant to handle the legal marriage. With Wedding Mates, a registered celebrant takes care of every legal requirement before the day, while your chosen mate leads the ceremony itself. You get a wedding that is both deeply personal and completely valid.`
`FLAG (client): confirm precise legal-mechanism wording.`

**Q3. Can my friend pull this off if they have never done it?**
`That is exactly what the Blueprint course is for. Across eight modules it teaches your mate how to interview you, write your love story, structure the ceremony, and deliver it with confidence, including how to handle nerves. Most people who lead are not public speakers. They just love you, and we get them ready.`

**Q5. What does it cost?**
`One package is $950. That includes the Blueprint course that trains your mate, the onboarding call, the templates and readings, and the legal handling. A few optional extras can be added at booking.`
`FLAG (client): confirm GST inclusive or exclusive before publishing.`

**Q7. How far in advance do we need to book?**
`The more time your mate has to work through the course and prepare, the better, ideally a few months out. If your wedding is less than four weeks away, we can still help; your legal marriage may be registered after the ceremony and we will guide you through it.`
`FLAG (client): confirm the under-4-weeks process wording; do not publish specifics unconfirmed.`

**Closing link:** `More questions? Read the full FAQ` -> `/faq`

### Schema notes (developer)
- Home inherits site-wide `Organization` + `WebSite`. Per seo.md, Home FAQ is **visible-only** (no duplicate `FAQPage` node; the schema lives on `/faq` only).
- Optional `@id` references to `Product` (`#package`) and `Course` (`#blueprint`) may be linked from the pricing teaser and Blueprint sections.

---

## How It Works

### Meta
- Title: `Can My Friend Be My Celebrant? | Let's Get Wed` (46)
- Description: `Yes, your mate can lead your ceremony. We train them with the Blueprint course and a registered celebrant takes care of the legal paperwork. See how it works.` (157)
- OG Title: `How a friend leads your ceremony (and who handles the legals)`
- OG Description: `Your mate leads, a registered celebrant handles the legals, the Blueprint course gets them ready. Here is exactly who does what.`

### Section 1: Intro
**H1 (visible, <= 6 words):** `How A Friend Leads Your Ceremony`
**First paragraph (answer-first, plain, carries the keyword in the first two sentences):**
`Yes, your friend can be the one who leads your wedding ceremony in Australia. Here is the honest version of how it works: your mate leads and delivers the day, and a registered celebrant handles the legal solemnisation and paperwork behind the scenes. Personal and fully valid, both at once.`
**Primary CTA (<= 2 words):** `Book Now` -> `/book`

### Section 2: The 4 Steps Expanded
**Section headline (<= 8 words):** `The Four Steps, In Full`

**Step 01 -- `Choose Your Person` (<= 5 words)**
`This is the easy part and the best part. You pick the person who already knows your story, the one whose voice means something to both of you. A best mate, a sibling, a parent. There is no audition and no stranger to vet.`
`What you do: choose your mate and tell them the good news. What they do: say yes (most people are honoured to be asked). What we handle: getting them set up with the course and account.`

**Step 02 -- `They Get Trained` (<= 5 words)**
`Your mate works through the Blueprint, our eight-module course, at their own pace. It walks them through interviewing you, writing your love story, structuring the ceremony, adding music and vows, and delivering it all with confidence. Around fifteen to seventeen hours of work, spread over a few weeks.`
`What you do: sit for one fun interview and read a draft or two. What they do: the course, the writing, the rehearsing. What we handle: support the whole way, by email or WhatsApp, whenever they get stuck.`

**Step 03 -- `We Handle The Legals` (<= 5 words)**
`This is the part couples worry about, so we will be clear. A registered celebrant takes care of the legal solemnisation and the required paperwork before the day. Your marriage is legally valid; your mate does not have to touch a single form.`
`What you do: provide a few details at booking. What they do: nothing on the legal side, by design. What we handle: every legal requirement, sorted before anyone arrives.`
`Soft link:` `Who handles the legals?` -> `/faq` (anchor: `who handles the legals`)

**Step 04 -- `You Get Married` (<= 5 words)**
`On the day, your mate stands at the front and leads a ceremony written for you, in a voice you already love. There are laughs in the right places and a tear or two in the others. Then the cue for the kiss, and you are married.`
`What you do: show up and be married. What they do: lead the moment they have been preparing for. What we handle: everything that lets them focus only on you.`

### Section 3: Who Does What
**Section headline (<= 8 words):** `Who Does What, At A Glance`
**Three-column responsibility split (headers <= 3 words, bullets <= 10 words each):**

**`The Couple`**
- `Choose your mate to lead the ceremony`
- `Sit for one relaxed interview`
- `Read a draft and share feedback`
- `Show up and get married`

**`Your Mate`**
- `Work through the Blueprint course`
- `Interview the couple and write the ceremony`
- `Rehearse the delivery`
- `Lead the ceremony on the day`

**`We Handle`**
- `All legal paperwork and solemnisation`
- `The onboarding call and support`
- `Templates, readings and sample scripts`
- `Everything legal, sorted before the day`

### Section 4: Legality (fuller version of the home trust beat)
**Headline (<= 8 words):** `The Legal Bit, Made Simple`
**Body (3 paragraphs):**
`In Australia, only a Commonwealth-registered marriage celebrant can legally solemnise a marriage. That is the law, and it is a good one. It is also the part that stops most couples from having a friend lead the day.`
`Wedding Mates removes that blocker. A registered celebrant handles the legal solemnisation and paperwork, so your marriage is completely valid. Your mate is free to do the part that matters most to you: lead a ceremony that is personal, warm, and entirely yours.`
`So you never have to choose between personal and legal. You get both. Your person at the front, the legals quietly handled, and a wedding that is real in every sense.`
`FLAG (client): confirm the exact legal mechanism (does the registered celebrant attend and officiate, or is the legal marriage registered separately). Keep the general form until confirmed.`

### Section 5: CTA
**Headline (<= 7 words):** `Ready To Get Wed Your Way?`
**Body (1 line):** `One booking, and your mate gets everything they need to lead your day.`
**Primary CTA (<= 2 words):** `Book Now` -> `/book`
**Secondary link:** `See the price` -> `/pricing` (anchor: `see the price`)

### Schema notes (developer)
- Emit the `Course` node (`#blueprint`) on this page per seo.md Schema 4.

---

## Pricing

### Meta
- Title: `Friend Led Wedding, One Price: $950 | Let's Get Wed` (51)
- Description: `One $950 package: the Blueprint course that trains your mate, the legals handled by a registered celebrant, plus optional extras. See exactly what is included.` (158)
- OG Title: `One price for a friend led wedding ceremony: $950`
- OG Description: `Everything your mate needs to lead your ceremony, plus the legals handled. $950, with optional extras you can add at booking.`

### Section 1: The Package
**H1 (visible, <= 6 words):** `$950. Everything Your Mate Needs.`
**First paragraph (price in crawlable text, plain):**
`A friend led wedding ceremony costs one flat price of $950. That covers the Blueprint course that trains your chosen mate and the legal requirements handled by a registered celebrant. No tiers, no surprises, no per-hour celebrant fees.`
**Inclusion list (items <= 8 words):**
- `The Wedding Ceremony Blueprint, eight modules`
- `Onboarding video call for you and your mate`
- `Legal paperwork handled by a registered celebrant`
- `Ceremony templates and sample scripts`
- `A readings and music library`
- `Performance and nerves strategies`
- `Real human support, every step`
**Closing line (<= 6 words, verbatim peak):** `The memories: priceless.`
**Primary CTA (<= 2 words):** `Book Now` -> `/book`
**Package image alt:** `What is included in the $950 Wedding Mates package`

### Section 2: Optional Extras
**Section headline (<= 8 words):** `Add Anything You Like, No Pressure`
**Intro line:** `These are optional. Add them at booking or leave them; the base package stands on its own.`

| Extra (title <= 6 words) | Price | Description (1 sentence) |
|---|---|---|
| `Official Marriage Certificate` | `$69` | `Only required for name changes and visa applications, this is the official certificate issued by the Registry.` |
| `Celebrant In Attendance` | `$299` | `A registered celebrant attends your ceremony in person as backup or to legally officiate.` |
| `Zoom Rehearsal` | `$99` | `A 30-minute rehearsal with your celebrant to review the flow and the delivery.` |
| `Custom Script Review` | `$129` | `We review your ceremony script and suggest improvements to make it shine.` |

### Section 3: GST Note
`FLAG (client): GST treatment not confirmed. Holding line below is neutral and makes no tax claim. Do not publish a specific GST statement until the client confirms inclusive or exclusive.`
**Holding line (neutral, safe to ship until confirmed):** `All prices are in Australian dollars. Your receipt will show the full breakdown.`
`Once confirmed, replace with one of: "All prices include GST." or "Prices are exclusive of GST."`

### Section 4: CTA
**Headline (<= 7 words):** `One Price. One Decision. Let's Go.`
**Primary CTA (<= 2 words):** `Book Now` -> `/book`
**Secondary link:** `How the friend led model works` -> `/how-it-works` (anchor: `how the friend led model works`)

### Schema notes (developer)
- Emit `Product` + `Offer` (`#package`) with the four `addOn` offers per seo.md Schema 3. No `aggregateRating` until real reviews exist. Add `priceSpecification.valueAddedTaxIncluded` only once GST is confirmed.

---

## About

### Meta
- Title: `Meet Sarah, Our Founder | Let's Get Wed` (40)
- Description: `Sarah became a registered celebrant over 300 hours of study to marry her own best friend in 2019, then built the Blueprint so more mates could do the same.` (155)
- OG Title: `Meet Sarah, the celebrant who built the Blueprint`
- OG Description: `Sarah trained 300+ hours to marry her best friend in 2019. Then she turned that coaching into the course that gets your mate ready.`

### Section 1: Hero
**H1 (visible, <= 4 words):** `Hi, I'm Sarah`
**Warm line:** `The celebrant who would rather make you a celebrant.`
**Portrait alt:** `Sarah, founder of Wedding Mates and a registered marriage celebrant, at the 2019 wedding where she married her best friend`

### Section 2: The Origin
**Heading (<= 8 words):** `Why I Became A Celebrant`
**Body (up to 4 paragraphs):**
`In 2019, my best friend asked me to marry her. Not as a guest, not as a bridesmaid. She wanted me to be the one standing at the front, leading the ceremony. There was just one problem: in Australia, that takes a registered celebrant.`
`So I became one. I am a Commonwealth-registered marriage celebrant, and I put in over 300 hours of study to get there. It cost time and money, and it was worth every minute. Standing up at her wedding and leading her ceremony was the proudest moment of my working life.`
`Because I was not a stranger reading a script. I knew their story. I knew the jokes that would land and the moments that would make the room go quiet. The ceremony felt like it belonged to them, because it did.`

### Section 3: The Feedback
**Heading (<= 8 words):** `What Their Friends Said`
**Body (2 paragraphs):**
`Afterwards, people kept saying the same thing. That it was the most personal ceremony they had ever been to. That it did not feel like a formality, it felt like the heart of the day.`
`And my friends were over the moon, not just with the wedding, but with the idea. They started asking if I could coach them to do the same thing for their people. That is when I realised this could be more than one ceremony.`

### Section 4: Why The Blueprint Exists
**Heading (<= 8 words):** `Why I Built The Blueprint`
**Body (2 paragraphs):**
`I could not personally lead every wedding, but I could teach. So I took everything I had learned, the interviewing, the writing, the structure, the delivery, the way to calm a racing heart, and turned it into the Blueprint. Eight modules that get your chosen person ready.`
`Now any couple can have a friend led ceremony that is both deeply personal and fully legal. Your mate brings the love and the voice. We bring the craft and handle the legals. Between us, your wedding gets the ceremony it deserves.`
`FLAG (client): Sarah's surname not provided in source; schema uses "Sarah" only. Supply full name and any celebrant registration detail to strengthen the credential. Do not invent a surname or registration number.`

### Section 5: CTA
**Headline (<= 7 words):** `Want Your Mate To Lead?`
**Primary CTA (<= 2 words):** `Book Now` -> `/book`
**Secondary soft link:** `Questions first? Contact me` -> `/contact`
**Internal link:** `the Blueprint and how it works` -> `/how-it-works`

### Schema notes (developer)
- Emit `Person` (Sarah, `#sarah`) per seo.md Schema 2, referenced by `Organization.founder`. Opening paragraph carries "registered marriage celebrant", "300 hours", "2019" in plain text.

---

## FAQ

`CONDITIONAL PAGE.` Ships only questions with client-approved answers. The two anxiety questions lead. Each rendered question is an H2/`<summary>` carrying the exact natural-language question (powers FAQ rich results and AI matching). Question 12 (refund/cancellation) is **omitted entirely** until the client supplies Terms.

### Meta
- Title: `Can a Friend Legally Marry You in Australia? FAQ | Let's Get Wed` (62; trim suffix if it overflows: `Friend Led Wedding FAQ | Let's Get Wed`)
- Description: `Your questions answered: how a friend led ceremony works in Australia, who handles the legals, the cost, and what your mate actually has to do.` (143)
- OG Title: `Friend led wedding ceremonies in Australia: your questions, answered`
- OG Description: `Is it legal? Can my friend do it? What does it cost? Honest answers about having a mate lead your ceremony.`

### Section 1: Intro
**H1 (visible):** `Friend Led Weddings: Your Questions, Answered`
**First paragraph (lead with the biggest question, answer the mechanism in the first two sentences):**
`Can a friend legally marry you in Australia? In short: your friend leads and delivers the ceremony, and a registered celebrant handles the legal side, so the marriage is fully valid. Below are honest answers to everything else couples ask us before they book.`

### Section 2: Grouped Accordions
Groups in order. Only ship questions whose answers are client-approved; the rest scaffold as an honest empty state.

**Group: Legality**

**Can a friend really marry us in Australia?**
`Yes. Your mate leads and delivers the ceremony, and a registered celebrant handles the legal side, the solemnisation and paperwork, so the marriage is fully valid. Your friend gets the personal moment; we make sure the legals are sorted.`
`FLAG (client): confirm exact mechanism wording.`

**Is a friend led ceremony actually legal?**
`Yes. In Australia, the law requires a Commonwealth-registered celebrant to handle the legal marriage. With Wedding Mates, a registered celebrant takes care of every legal requirement before the day, while your chosen mate leads the ceremony itself. You get a wedding that is both deeply personal and completely valid.`
`FLAG (client): confirm precise legal-mechanism wording.`

**Who handles the legal paperwork?**
`A registered celebrant. They take care of the legal solemnisation and the pre-ceremony paperwork before the day, so your mate can focus entirely on leading the ceremony and being present with you.`
`FLAG (client): confirm the exact celebrant arrangement.`

**Do you need a registered celebrant in Australia?**
`Yes. Australian law requires a Commonwealth-registered celebrant to legally marry a couple. That is exactly why we include one. Your mate brings the personal ceremony; the registered celebrant brings the legal validity. You do not have to choose between the two.`
`FLAG (client): confirm wording aligns with the chosen legal mechanism.`

**Group: The Mate (can they do it)**

**Can my friend pull this off if they have never done it?**
`That is exactly what the Blueprint course is for. Over eight modules it teaches your mate how to interview you, write your love story, structure the ceremony, and deliver it with confidence, including how to handle nerves. Most people who lead are not public speakers. They just love you, and we get them ready.`

**What does my mate actually have to do?**
`They work through the Blueprint course, around fifteen to seventeen hours across learning, interviewing you, writing, and rehearsing, then lead the ceremony on the day. We support them the whole way, by email or WhatsApp, whenever they get stuck.`

**Group: Pricing & Extras**

**What does it cost?**
`One package is $950, which includes the Blueprint course that trains your mate, the onboarding call, the templates and readings, and the legal handling. There are a few optional extras you can add at booking.`
`FLAG (client): confirm GST inclusive or exclusive before publishing.`

**What is included in the $950 package?**
`The Blueprint course (eight modules of training for your mate), an onboarding video call, templates and sample scripts, a readings and music library, performance strategies, and the legal requirements handled by a registered celebrant.`

**Is this cheaper than a traditional celebrant?**
`Often, yes. A traditional registered celebrant in Australia typically ranges from roughly $600 to $1,200 or more. Wedding Mates is one $950 package that also trains your own person and handles the legals, so you are not choosing between personal and professional.`
`FLAG (client): the competitor range is market context; present as a range, not a fixed claim.`

**Do we get a marriage certificate?**
`The official marriage certificate is an optional extra ($69), usually needed for name changes or visa applications. Your legal marriage is recorded regardless; the certificate is the formal document you can order.`
`FLAG (client): confirm wording.`

**Group: Logistics & Timing**

**How far in advance do we need to book?**
`The more time your mate has to work through the course and prepare, the better, ideally a few months out. If your wedding is less than four weeks away, we can still help; your legal marriage may be registered after the ceremony and we will guide you through it.`
`FLAG (client): confirm the under-4-weeks process wording; do not publish specifics unconfirmed.`

**Can we still get our marriage legally registered if we book close to the date?**
`Yes, we will guide you through it. For weddings under four weeks out, the legal registration may happen after the ceremony, and we make sure every step is completed smoothly.`
`FLAG (client): confirm exact process; do not detail unconfirmed steps.`

**Group: Refunds**
`OMITTED.` The refund/cancellation question (FAQ Brief Q12) does not ship until the client supplies Terms and a refund policy. Never fabricate refund terms.

### Section 3: Still Stuck CTA
**Headline (<= 8 words):** `Still Deciding? We're Here.`
**Body (1 line):** `Ask us anything before you book. Real, human answers.`
**Primary CTA (<= 2 words):** `Book Now` -> `/book`
**Secondary:** `Contact us` -> `/contact`

### Schema notes (developer)
- Emit `FAQPage` (`#faq`) built from the SAME data source as the rendered accordion, so schema text and visible text cannot drift. Include ONLY client-approved, visibly-rendered questions. No schema entry for any omitted or holding-flagged-out question.

---

## Reviews

`CONDITIONAL PAGE. EMPTY STATE.` No real, rights-cleared testimonials or love-story galleries exist yet. This page ships as an honest scaffold, never with fabricated quotes. The `Reviews` nav item stays hidden until content exists.

### Meta (rendered only when content exists)
- Title: `Real Friend Led Wedding Stories | Let's Get Wed` (47)
- Description: `Couples and the mates who married them share how a friend led ceremony felt more personal than a stranger ever could.` (118)
- OG Title: `Friend led wedding stories, in their own words`
- OG Description: `Couples and the mates who married them on what a friend led ceremony really felt like.`

### Section 1: Intro
**H1 (visible):** `Stories From The Couples And Their Mates`
**Intro line:** `Real weddings, led by real friends. Their words, coming soon.`

### Section 2: Testimonials
`EMPTY STATE:`
**Heading:** `Real Stories, On The Way`
**Body:** `We are gathering reviews from couples and the mates who married them. We would rather show you real words than invented ones, so this space is honestly empty for now. If you have been married through Wedding Mates and would like to share your story, we would love to hear it.`
**Soft CTA:** `Share your story` -> `/contact`
`FLAG (client): supply real, rights-cleared testimonials with attribution (couple plus the mate who led). No Review or AggregateRating schema until then.`

### Section 3: Featured Love Stories
`EMPTY STATE (hidden until rights confirmed):`
- Placeholder couples referenced in source: Kat+David, Kristi+Mark.
`FLAG (client): confirm photo rights and correct names before any gallery ships. Do not use stock or AI imagery in their place.`

### Section 4: CTA
**Headline (<= 8 words):** `Write Your Own Wedding Story`
**Primary CTA (<= 2 words):** `Book Now` -> `/book`

---

## Blog

`CONDITIONAL PAGE. EMPTY STATE.` The live site's blog is lorem ipsum. No real posts exist. The blog ships as an honest empty index and is excluded from the sitemap until at least one real post exists. Do not publish placeholder articles.

### Meta (rendered only when >= 1 real post exists)
- Title: `Wedding Inspiration and Ceremony Tips | Let's Get Wed` (52)
- Description: `Ideas, scripts and confidence for couples and the mates leading their ceremony, from the team behind the Blueprint course.` (122)
- OG Title: `Wedding inspiration and ceremony tips`
- OG Description: `Ideas and confidence for couples and the mates leading their ceremony.`

### Section 1: Intro
**H1 (visible):** `Wedding Inspiration And Ceremony Tips`
**Intro line:** `Ideas, scripts, and confidence for couples and the mates leading their day.`

### Section 2: Index
`EMPTY STATE:`
**Heading:** `New Stories Coming Soon`
**Body:** `We are writing guides for couples planning a friend led wedding and for the mates getting ready to lead one. How to officiate for a friend, what to say, how to calm the nerves. Real, useful, no fluff. Check back soon, or get started while you wait.`
**Soft CTA:** `Have your friend lead your ceremony` -> `/how-it-works`
`FLAG (client): real blog posts needed (mate-side how-to cluster per seo.md). No lorem, no fabricated articles. Blog stays out of the sitemap until a real post ships.`

### Blog post template (`/blog/[slug]`) -- scaffold only
`CONDITIONAL.` Per real post, when supplied:
- **H1:** the natural-language question the post answers.
- **First paragraph:** answers it directly (answer-first for snippet + AI extraction).
- **Body:** editorial measure (60-70 chars), real content only.
- **Closing CTA block:** `Ready for your own day?` + `Book Now` -> `/book`.
- **Hero image alt:** describes the real image; never describe a placeholder as a real couple.
- Schema: `BlogPosting` + `BreadcrumbList` only when the real post exists; no fabricated dates or authors.

---

## Contact

### Meta
- Title: `Contact Let's Get Wed | Friend Led Weddings` (43)
- Description: `Questions about having a friend lead your ceremony? Email sarah@letsgetwed.com.au or message us on WhatsApp. We are happy to help before you book.` (146)
- OG Title: `Got questions? Let's talk.`
- OG Description: `Email Sarah or message us on WhatsApp. Real, human answers before you book.`

### Section 1: Intro
**H1 (visible):** `Got questions? Let's talk.`
**First paragraph (carries the contact entity in plain text):**
`Not quite ready to book, or just want to talk it through first? That is completely normal. Email Sarah at sarah@letsgetwed.com.au or message us on WhatsApp at 0410 820 300. You will get a real, human reply.`

### Section 2: Form
**Form heading (<= 6 words):** `Send us a message`
**Fields (all visibly labelled):**
- Label: `Your name` · placeholder: `First and last name`
- Label: `Email address` · placeholder: `you@example.com`
- Label: `Your message` · placeholder: `Tell us a little about your wedding and what you would like to know.`
**Submit button (<= 3 words):** `Send Message`
**Form microcopy:**
- Success: `Thanks, your message is on its way. We will be in touch soon.`
- Error (generic): `Something went wrong sending that. Try again, or email us directly at sarah@letsgetwed.com.au.`
- Required-field error: `This one is needed so we can reply.`
- Invalid email: `That email does not look quite right. Mind checking it?`

### Section 3: Direct Contact
**Heading (<= 6 words):** `Or reach us directly`
- Email label: `Email` · value: `sarah@letsgetwed.com.au`
- WhatsApp label: `WhatsApp` · value: `0410 820 300` (one-tap `tel:`/`wa.me` link on mobile)

### Section 4: Soft Convert
**Line:** `Ready now? Skip the wait and start your booking.`
**Primary CTA (<= 2 words):** `Book Now` -> `/book` (anchor: `ready now, book your ceremony`)

---

## Terms

`CONDITIONAL PAGE. EMPTY STATE.` No client-supplied legal copy or refund policy exists. Ship a labelled placeholder route; never fabricate terms. Excluded from the sitemap until real terms exist.

### Meta
- Title: `Terms and Conditions | Let's Get Wed`
- Description: `The terms and conditions for Wedding Mates bookings and the Blueprint course.`

### Body
**H1 (visible):** `Terms and Conditions`
`EMPTY STATE:` `Our full terms and conditions, including the refund and cancellation policy, are being finalised. If you have a question about your booking in the meantime, email sarah@letsgetwed.com.au and we will help.`
`FLAG (client): supply Terms and a refund/cancellation policy. No fabricated terms ship. Until then this route is noindex-scaffolded and omitted from the sitemap.`

---

## Privacy

`HOSTED PAGE (Vonzie Nexus).` Per agency rules, do NOT write privacy or cookie policy content. The Nexus CMP provides the hosted, continuously-updated privacy and cookie pages post-launch. This route is a labelled placeholder until the Nexus link is wired.

### Meta
- Title: `Privacy Policy | Let's Get Wed`
- Description: `How Wedding Mates handles the personal information collected when you book or contact us.`

### Body
**H1 (visible):** `Privacy Policy`
`PLACEHOLDER:` `Our privacy policy will be available here shortly. It covers how we handle the personal information you provide when you book or get in touch, in line with the Australian Privacy Act.`
`FLAG (developer): link to the Vonzie Nexus hosted privacy page during CMP integration. Do not author custom privacy copy.`

---

## Booking Wizard

The 7-step conversion engine. Calm register: the cue chip is the only loud carry-over; no confetti, no poster-scale type, no saturated background fields, EXCEPT the Step 7 confirmation beat (the one permitted eruption). Minimal booking header replaces the marketing nav. Field labels below are verbatim from the source booking doc + Content Constraints Brief; do not paraphrase them.

### Booking header (all steps)
- Logo -> `/` (the brand mark only, no marketing nav)
- Progress label (mobile): `Step {n} of 7: {label}`
- Save affordance: `Save & exit`
- Support affordance: `Need a hand? Message Sarah`

### Stepper labels (7 segments, verbatim)
`Date` · `Details` · `Celebrant` *(Optional)* · `Location` *(Optional)* · `Extras` · `Payment` · `Done`

### Save / resume microcopy
- Saved toast: `Saved. You can pick up right here any time.`
- Resume banner (returning user): `Welcome back. We saved your progress at "{step label}".`

---

### Step 1 -- Date
**Cue chip:** `STEP 1 · YOUR WEDDING DATE`
**Heading (<= 5 words):** `When's the big day?`
**Field label (verbatim):** `Wedding date`
**Field helper:** `Select your wedding ceremony date.`
**Conditional legal note (shown when date is < 4 weeks out, verbatim, reassuring, max 2 sentences):**
`Less than 4 weeks away? No problem. Your legal marriage will be registered after the ceremony and we'll guide you through it.`
**Validation error (no/invalid date):** `Pick your wedding date so we can plan the legal steps around it.`
**Primary action (<= 3 words):** `Continue`

---

### Step 2 -- Details (required gate)
**Cue chip:** `STEP 2 · YOUR DETAILS`
**Heading (<= 5 words):** `A bit about you two`
**Field labels (verbatim from booking doc):**
- `Your full name` · placeholder: `Your name`
- `Partner's full name` · placeholder: `Your partner's name`
- `Email address` · placeholder: `you@example.com`
- `Mobile number` · placeholder: `04XX XXX XXX`
- `Home suburb` · helper (verbatim): `Used to plan your legal face-to-face meeting`
- `Preferred contact method` · options: `Email` / `Phone` (default `Email`)
**Validation errors:**
- Name missing: `We'll need your name to get started.`
- Partner name missing: `And your partner's name too.`
- Email invalid: `That email does not look quite right.`
- Mobile invalid: `Pop in a valid Australian mobile number.`
- Suburb missing: `Your suburb helps us plan the legal meeting.`
**Primary action (<= 3 words):** `Continue`

---

### Step 3 -- Celebrant (Optional)
**Cue chip:** `STEP 3 · YOUR CELEBRANT`
**Heading (<= 4 words):** `Who's your mate?`
**Helper (<= 8 words):** `You can add this now or later.`
**Checkbox label (verbatim):** `We haven't chosen one yet`
**Field labels (verbatim, shown when checkbox is unticked):**
- `Name of your chosen celebrant` · placeholder: `Their full name`
- `Email` · placeholder: `Their email`
- `Phone` · placeholder: `Their mobile`
**Skip link:** `Skip for now`
**Primary action (<= 3 words):** `Continue`

---

### Step 4 -- Location (Optional)
**Cue chip:** `STEP 4 · CEREMONY LOCATION`
**Heading (<= 4 words):** `Where will it happen?`
**Field label (verbatim):** `Ceremony location`
**Field helper (verbatim):** `A venue, a backyard, a beach, anywhere`
**Skip link:** `Skip for now`
**Primary action (<= 3 words):** `Continue`

---

### Step 5 -- Extras (running total)
**Cue chip:** `STEP 5 · OPTIONAL EXTRAS`
**Heading (<= 5 words):** `Want to add anything?`
**Intro line:** `All optional. Add what you like, skip the rest.`
**The 4 extras (verbatim title + price + 1-line description from the booking doc):**

| Toggle title | Price | Description |
|---|---|---|
| `Official Marriage Certificate` | `$69` | `Only required for name changes and visa applications.` |
| `Celebrant in Attendance on Your Wedding Day` | `$299` | `A registered celebrant attends in person as backup or to legally officiate.` |
| `Zoom Rehearsal with Your Celebrant` | `$99` | `30-minute rehearsal to review flow and delivery.` |
| `Custom Script Review` | `$129` | `We'll review your script and suggest improvements.` |

**Running-total line (always visible):** `Base $950 + extras = ${total}`
**Toggle state microcopy:**
- Added: `Added`
- Add: `Add`
**Primary action (<= 3 words):** `Continue to payment`

---

### Step 6 -- Payment
**Cue chip:** `STEP 6 · PAYMENT`
**Heading (<= 3 words):** `Secure checkout`
**Order-summary microcopy:**
- Summary heading: `Your order`
- Base line: `Wedding Mates package` ... `$950`
- Each selected extra line: `{extra name}` ... `${price}`
- GST line: `FLAG (client): GST line pending confirmation. Holding line: "All prices in AUD."` Do not assert a tax status until confirmed.
- Total line: `Total` ... `${total}`
**Pay button (shows the live amount, strong contrast in every state):** `Pay ${total}`
**Trust line (1 sentence):** `Secure payment via Stripe. Questions? Message Sarah any time.`
**Payment error states:**
- Card declined: `That card was declined. Try another, or message us and we'll sort it.`
- Generic failure: `Payment did not go through. No charge was made. Please try again.`
- Processing: `Processing your payment, one moment.`
**Disabled-button helper (until valid):** `Add your card details to continue.`

---

### Step 7 -- Confirmation & Access (`/book/confirmation`)
The one permitted loud beat in the entire wizard: a full Hype Line with the single confetti burst.

**Cue chip:** `THE KISS`
**Hype Line (the celebration peak):** `[ THE KISS ]  And just like that, you're *married*.`
**Heading (<= 6 words, accessible H1):** `You're booked. Let's get you wed.`
**Order-reference line:** `Your booking reference is {orderRef}. A receipt is on its way to your inbox.`
**Sub-line:** `Everything your mate needs is ready and waiting.`

**"What happens next" checklist (items <= 10 words, mirrors the email):**
- `Your course login is in your inbox.`
- `Download your timeline checklist to map the journey.`
- `Book your onboarding call: legal steps, support, and Q&A.`
- `Celebrant welcome pack sent if you gave us their contact.`

**Primary CTA (<= 4 words):** `Go to your course` -> `/course`
**Secondary CTA:** `Book your onboarding call`
**Pending state (while the Stripe webhook settles):** `Confirming your payment, this only takes a moment.`

> Transactional email (Resend) is kept in sync with this screen: login details, timeline checklist download, onboarding-call link, and the optional celebrant welcome pack. Email copy mirrors the checklist above; subject line: `You're booked. Welcome to Wedding Mates.`

---

## Auth

Calm register, centred single card, booking-style chrome (logo only). Every input visibly labelled (no placeholder-only labels). Buttons keep AA contrast in every state.

### Login (`/login`)
**Heading (<= 3 words):** `Welcome back`
**Sub-line:** `Sign in to pick up where you left off.`
**Field labels:**
- `Email address` · placeholder: `you@example.com`
- `Password` · placeholder: `Your password`
**Primary button (<= 2 words):** `Sign in`
**Links:** `Forgot password?` -> `/forgot-password` · `New here? Create account` -> `/register`
**Error (bad credentials):** `That email or password did not match. Give it another go.`
**Error (locked/too many attempts):** `Too many tries. Wait a moment, then try again or reset your password.`

### Register (`/register`)
**Heading (<= 3 words):** `Create your account`
**Sub-line:** `Set up your login so you can start the course.`
**Field labels:**
- `Your name` · placeholder: `First and last name`
- `Email address` · placeholder: `you@example.com`
- `Password` · helper (<= 10 words): `At least 8 characters, with a number.`
- `Confirm password` · placeholder: `Type it again`
**Primary button (<= 2 words):** `Create account`
**Link:** `Already have an account? Sign in` -> `/login`
**Note (small):** `Most accounts are set up automatically when the couple books. This page is for a mate invited to join.`
**Errors:**
- Email taken: `That email already has an account. Try signing in.`
- Password too weak: `Make it a little stronger: 8+ characters with a number.`
- Passwords mismatch: `Those two passwords do not match.`

### Forgot Password (`/forgot-password`)
**Heading (<= 3 words):** `Reset your password`
**Sub-line:** `Enter your email and we'll send a reset link.`
**Field label:** `Email address` · placeholder: `you@example.com`
**Primary button (<= 3 words):** `Send reset link`
**Success state:** `Check your inbox. If that email has an account, a reset link is on its way.`
**Link:** `Back to sign in` -> `/login`

### Reset Password (`/reset-password`)
**Heading (<= 4 words):** `Set a new password`
**Sub-line:** `Choose a new password for your account.`
**Field labels:**
- `New password` · helper (<= 10 words): `At least 8 characters, with a number.`
- `Confirm new password` · placeholder: `Type it again`
**Primary button (<= 2 words):** `Save password`
**Success state:** `Password saved. Signing you in.`
**Errors:**
- Token expired: `That reset link has expired. Request a new one and we'll resend it.`
- Passwords mismatch: `Those two passwords do not match.`

---

## Course Shell

Framing, navigation, and encouragement only. The mate-facing coaching voice (calm register: a coach's hand on the shoulder, permission to be imperfect). The 8 module body texts and the introduction body are NOT re-transcribed here; they live verbatim in `course-layout.txt` and load as content data. Module card titles, blurbs, the locked/paywall copy, the resources intros, and the complete-and-continue microcopy are below.

### Course Dashboard (`/course`)
**Welcome heading (<= 4 words):** `Welcome, {firstName}`
**Sub-line:** `You were asked because they trust you. Let's get you ready.`
**Progress label:** `{n} of 9 complete`
**Primary CTA (<= 2 words):** `Continue learning` -> deep-links to the in-progress lesson
**First-visit variant (no progress yet):** primary CTA `Start the course` -> `/course/introduction`

**Module-tree intro line:** `Work through these in order. Finish one to unlock the next.`

**Module cards (title <= 7 words, summary <= 12 words, status shown):**

| Card title | Card blurb (summary) | Est. time chip |
|---|---|---|
| `Introduction` | `What you get, how it works, and how to plan your time.` | `~20 min` |
| `Module 1: Interviewing Your Couple` | `Ask the questions that uncover the story behind the facts.` | `~30 min` |
| `Module 2: Structuring The Ceremony` | `Map every element, from the welcome to the walk-out.` | `~30 min` |
| `Module 3: Writing Your Love Story` | `Turn your interview notes into a first draft that flows.` | `~30 min` |
| `Module 4: Adding Heart And Personality` | `Edit with fresh eyes and turn facts into feelings.` | `~25 min` |
| `Module 5: Music, Readings And Vows` | `Add the finishing touches that make it personal.` | `~30 min` |
| `Module 6: Prompts And Other People` | `Cue music, readers, and the kiss so the day flows.` | `~25 min` |
| `Module 7: Delivering With Confidence` | `Pace, nerves, and presence. The part you secretly fear, sorted.` | `~35 min` |
| `Module 8: The Wrap Up` | `A recap, your final checklist, and you are ready.` | `~15 min` |

**Resources block heading:** `Resources`
- `Readings Library` -> `/course/readings`
- `Performance Strategies` -> `/course/strategies`
- `All Downloads`

**Support block (always visible):**
- Heading: `Stuck? Message Sarah`
- Line: `Real, human support to keep you on track.`
- Email: `sarah@letsgetwed.com.au` · WhatsApp: `0410 820 300`

### Course locked / paywall (`/course/locked`)
**Heading (<= 4 words):** `Your course is waiting`
**Body:** `Course access comes with the $950 Wedding Mates booking. Once the couple books, your login and the full Blueprint land in your inbox.`
**Primary CTA (<= 2 words):** `Book Now` -> `/book`
**Secondary link:** `Already booked? Contact support` -> `/contact`

### Lesson-page framing (intro + Modules 1-8)
The framing/navigation copy that wraps every lesson. The body text itself loads from `course-layout.txt`.

**Lesson header:**
- Module number + title (from the card titles above)
- Estimated-time chip (from the table above)
- Progress indicator: `Lesson {x} of 9`

**Video slot placeholder (verbatim, <= 12 words):** `Video coming soon. The full written guide is below.`

**Encouragement asides (mate-facing coaching voice, rendered as callout boxes where the source text invites them; these are framing, the source supplies the lesson-specific ones too):**
- Intro aside: `Take it one module at a time. There is no rush, and we are here the whole way.`
- Mid-course aside: `Going well? Take a break, then come back with fresh eyes. The best edits happen on a different day.`
- Pre-delivery aside: `Nervous about standing up? Good. That means you care. We will turn those nerves into energy.`

**Downloads section:**
- Heading: `Download for this module`
- Download card label = the resource's real name (from `course-layout.txt`).
- Pending-download card (Module 5 "Guide to writing vows", Module 7 "Tips to calm nerves on the day"): `Coming soon. We'll add this download shortly.`
  `FLAG (client): 2 download links missing in source. Render as pending cards; never fabricate a link.`
  `FLAG (client): source has a vows-guide placement inconsistency between Module 5 and Module 6 ("The ultimate vows blueprint"). Confirm which module owns the vows download.`

**Complete & continue:**
- Primary button (<= 4 words): `Mark complete and continue`
- Secondary: `Back` -> previous lesson
- Last-lesson variant (after Module 8): `Finish the course`

**Module 8 finish state (celebratory but calm, mate-facing):**
- Heading: `You're ready.`
- Body: `You have everything you need to lead a ceremony your couple will never forget. Run through the final section of your Module 1 checklist, then go and do something amazing.`
- Pointer: `Open your Module 1 checklist` -> the checklist download

**Support footer (repeated on every lesson):** `Stuck? Message Sarah` (email + WhatsApp, as above)

### Readings Library (`/course/readings`)
**Heading (<= 6 words):** `Readings to personalise your ceremony`
**Intro (<= 1 short paragraph):** `A reading gives the ceremony room to breathe and gives you a moment off the microphone. Browse these collections with your couple and pick the ones that sound like them.`

**The 5 Canva collections (title <= 6 words, description <= 12 words; links open in a new tab):**

| Collection title | Description | Link |
|---|---|---|
| `Readings For Young People` | `Gentle, simple readings that younger guests can deliver with confidence.` | Canva (new tab) |
| `Song Lyrics` | `Lyrics from meaningful songs, ready to read as a passage.` | Canva (new tab) |
| `Literary And Poetic` | `Excerpts from poetry and literature for a timeless touch.` | Canva (new tab) |
| `Romantic Readings` | `Warm, heartfelt passages for the emotional heart of the day.` | Canva (new tab) |
| `Funny And Light-Hearted` | `Readings that bring a laugh and lift the whole room.` | Canva (new tab) |

**Open link label:** `Open collection`

### Performance Strategies (`/course/strategies`)
**Heading (<= 6 words):** `Confidence for the big day`
**Intro (<= 1 short paragraph):** `Come back to this page before the ceremony. These are the techniques that calm the nerves and help you deliver with warmth, even if you have never spoken in front of a crowd.`

**Technique reference cards (title <= 6 words, 1 short paragraph each; mate-facing coaching voice):**

- **`Reframe Nerves As Excitement`** -- `Your body reacts to nerves and excitement the exact same way. When the nerves hit, tell yourself this is your body getting excited about how great it will be. Picture the best version of the day.`
- **`The 3-3-3 Breath`** -- `While you wait for the couple to arrive, breathe in for 3 seconds, hold for 3, out for 3. It slows your body down and settles your mind.`
- **`Find A Friendly Face`** -- `Ask a friend to give you a little smile when you look their way. Seeing it releases the feel-good chemicals that lower stress and lift your confidence.`
- **`Ground Yourself`** -- `Remind yourself: the ceremony does not need to be perfect. After the first few lines, you will find your rhythm. Your couple believe in you, that is why they asked.`
- **`Make Eye Contact`** -- `Look up from your notes often. If the whole crowd feels like a lot, pick three spots in the room and rotate between them. It reads as full eye contact.`
- **`Smile`** -- `Even a forced smile sends signals to your brain that release endorphins and serotonin. It calms you and it lifts the guests at the same time.`
- **`Handle The Unexpected`** -- `Lost your place? Say so, take a second, find it again. Sound system drops out? Restart it. A real, human moment often makes the ceremony more memorable, not less.`

**Support footer:** `Stuck? Message Sarah` (email + WhatsApp)

---

## Schema Markup Notes (developer summary)

Per `seo.md` Structured Data Plan:
- **Root layout (all pages):** `Organization` (`#organization`, type Organization NOT LocalBusiness; `name` "Let's Get Wed", `alternateName` "Wedding Mates", `email` sarah@letsgetwed.com.au, `telephone` +61410820300, `areaServed` Australia) + `WebSite`. `sameAs` left empty until the client supplies real social URLs; do not fabricate.
- **Home:** inherits Organization/WebSite; optional `@id` references to Product and Course. Home FAQ is visible-only (no duplicate FAQPage).
- **How It Works:** `Course` (`#blueprint`).
- **Pricing:** `Product` + `Offer` (`#package`) with 4 addOn offers; no aggregateRating until real reviews; GST priceSpecification only once confirmed.
- **FAQ:** `FAQPage` (`#faq`), built from the same data as the rendered accordion, approved questions only.
- **About:** `Person` (Sarah, `#sarah`).
- **Reviews / Blog:** Review/AggregateRating and BlogPosting/BreadcrumbList only when real, rights-cleared content exists.
- **Functional + gated + design-book:** NONE (noindex).

## Content honesty flags (carried to the developer, never fill with filler)
- FAQ answers flagged `FLAG (client)`: ship general form now; tighten on client confirmation. Refund question omitted entirely.
- GST line: neutral holding copy only until confirmed.
- Legal-mechanism wording: general safe form only until confirmed; never publish an unconfirmed legal procedure.
- Featured love stories (Kat+David, Kristi+Mark): hidden until rights confirmed.
- Reviews / testimonials: honest empty state; no fabricated quotes; no review schema.
- Blog: honest empty index; no lorem posts; excluded from sitemap until a real post ships.
- Terms / refund policy: placeholder route only until client supplies copy.
- Privacy: Vonzie Nexus hosted; no custom privacy copy authored.
- 2 missing course downloads (Module 5 vows guide, Module 7 nerves tips): pending cards, never fabricated.
- Module 5/6 vows-download placement inconsistency: flagged for client.
- Analytics IDs (GA4/Meta/Plausible): not provided; flagged elsewhere; no fabricated copy depends on them.
- Brand-name primary: `FLAG (decision)` Wedding Mates vs Let's Get Wed (see top of file).
- Sarah's surname: not provided; not invented.

---

WROTE: docs/artifacts/page-copy.md -- 720 lines, sections: [How to read this file, Global Copy, Home, How It Works, Pricing, About, FAQ, Reviews, Blog, Contact, Terms, Privacy, Booking Wizard, Auth, Course Shell, Schema Markup Notes]
