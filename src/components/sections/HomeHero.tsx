"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HypeLine } from "@/components/ui/HypeLine";

/**
 * HomeHero -- the bespoke signature opener (the loudest moment on the site).
 * Full-bleed re-treated photograph behind a grape scrim for legibility; the
 * hero Hype Line lockup (cue chip THE WELCOME, "GET WED YOUR WAY" with "WAY"
 * the coral hit word) runs its 3-beat reveal immediately on load and fires the
 * single hero confetti burst on the hit word. The CTA + subhead stagger in
 * after the line lands. A semantic <h1> sits visually-hidden for crawlers and
 * AI (the styled lockup is the display; one H1 only).
 *
 * Art direction: the display line bleeds toward the left edge; the marigold cue
 * chip overprints the top of the line; the photo bleeds full-width behind.
 * #hero-sentinel marks the fold so the sticky mobile bar reveals only after the
 * hero scrolls past.
 */
export function HomeHero() {
  const reduce = useReducedMotion();
  const ctaVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.7 + i * 0.08 },
    }),
  };

  return (
    <section
      data-theme="grape"
      data-surface="loud"
      className="relative isolate w-full overflow-clip"
      style={{
        minHeight: "min(90vh, 760px)",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {/* Hidden semantic H1 (single, for crawlers + AI; the lockup is display). */}
      <h1 className="sr-only">
        Get wed your way: a friend led wedding ceremony, legally sorted.
      </h1>

      {/* Full-bleed photograph + grape scrim. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/wedding-banner1.jpg"
          alt="A friend leading a wedding ceremony, reading from the page and looking up at the couple"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 35%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--color-grape-fill-o50) 0%, var(--color-grape-fill-o50) 45%, var(--color-grape-fill-o85) 100%)",
          }}
        />
      </div>

      <div
        className="mx-auto w-full"
        style={{
          maxWidth: "var(--container-wide)",
          paddingInline: "var(--container-padding-x)",
          paddingTop: "calc(var(--header-height) + var(--section-space-main))",
          paddingBottom: "var(--section-space-main)",
        }}
      >
        <HypeLine
          cue="The Welcome"
          segments={[
            { text: "Get wed" },
            { text: "your" },
            { text: "way", hit: true },
          ]}
          scale="hero"
          variant="grape"
          immediate
          burst
          as="p"
          className="max-w-[16ch]"
        />

        <motion.p
          custom={0}
          variants={ctaVariants}
          initial="hidden"
          animate="show"
          className="text-large"
          style={{
            color: "var(--color-page)",
            maxWidth: "46ch",
            marginTop: "var(--space-5)",
            marginBottom: 0,
          }}
        >
          Say &ldquo;I do&rdquo; with your best mate marrying you. More laughter. More
          tears. More magic.
        </motion.p>

        <motion.p
          custom={1}
          variants={ctaVariants}
          initial="hidden"
          animate="show"
          style={{
            color: "var(--color-page-on-grape-o70)",
            maxWidth: "60ch",
            marginTop: "var(--space-3)",
            marginBottom: 0,
            fontSize: "var(--font-size-text-main)",
          }}
        >
          A friend led wedding ceremony, with the legals handled. Your person leads
          the day; a registered celebrant takes care of the legal paperwork.
        </motion.p>

        <motion.div
          custom={2}
          variants={ctaVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-stretch gap-[var(--space-4)] sm:flex-row sm:items-center"
          style={{ marginTop: "var(--space-6)" }}
        >
          <Button as="a" href="/book" variant="display" size="large">
            Book Now
          </Button>
          <a
            href="/how-it-works"
            style={{
              color: "var(--color-page)",
              fontWeight: "var(--font-weight-semibold)",
              textDecorationColor: "var(--color-marigold)",
              textUnderlineOffset: "var(--link-offset)",
              textAlign: "center",
            }}
          >
            See how it works
          </a>
        </motion.div>
      </div>

      {/* Fold sentinel for the sticky-bar reveal observer. */}
      <span id="hero-sentinel" aria-hidden="true" className="absolute bottom-0 h-px w-px" />
    </section>
  );
}
