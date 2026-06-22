import type { MetadataRoute } from "next";
import { SITE, CONTENT_FLAGS } from "@/lib/site";

/**
 * sitemap.ts -- lists ONLY indexable marketing pages with real, shippable
 * content. Conditional routes (FAQ, reviews, blog, terms) auto-exclude
 * themselves via the CONTENT_FLAGS `hasContent` pattern until real content
 * ships. Functional, gated and internal routes are never listed. Priority and
 * changeFrequency are advisory only.
 */

interface Entry {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  include: boolean;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries: Entry[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly", include: true },
    { path: "/how-it-works", priority: 0.9, changeFrequency: "monthly", include: true },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly", include: true },
    { path: "/about", priority: 0.7, changeFrequency: "yearly", include: true },
    { path: "/contact", priority: 0.5, changeFrequency: "yearly", include: true },
    { path: "/faq", priority: 0.8, changeFrequency: "monthly", include: CONTENT_FLAGS.faqHasContent },
    { path: "/reviews", priority: 0.6, changeFrequency: "monthly", include: CONTENT_FLAGS.reviewsHaveContent },
    { path: "/blog", priority: 0.6, changeFrequency: "weekly", include: CONTENT_FLAGS.blogHasPosts },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly", include: CONTENT_FLAGS.termsHaveContent },
    // Privacy ships (or links to the Nexus hosted page); it is indexable.
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly", include: true },
  ];

  return entries
    .filter((e) => e.include)
    .map((e) => ({
      url: `${SITE.url}${e.path === "/" ? "" : e.path}`,
      lastModified,
      changeFrequency: e.changeFrequency,
      priority: e.priority,
    }));
}
