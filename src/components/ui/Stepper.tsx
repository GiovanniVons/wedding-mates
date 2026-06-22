import { cn } from "@/lib/utils";

export interface Step {
  label: string;
  optional?: boolean;
}

export const BOOKING_STEPS: Step[] = [
  { label: "Date" },
  { label: "Details" },
  { label: "Celebrant", optional: true },
  { label: "Location", optional: true },
  { label: "Extras" },
  { label: "Payment" },
  { label: "Done" },
];

interface StepperProps {
  steps?: Step[];
  /** 1-based index of the current step. */
  current: number;
  className?: string;
}

/**
 * Stepper -- the 7-segment booking running order. Done = mint tick, current =
 * coral dot with a ring halo, upcoming = outlined. Optional steps carry an
 * "Optional" marigold-deep label. Reserves its own height above the field
 * column; mobile compacts to "Step X of N: [label]". Calm register vocabulary
 * so the buyer recognises the brand assembling their ceremony.
 */
export function Stepper({ steps = BOOKING_STEPS, current, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)} data-surface="calm">
      {/* Desktop: full track */}
      <ol
        className="hidden items-start md:flex"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        {steps.map((step, i) => {
          const num = i + 1;
          const status =
            num < current ? "done" : num === current ? "current" : "upcoming";
          return (
            <li
              key={step.label}
              className="relative flex flex-1 flex-col items-center"
              style={{ minWidth: 0 }}
              aria-current={status === "current" ? "step" : undefined}
            >
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute top-[calc(var(--step-dot-size)/2)] h-[var(--border-width-main)]"
                  style={{
                    right: "50%",
                    width: "100%",
                    backgroundColor:
                      num <= current ? "var(--color-mint)" : "var(--step-track)",
                  }}
                />
              )}
              <span
                className="relative z-10 flex items-center justify-center"
                style={{
                  width: "var(--step-dot-size)",
                  height: "var(--step-dot-size)",
                  borderRadius: "var(--radius-round)",
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-heavy)",
                  fontSize: "var(--font-size-text-small)",
                  backgroundColor:
                    status === "done"
                      ? "var(--step-done-bg)"
                      : status === "current"
                        ? "var(--step-current-bg)"
                        : "var(--step-upcoming-bg)",
                  color:
                    status === "done"
                      ? "var(--step-done-text)"
                      : status === "current"
                        ? "var(--step-current-text)"
                        : "var(--step-upcoming-text)",
                  border:
                    status === "upcoming"
                      ? "var(--border-width-main) solid var(--step-upcoming-border)"
                      : "none",
                  boxShadow:
                    status === "current"
                      ? "0 0 0 4px var(--step-current-ring)"
                      : "none",
                }}
              >
                {status === "done" ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M3 8.5l3 3 7-7.5"
                      fill="none"
                      stroke="var(--step-done-text)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  num
                )}
              </span>
              <span
                className="mt-[var(--space-2)] text-center"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-semibold)",
                  fontSize: "var(--font-size-text-small)",
                  color:
                    status === "upcoming"
                      ? "var(--step-label-muted)"
                      : "var(--step-label)",
                }}
              >
                {step.label}
              </span>
              {step.optional && (
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-chip)",
                    fontWeight: "var(--font-weight-semibold)",
                    textTransform: "uppercase",
                    letterSpacing: "var(--letter-spacing-wide)",
                    color: "var(--step-optional-label)",
                  }}
                >
                  Optional
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {/* Mobile: compact dots + label */}
      <div className="md:hidden">
        <div className="mb-[var(--space-2)] flex items-center gap-[var(--space-1)]">
          {steps.map((step, i) => {
            const num = i + 1;
            const status =
              num < current ? "done" : num === current ? "current" : "upcoming";
            return (
              <span
                key={step.label}
                aria-hidden="true"
                className="h-[8px] flex-1"
                style={{
                  borderRadius: "var(--radius-round)",
                  backgroundColor:
                    status === "done"
                      ? "var(--color-mint)"
                      : status === "current"
                        ? "var(--color-coral)"
                        : "var(--step-track)",
                }}
              />
            );
          })}
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: "var(--font-weight-semibold)",
            fontSize: "var(--font-size-text-small)",
            color: "var(--step-label)",
            margin: 0,
          }}
        >
          Step {current} of {steps.length}: {steps[current - 1]?.label}
        </p>
      </div>
    </div>
  );
}
