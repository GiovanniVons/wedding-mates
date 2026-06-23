/**
 * copy.ts -- all marketing page copy, typed, lifted verbatim from
 * docs/artifacts/page-copy.md. Strings are used literally (AU English, no em
 * dashes, no double hyphens in client-facing copy). FAQ items live here once and
 * feed both the rendered accordion and the FAQPage schema so they cannot drift.
 */

export interface Step {
  numeral: string;
  title: string;
  body: string;
  iconSrc: string;
  iconAlt: string;
}

export interface Feature {
  iconSrc: string;
  iconAlt: string;
  title: string;
  body: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Extra {
  title: string;
  price: string;
  description: string;
}

/* ── Home: the 4-step process ── */
export const HOME_STEPS: Step[] = [
  {
    numeral: "01",
    title: "Choose Your Celebrant",
    body: "Pick the person who knows you best. A sibling, a parent, the mate who has been there for everything. The one whose voice already means something to you both.",
    iconSrc: "/images/icons/camera.svg",
    iconAlt: "Choosing your celebrant",
  },
  {
    numeral: "02",
    title: "They Get Trained And Supported",
    body: "Your mate works through the Blueprint course at their own pace. We teach them how to interview you, write your story, and deliver it with calm hands. Sarah is one message away the whole time.",
    iconSrc: "/images/icons/edit.svg",
    iconAlt: "Training and support",
  },
  {
    numeral: "03",
    title: "We Handle The Legals",
    body: "A registered celebrant takes care of the legal paperwork and requirements before the day, so your mate can keep their eyes on you and not on the admin.",
    iconSrc: "/images/icons/performance.svg",
    iconAlt: "We handle the legals",
  },
  {
    numeral: "04",
    title: "A Wedding That Goes Down In The Books",
    body: "Your mate leads a ceremony in a voice you already love. More laughter, more tears, more of you two. The kind of wedding people talk about for years.",
    iconSrc: "/images/icons/music.svg",
    iconAlt: "A wedding to remember",
  },
];

/* ── The Blueprint 4-feature grid ── */
export const BLUEPRINT_FEATURES: Feature[] = [
  {
    iconSrc: "/images/icons/camera.svg",
    iconAlt: "Capturing your love story",
    title: "Capture Your Love Story",
    body: "We teach your mate the questions that uncover the real story. The meet-cute, the turning point, the proposal. The little moments that make the room lean in.",
  },
  {
    iconSrc: "/images/icons/edit.svg",
    iconAlt: "Writing your ceremony",
    title: "Write A Ceremony That's You",
    body: 'Facts become a story. Your mate learns to turn "they met at work" into the version that makes people laugh, then reach for a tissue. In your voice, about you.',
  },
  {
    iconSrc: "/images/icons/performance.svg",
    iconAlt: "Performance and delivery tips",
    title: "Deliver With Confidence",
    body: "Pace, pauses, and the line that lands. Performance tips that calm the nerves and turn a flat reading into a moment the whole room feels.",
  },
  {
    iconSrc: "/images/icons/music.svg",
    iconAlt: "Coordinating music, readings and vows",
    title: "Coordinate Every Moment",
    body: "Music, readings, vows, the cue for the kiss. Your mate learns to weave in everyone else so the whole ceremony flows without a hitch.",
  },
];

/* ── Inclusions (home teaser + pricing) ── */
export const HOME_INCLUSIONS: string[] = [
  "The full Blueprint course, eight modules",
  "Onboarding video call with you and your mate",
  "Legal paperwork handled by a registered celebrant",
  "Ceremony templates and sample scripts",
  "A readings and music library",
  "Performance and nerves strategies",
  "A live Zoom rehearsal with your celebrant",
  "A custom review of your ceremony script",
  "Real human support the whole way",
  "Peace of mind on the day",
];

/* ── Optional extras (pricing). The rehearsal and script review are no longer
   here: they are built into The Ceremony, Complete tier (see lib/stripe/pricing
   TIERS), not sold as add-ons. ── */
export const EXTRAS: Extra[] = [
  {
    title: "Official Marriage Certificate",
    price: "$69",
    description:
      "Only required for name changes and visa applications, this is the official certificate issued by the Registry.",
  },
  {
    title: "Celebrant In Attendance",
    price: "$299",
    description:
      "A registered celebrant attends your ceremony in person as backup or to legally officiate.",
  },
];

/* ── Home FAQ (render set per seo.md: Q1, Q2, Q3, Q5, one logistics) ── */
export const HOME_FAQ: Faq[] = [
  {
    question: "Can a friend really marry us in Australia?",
    answer:
      "Yes. Your mate leads and delivers the ceremony, and a registered celebrant handles the legal side, the solemnisation and paperwork, so the marriage is fully valid. Your friend gets the personal moment; we make sure the legals are sorted.",
  },
  {
    question: "Is a friend led ceremony actually legal?",
    answer:
      "Yes. In Australia the law requires a Commonwealth-registered celebrant to handle the legal marriage. With Wedding Mates, a registered celebrant takes care of every legal requirement before the day, while your chosen mate leads the ceremony itself. You get a wedding that is both deeply personal and completely valid.",
  },
  {
    question: "Can my friend pull this off if they have never done it?",
    answer:
      "That is exactly what the Blueprint course is for. Across eight modules it teaches your mate how to interview you, write your love story, structure the ceremony, and deliver it with confidence, including how to handle nerves. Most people who lead are not public speakers. They just love you, and we get them ready.",
  },
  {
    question: "What does it cost?",
    answer:
      "Two packages. The Ceremony is $1,150, and The Ceremony, Complete is $1,490 and adds a rehearsal and a script review so your mate walks in ready, which is why most couples choose it. Both include the Blueprint course that trains your mate, the onboarding call, the templates and readings, and the legal handling. A couple of optional extras can be added at booking.",
  },
  {
    question: "How far in advance do we need to book?",
    answer:
      "The more time your mate has to work through the course and prepare, the better, ideally a few months out. If your wedding is less than four weeks away, we can still help; your legal marriage may be registered after the ceremony and we will guide you through it.",
  },
];

/* ── Full FAQ page, grouped. Only client-approved answers ship; the refund
   group is omitted entirely until the client supplies Terms. ── */
export interface FaqGroup {
  group: string;
  items: Faq[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    group: "Legality",
    items: [
      {
        question: "Can a friend really marry us in Australia?",
        answer:
          "Yes. Your mate leads and delivers the ceremony, and a registered celebrant handles the legal side, the solemnisation and paperwork, so the marriage is fully valid. Your friend gets the personal moment; we make sure the legals are sorted.",
      },
      {
        question: "Is a friend led ceremony actually legal?",
        answer:
          "Yes. In Australia, the law requires a Commonwealth-registered celebrant to handle the legal marriage. With Wedding Mates, a registered celebrant takes care of every legal requirement before the day, while your chosen mate leads the ceremony itself. You get a wedding that is both deeply personal and completely valid.",
      },
      {
        question: "Who handles the legal paperwork?",
        answer:
          "A registered celebrant. They take care of the legal solemnisation and the pre-ceremony paperwork before the day, so your mate can focus entirely on leading the ceremony and being present with you.",
      },
      {
        question: "Do you need a registered celebrant in Australia?",
        answer:
          "Yes. Australian law requires a Commonwealth-registered celebrant to legally marry a couple. That is exactly why we include one. Your mate brings the personal ceremony; the registered celebrant brings the legal validity. You do not have to choose between the two.",
      },
    ],
  },
  {
    group: "The Mate (can they do it)",
    items: [
      {
        question: "Can my friend pull this off if they have never done it?",
        answer:
          "That is exactly what the Blueprint course is for. Over eight modules it teaches your mate how to interview you, write your love story, structure the ceremony, and deliver it with confidence, including how to handle nerves. Most people who lead are not public speakers. They just love you, and we get them ready.",
      },
      {
        question: "What does my mate actually have to do?",
        answer:
          "They work through the Blueprint course, around fifteen to seventeen hours across learning, interviewing you, writing, and rehearsing, then lead the ceremony on the day. We support them the whole way, by email or WhatsApp, whenever they get stuck.",
      },
    ],
  },
  {
    group: "Pricing & Extras",
    items: [
      {
        question: "What does it cost?",
        answer:
          "Two packages. The Ceremony is $1,150 and The Ceremony, Complete is $1,490. Both include the Blueprint course that trains your mate, the onboarding call, the templates and readings, and the legal handling; Complete adds a rehearsal and a script review. A couple of optional extras can be added at booking.",
      },
      {
        question: "What is the difference between the two packages?",
        answer:
          "The Ceremony ($1,150) gives your mate everything they need to lead the day: the eight-module Blueprint course, the onboarding call, templates and readings, performance strategies, and the legals handled by a registered celebrant. The Ceremony, Complete ($1,490) adds the two things that make sure your mate walks in ready: a live Zoom rehearsal with your celebrant and a custom review of your ceremony script. Most couples choose Complete.",
      },
      {
        question: "Why have your own person lead instead of a traditional celebrant?",
        answer:
          "Because the person standing up there matters. A wedding already costs many thousands of dollars to capture and dress the ceremony; this makes the ceremony itself irreplaceable, led by someone who actually knows you, with the legals fully handled by a registered celebrant and your mate trained and ready. You are not choosing between personal and professional. You get both.",
      },
      {
        question: "Do we get a marriage certificate?",
        answer:
          "The official marriage certificate is an optional extra ($69), usually needed for name changes or visa applications. Your legal marriage is recorded regardless; the certificate is the formal document you can order.",
      },
    ],
  },
  {
    group: "Logistics & Timing",
    items: [
      {
        question: "How far in advance do we need to book?",
        answer:
          "The more time your mate has to work through the course and prepare, the better, ideally a few months out. If your wedding is less than four weeks away, we can still help; your legal marriage may be registered after the ceremony and we will guide you through it.",
      },
      {
        question:
          "Can we still get our marriage legally registered if we book close to the date?",
        answer:
          "Yes, we will guide you through it. For weddings under four weeks out, the legal registration may happen after the ceremony, and we make sure every step is completed smoothly.",
      },
    ],
  },
];

/** Flattened FAQ items (every group) for the FAQPage schema on /faq. */
export const ALL_FAQ_ITEMS: Faq[] = FAQ_GROUPS.flatMap((g) => g.items);

/* ===========================================================================
 * PROOF CONTENT (testimonials + love-story galleries)
 *
 * Both arrays ship EMPTY by design: no rights-cleared quotes or couple photos
 * exist yet, and we never fabricate proof (per the content-honesty gate). The
 * render surfaces (reviews page, home Section 8, the gallery route) and the
 * Review / AggregateRating schema are already wired to read these arrays, so
 * going live is a one-place DATA EDIT: paste real entries here, then flip the
 * matching CONTENT_FLAG in src/lib/site.ts (reviewsHaveContent /
 * loveStoriesHaveRights). No component or route work is needed at fill time.
 * ======================================================================== */

export interface Testimonial {
  /** First name (or "Name and Name") -- never invent a surname. */
  name: string;
  /** The reviewer's role, e.g. "Bride" or "The mate who led the ceremony". */
  role?: string;
  /** The rights-cleared quote, in their words. */
  quote: string;
  /** 1-5. Optional; only emitted into AggregateRating when EVERY item has one. */
  rating?: number;
}

/**
 * TESTIMONIALS -- EMPTY until rights-cleared reviews exist. To go live: paste
 * the approved entries here, then set CONTENT_FLAGS.reviewsHaveContent = true.
 * The reviews page renders the grid and emits Review schema automatically; if
 * every entry carries a `rating`, AggregateRating is emitted onto the Product
 * too (see JsonLd reviewSchema / aggregateRatingSchema).
 */
export const TESTIMONIALS: Testimonial[] = [];

export interface LoveStory {
  /** URL slug for the gallery route, e.g. "kat-and-david". */
  slug: string;
  /** Couple display name, e.g. "Kat and David". */
  couple: string;
  /** Cover image path under /public; undefined renders the honest empty card. */
  imageSrc?: string;
  imageAlt?: string;
  /** Rights-cleared gallery image paths under /public (for the gallery route). */
  gallery?: { src: string; alt: string }[];
  /** One-line caption shown on the gallery page. */
  caption?: string;
}

/**
 * LOVE_STORIES -- EMPTY until photo rights are confirmed (Kat+David,
 * Kristi+Mark). To go live: paste entries here (with imageSrc + gallery paths),
 * then set CONTENT_FLAGS.loveStoriesHaveRights = true. Home Section 8, the
 * reviews page and the /love-stories/[slug] gallery route all read this array,
 * so no component work is needed at fill time. Without imageSrc, LoveStoryCard
 * renders its honest "photos coming soon" empty state rather than a faked photo.
 */
export const LOVE_STORIES: LoveStory[] = [];

export function getLoveStoryBySlug(slug: string): LoveStory | undefined {
  return LOVE_STORIES.find((s) => s.slug === slug);
}
