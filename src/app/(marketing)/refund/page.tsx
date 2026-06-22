import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { LegalScaffold, type LegalSection } from "@/components/ui/LegalScaffold";
import { CONTENT_FLAGS, SITE } from "@/lib/site";

/**
 * Refund and Cancellation Policy -- CONDITIONAL, client-specific. Shares the
 * termsHaveContent gate with /terms (they ship together). Ships as a STRUCTURED
 * SCAFFOLD with "[client to supply]" markers and ZERO fabricated binding text:
 * cancellation windows, non-refundable portions and remedies must come from the
 * client. noindex + out of the sitemap until termsHaveContent flips true.
 *
 * Australian Consumer Law note: the cooling-off / change-of-mind and the
 * digital-content sections must be reconciled with the ACL when the client and
 * their lawyer supply the wording.
 */
export const metadata: Metadata = pageMetadata({
  title: "Refund and Cancellation Policy | Let's Get Wed",
  description:
    "The refund and cancellation policy for Wedding Mates bookings and the Blueprint course.",
  path: "/refund",
  noindex: !CONTENT_FLAGS.termsHaveContent,
});

const REFUND_SECTIONS: LegalSection[] = [
  {
    heading: "1. Cooling-off and change of mind",
    supply:
      "Whether a cooling-off period applies and its terms, reconciled with the Australian Consumer Law.",
  },
  {
    heading: "2. Cancellation by the couple",
    supply:
      "The cancellation timeframes and any non-refundable portion, with the specific windows and amounts.",
  },
  {
    heading: "3. Digital-content access",
    body: "The Blueprint course is gated digital content.",
    supply:
      "Refund eligibility once the gated course has been accessed or downloaded, reconciled with the Australian Consumer Law.",
  },
  {
    heading: "4. Rescheduling the wedding date",
    supply:
      "Whether a changed wedding date is handled as a transfer of the booking or a refund.",
  },
  {
    heading: "5. Cancellation by us, or unable to service",
    supply: "The remedy if Wedding Mates cannot service a booking.",
  },
  {
    heading: "6. The optional extras",
    body: "The four optional extras: $69, $299, $99 and $129.",
    supply: "The refundability of each optional extra.",
  },
  {
    heading: "7. How to request a refund",
    body: "Refund requests are made by contacting us.",
    supply: "The request process and the timeframe to process a refund.",
  },
];

export default function RefundPage() {
  return (
    <Section theme="page" surface="calm" space="page-top" spaceBottom="large">
      <Container width="read">
        <h1 style={{ margin: 0, color: "var(--color-grape)" }}>
          Refund and Cancellation Policy
        </h1>

        {!CONTENT_FLAGS.termsHaveContent && (
          <p
            className="prose-course"
            style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-6)" }}
          >
            Our refund and cancellation policy is being finalised with our legal
            adviser. The structure below shows what it will cover. If you have a
            question about your booking in the meantime, email{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will help.
          </p>
        )}

        <LegalScaffold
          sections={REFUND_SECTIONS}
          showSupplyMarkers={!CONTENT_FLAGS.termsHaveContent}
        />

        <p
          style={{
            color: "var(--color-grape-soft)",
            marginTop: "var(--space-7)",
            marginBottom: 0,
          }}
        >
          Questions about a refund? Email{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </Container>
    </Section>
  );
}
