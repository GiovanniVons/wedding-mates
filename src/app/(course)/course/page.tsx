import type { Metadata } from "next";
import Link from "next/link";
import { DashboardProgress } from "@/components/course/DashboardProgress";
import { SupportBlock } from "@/components/course/SupportBlock";
import { getCompletedSlugs } from "@/lib/course/progress";
import { getAuthUser, getCourseProfile } from "@/lib/auth/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your course",
  robots: { index: false, follow: false },
};

/**
 * /course -- the dashboard. The (course) layout already enforced auth + access;
 * this surface is the mate-facing home for the Blueprint.
 *
 * Server: read the completed slugs (real Supabase) or an empty set (DEV preview,
 * where the client hydrates from sessionStorage), and resolve the first name for
 * the welcome line. The progress-driven UI (ring, continue CTA, module tree,
 * finish state) is the DashboardProgress client island so it stays live after a
 * complete-and-continue navigates back here.
 */
function firstNameFrom(fullName: string | null, email: string | null): string {
  if (fullName && fullName.trim()) return fullName.trim().split(/\s+/)[0];
  if (email) {
    const local = email.split("@")[0];
    if (local) return local.charAt(0).toUpperCase() + local.slice(1);
  }
  return "mate";
}

export default async function CourseDashboardPage() {
  const [completed, user] = await Promise.all([
    getCompletedSlugs(),
    getAuthUser(),
  ]);
  const profile = user ? await getCourseProfile(user.id) : null;
  const firstName = firstNameFrom(
    profile?.fullName ?? null,
    profile?.email ?? user?.email ?? null,
  );

  return (
    <main id="main" className="w-full">
      <DashboardProgress
        firstName={firstName}
        initialCompleted={[...completed]}
      />

      {/* Section 3 -- Resources */}
      <section style={{ marginTop: "var(--section-space-small)" }}>
        <p
          className="meta-caps"
          style={{
            color: "var(--color-grape-soft)",
            marginBottom: "var(--space-3)",
          }}
        >
          Resources
        </p>
        <ul
          style={{ listStyle: "none", padding: 0, margin: 0 }}
          className="grid grid-cols-1 gap-[var(--space-3)] sm:grid-cols-2"
        >
          <li>
            <Link
              href="/course/readings"
              className="link-plain card-interactive card flex items-center justify-between gap-[var(--space-3)]"
              style={{ padding: "var(--space-4)" }}
            >
              <span
                style={{
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--color-grape)",
                }}
              >
                Readings Library
              </span>
              <span aria-hidden="true" style={{ color: "var(--color-coral)" }}>
                &rarr;
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/course/strategies"
              className="link-plain card-interactive card flex items-center justify-between gap-[var(--space-3)]"
              style={{ padding: "var(--space-4)" }}
            >
              <span
                style={{
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--color-grape)",
                }}
              >
                Performance Strategies
              </span>
              <span aria-hidden="true" style={{ color: "var(--color-coral)" }}>
                &rarr;
              </span>
            </Link>
          </li>
        </ul>
      </section>

      {/* Section 4 -- Support */}
      <div style={{ marginTop: "var(--section-space-small)" }}>
        <SupportBlock />
      </div>
    </main>
  );
}
