"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export interface AccordionItem {
  question: string;
  answer: string;
}

/**
 * Accordion -- FAQ plumbing, copy-adapted from patterns/accordion. Single
 * column, one open at a time, animated height, full keyboard support. The
 * `+`/`-` glyph rotates on open (CSS). Calm register: no burst, no Hype Line.
 * Panels stay in the DOM and are toggled via AnimatePresence height.
 */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  return (
    <div className="w-full">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const triggerId = `${baseId}-trigger-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div
            key={i}
            style={{
              borderTop: "var(--border-width-main) solid var(--theme-border)",
              borderBottom:
                i === items.length - 1
                  ? "var(--border-width-main) solid var(--theme-border)"
                  : undefined,
            }}
          >
            <h3 style={{ margin: 0 }}>
              <button
                id={triggerId}
                className="accordion-trigger flex w-full items-center justify-between gap-[var(--space-4)] text-left"
                style={{
                  paddingBlock: "var(--space-4)",
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize: "var(--font-size-h6)",
                  color: "var(--theme-heading)",
                  background: isOpen ? "var(--color-page-tint)" : "transparent",
                  paddingInline: isOpen ? "var(--space-4)" : 0,
                  transition: "background-color var(--motion-duration-fast) ease",
                }}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="accordion-glyph"
                  style={{
                    flexShrink: 0,
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--font-size-h3)",
                    lineHeight: 1,
                    color: "var(--color-coral-deep)",
                  }}
                >
                  +
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ overflow: "hidden", backgroundColor: "var(--color-page-tint)" }}
                >
                  <p
                    style={{
                      paddingInline: "var(--space-4)",
                      paddingTop: "var(--space-2)",
                      paddingBottom: "var(--space-5)",
                      color: "var(--theme-text-muted)",
                      margin: 0,
                      lineHeight: "var(--line-height-large)",
                    }}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
