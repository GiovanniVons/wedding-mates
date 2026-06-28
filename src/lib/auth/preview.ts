/**
 * preview.ts -- the DEV-ONLY, env-gated gating bypass.
 *
 * WHY THIS EXISTS
 * The real Supabase project and keys are a client decision (flagged). Until the
 * client provisions Supabase, there is no auth backend, so the gated `/course`
 * UI cannot be reached through a real login. To let us preview the gated layout
 * locally during the build, an explicit opt-in flag relaxes the gate.
 *
 * SAFETY CONTRACT (this can NEVER weaken production)
 * The bypass returns true only when BOTH conditions hold:
 *   1. NEXT_PUBLIC_PREVIEW_GATING === "off-for-preview" (an explicit opt-in that
 *      is OFF by default and only ever set in a local .env.local), AND
 *   2. no real Supabase project is configured -- the Supabase URL is missing or
 *      is the documented placeholder host.
 * The moment a real Supabase URL is present (any deployed/staging/prod build,
 * or a local build pointed at a real project), condition 2 fails and the gate
 * is fully enforced regardless of the flag.
 *
 * It is also a no-op on the server-rendered side: the `(course)/layout.tsx`
 * gate honours this same predicate, so preview mode shows the locked/dashboard
 * shells without ever issuing real Supabase calls.
 */

/** The documented placeholder host used in .env.local so `npm run build` compiles. */
const PLACEHOLDER_SUPABASE_HOST = "placeholder-project.supabase.co";

/** True when the configured Supabase URL is a real project (not the placeholder). */
export function hasRealSupabase(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  if (!url) return false;
  if (url.includes(PLACEHOLDER_SUPABASE_HOST)) return false;
  // Guard against the literal example value shipped in .env.example.
  if (url.includes("your-project")) return false;
  return url.startsWith("https://") && url.includes(".supabase.co");
}

/**
 * True when the dev preview bypass is active: the opt-in flag is set AND there
 * is no real Supabase project. Used by the middleware and the course gate.
 */
export function isPreviewGatingBypass(): boolean {
  const flag = process.env.NEXT_PUBLIC_PREVIEW_GATING === "off-for-preview";
  return flag && !hasRealSupabase();
}

/**
 * isDemoMode -- an EXPLICIT, separate opt-in that opens the gated /course as a
 * public DEMO without an account, EVEN when a real Supabase project is set.
 *
 * Unlike isPreviewGatingBypass() above, this is deliberately NOT auto-disabled
 * by a real Supabase URL: it is a conscious switch for a demo / showcase deploy
 * (or local walkthrough) so prospects and the client can experience the course
 * without going through Stripe + account creation. OFF by default.
 *
 * SAFETY: turning this on makes the course content publicly reachable without
 * payment. Intended ONLY for a demo/review deploy or local preview, NEVER the
 * live selling storefront. The course renders with a visible "Demo" banner so
 * it can't be mistaken for the real signed-in experience, stays noindex, and
 * progress is per-session (sessionStorage) rather than written to Supabase.
 */
export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "on";
}
