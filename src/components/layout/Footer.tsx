import { Logo } from "@/components/ui/Logo";
import { Chip } from "@/components/ui/Chip";
import { CONTENT_FLAGS, SITE } from "@/lib/site";

interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

/**
 * Footer columns. Conditional links (Reviews, Blog, Terms, Refund Policy) are
 * hidden, not rendered as dead links, until their content exists (per the
 * pre-launch checklist). Privacy points to the Vonzie Nexus hosted page once the
 * CMP is wired post-launch.
 */
const COLUMNS: FooterColumn[] = [
  {
    heading: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "About", href: "/about" },
    ],
  },
  {
    heading: "More",
    links: [
      ...(CONTENT_FLAGS.reviewsHaveContent
        ? [{ label: "Reviews", href: "/reviews" }]
        : []),
      ...(CONTENT_FLAGS.blogHasPosts ? [{ label: "Blog", href: "/blog" }] : []),
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      ...(CONTENT_FLAGS.termsHaveContent
        ? [
            { label: "Terms", href: "/terms" },
            { label: "Refund Policy", href: "/refund" },
          ]
        : []),
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

/**
 * Footer -- 4-column grid on a grape field (page-white text, marigold links),
 * brand mark re-coloured to page-white, contact, copyright + Giovanni Vons
 * credit. One restrained marigold cue chip above the contact column is the
 * only loud note. Plumbing copy-adapted from patterns/footer.
 */
export function Footer() {
  return (
    <footer
      data-theme="grape"
      data-surface="calm"
      style={{
        backgroundColor: "var(--theme-bg)",
        color: "var(--theme-text)",
        paddingBlock: "var(--section-space-main)",
      }}
    >
      <div
        className="mx-auto w-full"
        style={{
          maxWidth: "var(--container-default)",
          paddingInline: "var(--container-padding-x)",
        }}
      >
        <p
          className="mb-[var(--space-6)]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--font-size-hype)",
            textTransform: "uppercase",
            lineHeight: "var(--line-height-snug)",
            letterSpacing: "var(--letter-spacing-snug)",
            color: "var(--color-page)",
            margin: 0,
            marginBottom: "var(--space-7)",
          }}
        >
          Married by the one who knows you best.
        </p>

        <div className="grid grid-cols-1 gap-[var(--space-6)] sm:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2
                className="meta-caps mb-[var(--space-3)]"
                style={{ color: "var(--color-page-on-grape-o70)", margin: 0, marginBottom: "var(--space-3)" }}
              >
                {col.heading}
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {col.links.map((link) => (
                  <li key={link.href} style={{ marginBottom: "var(--space-2)" }}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <Chip variant="loud" className="mb-[var(--space-3)]">
              Got questions?
            </Chip>
            <p
              style={{
                color: "var(--color-page-on-grape-o70)",
                fontSize: "var(--font-size-text-small)",
                marginTop: "var(--space-3)",
                marginBottom: "var(--space-3)",
              }}
            >
              We are happy to talk it through before you book.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "var(--space-2)" }}>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <a href={`https://wa.me/${SITE.whatsapp}`}>
                  WhatsApp {SITE.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-[var(--space-7)] flex flex-col items-start justify-between gap-[var(--space-4)] sm:flex-row sm:items-center"
          style={{
            paddingTop: "var(--space-5)",
            borderTop: "var(--border-width-main) solid var(--theme-border)",
          }}
        >
          <Logo color="var(--color-page)" counterFill="var(--color-grape)" width={130} />
          <div
            className="flex flex-col gap-[var(--space-1)] sm:items-end"
            style={{ fontSize: "var(--font-size-text-small)", color: "var(--color-page-on-grape-o70)" }}
          >
            <span>&copy; {new Date().getFullYear()} Wedding Mates. All rights reserved.</span>
            <span>
              Designed by{" "}
              <a href="https://giovannivons.com" rel="noopener">
                Giovanni Vons
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
