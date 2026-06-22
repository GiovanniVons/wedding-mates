import { cn } from "@/lib/utils";

type SectionSpace = "none" | "small" | "main" | "large" | "page-top";
type SectionTheme = "page" | "tint" | "grape" | "coral";
type SectionSurface = "loud" | "calm";

const SPACE_VAR: Record<SectionSpace, string> = {
  none: "var(--section-space-none)",
  small: "var(--section-space-small)",
  main: "var(--section-space-main)",
  large: "var(--section-space-large)",
  "page-top": "var(--section-space-page-top)",
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Vertical rhythm token. Marketing varies this; calm surfaces keep it even. */
  space?: SectionSpace;
  spaceTop?: SectionSpace;
  spaceBottom?: SectionSpace;
  /** data-theme: drives the per-surface colour inversion (Zone 3a). */
  theme?: SectionTheme;
  /** data-surface: loud vs calm register (Zone 2 motion override). */
  surface?: SectionSurface;
  /** Clip the burst/overprint to the section so it can't overlap neighbours. */
  clip?: boolean;
}

/**
 * Section -- a vertical rhythm band carrying data-theme + data-surface.
 * Setting data-theme="grape" inverts semantic colours on this subtree, so
 * the body/heading colours come from --theme-* (which flip), but elements
 * that set the theme use Zone 1 primitives for their own bg (handled here
 * via --theme-bg, which is correct because Section is the theme owner and
 * reads its OWN flipped --theme-bg as the field colour).
 */
export function Section({
  space = "main",
  spaceTop,
  spaceBottom,
  theme = "page",
  surface,
  clip = false,
  className,
  style,
  children,
  ...props
}: SectionProps) {
  const themeAttr = theme === "page" ? undefined : theme;
  return (
    <section
      data-theme={themeAttr}
      data-surface={surface}
      className={cn("relative w-full", clip && "overflow-clip", className)}
      style={{
        backgroundColor: "var(--theme-bg)",
        color: "var(--theme-text)",
        paddingTop: SPACE_VAR[spaceTop ?? space],
        paddingBottom: SPACE_VAR[spaceBottom ?? space],
        ...style,
      }}
      {...props}
    >
      {children}
    </section>
  );
}
