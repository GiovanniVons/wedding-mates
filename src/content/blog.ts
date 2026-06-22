/**
 * blog.ts -- the blog post source.
 *
 * FORMAT DECISION: a typed POSTS[] array (markdown body strings rendered with
 * react-markdown, the same renderer the course lessons already use) rather than
 * MDX files. This keeps "publish a post" a one-place data edit with no new build
 * tooling or dependencies: add one entry below, then set
 * CONTENT_FLAGS.blogHasPosts = true in src/lib/site.ts. The blog index grid, the
 * /blog/[slug] route and the BlogPosting + BreadcrumbList schema all read this
 * array, so no component or route work is needed at fill time.
 *
 * The array ships EMPTY by design: the live site's blog was lorem ipsum and no
 * real posts exist. We never fabricate articles (content-honesty gate).
 */

export interface BlogPost {
  /** URL slug, e.g. "how-to-officiate-for-a-friend". */
  slug: string;
  /** Post title (used as <h1> and the BlogPosting headline). */
  title: string;
  /** One-line summary for the card and the meta description. */
  excerpt: string;
  /** ISO date, e.g. "2026-07-01". Drives sort order and datePublished. */
  date: string;
  /** Optional cover image path under /public. */
  coverSrc?: string;
  coverAlt?: string;
  /** The post body as markdown (rendered with react-markdown + remark-gfm). */
  bodyMd: string;
}

/**
 * POSTS -- EMPTY until a real post exists. To publish: add one entry here, then
 * set CONTENT_FLAGS.blogHasPosts = true. The index and the [slug] route render
 * automatically and the sitemap + footer/home links surface.
 */
export const POSTS: BlogPost[] = [];

/** Newest first. */
export function getSortedPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
