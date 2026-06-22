/**
 * FormAlert -- a flat status banner for the auth forms (and any calm-register
 * form). Two tones: "error" (coral) and "success" (mint). Flat field with a
 * single accent rule along the top edge, matching the Callout / Recessional Pop
 * detail system. AA against the page surface.
 */
type AlertTone = "error" | "success";

const TONE: Record<AlertTone, { bg: string; accent: string; text: string }> = {
  error: {
    bg: "var(--lesson-callout-bg)",
    accent: "var(--color-coral-deep)",
    text: "var(--color-grape)",
  },
  success: {
    bg: "var(--lesson-tip-bg)",
    accent: "var(--color-mint)",
    text: "var(--color-grape)",
  },
};

export function FormAlert({
  tone,
  children,
}: {
  tone: AlertTone;
  children: React.ReactNode;
}) {
  const s = TONE[tone];
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      style={{
        backgroundColor: s.bg,
        borderTop: `var(--border-width-bold) solid ${s.accent}`,
        borderRadius: "var(--radius-small)",
        padding: "var(--space-3) var(--space-4)",
        color: s.text,
        fontSize: "var(--font-size-text-small)",
        fontWeight: "var(--font-weight-medium)",
        lineHeight: "var(--line-height-relaxed)",
      }}
    >
      {children}
    </div>
  );
}
