import Image from "next/image";
import { DBSection, DBSubhead, DBPanel } from "./db-shared";
import { Logo } from "@/components/ui/Logo";
import { Chip } from "@/components/ui/Chip";
import { LoveStoryCard } from "@/components/ui/Card";

const ICONS = [
  { src: "/images/icons/camera.svg", label: "Capture the love story", path: "public/images/icons/camera.svg" },
  { src: "/images/icons/edit.svg", label: "Writing a ceremony", path: "public/images/icons/edit.svg" },
  { src: "/images/icons/performance.svg", label: "Performance tips", path: "public/images/icons/performance.svg" },
  { src: "/images/icons/music.svg", label: "Music / readings / vows", path: "public/images/icons/music.svg" },
  { src: "/images/icons/templates.svg", label: "Templates & tools", path: "public/images/icons/templates.svg" },
  { src: "/images/icons/readings.svg", label: "Library of readings", path: "public/images/icons/readings.svg" },
  { src: "/images/icons/strategies.svg", label: "Performance strategies", path: "public/images/icons/strategies.svg" },
];

export function AssetsSection() {
  return (
    <DBSection
      id="assets"
      title="Assets"
      intro="The real brand assets re-coloured to the token palette: logo variants, the 7 line icons (re-coloured from sage to grape on page-white), the editorial marks (cue chip, held-beat middot), and the honest empty-state placeholder system that carries a slot when a real photo is not yet available."
    >
      <DBSubhead>Logo variants</DBSubhead>
      <div className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-2">
        <DBPanel label="Grape (light chrome)">
          <Logo color="var(--color-grape)" width={200} />
        </DBPanel>
        <DBPanel label="Page-white (grape footer / drawer)" theme="grape">
          <Logo color="var(--color-page)" width={200} />
        </DBPanel>
      </div>

      <DBSubhead>Line icons (re-coloured grape on page-white)</DBSubhead>
      <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-4 lg:grid-cols-7">
        {ICONS.map((icon) => (
          <div key={icon.src} className="text-center">
            <div
              className="flex items-center justify-center"
              style={{
                aspectRatio: "1 / 1",
                borderRadius: "var(--radius-main)",
                backgroundColor: "var(--color-page-tint)",
                padding: "var(--space-4)",
              }}
            >
              <Image src={icon.src} alt={icon.label} width={56} height={56} />
            </div>
            <span style={{ display: "block", fontSize: "var(--font-size-text-small)", color: "var(--color-grape)", marginTop: "var(--space-2)" }}>
              {icon.label}
            </span>
            <code style={{ fontSize: "var(--font-size-chip)", color: "var(--color-grape-soft)" }}>
              {icon.path}
            </code>
          </div>
        ))}
      </div>

      <DBSubhead>Editorial marks (the brand&apos;s true icons)</DBSubhead>
      <div className="flex flex-wrap items-center gap-[var(--space-6)]">
        <div className="text-center">
          <Chip variant="loud">The Welcome</Chip>
          <span style={{ display: "block", fontSize: "var(--font-size-text-small)", color: "var(--color-grape-soft)", marginTop: "var(--space-2)" }}>
            Cue chip
          </span>
        </div>
        <div className="text-center">
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-h1)", color: "var(--color-grape)", lineHeight: 1 }}>
            &middot;
          </span>
          <span style={{ display: "block", fontSize: "var(--font-size-text-small)", color: "var(--color-grape-soft)", marginTop: "var(--space-2)" }}>
            Held-beat middot
          </span>
        </div>
        <div className="text-center">
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-h1)", color: "var(--color-coral)", lineHeight: 1 }}>
            $1,490
          </span>
          <span style={{ display: "block", fontSize: "var(--font-size-text-small)", color: "var(--color-grape-soft)", marginTop: "var(--space-2)" }}>
            Poster numeral
          </span>
        </div>
      </div>

      <DBSubhead>Real photography (re-treated as flat blocks)</DBSubhead>
      <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-4">
        {[
          { src: "/images/wedding-banner1.jpg", label: "Hero banner" },
          { src: "/images/wedding2.jpg", label: "Mate mid-delivery" },
          { src: "/images/sarah-wedding.jpg", label: "Founder (Sarah, 2019)" },
          { src: "/images/wedding-mates-package.jpg", label: "The package" },
        ].map((img) => (
          <div key={img.src}>
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "1 / 1", borderRadius: "var(--radius-main)" }}
            >
              <Image src={img.src} alt={img.label} fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: "cover" }} />
            </div>
            <span style={{ display: "block", fontSize: "var(--font-size-text-small)", color: "var(--color-grape-soft)", marginTop: "var(--space-2)" }}>
              {img.label}
            </span>
          </div>
        ))}
      </div>

      <DBSubhead>Honest empty states (no fabricated content)</DBSubhead>
      <div className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2 lg:grid-cols-3">
        <LoveStoryCard couple="Kristi + Mark" />
        <div
          className="card flex flex-col items-center justify-center text-center"
          style={{ aspectRatio: "3 / 2", backgroundColor: "var(--color-field-tint)", padding: "var(--space-5)" }}
        >
          <span className="meta-caps" style={{ color: "var(--color-coral-deep)" }}>Reviews</span>
          <p className="h3" style={{ color: "var(--color-grape)", margin: 0, marginTop: "var(--space-2)" }}>
            Real reviews coming soon
          </p>
          <p style={{ color: "var(--color-grape-soft)", fontSize: "var(--font-size-text-small)", margin: 0, marginTop: "var(--space-2)" }}>
            The section stays hidden until real testimonials are supplied.
          </p>
        </div>
        <div
          className="card flex flex-col items-center justify-center text-center"
          style={{ aspectRatio: "3 / 2", backgroundColor: "var(--color-field-marigold)", padding: "var(--space-5)" }}
        >
          <span className="meta-caps" style={{ color: "var(--color-marigold-deep)" }}>Blog</span>
          <p className="h3" style={{ color: "var(--color-grape)", margin: 0, marginTop: "var(--space-2)" }}>
            Real stories coming soon
          </p>
          <p style={{ color: "var(--color-grape-soft)", fontSize: "var(--font-size-text-small)", margin: 0, marginTop: "var(--space-2)" }}>
            Never lorem ipsum: posts publish only when real content exists.
          </p>
        </div>
      </div>
    </DBSection>
  );
}
