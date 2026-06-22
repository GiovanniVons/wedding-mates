import { MODULES, type CourseModule } from "@/content/course";

/**
 * sequence.ts -- the soft-sequential unlock logic, shared by the dashboard, the
 * sidebar and the lesson pages. Pure functions over the completed-slug set so
 * the same rules drive server render and client (preview) hydration.
 *
 * "Soft-sequential" means: a module is unlocked when every earlier module is
 * complete. The first module (Introduction) is always unlocked. There is no
 * hard server-side block on visiting a later lesson URL directly; the lock is a
 * UI affordance that keeps a first-timer on the intended path. The legal/access
 * gate is the (course) layout, not this.
 */

export type ModuleState = "complete" | "current" | "locked";

/** The ordered slug list (Introduction first, then Modules 1-8). */
export const MODULE_SLUGS: string[] = MODULES.map((m) => m.slug);

/** The slug that follows `slug`, or null when `slug` is the last module. */
export function nextSlug(slug: string): string | null {
  const i = MODULE_SLUGS.indexOf(slug);
  if (i === -1 || i === MODULE_SLUGS.length - 1) return null;
  return MODULE_SLUGS[i + 1];
}

/** The slug that precedes `slug`, or null when `slug` is the first module. */
export function prevSlug(slug: string): string | null {
  const i = MODULE_SLUGS.indexOf(slug);
  if (i <= 0) return null;
  return MODULE_SLUGS[i - 1];
}

/** 1-based lesson position, e.g. "Lesson 4 of 9". */
export function lessonNumber(slug: string): number {
  return MODULE_SLUGS.indexOf(slug) + 1;
}

/** True when every earlier module is complete (so this one is reachable). */
export function isUnlocked(slug: string, completed: ReadonlySet<string>): boolean {
  const i = MODULE_SLUGS.indexOf(slug);
  if (i <= 0) return true; // Introduction is always open.
  return MODULE_SLUGS.slice(0, i).every((s) => completed.has(s));
}

/** complete | current | locked for one module, given the completed set. */
export function moduleState(
  slug: string,
  completed: ReadonlySet<string>,
): ModuleState {
  if (completed.has(slug)) return "complete";
  return isUnlocked(slug, completed) ? "current" : "locked";
}

/**
 * The slug the dashboard's primary CTA should point at: the first module that
 * is unlocked but not yet complete. When everything is done, returns the last
 * module (so "Continue learning" still resolves to a real lesson).
 */
export function resumeSlug(completed: ReadonlySet<string>): string {
  const firstIncomplete = MODULES.find(
    (m) => !completed.has(m.slug) && isUnlocked(m.slug, completed),
  );
  return firstIncomplete?.slug ?? MODULE_SLUGS[MODULE_SLUGS.length - 1];
}

/** True when the learner has finished every module. */
export function allComplete(completed: ReadonlySet<string>): boolean {
  return MODULE_SLUGS.every((s) => completed.has(s));
}

/** Convenience: the modules array, re-exported so pages need one import. */
export function allModules(): CourseModule[] {
  return MODULES;
}
