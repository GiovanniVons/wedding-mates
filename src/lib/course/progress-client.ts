"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * progress-client.ts -- the CLIENT progress store powering complete-and-continue
 * and the live ProgressRing.
 *
 * Two backends behind one hook:
 *   - PRODUCTION (real Supabase): writes upsert into lesson_progress via the
 *     browser client (RLS scopes to the user). The initial set is whatever the
 *     server passed in (read in progress.ts), so the first paint is correct and
 *     hydration does not flash.
 *   - DEV PREVIEW (no real Supabase, NEXT_PUBLIC_PREVIEW_GATING=off-for-preview):
 *     there is no backend, so completions persist to sessionStorage. This is a
 *     review-only fallback so the gated flow can be clicked through locally; it
 *     is intentionally per-session and never used when a real project is set.
 *
 * The "is this a real project" decision is duplicated minimally here (browser
 * side) rather than imported from the server-only preview module: this file is a
 * client module, and the only thing it needs is the public Supabase URL, which
 * is a NEXT_PUBLIC_ env var available in the browser.
 */

const STORAGE_KEY = "wm:course-progress"; // dev-preview only

/** Mirror of preview.hasRealSupabase(), browser-safe (NEXT_PUBLIC_ only). */
function browserHasRealSupabase(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  if (!url) return false;
  if (url.includes("placeholder-project.supabase.co")) return false;
  if (url.includes("your-project")) return false;
  return url.startsWith("https://") && url.includes(".supabase.co");
}

function readSessionSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

function writeSessionSlugs(slugs: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    // sessionStorage unavailable (private mode quota); preview-only, ignore.
  }
}

export interface UseProgress {
  /** Completed module slugs (reactive). */
  completed: Set<string>;
  /** Count of completed modules. */
  count: number;
  /** Mark one module complete. Resolves once persisted. */
  markComplete: (slug: string) => Promise<void>;
  /** True while the very first hydration is settling (preview only). */
  hydrating: boolean;
}

/**
 * useProgress -- reactive completed-slug store.
 *
 * @param initial slugs the server already knows are complete (empty in preview).
 */
export function useProgress(initial: string[] = []): UseProgress {
  const real = browserHasRealSupabase();
  const [completed, setCompleted] = useState<Set<string>>(
    () => new Set(initial),
  );
  const [hydrating, setHydrating] = useState<boolean>(!real);

  // DEV-PREVIEW ONLY: hydrate the set from sessionStorage on mount. In
  // production this effect is a no-op (real backend already seeded `initial`).
  useEffect(() => {
    if (real) return;
    const stored = readSessionSlugs();
    setCompleted((prev) => new Set([...prev, ...stored]));
    setHydrating(false);
  }, [real]);

  const markComplete = useCallback(
    async (slug: string) => {
      // Optimistic update so the UI advances immediately.
      setCompleted((prev) => {
        if (prev.has(slug)) return prev;
        const next = new Set(prev);
        next.add(slug);
        if (!real) writeSessionSlugs([...next]); // dev-preview persistence
        return next;
      });

      if (!real) return; // preview: sessionStorage is the whole story.

      // PRODUCTION: upsert into lesson_progress for the signed-in user.
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;
        await supabase.from("lesson_progress").upsert(
          {
            user_id: user.id,
            module_id: slug,
            completed: true,
            completed_at: new Date().toISOString(),
          },
          { onConflict: "user_id,module_id" },
        );
      } catch {
        // Network/RLS error: the optimistic UI stands; the row reconciles on
        // the next server read. Never crash the lesson over a progress write.
      }
    },
    [real],
  );

  return { completed, count: completed.size, markComplete, hydrating };
}
