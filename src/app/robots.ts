import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * robots.ts -- the authoritative robots route handler (replaces the static
 * public/robots.txt). Blocks AI-training crawlers while allowing AI-search and
 * traditional search bots; disallows the functional / gated / internal route
 * prefixes per seo.md. The per-page `robots: { index: false }` metadata is the
 * authoritative noindex; these Disallow rules are belt-and-braces.
 */

const FUNCTIONAL_DISALLOW = [
  "/book",
  "/book/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/course",
  "/course/",
  "/design-book",
  "/api/",
];

// AI training crawlers blocked entirely (matches the prior public/robots.txt).
const TRAINING_BOTS = [
  "GPTBot",
  "CCBot",
  "Google-Extended",
  "Bytespider",
  "meta-externalagent",
  "meta-externalfetcher",
  "PetalBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...TRAINING_BOTS.map((userAgent) => ({ userAgent, disallow: "/" })),
      {
        userAgent: "*",
        allow: "/",
        disallow: FUNCTIONAL_DISALLOW,
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
