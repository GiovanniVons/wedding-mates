"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { MODULES, COURSE_TOTAL_LESSONS } from "@/content/course";
import { useProgress } from "@/lib/course/progress-client";
import {
  allComplete,
  moduleState,
  resumeSlug,
  type ModuleState,
} from "@/lib/course/sequence";

/**
 * DashboardProgress -- the reactive heart of the /course dashboard.
 *
 * Lives client-side because in DEV preview the completed set is only known to
 * the browser (sessionStorage), so the ProgressRing, the primary CTA label and
 * the module-tree states must all derive from the live client store. In
 * production the server passes the real completed slugs as `initialCompleted`,
 * so the first paint is already correct and this just stays in sync after a
 * complete-and-continue navigates back here.
 *
 * Surrounding chrome (welcome, resources, support) stays in the Server
 * Component page; only the progress-driven pieces live here.
 */
const STATE_CHIP: Record<ModuleState, { label: string; variant: "mint" | "calm" }> =
  {
    complete: { label: "Complete", variant: "mint" },
    current: { label: "In progress", variant: "calm" },
    locked: { label: "Locked", variant: "calm" },
  };

export function DashboardProgress({
  firstName,
  initialCompleted,
}: {
  firstName: string;
  initialCompleted: string[];
}) {
  const { completed, count } = useProgress(initialCompleted);
  const resume = resumeSlug(completed);
  const finished = allComplete(completed);
  const fresh = count === 0;

  return (
    <>
      {/* Section 1 -- welcome + progress ring + continue CTA */}
      <section className="flex flex-col gap-[var(--space-6)] md:flex-row md:items-center md:justify-between">
        <div style={{ maxWidth: "var(--lesson-measure)" }}>
          <Chip variant="loud" className="mb-[var(--space-3)]">
            Members
          </Chip>
          <h1 className="h1" style={{ margin: 0, color: "var(--color-grape)" }}>
            Welcome, {firstName}
          </h1>
          <p
            className="text-large mt-[var(--space-3)]"
            style={{ color: "var(--color-grape-soft)", maxWidth: "48ch" }}
          >
            You were asked because they trust you. Let&apos;s get you ready.
          </p>
          <div className="mt-[var(--space-5)]">
            <Button
              as="a"
              href={`/course/${resume}`}
              variant="primary"
              size="large"
            >
              {fresh ? "Start the course" : "Continue learning"}
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <ProgressRing completed={count} total={COURSE_TOTAL_LESSONS} />
          <p
            className="meta-caps mt-[var(--space-2)]"
            style={{ color: "var(--color-grape-soft)" }}
          >
            {count} of {COURSE_TOTAL_LESSONS} complete
          </p>
        </div>
      </section>

      {/* Section 2 -- module tree (sequential unlock) */}
      <section style={{ marginTop: "var(--section-space-small)" }}>
        <p
          className="meta-caps"
          style={{
            color: "var(--color-grape-soft)",
            marginBottom: "var(--space-4)",
          }}
        >
          Work through these in order. Finish one to unlock the next.
        </p>
        <ol
          style={{ listStyle: "none", padding: 0, margin: 0 }}
          className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-2"
        >
          {MODULES.map((m, i) => {
            const state = moduleState(m.slug, completed);
            const chip = STATE_CHIP[state];
            const locked = state === "locked";
            const img = m.isIntro ? null : `/images/module${i}.jpg`;
            const Card = (
              <div
                className="card flex h-full flex-col overflow-hidden"
                style={{ opacity: locked ? 0.62 : 1 }}
              >
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: "16 / 9",
                    backgroundColor: m.isIntro
                      ? "var(--color-field-coral)"
                      : "var(--color-field-tint)",
                  }}
                >
                  {img ? (
                    <Image
                      src={img}
                      alt={`${m.title}: a moment from a Wedding Mates ceremony`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{
                        objectFit: "cover",
                        filter: locked ? "grayscale(0.4)" : undefined,
                      }}
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--font-size-h2)",
                        textTransform: "uppercase",
                        color: "var(--color-coral)",
                        opacity: 0.5,
                      }}
                    >
                      Start here
                    </span>
                  )}
                </div>
                <div
                  className="flex flex-1 flex-col"
                  style={{ padding: "var(--space-4)" }}
                >
                  <div className="mb-[var(--space-2)] flex items-center justify-between gap-[var(--space-2)]">
                    <Chip variant={chip.variant}>{chip.label}</Chip>
                    <span
                      className="meta-caps"
                      style={{ color: "var(--color-grape-soft)" }}
                    >
                      {m.estTime}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--color-grape)",
                    }}
                  >
                    {m.title}
                  </p>
                  <p
                    className="mt-[var(--space-1)]"
                    style={{
                      margin: 0,
                      fontSize: "var(--font-size-text-small)",
                      color: "var(--color-grape-soft)",
                    }}
                  >
                    {m.subtitle}
                  </p>
                </div>
              </div>
            );
            return (
              <li key={m.slug} className="h-full">
                {locked ? (
                  <div
                    aria-disabled="true"
                    title="Finish the previous module to unlock this one"
                    className="block h-full cursor-not-allowed"
                  >
                    {Card}
                  </div>
                ) : (
                  <Link
                    href={`/course/${m.slug}`}
                    className="link-plain card-interactive block h-full"
                  >
                    {Card}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      {finished && (
        <section
          className="card"
          style={{
            marginTop: "var(--section-space-small)",
            padding: "var(--space-6)",
            backgroundColor: "var(--color-field-mint)",
            borderColor: "var(--color-mint-deep)",
          }}
        >
          <Chip variant="mint" className="mb-[var(--space-3)]">
            All done
          </Chip>
          <h2 className="h2" style={{ margin: 0, color: "var(--color-grape)" }}>
            You&apos;re ready.
          </h2>
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
    </>
  );
}
