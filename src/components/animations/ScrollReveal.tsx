"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ScrollReveal -- the marketing scroll-trigger wrapper (Framer Motion
 * whileInView, NOT GSAP, per design.md Animation System). Content fades + rises
 * once at ~25% in viewport. `stagger` reveals direct children in sequence.
 * prefers-reduced-motion: renders final state instantly, no transform, no fade.
 *
 * CRITICAL: the initial state is opacity:0 (never 0.3), so nothing flashes
 * visible before its trigger. Reduced motion sets initial = final.
 */

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger direct children instead of revealing the block as one unit. */
  stagger?: boolean;
  /** Vertical rise distance in px (default 20). */
  y?: number;
  delay?: number;
  as?: "div" | "section" | "ul" | "li";
  style?: React.CSSProperties;
}

export function ScrollReveal({
  children,
  className,
  stagger = false,
  y = 20,
  delay = 0,
  as = "div",
  style,
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (stagger) {
    const container: Variants = {
      hidden: {},
      show: {
        transition: {
          delayChildren: reduce ? 0 : delay,
          staggerChildren: reduce ? 0 : 0.1,
        },
      },
    };
    return (
      <MotionTag
        className={className}
        style={style}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={cn(className)}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduce ? 0 : 0.5, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}

/** RevealItem -- a single staggered child (use inside ScrollReveal stagger). */
export function RevealItem({
  children,
  className,
  y = 20,
  as = "div",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li";
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  const item: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  };
  return (
    <MotionTag className={className} style={style} variants={item}>
      {children}
    </MotionTag>
  );
}
