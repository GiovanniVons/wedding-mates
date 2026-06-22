import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "display"
  | "secondary"
  | "tertiary"
  | "success";
export type ButtonSize = "small" | "medium" | "large";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  display: "btn-display",
  secondary: "btn-secondary",
  tertiary: "btn-tertiary",
  success: "btn-success",
};

const SIZE_STYLE: Record<ButtonSize, React.CSSProperties> = {
  small: {
    minHeight: "var(--btn-size-small)",
    paddingInline: "var(--space-3)",
    fontSize: "var(--font-size-text-small)",
  },
  medium: {
    minHeight: "var(--btn-size-medium)",
    paddingInline: "var(--btn-padding-x)",
    fontSize: "var(--font-size-text-main)",
  },
  large: {
    minHeight: "var(--btn-size-large)",
    paddingInline: "var(--btn-padding-x-lg)",
    fontSize: "var(--font-size-text-large)",
  },
};

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /**
   * Design-Book-only: render a static visual state without a live pointer.
   * Maps to the CSS pseudo states via data attributes (see globals.css).
   */
  forceState?: "hover" | "active";
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type ButtonAsLink = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Button -- the conversion primitive. Primary is the most saturated object
 * on every page; the colour logic itself pulls the eye to the CTA.
 * Pseudo-selector states live in globals.css @layer components; this is
 * the structural shell. Anchor-based buttons opt out of the in-prose link
 * rule via .btn (see globals.css), so a primary CTA label never goes invisible.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "medium",
    fullWidth = false,
    forceState,
    as: asTag,
    className,
    style,
    children,
    ...rest
  } = props as BaseProps & {
    as?: "button" | "a";
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  } & Record<string, unknown>;

  const classes = cn(
    "btn",
    VARIANT_CLASS[variant],
    fullWidth && "w-full",
    className as string,
  );

  const mergedStyle: React.CSSProperties = {
    ...SIZE_STYLE[size],
    ...(style as React.CSSProperties),
  };

  // Design-Book static state: emulate :hover / :active visuals inline so the
  // catalogue can show every state side by side without a pointer.
  if (forceState === "hover") {
    if (variant === "primary") {
      mergedStyle.backgroundColor = "var(--btn-primary-bg-hover)";
      mergedStyle.borderColor = "var(--btn-primary-border-hover)";
      mergedStyle.color = "var(--btn-primary-text-hover)";
      mergedStyle.transform = "translateY(-2px)";
      mergedStyle.boxShadow = "0 6px 0 var(--color-grape-o08)";
    } else if (variant === "display") {
      mergedStyle.backgroundColor = "var(--btn-display-bg-hover)";
      mergedStyle.color = "var(--btn-display-text-hover)";
    } else if (variant === "secondary") {
      mergedStyle.backgroundColor = "var(--btn-secondary-bg-hover)";
      mergedStyle.color = "var(--btn-secondary-text-hover)";
    } else if (variant === "tertiary") {
      mergedStyle.backgroundColor = "var(--btn-tertiary-bg-hover)";
      mergedStyle.color = "var(--btn-tertiary-text-hover)";
    } else if (variant === "success") {
      mergedStyle.backgroundColor = "var(--btn-success-bg-hover)";
      mergedStyle.color = "var(--btn-success-text-hover)";
    }
  } else if (forceState === "active" && variant === "primary") {
    mergedStyle.backgroundColor = "var(--btn-primary-bg-active)";
    mergedStyle.color = "var(--btn-primary-text-active)";
  }

  if (asTag === "a") {
    const { href, ...anchorRest } =
      rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        href?: string;
      };
    return (
      <a href={href} className={classes} style={mergedStyle} {...anchorRest}>
        {children as React.ReactNode}
      </a>
    );
  }

  return (
    <button
      className={classes}
      style={mergedStyle}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children as React.ReactNode}
    </button>
  );
}
