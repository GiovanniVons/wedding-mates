"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Chip, type ChipVariant } from "./Chip";
import { ConfettiBurst } from "../animations/ConfettiBurst";

/**
 * SIGNATURE COMPONENT -- The Hype Line (bespoke, not from patterns/).
 *
 * Renders one line of the ceremony the way a confident delivery actually
 * lands: a cue chip naming the moment, the line in heavy condensed display,
 * one word "hit" in the accent colour, an optional held-beat middot, and a
 * single rationed confetti burst on the payoff. Three-beat reveal on scroll
 * into view (chip pops, line lands, hit-word colour-flips + burst fires).
 *
 * RATIONING: the caller decides where it lives (hero peak, one per major
 * section, the confirmation beat, or quiet inside a lesson). `burst` is opt-in
 * and only fires on genuine celebration peaks. It is BANNED in nav, buttons,
 * body, labels, the wizard body, and behind long-form reading.
 *
 * prefers-reduced-motion: the full line renders at once with final colours,
 * no snap-in, no burst (the burst tokens collapse to 0 in Zone 2).
 */

export type HypeLineScale = "hero" | "section";
export type HypeLineVariant = "light" | "grape" | "over-photo";

/** A segment of the line. `hit` words colour-flip on the third beat. */
export type HypeSegment = { text: string; hit?: boolean; beat?: boolean };

interface HypeLineProps {
  /** The cue chip text (e.g. "THE WELCOME"). */
  cue: string;
  cueVariant?: ChipVariant;
  /** The line, split into segments. Mark the payoff with `hit: true`. */
  segments: HypeSegment[];
  scale?: HypeLineScale;
  variant?: HypeLineVariant;
  /** Fire the single rationed burst on reveal (peaks only). */
  burst?: boolean;
  /** Play immediately on mount instead of on scroll-into-view (hero). */
  immediate?: boolean;
  className?: string;
  /** Centre the lockup (mobile / final CTA) vs left-align (hero / section). */
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3" | "p" | "div";
}

export function HypeLine({
  cue,
  cueVariant = "loud",
  segments,
  scale = "section",
  variant = "light",
  burst = false,
  immediate = false,
  align = "left",
  className,
  as = "div",
}: HypeLineProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [revealed, setRevealed] = useState(false);
  const [fireBurst, setFireBurst] = useState(false);

  const trigger = immediate || inView;

  useEffect(() => {
    if (!trigger) return;
    if (reduceMotion) {
      setRevealed(true);
      return;
    }
    // Beat 1+2 run via Framer variants below; trigger the hit-flip + burst on beat 3.
    const flipTimer = window.setTimeout(() => setRevealed(true), 520);
    const burstTimer = burst
      ? window.setTimeout(() => setFireBurst(true), 560)
      : undefined;
    return () => {
      window.clearTimeout(flipTimer);
      if (burstTimer) window.clearTimeout(burstTimer);
    };
  }, [trigger, reduceMotion, burst]);

  const lineClass = scale === "hero" ? "hype-hero" : "hype";

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        when: "beforeChildren" as const,
        staggerChildren: reduceMotion ? 0 : 0.04,
      },
    },
  };
  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.2,
        ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
      },
    },
  };
  const lineVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : 0.15 },
    },
  };

  const HeadingTag = as;

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative inline-flex max-w-full flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        variant === "over-photo" && "isolate",
        className,
      )}
      variants={containerVariants}
      initial="hidden"
      animate={trigger ? "show" : "hidden"}
    >
      {/* Cue chip overprints the top of the line (overprint per the spec). */}
      <motion.div
        variants={chipVariants}
        className={cn(
          "relative z-10",
          align === "center" ? "mb-[var(--space-3)]" : "mb-[var(--space-2)]",
        )}
        style={{ marginLeft: align === "left" ? "var(--space-1)" : undefined }}
      >
        <Chip variant={cueVariant}>{cue}</Chip>
      </motion.div>

      <motion.div variants={lineVariants} className="relative">
        <HeadingTag
          className={lineClass}
          style={{
            margin: 0,
            color: "var(--theme-heading)",
            // over-photo: sit the line in a flat grape/coral colour-block panel
            // so type never lands on a busy face (AA-safe placement).
            ...(variant === "over-photo"
              ? {
                  backgroundColor: "var(--color-grape)",
                  color: "var(--color-page)",
                  padding: "var(--space-3) var(--space-4)",
                  borderRadius: "var(--radius-main)",
                  display: "inline-block",
                }
              : {}),
          }}
        >
          {segments.map((seg, i) => {
            // The held-beat breath-mark: a deliberate pause-mark from the
            // marked-up-script concept (where the script says to hold). Set with
            // room + weight + a slight raise so it reads as placed, not a stray
            // divider dot.
            if (seg.beat) {
              return (
                <span
                  key={i}
                  aria-hidden="true"
                  style={{
                    color: "var(--theme-text-muted)",
                    marginInline: "var(--space-4)",
                    fontWeight: "var(--font-weight-bold)",
                    display: "inline-block",
                    transform: "translateY(-0.14em)",
                  }}
                >
                  &middot;
                </span>
              );
            }

            const trailingSpace =
              i < segments.length - 1 && !segments[i + 1]?.beat ? " " : "";

            // The hit word: a coral marker highlight sweeps left-to-right behind
            // the word on the third beat, like marking up a ceremony script. The
            // word keeps the line colour on top (grape on light, page-white on
            // grape), both AA-safe over coral at display scale. Reduced motion
            // renders the full mark instantly.
            if (seg.hit) {
              return (
                <Fragment key={i}>
                  <span
                    style={{
                      position: "relative",
                      display: "inline-block",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <motion.span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: "-0.06em",
                        right: "-0.06em",
                        top: "0.16em",
                        bottom: "0.12em",
                        backgroundColor: "var(--theme-heading-accent)",
                        transformOrigin: "left center",
                        borderRadius: "var(--radius-small)",
                        zIndex: 0,
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: revealed ? 1 : 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.42,
                        ease: [0.7, 0, 0.3, 1],
                      }}
                    />
                    <span style={{ position: "relative", zIndex: 1 }}>
                      {seg.text}
                    </span>
                  </span>
                  {trailingSpace}
                </Fragment>
              );
            }

            return (
              <span key={i}>
                {seg.text}
                {trailingSpace}
              </span>
            );
          })}
        </HeadingTag>
        {/* The rationed burst, clipped to the section by the parent. */}
        {burst && <ConfettiBurst fire={fireBurst} />}
      </motion.div>
    </motion.div>
  );
}
