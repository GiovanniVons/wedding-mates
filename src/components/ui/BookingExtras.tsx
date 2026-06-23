"use client";

import { cn } from "@/lib/utils";

export interface Extra {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface ExtrasToggleCardProps {
  extra: Extra;
  checked: boolean;
  onToggle?: (id: string, next: boolean) => void;
}

/**
 * ExtrasToggleCard (Step 5) -- name + price + 1-line description. Off =
 * --toggle-bg with hairline; on = mint-tinted field + mint-deep border + a
 * mint check. Price in Archivo 800 grape. Calm register; toggling animates the
 * running total (the count-up lives in RunningTotalBar).
 */
export function ExtrasToggleCard({
  extra,
  checked,
  onToggle,
}: ExtrasToggleCardProps) {
  return (
    <label
      className={cn("relative block cursor-pointer")}
      style={{
        borderRadius: "var(--card-radius)",
        border: `var(--border-width-main) solid ${
          checked ? "var(--toggle-border-on)" : "var(--toggle-border)"
        }`,
        backgroundColor: checked ? "var(--toggle-bg-on)" : "var(--toggle-bg)",
        padding: "var(--space-4)",
        transition:
          "background-color var(--motion-duration-fast) ease, border-color var(--motion-duration-fast) ease",
      }}
    >
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(e) => onToggle?.(extra.id, e.target.checked)}
      />
      <div className="flex items-start justify-between gap-[var(--space-3)]">
        <div>
          {/* Not a heading: this is the accessible name of the checkbox control,
             so it must not be an <h3> nested inside the <label>. Styled as h4. */}
          <span
            className="h4"
            style={{
              display: "block",
              margin: 0,
              marginBottom: "var(--gap-title-body)",
              color: "var(--color-grape)",
            }}
          >
            {extra.name}
          </span>
          <p
            style={{
              color: "var(--color-grape-soft)",
              fontSize: "var(--font-size-text-small)",
              lineHeight: "var(--line-height-large)",
              margin: 0,
            }}
          >
            {extra.description}
          </p>
        </div>
        <div className="flex flex-col items-end gap-[var(--space-2)]">
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-heavy)",
              fontSize: "var(--font-size-h3)",
              color: "var(--color-grape)",
              lineHeight: 1,
            }}
          >
            ${extra.price}
          </span>
          <span
            aria-hidden="true"
            className="flex items-center justify-center"
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "var(--radius-small)",
              border: `var(--border-width-main) solid ${
                checked ? "var(--color-mint-deep)" : "var(--color-grape)"
              }`,
              backgroundColor: checked ? "var(--toggle-check-bg)" : "transparent",
              transition: "background-color var(--motion-duration-fast) ease",
            }}
          >
            {checked && (
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M3 8.5l3 3 7-7.5"
                  fill="none"
                  stroke="var(--toggle-check-mark)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        </div>
      </div>
    </label>
  );
}

interface RunningTotalBarProps {
  base: number;
  extrasTotal: number;
  /** Mobile = sticky bottom bar; desktop = static rail card. */
  variant?: "sticky" | "rail";
}

/**
 * RunningTotalBar -- persistent overlay. Mobile sticky bottom bar (grape field,
 * marigold figure) that RESERVES its own height (page renders the spacer) and
 * never overlaps the last field or the Continue button; the figure ticks up on
 * toggle. Desktop = a summary rail card to the right of the field column.
 */
export function RunningTotalBar({
  base,
  extrasTotal,
  variant = "sticky",
}: RunningTotalBarProps) {
  const total = base + extrasTotal;
  if (variant === "rail") {
    return (
      <div
        className="card"
        style={{
          padding: "var(--space-5)",
          backgroundColor: "var(--card-bg)",
        }}
      >
        <h3 className="h4" style={{ margin: 0, marginBottom: "var(--space-4)", color: "var(--color-grape)" }}>
          Your package
        </h3>
        <dl className="flex flex-col gap-[var(--space-2)]" style={{ margin: 0 }}>
          <div className="flex items-center justify-between">
            <dt style={{ color: "var(--color-grape-soft)" }}>Base</dt>
            <dd style={{ margin: 0, color: "var(--color-grape)", fontWeight: "var(--font-weight-semibold)" }}>
              ${base}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt style={{ color: "var(--color-grape-soft)" }}>Extras</dt>
            <dd style={{ margin: 0, color: "var(--color-grape)", fontWeight: "var(--font-weight-semibold)" }}>
              ${extrasTotal}
            </dd>
          </div>
        </dl>
        <div
          className="mt-[var(--space-4)] flex items-center justify-between"
          style={{ paddingTop: "var(--space-3)", borderTop: "var(--border-width-main) solid var(--theme-border)" }}
        >
          <span style={{ fontWeight: "var(--font-weight-heavy)", color: "var(--color-grape)" }}>Total</span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--font-size-h3)",
              color: "var(--color-grape)",
            }}
          >
            ${total}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      data-theme="grape"
      className="lg:hidden"
      style={{
        position: "fixed",
        insetInline: 0,
        bottom: 0,
        zIndex: 90,
        minHeight: "var(--total-bar-height)",
        backgroundColor: "var(--total-bar-bg)",
        color: "var(--total-bar-text)",
        borderTop: "var(--border-width-main) solid var(--total-bar-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-3)",
        paddingInline: "var(--site-margin)",
        paddingBlock: "var(--space-3)",
      }}
    >
      <span style={{ fontSize: "var(--font-size-text-small)", color: "var(--total-bar-text)" }}>
        Base ${base} {extrasTotal > 0 ? `+ extras $${extrasTotal}` : ""}
      </span>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--font-size-h3)",
          color: "var(--total-bar-accent)",
          lineHeight: 1,
        }}
      >
        ${total}
      </span>
    </div>
  );
}

interface OrderSummaryProps {
  base: number;
  /** Label for the base line (the chosen tier name). Defaults to the package. */
  baseLabel?: string;
  selected: Extra[];
  /** GST is a flagged placeholder until the client confirms inclusive/exclusive. */
  gstNote?: string;
}

/** OrderSummary (Step 6) -- base + each extra + total + the flagged GST line. */
export function OrderSummary({ base, baseLabel = "Wedding Mates package", selected, gstNote }: OrderSummaryProps) {
  const extrasTotal = selected.reduce((sum, e) => sum + e.price, 0);
  const total = base + extrasTotal;
  return (
    <div
      className="card"
      style={{ padding: "var(--space-5)", backgroundColor: "var(--card-bg)" }}
    >
      <h3 className="h4" style={{ margin: 0, marginBottom: "var(--space-4)", color: "var(--color-grape)" }}>
        Order summary
      </h3>
      <dl className="flex flex-col gap-[var(--space-3)]" style={{ margin: 0 }}>
        <div className="flex items-center justify-between">
          <dt style={{ color: "var(--color-grape-soft)" }}>{baseLabel}</dt>
          <dd style={{ margin: 0, color: "var(--color-grape)", fontWeight: "var(--font-weight-semibold)" }}>
            ${base}
          </dd>
        </div>
        {selected.map((e) => (
          <div key={e.id} className="flex items-center justify-between">
            <dt style={{ color: "var(--color-grape-soft)" }}>{e.name}</dt>
            <dd style={{ margin: 0, color: "var(--color-grape)", fontWeight: "var(--font-weight-semibold)" }}>
              ${e.price}
            </dd>
          </div>
        ))}
      </dl>
      <div
        className="mt-[var(--space-4)] flex items-center justify-between"
        style={{ paddingTop: "var(--space-3)", borderTop: "var(--border-width-main) solid var(--theme-border)" }}
      >
        <span style={{ fontWeight: "var(--font-weight-heavy)", color: "var(--color-grape)" }}>Total</span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-h3)", color: "var(--color-grape)" }}>
          ${total}
        </span>
      </div>
      {gstNote && (
        <p
          className="mt-[var(--space-3)]"
          style={{
            fontSize: "var(--font-size-text-small)",
            color: "var(--color-marigold-deep)",
            margin: 0,
          }}
        >
          {gstNote}
        </p>
      )}
    </div>
  );
}
