import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { TestimonialCard, LoveStoryCard } from "@/components/ui/Card";
import { ScrollReveal, RevealItem } from "@/components/animations/ScrollReveal";
import { JsonLd, reviewSchema } from "@/components/seo/JsonLd";
import { CONTENT_FLAGS } from "@/lib/site";
import { TESTIMONIALS, LOVE_STORIES } from "@/content/copy";

/**
 * Reviews -- CONDITIONAL. No real, rights-cleared testimonials exist yet, so the
 * page ships as an honest scaffold (never fabricated quotes) and is noindex +
 * excluded from the sitemap until content exists.
 *
 * DROP-IN PATH (now a one-place data edit): paste entries into TESTIMONIALS
 * and/or LOVE_STORIES (src/content/copy.ts), then flip
 * CONTENT_FLAGS.reviewsHaveContent (and loveStoriesHaveRights) in
 * src/lib/site.ts. This page renders the grid + galleries and emits Review
 * schema automatically; the empty state shows only while both arrays are empty.
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
  const hasTestimonials =
    CONTENT_FLAGS.reviewsHaveContent && TESTIMONIALS.length > 0;
  const hasStories =
    CONTENT_FLAGS.loveStoriesHaveRights && LOVE_STORIES.length > 0;
  const hasAnyProof = hasTestimonials || hasStories;

  return (
    <>
      {/* Review schema emitted only when rights-cleared testimonials exist. */}
      {hasTestimonials && <JsonLd data={reviewSchema(TESTIMONIALS)} />}

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
              {hasAnyProof
                ? "Real weddings, led by real friends. Here, in their words."
                : "Real weddings, led by real friends. Their words, coming soon."}
            </p>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Section 2: Testimonials grid (real data) OR the honest empty state */}
      {hasTestimonials ? (
        <Section space="small">
          <Container>
            <ScrollReveal
              stagger
              className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2 lg:grid-cols-3"
            >
              {TESTIMONIALS.map((t) => (
                <RevealItem key={t.name + t.quote.slice(0, 12)}>
                  <TestimonialCard
                    name={t.name}
                    role={t.role}
                    quote={t.quote}
                    rating={t.rating}
                  />
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
      )}

      {/* Section 3: Love-story galleries (only when rights confirmed) */}
      {hasStories && (
        <Section theme="tint" surface="calm" space="main">
          <Container>
            <ScrollReveal className="mb-[var(--space-6)]">
              <h2 className="h2" style={{ marginTop: 0, color: "var(--color-grape)" }}>
                Real Couples, Real Mates
              </h2>
            </ScrollReveal>
            <ScrollReveal
              stagger
              className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2"
            >
              {LOVE_STORIES.map((s) => (
                <RevealItem key={s.slug}>
                  <LoveStoryCard
                    couple={s.couple}
                    imageSrc={s.imageSrc}
                    imageAlt={s.imageAlt}
                    href={`/love-stories/${s.slug}`}
                  />
                </RevealItem>
              ))}
            </ScrollReveal>
          </Container>
        </Section>
      )}

      {/* Section 4: CTA. The only people who land here have either booked or are
          deciding, so the band leads with sharing a story and offers booking as
          the secondary path (audience-appropriate, not a hard Book Now). */}
      <Section theme="coral" surface="loud" space="large" clip>
        <Container width="narrow" className="flex flex-col items-center text-center">
          <ScrollReveal>
            <h2 className="h2" style={{ marginTop: 0, color: "var(--theme-heading)" }}>
              {hasAnyProof
                ? "Your Story Could Be Next"
                : "Be One Of The First Stories"}
            </h2>
          </ScrollReveal>
          <ScrollReveal
            delay={0.1}
            className="mt-[var(--space-6)] flex flex-col items-center gap-[var(--space-4)] sm:flex-row sm:justify-center"
          >
            <Button as="a" href="/contact" variant="primary" size="large">
              Share Your Story
            </Button>
            <a href="/book" style={{ fontWeight: "var(--font-weight-semibold)" }}>
              Not married yet? Start here
            </a>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
