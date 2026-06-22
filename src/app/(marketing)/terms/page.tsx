import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { LegalScaffold, type LegalSection } from "@/components/ui/LegalScaffold";
import { CONTENT_FLAGS, SITE } from "@/lib/site";

/**
 * Terms and Conditions -- CONDITIONAL, client-specific (NOT Nexus's domain;
 * Nexus only hosts privacy/cookie copy). No lawyer-checked binding text exists
 * yet, so this ships as a STRUCTURED SCAFFOLD with clearly-marked
 * "[client to supply]" placeholders and ZERO fabricated binding legal text. It
 * stays noindex + out of the sitemap until termsHaveContent flips true (which
 * happens together with the footer Terms link, the sitemap entry, and the FAQ
 * refund entry, per the lockstep note in seo.md / the audit).
 *
 * Section skeleton mirrors the audit's Terms outline (1-13). The refund/
 * cancellation policy lives on its own gated route at /refund.
 */
export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions | Wedding Mates",
  description:
    "The terms and conditions for Wedding Mates bookings and the Blueprint course.",
  path: "/terms",
  noindex: !CONTENT_FLAGS.termsHaveContent,
});

const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: "1. Who we are",
    supply:
      "Legal entity name, ABN, the trading names Wedding Mates and Let's Get Wed, and the business contact details.",
  },
  {
    heading: "2. What you are buying",
    body: "The $950 package: Blueprint course access, the onboarding call, ceremony templates and readings, and the registered-celebrant legal handling.",
    supply: "Confirm the exact inclusions wording for the package scope.",
  },
  {
    heading: "3. The legal marriage and the celebrant role",
    body: "In Australia a Commonwealth-registered celebrant handles the legal solemnisation while the couple's chosen mate leads the ceremony.",
    supply:
      "The exact, lawyer-checked wording of the legal mechanism. Do not publish a specific legal procedure unconfirmed (this mirrors the seo.md content-honesty gate).",
  },
  {
    heading: "4. Your responsibilities (couple and mate)",
    body: "Providing accurate details, meeting the Notice of Intended Marriage and ID timing, and attending the onboarding call.",
    supply: "Confirm the full list of couple and mate responsibilities.",
  },
  {
    heading: "5. Booking, payment and GST",
    body: "The $950 package plus the four optional extras ($69, $299, $99, $129).",
    supply:
      "Confirm whether prices are GST inclusive or exclusive, then state the GST position plainly here (and on /pricing and the booking summary). Do not assert a tax status until confirmed.",
  },
  {
    heading: "6. Course access and licence",
    body: "Personal, non-transferable access to the Blueprint course and its downloads.",
    supply:
      "Confirm the access licence terms and any restriction on redistributing course materials.",
  },
  {
    heading: "7. Cancellation and refunds",
    body: "The full cancellation and refund terms live in the Refund and Cancellation Policy.",
    supply: "Confirm the cancellation and refund terms (see the /refund policy).",
  },
  {
    heading: "8. Timing and the under-four-weeks case",
    body: "Bookings close to the wedding date may have the legal registration completed after the ceremony, with guidance provided. This aligns with the existing FAQ answer.",
    supply: "Confirm the exact process for weddings booked under four weeks out.",
  },
  {
    heading: "9. Liability and disclaimers",
    supply: "Lawyer-drafted liability and disclaimer wording.",
  },
  {
    heading: "10. Intellectual property",
    body: "Ownership of the course content and materials.",
    supply: "Confirm the intellectual property terms.",
  },
  {
    heading: "11. Changes to these terms",
    supply: "How and when these terms may change, and how customers are notified.",
  },
  {
    heading: "12. Governing law",
    supply:
      "The governing law, for example the relevant Australian State or Territory.",
  },
];

export default function TermsPage() {
  return (
    <Section theme="page" surface="calm" space="page-top" spaceBottom="large">
      <Container width="read">
        <h1 style={{ margin: 0, color: "var(--color-grape)" }}>
          Terms and Conditions
        </h1>

        {!CONTENT_FLAGS.termsHaveContent && (
          <p
            className="prose-course"
            style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-6)" }}
          >
            Our full terms and conditions are being finalised with our legal
            adviser. The structure below shows what they will cover. If you have a
            question about your booking in the meantime, email{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will help.
          </p>
        )}

        <LegalScaffold
          sections={TERMS_SECTIONS}
          showSupplyMarkers={!CONTENT_FLAGS.termsHaveContent}
        />

        <p
          style={{
            color: "var(--color-grape-soft)",
            marginTop: "var(--space-7)",
            marginBottom: 0,
          }}
        >
          13. Contact: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </Container>
    </Section>
  );
}
