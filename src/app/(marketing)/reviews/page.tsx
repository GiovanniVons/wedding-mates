import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CONTENT_FLAGS } from "@/lib/site";

/**
 * Reviews -- CONDITIONAL. No real, rights-cleared testimonials exist yet, so the
 * page ships as an honest scaffold (never fabricated quotes) and is noindex +
 * excluded from the sitemap until content exists. When reviewsHaveContent flips
 * true, the page indexes and the testimonials grid + love-story galleries fill
 * in (and the Review / AggregateRating schema is added).
 */
export const metadata: Metadata = pageMetadata({
  title: "Real Friend Led Wedding Stories | Let's Get Wed",
  description:
    "Couples and the mates who married them share how a friend led ceremony felt more personal than a stranger ever could.",
  path: "/reviews",
  ogTitle: "Friend led wedding stories, in their own words",
  ogDescription:
    "Couples and the mates who married them on what a friend led ceremony really felt like.",
  noindex: !CONTENT_FLAGS.reviewsHaveContent,
});

export default function ReviewsPage() {
  return (
    <>
      {/* Section 1: Intro */}
      <Section space="page-top" spaceBottom="small">
        <Container width="narrow">
          <ScrollReveal>
            <Chip variant="loud" className="mb-[var(--space-4)]">
              Love Stories
            </Chip>
            <h1 style={{ margin: 0, color: "var(--color-grape)" }}>
              Stories From The Couples And Their Mates
            </h1>
            <p
              className="text-large"
              style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-5)" }}
            >
              Real weddings, led by real friends. Their words, coming soon.
            </p>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Section 2: Honest empty state (no fabricated quotes) */}
      <Section space="small">
        <Container width="narrow">
          <ScrollReveal>
            <div
              className="card flex flex-col items-start gap-[var(--space-4)]"
              style={{ backgroundColor: "var(--color-field-tint)", padding: "var(--space-7)" }}
            >
              <h2 className="h3" style={{ marginTop: 0, color: "var(--color-grape)" }}>
                Real Stories, On The Way
              </h2>
              <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                We are gathering reviews from couples and the mates who married them. We
                would rather show you real words than invented ones, so this space is
                honestly empty for now. If you have been married through Wedding Mates
                and would like to share your story, we would love to hear it.
              </p>
              <Button as="a" href="/contact" variant="secondary" size="medium">
                Share your story
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Section 4: CTA */}
      <Section theme="coral" surface="loud" space="large">
        <Container width="narrow" className="text-center">
          <ScrollReveal>
            <h2 className="h2" style={{ marginTop: 0, color: "var(--theme-heading)" }}>
              Write Your Own Wedding Story
            </h2>
            <div className="mt-[var(--space-6)]">
              <Button as="a" href="/book" variant="primary" size="large">
                Book Now
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
