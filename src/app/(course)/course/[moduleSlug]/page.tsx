import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonView } from "@/components/course/LessonView";
import { getModuleBySlug, MODULES } from "@/content/course";
import { getCompletedSlugs } from "@/lib/course/progress";

export const dynamic = "force-dynamic";

/** Pre-render the eight module slugs (the Introduction has its own static route). */
export function generateStaticParams() {
  return MODULES.filter((m) => !m.isIntro).map((m) => ({ moduleSlug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleSlug: string }>;
}): Promise<Metadata> {
  const { moduleSlug } = await params;
  const module = getModuleBySlug(moduleSlug);
  return {
    title: module && !module.isIntro ? module.title : "Lesson",
    robots: { index: false, follow: false },
  };
}

/**
 * /course/[moduleSlug] -- Modules 1 through 8. Data-driven from course.ts via
 * the shared LessonView. The Introduction is intentionally NOT handled here (it
 * has its own /course/introduction route), so a request for that slug 404s and
 * stays on the canonical URL.
 */
export default async function ModuleLessonPage({
  params,
}: {
  params: Promise<{ moduleSlug: string }>;
}) {
  const { moduleSlug } = await params;
  const module = getModuleBySlug(moduleSlug);
  if (!module || module.isIntro) notFound();

  const completed = await getCompletedSlugs();
  const isLast = module.orderIndex === MODULES.length - 1;

  return (
    <LessonView
      module={module}
      index={module.orderIndex}
      isLast={isLast}
      initialCompleted={[...completed]}
    />
  );
}
