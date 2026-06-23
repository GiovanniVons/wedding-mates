import { Logo } from "@/components/ui/Logo";
import { Chip } from "@/components/ui/Chip";

interface AuthShellProps {
  chip: string;
  heading: string;
  children: React.ReactNode;
  /** Supporting links below the form (e.g. "Forgot password?"). */
  footer?: React.ReactNode;
}

/**
 * AuthShell -- centred ~420px card on a page-tint surface, booking-style chrome
 * (logo only), calm register. Heading in Archivo Black, one marigold cue chip
 * (the only accent besides the primary button), supporting text links with the
 * styled underline. Used by Login, Register, Forgot, Reset.
 */
export function AuthShell({ chip, heading, children, footer }: AuthShellProps) {
  return (
    <main
      id="main"
      data-surface="calm"
      className="flex min-h-screen flex-col items-center"
      style={{
        backgroundColor: "var(--color-page-tint)",
        paddingTop: "var(--section-space-page-top)",
        paddingBottom: "var(--section-space-main)",
        paddingInline: "var(--site-margin)",
      }}
    >
      <a href="/" aria-label="Wedding Mates home" className="link-plain mb-[var(--space-7)] inline-flex">
        <Logo color="var(--color-grape)" width={160} />
      </a>
      <div
        className="card w-full"
        style={{
          maxWidth: "26.25rem",
          backgroundColor: "var(--color-page)",
          padding: "var(--space-6)",
        }}
      >
        <Chip variant="loud" className="mb-[var(--space-3)]">
          {chip}
        </Chip>
        <h1 className="h2" style={{ margin: 0, marginBottom: "var(--space-5)", color: "var(--color-grape)" }}>
          {heading}
        </h1>
        <div className="flex flex-col gap-[var(--space-4)]">{children}</div>
        {footer && (
          <div
            className="mt-[var(--space-5)] flex flex-col gap-[var(--space-2)] text-center"
            style={{ fontSize: "var(--font-size-text-small)" }}
          >
            {footer}
          </div>
        )}
      </div>
    </main>
  );
}
