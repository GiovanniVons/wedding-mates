import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HypeLine } from "@/components/ui/HypeLine";

/**
 * not-found.tsx -- the branded 404, rendered with the marketing chrome (the root
 * layout renders {children} only, so the header and footer are added here). Calm
 * register with one on-brand Recessional Pop beat: the Hype Line names the moment
 * ("this page wandered off") and flips the payoff word. Primary action is Back to
 * home; a secondary Book Now keeps the one true conversion path visible.
 */
export default function NotFound() {
  return (
    <>
      <MarketingHeader />
      <main id="main">
        <Section
          theme="page"
          surface="calm"
          space="page-top"
          spaceBottom="large"
          clip
        >
          <Container width="narrow" className="text-center">
            <div className="flex flex-col items-center gap-[var(--space-6)]">
              <span
                className="meta-caps"
                style={{ color: "var(--color-grape-soft)", margin: 0 }}
              >
                Error 404
              </span>

              <HypeLine
                as="h1"
                cue="OFF SCRIPT"
                cueVariant="loud"
                align="center"
                scale="hero"
                immediate
                burst
                segments={[
                  { text: "This page" },
                  { text: "wandered", hit: true },
                  { text: "off." },
                ]}
              />

              <p
                className="text-large"
                style={{
                  color: "var(--color-grape-soft)",
                  margin: 0,
                  maxWidth: "var(--container-read)",
                }}
              >
                We could not find the page you were after. It may have moved, or the
                link might have a typo. Let us point you back the right way.
              </p>

              <div className="flex flex-col items-center gap-[var(--space-4)] sm:flex-row">
                <Button as="a" href="/" variant="primary" size="large">
                  Back to home
                </Button>
                <Button as="a" href="/book" variant="secondary" size="large">
                  Book Now
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
