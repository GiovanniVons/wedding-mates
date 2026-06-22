import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ContactForm } from "@/components/sections/ContactForm";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Let's Get Wed | Friend Led Weddings",
  description:
    "Questions about having a friend lead your ceremony? Email sarah@letsgetwed.com.au or message us on WhatsApp. We are happy to help before you book.",
  path: "/contact",
  ogTitle: "Got questions? Let's talk.",
  ogDescription:
    "Email Sarah or message us on WhatsApp. Real, human answers before you book.",
});

export default function ContactPage() {
  return (
    <>
      {/* Section 1: Intro */}
      <Section space="page-top" spaceBottom="main">
        <Container width="narrow">
          <ScrollReveal>
            <Chip variant="loud" className="mb-[var(--space-4)]">
              Say Hello
            </Chip>
            <h1 style={{ margin: 0, color: "var(--color-grape)" }}>
              Got questions? Let&rsquo;s talk.
            </h1>
            <p
              className="text-large"
              style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-5)" }}
            >
              Not quite ready to book, or just want to talk it through first? That is
              completely normal. Email Sarah at{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or message us on
              WhatsApp at <a href={`https://wa.me/${SITE.whatsapp}`}>{SITE.phoneDisplay}</a>.
              You will get a real, human reply.
            </p>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Section 2 + 3: Form left / Direct contact right */}
      <Section space="small">
        <Container>
          <div className="grid grid-cols-1 gap-[var(--space-7)] lg:grid-cols-[1fr_360px]">
            <ScrollReveal style={{ maxWidth: "var(--container-form)" }}>
              <ContactForm />
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <aside
                style={{
                  backgroundColor: "var(--color-field-tint)",
                  borderRadius: "var(--radius-main)",
                  padding: "var(--space-6)",
                }}
              >
                <h2 className="h3" style={{ marginTop: 0, color: "var(--color-grape)" }}>
                  Or reach us directly
                </h2>
                <dl className="mt-[var(--space-5)] flex flex-col gap-[var(--space-5)]">
                  <div>
                    <dt
                      className="meta-caps"
                      style={{ color: "var(--color-grape-soft)", marginBottom: "var(--space-1)" }}
                    >
                      Email
                    </dt>
                    <dd style={{ margin: 0 }}>
                      <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                    </dd>
                  </div>
                  <div>
                    <dt
                      className="meta-caps"
                      style={{ color: "var(--color-grape-soft)", marginBottom: "var(--space-1)" }}
                    >
                      WhatsApp
                    </dt>
                    <dd style={{ margin: 0 }}>
                      <a href={`https://wa.me/${SITE.whatsapp}`}>{SITE.phoneDisplay}</a>
                    </dd>
                  </div>
                </dl>
              </aside>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Section 4: Soft Convert */}
      <Section theme="tint" surface="calm" space="main">
        <Container width="narrow" className="text-center">
          <ScrollReveal>
            <p
              className="h3"
              style={{ marginTop: 0, marginBottom: "var(--space-5)", color: "var(--color-grape)" }}
            >
              Ready now? Skip the wait and start your booking.
            </p>
            <Button as="a" href="/book" variant="primary" size="large">
              Book Now
            </Button>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
