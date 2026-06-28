import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { hasRealSupabase, isPreviewGatingBypass, isDemoMode } from "@/lib/auth/preview";

/**
 * queries.ts -- server-only auth helpers used by the (course) gating layout and
 * the auth callback. Modelled on the Portal's getAuthUser() pattern.
 *
 * Both helpers fail soft: when Supabase is not configured (no real project) they
 * return null rather than throwing, so the build and local preview never crash.
 * The gating layer combines these with the preview bypass to decide what to
 * render; production behaviour (real Supabase present) is fully enforced.
 */

/** The signed-in auth user, or null when unauthenticated / Supabase absent. */
export async function getAuthUser(): Promise<User | null> {
  if (!hasRealSupabase()) return null;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user ?? null;
  } catch {
    return null;
  }
}

export type CourseAccessState = "active" | "locked" | "preview";

/**
 * getCourseAccess -- the gate query. Returns:
 *   - "preview" when the DEV preview bypass is active (no real Supabase yet),
 *     so the gated shells can be previewed locally.
 *   - "active"  when the caller has a course_access row with status = 'active'
 *     (this calls the has_course_access() RPC, which also returns true for the
 *     row's owner; admins additionally pass via the layout's is_admin check).
 *   - "locked"  otherwise.
 */
export async function getCourseAccess(): Promise<CourseAccessState> {
  if (isPreviewGatingBypass() || isDemoMode()) return "preview";
  if (!hasRealSupabase()) return "locked";

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("has_course_access");
    if (error) return "locked";
    return data === true ? "active" : "locked";
  } catch {
    return "locked";
  }
}

/** The caller's profile row (first name etc), or null. */
export interface CourseProfile {
  id: string;
  fullName: string | null;
  email: string | null;
}

export async function getCourseProfile(
  userId: string,
): Promise<CourseProfile | null> {
  if (!hasRealSupabase()) return null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .eq("id", userId)
      .single();
    if (!data) return null;
    return { id: data.id, fullName: data.full_name, email: data.email };
  } catch {
    return null;
  }
}
