import { createClient } from "@/lib/supabase/server";
import { hasRealSupabase, isDemoMode } from "@/lib/auth/preview";

/**
 * progress.ts -- SERVER-side reader for lesson_progress (migration 003).
 *
 * Returns the set of completed module slugs for the signed-in user. The
 * module_id column stores the content slug (see migration 003 comment), so the
 * value maps straight onto src/content/course.ts slugs.
 *
 * Fails soft: when Supabase is not a real project (the documented placeholder
 * host, i.e. local DEV preview) this returns an EMPTY set and never throws. In
 * that mode the dashboard and lesson surfaces hydrate progress from
 * sessionStorage on the client (see progress-client.ts), so complete-and-
 * continue and the ProgressRing stay reviewable locally without a backend.
 *
 * Production (real Supabase present) is fully server-authoritative: RLS scopes
 * the rows to auth.uid(), so a user only ever sees their own completions.
 */
export async function getCompletedSlugs(): Promise<Set<string>> {
  // Demo mode + local preview have no signed-in user; progress lives in the
  // browser (sessionStorage) instead, so skip the server read entirely.
  if (!hasRealSupabase() || isDemoMode()) return new Set();
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return new Set();

    const { data, error } = await supabase
      .from("lesson_progress")
      .select("module_id, completed")
      .eq("user_id", user.id)
      .eq("completed", true);

    if (error || !data) return new Set();
    return new Set(data.map((row) => row.module_id as string));
  } catch {
    return new Set();
  }
}
