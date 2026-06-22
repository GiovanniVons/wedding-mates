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
      "Sarah is a Commonwealth-registered marriage celebrant who founded Let's Get Wed after training over 300 hours to marry her own best friend in 2019.",
    knowsAbout: ["marriage celebrancy", "wedding ceremony coaching"],
  };
}

/** Product + Offer with the 4 addOn offers (pricing + home). No aggregateRating
 * until real reviews exist; no GST priceSpecification until confirmed. */
export function productSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": PRODUCT_ID,
    name: "Wedding Mates Package",
    description:
      "One package that trains a couple's chosen friend to lead their wedding ceremony and has a registered celebrant handle the legal requirements. Includes The Wedding Ceremony Blueprint course, an onboarding call, templates, a readings library and the legals managed.",
    brand: { "@id": ORG_ID },
    category: "Wedding ceremony service",
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
