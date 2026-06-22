import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { CtaBand } from "@/components/sections/CtaBand";
import { LessonBody } from "@/components/course/LessonBody";
import {
  JsonLd,
  blogPostingSchema,
  breadcrumbSchema,
} from "@/components/seo/JsonLd";
import { CONTENT_FLAGS } from "@/lib/site";
import { getPostBySlug, getSortedPosts } from "@/content/blog";

/**
 * Blog post -- CONDITIONAL, data-driven. Renders a real post from POSTS
 * (src/content/blog.ts) when blogHasPosts is on; 404s when the flag is off or
 * the slug is unknown, so a fabricated article never ships. The answer-first
 * markdown body reuses the course LessonBody renderer, and the page emits
 * BlogPosting + BreadcrumbList schema. Publishing a post is a one-place data
 * edit: add to POSTS, flip blogHasPosts.
 */

export function generateStaticParams() {
  if (!CONTENT_FLAGS.blogHasPosts) return [];
  return getSortedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = CONTENT_FLAGS.blogHasPosts ? getPostBySlug(slug) : undefined;
  if (!post) {
    return pageMetadata({
      title: "Post not found | Wedding Mates",
      description: "This blog post could not be found.",
      path: `/blog/${slug}`,
      noindex: true,
    });
  }
  return pageMetadata({
    title: `${post.title} | Wedding Mates`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  if (!CONTENT_FLAGS.blogHasPosts) {
    notFound();
  }
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <Section theme="page" surface="calm" space="page-top" spaceBottom="main">
        <Container width="read">
          <Chip variant="calm" className="mb-[var(--space-3)]">
            The Blog
          </Chip>
          <h1 style={{ margin: 0, color: "var(--color-grape)" }}>{post.title}</h1>
          <p
            className="meta-caps"
            style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-4)" }}
          >
            {new Date(post.date).toLocaleDateString("en-AU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          {post.coverSrc && (
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: "3 / 2",
                borderRadius: "var(--radius-main)",
                marginTop: "var(--space-6)",
              }}
            >
              <Image
                src={post.coverSrc}
                alt={post.coverAlt ?? ""}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 624px"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
          <div style={{ marginTop: "var(--space-7)" }}>
            <LessonBody markdown={post.bodyMd} />
          </div>
        </Container>
      </Section>

      <CtaBand
        theme="coral"
        hype={{
          cue: "Your Turn",
          segments: [{ text: "Ready to" }, { text: "begin", hit: true }, { text: "?" }],
          burst: false,
        }}
        body="When you are ready, have the person who knows you best lead your ceremony. One package, the legals handled, your mate trained and supported the whole way."
        primaryLabel="Book Now"
        primaryHref="/book"
        secondary={{ label: "How it works", href: "/how-it-works" }}
      />
    </>
  );
}
