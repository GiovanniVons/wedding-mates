"use client";

import { useEffect } from "react";
import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

/**
 * error.tsx -- the route-level error boundary, rendered with the marketing
 * chrome. Calm register, no celebration beat (an error is not a payoff): a
 * steady message, a Try again that calls reset(), and a clear way home. We log
 * the error to the console for debugging; nothing fabricated is shown to the
 * visitor.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <MarketingHeader />
      <main id="main">
        <Section theme="page" surface="calm" space="page-top" spaceBottom="large">
          <Container width="narrow" className="text-center">
            <div className="flex flex-col items-center gap-[var(--space-6)]">
              <span
                className="meta-caps"
                style={{ color: "var(--color-grape-soft)", margin: 0 }}
              >
                Something went wrong
              </span>

              <h1 style={{ margin: 0, color: "var(--color-grape)" }}>
                Let us try that again.
              </h1>

              <p
                className="text-large"
                style={{
                  color: "var(--color-grape-soft)",
                  margin: 0,
                  maxWidth: "var(--container-read)",
                }}
              >
                A hiccup on our end stopped this page from loading. It is almost
                always temporary. Give it another go, and if it keeps happening, email
                us at{" "}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will sort it.
              </p>

              <div className="flex flex-col items-center gap-[var(--space-4)] sm:flex-row">
                <Button
                  type="button"
                  onClick={() => reset()}
                  variant="primary"
                  size="large"
                >
                  Try again
                </Button>
                <Button as="a" href="/" variant="secondary" size="large">
                  Back to home
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
