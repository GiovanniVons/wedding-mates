import type { Metadata } from "next";
import { SITE } from "./site";

interface PageMetaInput {
  title: string;
  description: string;
  /** Path beginning with "/", e.g. "/pricing". Used for canonical + OG url. */
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  /** Functional / gated / conditional-empty routes set this to noindex. */
  noindex?: boolean;
}

/**
 * pageMetadata -- builds a per-route Metadata object with a self-referential
 * canonical, OpenGraph + Twitter cards, and the shared OG image. Titles use the
 * exact seo.md Meta Formulas verbatim from the caller (the root layout sets a
 * "%s | Wedding Mates" template, so callers pass the bare title; absolute titles
 * that already include the brand suffix are passed via `title.absolute`).
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  noindex = false,
}: PageMetaInput): Metadata {
  const url = `${SITE.url}${path === "/" ? "" : path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: SITE.visibleName,
      locale: "en_AU",
      url,
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [
        {
          url: SITE.ogImage,
          width: 1200,
          height: 630,
          alt: "Wedding Mates: get wed your way, married by the one who knows you best",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: [SITE.ogImage],
    },
  };
}
