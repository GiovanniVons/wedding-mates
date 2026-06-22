import { cn } from "@/lib/utils";

type ContainerWidth = "read" | "form" | "narrow" | "default" | "wide" | "full";

const WIDTH_VAR: Record<ContainerWidth, string> = {
  read: "var(--container-read)",
  form: "var(--container-form)",
  narrow: "var(--container-narrow)",
  default: "var(--container-default)",
  wide: "var(--container-wide)",
  full: "var(--container-full)",
};

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth;
  /** When true, drops the horizontal site margin (for full-bleed children). */
  bleed?: boolean;
  as?: "div" | "section" | "header" | "footer" | "main" | "nav";
}

/**
 * Container -- centres content at a token width with the fluid site margin.
 * Layout-only via Tailwind; visual widths via token var(). Plumbing,
 * copy-adapted from patterns/page-structure.
 */
export function Container({
  width = "default",
  bleed = false,
  as: Tag = "div",
  className,
  style,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full", className)}
      style={{
        maxWidth: WIDTH_VAR[width],
        paddingInline: bleed ? undefined : "var(--container-padding-x)",
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
