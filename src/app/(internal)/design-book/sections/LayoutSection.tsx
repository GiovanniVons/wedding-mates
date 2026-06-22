import { DBSection, DBSubhead } from "./db-shared";

const SPACES = [
  { name: "--space-1", note: "icon gaps, chip inner padding" },
  { name: "--space-2", note: "button icon gap, tight stack" },
  { name: "--space-3", note: "adjacent-button gap, input padding-x, held-beat" },
  { name: "--space-4", note: "card internal rhythm, paragraph rhythm" },
  { name: "--space-5", note: "card padding, field-group rhythm" },
  { name: "--space-6", note: "sub-section gaps" },
  { name: "--space-7", note: "heading top margin, generous block gap" },
  { name: "--space-8", note: "major in-section breaks" },
];

const SECTION_SPACES = [
  { name: "--section-space-small", note: "tight trust beats (3-5rem)" },
  { name: "--section-space-main", note: "support sections (4-7rem)" },
  { name: "--section-space-large", note: "the big breath before a Hype peak (5.5-10rem)" },
  { name: "--section-space-page-top", note: "page top / hero (6.5-9rem)" },
];

const CONTAINERS = [
  { name: "--container-read", value: "624px", note: "course reading, ~60-70ch" },
  { name: "--container-form", value: "640px", note: "booking wizard column" },
  { name: "--container-narrow", value: "800px", note: "narrow editorial" },
  { name: "--container-default", value: "1248px", note: "marketing default" },
  { name: "--container-wide", value: "1440px", note: "full-bleed bound" },
];

const BREAKPOINTS = [
  { name: "sm", value: "640px" },
  { name: "md", value: "768px" },
  { name: "lg", value: "1024px" },
  { name: "xl", value: "1280px" },
];

export function LayoutSection() {
  return (
    <DBSection
      id="layout"
      title="Layout"
      intro="Spacing scale, section-spacing rhythm, container widths, and breakpoints. Marketing varies which section-space token each band picks for poster rhythm; the wizard and course keep it even."
    >
      <DBSubhead>Spacing scale (each --space-* as a sized bar)</DBSubhead>
      <div className="flex flex-col gap-[var(--space-3)]">
        {SPACES.map((s) => (
          <div key={s.name} className="flex items-center gap-[var(--space-4)]">
            <code style={{ width: "8rem", flexShrink: 0, fontSize: "var(--font-size-text-small)", color: "var(--color-grape)" }}>
              {s.name}
            </code>
            <div
              style={{
                height: "16px",
                width: `var(${s.name})`,
                backgroundColor: "var(--color-coral)",
                borderRadius: "var(--radius-small)",
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "var(--font-size-text-small)", color: "var(--color-grape-soft)" }}>
              {s.note}
            </span>
          </div>
        ))}
      </div>

      <DBSubhead>Section-spacing rhythm</DBSubhead>
      <div className="flex flex-col gap-[var(--space-3)]">
        {SECTION_SPACES.map((s) => (
          <div key={s.name} className="flex items-center gap-[var(--space-4)]">
            <code style={{ width: "13rem", flexShrink: 0, fontSize: "var(--font-size-text-small)", color: "var(--color-grape)" }}>
              {s.name}
            </code>
            <div
              style={{
                height: "16px",
                width: `var(${s.name})`,
                maxWidth: "100%",
                backgroundColor: "var(--color-marigold)",
                borderRadius: "var(--radius-small)",
              }}
            />
          </div>
        ))}
        <div className="mt-[var(--space-3)] flex items-stretch gap-[var(--space-1)]">
          {SECTION_SPACES.map((s, i) => (
            <div
              key={s.name}
              style={{
                flex: 1,
                paddingBlock: `var(${s.name})`,
                backgroundColor: i % 2 === 0 ? "var(--color-page-tint)" : "var(--color-field-mint)",
                borderRadius: "var(--radius-small)",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "var(--font-size-chip)", color: "var(--color-grape)" }}>
                {s.name.replace("--section-space-", "")}
              </span>
            </div>
          ))}
        </div>
      </div>

      <DBSubhead>Container widths</DBSubhead>
      <div className="flex flex-col gap-[var(--space-2)]">
        {CONTAINERS.map((c) => (
          <div key={c.name} className="flex items-center gap-[var(--space-4)]">
            <code style={{ width: "13rem", flexShrink: 0, fontSize: "var(--font-size-text-small)", color: "var(--color-grape)" }}>
              {c.name}
            </code>
            <div
              style={{
                height: "12px",
                width: `min(100%, var(${c.name}))`,
                backgroundColor: "var(--color-mint)",
                borderRadius: "var(--radius-small)",
              }}
            />
            <span style={{ fontSize: "var(--font-size-text-small)", color: "var(--color-grape-soft)", flexShrink: 0 }}>
              {c.value} · {c.note}
            </span>
          </div>
        ))}
      </div>

      <DBSubhead>Breakpoints</DBSubhead>
      <div className="flex flex-wrap gap-[var(--space-3)]">
        {BREAKPOINTS.map((b) => (
          <div
            key={b.name}
            className="card"
            style={{ padding: "var(--space-4)", minWidth: "120px" }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-h3)", color: "var(--color-grape)" }}>
              {b.name}
            </span>
            <span style={{ display: "block", fontSize: "var(--font-size-text-small)", color: "var(--color-grape-soft)" }}>
              {b.value}
            </span>
          </div>
        ))}
      </div>
    </DBSection>
  );
}
