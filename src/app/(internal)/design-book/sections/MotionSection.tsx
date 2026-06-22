"use client";

import { useState } from "react";
import { DBSection, DBSubhead, DBPanel } from "./db-shared";
import { HypeLine } from "@/components/ui/HypeLine";
import { Button } from "@/components/ui/Button";
import { ConfettiBurst } from "@/components/animations/ConfettiBurst";
import { ProgressRing } from "@/components/ui/ProgressRing";

const CATALOG = [
  { name: "Hero / section Hype Line reveal", trigger: "Scroll into view (once) or load (hero)", spec: "3 beats: cue chip pops (pop easing), line lands (y:16→0), hit word colour-flips. ~0.9s." },
  { name: "Confetti burst", trigger: "Once per page, on a celebration peak only", spec: "18 flat shards, confetti palette, --burst-duration. Hero peak, final CTA, confirmation only." },
  { name: "Scroll reveal (support content)", trigger: "~25% in viewport, once", spec: "opacity 0→1, y 20→0, --motion-duration-base. Framer whileInView." },
  { name: "Card stagger", trigger: "Section into view", spec: "staggerChildren 0.1s (4-step, Blueprint)." },
  { name: "Primary button hover", trigger: "Hover (CSS)", spec: "bg → coral-deep, translateY(-2px), flat offset shadow, arrow slides --space-1 right." },
  { name: "Secondary button hover", trigger: "Hover (CSS)", spec: "fill-to-grape, label → page-white." },
  { name: "Card hover lift (desktop)", trigger: "Hover (CSS, ≥1024px)", spec: "translateY(-3px) + flat poster offset shadow." },
  { name: "Accordion height", trigger: "Click / keyboard", spec: "AnimatePresence height auto, --motion-duration-base. One open at a time." },
  { name: "Mobile drawer", trigger: "Hamburger / Escape", spec: "Slide from right, focus trap, --nav-menu-open-duration." },
  { name: "Running-total count-up", trigger: "Extras toggle", spec: "Figure ticks up, --motion-duration-base. Calm surface." },
  { name: "Progress ring fill", trigger: "Mount", spec: "Mint arc fills stroke-dashoffset, --motion-duration-slow." },
  { name: "Wizard step transition", trigger: "Continue / Back", spec: "Field column cross-fades + slides --space-4. Stepper updates with no extra motion." },
];

export function MotionSection() {
  const [reduced, setReduced] = useState(false);
  const [hypeKey, setHypeKey] = useState(0);
  const [ringKey, setRingKey] = useState(0);
  const [burstKey, setBurstKey] = useState(0);
  const [fire, setFire] = useState(false);

  const replayBurst = () => {
    setFire(false);
    setBurstKey((k) => k + 1);
    window.requestAnimationFrame(() => setFire(true));
  };

  return (
    <DBSection
      id="motion"
      title="Motion"
      intro="MOTION_INTENSITY 6, rationed by surface. Framer Motion for entrances, a tiny burst util for the single confetti beat, CSS for hover/focus. No GSAP scroll-story. Every reveal respects prefers-reduced-motion (collapse to instant; bursts killed)."
    >
      <div
        className="mb-[var(--space-6)] flex items-center gap-[var(--space-3)]"
        style={{ padding: "var(--space-4)", borderRadius: "var(--radius-small)", backgroundColor: "var(--color-page-tint)" }}
      >
        <label className="flex cursor-pointer items-center gap-[var(--space-2)]" style={{ color: "var(--color-grape)", fontWeight: "var(--font-weight-semibold)" }}>
          <input
            type="checkbox"
            checked={reduced}
            onChange={(e) => setReduced(e.target.checked)}
          />
          Preview prefers-reduced-motion (note)
        </label>
        <span style={{ fontSize: "var(--font-size-text-small)", color: "var(--color-grape-soft)" }}>
          {reduced
            ? "Reduced motion: lines render at once with final colours, no snap-in, particle count and duration collapse to 0. The OS setting is authoritative at runtime; this is an explainer."
            : "Full motion: speech-timed reveals and the single rationed burst play below."}
        </span>
      </div>

      <DBSubhead>Live previews</DBSubhead>
      <div className="grid grid-cols-1 gap-[var(--space-5)] lg:grid-cols-2">
        <DBPanel label="Hype Line reveal (replay)" surface="loud">
          <div className="mb-[var(--space-4)]">
            <Button variant="secondary" size="small" onClick={() => setHypeKey((k) => k + 1)}>
              Replay
            </Button>
          </div>
          <HypeLine
            key={hypeKey}
            cue="The Welcome"
            segments={[
              { text: "The music drops, and your best mate steps" },
              { text: "up", hit: true },
            ]}
            scale="section"
            variant="light"
            immediate
            burst
            as="p"
          />
        </DBPanel>

        <DBPanel label="Confetti burst (the rationed beat)" surface="loud">
          <div className="mb-[var(--space-4)]">
            <Button variant="secondary" size="small" onClick={replayBurst}>
              Fire burst
            </Button>
          </div>
          <div style={{ position: "relative", height: "160px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-hype)", color: "var(--color-coral)", textTransform: "uppercase" }}>
              Married
            </span>
            <ConfettiBurst key={burstKey} fire={fire} />
          </div>
        </DBPanel>

        <DBPanel label="Progress ring fill (replay)">
          <div className="mb-[var(--space-4)]">
            <Button variant="secondary" size="small" onClick={() => setRingKey((k) => k + 1)}>
              Replay
            </Button>
          </div>
          <div className="flex justify-center">
            <ProgressRing key={ringKey} completed={6} total={9} />
          </div>
        </DBPanel>

        <DBPanel label="Hover states (interact directly)">
          <div className="flex flex-wrap gap-[var(--space-3)]">
            <Button variant="primary">Hover me</Button>
            <Button variant="secondary">Hover me</Button>
            <div className="card card-interactive" style={{ padding: "var(--space-4)" }}>
              <span style={{ color: "var(--color-grape)", fontWeight: "var(--font-weight-semibold)" }}>Hover card (desktop)</span>
            </div>
          </div>
        </DBPanel>
      </div>

      <DBSubhead>Full catalog</DBSubhead>
      <div className="grid grid-cols-1 gap-[var(--space-3)] md:grid-cols-2">
        {CATALOG.map((m) => (
          <div key={m.name} className="card" style={{ padding: "var(--space-4)" }}>
            <p style={{ margin: 0, fontWeight: "var(--font-weight-heavy)", color: "var(--color-grape)" }}>
              {m.name}
            </p>
            <p style={{ margin: 0, marginTop: "var(--space-1)", fontSize: "var(--font-size-text-small)", color: "var(--color-coral-deep)" }}>
              {m.trigger}
            </p>
            <p style={{ margin: 0, marginTop: "var(--space-2)", fontSize: "var(--font-size-text-small)", color: "var(--color-grape-soft)" }}>
              {m.spec}
            </p>
          </div>
        ))}
      </div>
    </DBSection>
  );
}
