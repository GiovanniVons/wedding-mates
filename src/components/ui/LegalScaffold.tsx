/**
 * LegalScaffold -- renders a structured legal page skeleton (Terms, Refund) as
 * a sequence of headed sections. Each section may carry plain factual context
 * (`body`, safe to publish: package scope, contact, AU framing) and a
 * `[client to supply]` marker (`supply`) for any binding legal wording that must
 * come from the client or their lawyer.
 *
 * It NEVER fabricates binding legal text. The supply markers are visibly flagged
 * (a marigold "client to supply" chip + the note) so a reviewer can see exactly
 * what is outstanding. When the real copy lands, set showSupplyMarkers=false and
 * fill each section's `body` with the supplied wording.
 */

export interface LegalSection {
  heading: string;
  /** Plain, publishable factual context (no binding legal assertions). */
  body?: string;
  /** What the client / lawyer must supply for this section (the missing copy). */
  supply?: string;
}

interface LegalScaffoldProps {
  sections: LegalSection[];
  /** Show the "[client to supply]" markers (true while copy is outstanding). */
  showSupplyMarkers?: boolean;
}

export function LegalScaffold({
  sections,
  showSupplyMarkers = true,
}: LegalScaffoldProps) {
  return (
    <div
      className="margin-trim flex flex-col gap-[var(--space-6)]"
      style={{ marginTop: "var(--space-7)" }}
    >
      {sections.map((section) => (
        <section key={section.heading}>
          <h2
            className="h3"
            style={{ marginTop: 0, marginBottom: "var(--gap-title-body)", color: "var(--color-grape)" }}
          >
            {section.heading}
          </h2>
          {section.body && (
            <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
              {section.body}
            </p>
          )}
          {showSupplyMarkers && section.supply && (
            <p
              style={{
                color: "var(--color-grape-soft)",
                margin: 0,
                marginTop: section.body ? "var(--space-3)" : 0,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                gap: "var(--space-2)",
              }}
            >
              <span
                className="meta-caps"
                style={{
                  color: "var(--color-marigold-deep)",
                  backgroundColor: "var(--color-marigold-o15)",
                  borderRadius: "var(--radius-round)",
                  paddingBlock: "0.25rem",
                  paddingInline: "0.6rem",
                  whiteSpace: "nowrap",
                }}
              >
                Client to supply
              </span>
              <span style={{ fontStyle: "italic" }}>{section.supply}</span>
            </p>
          )}
        </section>
      ))}
    </div>
  );
}
