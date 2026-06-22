import { Logo } from "@/components/ui/Logo";

interface BookingHeaderProps {
  /** 1-based current step, for the "Step X of 7" progress label. */
  current?: number;
  total?: number;
  /** Show the "Save & exit" affordance (hidden on the confirmation screen). */
  showExit?: boolean;
}

/**
 * BookingHeader -- the minimal booking chrome that replaces the marketing nav
 * inside /book. Logo -> home, a "Step X of 7" progress label (the calm register
 * carry-over; no marketing nav, no sticky Book Now bar), and a "Save & exit"
 * link. Reserves --header-booking-height. Calm surface.
 */
export function BookingHeader({
  current,
  total = 7,
  showExit = true,
}: BookingHeaderProps) {
  return (
    <header
      data-surface="calm"
      className="sticky top-0 z-40 flex items-center justify-between"
      style={{
        minHeight: "var(--header-booking-height)",
        backgroundColor: "var(--color-page)",
        borderBottom: "var(--border-width-main) solid var(--theme-border)",
        paddingInline: "var(--site-margin)",
        paddingBlock: "var(--space-3)",
      }}
    >
      <a href="/" aria-label="Wedding Mates home" className="link-plain inline-flex">
        <Logo color="var(--color-grape)" counterFill="var(--color-page)" width={132} />
      </a>

      <div className="flex items-center gap-[var(--space-4)]">
        {current && (
          <span
            aria-live="polite"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-semibold)",
              fontSize: "var(--font-size-text-small)",
              color: "var(--color-grape-soft)",
            }}
          >
            Step {current} of {total}
          </span>
        )}
        {showExit && (
          <a
            href="/"
            className="link-plain"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--font-weight-semibold)",
              fontSize: "var(--font-size-text-small)",
              color: "var(--color-grape)",
              textDecoration: "underline",
              textDecorationColor: "var(--color-grape-o40)",
              textUnderlineOffset: "0.2em",
            }}
          >
            Save &amp; exit
          </a>
        )}
      </div>
    </header>
  );
}
