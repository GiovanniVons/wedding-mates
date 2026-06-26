"use client";

import { TIERS, centsToDollars, formatDollars, type TierKey } from "@/lib/stripe/pricing";

/**
 * TierSelect -- compact in-flow package switcher. Renders the two tiers as
 * selectable radio rows so a buyer can change package WITHOUT leaving the
 * booking flow (the old "Change" link bounced out to /pricing). Selecting a row
 * updates the wizard's tier, which cascades to the chip, the order summary and
 * the total.
 */
export function TierSelect({
  value,
  onChange,
}: {
  value: TierKey;
  onChange: (tier: TierKey) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Choose your package"
      className="flex flex-col gap-[var(--space-2)]"
    >
      {TIERS.map((tier) => {
        const selected = tier.key === value;
        return (
          <button
            key={tier.key}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(tier.key)}
            className="tier-row"
            data-selected={selected ? "true" : undefined}
          >
            <span className="tier-row-radio" aria-hidden="true" />
            <span style={{ flex: 1, minWidth: 0 }}>
              <span className="flex items-baseline justify-between gap-[var(--space-2)]">
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: "var(--font-weight-heavy)",
                    color: "var(--color-grape)",
                  }}
                >
                  {tier.name}
                  {tier.recommended && (
                    <span
                      style={{
                        marginInlineStart: "var(--space-2)",
                        fontSize: "var(--font-size-chip)",
                        fontWeight: "var(--font-weight-semibold)",
                        textTransform: "uppercase",
                        letterSpacing: "var(--letter-spacing-wide)",
                        color: "var(--color-coral-deep)",
                      }}
                    >
                      Most popular
                    </span>
                  )}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: "var(--font-weight-heavy)",
                    color: "var(--color-coral-deep)",
                    whiteSpace: "nowrap",
                  }}
                >
                  ${formatDollars(centsToDollars(tier.amountCents))}
                </span>
              </span>
              <span
                style={{
                  display: "block",
                  marginTop: "var(--space-1)",
                  color: "var(--color-grape-soft)",
                  fontSize: "var(--font-size-text-small)",
                  lineHeight: "var(--line-height-medium)",
                }}
              >
                {tier.tagline}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
