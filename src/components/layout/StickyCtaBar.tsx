import { Button } from "@/components/ui/Button";

/**
 * StickyCtaBar -- persistent mobile overlay, "Book Now · $950" with the price
 * in marigold. LAYOUT CONTRACT: reserves its own --sticky-cta-height via a
 * spacer (rendered by the page, not here) so it never overlaps content; bg
 * coral with grape label on light sections, inverts to a grape bar with a
 * page-white label over data-theme="grape" sections (detected by sampling the
 * section under the bar). Hidden inside /book and /course.
 *
 * In 3a this is the presentational primitive; the IntersectionObserver +
 * surface-sampling wiring lives on the production Home page (later phase).
 */
interface StickyCtaBarProps {
  /** Sampled surface under the bar; flips the colour scheme. */
  surface?: "light" | "grape";
  visible?: boolean;
}

export function StickyCtaBar({
  surface = "light",
  visible = true,
}: StickyCtaBarProps) {
  const onGrape = surface === "grape";
  return (
    <div
      id="sticky-cta-bar"
      data-theme={onGrape ? "grape" : undefined}
      // CRITICAL: the flex layout lives in a CSS class (.sticky-cta-bar in
      // globals.css), NOT inline. An inline `display` value beats the Tailwind
      // `lg:hidden` (display:none) class, which leaks the mobile bar onto
      // desktop (recurring bug -- see frontend-dev lessons). Keeping display in
      // CSS lets lg:hidden win at >=1024px.
      className="sticky-cta-bar lg:hidden"
      style={{
        height: "var(--sticky-cta-height)",
        backgroundColor: onGrape ? "var(--color-grape)" : "var(--sticky-cta-bg)",
        borderTop: `var(--border-width-main) solid ${
          onGrape ? "var(--color-page-on-grape-o55)" : "var(--sticky-cta-border)"
        }`,
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform var(--motion-duration-base) ease",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: "var(--font-weight-heavy)",
          fontSize: "var(--font-size-text-large)",
          color: onGrape ? "var(--color-page)" : "var(--sticky-cta-text)",
        }}
      >
        Book Now{" "}
        <span style={{ color: "var(--color-marigold)" }}>&middot; $950</span>
      </span>
      <Button as="a" href="/book" variant={onGrape ? "primary" : "secondary"} size="small">
        Start
      </Button>
    </div>
  );
}
