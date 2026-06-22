import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { CONTENT_FLAGS, SITE } from "@/lib/site";

/**
 * Terms -- CONDITIONAL. No client-supplied legal copy or refund policy exists
 * yet. Ships a labelled placeholder route (never fabricated terms); noindex and
 * excluded from the sitemap until real terms exist. Flip termsHaveContent true
 * and render the real legal copy once the client supplies it.
 */
export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions | Let's Get Wed",
  description:
    "The terms and conditions for Wedding Mates bookings and the Blueprint course.",
  path: "/terms",
  noindex: !CONTENT_FLAGS.termsHaveContent,
});

export default function TermsPage() {
  return (
    <Section theme="page" surface="calm" space="page-top" spaceBottom="large">
      <Container width="read">
        <h1 style={{ margin: 0, color: "var(--color-grape)" }}>
          Terms and Conditions
        </h1>
        <p
          className="prose-course"
          style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-6)" }}
        >
          Our full terms and conditions, including the refund and cancellation policy,
          are being finalised. If you have a question about your booking in the
          meantime, email{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will help.
        </p>
      </Container>
    </Section>
  );
}
