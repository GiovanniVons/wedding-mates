/**
 * DemoBanner -- shown across the top of the course whenever NEXT_PUBLIC_DEMO_MODE
 * is on. Makes it unmistakable that this is a no-account walkthrough (not the
 * real signed-in experience) and routes the viewer to the real booking. Server
 * component, plain styled markup so it renders inside the gating layout.
 */
export function DemoBanner() {
  return (
    <div
      className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-[var(--space-3)]"
      style={{
        backgroundColor: "var(--color-grape)",
        color: "var(--color-page)",
        paddingInline: "var(--site-margin)",
        paddingBlock: "var(--space-3)",
      }}
    >
      <span className="flex items-center gap-[var(--space-3)]" style={{ minWidth: 0 }}>
        <span
          style={{
            backgroundColor: "var(--color-coral)",
            color: "var(--color-page)",
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-heavy)",
            fontSize: "var(--font-size-chip)",
            textTransform: "uppercase",
            letterSpacing: "var(--letter-spacing-wide)",
            padding: "var(--space-1) var(--space-3)",
            borderRadius: "var(--radius-pill)",
            whiteSpace: "nowrap",
          }}
        >
          Demo preview
        </span>
        <span style={{ fontSize: "var(--font-size-text-small)", color: "var(--color-page)" }}>
          A walkthrough of the course. No account needed.
        </span>
      </span>
      <a
        href="/book"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: "var(--font-weight-heavy)",
          fontSize: "var(--font-size-text-small)",
          color: "var(--color-page)",
          textDecoration: "underline",
          textDecorationColor: "var(--color-marigold)",
          textUnderlineOffset: "0.2em",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        Book the real thing
      </a>
    </div>
  );
}
