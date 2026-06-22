import { Chip } from "@/components/ui/Chip";
import { VideoSlot, DownloadCard, Callout } from "@/components/ui/CourseUI";
import { LessonBody } from "@/components/course/LessonBody";
import { LessonActions } from "@/components/course/LessonActions";
import { SupportBlock } from "@/components/course/SupportBlock";
import { type CourseModule, COURSE_TOTAL_LESSONS } from "@/content/course";
import { lessonNumber } from "@/lib/course/sequence";

/**
 * LessonView -- the shared lesson surface, used by /course/introduction and
 * /course/[moduleSlug]. Server Component: header + video slot + markdown body +
 * downloads + support are static; only the complete-and-continue control is a
 * client island (LessonActions), which advances to the next slug and persists
 * completion.
 *
 * Data is driven entirely from the CourseModule passed in (from
 * src/content/course.ts). Nothing here is fabricated: a null videoUrl renders
 * the "video coming soon" slot, and a download with url:null renders the flagged
 * pending card.
 */
const ASIDE_BY_INDEX: Record<number, string> = {
  // Mate-facing coaching asides (page-copy "Lesson-page framing"). Rationed:
  // intro, mid-course, and pre-delivery only, so the voice stays a signature.
  0: "Take it one module at a time. There is no rush, and we are here the whole way.",
  4: "Going well? Take a break, then come back with fresh eyes. The best edits happen on a different day.",
  7: "Nervous about standing up? Good. That means you care. We will turn those nerves into energy.",
};

export function LessonView({
  module,
  index,
  isLast,
  initialCompleted,
}: {
  module: CourseModule;
  index: number;
  isLast: boolean;
  initialCompleted: string[];
}) {
  const lessonOf = `Lesson ${lessonNumber(module.slug)} of ${COURSE_TOTAL_LESSONS}`;
  const moduleLabel = module.isIntro ? "Introduction" : `Module ${index}`;
  const aside = ASIDE_BY_INDEX[index];

  return (
    <main id="main" className="w-full">
      <article data-surface="calm">
        {/* Section 1 -- header */}
        <header style={{ marginBottom: "var(--space-6)" }}>
          <div className="mb-[var(--space-3)] flex flex-wrap items-center gap-[var(--space-2)]">
            <Chip variant="calm">{moduleLabel}</Chip>
            <Chip variant="mint">{module.estTime}</Chip>
            <span className="meta-caps" style={{ color: "var(--color-grape-soft)" }}>
              {lessonOf}
            </span>
          </div>
          <h1 className="h1" style={{ margin: 0, color: "var(--color-grape)" }}>
            {module.title}
          </h1>
          <p
            className="text-large mt-[var(--space-3)]"
            style={{ color: "var(--color-grape-soft)", maxWidth: "var(--lesson-measure)" }}
          >
            {module.subtitle}
          </p>
        </header>

        {/* Section 2 -- video slot (null -> "coming soon"; never blocks reading) */}
        <div style={{ maxWidth: "var(--lesson-measure)", marginBottom: "var(--space-6)" }}>
          <VideoSlot videoUrl={module.videoUrl ?? undefined} />
        </div>

        {/* Optional coaching aside (rationed) */}
        {aside && (
          <div style={{ maxWidth: "var(--lesson-measure)" }}>
            <Callout tone="warm">{aside}</Callout>
          </div>
        )}

        {/* Section 3 -- long-form markdown body at the calm reading measure */}
        <LessonBody markdown={module.bodyMd} />

        {/* Section 4 -- downloads (real links new-tab; the 2 pending stay flagged) */}
        {module.downloads.length > 0 && (
          <section
            style={{
              marginTop: "var(--section-space-small)",
              maxWidth: "var(--lesson-measure)",
            }}
          >
            <p
              className="meta-caps"
              style={{
                color: "var(--color-grape-soft)",
                marginBottom: "var(--space-3)",
              }}
            >
              Download for this module
            </p>
            <div className="flex flex-col gap-[var(--space-3)]">
              {module.downloads.map((d) => (
                <DownloadCard
                  key={d.label}
                  name={d.label}
                  href={d.url ?? undefined}
                  meta={
                    d.url
                      ? d.kind === "drive"
                        ? "Google Drive, opens in a new tab"
                        : "Canva, opens in a new tab"
                      : "Coming soon. We'll add this download shortly."
                  }
                />
              ))}
            </div>
          </section>
        )}

        {/* Module 8 finish state -- celebratory but calm, no burst */}
        {isLast && (
          <section
            className="card"
            style={{
              marginTop: "var(--section-space-small)",
              maxWidth: "var(--lesson-measure)",
              padding: "var(--space-6)",
              backgroundColor: "var(--color-field-mint)",
              borderColor: "var(--color-mint-deep)",
            }}
          >
            <Chip variant="mint" className="mb-[var(--space-3)]">
              You did it
            </Chip>
            <p className="hype" style={{ margin: 0, color: "var(--color-grape)" }}>
              You&apos;re <span className="hit">ready.</span>
            </p>
            <p
              className="mt-[var(--space-3)]"
              style={{ color: "var(--color-grape-soft)", maxWidth: "52ch" }}
            >
              You have everything you need to lead a ceremony your couple will
              never forget. Run through the final section of your Module 1
              checklist, then go and do something amazing.
            </p>
          </section>
        )}

        {/* Section 5 -- complete & continue (inline) */}
        <div style={{ maxWidth: "var(--lesson-measure)" }}>
          <LessonActions
            slug={module.slug}
            isLast={isLast}
            initialCompleted={initialCompleted}
          />
        </div>

        {/* Section 6 -- support footer (repeated on every lesson) */}
        <div style={{ marginTop: "var(--section-space-small)" }}>
          <SupportBlock />
        </div>

        {/* Spacer so the mobile sticky bar never overlaps the support footer. */}
        <div aria-hidden="true" className="lg:hidden" style={{ height: "var(--space-8)" }} />
      </article>

      {/* Sticky complete-and-continue bar on mobile (reserves its own space via
          the spacer above so it never overlaps content). */}
      <LessonActions
        slug={module.slug}
        isLast={isLast}
        initialCompleted={initialCompleted}
        sticky
      />
    </main>
  );
}
