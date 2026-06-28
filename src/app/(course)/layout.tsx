import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CourseSidebarLive } from "@/components/course/CourseSidebarLive";
import { CourseMobileNav } from "@/components/course/CourseMobileNav";
import { getAuthUser, getCourseAccess } from "@/lib/auth/queries";
import { hasRealSupabase, isDemoMode } from "@/lib/auth/preview";
import { getCompletedSlugs } from "@/lib/course/progress";
import { DemoBanner } from "@/components/course/DemoBanner";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * (course) layout -- the gating layer, modelled on the Portal (portal)/layout.
 *
 * Gate order:
 *   1. getAuthUser() -> if none, redirect /login (the middleware already does
 *      this; this is the server-side belt-and-braces).
 *   2. getCourseAccess() -> if "locked", redirect /course/locked. "active" and
 *      the DEV-only "preview" render the course shell.
 *
 * /course/locked lives in its OWN route group ((locked)), NOT under this layout,
 * so redirecting a locked visitor there never loops back through this gate.
 *
 * The chrome (left rail desktop, drawer mobile) reads the user's completed slugs
 * once on the server and seeds the live progress store, so every course page
 * shares one source of truth and the rail stays in sync after a complete-and-
 * continue. In DEV preview the server set is empty and the client hydrates from
 * sessionStorage (see progress-client.ts).
 */
export default async function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Demo mode (NEXT_PUBLIC_DEMO_MODE=on) opens the course without an account,
  // even with real Supabase. Everywhere else the gate is fully enforced.
  const demo = isDemoMode();

  if (hasRealSupabase() && !demo) {
    const user = await getAuthUser();
    if (!user) redirect("/login");
    const access = await getCourseAccess();
    if (access !== "active") redirect("/course/locked");
  }

  const completed = [...(await getCompletedSlugs())];

  return (
    <div data-surface="calm" className="min-h-screen" style={{ backgroundColor: "var(--color-page)" }}>
      {demo && <DemoBanner />}
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Mobile: sticky top bar + focus-trapped drawer (hidden on desktop). */}
        <CourseMobileNav initialCompleted={completed} />

        {/* Desktop: persistent left rail (hidden on mobile). */}
        <CourseSidebarLive
          initialCompleted={completed}
          className="hidden lg:flex"
        />

        <div
          className="flex-1"
          style={{
            paddingInline: "var(--site-margin)",
            paddingBlock: "var(--section-space-page-top)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
