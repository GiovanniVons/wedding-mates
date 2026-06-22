import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/utils";

/**
 * VideoSlot -- 16:9 grape placeholder with a marigold play glyph and the
 * "Video coming soon" line. A single videoUrl swap-point renders the player
 * when a real URL exists. Never blocks the written guide below.
 */
export function VideoSlot({ videoUrl }: { videoUrl?: string }) {
  if (videoUrl) {
    return (
      <div
        className="overflow-hidden"
        style={{ aspectRatio: "16 / 9", borderRadius: "var(--radius-main)", backgroundColor: "var(--video-slot-bg)" }}
      >
        <iframe
          src={videoUrl}
          title="Lesson video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: 0 }}
        />
      </div>
    );
  }
  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{
        aspectRatio: "16 / 9",
        borderRadius: "var(--radius-main)",
        backgroundColor: "var(--video-slot-bg)",
        color: "var(--video-slot-text)",
        padding: "var(--space-5)",
      }}
    >
      <span
        className="flex items-center justify-center"
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "var(--radius-round)",
          backgroundColor: "var(--color-marigold-o30)",
          marginBottom: "var(--space-3)",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 5v14l11-7z" fill="var(--video-slot-icon)" />
        </svg>
      </span>
      <p style={{ margin: 0, color: "var(--video-slot-text)", maxWidth: "32ch" }}>
        Video coming soon. The full written guide is below.
      </p>
    </div>
  );
}

type CalloutTone = "warm" | "tip" | "example";

const CALLOUT_STYLE: Record<
  CalloutTone,
  { bg: string; accent: string; label: string }
> = {
  warm: { bg: "var(--lesson-callout-bg)", accent: "var(--lesson-callout-border)", label: "A note from Sarah" },
  tip: { bg: "var(--lesson-tip-bg)", accent: "var(--lesson-tip-border)", label: "Tip" },
  example: { bg: "var(--lesson-example-bg)", accent: "var(--lesson-example-border)", label: "Example" },
};

/**
 * Callout -- warm-voice asides / tips / example boxes within a lesson. Restyled
 * to sit inside the Recessional Pop system rather than read as a chunky boxed
 * block: a tinted flat field with a single accent rule along the top edge (not
 * a heavy full-height left border), a small accent-dot cue label tying it to
 * the chip/meta system, and balanced internal rhythm. Flat, AA, no gradient.
 */
export function Callout({
  tone = "warm",
  children,
}: {
  tone?: CalloutTone;
  children: React.ReactNode;
}) {
  const s = CALLOUT_STYLE[tone];
  return (
    <aside
      style={{
        backgroundColor: s.bg,
        borderTop: `var(--border-width-bold) solid ${s.accent}`,
        borderRadius: "var(--radius-small)",
        paddingBlock: "var(--space-4)",
        paddingInline: "var(--space-5)",
        marginBlock: "var(--space-6)",
      }}
    >
      <span
        className="meta-caps"
        style={{
          color: s.accent,
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--space-2)",
          marginBottom: "var(--gap-title-body)",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: "0.5rem",
            height: "0.5rem",
            borderRadius: "var(--radius-round)",
            backgroundColor: s.accent,
            flexShrink: 0,
          }}
        />
        {s.label}
      </span>
      <div style={{ color: "var(--color-grape-soft)", margin: 0 }}>{children}</div>
    </aside>
  );
}

interface DownloadCardProps {
  name: string;
  href?: string;
  meta?: string;
}

/**
 * DownloadCard -- labelled resource, opens in a new tab with rel noopener.
 * Missing links (the 2 unconfirmed downloads) render a flagged "Coming soon"
 * pending card rather than a fabricated link.
 */
export function DownloadCard({ name, href, meta }: DownloadCardProps) {
  const pending = !href;
  return (
    <div
      className="card flex items-center justify-between gap-[var(--space-3)]"
      style={{ padding: "var(--space-4)", opacity: pending ? 0.85 : 1 }}
    >
      <div className="flex items-center gap-[var(--space-3)]">
        <span
          className="flex items-center justify-center"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "var(--radius-small)",
            backgroundColor: "var(--color-field-tint)",
            flexShrink: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 3v11m0 0l-4-4m4 4l4-4M5 19h14"
              fill="none"
              stroke="var(--color-grape)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div>
          <p style={{ margin: 0, fontWeight: "var(--font-weight-semibold)", color: "var(--color-grape)" }}>
            {name}
          </p>
          {meta && (
            <p style={{ margin: 0, fontSize: "var(--font-size-text-small)", color: "var(--color-grape-soft)" }}>
              {meta}
            </p>
          )}
        </div>
      </div>
      {pending ? (
        <Chip variant="calm">Coming soon</Chip>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer">
          Download
        </a>
      )}
    </div>
  );
}

interface LessonShellProps {
  moduleLabel: string; // "Module 3"
  title: string;
  estTime: string;
  lessonOf: string; // "Lesson 4 of 9"
  children: React.ReactNode;
}

/** LessonShell -- lesson header + the reading column at --lesson-measure. */
export function LessonShell({
  moduleLabel,
  title,
  estTime,
  lessonOf,
  children,
}: LessonShellProps) {
  return (
    <article data-surface="calm">
      <header style={{ marginBottom: "var(--space-6)" }}>
        <div className="mb-[var(--space-3)] flex flex-wrap items-center gap-[var(--space-2)]">
          <Chip variant="calm">{moduleLabel}</Chip>
          <Chip variant="mint">{estTime}</Chip>
          <span
            className="meta-caps"
            style={{ color: "var(--color-grape-soft)" }}
          >
            {lessonOf}
          </span>
        </div>
        <h1 className="h1" style={{ margin: 0, color: "var(--color-grape)" }}>
          {title}
        </h1>
      </header>
      <div className="prose-course" style={{ maxWidth: "var(--lesson-measure)" }}>
        {children}
      </div>
    </article>
  );
}

interface CompleteAndContinueProps {
  /** When true, renders as a sticky bottom bar (mobile). */
  sticky?: boolean;
  finished?: boolean;
}

/**
 * CompleteAndContinue -- Success "Mark complete and continue" + secondary
 * "Back". Sticky bottom bar on mobile (reserves space, anchored to the lesson).
 */
export function CompleteAndContinue({
  sticky = false,
  finished = false,
}: CompleteAndContinueProps) {
  const inner = (
    <div className="flex flex-col-reverse items-stretch gap-[var(--space-3)] sm:flex-row sm:items-center sm:justify-between">
      <Button variant="secondary" size="medium">
        Back
      </Button>
      <Button variant="success" size="medium">
        {finished ? "Finish the course" : "Mark complete and continue"}
      </Button>
    </div>
  );
  if (sticky) {
    return (
      <div
        className="lg:hidden"
        style={{
          position: "fixed",
          insetInline: 0,
          bottom: 0,
          zIndex: 80,
          backgroundColor: "var(--color-page-o92)",
          backdropFilter: "blur(var(--header-blur))",
          borderTop: "var(--border-width-main) solid var(--theme-border)",
          padding: "var(--space-3) var(--site-margin)",
        }}
      >
        {inner}
      </div>
    );
  }
  return <div style={{ marginTop: "var(--space-7)" }}>{inner}</div>;
}

export interface ModuleTreeItem {
  label: string;
  status: "complete" | "current" | "locked";
  href?: string;
}

interface CourseSidebarProps {
  completed: number;
  total: number;
  modules: ModuleTreeItem[];
  className?: string;
}

/**
 * CourseSidebar -- persistent left rail (desktop) on the course shell.
 * Logo -> dashboard, progress, module tree with state, Resources, Support.
 * No "Book Now" (already paid). The mobile drawer wraps this same content.
 */
export function CourseSidebar({
  completed,
  total,
  modules,
  className,
}: CourseSidebarProps) {
  return (
    <aside
      className={cn("flex h-full flex-col", className)}
      data-surface="calm"
      style={{
        width: "var(--course-sidebar-width)",
        backgroundColor: "var(--course-sidebar-bg)",
        borderRight: "var(--border-width-main) solid var(--course-sidebar-border)",
        padding: "var(--space-5)",
      }}
    >
      <a href="/course" aria-label="Course dashboard" className="link-plain mb-[var(--space-5)] inline-flex">
        {/* Logo imported by the page; sidebar keeps a simple text fallback */}
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--font-size-h3)",
            textTransform: "uppercase",
            color: "var(--color-grape)",
          }}
        >
          Wedding Mates
        </span>
      </a>

      <p
        className="meta-caps"
        style={{ color: "var(--color-grape-soft)", marginBottom: "var(--space-2)" }}
      >
        {completed} of {total} complete
      </p>

      <nav aria-label="Course modules" className="flex flex-col gap-[var(--space-1)]">
        {modules.map((m) => (
          <a
            key={m.label}
            href={m.status === "locked" ? undefined : m.href}
            aria-disabled={m.status === "locked"}
            className="link-plain flex items-center gap-[var(--space-2)]"
            style={{
              padding: "var(--space-2) var(--space-3)",
              borderRadius: "var(--radius-small)",
              backgroundColor:
                m.status === "current" ? "var(--color-field-coral)" : "transparent",
              color:
                m.status === "locked" ? "var(--color-grape-soft)" : "var(--color-grape)",
              fontWeight:
                m.status === "current"
                  ? "var(--font-weight-bold)"
                  : "var(--font-weight-medium)",
              fontSize: "var(--font-size-text-small)",
              opacity: m.status === "locked" ? 0.7 : 1,
              cursor: m.status === "locked" ? "not-allowed" : "pointer",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "var(--radius-round)",
                flexShrink: 0,
                backgroundColor:
                  m.status === "complete"
                    ? "var(--color-mint)"
                    : m.status === "current"
                      ? "var(--color-coral)"
                      : "var(--color-grape-o20)",
              }}
            />
            {m.label}
          </a>
        ))}
      </nav>

      <div className="mt-[var(--space-6)]">
        <p className="meta-caps" style={{ color: "var(--color-grape-soft)", marginBottom: "var(--space-2)" }}>
          Resources
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="flex flex-col gap-[var(--space-2)]">
          <li><a href="/course/readings">Readings Library</a></li>
          <li><a href="/course/strategies">Performance Strategies</a></li>
        </ul>
      </div>

      <div
        className="mt-auto"
        style={{
          paddingTop: "var(--space-5)",
          borderTop: "var(--border-width-main) solid var(--course-sidebar-border)",
        }}
      >
        <p style={{ fontWeight: "var(--font-weight-semibold)", color: "var(--color-grape)", margin: 0 }}>
          Stuck? Message Sarah
        </p>
        <a
          href="mailto:sarah@letsgetwed.com.au"
          style={{ fontSize: "var(--font-size-text-small)" }}
        >
          sarah@letsgetwed.com.au
        </a>
      </div>
    </aside>
  );
}

/**
 * LockedState -- the paywall. Module tree visible but greyed under an overlay;
 * a centred message "Your course is waiting", primary "Book Now" -> /book,
 * secondary "Already booked? Contact support". The one course surface where
 * the Book Now CTA returns.
 */
export function LockedState() {
  return (
    <div
      className="relative flex flex-col items-center justify-center text-center"
      style={{
        minHeight: "60vh",
        borderRadius: "var(--radius-main)",
        backgroundColor: "var(--color-page-tint)",
        padding: "var(--space-8)",
      }}
    >
      <span
        className="mb-[var(--space-4)] flex items-center justify-center"
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "var(--radius-round)",
          backgroundColor: "var(--color-marigold-o30)",
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="5" y="11" width="14" height="9" rx="2" fill="var(--color-grape)" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="var(--color-grape)" strokeWidth="2" />
        </svg>
      </span>
      <h1 className="h1" style={{ margin: 0, color: "var(--color-grape)" }}>
        Your course is waiting
      </h1>
      <p className="text-large mt-[var(--space-3)]" style={{ color: "var(--color-grape-soft)", maxWidth: "46ch" }}>
        Course access comes with the $950 Wedding Mates booking. Once the couple
        books, your login and the full Blueprint land in your inbox.
      </p>
      <div className="mt-[var(--space-5)] flex flex-col items-center gap-[var(--space-3)] sm:flex-row">
        <Button as="a" href="/book" variant="primary" size="large">
          Book Now
        </Button>
        <Button as="a" href="/contact" variant="tertiary" size="medium">
          Already booked? Contact support
        </Button>
      </div>
    </div>
  );
}
