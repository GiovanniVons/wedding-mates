"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * ConfettiBurst -- the single rationed celebration beat. Flat SVG shards in
 * the real wedding-confetti palette (coral, marigold, mint, grape), fired
 * once on a payoff word. pointer-events none; reserves no layout space (it is
 * absolutely positioned and the parent section clips it). Particle count and
 * duration come from Zone 2 tokens, which prefers-reduced-motion sets to 0,
 * so the burst self-cancels with no JS branch needed.
 *
 * RATIONING is enforced by the caller: this fires at most once per page and
 * only on a genuine celebration beat (hero peak, final CTA, confirmation).
 */

type Shard = {
  id: number;
  color: string;
  angle: number;
  distance: number;
  rotation: number;
  size: number;
  shape: "rect" | "strip";
};

const PALETTE = [
  "var(--color-coral)",
  "var(--color-marigold)",
  "var(--color-mint)",
  "var(--color-grape)",
];

function readBurstTokens(): { count: number; durationMs: number } {
  if (typeof window === "undefined") return { count: 18, durationMs: 900 };
  const styles = getComputedStyle(document.documentElement);
  const count = parseInt(
    styles.getPropertyValue("--burst-particle-count").trim() || "18",
    10,
  );
  const durationRaw = styles.getPropertyValue("--burst-duration").trim() || "0.9s";
  const durationMs = durationRaw.endsWith("ms")
    ? parseFloat(durationRaw)
    : parseFloat(durationRaw) * 1000;
  return { count: Number.isNaN(count) ? 18 : count, durationMs };
}

export function ConfettiBurst({
  fire,
  className,
}: {
  /** When this flips true the burst plays once. */
  fire: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  const [tokens, setTokens] = useState({ count: 18, durationMs: 900 });

  useEffect(() => {
    if (!fire) return;
    const t = readBurstTokens();
    setTokens(t);
    if (t.count <= 0 || t.durationMs <= 0) return; // reduced-motion: no burst
    setActive(true);
    const timer = window.setTimeout(() => setActive(false), t.durationMs + 80);
    return () => window.clearTimeout(timer);
  }, [fire]);

  const shards = useMemo<Shard[]>(() => {
    const n = Math.max(0, tokens.count);
    return Array.from({ length: n }, (_, i) => ({
      id: i,
      color: PALETTE[i % PALETTE.length],
      angle: -90 + (Math.random() * 160 - 80),
      distance: 60 + Math.random() * 110,
      rotation: Math.random() * 540 - 270,
      size: 7 + Math.random() * 7,
      shape: i % 3 === 0 ? "strip" : "rect",
    }));
  }, [tokens.count]);

  if (!active) return null;

  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 0,
        height: 0,
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      {shards.map((s) => {
        const rad = (s.angle * Math.PI) / 180;
        const dx = Math.cos(rad) * s.distance;
        const dy = Math.sin(rad) * s.distance;
        return (
          <span
            key={s.id}
            style={
              {
                position: "absolute",
                left: 0,
                top: 0,
                width: `${s.size}px`,
                height: s.shape === "strip" ? `${s.size * 2.2}px` : `${s.size}px`,
                backgroundColor: s.color,
                borderRadius: s.shape === "strip" ? "1px" : "2px",
                animationName: "confetti-shard",
                animationDuration: `${tokens.durationMs}ms`,
                animationTimingFunction: "cubic-bezier(0.2, 0.7, 0.3, 1)",
                animationFillMode: "forwards",
                "--dx": `${dx}px`,
                "--dy": `${dy}px`,
                "--rot": `${s.rotation}deg`,
              } as React.CSSProperties
            }
          />
        );
      })}
      <style>{`
        @keyframes confetti-shard {
          0%   { transform: translate(0, 0) rotate(0deg) scale(0.6); opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) rotate(var(--rot)) scale(1); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-confetti-shard] { display: none !important; }
        }
      `}</style>
    </span>
  );
}
