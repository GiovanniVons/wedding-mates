import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Card, PricingCard } from "@/components/ui/Card";
import { CtaBand } from "@/components/sections/CtaBand";
import { ScrollReveal, RevealItem } from "@/components/animations/ScrollReveal";
import {
  JsonLd,
  productSchema,
  courseSchema,
  aggregateRatingSchema,
} from "@/components/seo/JsonLd";
import { EXTRAS, TESTIMONIALS } from "@/content/copy";
import { TIERS, centsToDollars } from "@/lib/stripe/pricing";

export const metadata: Metadata = pageMetadata({
  title: "Friend Led Wedding Packages, From $1,150 | Wedding Mates",
  description:
    "Two ways to get wed your way: The Ceremony ($1,150) or The Ceremony, Complete ($1,490). The Blueprint course that trains your mate, the legals handled by a registered celebrant, plus optional extras.",
  path: "/pricing",
  ogTitle: "Friend led wedding packages, from $1,150",
  ogDescription:
    "Everything your mate needs to lead your ceremony, plus the legals handled. Two packages from $1,150, with optional extras you can add at booking.",
});

export default function PricingPage() {
  return (
    <>
      {/* aggregateRating attaches only when fully-rated, rights-cleared reviews
          exist (null while TESTIMONIALS is empty, so no rating ships today). */}
      <JsonLd
        data={[
          productSchema(aggregateRatingSchema(TESTIMONIALS)),
          courseSchema(),
        ]}
      />

      {/* Section 1: The Packages */}
      <Section space="page-top" spaceBottom="main">
        <Container>
          <ScrollReveal className="mb-[var(--space-7)] text-center">
            <Chip variant="loud" className="mb-[var(--space-4)]">
              The Investment
            </Chip>
            <h1 style={{ margin: 0, color: "var(--color-grape)" }}>
              Two Ways To Get Wed Your Way.
            </h1>
            <p
              style={{
                color: "var(--color-grape-soft)",
                marginTop: "var(--space-5)",
                maxWidth: "62ch",
                marginInline: "auto",
              }}
            >
              Both packages train your chosen mate to lead the ceremony and have a
              registered celebrant handle every legal requirement. Most couples choose
              The Ceremony, Complete, which adds the rehearsal and script review that
              make sure your mate walks in ready. Founding-couples pricing while we are
              new.
            </p>
          </ScrollReveal>
          <ScrollReveal y={28} className="grid items-stretch gap-[var(--space-5)] md:grid-cols-2">
            {TIERS.map((tier) => (
              <PricingCard
                key={tier.key}
                price={`$${centsToDollars(tier.amountCents).toLocaleString("en-AU")}`}
                priceEyebrow={tier.recommended ? "Most popular" : "The package"}
                heading={tier.name}
                tagline={tier.tagline}
                inclusions={tier.inclusions}
                recommended={tier.recommended}
                badge="Most couples choose this"
              >
                <Button
                  as="a"
                  href={`/book?tier=${tier.key}`}
                  variant={tier.recommended ? "primary" : "secondary"}
                  size="large"
                  fullWidth
                >
                  Book {tier.name}
                </Button>
              </PricingCard>
            ))}
          </ScrollReveal>
        </Container>
      </Section>

      {/* Section 2: Optional Extras */}
      <Section theme="tint" surface="calm" space="main">
        <Container>
          <ScrollReveal className="mb-[var(--space-6)] max-w-[var(--container-narrow)]">
            <h2 className="h2" style={{ marginTop: 0, color: "var(--color-grape)" }}>
              Add Anything You Like, No Pressure
            </h2>
            <p style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-3)" }}>
              These are optional. Add them at booking or leave them; the base package
              stands on its own.
            </p>
          </ScrollReveal>
          <ScrollReveal stagger className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2">
            {EXTRAS.map((extra) => (
              <RevealItem key={extra.title}>
                <Card className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-[var(--space-3)]">
                    <h3 className="h3" style={{ marginTop: 0, marginBottom: 0, color: "var(--color-grape)" }}>
                      {extra.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--font-size-h2)",
                        color: "var(--color-coral-deep)",
                        lineHeight: 1,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {extra.price}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "var(--color-grape-soft)",
                      marginTop: "var(--space-3)",
                      marginBottom: 0,
                    }}
                  >
                    {extra.description}
                  </p>
                </Card>
              </RevealItem>
            ))}
          </ScrollReveal>

          {/* Section 3: GST Note (neutral holding line until confirmed) */}
          <ScrollReveal className="mt-[var(--space-6)]">
            <p
              style={{
                color: "var(--color-grape-soft)",
                fontSize: "var(--font-size-text-small)",
                margin: 0,
              }}
            >
              All prices are in Australian dollars. Your receipt will show the full
              breakdown.
            </p>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Section 4: CTA */}
      <CtaBand
        theme="coral"
        hype={{
          cue: "Let's Go",
          segments: [
            { text: "One price. One decision." },
            { text: "Let's go", hit: true },
            { text: "." },
          ],
          burst: true,
        }}
        primaryLabel="Book Now"
        primaryHref="/book"
        secondary={{ label: "How the friend led model works", href: "/how-it-works" }}
      />
    </>
  );
}
