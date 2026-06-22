# SEO
**Phase:** 2
**Agent:** findability-expert
**Date:** 2026-06-21
**Status:** draft

---

> **Business archetype:** Service / personal brand with a productised offer (one $950 package), national (Australia-wide) reach, NOT geographically bound to a single suburb. This is the seam between two archetypes in the skill: a **Service brand** (Sarah, the method, the celebrant layer) and a **Product / course** (the $950 package + the gated Blueprint course). It is NOT a local brick-and-mortar business.
>
> Three consequences run through this whole document:
> 1. **No Google Business Profile, no local citations, no Maps optimisation as a primary lever.** The service is delivered Australia-wide (online course + a registered celebrant who handles legals). There is no walk-in location to rank. We use `Organization` (not `LocalBusiness`), and `areaServed: Australia`. (If the client later confirms Sarah operates from a fixed studio that takes in-person meetings, revisit `LocalBusiness` then, not now.)
> 2. **The entity is the method, not a place.** People will find this by asking a question ("can my best friend marry us in Australia?"), not by searching "[business] near me". So the work is weighted hard toward **answer-shaped content, question keywords, and AI-surface entity clarity**, with `Product`/`Offer`, `Course`, and `FAQPage` schema carrying the structured-data load.
> 3. **Two-sided keyword map.** Couple-intent (find / decide / book) is the commercial core. Mate-intent (how do I write and deliver a ceremony, what do I say, how do I calm nerves) is an informational content opportunity that the course already answers internally; surfacing a slice of it publicly is the cheapest qualified-traffic play this brand has.
>
> **Legal-honesty constraint (governs every word here).** In Australia only a Commonwealth-registered marriage celebrant can legally solemnise a marriage. Wedding Mates trains the friend to **lead and deliver** the ceremony while a **registered celebrant handles the legal solemnisation/paperwork**. No keyword target, meta description, FAQ answer, schema field, or LLM seed in this document may imply that an untrained friend legally signs or solemnises the marriage. The truthful framing used throughout: *your mate leads the ceremony; a registered celebrant handles the legals.* This is both an ethics rule and an SEO rule (a misleading claim is a quality and trust liability with Google and with LLMs). Where a high-volume keyword is literally phrased as a legal claim (e.g. "can a friend legally marry you in Australia"), we target it with an honest, nuanced answer, never by echoing a false promise.
>
> **Domain assumption:** production domain `https://letsgetwed.com.au` (confirm before launch; current build is on a dev staging subdomain). Every absolute URL below uses that host. If the final host differs, find-and-replace the host and re-issue canonicals + sitemap.

---

## Keyword Map

Intent legend: **I** = informational, **C** = commercial-investigation, **T** = transactional, **N** = navigational. Side: **Couple** (buyer) or **Mate** (student). Volume notes are directional for the AU market, not measured; treat them as relative priority, not absolute numbers, and let the client's own search-console data refine them after launch.

### Couple-side (commercial core, drives `/book`)

| Keyword / query | Intent | Side | Target Page | Priority |
|---|---|---|---|---|
| can a friend marry you in australia | I/C | Couple | `/` + `/faq` | high |
| can my friend be my celebrant australia | I/C | Couple | `/how-it-works` + `/faq` | high |
| can a friend legally marry you in australia | I | Couple | `/faq` (honest nuance) | high |
| have a friend marry us legally australia | C | Couple | `/how-it-works` | high |
| friend led wedding ceremony | C | Couple | `/` | high |
| best mate wedding ceremony australia | C | Couple | `/` | high |
| alternative to a wedding celebrant | C | Couple | `/how-it-works` | high |
| friend officiant wedding australia | C | Couple | `/how-it-works` | high |
| have a friend officiate your wedding australia | C | Couple | `/how-it-works` | medium |
| get married by a friend australia | C | Couple | `/` | high |
| personal wedding ceremony not a stranger | C | Couple | `/` | medium |
| wedding celebrant alternative cost | C | Couple | `/pricing` | medium |
| friend led wedding ceremony cost | C | Couple | `/pricing` | medium |
| how much does a friend led wedding cost | C | Couple | `/pricing` | medium |
| wedding mates | N | Couple | `/` | high |
| let's get wed | N | Couple | `/` | high |
| sarah let's get wed celebrant | N | Couple | `/about` | low |
| book friend led wedding ceremony | T | Couple | `/book` | high |
| intimate personal wedding ceremony australia | C | Couple | `/` | medium |
| who handles the legals friend wedding australia | I | Couple | `/faq` + `/how-it-works` | medium |

### Mate-side (informational content opportunity, course-adjacent)

These feed `/blog` posts (CONDITIONAL on real posts) and the publicly-indexable on-ramp to the gated course. They pull qualified people who are about to be asked to officiate; the page converts the *couple* (book the package), and reassures the *mate*. Do NOT index course lesson bodies for these; surface answer-shaped public content instead.

| Keyword / query | Intent | Side | Target Page | Priority |
|---|---|---|---|---|
| how to officiate a wedding for a friend australia | I | Mate | `/blog/[slug]` (CONDITIONAL) + `/how-it-works` | high |
| what to say when officiating a friend's wedding | I | Mate | `/blog/[slug]` (CONDITIONAL) | medium |
| how to write a wedding ceremony for a friend | I | Mate | `/blog/[slug]` (CONDITIONAL) | medium |
| friend officiating wedding nerves tips | I | Mate | `/blog/[slug]` (CONDITIONAL) | medium |
| wedding ceremony script structure | I | Mate | `/blog/[slug]` (CONDITIONAL) | low |
| how to deliver a wedding ceremony confidently | I | Mate | `/blog/[slug]` (CONDITIONAL) | low |
| asked to officiate a wedding what now australia | I | Mate | `/blog/[slug]` (CONDITIONAL) + `/how-it-works` | medium |

### DIY / legality long-tail (high reassurance value, answer with honesty)

| Keyword / query | Intent | Side | Target Page | Priority |
|---|---|---|---|---|
| diy wedding ceremony australia legal | I | Couple | `/faq` | medium |
| self uniting marriage australia | I | Couple | `/faq` (honest: not available in AU the US way) | medium |
| do you need a registered celebrant in australia | I | Couple | `/faq` | medium |
| can you get married without a celebrant australia | I | Couple | `/faq` | low |
| how to get married by your best friend legally | I | Couple | `/faq` | medium |

### What each page "owns" (one primary target per indexable page)

| Page | Primary keyword it owns | Secondary support |
|---|---|---|
| `/` (Home) | friend led wedding ceremony | get married by a friend australia; best mate wedding ceremony |
| `/how-it-works` | can my friend be my celebrant australia | alternative to a wedding celebrant; friend officiant australia |
| `/pricing` | friend led wedding ceremony cost | wedding celebrant alternative cost |
| `/faq` | can a friend legally marry you in australia | diy wedding ceremony australia legal; do you need a registered celebrant |
| `/about` | sarah let's get wed celebrant (brand/founder) | (low-volume, trust page, not a traffic target) |
| `/reviews` | (CONDITIONAL) friend led wedding reviews | (trust, not a traffic target until content exists) |
| `/blog` + posts | (CONDITIONAL) how to officiate a wedding for a friend australia | the mate-side cluster above |
| `/contact` | (navigational only) wedding mates contact | not a traffic target |

**Functional surfaces (`/book`, `/book/confirmation`, all `/login` `/register` `/forgot-password` `/reset-password`, all `/course/*`, `/design-book`) target NO keywords and are NOINDEX.** See Sitemap/Robots Config.

---

## Placement Guidelines

### Per-Page Keyword Placement

#### `/` (Home)
- **H1:** must contain the human-readable promise and the entity. The brand lockup "GET WED YOUR WAY" is the display hero (Hype Line, <= 3 words per the Content Constraints Brief), so the *true H1 for crawlers and AI* should be a single semantic `<h1>` that carries "friend led wedding ceremony" plainly. Recommended pattern: visible Hype Line lockup is styled, and the accessible H1 reads "Get wed your way: a friend led wedding ceremony, legally sorted." (one `<h1>` element; do not ship two competing H1s). If the design insists the lockup is the only on-screen H1, add the keyword to the immediately following subhead and the first paragraph instead, and keep the meta title carrying the term.
- **First paragraph (hero subhead + opening body):** weave "best mate marrying you" and "friend led wedding ceremony" naturally. The approved verbatim line "Say I do with your best mate marrying you. More laughter. More tears. More magic." already carries the emotional half; the SEO half ("a friend led wedding ceremony, with the legals handled") belongs in the first body paragraph under the hero or in Section 2.
- **Subheadings (H2/H3):** Section 2 reframe "Why Choose A Celebrant, When You Could Choose A Mate?" (carries "celebrant" + "mate"); Section 4 "Yes, Your Mate Can Really Marry You" (carries the legality query, the single most-searched reassurance); Section 3 step titles carry the process; Section 6 pricing teaser carries "$950" and "package".
- **CTA context:** primary CTA visible label "Book Now" / "Start Your Script"; the surrounding microcopy can carry "book your friend led ceremony" so the transactional intent term sits near the conversion control.

#### `/how-it-works`
- **H1:** include "can my friend be my celebrant" semantically, e.g. "How a friend leads your ceremony (and who handles the legals)". <= 6 words is the design limit on the visible hero; if the limit forces a shorter lockup, push the full phrase into the first H2.
- **First paragraph:** "can my friend be my celebrant in Australia" answered plainly in the first two sentences with the honest mechanism (friend leads, registered celebrant solemnises).
- **Subheadings:** "Who does what" responsibility split is a high-value H2 (couple / mate / we handle the legals); the 4-step blocks each get an H2/H3 carrying a process verb.
- **CTA context:** "Book your friend led ceremony" framing near each CTA.

#### `/pricing`
- **H1:** "$950" and the value term: "One price for a friend led wedding ceremony" or "What a friend led ceremony costs: $950". The number in the H1 is good for both humans deciding and for AI answering "how much does it cost".
- **First paragraph:** state the price plainly, in crawlable text (not in an image), with "includes the Blueprint course and the legal handling".
- **Subheadings:** "What's included" (the 8 inclusions); "Optional extras" (the 4 add-ons, each with its AUD price in text); a plain "GST" line once confirmed.
- **CTA context:** "Book now for $950".

#### `/faq`
- **H1:** "Friend led wedding ceremonies in Australia: your questions, answered" (carries the entity + the AU qualifier).
- **First paragraph:** lead with the single biggest question ("Can a friend legally marry you in Australia?") and answer the honest mechanism in the first two sentences, because that opening is what an LLM and a featured snippet extract.
- **Subheadings:** each FAQ question is an H2 or `<summary>`/`<dt>` carrying the exact natural-language question (this is what powers FAQ rich results AND what AI surfaces match against). Use the real question text, not a keyword-stuffed paraphrase.
- **CTA context:** "Still deciding? Book now" at the end, plus a soft contact link.

#### `/about`
- **H1:** "Hi, I'm Sarah" is the approved brand H1; that is fine for a founder/trust page (low search-traffic target). Add "registered celebrant" and "the Blueprint" inside the first paragraph so the entity Sarah -> registered celebrant -> the method is crawlable and feeds the knowledge-graph link between the person and the organisation.
- **First paragraph:** "registered marriage celebrant", "300 hours of study", "2019" so the credential is in plain text for both trust and entity clarity.
- **Subheadings:** the origin / the feedback / why the Blueprint exists. No keyword pressure here; this page earns trust, not rankings.

#### `/blog` + `/blog/[slug]` (CONDITIONAL)
- Only if real posts exist. Each post H1 = the natural-language question it answers (mate-side cluster). First paragraph answers it directly (answer-first structure for snippet + AI extraction). Every post ends with a "ready for your own day? book now" CTA block linking `/book`. Do NOT publish lorem-ipsum posts; an empty, honest blog state ships instead and the blog is excluded from the sitemap until at least one real post exists.

#### `/contact`
- Navigational only. H1 "Got questions? Let's talk." First paragraph carries the contact entity (email + WhatsApp in plain text, important for NAP-equivalent consistency). No keyword target.

### Keyword Coverage Guidance

For every indexable page: ensure the page's **one primary keyword appears once, naturally, in each of three places that matter** -- the H1 (or the first H2 if the design lockup owns the H1), the first paragraph, and at least one subheading -- then cover the surrounding **topic and its synonyms and related entities** rather than repeating the exact phrase. Synonyms and related entities to vary across the page so the topic reads complete to both Google and an LLM: *friend, best mate, sibling, parent, unofficial celebrant, registered celebrant, solemnise / solemnisation, legals / legal requirements / paperwork, ceremony, vows, love story, officiate / officiant, Australia / Australian, Commonwealth-registered.*

**Do NOT:** count occurrences, target a keyword density, repeat the exact phrase in every heading, or pack the meta description and H1 and first three paragraphs with the same string. "Keyword density" is a debunked metric; over-repetition reads as spam to Google and as low-quality to an LLM, and it actively fights the brand voice. One natural placement per important slot, then breadth of the topic, is the rule.

**Voice protection:** the loud "Recessional Pop" voice (Hype Lines, cue chips, the grin) is the brand and must not be flattened into keyword copy. The mechanism: the **Hype Lines carry the emotion** (styled display type), and a **single plain semantic sentence per page carries the keyword and the entity** (the accessible H1, the first body paragraph, the meta description, the schema `description`). These coexist. Findability lives in the plain layer; personality lives in the loud layer; they are different DOM elements, not a compromise on either.

### Content Gaps

Topics real searchers want that the current indexable inventory does not yet fully cover. Each is flagged with whether it needs client content (never fabricate):

1. **The honest legality explainer.** "Can a friend legally marry you in Australia?" is high-volume and the brand's core anxiety. The truthful, nuanced answer (friend leads, registered celebrant solemnises; references the Marriage Act framing at a layperson level) is the single highest-value piece of content on the site and the most-quoted by LLMs. **Needs:** the client's confirmed exact legal mechanism (does the registered celebrant attend and officiate, or is the legal marriage registered separately/after?). Until confirmed, write the answer in the safe general form ("a registered celebrant handles the legal solemnisation; your mate leads the ceremony") and flag the precise wording for client sign-off. Do NOT publish a specific legal procedure that has not been confirmed.
2. **"What does it cost vs a traditional celebrant?"** A plain comparison ("traditional celebrant $600-$1,200+ in AU; Wedding Mates is one $950 package that also trains your person and handles the legals") is strong commercial-investigation content for `/pricing` and a frequent AI question. The competitor price range is from the dossier; keep it as a stated range, not a fabricated precise figure.
3. **The mate-side how-to cluster (blog).** "How to officiate a wedding for a friend in Australia", "what to say", "calming nerves" are real informational demand and the cheapest qualified traffic. **Needs:** real blog posts from the client (the live site is lorem ipsum). Until supplied, do not publish; the gated course holds the depth and is not indexed.
4. **FAQ depth.** Logistics questions (timing, how far out to book, what the mate has to do, what happens on the day, refunds) are searched and asked of AI. **Needs:** client-approved Q&A. Ship only answered questions; scaffold the rest.
5. **Reviews / proof.** "Friend led wedding reviews" and real testimonials feed both human trust and AI recommendation sentiment. **Needs:** real, rights-cleared testimonials. Do not fabricate; no `Review`/`AggregateRating` schema until real reviews exist (see Structured Data Plan).

---

## Meta Formulas

AU English. No em dashes. No double-hyphens in any client-facing meta text (titles, descriptions, OG copy). Titles target ~50-60 characters (the visible Google limit is ~600px, roughly 55-60 chars). Descriptions target ~140-160 characters; write them to read as a confident, plain sentence that states what the thing is and what to do, because that same text is what LLMs and snippets lift.

### Title Template
`[Primary human phrase] | Let's Get Wed` for marketing pages, where the brand suffix is "Let's Get Wed" (the public-facing brand and the domain). Keep "Wedding Mates" available as a secondary brand token inside descriptions and schema `alternateName`, but lead the visible brand with "Let's Get Wed" for consistency with the domain.

### Description Template
A plain declarative sentence: *what it is* + *the honest legality reassurance* + *the price or the action*. One sentence, optionally two. No clickbait, no exclamation stacking (the loud voice lives on-page, not in the SERP, where clarity converts and feeds AI).

### Per-route titles and descriptions (concrete)

> Character counts are approximate; tighten in implementation if a SERP preview overflows.

**`/` (Home)**
- Title: `Friend Led Wedding Ceremonies | Let's Get Wed` (45)
- Description: `Have your best mate lead your wedding ceremony while a registered celebrant handles the legals. One package, fully sorted. Book your friend led ceremony today.` (158)

**`/how-it-works`**
- Title: `Can My Friend Be My Celebrant? | Let's Get Wed` (46)
- Description: `Yes, your mate can lead your ceremony. We train them with the Blueprint course and a registered celebrant takes care of the legal paperwork. See how it works.` (157)

**`/pricing`**
- Title: `Friend Led Wedding, One Price: $950 | Let's Get Wed` (51)
- Description: `One $950 package: the Blueprint course that trains your mate, the legals handled by a registered celebrant, plus optional extras. See exactly what is included.` (158)

**`/faq`**
- Title: `Can a Friend Legally Marry You in Australia? FAQ | Let's Get Wed` (62, trim suffix if overflow: `Friend Led Wedding FAQ | Let's Get Wed`)
- Description: `Your questions answered: how a friend led ceremony works in Australia, who handles the legals, the cost, and what your mate actually has to do.` (143)

**`/about`**
- Title: `Meet Sarah, Our Founder | Let's Get Wed` (40)
- Description: `Sarah became a registered celebrant over 300 hours of study to marry her own best friend in 2019, then built the Blueprint so more mates could do the same.` (155)

**`/reviews`** (CONDITIONAL; metadata only rendered when content exists)
- Title: `Real Friend Led Wedding Stories | Let's Get Wed` (47)
- Description: `Couples and the mates who married them share how a friend led ceremony felt more personal than a stranger ever could.` (118)

**`/blog`** (CONDITIONAL)
- Title: `Wedding Inspiration and Ceremony Tips | Let's Get Wed` (52)
- Description: `Ideas, scripts and confidence for couples and the mates leading their ceremony, from the team behind the Blueprint course.` (122)

**`/blog/[slug]`** (CONDITIONAL, per post)
- Title formula: `[Post question or title] | Let's Get Wed`
- Description formula: the post's own one-sentence answer-first summary, plain, 140-160 chars.

**`/contact`**
- Title: `Contact Let's Get Wed | Friend Led Weddings` (43)
- Description: `Questions about having a friend lead your ceremony? Email sarah@letsgetwed.com.au or message us on WhatsApp. We are happy to help before you book.` (146)

**`/terms`** (CONDITIONAL) and **`/privacy`**
- Title: `Terms and Conditions | Let's Get Wed` / `Privacy Policy | Let's Get Wed`
- Description: a single plain line each; these pages are `index, follow` but low priority. (Terms ships only when client copy exists; until then it is noindex-scaffolded or omitted from the sitemap.)

**Functional + gated routes (`/book`, `/book/confirmation`, `/login`, `/register`, `/forgot-password`, `/reset-password`, `/course`, `/course/*`, `/course/locked`, `/design-book`):** metadata sets `robots: { index: false, follow: false }`. Titles are for the browser tab and accessibility only, not for search. Suggested tab titles: `Book Your Ceremony | Let's Get Wed`, `Sign In | Let's Get Wed`, `Your Course | Let's Get Wed`, etc. No descriptions needed (they will not be shown).

---

## FAQ Brief

These are the questions to render as a visible FAQ accordion on `/faq` AND on the Home inline FAQ (Section 11), AND to mark up with `FAQPage` schema (the visible text and the schema text MUST be identical, per Google's rich-results rules). The two anxiety questions (legality, can-my-friend-do-it) lead.

**CONTENT-HONESTY GATE:** the questions below are the brief. The **answers are guidance for the copywriter**, written in the safe general form. Several require client confirmation before the precise wording is final (flagged inline). **Do not publish any answer the client has not approved, and never publish a specific legal procedure that has not been confirmed.** Where an answer is not yet client-approved, ship the question with a short honest holding answer or omit it; never fabricate detail, refund terms, or a legal mechanism.

| # | Question (verbatim, render exactly) | Answer guidance (copywriter; confirm flagged items) |
|---|---|---|
| 1 | Can a friend really marry us in Australia? | Yes, your mate leads and delivers the ceremony. A registered celebrant handles the legal side, the solemnisation and paperwork, so the marriage is fully valid. Your friend gets the personal moment; we make sure the legals are sorted. **(General form is safe. Confirm exact mechanism wording with client before finalising.)** |
| 2 | Is a friend led ceremony actually legal? | Yes. In Australia, the law requires a Commonwealth-registered celebrant to handle the legal marriage. With Wedding Mates, a registered celebrant takes care of every legal requirement before the day, while your chosen mate leads the ceremony itself. You get a wedding that is both deeply personal and completely valid. **(Confirm precise legal-mechanism wording.)** |
| 3 | Can my friend pull this off if they have never done it? | That is exactly what the Blueprint course is for. Over eight modules it teaches your mate how to interview you, write your love story, structure the ceremony, and deliver it with confidence, including how to handle nerves. Most people who lead are not public speakers; they just love you, and we get them ready. |
| 4 | Who handles the legal paperwork? | A registered celebrant. They take care of the legal solemnisation and the pre-ceremony paperwork before the day, so your mate can focus entirely on leading the ceremony and being present with you. **(Confirm the exact celebrant arrangement.)** |
| 5 | What does it cost? | One package is $950, which includes the Blueprint course that trains your mate, the onboarding call, the templates and readings, and the legal handling. There are a few optional extras you can add at booking. **(Confirm GST inclusive or exclusive before publishing.)** |
| 6 | What is included in the $950 package? | The Blueprint course (eight modules of training for your mate), an onboarding video call, templates and sample scripts, a readings and music library, performance strategies, and the legal requirements handled by a registered celebrant. |
| 7 | How far in advance do we need to book? | **CONDITIONAL on client confirmation.** General guidance only: the more time your mate has to work through the course and prepare, the better. If your wedding is less than four weeks away, we can still help; your legal marriage may be registered after the ceremony and we will guide you through it. **(Confirm the under-4-weeks process wording with client; do not publish specifics unconfirmed.)** |
| 8 | What does my mate actually have to do? | They work through the Blueprint course (around fifteen to seventeen hours across learning, interviewing you, writing, and rehearsing), then lead the ceremony on the day. We support them the whole way. |
| 9 | Can we still get our marriage legally registered if we book close to the date? | **CONDITIONAL.** Honest holding answer: yes, we will guide you; for weddings under four weeks out the legal registration may happen after the ceremony. **(Confirm exact process; do not detail unconfirmed steps.)** |
| 10 | Do we get a marriage certificate? | The official marriage certificate is an optional extra ($69), usually needed for name changes or visa applications. Your legal marriage is recorded regardless; the certificate is the formal document you can order. **(Confirm wording.)** |
| 11 | Is this cheaper than a traditional celebrant? | Often, yes. A traditional registered celebrant in Australia typically ranges from roughly $600 to $1,200 or more. Wedding Mates is one $950 package that also trains your own person and handles the legals, so you are not choosing between personal and professional. **(Range is from market context; present as a range, not a fixed claim.)** |
| 12 | What is your refund or cancellation policy? | **DO NOT PUBLISH until the client supplies Terms and a refund policy.** Omit this question entirely until real terms exist; never fabricate refund terms. |

**Render note:** Home inline FAQ (Section 11) uses questions 1, 2, 3, 5, and one logistics question (7 or 11) only. The full set lives on `/faq`. Only questions with client-approved answers ship; the rest scaffold as an honest empty state.

### Internal Link Anchor Text

| From Page | To Page | Suggested Anchor Text |
|---|---|---|
| `/` (legality section) | `/faq` | is a friend led ceremony legal |
| `/` (how-it-works teaser) | `/how-it-works` | how a friend leads your ceremony |
| `/` (pricing teaser) | `/pricing` | what the $950 package includes |
| `/` (founder section) | `/about` | meet Sarah |
| `/how-it-works` | `/pricing` | see the price |
| `/how-it-works` (legality block) | `/faq` | who handles the legals |
| `/pricing` | `/how-it-works` | how the friend led model works |
| `/faq` | `/how-it-works` | how a friend led ceremony works |
| `/faq` (cost question) | `/pricing` | the full pricing breakdown |
| `/about` | `/how-it-works` | the Blueprint and how it works |
| `/contact` | `/book` | ready now, book your ceremony |
| `/blog/[slug]` (CONDITIONAL) | `/how-it-works` | have your friend lead your ceremony |
| every marketing page | `/book` | Book Now / Start Your Script (primary CTA) |

Anchor-text rule: vary the anchor naturally (do not use the identical exact-match phrase on every link); keep it human and descriptive. The primary CTA keeps its brand label ("Book Now" / "Start Your Script") even though that is not keyword-rich, because conversion clarity beats anchor optimisation on the money button.

---

## Structured Data Plan

All JSON-LD is server-rendered (Next.js metadata route or a `<script type="application/ld+json">` injected in the page, not client-only) so crawlers and LLM fetchers see it without executing JS. One graph per page where types relate; reuse the `Organization` node by `@id` across pages rather than redefining it.

### Entity Statement

The canonical, factual, plain-language description of the business. Use it verbatim in the `Organization` `description`, the homepage meta description seed, the `/about` opening, and the AI-surface seed (LLM Optimization). Truthful, unambiguous, no brand-voice flourish:

> **Let's Get Wed (Wedding Mates) is an Australian wedding business that trains a couple's chosen friend, sibling or parent to lead their wedding ceremony, while a Commonwealth-registered marriage celebrant handles the legal solemnisation and paperwork. The core offer is one $950 package that includes The Wedding Ceremony Blueprint, an eight-module online course that teaches the chosen person to interview the couple, write their love story, structure and deliver the ceremony, plus an onboarding call, templates, a readings library, and the legal requirements managed by a registered celebrant. It was founded by Sarah, a registered marriage celebrant, after she trained to marry her own best friend in 2019. It serves couples across Australia.**

This sentence does the heaviest SEO lifting on the site. It states WHAT (a friend led ceremony trainer plus legal handling), the honest legal mechanism (registered celebrant solemnises), the OFFER ($950, the Blueprint course), WHO (Sarah), and WHERE (Australia). Keep it stable; LLMs reward a consistent entity description across surfaces.

### Schema 1: Organization (site-wide, in root layout)

Type `Organization` (NOT `LocalBusiness`; no physical storefront, Australia-wide service). Emitted once site-wide with a stable `@id` so other pages reference it.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://letsgetwed.com.au/#organization",
  "name": "Let's Get Wed",
  "alternateName": "Wedding Mates",
  "url": "https://letsgetwed.com.au",
  "logo": "https://letsgetwed.com.au/og/logo.png",
  "description": "[Entity Statement above, verbatim]",
  "email": "sarah@letsgetwed.com.au",
  "telephone": "+61410820300",
  "areaServed": { "@type": "Country", "name": "Australia" },
  "founder": { "@type": "Person", "@id": "https://letsgetwed.com.au/about#sarah" },
  "knowsAbout": [
    "friend led wedding ceremonies",
    "wedding ceremony writing",
    "marriage celebrancy in Australia",
    "wedding ceremony delivery and public speaking"
  ],
  "sameAs": [
    "[client Instagram URL -- CONFIRM]",
    "[client Facebook URL -- CONFIRM]"
  ]
}
```
- `telephone`: E.164 format of 0410 820 300 = `+61410820300`.
- `sameAs`: **needs client social URLs** (Instagram, Facebook, TikTok). These are the single most important LLM/knowledge-graph entity-link signal for a brand with no Google Business Profile. Flag as a client question; do not fabricate. Leave the array empty rather than guess.
- Do NOT add `address` unless the client confirms a real business address willing to be public (the dossier has none; the suburb collected at booking is the customer's, not the business's).

### Schema 2: Person (Sarah, on `/about`, referenced by Organization.founder)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://letsgetwed.com.au/about#sarah",
  "name": "Sarah",
  "jobTitle": "Registered Marriage Celebrant and Founder",
  "worksFor": { "@id": "https://letsgetwed.com.au/#organization" },
  "description": "Sarah is a Commonwealth-registered marriage celebrant who founded Let's Get Wed after training over 300 hours to marry her own best friend in 2019.",
  "knowsAbout": ["marriage celebrancy", "wedding ceremony coaching"]
}
```
- `name`: surname not provided in source; use "Sarah" until the client supplies a full name (do not invent a surname). Flag.

### Schema 3: Product + Offer (on `/pricing`, also referenced from Home pricing teaser)

The $950 package is the productised offer. `Product` with a single `Offer`. The four extras are modelled as `addOn` offers.

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://letsgetwed.com.au/pricing#package",
  "name": "Wedding Mates Package",
  "description": "One package that trains a couple's chosen friend to lead their wedding ceremony and has a registered celebrant handle the legal requirements. Includes The Wedding Ceremony Blueprint course, an onboarding call, templates, a readings library and the legals managed.",
  "brand": { "@id": "https://letsgetwed.com.au/#organization" },
  "category": "Wedding ceremony service",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "AUD",
    "price": "950.00",
    "availability": "https://schema.org/InStock",
    "url": "https://letsgetwed.com.au/book",
    "areaServed": { "@type": "Country", "name": "Australia" },
    "seller": { "@id": "https://letsgetwed.com.au/#organization" },
    "addOn": [
      { "@type": "Offer", "name": "Official Marriage Certificate", "price": "69.00", "priceCurrency": "AUD" },
      { "@type": "Offer", "name": "Registered Celebrant in Attendance", "price": "299.00", "priceCurrency": "AUD" },
      { "@type": "Offer", "name": "Zoom Rehearsal with Celebrant", "price": "99.00", "priceCurrency": "AUD" },
      { "@type": "Offer", "name": "Custom Script Review", "price": "129.00", "priceCurrency": "AUD" }
    ]
  }
}
```
- **GST flag:** if the client confirms prices are GST-inclusive, add `"priceSpecification": { "@type": "PriceSpecification", "valueAddedTaxIncluded": true }`. Do not assert a tax status until confirmed.
- **No `aggregateRating` or `review` field** until real, rights-cleared reviews exist. Fabricating ratings is a Google penalty risk and an honesty violation. Add the `AggregateRating` node only after the client supplies real testimonials (see Schema 6, gated).

### Schema 4: Course (The Wedding Ceremony Blueprint, on `/how-it-works` and/or `/pricing`)

The Blueprint is a genuine `Course`. This is a strong signal for the mate-side and for AI answering "is there a course to learn to officiate a friend's wedding in Australia".

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://letsgetwed.com.au/#blueprint",
  "name": "The Wedding Ceremony Blueprint",
  "description": "An eight-module online course that trains a couple's chosen friend to interview the couple, write their love story, structure and mark up the ceremony, add music, readings and vows, and deliver it with confidence. Included in the Wedding Mates package.",
  "provider": { "@id": "https://letsgetwed.com.au/#organization" },
  "inLanguage": "en-AU",
  "isAccessibleForFree": false,
  "offers": {
    "@type": "Offer",
    "category": "Paid",
    "priceCurrency": "AUD",
    "price": "950.00",
    "url": "https://letsgetwed.com.au/book"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "courseWorkload": "PT16H"
  }
}
```
- `courseWorkload`: ~15-17 hours per the dossier; `PT16H` is a reasonable mid-point. Keep it honest and approximate.
- Do NOT mark up the individual gated lesson pages with `Course`/`LearningResource` schema; those pages are noindex and serve paying members only.

### Schema 5: FAQPage (on `/faq`, and a subset on Home)

`FAQPage` with the exact visible Q&A from the FAQ Brief. Only include questions whose answers are client-approved and rendered visibly on the page (Google requires schema FAQ text to match visible text). Build the schema from the same data source as the rendered accordion so they cannot drift.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://letsgetwed.com.au/faq#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can a friend really marry us in Australia?",
      "acceptedAnswer": { "@type": "Answer", "text": "[verbatim approved answer 1]" }
    }
    /* ...one entry per APPROVED, VISIBLE question from the FAQ Brief... */
  ]
}
```
- The Home inline FAQ may emit its own smaller `FAQPage` OR (cleaner) only `/faq` carries the schema and Home renders the same questions as plain accordion without duplicate schema, to avoid two `FAQPage` nodes competing. Recommendation: schema on `/faq` only; Home FAQ is visible-only.

### Schema 6: Review / AggregateRating (GATED -- do NOT implement until real reviews exist)

When the client supplies real, rights-cleared testimonials with attribution, add `Review` nodes and an `AggregateRating` to the `Product`. Until then this schema is absent. **No placeholder ratings, ever.**

### Schema 7: BreadcrumbList (on `/blog/[slug]`, and any nested page)

When the blog ships, each post emits a `BreadcrumbList` (Home > Blog > Post). Marketing top-level pages are flat and do not need breadcrumbs.

### Schema 8: WebSite + SearchAction (site-wide, optional)

Emit a `WebSite` node with the brand name and `alternateName`, enabling the brand to be recognised as an entity. Add a `SearchAction` only if an on-site search exists (it does not in the current inventory), so omit `SearchAction` for now.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://letsgetwed.com.au/#website",
  "url": "https://letsgetwed.com.au",
  "name": "Let's Get Wed",
  "alternateName": "Wedding Mates",
  "publisher": { "@id": "https://letsgetwed.com.au/#organization" },
  "inLanguage": "en-AU"
}
```

### Schema placement summary

| Page | Schema nodes |
|---|---|
| Root layout (all pages) | `Organization`, `WebSite` |
| `/` (Home) | (inherits Organization/WebSite); optional reference to `Product` and `Course` |
| `/how-it-works` | `Course` |
| `/pricing` | `Product` + `Offer` (+ `Course` reference) |
| `/faq` | `FAQPage` |
| `/about` | `Person` (Sarah) |
| `/reviews` (CONDITIONAL) | `Review` + `AggregateRating` (only when real reviews exist) |
| `/blog/[slug]` (CONDITIONAL) | `BlogPosting` + `BreadcrumbList` (only when real posts exist) |
| Functional + gated + `/design-book` | NONE (noindex) |

### Schema 9: BlogPosting (CONDITIONAL, per real post)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[post title]",
  "description": "[post summary]",
  "author": { "@type": "Person", "name": "Sarah" },
  "publisher": { "@id": "https://letsgetwed.com.au/#organization" },
  "datePublished": "[ISO date]",
  "dateModified": "[ISO date]",
  "image": "[post hero image absolute URL]",
  "inLanguage": "en-AU"
}
```
Only when a real post exists. No fabricated dates or authors.

---

## Metadata Implementation

### Canonical URL Strategy

- Every indexable page sets a self-referential canonical to its clean absolute URL on `https://letsgetwed.com.au`, no trailing slash, no query string. Example: `/how-it-works` -> `<link rel="canonical" href="https://letsgetwed.com.au/how-it-works">`.
- **The booking wizard `/book` uses step state in the URL (`/book?step=2` or `/book/details`).** All step variants canonicalise to `https://letsgetwed.com.au/book` (the param/step is state, not a distinct indexable page). But `/book` is also noindex, so this is belt-and-braces. Never let `/book?step=N` become an indexable duplicate.
- Trailing-slash policy: pick one (recommend NO trailing slash, Next.js default) and enforce it in `next.config` (`trailingSlash: false`) so canonicals, sitemap, and internal links all agree. Inconsistency here is a duplicate-content own goal.
- `www` vs apex: pick the apex `letsgetwed.com.au` as canonical and 301 `www` -> apex at the host/Netlify level. Canonicals always use the apex.
- Pagination (blog, if it ever paginates): each page self-canonical; do NOT canonical page 2+ back to page 1.

### URL Structure

Clean, lowercase, hyphenated, keyword-aware, already well-formed in the UX inventory. Keep:
- `/how-it-works`, `/pricing`, `/faq`, `/about`, `/contact`, `/reviews`, `/blog`, `/blog/[slug]`, `/terms`, `/privacy`.
- Blog slugs: derive from the post's primary phrase, e.g. `/blog/how-to-officiate-a-friends-wedding-australia`. Keep under ~60 chars, no stop-word padding, no dates in the path (so a post can be updated without a URL change).
- No `/index`, no `.html`, no uppercase, no underscores, no trailing IDs on marketing pages.
- Booking/auth/course routes keep their functional paths (`/book`, `/login`, `/course/module-1`); they are noindex so their structure is for usability, not SEO.

### Image Alt Text Strategy

Descriptive, honest, and natural; weave the entity/topic where it genuinely describes the image, never keyword-stuff. AU English. No double-hyphens. Guidance per image type:
- **Hero / mate-mid-delivery photos:** describe the real moment, e.g. "A friend leading a wedding ceremony, reading from the page and looking up at the couple". (Carries "friend leading a wedding ceremony" because it truly describes the shot.)
- **Faces-catching-it (reaction) photos:** "Wedding guests laughing as a friend leads the ceremony".
- **Founder portrait (`sarah-wedding.jpg`):** "Sarah, founder of Let's Get Wed and a registered marriage celebrant, at the 2019 wedding where she married her best friend".
- **Feature/Blueprint icons:** functional alt, e.g. "Writing your love story" for the edit icon; decorative-only shapes (cue chips, the held-beat dot, confetti burst) get `alt=""` (empty) so screen readers skip them.
- **Module thumbnails (gated, not indexed):** alt for accessibility only, e.g. "Module 3: Structuring the ceremony".
- **Pricing/package image:** "What is included in the $950 Wedding Mates package".
- Never describe a stock or placeholder image as a real couple. If a love-story photo is a pending placeholder, it is not shipped at all (per the imagery direction), so no alt-text problem arises.

### hreflang Tags

N/A, single-language site. The site is English (AU). Set `<html lang="en-AU">` and `inLanguage: "en-AU"` in schema. No alternate-language versions, so no `hreflang` cluster. (The `en-AU` locale signal still helps Google serve the right English variant to AU searchers.)

### 301 Redirect Plan

This is a PORT of an existing WordPress/Bricks site at `https://wedding-mates.aaronknightdev.com` to a new Next.js build on (likely) `https://letsgetwed.com.au`. Two cases:

1. **The dev staging subdomain (`wedding-mates.aaronknightdev.com`) is NOT the production domain** and presumably has no meaningful inbound links or ranking history. No redirects needed FROM it; ensure it is `noindex` / taken down at launch so it does not compete as a duplicate of the production site. Verify it is not currently indexed; if it is, add `noindex` there or block it, to avoid duplicate-content confusion at launch.
2. **If `letsgetwed.com.au` (or any prior live domain) already has indexed URLs**, map old paths to new. The likely overlaps (old WordPress slugs -> new clean routes):

| Old URL (verify against live sitemap before launch) | New URL | Redirect |
|---|---|---|
| `/home` or `/` | `/` | 301 (or none if identical) |
| `/about-us`, `/our-story`, `/sarah` | `/about` | 301 |
| `/how-it-works`, `/process` | `/how-it-works` | 301 |
| `/pricing`, `/packages`, `/investment` | `/pricing` | 301 |
| `/faqs`, `/faq` | `/faq` | 301 |
| `/contact-us` | `/contact` | 301 |
| `/blog` and any real post slugs | `/blog`, `/blog/[slug]` | 301 per post (only for real posts; do not redirect lorem-ipsum URLs, let them 410/404) |
| any `?p=`, `/wp-*`, feed, or attachment URLs | n/a | let 404/410; do not preserve WordPress cruft |

**Action before launch:** pull the actual current live sitemap/URL list (the dossier captured live-site HTML + a link map in `docs/references/`), build the exact old->new map from real URLs, and implement as 301s at the Netlify/`next.config` redirect layer. Do not guess slugs; verify. Any lorem-ipsum blog URLs on the old site should NOT be redirected to real content (there is none); let them go 404/410.

---

## Sitemap/Robots Config

### XML Sitemap Configuration (`src/app/sitemap.ts`)

Include ONLY indexable marketing pages with real, shippable content. Exclude every functional, gated, conditional-but-empty, and design-book route. `Priority` and `Change Frequency` are advisory-only and ignored by Google; included for completeness, not as ranking levers. Set `lastModified` accurately from content/build dates.

| Page | In sitemap? | Priority (advisory) | Change Frequency (advisory) |
|---|---|---|---|
| `/` | yes | 1.0 | weekly |
| `/how-it-works` | yes | 0.9 | monthly |
| `/pricing` | yes | 0.9 | monthly |
| `/faq` | yes (only if >=1 approved answer ships) | 0.8 | monthly |
| `/about` | yes | 0.7 | yearly |
| `/contact` | yes | 0.5 | yearly |
| `/reviews` | ONLY when real reviews exist | 0.6 | monthly |
| `/blog` | ONLY when >=1 real post exists | 0.6 | weekly |
| `/blog/[slug]` | ONLY real posts, one entry each | 0.5 | monthly |
| `/terms` | ONLY when real terms exist | 0.3 | yearly |
| `/privacy` | yes (or when Nexus page is linked) | 0.3 | yearly |
| `/book`, `/book/confirmation` | NO (noindex, functional) | n/a | n/a |
| `/login`, `/register`, `/forgot-password`, `/reset-password` | NO (noindex) | n/a | n/a |
| `/course`, `/course/*`, `/course/locked` | NO (noindex, gated) | n/a | n/a |
| `/design-book` | NO (internal) | n/a | n/a |

**Implementation rule:** the sitemap is generated from the same route/content registry that drives the nav and the conditional-page gating, so a conditional page (FAQ with no answers, empty blog, missing reviews, missing terms) is **automatically excluded from the sitemap until it has real content**. Never list a URL that returns an empty/"add content" shell; that wastes crawl budget and signals thin content. Concretely: `sitemap.ts` filters each conditional route on a `hasContent` flag.

### robots.txt (`src/app/robots.ts`)

Use the standard template. Project-specific overrides:

```
User-agent: *
Allow: /
Disallow: /book
Disallow: /book/
Disallow: /login
Disallow: /register
Disallow: /forgot-password
Disallow: /reset-password
Disallow: /course
Disallow: /course/
Disallow: /design-book
Disallow: /api/

Sitemap: https://letsgetwed.com.au/sitemap.xml
```

Notes:
- `Disallow` keeps crawlers out of functional/gated paths; the **per-page `robots: { index: false }` metadata is the authoritative noindex** (robots.txt blocks crawling, not indexing of already-linked URLs). Belt-and-braces: set BOTH the `Disallow` here AND `noindex` in each gated page's metadata. Do not rely on robots.txt alone to keep gated pages out of the index.
- Do NOT disallow `/_next/` static assets or images globally; Google needs CSS/JS to render and assess the page. Only disallow `/api/` (no public crawl value) and the functional/gated route prefixes above.
- The gated `/course/*` content is also protected by Supabase RLS/auth, so it is doubly safe; the `Disallow` + `noindex` is for the route shells.
- `/design-book` is disallowed and noindex (internal review surface, not for the public). If the team prefers, place it under a route group `src/app/(internal)/design-book/page.tsx` so it never enters the sitemap registry at all; still keep the `Disallow` line as a guard.

### Internal Linking Map

The site is a funnel; internal links push authority and users toward `/book`. Structure:
- **Hub:** `/` (Home) links out to `/how-it-works`, `/pricing`, `/about`, `/faq`, `/contact`, and (when live) `/reviews` and `/blog`. It links INTO `/book` from the hero, every section CTA, and the sticky mobile bar.
- **Decision triangle:** `/how-it-works` <-> `/pricing` <-> `/faq` interlink (a researcher bounces between the model, the price, and the legality reassurance). Each of the three links to `/book`.
- **Trust spoke:** `/about` links to `/how-it-works` and `/book`; the Home founder section links to `/about`.
- **Blog (conditional):** every post links UP to `/how-it-works` and ACROSS to `/book` in its closing CTA; the blog index links to each post. Posts are the top-of-funnel net; `/book` is always one click from any post.
- **Footer:** links every marketing page (Explore/More/Legal columns) so every page is reachable in 1-2 clicks and link equity flows site-wide; legal links point to the Vonzie Nexus hosted privacy/cookie pages post-launch.
- **No internal links INTO gated/functional routes from indexable content except the intended CTA to `/book`** and the small "Login" link. Do not link to `/course/*` from public pages (it is gated and noindex).

---

## LLM Optimization

People will ask ChatGPT, Perplexity, Gemini, and Copilot questions like "can my best friend marry us in Australia?", "is there a way to have a friend lead our wedding legally in Australia?", and "how do I officiate my friend's wedding in Australia?". This brand wins or loses those answers on entity clarity, answer-shaped content, and consistent factual signals far more than on backlinks. This section is the highest-leverage part of the strategy for this specific business.

### Knowledge Graph Checklist

- **NAP-equivalent consistency (name, contact, not address).** The brand name appears two ways in source: "Wedding Mates" and "Let's Get Wed". **Decide one primary public name and use it consistently** in the visible site, schema `name`, OG copy, and any external profile. Recommendation: **"Let's Get Wed"** as the primary public/brand name (matches the domain), with **"Wedding Mates"** as the consistent `alternateName` everywhere (schema, descriptions). Inconsistent naming splits the entity in an LLM's mind; pick one and make the other an explicit alias every time.
- **Contact consistency:** email `sarah@letsgetwed.com.au` and WhatsApp/phone `0410 820 300` (E.164 `+61410820300`) identical in the footer, contact page, schema, and any social bio. These are the real values from the course doc; do NOT use the live-site placeholders ("WA 12345678" / obfuscated email).
- **Social profile links (`sameAs`):** **the single biggest LLM entity signal available to this brand** (no Google Business Profile to lean on). Get the real Instagram, Facebook, and TikTok URLs from the client and put them in `Organization.sameAs` AND link them in the footer. Flag as a client question; leave empty rather than fabricate.
- **Founder entity link:** Sarah <-> Let's Get Wed is linked via `Organization.founder` and `Person.worksFor` so the person and the brand are one knowledge node. Add Sarah's celebrant registration detail in plain text on `/about` (without inventing a registration number) to strengthen the credential entity.
- **Citation sources for this archetype (NOT local directories):** Australian wedding marketplaces and directories the client can list on, which double as LLM training/citation sources and human discovery: **Easy Weddings, Wedshed, Hitched / hitched.com.au equivalents, Polka Dot Wedding, ABIA (Australian Bridal Industry Academy), Wedding celebrant directories, and Sarah's celebrant listing on any official AU celebrant register.** Each listing should carry the identical brand name, the same description seed, the same contact, and a link back to `letsgetwed.com.au`. Consistency across these is the citation equivalent of NAP consistency for a service brand. (Flag to client: which of these they already appear on, and where the data is inconsistent.)

### Content Structure for AI Extraction

LLMs lift short, plain, self-contained answer blocks. Structure the indexable content so the key facts are extractable without parsing the loud display layer:
- **Answer-first paragraphs.** The first sentence of the Home legality section, the first FAQ answer, and the `/how-it-works` intro must each state the honest mechanism plainly: *"Yes. Your chosen friend leads the ceremony, and a registered celebrant handles the legal requirements."* That sentence is what an LLM quotes.
- **The Entity Statement (above) appears verbatim** in the Organization schema, the `/about` opening paragraph, and is the seed for the homepage meta description. Repeating the SAME clear factual description across surfaces is how an LLM forms a stable, correct picture of the entity.
- **Facts in crawlable HTML text, never image-only:** the $950 price, the four extras and their prices, the eight-module course structure, the contact details, and "serves Australia" must all exist as real text on the page (the loud type can render them styled, but they must be selectable text, not baked into an image). LLMs (and Google) cannot read text inside a JPG.
- **A self-contained "About this service" block** on Home and `/how-it-works` that an AI can quote whole: who it is for, what it does, the honest legal mechanism, the price, the audience (Australia). Plain prose, no jargon, no Hype-Line styling required for the semantic copy underneath.
- **Question-shaped headings** on `/faq` use the exact natural-language question a person would type or speak ("Can a friend legally marry you in Australia?"), because that maximises the match between the user's spoken AI query and the page's content.

### Q&A Pairs to Seed for AI Surfaces

These are the canonical question/answer pairs to publish (as FAQ + answer-first content) so AI surfaces have correct, honest material to pull. They mirror the FAQ Brief but are written as the LLM-facing canonical answers. Publish only client-approved versions; keep them factually identical to the schema.

1. **Q: Can my best friend marry us in Australia?** A: Your best friend can lead and deliver your wedding ceremony. Under Australian law a Commonwealth-registered marriage celebrant must handle the legal marriage, so with Let's Get Wed a registered celebrant takes care of the legal solemnisation and paperwork while your friend leads the ceremony. The result is personal and fully valid.
2. **Q: Is a friend led wedding ceremony legal in Australia?** A: Yes, when the legal requirements are handled by a registered celebrant. Let's Get Wed pairs your chosen friend, who leads the ceremony, with a registered celebrant who manages the legal side.
3. **Q: How much does it cost?** A: One package is $950 in Australian dollars, including the Blueprint course that trains your friend, an onboarding call, templates and the legal handling, with a few optional extras available at booking.
4. **Q: How do I officiate my friend's wedding in Australia?** A: You lead and deliver the ceremony while a registered celebrant handles the legals. Let's Get Wed's Blueprint course teaches you how to interview the couple, write their story, structure the ceremony and deliver it confidently.
5. **Q: Is it cheaper than hiring a celebrant?** A: It can be. Traditional registered celebrants in Australia commonly range from about $600 to $1,200 or more. Let's Get Wed is one $950 package that also trains your own person and handles the legals.

**Honesty guard on all five:** none claims an untrained friend signs or solemnises the marriage. Every answer names the registered celebrant as the legal handler. If the client confirms a more specific mechanism, tighten the wording then; until then these general forms are safe to seed.

### Local SEO

Largely **N/A for this archetype** (national service, no storefront, no Google Business Profile). Two narrow exceptions:

#### Google Business Profile Recommendations
Do not create a location-based Google Business Profile (there is no in-person location to verify and weddings are delivered Australia-wide). If the client wants a presence, a **service-area business** profile with no displayed address and `areaServed: Australia` is the only correct form, and it is low priority versus the wedding-marketplace citations. Recommendation: **skip GBP** and invest the effort in the marketplace citations + `sameAs` social links + answer-shaped content, which are what actually move this archetype.

#### Citation Targets
Priority directories for a national AU wedding-service brand (not local food/Maps directories). List with identical name, description seed, contact, and a backlink:
1. **Easy Weddings** (au) -- the largest AU wedding directory; high citation + referral value.
2. **Wedshed** -- strong for personal/alternative weddings; audience fit.
3. **Polka Dot Wedding** -- editorial AU wedding audience.
4. **ABIA (Australian Bridal Industry Academy)** -- credibility + reviews platform AU couples trust.
5. **Hitched / wedding celebrant directories (AU)** -- and any official register entry for Sarah as a celebrant.
6. **Instagram / Facebook / TikTok business profiles** -- not directories, but the `sameAs` entity anchors; bio must carry the brand name + the one-line entity statement + the domain.
Consistency note: the brand name on every listing is **"Let's Get Wed"** with "Wedding Mates" as an alias only; the description on every listing starts from the Entity Statement; the link always points to `https://letsgetwed.com.au`.

### Monitoring Plan

- **Monthly LLM spot-check.** Ask ChatGPT, Perplexity, Gemini, and Copilot the five seeded questions above plus "what is Let's Get Wed / Wedding Mates?". Record whether the brand appears, whether the legal mechanism is described honestly, and whether the price and offer are correct. If an AI states the legality wrongly (e.g. "your friend legally marries you"), strengthen the answer-first content and the FAQ until the surfaces correct it.
- **Search Console.** Track impressions/clicks for the couple-side core terms ("friend led wedding ceremony", "can my friend be my celebrant australia") and the legality queries; promote any query that surfaces unexpectedly into a dedicated FAQ entry or blog post (with real content).
- **People Also Ask.** Monitor Google PAA around the legality and cost queries for new question opportunities; each genuine new question becomes an FAQ entry (once answerable honestly).
- **Citation consistency audit.** Quarterly, check that every marketplace listing still carries the correct name, contact, and link; fix drift.
- **Schema validation.** Run the Rich Results Test on `/`, `/pricing`, `/how-it-works`, and `/faq` after each significant content change; confirm `Product`, `Course`, `FAQPage`, and `Organization` parse with no errors and that no `AggregateRating` appears until real reviews exist.
- **Honesty re-check on every content edit.** Any change to legality, pricing, GST, or the course must be reflected in the schema, the FAQ, the Entity Statement, and the AI seeds in the same edit, so the surfaces never drift from the truth.

---

WROTE: docs/artifacts/seo.md -- 462 lines, sections: [Keyword Map, Placement Guidelines, Meta Formulas, FAQ Brief, Structured Data Plan, Metadata Implementation, Sitemap/Robots Config, LLM Optimization]
