import { SITE, ENTITY_STATEMENT } from "@/lib/site";

/**
 * JsonLd -- server-rendered structured data. A single <script type=
 * "application/ld+json"> so crawlers and LLM fetchers see it without executing
 * JS. Pass any schema object (or array) built by the helpers below. Plumbing,
 * copy-adapted from patterns/json-ld.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe; no user input flows in here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;
const SARAH_ID = `${SITE.url}/about#sarah`;
const PRODUCT_ID = `${SITE.url}/pricing#package`;
const COURSE_ID = `${SITE.url}/#blueprint`;
const FAQ_ID = `${SITE.url}/faq#faq`;

/** Organization (site-wide, root layout). `sameAs` left empty until the client
 * supplies real social URLs (do not fabricate). */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: SITE.alternateName,
    url: SITE.url,
    logo: `${SITE.url}${SITE.logo}`,
    description: ENTITY_STATEMENT,
    email: SITE.email,
    telephone: SITE.phoneE164,
    areaServed: { "@type": "Country", name: "Australia" },
    founder: { "@type": "Person", "@id": SARAH_ID },
    knowsAbout: [
      "friend led wedding ceremonies",
      "wedding ceremony writing",
      "marriage celebrancy in Australia",
      "wedding ceremony delivery and public speaking",
    ],
    // sameAs intentionally omitted until the client supplies real profile URLs.
  };
}

/** WebSite (site-wide, root layout). No SearchAction (no on-site search). */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    alternateName: SITE.alternateName,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-AU",
  };
}

/** Person (Sarah, /about). Surname not provided; not invented. */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": SARAH_ID,
    name: "Sarah",
    jobTitle: "Registered Marriage Celebrant and Founder",
    worksFor: { "@id": ORG_ID },
    description:
      "Sarah is a Commonwealth-registered marriage celebrant who founded Wedding Mates after training over 300 hours to marry her own best friend in 2019.",
    knowsAbout: ["marriage celebrancy", "wedding ceremony coaching"],
  };
}

/** Product + Offer with the 4 addOn offers (pricing + home). aggregateRating is
 * attached only when rights-cleared, fully-rated reviews exist (pass the result
 * of aggregateRatingSchema(TESTIMONIALS); it is null while none exist, so no
 * rating ships). No GST priceSpecification until confirmed (see seo.md / the GST
 * gate); add priceSpecification.valueAddedTaxIncluded once the client confirms
 * the tax status. */
export function productSchema(aggregateRating?: object | null) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": PRODUCT_ID,
    name: "Wedding Mates Package",
    description:
      "One package that trains a couple's chosen friend to lead their wedding ceremony and has a registered celebrant handle the legal requirements. Includes The Wedding Ceremony Blueprint course, an onboarding call, templates, a readings library and the legals managed.",
    brand: { "@id": ORG_ID },
    category: "Wedding ceremony service",
    ...(aggregateRating ? { aggregateRating } : {}),
    offers: {
      "@type": "Offer",
      priceCurrency: "AUD",
      price: "950.00",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/book`,
      areaServed: { "@type": "Country", name: "Australia" },
      seller: { "@id": ORG_ID },
      addOn: [
        { "@type": "Offer", name: "Official Marriage Certificate", price: "69.00", priceCurrency: "AUD" },
        { "@type": "Offer", name: "Registered Celebrant in Attendance", price: "299.00", priceCurrency: "AUD" },
        { "@type": "Offer", name: "Zoom Rehearsal with Celebrant", price: "99.00", priceCurrency: "AUD" },
        { "@type": "Offer", name: "Custom Script Review", price: "129.00", priceCurrency: "AUD" },
      ],
    },
  };
}

/** Course (The Wedding Ceremony Blueprint, ~PT16H). */
export function courseSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": COURSE_ID,
    name: "The Wedding Ceremony Blueprint",
    description:
      "An eight-module online course that trains a couple's chosen friend to interview the couple, write their love story, structure and mark up the ceremony, add music, readings and vows, and deliver it with confidence. Included in the Wedding Mates package.",
    provider: { "@id": ORG_ID },
    inLanguage: "en-AU",
    isAccessibleForFree: false,
    offers: {
      "@type": "Offer",
      category: "Paid",
      priceCurrency: "AUD",
      price: "950.00",
      url: `${SITE.url}/book`,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT16H",
    },
  };
}

/** FAQPage built from the SAME data source as the rendered accordion so schema
 * and visible text cannot drift. Only approved, visibly-rendered questions. */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": FAQ_ID,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/* ---------------------------------------------------------------------------
 * Proof + content schema (gated; only emitted when real content exists).
 * These helpers exist NOW so dropping in reviews / blog posts later is a data
 * edit, not a code change. They are NOT rendered while the source arrays are
 * empty (the pages guard on the CONTENT_FLAGS), so no empty/fabricated schema
 * ever ships.
 * ------------------------------------------------------------------------- */

interface ReviewInput {
  name: string;
  role?: string;
  quote: string;
  rating?: number;
}

/** Review[] for the reviews page. Built from the SAME TESTIMONIALS the page
 * renders so schema and visible quotes cannot drift. Only call with non-empty,
 * rights-cleared input. */
export function reviewSchema(items: ReviewInput[]) {
  return items.map((item) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@id": PRODUCT_ID },
    author: { "@type": "Person", name: item.name },
    reviewBody: item.quote,
    ...(typeof item.rating === "number"
      ? {
          reviewRating: {
            "@type": "Rating",
            ratingValue: item.rating,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  }));
}

/** AggregateRating for the Product, derived from rated testimonials. Returns
 * null unless EVERY item carries a numeric rating (so the average is honest).
 * Attach the result to the Product offer only when non-null. */
export function aggregateRatingSchema(items: ReviewInput[]) {
  if (items.length === 0) return null;
  const rated = items.filter((i) => typeof i.rating === "number");
  if (rated.length !== items.length) return null;
  const total = rated.reduce((sum, i) => sum + (i.rating as number), 0);
  return {
    "@type": "AggregateRating",
    ratingValue: Number((total / rated.length).toFixed(1)),
    reviewCount: rated.length,
    bestRating: 5,
    worstRating: 1,
  };
}

interface BlogPostInput {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  coverSrc?: string;
}

/** BlogPosting for a single /blog/[slug] page. */
export function blogPostingSchema(post: BlogPostInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE.url}/blog/${post.slug}#post`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-AU",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
    ...(post.coverSrc ? { image: `${SITE.url}${post.coverSrc}` } : {}),
  };
}

/** BreadcrumbList for a nested page (e.g. a blog post or a love-story gallery).
 * Pass crumbs as [{ name, path }] from the site root downward. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE.url}${c.path === "/" ? "" : c.path}`,
    })),
  };
}
