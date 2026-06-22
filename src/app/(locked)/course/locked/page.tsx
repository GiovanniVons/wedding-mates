import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LockedState } from "@/components/ui/CourseUI";
import { getAuthUser, getCourseAccess } from "@/lib/auth/queries";
import { hasRealSupabase } from "@/lib/auth/preview";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your course is waiting",
  robots: { index: false, follow: false },
};

/**
 * /course/locked -- the paywall. Lives in its own (locked) route group so it is
 * NOT wrapped by the gated (course) layout (which would otherwise loop:
 * locked-user -> redirect to /course/locked -> gate -> redirect again).
 *
 * Still requires authentication (an unauthenticated visitor goes to /login). A
 * visitor who already HAS access is bounced to /course so they never see the
 * paywall. The LockedState component renders the full message + Book Now CTA.
 */
export default async function CourseLockedPage() {
  if (hasRealSupabase()) {
    const user = await getAuthUser();
    if (!user) redirect("/login");
    const access = await getCourseAccess();
    if (access === "active") redirect("/course");
  }

  return (
    <main
      id="main"
      data-surface="calm"
      className="flex min-h-screen flex-col items-center justify-center"
      style={{
        backgroundColor: "var(--color-page)",
        paddingInline: "var(--site-margin)",
        paddingBlock: "var(--section-space-main)",
      }}
    >
      <div className="w-full" style={{ maxWidth: "var(--container-narrow, 48rem)" }}>
        <LockedState />
      </div>
    </main>
  );
}
