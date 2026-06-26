import { cn } from "@/lib/utils";

export interface Step {
  label: string;
  optional?: boolean;
}

export const BOOKING_STEPS: Step[] = [
  { label: "Date" },
  { label: "Details" },
  { label: "Your day", optional: true },
  { label: "Pay" },
  { label: "Done" },
];

interface StepperProps {
  steps?: Step[];
  /** 1-based index of the current step. */
  current: number;
  /** When provided, completed (done) steps become clickable to jump back. */
  onStepSelect?: (step: number) => void;
  className?: string;
}

/**
 * Stepper -- the booking running order. Done = mint tick, current = coral dot
 * with a ring halo, upcoming = outlined. Optional steps carry an "Optional"
 * marigold-deep label. Completed steps are clickable (when onStepSelect is set)
 * so the buyer can hop back to edit a previous answer. Reserves its own height
 * above the field column; mobile compacts to "Step X of N: [label]".
 */
export function Stepper({ steps = BOOKING_STEPS, current, onStepSelect, className }: StepperProps) {
  const dot = (num: number, status: "done" | "current" | "upcoming") => (
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
        boxShadow: status === "current" ? "0 0 0 4px var(--step-current-ring)" : "none",
      }}
    >
      {status === "done" ? (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3 8.5l3 3 7-7.5" fill="none" stroke="var(--step-done-text)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        num
      )}
    </span>
  );

  return (
    <div className={cn("w-full", className)} data-surface="calm">
      {/* Desktop: full track */}
      <ol className="hidden items-start md:flex" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {steps.map((step, i) => {
          const num = i + 1;
          const status = num < current ? "done" : num === current ? "current" : "upcoming";
          const clickable = status === "done" && !!onStepSelect;
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
                  style={{ right: "50%", width: "100%", backgroundColor: num <= current ? "var(--color-mint)" : "var(--step-track)" }}
                />
              )}
              {clickable ? (
                <button
                  type="button"
                  className="step-dot-button"
                  aria-label={`Go back to ${step.label}`}
                  onClick={() => onStepSelect!(num)}
                >
                  {dot(num, status)}
                </button>
              ) : (
                dot(num, status)
              )}
              <span
                className="mt-[var(--space-2)] text-center"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-semibold)",
                  fontSize: "var(--font-size-text-small)",
                  color: status === "upcoming" ? "var(--step-label-muted)" : "var(--step-label)",
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
            const status = num < current ? "done" : num === current ? "current" : "upcoming";
            const clickable = status === "done" && !!onStepSelect;
            const bar = (
              <span
                aria-hidden={clickable ? undefined : "true"}
                className="block h-[8px] w-full"
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
            return clickable ? (
              <button
                key={step.label}
                type="button"
                className="flex-1"
                style={{ padding: 0, border: "none", background: "transparent", cursor: "pointer" }}
                aria-label={`Go back to ${step.label}`}
                onClick={() => onStepSelect!(num)}
              >
                {bar}
              </button>
            ) : (
              <span key={step.label} className="flex-1">
                {bar}
              </span>
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
