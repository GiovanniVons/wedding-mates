"use client";

import { useEffect } from "react";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

/**
 * global-error.tsx -- the last-resort boundary that catches errors thrown in the
 * root layout itself. It REPLACES the root layout, so it must render its own
 * <html> and <body> and cannot rely on the marketing chrome. Kept calm, minimal,
 * and token-driven; the standard error.tsx handles the common case with full
 * chrome. Fonts and globals are loaded here so the tokens resolve.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en-AU" className={fontVariables}>
      <body>
        <main
          style={{
            minHeight: "100svh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--color-page)",
            color: "var(--color-grape)",
            paddingInline: "var(--container-padding-x)",
          }}
        >
          <div
            style={{
              maxWidth: "var(--container-read)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-6)",
            }}
          >
            <span
              className="meta-caps"
              style={{ color: "var(--color-grape-soft)", margin: 0 }}
            >
              Something went wrong
            </span>
            <h1 style={{ margin: 0, color: "var(--color-grape)" }}>
              Let us try that again.
            </h1>
            <p
              className="text-large"
              style={{ color: "var(--color-grape-soft)", margin: 0 }}
            >
              A hiccup on our end stopped the page from loading. Give it another go.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              className="btn btn-primary"
              style={{
                minHeight: "var(--btn-size-large)",
                paddingInline: "var(--btn-padding-x-lg)",
                fontSize: "var(--font-size-text-large)",
              }}
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
