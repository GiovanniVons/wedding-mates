import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

/**
 * Privacy -- HOSTED (Vonzie Nexus). Per agency rules we do NOT author custom
 * privacy or cookie copy; the Nexus CMP provides the hosted, continuously
 * updated privacy and cookie pages post-launch. This route is a labelled
 * placeholder that the CMP integration wires to the Nexus hosted page later. It
 * is indexable (index, follow) and listed in the sitemap, but low priority.
 */
export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Let's Get Wed",
  description:
    "How Wedding Mates handles the personal information collected when you book or contact us.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Section theme="page" surface="calm" space="page-top" spaceBottom="large">
      <Container width="read">
        <h1 style={{ margin: 0, color: "var(--color-grape)" }}>Privacy Policy</h1>
        <p
          className="prose-course"
          style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-6)" }}
        >
          Our privacy policy will be available here shortly. It covers how we handle
          the personal information you provide when you book or get in touch, in line
          with the Australian Privacy Act.
        </p>
      </Container>
    </Section>
  );
}
