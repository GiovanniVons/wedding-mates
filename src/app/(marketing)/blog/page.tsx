import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CONTENT_FLAGS } from "@/lib/site";

/**
 * Blog index -- CONDITIONAL. The live site's blog is lorem ipsum; no real posts
 * exist. The blog ships as an honest empty index, noindex + excluded from the
 * sitemap until at least one real post exists (no fabricated articles). Flip
 * blogHasPosts to true and render the 3-up card grid once real posts ship.
 */
export const metadata: Metadata = pageMetadata({
  title: "Wedding Inspiration and Ceremony Tips | Let's Get Wed",
  description:
    "Ideas, scripts and confidence for couples and the mates leading their ceremony, from the team behind the Blueprint course.",
  path: "/blog",
  ogTitle: "Wedding inspiration and ceremony tips",
  ogDescription:
    "Ideas and confidence for couples and the mates leading their ceremony.",
  noindex: !CONTENT_FLAGS.blogHasPosts,
});

export default function BlogPage() {
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

      {/* Section 2: Honest empty index (no lorem, no fabricated posts) */}
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
    </>
  );
}
