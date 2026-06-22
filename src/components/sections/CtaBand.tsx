import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HypeLine, type HypeSegment } from "@/components/ui/HypeLine";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface CtaBandProps {
  /** "coral" = the loud eruption band; "tint" = the calm restraint close. */
  theme?: "coral" | "tint" | "grape";
  /** Plain calm heading (used when no Hype Line). */
  heading?: string;
  /** Optional Hype Line lockup (the peak version). */
  hype?: { cue: string; segments: HypeSegment[]; burst?: boolean };
  body?: string;
  primaryLabel: string;
  primaryHref: string;
  secondary?: { label: string; href: string };
}

/**
 * CtaBand -- the marketing close. A loud coral band runs a centred Hype Line +
 * one confetti burst (the page's permitted eruption); a calm tint band runs a
 * plain heading with no burst (restraint as craft, e.g. the About close).
 * On the coral/grape band the primary CTA flips to a grape fill + white label
 * (handled by Zone 4 per data-theme); the secondary link inherits the inverted
 * link colour.
 */
export function CtaBand({
  theme = "coral",
  heading,
  hype,
  body,
  primaryLabel,
  primaryHref,
  secondary,
}: CtaBandProps) {
  const onDark = theme === "coral" || theme === "grape";
  return (
    <Section theme={theme} surface={onDark ? "loud" : "calm"} space="large" clip>
      <Container width="narrow" className="flex flex-col items-center text-center">
        {hype ? (
          <HypeLine
            cue={hype.cue}
            segments={hype.segments}
            scale="section"
            variant={theme === "coral" ? "grape" : "light"}
            align="center"
            burst={hype.burst}
            as="h2"
            className="mb-[var(--space-5)]"
          />
        ) : (
          heading && (
            <ScrollReveal>
              <h2
                className="h2"
                style={{
                  margin: 0,
                  marginBottom: "var(--space-5)",
                  color: "var(--theme-heading)",
                }}
              >
                {heading}
              </h2>
            </ScrollReveal>
          )
        )}
        {body && (
          <ScrollReveal delay={0.05}>
            <p
              className="text-large"
              style={{
                color: "var(--theme-text)",
                maxWidth: "52ch",
                margin: 0,
                marginBottom: "var(--space-6)",
              }}
            >
              {body}
            </p>
          </ScrollReveal>
        )}
        <ScrollReveal delay={0.1} className="flex flex-col items-center gap-[var(--space-4)] sm:flex-row">
          <Button as="a" href={primaryHref} variant="primary" size="large">
            {primaryLabel}
          </Button>
          {secondary && (
            <a href={secondary.href} style={{ fontWeight: "var(--font-weight-semibold)" }}>
              {secondary.label}
            </a>
          )}
        </ScrollReveal>
      </Container>
    </Section>
  );
}
