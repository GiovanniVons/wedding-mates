import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";

/**
 * Privacy -- HOSTED (Vonzie Nexus). Per agency rules we do NOT author custom
 * privacy or cookie copy; the Nexus CMP provides the hosted, continuously
 * updated privacy and cookie pages post-launch. This route is a labelled
 * placeholder that the CMP integration wires to the Nexus hosted page later. It
 * is indexable (index, follow) and listed in the sitemap, but low priority.
 *
 * The list below is NOT a published privacy policy and asserts no binding terms.
 * It is a visible coverage checklist so the Australian Privacy Act items are not
 * lost between now and the Nexus integration: the hosted policy MUST address
 * each of these. (Captured from the content + legal audit.)
 */
export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Let's Get Wed",
  description:
    "How Wedding Mates handles the personal information collected when you book or contact us.",
  path: "/privacy",
});

const APP_COVERAGE: string[] = [
  "What personal information is collected at booking: your name and your partner's name, email, Australian mobile, home suburb, ceremony location, and the chosen celebrant's contact details.",
  "Why it is collected, including the legal-marriage purpose, and the legal basis under the Australian Privacy Act 1988 and the Australian Privacy Principles.",
  "That the booking form collects a third party's personal information (the chosen celebrant's name, email and phone), and how that is handled.",
  "How information is stored (Supabase) and who it is shared with (the registered celebrant, Stripe for payment, Resend for email).",
  "Your rights to access and correct your information, the complaints channel, and how long information is retained.",
  "Consent and cookies: analytics and any marketing pixels do not load before the Vonzie Nexus consent banner signals consent.",
];

export default function PrivacyPage() {
  return (
    <Section theme="page" surface="calm" space="page-top" spaceBottom="large">
      <Container width="read">
        <h1 style={{ margin: 0, color: "var(--color-grape)" }}>Privacy Policy</h1>
        <p
          className="prose-course"
          style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-6)" }}
        >
          Our privacy and cookie policy is hosted and kept up to date through our
          consent platform, and will be linked here shortly. It covers how we
          handle the personal information you provide when you book or get in
          touch, in line with the Australian Privacy Act. In the meantime, email{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with any privacy
          question.
        </p>

        <h2 className="h3" style={{ marginTop: "var(--space-7)", color: "var(--color-grape)" }}>
          What the policy will cover
        </h2>
        <ul
          className="flex flex-col"
          style={{
            listStyle: "disc",
            paddingInlineStart: "var(--space-5)",
            margin: 0,
            marginTop: "var(--space-4)",
            gap: "var(--gap-list-item)",
            color: "var(--color-grape-soft)",
            lineHeight: "var(--line-height-large)",
          }}
        >
          {APP_COVERAGE.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
