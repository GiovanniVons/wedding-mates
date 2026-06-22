"use client";

import { CourseSidebar, type ModuleTreeItem } from "@/components/ui/CourseUI";
import { MODULES, COURSE_TOTAL_LESSONS } from "@/content/course";
import { useProgress } from "@/lib/course/progress-client";
import { moduleState } from "@/lib/course/sequence";

/**
 * CourseSidebarLive -- the persistent left rail, made reactive.
 *
 * The presentational CourseSidebar takes a precomputed module tree + count. This
 * client wrapper derives both from the live progress store (useProgress), so the
 * rail's complete/current/locked dots and the "X of N complete" line stay in
 * sync after a complete-and-continue, including in DEV preview where progress
 * lives only in sessionStorage. In production the server seeds `initialCompleted`
 * so the first paint is already correct.
 */
export function CourseSidebarLive({
  initialCompleted,
  className,
}: {
  initialCompleted: string[];
  className?: string;
}) {
  const { completed, count } = useProgress(initialCompleted);

  const modules: ModuleTreeItem[] = MODULES.map((m) => ({
    label: m.title,
    status: moduleState(m.slug, completed),
    href: `/course/${m.slug}`,
  }));

  return (
    <CourseSidebar
      completed={count}
      total={COURSE_TOTAL_LESSONS}
      modules={modules}
      className={className}
    />
  );
}
