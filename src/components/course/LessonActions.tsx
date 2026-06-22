"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useProgress } from "@/lib/course/progress-client";
import { nextSlug, prevSlug } from "@/lib/course/sequence";

interface LessonActionsProps {
  /** The current lesson slug. */
  slug: string;
  /** True when this is the final module (Module 8). */
  isLast: boolean;
  /** Completed slugs the server already knows (empty in DEV preview). */
  initialCompleted: string[];
}

/**
 * LessonActions -- the live complete-and-continue control.
 *
 * On click it marks the current module complete (Supabase upsert in production,
 * sessionStorage in DEV preview, via useProgress), then advances the router to
 * the next module's slug. On the last module it routes back to the dashboard,
 * where the Module-8 finish state and full ProgressRing show.
 *
 * Renders twice on a lesson page (the page composes both): a normal inline pair
 * and a sticky mobile bottom bar. Both share this one client island so a single
 * markComplete() drives the whole page. The "Back" button is a plain router push
 * to the previous slug (or the dashboard from the Introduction).
 */
export function LessonActions({
  slug,
  isLast,
  initialCompleted,
  sticky = false,
}: LessonActionsProps & { sticky?: boolean }) {
  const router = useRouter();
  const { markComplete, completed } = useProgress(initialCompleted);
  const [busy, setBusy] = useState(false);

  const back = prevSlug(slug);
  const next = nextSlug(slug);
  const alreadyDone = completed.has(slug);

  async function onComplete() {
    if (busy) return;
    setBusy(true);
    await markComplete(slug);
    // Advance: next lesson, or back to the dashboard on the final module.
    if (next) {
      router.push(`/course/${next}`);
    } else {
      router.push("/course");
    }
  }

  function onBack() {
    if (back) router.push(`/course/${back}`);
    else router.push("/course");
  }

  const inner = (
    <div className="flex flex-col-reverse items-stretch gap-[var(--space-3)] sm:flex-row sm:items-center sm:justify-between">
      <Button variant="secondary" size="medium" onClick={onBack} type="button">
        Back
      </Button>
      <Button
        variant="success"
        size="medium"
        onClick={onComplete}
        disabled={busy}
        type="button"
      >
        {isLast
          ? "Finish the course"
          : alreadyDone
            ? "Continue"
            : "Mark complete and continue"}
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
