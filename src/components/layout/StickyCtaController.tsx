"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { StickyCtaBar } from "./StickyCtaBar";

/**
 * StickyCtaController -- the live wiring for the persistent mobile Book Now bar.
 * The presentational primitive (StickyCtaBar) reserves its own height and flips
 * colour per surface; this controller supplies the runtime behaviour:
 *
 *  - VISIBILITY: hidden until the hero scrolls out of view (sentinel observer),
 *    so it never competes with the hero CTA. Hidden entirely on /book, /course
 *    and auth routes (the marketing layout never wraps those, but guard anyway).
 *  - SURFACE: samples the section under the bar via elementsFromPoint and reads
 *    its nearest data-theme, flipping the bar from coral (light) to grape (dark)
 *    so the label never goes ink-on-ink over a grape/coral band.
 *  - LAYOUT CONTRACT: the bar is fixed; the spacer the layout renders reserves
 *    --sticky-cta-height at the page bottom so nothing is ever covered.
 *
 * prefers-reduced-motion is irrelevant here (the bar uses a CSS transform
 * transition that is a single slide, not a loop).
 */
export function StickyCtaController() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [surface, setSurface] = useState<"light" | "grape">("light");

  // Show the bar only once the hero (a #hero-sentinel element, or just the first
  // 70vh of scroll as a fallback) has left the viewport.
  useEffect(() => {
    const sentinel = document.getElementById("hero-sentinel");
    if (sentinel && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        ([entry]) => setVisible(!entry.isIntersecting),
        { rootMargin: "0px", threshold: 0 },
      );
      io.observe(sentinel);
      return () => io.disconnect();
    }
    // Fallback: reveal after scrolling past ~70vh.
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Decide the bar's colour scheme from the section the bar visually sits over.
  // CRITICAL: this is a GEOMETRY scan, not elementsFromPoint. We measure the
  // vertical rect of every themed band (sections + footer) and pick the one that
  // spans the line just above the bar's top edge. elementsFromPoint proved
  // fragile here: framer-motion transforms and the bar's own overlay let it read
  // the wrong element (or the bar itself, which would latch the scheme after the
  // first flip -- the "header samples itself" bug). The bar element is excluded.
  // grape AND coral bands both invert the bar to the dark scheme.
  useEffect(() => {
    if (!visible) return;
    let raf = 0;
    const sample = () => {
      const bar = document.getElementById("sticky-cta-bar");
      const barTop = bar
        ? bar.getBoundingClientRect().top
        : window.innerHeight;
      // The line we judge: 1px above the bar's top edge (the surface it touches).
      const y = barTop - 1;
      const bands = document.querySelectorAll<HTMLElement>("[data-theme]");
      let theme: "light" | "grape" = "light";
      for (const band of bands) {
        if (bar && (band === bar || bar.contains(band) || band.contains(bar))) {
          continue;
        }
        // Ignore the fixed header (top-anchored) and anything not in the flow
        // near the bottom edge.
        const r = band.getBoundingClientRect();
        if (r.top <= y && r.bottom >= y) {
          const attr = band.getAttribute("data-theme");
          theme = attr === "grape" || attr === "coral" ? "grape" : "light";
          // Do not break: a later band in document order that also spans y is
          // nested deeper / painted on top, so the last match wins.
        }
      }
      setSurface(theme);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sample);
    };
    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [visible]);

  return <StickyCtaBar surface={surface} visible={visible} />;
}
