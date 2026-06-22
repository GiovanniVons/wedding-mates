import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Card, PricingCard } from "@/components/ui/Card";
import { CtaBand } from "@/components/sections/CtaBand";
import { ScrollReveal, RevealItem } from "@/components/animations/ScrollReveal";
import { JsonLd, productSchema, courseSchema } from "@/components/seo/JsonLd";
import { PRICING_INCLUSIONS, EXTRAS } from "@/content/copy";

export const metadata: Metadata = pageMetadata({
  title: "Friend Led Wedding, One Price: $950 | Let's Get Wed",
  description:
    "One $950 package: the Blueprint course that trains your mate, the legals handled by a registered celebrant, plus optional extras. See exactly what is included.",
  path: "/pricing",
  ogTitle: "One price for a friend led wedding ceremony: $950",
  ogDescription:
    "Everything your mate needs to lead your ceremony, plus the legals handled. $950, with optional extras you can add at booking.",
});

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[productSchema(), courseSchema()]} />

      {/* Section 1: The Package */}
      <Section space="page-top" spaceBottom="main">
        <Container width="narrow">
          <ScrollReveal className="mb-[var(--space-6)] text-center">
            <Chip variant="loud" className="mb-[var(--space-4)]">
              The Investment
            </Chip>
            <h1 style={{ margin: 0, color: "var(--color-grape)" }}>
              $950. Everything Your Mate Needs.
            </h1>
            <p
              style={{
                color: "var(--color-grape-soft)",
                marginTop: "var(--space-5)",
                maxWidth: "60ch",
                marginInline: "auto",
              }}
            >
              A friend led wedding ceremony costs one flat price of $950. That covers
              the Blueprint course that trains your chosen mate and the legal
              requirements handled by a registered celebrant. No tiers, no surprises,
              no per-hour celebrant fees.
            </p>
          </ScrollReveal>
          <ScrollReveal y={28}>
            <PricingCard
              price="$950"
              heading="Everything Your Mate Needs"
              inclusions={PRICING_INCLUSIONS}
            >
              <Button as="a" href="/book" variant="primary" size="large" fullWidth>
                Book Now
              </Button>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--font-size-h3)",
                  color: "var(--color-grape)",
                  textTransform: "uppercase",
                  textAlign: "center",
                  marginTop: "var(--space-5)",
                  marginBottom: 0,
                }}
              >
                The memories: <span style={{ color: "var(--color-coral-deep)" }}>priceless</span>.
              </p>
            </PricingCard>
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
