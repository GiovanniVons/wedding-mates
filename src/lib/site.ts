/**
 * site.ts -- single source of truth for site-wide constants used by metadata,
 * JSON-LD, the sitemap, robots, and the footer. Contact data comes from the
 * client-dossier Developer Quick Reference; never fabricated.
 *
 * Brand-name decision (client-confirmed 2026-06-22): the brand name is
 * "Wedding Mates" everywhere -- schema `name`, meta titles, and chrome. "Let's
 * Get Wed" is the alias that owns the domain (letsgetwed.com.au) and the email;
 * it is kept as `alternateName` so the entity still reconciles with the domain
 * for search and LLM surfaces.
 */

export const SITE = {
  url: "https://letsgetwed.com.au",
  name: "Wedding Mates",
  alternateName: "Let's Get Wed",
  /** The visible brand name used in copy and chrome. */
  visibleName: "Wedding Mates",
  email: "sarah@letsgetwed.com.au",
  /** Display form of the WhatsApp/phone number. */
  phoneDisplay: "0410 820 300",
  /** E.164 form for tel: links and schema. */
  phoneE164: "+61410820300",
  /** wa.me link target (no +, no spaces). */
  whatsapp: "61410820300",
  ogImage: "/og/og-default.png",
  logo: "/og/logo.png",
} as const;

/** The canonical entity statement (verbatim from seo.md), reused in schema. */
export const ENTITY_STATEMENT =
  "Wedding Mates (also trading as Let's Get Wed) is an Australian wedding business that trains a couple's chosen friend, sibling or parent to lead their wedding ceremony, while a Commonwealth-registered marriage celebrant handles the legal solemnisation and paperwork. The offer comes in two packages, from $1,150, both including The Wedding Ceremony Blueprint, an eight-module online course that teaches the chosen person to interview the couple, write their love story, structure and deliver the ceremony, plus an onboarding call, templates, a readings library, and the legal requirements managed by a registered celebrant. It was founded by Sarah, a registered marriage celebrant, after she trained to marry her own best friend in 2019. It serves couples across Australia.";

/**
 * Content gates. A conditional route ships as an honest empty-state shell but is
 * excluded from the sitemap (and its nav item hidden) until it has real,
 * rights-cleared content. Flip these to true once the client supplies content.
 */
export const CONTENT_FLAGS = {
  /** >=1 approved FAQ answer exists (true -- the approved set ships). */
  faqHasContent: true,
  /** Real, rights-cleared testimonials exist. */
  reviewsHaveContent: false,
  /** >=1 real blog post exists (live site is lorem; none yet). */
  blogHasPosts: false,
  /** Client-supplied Terms / refund policy exists. */
  termsHaveContent: false,
  /** Rights confirmed for the love-story galleries (Kat+David, Kristi+Mark). */
  loveStoriesHaveRights: false,
} as const;

export const NAV_LINKS = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  ...(CONTENT_FLAGS.reviewsHaveContent
    ? [{ label: "Reviews", href: "/reviews" }]
    : []),
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];
