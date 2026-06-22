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
  "Real human support the whole way",
  "Peace of mind on the day",
];

export const PRICING_INCLUSIONS: string[] = [
  "The Wedding Ceremony Blueprint, eight modules",
  "Onboarding video call for you and your mate",
  "Legal paperwork handled by a registered celebrant",
  "Ceremony templates and sample scripts",
  "A readings and music library",
  "Performance and nerves strategies",
  "Real human support, every step",
];

/* ── Optional extras (pricing) ── */
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
  {
    title: "Zoom Rehearsal",
    price: "$99",
    description:
      "A 30-minute rehearsal with your celebrant to review the flow and the delivery.",
  },
  {
    title: "Custom Script Review",
    price: "$129",
    description:
      "We review your ceremony script and suggest improvements to make it shine.",
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
      "One package is $950. That includes the Blueprint course that trains your mate, the onboarding call, the templates and readings, and the legal handling. A few optional extras can be added at booking.",
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
          "One package is $950, which includes the Blueprint course that trains your mate, the onboarding call, the templates and readings, and the legal handling. There are a few optional extras you can add at booking.",
      },
      {
        question: "What is included in the $950 package?",
        answer:
          "The Blueprint course (eight modules of training for your mate), an onboarding video call, templates and sample scripts, a readings and music library, performance strategies, and the legal requirements handled by a registered celebrant.",
      },
      {
        question: "Is this cheaper than a traditional celebrant?",
        answer:
          "Often, yes. A traditional registered celebrant in Australia typically ranges from roughly $600 to $1,200 or more. Wedding Mates is one $950 package that also trains your own person and handles the legals, so you are not choosing between personal and professional.",
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
