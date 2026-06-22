import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * LessonBody -- renders a module's verbatim markdown body (from
 * src/content/course.ts) inside the .prose-course reading column.
 *
 * The element rhythm (heading top/bottom margins, paragraph stack, list and
 * blockquote spacing) is owned by the unlayered `.prose-course *` rules in
 * globals.css, which inherit the 2.5 rhythm tokens. That is what keeps a
 * markdown subhead from collapsing onto the paragraph above it. This component
 * just supplies the parsed tree; it sets NO inline spacing so the token rhythm
 * stays the single source of truth.
 *
 * This is a Server Component (react-markdown renders fine on the server), so the
 * lesson body ships as static HTML with no client JS cost.
 */
export function LessonBody({ markdown }: { markdown: string }) {
  return (
    <div className="prose-course" style={{ maxWidth: "var(--lesson-measure)" }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Links inside the body are real in-prose links: they keep the
          // default a:not(.btn):not(.link-plain) styling (colour + underline),
          // and any external href opens in a new tab safely.
          a: ({ href, children, ...props }) => {
            const external = !!href && /^https?:\/\//.test(href);
            return (
              <a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
