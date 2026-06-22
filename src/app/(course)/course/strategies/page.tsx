import type { Metadata } from "next";
import { Chip } from "@/components/ui/Chip";
import { SupportBlock } from "@/components/course/SupportBlock";
import { PERFORMANCE_STRATEGIES } from "@/content/course";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Performance strategies",
  robots: { index: false, follow: false },
};

/**
 * /course/strategies -- the performance-and-nerves reference (Module 7 material,
 * pulled out as a standalone quick-reference). Rendered from course.ts
 * (PERFORMANCE_STRATEGIES), each technique a scannable card. Single readable
 * column; calm register; come back to it before the ceremony.
 */
export default function StrategiesPage() {
  return (
    <main id="main" className="w-full">
      <header style={{ maxWidth: "var(--lesson-measure)" }}>
        <Chip variant="calm" className="mb-[var(--space-3)]">
          Resources
        </Chip>
        <h1 className="h1" style={{ margin: 0, color: "var(--color-grape)" }}>
          Confidence for the big day
        </h1>
        <p
          className="text-large mt-[var(--space-3)]"
          style={{ color: "var(--color-grape-soft)" }}
        >
          Come back to this page before the ceremony. These are the techniques
          that calm the nerves and help you deliver with warmth, even if you have
          never spoken in front of a crowd.
        </p>
      </header>

      <ul
        style={{ listStyle: "none", padding: 0, margin: 0, maxWidth: "var(--lesson-measure)" }}
        className="mt-[var(--section-space-small)] flex flex-col gap-[var(--space-4)]"
      >
        {PERFORMANCE_STRATEGIES.map((s, i) => (
          <li key={s.title}>
            <article
              className="card"
              style={{ padding: "var(--space-5)" }}
            >
              <div className="flex items-baseline gap-[var(--space-3)]">
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--font-size-h3)",
                    color: "var(--color-coral)",
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2
                    className="h4"
                    style={{ margin: 0, color: "var(--color-grape)" }}
                  >
                    {s.title}
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      marginTop: "var(--gap-title-body)",
                      color: "var(--color-grape-soft)",
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "var(--section-space-small)" }}>
        <SupportBlock />
      </div>
    </main>
  );
}
