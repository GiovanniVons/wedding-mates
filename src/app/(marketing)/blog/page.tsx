import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ScrollReveal, RevealItem } from "@/components/animations/ScrollReveal";
import { CONTENT_FLAGS } from "@/lib/site";
import { getSortedPosts } from "@/content/blog";

/**
 * Blog index -- CONDITIONAL. The live site's blog was lorem ipsum; no real posts
 * exist. The blog ships as an honest empty index, noindex + excluded from the
 * sitemap until at least one real post exists (no fabricated articles).
 *
 * DROP-IN PATH (one-place data edit): add an entry to POSTS
 * (src/content/blog.ts), then flip CONTENT_FLAGS.blogHasPosts in src/lib/site.ts.
 * This index renders the card grid, the /blog/[slug] route renders the post, and
 * the sitemap + footer/home links surface, all automatically.
 */
export const metadata: Metadata = pageMetadata({
  title: "Wedding Inspiration and Ceremony Tips | Wedding Mates",
  description:
    "Ideas, scripts and confidence for couples and the mates leading their ceremony, from the team behind the Blueprint course.",
  path: "/blog",
  ogTitle: "Wedding inspiration and ceremony tips",
  ogDescription:
    "Ideas and confidence for couples and the mates leading their ceremony.",
  noindex: !CONTENT_FLAGS.blogHasPosts,
});

export default function BlogPage() {
  const posts = CONTENT_FLAGS.blogHasPosts ? getSortedPosts() : [];

  return (
    <>
      {/* Section 1: Intro */}
      <Section space="page-top" spaceBottom="small">
        <Container width="narrow">
          <ScrollReveal>
            <Chip variant="loud" className="mb-[var(--space-4)]">
              The Blog
            </Chip>
            <h1 style={{ margin: 0, color: "var(--color-grape)" }}>
              Wedding Inspiration And Ceremony Tips
            </h1>
            <p
              className="text-large"
              style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-5)" }}
            >
              Ideas, scripts, and confidence for couples and the mates leading their
              day.
            </p>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Section 2: Post grid (real posts) OR the honest empty index */}
      {posts.length > 0 ? (
        <Section space="small">
          <Container>
            <ScrollReveal
              stagger
              className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2 lg:grid-cols-3"
            >
              {posts.map((post) => (
                <RevealItem key={post.slug}>
                  <a
                    href={`/blog/${post.slug}`}
                    className="link-plain card flex h-full flex-col"
                    style={{ padding: "var(--space-5)" }}
                  >
                    <span
                      className="meta-caps"
                      style={{ color: "var(--color-grape-soft)", marginBottom: "var(--space-2)" }}
                    >
                      {new Date(post.date).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <h2
                      className="h3"
                      style={{ margin: 0, marginBottom: "var(--gap-title-body)", color: "var(--color-grape)" }}
                    >
                      {post.title}
                    </h2>
                    <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                      {post.excerpt}
                    </p>
                  </a>
                </RevealItem>
              ))}
            </ScrollReveal>
          </Container>
        </Section>
      ) : (
        <Section space="small">
          <Container width="narrow">
            <ScrollReveal>
              <div
                className="card flex flex-col items-start gap-[var(--space-4)]"
                style={{ backgroundColor: "var(--color-field-tint)", padding: "var(--space-7)" }}
              >
                <h2 className="h3" style={{ marginTop: 0, color: "var(--color-grape)" }}>
                  New Stories Coming Soon
                </h2>
                <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                  We are writing guides for couples planning a friend led wedding and for
                  the mates getting ready to lead one. How to officiate for a friend, what
                  to say, how to calm the nerves. Real, useful, no fluff. Check back soon,
                  or get started while you wait.
                </p>
                <Button as="a" href="/how-it-works" variant="secondary" size="medium">
                  Have your friend lead your ceremony
                </Button>
              </div>
            </ScrollReveal>
          </Container>
        </Section>
      )}
    </>
  );
}
