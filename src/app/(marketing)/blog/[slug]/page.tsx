import { notFound } from "next/navigation";
import { CONTENT_FLAGS } from "@/lib/site";

/**
 * Blog post -- CONDITIONAL scaffold. No real, rights-cleared posts exist yet
 * (the live site's blog is lorem ipsum), so every slug returns 404 rather than
 * shipping a fabricated article. When blogHasPosts flips true and a real-post
 * data source exists, this route renders the answer-first post body, the
 * BlogPosting + BreadcrumbList schema, and the end-of-post Book Now CTA block.
 * Until then it intentionally has no indexable content.
 */
export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  // Awaited so the dynamic param contract is honoured for the real-post batch.
  await props.params;

  if (!CONTENT_FLAGS.blogHasPosts) {
    notFound();
  }

  // Real-post rendering is built in the content batch once posts exist.
  notFound();
}
