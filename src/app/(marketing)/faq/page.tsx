import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Accordion } from "@/components/ui/Accordion";
import { CtaBand } from "@/components/sections/CtaBand";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";
import { FAQ_GROUPS, ALL_FAQ_ITEMS } from "@/content/copy";

export const metadata: Metadata = pageMetadata({
  title: "Friend Led Wedding FAQ | Let's Get Wed",
  description:
    "Your questions answered: how a friend led ceremony works in Australia, who handles the legals, the cost, and what your mate actually has to do.",
  path: "/faq",
  ogTitle: "Friend led wedding ceremonies in Australia: your questions, answered",
  ogDescription:
    "Is it legal? Can my friend do it? What does it cost? Honest answers about having a mate lead your ceremony.",
});

export default function FaqPage() {
  return (
    <>
      {/* FAQPage schema built from the SAME data source as the rendered accordion. */}
      <JsonLd data={faqSchema(ALL_FAQ_ITEMS)} />

      {/* Section 1: Intro */}
      <Section space="page-top" spaceBottom="main">
        <Container width="narrow">
          <ScrollReveal>
            <Chip variant="loud" className="mb-[var(--space-4)]">
              The Two Big Questions
            </Chip>
            <h1 style={{ margin: 0, color: "var(--color-grape)" }}>
              Friend Led Weddings: Your Questions, Answered
            </h1>
            <p
              className="text-large"
              style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-5)" }}
            >
              Can a friend legally marry you in Australia? In short: your friend leads
              and delivers the ceremony, and a registered celebrant handles the legal
              side, so the marriage is fully valid. Below are honest answers to
              everything else couples ask us before they book.
            </p>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Section 2: Grouped Accordions */}
      <Section space="small">
        <Container width="narrow">
          <div className="flex flex-col gap-[var(--space-8)]">
            {FAQ_GROUPS.map((group) => (
              <ScrollReveal key={group.group}>
                <h2
                  className="meta-caps"
                  style={{ color: "var(--color-coral-deep)", margin: 0, marginBottom: "var(--space-4)" }}
                >
                  {group.group}
                </h2>
                <Accordion items={group.items} />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 3: Still Stuck CTA */}
      <CtaBand
        theme="coral"
        hype={{
          cue: "We're Here",
          segments: [
            { text: "Still deciding? We're" },
            { text: "here", hit: true },
            { text: "." },
          ],
        }}
        body="Ask us anything before you book. Real, human answers."
        primaryLabel="Book Now"
        primaryHref="/book"
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
