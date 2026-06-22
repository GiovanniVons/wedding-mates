/** Shared Design Book scaffolding helpers (internal review surface only). */

export function DBSection({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      style={{
        paddingBlock: "var(--section-space-main)",
        borderTop: "var(--border-width-bold) solid var(--color-grape)",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--font-size-hype)",
          textTransform: "uppercase",
          color: "var(--color-grape)",
          margin: 0,
          marginBottom: intro ? "var(--space-3)" : "var(--space-6)",
          lineHeight: "var(--line-height-snug)",
        }}
      >
        {title}
      </h2>
      {intro && (
        <p
          style={{
            color: "var(--color-grape-soft)",
            maxWidth: "var(--container-narrow)",
            marginBottom: "var(--space-6)",
          }}
        >
          {intro}
        </p>
      )}
      {children}
    </section>
  );
}

export function DBSubhead({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="meta-caps"
      style={{
        color: "var(--color-coral-deep)",
        marginTop: "var(--space-7)",
        marginBottom: "var(--space-4)",
      }}
    >
      {children}
    </h3>
  );
}

export function DBLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "block",
        fontFamily: "var(--font-body)",
        fontSize: "var(--font-size-text-small)",
        color: "var(--color-grape-soft)",
        marginTop: "var(--space-2)",
      }}
    >
      {children}
    </span>
  );
}

export function DBSwatch({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "var(--font-size-text-small)",
        color: "var(--color-grape)",
        fontWeight: "var(--font-weight-semibold)",
      }}
    >
      {children}
    </code>
  );
}

/** A bordered display cell that names a surface so reviewers can read it. */
export function DBPanel({
  label,
  theme,
  surface,
  children,
  padded = true,
}: {
  label?: string;
  theme?: "tint" | "grape" | "coral";
  surface?: "loud" | "calm";
  children: React.ReactNode;
  padded?: boolean;
}) {
  return (
    <div
      data-theme={theme}
      data-surface={surface}
      style={{
        backgroundColor: "var(--theme-bg)",
        color: "var(--theme-text)",
        border: "var(--border-width-main) solid var(--color-grape-o20)",
        borderRadius: "var(--radius-main)",
        padding: padded ? "var(--space-5)" : 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {label && (
        <span
          className="meta-caps"
          style={{
            display: "block",
            color: "var(--theme-text-muted)",
            marginBottom: "var(--space-3)",
          }}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
