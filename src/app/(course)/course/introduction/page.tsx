import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonView } from "@/components/course/LessonView";
import { getModuleBySlug, MODULES } from "@/content/course";
import { getCompletedSlugs } from "@/lib/course/progress";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Introduction",
  robots: { index: false, follow: false },
};

/**
 * /course/introduction -- the first lesson (Module 0). Its own static route
 * (rather than living under [moduleSlug]) so it reads as the obvious starting
 * point and the URL is clean. Renders the shared LessonView from course.ts.
 */
export default async function IntroductionPage() {
  const module = getModuleBySlug("introduction");
  if (!module) notFound();

  const completed = await getCompletedSlugs();

  return (
    <LessonView
      module={module}
      index={0}
      isLast={MODULES.length === 1}
      initialCompleted={[...completed]}
    />
  );
}
