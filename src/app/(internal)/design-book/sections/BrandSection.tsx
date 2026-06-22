import { DBSection, DBSubhead } from "./db-shared";

const PALETTE = [
  { name: "Page (confetti-paper)", varName: "--color-page", hex: "#FBFAFF", on: "grape text, ~15.6:1 (AAA)" },
  { name: "Page tint", varName: "--color-page-tint", hex: "#F2EEFB", on: "grape-soft, ~10.6:1 (AAA)" },
  { name: "Grape (ink anchor)", varName: "--color-grape", hex: "#2A1840", on: "page text, ~15.6:1 (AAA)" },
  { name: "Grape soft (body)", varName: "--color-grape-soft", hex: "#3D2A55", on: "on page, ~11.6:1 (AAA)" },
  { name: "Coral (CTA / hit word)", varName: "--color-coral", hex: "#F2484E", on: "grape label 4.5:1; white 3.5:1 large" },
  { name: "Coral deep (text)", varName: "--color-coral-deep", hex: "#C9242A", on: "on page, 5.6:1 (links)" },
  { name: "Marigold (chips / burst)", varName: "--color-marigold", hex: "#F6A623", on: "grape label 9.0:1 (chip)" },
  { name: "Marigold deep (text)", varName: "--color-marigold-deep", hex: "#A66A05", on: "on page, 4.6:1" },
  { name: "Mint (progress / ticks)", varName: "--color-mint", hex: "#3FB39A", on: "grape label 7.4:1" },
  { name: "Mint deep (text)", varName: "--color-mint-deep", hex: "#1F7A66", on: "on page, 4.6:1" },
];

const SPECIMENS = [
  { label: "Hero Hype Line / .hype-hero", cls: "hype-hero", text: "The music drops", note: "Anton 400 · 72-128px · LH 0.92 · LS -0.01em" },
  { label: "Section Hype Line / .hype", cls: "hype", text: "Choose a mate", note: "Anton 400 · 44-72px · LH 0.96 · LS -0.005em" },
  { label: "H1 (calm) / .h1", cls: "h1", text: "Hi, I'm Sarah", note: "Anton 400 · 40-52px · LH 1.0" },
  { label: "H2 / .h2", cls: "h2", text: "Yes, your mate can really marry you", note: "Archivo Black 900 · 30-34px · LH 1.0" },
  { label: "H3 / .h3", cls: "h3", text: "We handle the legals", note: "Archivo 800 · 22-24px · LH 1.15" },
  { label: "Body large / .text-large", cls: "text-large", text: "Say I do with your best mate marrying you. More laughter, more tears, more magic.", note: "Archivo 500 · 18-19px · LH 1.55" },
  { label: "Body / .prose-course", cls: "prose-course", text: "A great ceremony is built, not winged. The right questions, the right details, the line that lands.", note: "Archivo 500 · 16-17px · LH 1.7" },
  { label: "Meta caps / .meta-caps", cls: "meta-caps", text: "The running order", note: "Archivo 700 · 13-14px · tracked caps" },
];

const VOICE = [
  "Your best mate steps up. Not with a stranger's script. With a cheeky grin and the whole room on their side.",
  "Yes, your mate can really marry you. We handle every legal requirement before the day, so they can focus on you.",
  "Stilettos plus soft grass equals a wobbly celebrant. Trust us, wear the flats.",
  "A great ceremony is built, not winged. The right questions. The right details. The line that lands.",
  "This part will be fun. Take lots of notes. Too many is fine; too few will leave you stuck later.",
];

const DIALS = [
  { name: "DESIGN_VARIANCE", value: 6, note: "A real layout-breaking, art-directed moment per marketing section, against a disciplined grid. Functional surfaces run an effective 3." },
  { name: "MOTION_INTENSITY", value: 6, note: "Present, choreographed, celebration-timed. Speech-timed reveals plus one rationed burst. Calm surfaces near-zero." },
  { name: "VISUAL_DENSITY", value: 5, note: "Balanced and confident; loud does not mean cluttered. Wizard and course pull density down hard." },
];

export function BrandSection() {
  return (
    <DBSection
      id="brand"
      title="Brand"
      intro="Recessional Pop: a flat saturated screen-printed celebration anchored by a structural grape-ink, with a built-in dual register that dials from loud marketing to a calm booking wizard and course."
    >
      <DBSubhead>Palette (hex + contrast)</DBSubhead>
      <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 lg:grid-cols-5">
        {PALETTE.map((c) => (
          <div key={c.varName}>
            <div
              style={{
                height: "104px",
                width: "100%",
                borderRadius: "var(--radius-small)",
                backgroundColor: `var(${c.varName})`,
                border: "var(--border-width-main) solid var(--color-grape-o20)",
              }}
            />
            <p style={{ margin: 0, marginTop: "var(--space-2)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-grape)", fontSize: "var(--font-size-text-small)" }}>
              {c.name}
            </p>
            <code style={{ fontSize: "var(--font-size-text-small)", color: "var(--color-coral-deep)" }}>
              {c.hex}
            </code>
            <p style={{ margin: 0, fontSize: "var(--font-size-chip)", color: "var(--color-grape-soft)" }}>
              {c.on}
            </p>
          </div>
        ))}
      </div>

      <DBSubhead>Type specimens</DBSubhead>
      <div className="flex flex-col gap-[var(--space-6)]">
        {SPECIMENS.map((s) => (
          <div key={s.label}>
            <span className="meta-caps" style={{ color: "var(--color-grape-soft)", display: "block", marginBottom: "var(--space-2)" }}>
              {s.label}
            </span>
            <div className={s.cls} style={{ color: "var(--color-grape)", margin: 0 }}>
              {s.text}
            </div>
            <span style={{ fontSize: "var(--font-size-text-small)", color: "var(--color-grape-soft)" }}>
              {s.note}
            </span>
          </div>
        ))}
      </div>

      <DBSubhead>Voice samples</DBSubhead>
      <p style={{ color: "var(--color-grape-soft)", marginBottom: "var(--space-4)", maxWidth: "var(--container-narrow)" }}>
        The warm-voice aside (used for Sarah&rsquo;s notes in the course lessons) sits inside the Recessional Pop system: a flat tinted field with a single accent rule along the top edge and a small accent-dot cue, never a heavy boxed block.
      </p>
      <div className="grid grid-cols-1 gap-[var(--space-5)] md:grid-cols-2">
        {VOICE.map((v) => (
          <blockquote
            key={v}
            style={{
              margin: 0,
              paddingBlock: "var(--space-4)",
              paddingInline: "var(--space-5)",
              borderTop: "var(--border-width-bold) solid var(--color-marigold)",
              backgroundColor: "var(--color-field-marigold)",
              borderRadius: "var(--radius-small)",
              color: "var(--color-grape)",
            }}
          >
            <span
              className="meta-caps"
              style={{
                color: "var(--color-marigold-deep)",
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-2)",
                marginBottom: "var(--gap-title-body)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  borderRadius: "var(--radius-round)",
                  backgroundColor: "var(--color-marigold-deep)",
                  flexShrink: 0,
                }}
              />
              The voice
            </span>
            <p style={{ margin: 0, color: "var(--color-grape)" }}>{v}</p>
          </blockquote>
        ))}
      </div>

      <DBSubhead>Design dials</DBSubhead>
      <div className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-3">
        {DIALS.map((d) => (
          <div key={d.name} className="card flex flex-col" style={{ padding: "var(--space-5)" }}>
            <div className="flex items-baseline gap-[var(--space-2)]" style={{ marginBottom: "var(--space-3)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-h1)", color: "var(--color-coral)" }}>
                {d.value}
              </span>
              <span style={{ color: "var(--color-grape-soft)", fontSize: "var(--font-size-text-small)" }}>/ 10</span>
            </div>
            <p style={{ margin: 0, marginBottom: "var(--gap-title-body)", fontWeight: "var(--font-weight-heavy)", color: "var(--color-grape)" }}>
              {d.name}
            </p>
            <p style={{ margin: 0, fontSize: "var(--font-size-text-small)", color: "var(--color-grape-soft)" }}>
              {d.note}
            </p>
          </div>
        ))}
      </div>
    </DBSection>
  );
}
