"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface ProgressRingProps {
  completed: number;
  total: number;
  size?: number;
}

/**
 * ProgressRing -- SVG ring, mint arc fills on mount (animated stroke-dashoffset;
 * reduced-motion renders the final arc instantly). Centred Anton numeral label
 * "X of N complete". Calm register, no gamification chrome.
 */
export function ProgressRing({ completed, total, size = 140 }: ProgressRingProps) {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(reduceMotion ? completed / total : 0);

  useEffect(() => {
    if (reduceMotion) {
      setProgress(completed / total);
      return;
    }
    const id = window.requestAnimationFrame(() => setProgress(completed / total));
    return () => window.cancelAnimationFrame(id);
  }, [completed, total, reduceMotion]);

  const stroke = 10;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - progress);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${completed} of ${total} lessons complete`}
    >
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--ring-track)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--ring-fill)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: reduceMotion
              ? undefined
              : "stroke-dashoffset var(--motion-duration-slow) ease",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--font-size-h2)",
            color: "var(--ring-label)",
            lineHeight: 1,
          }}
        >
          {completed}/{total}
        </span>
        <span
          className="meta-caps"
          style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-1)" }}
        >
          Complete
        </span>
      </div>
    </div>
  );
}
