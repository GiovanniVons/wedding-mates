import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { Footer } from "@/components/layout/Footer";
import { StickyCtaController } from "@/components/layout/StickyCtaController";

/**
 * (marketing) layout -- the public marketing surface chrome: the smart header
 * (transparent over the Home hero, solid elsewhere), the page body, the footer,
 * and the persistent mobile Book Now bar plus its reserved-height spacer.
 *
 * The spacer sits at the very bottom of the scroll flow and reserves
 * --sticky-cta-height on mobile so the fixed bar never covers footer content
 * (persistent-overlay layout contract). It collapses to 0 at the lg breakpoint
 * where the bar is hidden.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MarketingHeader />
      <main id="main">{children}</main>
      <Footer />
      {/* Reserved-height spacer for the fixed mobile CTA bar. */}
      <div
        aria-hidden="true"
        className="lg:hidden"
        style={{ height: "var(--sticky-cta-height)" }}
      />
      <StickyCtaController />
    </>
  );
}
