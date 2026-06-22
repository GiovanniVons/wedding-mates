import { DBSection, DBSubhead } from "./db-shared";

type Surface = "Marketing" | "Booking" | "Auth" | "Course";

const SURFACE_TINT: Record<Surface, string> = {
  Marketing: "var(--color-field-coral)",
  Booking: "var(--color-field-marigold)",
  Auth: "var(--color-page-tint)",
  Course: "var(--color-field-mint)",
};

interface PageEntry {
  name: string;
  path: string;
  surface: Surface;
  conditional?: boolean;
}

const PAGES: PageEntry[] = [
  { name: "Home", path: "/", surface: "Marketing" },
  { name: "How It Works", path: "/how-it-works", surface: "Marketing" },
  { name: "Pricing", path: "/pricing", surface: "Marketing" },
  { name: "About", path: "/about", surface: "Marketing" },
  { name: "FAQ", path: "/faq", surface: "Marketing", conditional: true },
  { name: "Reviews", path: "/reviews", surface: "Marketing", conditional: true },
  { name: "Blog index", path: "/blog", surface: "Marketing", conditional: true },
  { name: "Blog post", path: "/blog/[slug]", surface: "Marketing", conditional: true },
  { name: "Contact", path: "/contact", surface: "Marketing" },
  { name: "Terms", path: "/terms", surface: "Marketing", conditional: true },
  { name: "Privacy", path: "/privacy", surface: "Marketing" },
  { name: "Booking wizard", path: "/book", surface: "Booking" },
  { name: "Confirmation", path: "/book/confirmation", surface: "Booking" },
  { name: "Login", path: "/login", surface: "Auth" },
  { name: "Register", path: "/register", surface: "Auth" },
  { name: "Forgot password", path: "/forgot-password", surface: "Auth" },
  { name: "Reset password", path: "/reset-password", surface: "Auth" },
  { name: "Course dashboard", path: "/course", surface: "Course" },
  { name: "Course: introduction", path: "/course/introduction", surface: "Course" },
  { name: "Course: lesson", path: "/course/module-1", surface: "Course" },
  { name: "Course: readings", path: "/course/readings", surface: "Course" },
  { name: "Course: strategies", path: "/course/strategies", surface: "Course" },
  { name: "Course: locked", path: "/course/locked", surface: "Course" },
];

export function PagesSection() {
  return (
    <DBSection
      id="pages"
      title="Pages"
      intro="Every route in the ux.md inventory, grouped by surface. Production pages are assembled in a later phase, so these are labelled placeholders; the colour key marks which surface register each page runs in (Marketing loud, Booking / Auth / Course calm)."
    >
      <DBSubhead>Page inventory (placeholder thumbnails)</DBSubhead>
      <div className="grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3 lg:grid-cols-4">
        {PAGES.map((p) => (
          <div
            key={p.path}
            className="card overflow-hidden"
            style={{ padding: 0 }}
          >
            <div
              className="flex items-center justify-center text-center"
              style={{
                aspectRatio: "4 / 3",
                backgroundColor: SURFACE_TINT[p.surface],
                padding: "var(--space-4)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--font-size-h3)",
                  textTransform: "uppercase",
                  color: "var(--color-grape)",
                  lineHeight: "var(--line-height-snug)",
                }}
              >
                {p.name}
              </span>
            </div>
            <div style={{ padding: "var(--space-3)" }}>
              <code style={{ fontSize: "var(--font-size-text-small)", color: "var(--color-coral-deep)" }}>
                {p.path}
              </code>
              <div className="mt-[var(--space-2)] flex items-center gap-[var(--space-2)]">
                <span
                  className="meta-caps"
                  style={{ color: "var(--color-grape-soft)" }}
                >
                  {p.surface}
                </span>
                {p.conditional && (
                  <span
                    style={{
                      fontSize: "var(--font-size-chip)",
                      fontWeight: "var(--font-weight-semibold)",
                      textTransform: "uppercase",
                      letterSpacing: "var(--letter-spacing-wide)",
                      color: "var(--color-marigold-deep)",
                    }}
                  >
                    Conditional
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </DBSection>
  );
}
