import type { Metadata } from "next";
import { Chip } from "@/components/ui/Chip";
import { SupportBlock } from "@/components/course/SupportBlock";
import { READINGS } from "@/content/course";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Readings library",
  robots: { index: false, follow: false },
};

/**
 * /course/readings -- the readings library (Module 5 resource). The 5 Canva
 * collections from course.ts, each a card with a one-line description and an
 * "Open collection" link that opens Canva in a new tab. Descriptions are the
 * approved page-copy strings, keyed by the collection title.
 */
const DESCRIPTIONS: Record<string, string> = {
  "Readings for young people":
    "Gentle, simple readings that younger guests can deliver with confidence.",
  "Song Lyrics": "Lyrics from meaningful songs, ready to read as a passage.",
  "Literary and poetic":
    "Excerpts from poetry and literature for a timeless touch.",
  "Romantic Readings":
    "Warm, heartfelt passages for the emotional heart of the day.",
  "Funny and light-hearted":
    "Readings that bring a laugh and lift the whole room.",
};

export default function ReadingsPage() {
  return (
    <main id="main" className="w-full">
      <header style={{ maxWidth: "var(--lesson-measure)" }}>
        <Chip variant="calm" className="mb-[var(--space-3)]">
          Resources
        </Chip>
        <h1 className="h1" style={{ margin: 0, color: "var(--color-grape)" }}>
          Readings to personalise your ceremony
        </h1>
        <p
          className="text-large mt-[var(--space-3)]"
          style={{ color: "var(--color-grape-soft)" }}
        >
          A reading gives the ceremony room to breathe and gives you a moment off
          the microphone. Browse these collections with your couple and pick the
          ones that sound like them.
        </p>
      </header>

      <ul
        style={{ listStyle: "none", padding: 0, margin: 0 }}
        className="mt-[var(--section-space-small)] grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-2"
      >
        {READINGS.map((r) => (
          <li key={r.title} className="h-full">
            <div
              className="card flex h-full flex-col"
              style={{ padding: "var(--space-5)" }}
            >
              <p
                style={{
                  margin: 0,
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--color-grape)",
                }}
              >
                {r.title}
              </p>
              <p
                className="mt-[var(--space-2)]"
                style={{ margin: 0, color: "var(--color-grape-soft)" }}
              >
                {DESCRIPTIONS[r.title] ?? ""}
              </p>
              <div className="mt-[var(--space-4)]">
                {r.url ? (
                  <a href={r.url} target="_blank" rel="noopener noreferrer">
                    Open collection
                  </a>
                ) : (
                  <Chip variant="calm">Coming soon</Chip>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "var(--section-space-small)" }}>
        <SupportBlock />
      </div>
    </main>
  );
}
