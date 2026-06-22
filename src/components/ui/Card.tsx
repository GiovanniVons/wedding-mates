import Image from "next/image";
import { cn } from "@/lib/utils";
import { Chip } from "./Chip";

type FieldTint = "none" | "mint" | "marigold" | "coral" | "tint";

const FIELD_BG: Record<FieldTint, string | undefined> = {
  none: undefined,
  mint: "var(--color-field-mint)",
  marigold: "var(--color-field-marigold)",
  coral: "var(--color-field-coral)",
  tint: "var(--color-field-tint)",
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  field?: FieldTint;
}

/** Card -- flat risograph base. Hover lift only when interactive (marketing). */
export function Card({
  interactive = false,
  field = "none",
  className,
  style,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn("card", interactive && "card-interactive", className)}
      style={{
        padding: "var(--card-padding)",
        backgroundColor: FIELD_BG[field] ?? "var(--card-bg)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

const NUMERAL_COLOR = [
  "var(--color-coral)",
  "var(--color-marigold)",
  "var(--color-mint)",
  "var(--color-grape)",
];

interface StepCardProps {
  index: number; // 1-based
  numeral: string; // "01"
  title: string;
  body: string;
  iconSrc?: string;
  iconAlt?: string;
}

/**
 * StepCard -- oversized Anton poster numeral bleeding partly behind the title
 * (overprint), title, one paragraph, optional feature icon in a small chip.
 */
export function StepCard({
  index,
  numeral,
  title,
  body,
  iconSrc,
  iconAlt,
}: StepCardProps) {
  const color = NUMERAL_COLOR[(index - 1) % NUMERAL_COLOR.length];
  return (
    // h-full so every card fills its (stretched) grid cell -> all four are the
    // same height regardless of title/body length. Roomier padding for air.
    <Card
      interactive
      className="relative flex h-full flex-col overflow-hidden"
      style={{ padding: "var(--space-6)" }}
    >
      {/* Oversized poster numeral: a top-right watermark, pinned inside the card
          with overflow-hidden clipping the bleed. Sits behind content, low
          opacity, never overlaps the readable copy (content is relative + has
          its own top padding clearing the numeral band). */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute select-none"
        style={{
          top: "calc(var(--space-5) * -1)",
          right: "calc(var(--space-4) * -1)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4.5rem, 7vw, 6.5rem)",
          lineHeight: 0.8,
          color,
          opacity: 0.14,
        }}
      >
        {numeral}
      </span>
      <div className="relative flex h-full flex-col">
        {iconSrc && (
          <span
            className="inline-flex items-center justify-center"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "var(--radius-round)",
              backgroundColor: "var(--color-marigold-o30)",
              marginBottom: "var(--space-4)",
            }}
          >
            <Image src={iconSrc} alt={iconAlt ?? ""} width={28} height={28} />
          </span>
        )}
        <span
          aria-hidden="true"
          className="block"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--font-size-h3)",
            fontWeight: "var(--font-weight-regular)",
            color,
            lineHeight: 1,
            marginBottom: "var(--space-2)",
          }}
        >
          {numeral}
        </span>
        {/* Reserve two lines of title height so the body copy starts at the same
            Y across the row (aligned title/description zones). */}
        <h3
          className="h3"
          style={{
            margin: 0,
            marginBottom: "var(--gap-title-body)",
            color: "var(--theme-heading)",
            minHeight:
              "calc(var(--font-size-h3) * var(--line-height-medium) * 3)",
          }}
        >
          {title}
        </h3>
        <p style={{ color: "var(--theme-text-muted)", margin: 0 }}>{body}</p>
      </div>
    </Card>
  );
}

interface FeatureCardProps {
  iconSrc?: string;
  iconAlt?: string;
  title: string;
  body: string;
  field?: FieldTint;
  chipTone?: "marigold" | "mint";
}

/** FeatureCard -- the Blueprint 2x2 card: icon chip + H3 + one paragraph. */
export function FeatureCard({
  iconSrc,
  iconAlt,
  title,
  body,
  field = "none",
  chipTone = "marigold",
}: FeatureCardProps) {
  return (
    <Card interactive field={field} className="flex flex-col">
      {iconSrc && (
        <span
          className="inline-flex items-center justify-center"
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "var(--radius-round)",
            backgroundColor:
              chipTone === "mint"
                ? "var(--color-mint-o30)"
                : "var(--color-marigold-o30)",
            marginBottom: "var(--space-4)",
          }}
        >
          <Image src={iconSrc} alt={iconAlt ?? ""} width={34} height={34} />
        </span>
      )}
      <h3
        className="h3"
        style={{
          margin: 0,
          marginBottom: "var(--gap-title-body)",
          color: "var(--theme-heading)",
        }}
      >
        {title}
      </h3>
      <p style={{ color: "var(--theme-text-muted)", margin: 0 }}>{body}</p>
    </Card>
  );
}

interface PricingCardProps {
  price: string; // "$950"
  heading: string;
  inclusions: string[];
  extrasNote?: string;
  children?: React.ReactNode; // the CTA
  imageSrc?: string;
  imageAlt?: string;
}

/** PricingCard -- the single emphasised package, grape bold border, $950 numeral. */
export function PricingCard({
  price,
  heading,
  inclusions,
  extrasNote,
  children,
  imageSrc,
  imageAlt,
}: PricingCardProps) {
  return (
    <div
      className="card relative flex flex-col"
      style={{
        border: "var(--border-width-bold) solid var(--color-grape)",
        borderRadius: "var(--card-radius)",
        padding: "var(--space-6)",
        backgroundColor: "var(--card-bg)",
      }}
    >
      {imageSrc && (
        <div
          className="overflow-hidden"
          style={{
            borderRadius: "var(--radius-main)",
            backgroundColor: "var(--color-field-mint)",
            aspectRatio: "3 / 2",
            position: "relative",
            marginBottom: "var(--space-5)",
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      {/* Price: the coral hero numeral sits fully inside the card with a tracked
          grape "from" eyebrow above it, so it reads as an intentional price
          block rather than a watermark bleeding off the top edge. */}
      <span
        className="meta-caps"
        style={{
          color: "var(--color-grape-soft)",
          display: "block",
          marginBottom: "var(--space-1)",
        }}
      >
        The package
      </span>
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--font-size-h1)",
          color: "var(--color-coral-deep)",
          lineHeight: 1,
          margin: 0,
          marginBottom: "var(--space-4)",
        }}
      >
        {price}
      </p>
      <h3
        className="h3"
        style={{
          margin: 0,
          marginBottom: "var(--gap-title-body)",
          color: "var(--theme-heading)",
        }}
      >
        {heading}
      </h3>
      <ul
        className="flex flex-col"
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          gap: "var(--gap-list-item)",
        }}
      >
        {inclusions.map((item) => (
          <li
            key={item}
            className="flex items-start gap-[var(--space-2)]"
            style={{
              color: "var(--theme-text-muted)",
              lineHeight: "var(--line-height-medium)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              style={{ flexShrink: 0, marginTop: "0.15em" }}
            >
              <circle cx="10" cy="10" r="9" fill="var(--color-mint)" />
              <path
                d="M5.5 10.5l3 3 6-6.5"
                fill="none"
                stroke="var(--color-grape)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {item}
          </li>
        ))}
      </ul>
      {extrasNote && (
        <p
          style={{
            fontSize: "var(--font-size-text-small)",
            color: "var(--color-grape-soft)",
            margin: 0,
            marginTop: "var(--space-5)",
          }}
        >
          {extrasNote}
        </p>
      )}
      {children && (
        <div style={{ marginTop: "var(--space-6)" }}>{children}</div>
      )}
    </div>
  );
}

type ModuleStatus = "complete" | "current" | "locked";

const STATUS_PILL: Record<
  ModuleStatus,
  { label: string; bg: string; text: string }
> = {
  complete: {
    label: "Complete",
    bg: "var(--color-mint)",
    text: "var(--color-grape)",
  },
  current: {
    label: "In progress",
    bg: "var(--color-coral)",
    text: "var(--color-page)",
  },
  locked: {
    label: "Locked",
    bg: "var(--color-grape-o12)",
    text: "var(--color-grape-soft)",
  },
};

interface ModuleCardProps {
  thumbSrc?: string;
  thumbAlt?: string;
  chip: string;
  title: string;
  summary: string;
  status: ModuleStatus;
  estTime?: string;
}

/** ModuleCard -- course module: thumbnail in a flat field, calm chip, status pill. */
export function ModuleCard({
  thumbSrc,
  thumbAlt,
  chip,
  title,
  summary,
  status,
  estTime,
}: ModuleCardProps) {
  const pill = STATUS_PILL[status];
  return (
    <div
      className="card overflow-hidden"
      style={{
        opacity: status === "locked" ? 0.7 : 1,
      }}
    >
      <div
        className="relative"
        style={{
          aspectRatio: "247 / 142",
          backgroundColor: "var(--color-field-tint)",
        }}
      >
        {thumbSrc && (
          <Image
            src={thumbSrc}
            alt={thumbAlt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            style={{
              objectFit: "cover",
              filter: status === "locked" ? "grayscale(0.6)" : undefined,
            }}
          />
        )}
        {status === "locked" && (
          <span
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "var(--lesson-locked-overlay)" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
              <rect
                x="5"
                y="11"
                width="14"
                height="9"
                rx="2"
                fill="var(--color-grape)"
              />
              <path
                d="M8 11V8a4 4 0 0 1 8 0v3"
                fill="none"
                stroke="var(--color-grape)"
                strokeWidth="2"
              />
            </svg>
          </span>
        )}
      </div>
      <div style={{ padding: "var(--space-5)" }}>
        <div className="flex items-center justify-between gap-[var(--space-2)]" style={{ marginBottom: "var(--gap-eyebrow-title)" }}>
          <Chip variant="calm">{chip}</Chip>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-heavy)",
              fontSize: "var(--font-size-chip)",
              letterSpacing: "var(--letter-spacing-wide)",
              textTransform: "uppercase",
              backgroundColor: pill.bg,
              color: pill.text,
              borderRadius: "var(--radius-round)",
              padding: "0.25rem 0.6rem",
              whiteSpace: "nowrap",
            }}
          >
            {pill.label}
          </span>
        </div>
        <h3
          className="h4"
          style={{
            margin: 0,
            marginBottom: "var(--gap-title-body)",
            color: "var(--theme-heading)",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: "var(--theme-text-muted)",
            fontSize: "var(--font-size-text-small)",
            lineHeight: "var(--line-height-large)",
            margin: 0,
          }}
        >
          {summary}
        </p>
        {estTime && (
          <p
            className="meta-caps"
            style={{
              color: "var(--color-grape-soft)",
              margin: 0,
              marginTop: "var(--space-4)",
            }}
          >
            {estTime}
          </p>
        )}
      </div>
    </div>
  );
}

interface TestimonialCardProps {
  name: string;
  role?: string;
  quote: string;
  rating?: number;
}

/**
 * TestimonialCard -- a rights-cleared review: an oversized grape quote mark
 * overprinting the corner (poster vocabulary), the quote, then the attribution.
 * Only ever rendered from real TESTIMONIALS data; never a fabricated quote.
 */
export function TestimonialCard({
  name,
  role,
  quote,
  rating,
}: TestimonialCardProps) {
  return (
    <Card className="relative flex flex-col overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute select-none"
        style={{
          top: "calc(var(--space-4) * -1)",
          right: "var(--space-3)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4.5rem, 7vw, 6.5rem)",
          lineHeight: 0.8,
          color: "var(--color-marigold)",
          opacity: 0.16,
        }}
      >
        &rdquo;
      </span>
      <div className="relative flex flex-col">
        {typeof rating === "number" && (
          <span
            className="meta-caps"
            aria-label={`${rating} out of 5`}
            style={{
              color: "var(--color-marigold-deep)",
              marginBottom: "var(--space-3)",
            }}
          >
            {"★".repeat(Math.round(rating))}
            <span aria-hidden="true" style={{ color: "var(--color-grape-o20)" }}>
              {"★".repeat(Math.max(0, 5 - Math.round(rating)))}
            </span>
          </span>
        )}
        <p
          style={{
            color: "var(--color-grape)",
            fontSize: "var(--font-size-text-large)",
            lineHeight: "var(--line-height-large)",
            margin: 0,
            marginBottom: "var(--space-4)",
          }}
        >
          &ldquo;{quote}&rdquo;
        </p>
        <p
          className="meta-caps"
          style={{ color: "var(--color-grape)", margin: 0 }}
        >
          {name}
        </p>
        {role && (
          <p
            style={{
              color: "var(--color-grape-soft)",
              fontSize: "var(--font-size-text-small)",
              margin: 0,
              marginTop: "var(--space-1)",
            }}
          >
            {role}
          </p>
        )}
      </div>
    </Card>
  );
}

interface LoveStoryCardProps {
  imageSrc?: string;
  imageAlt?: string;
  couple: string;
  label?: string;
  href?: string;
}

/**
 * LoveStoryCard -- 3:2 image card with a hover-revealed name. When rights are
 * unconfirmed (no imageSrc), renders an honest flat-colour-and-type empty
 * state rather than a faked photo (per the image-treatment honesty rule).
 */
export function LoveStoryCard({
  imageSrc,
  imageAlt,
  couple,
  label = "View gallery",
  href,
}: LoveStoryCardProps) {
  if (!imageSrc) {
    return (
      <div
        className="card flex flex-col items-center justify-center text-center"
        style={{
          aspectRatio: "3 / 2",
          backgroundColor: "var(--color-field-marigold)",
          padding: "var(--space-5)",
          gap: "var(--space-2)",
        }}
      >
        <span
          className="meta-caps"
          style={{ color: "var(--color-marigold-deep)", margin: 0 }}
        >
          Real love story
        </span>
        <p
          className="h3"
          style={{ color: "var(--color-grape)", margin: 0 }}
        >
          {couple}
        </p>
        <p
          style={{
            color: "var(--color-grape-soft)",
            fontSize: "var(--font-size-text-small)",
            lineHeight: "var(--line-height-medium)",
            margin: 0,
          }}
        >
          Photos coming soon, once the couple says yes.
        </p>
      </div>
    );
  }
  const inner = (
    <>
      <Image
        src={imageSrc}
        alt={imageAlt ?? couple}
        fill
        sizes="(max-width: 768px) 100vw, 574px"
        className="transition-transform duration-500 group-hover:scale-[1.03]"
        style={{ objectFit: "cover" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-[var(--space-3)] p-[var(--space-4)]"
        style={{
          background:
            "linear-gradient(to top, var(--color-grape-fill-o85), transparent)",
        }}
      >
        <span className="h3" style={{ color: "var(--color-page)", margin: 0 }}>
          {couple}
        </span>
        <span
          className="meta-caps opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ color: "var(--color-marigold)" }}
        >
          {label}
        </span>
      </div>
    </>
  );
  const cardStyle: React.CSSProperties = { aspectRatio: "3 / 2", padding: 0 };
  if (href) {
    return (
      <a
        href={href}
        className="link-plain card group relative block overflow-hidden"
        style={cardStyle}
        aria-label={`${couple}: ${label}`}
      >
        {inner}
      </a>
    );
  }
  return (
    <div
      className="card group relative overflow-hidden"
      style={cardStyle}
    >
      {inner}
    </div>
  );
}
