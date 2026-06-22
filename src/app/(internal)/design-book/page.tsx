import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BrandSection } from "./sections/BrandSection";
import { ComponentsSection } from "./sections/ComponentsSection";
import { LayoutSection } from "./sections/LayoutSection";
import { PagesSection } from "./sections/PagesSection";
import { MotionSection } from "./sections/MotionSection";
import { AssetsSection } from "./sections/AssetsSection";

const TOC = [
  { id: "brand", label: "Brand" },
  { id: "components", label: "Components" },
  { id: "layout", label: "Layout" },
  { id: "pages", label: "Pages" },
  { id: "motion", label: "Motion" },
  { id: "assets", label: "Assets" },
];

export default function DesignBookPage() {
  return (
    <div style={{ backgroundColor: "var(--color-page)" }}>
      <Header />
      <main
        id="main"
        className="mx-auto w-full"
        style={{
          maxWidth: "var(--container-default)",
          paddingInline: "var(--container-padding-x)",
          paddingTop: "calc(var(--header-height) + var(--space-7))",
          paddingBottom: "var(--section-space-large)",
        }}
      >
        <header style={{ marginBottom: "var(--space-7)" }}>
          <span className="meta-caps" style={{ color: "var(--color-coral-deep)" }}>
            Internal · Phase 2.5 review surface
          </span>
          <h1
            className="hype-hero"
            style={{
              margin: 0,
              marginTop: "var(--space-3)",
              color: "var(--color-grape)",
              fontSize: "var(--font-size-hype)",
            }}
          >
            Wedding Mates Design Book
          </h1>
          <p
            style={{
              marginTop: "var(--space-3)",
              color: "var(--color-grape-soft)",
              maxWidth: "var(--container-narrow)",
            }}
          >
            A live visualization of the &ldquo;Recessional Pop&rdquo; system: brand,
            every component (the signature Hype Line shown over light, grape, and
            over-photo surfaces; the dual register side by side), layout, pages,
            motion, and assets. Review this before production pages are built.
          </p>
          <nav
            aria-label="Design Book sections"
            className="mt-[var(--space-5)] flex flex-wrap gap-[var(--space-2)]"
          >
            {TOC.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="link-plain"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  borderRadius: "var(--radius-round)",
                  border: "var(--border-width-main) solid var(--color-grape)",
                  padding: "var(--space-2) var(--space-4)",
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-heavy)",
                  fontSize: "var(--font-size-text-small)",
                  color: "var(--color-grape)",
                  textTransform: "uppercase",
                  letterSpacing: "var(--letter-spacing-wide)",
                }}
              >
                {t.label}
              </a>
            ))}
          </nav>
        </header>

        <BrandSection />
        <ComponentsSection />
        <LayoutSection />
        <PagesSection />
        <MotionSection />
        <AssetsSection />
      </main>
      <Footer />
    </div>
  );
}
