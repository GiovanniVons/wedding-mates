import { cn } from "@/lib/utils";

export type ChipVariant = "loud" | "calm" | "mint";

const VARIANT_STYLE: Record<ChipVariant, React.CSSProperties> = {
  loud: {
    backgroundColor: "var(--chip-loud-bg)",
    color: "var(--chip-loud-text)",
    border: "none",
  },
  calm: {
    backgroundColor: "var(--chip-calm-bg)",
    color: "var(--chip-calm-text)",
    border: "var(--border-width-main) solid var(--chip-calm-border)",
  },
  mint: {
    backgroundColor: "var(--chip-mint-bg)",
    color: "var(--chip-mint-text)",
    border: "none",
  },
};

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: ChipVariant;
}

/**
 * Chip -- the cue chip, the one component that carries identity across the
 * loud/calm volume drop. Same pill shape in every register; only the fill
 * changes. LOUD: grape on marigold (9.0:1). CALM: grape on tint with a
 * hairline. MINT: grape on mint (7.4:1) for the legals/reassurance beat.
 * On dark sections the calm chip inverts via Zone 3b.
 */
export function Chip({
  variant = "loud",
  className,
  style,
  children,
  ...props
}: ChipProps) {
  return (
    <span
      className={cn("inline-flex items-center", className)}
      style={{
        borderRadius: "var(--chip-radius)",
        fontFamily: "var(--chip-font)",
        fontWeight: "var(--chip-weight)",
        fontSize: "var(--chip-size)",
        letterSpacing: "var(--chip-tracking)",
        lineHeight: 1,
        textTransform: "uppercase",
        paddingBlock: "var(--chip-padding-y)",
        paddingInline: "var(--chip-padding-x)",
        whiteSpace: "nowrap",
        ...VARIANT_STYLE[variant],
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
