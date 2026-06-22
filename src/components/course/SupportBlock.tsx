import { SITE } from "@/lib/site";

/**
 * SupportBlock -- the "Stuck? Message Sarah" support card, shown on the
 * dashboard and repeated at the foot of every lesson. Email + WhatsApp come
 * from SITE (the client-dossier contact data), never fabricated. The WhatsApp
 * link uses the wa.me deep link with the bare E.164-without-plus number.
 */
export function SupportBlock() {
  return (
    <aside
      className="card"
      style={{
        padding: "var(--space-5)",
        backgroundColor: "var(--color-field-marigold)",
        borderColor: "var(--color-marigold-deep)",
        maxWidth: "var(--lesson-measure)",
      }}
    >
      <p
        style={{
          margin: 0,
          fontWeight: "var(--font-weight-bold)",
          color: "var(--color-grape)",
        }}
      >
        Stuck? Message Sarah
      </p>
      <p
        className="mt-[var(--space-1)]"
        style={{
          margin: 0,
          fontSize: "var(--font-size-text-small)",
          color: "var(--color-grape-soft)",
        }}
      >
        Real, human support to keep you on track.
      </p>
      <div className="mt-[var(--space-3)] flex flex-col gap-[var(--space-2)] sm:flex-row sm:gap-[var(--space-5)]">
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        <a
          href={`https://wa.me/${SITE.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp {SITE.phoneDisplay}
        </a>
      </div>
    </aside>
  );
}
