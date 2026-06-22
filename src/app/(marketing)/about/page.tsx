import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { HypeLine } from "@/components/ui/HypeLine";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { JsonLd, personSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Meet Sarah, Our Founder | Let's Get Wed",
  description:
    "Sarah became a registered celebrant over 300 hours of study to marry her own best friend in 2019, then built the Blueprint so more mates could do the same.",
  path: "/about",
  ogTitle: "Meet Sarah, the celebrant who built the Blueprint",
  ogDescription:
    "Sarah trained 300+ hours to marry her best friend in 2019. Then she turned that coaching into the course that gets your mate ready.",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema()} />

      {/*
        MOMENT 1 -- the poster lockup hero (LOUD, no burst).
        Type-as-image "SARAH" in a flat grape field, the real portrait bleeding
        the right edge as a flat block, the sign.png overprint straddling the
        seam between photo and field, the cue chip overprinting the top of the
        name, and a 2019 poster numeral watermark anchoring the origin year.
        Loudness comes from scale + flat colour + overprint, never motion.
        (design.md About hero "type-as-image name beside the bleeding portrait";
        Color Tokens Zone 3a grape inversion; Editorial detail layer poster
        numeral + overprint.)
      */}
      <Section space="page-top" spaceBottom="main" clip>
        <Container>
          <div className="grid grid-cols-1 items-stretch gap-[var(--space-6)] lg:grid-cols-[55fr_45fr]">
            {/* Type column: a flat grape field, name set as type-as-image. */}
            <div
              data-theme="grape"
              data-surface="loud"
              className="relative isolate flex flex-col justify-center overflow-clip"
              style={{
                backgroundColor: "var(--color-grape)",
                borderRadius: "var(--radius-main)",
                padding: "var(--space-7)",
                minHeight: "clamp(20rem, 48vw, 32rem)",
              }}
            >
              {/* 2019 poster-numeral watermark (the origin-year stamp). */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute select-none"
                style={{
                  right: "calc(var(--space-4) * -1)",
                  bottom: "calc(var(--space-5) * -1)",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(7rem, 20vw, 14rem)",
                  lineHeight: 0.8,
                  color: "var(--color-marigold)",
                  opacity: 0.16,
                  zIndex: 0,
                }}
              >
                2019
              </span>

              {/* Cue chip overprinting the top of the name + the name itself. */}
              <div className="relative z-10">
                <Chip
                  variant="loud"
                  className="relative z-20"
                  style={{
                    marginBottom: "calc(var(--space-3) * -1)",
                    marginLeft: "var(--space-1)",
                  }}
                >
                  The Founder
                </Chip>
                <h1
                  className="hype-hero"
                  style={{
                    margin: 0,
                    color: "var(--color-page)",
                    // Bleed the left gutter on desktop so the type runs to the edge.
                    marginLeft: "calc(var(--space-5) * -1)",
                  }}
                >
                  Hi, I&rsquo;m
                  <br />
                  Sarah
                </h1>
                <p
                  className="text-large"
                  style={{
                    color: "var(--color-page-on-grape-o70)",
                    marginTop: "var(--space-5)",
                    maxWidth: "34ch",
                  }}
                >
                  The celebrant who would rather make you a celebrant.
                </p>
              </div>
            </div>

            {/* Portrait column: bleeds the right edge as a flat block, sign.png
                overprints the seam between the photo and the grape field. */}
            <ScrollReveal y={28} className="relative">
              <div
                className="relative h-full overflow-hidden"
                style={{
                  aspectRatio: "4 / 5",
                  borderRadius: "var(--radius-main)",
                }}
              >
                <Image
                  src="/images/sarah-wedding.jpg"
                  alt="Sarah, founder of Wedding Mates and a registered marriage celebrant, at the 2019 wedding where she married her best friend"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              {/* Signature overprint straddles the portrait's bottom-left corner
                  and crosses back toward the grape field (the risograph
                  overprint seam), z-10 over both layers. */}
              <Image
                src="/images/sign.png"
                alt=""
                width={180}
                height={133}
                className="pointer-events-none absolute z-10"
                style={{
                  left: "calc(var(--space-5) * -1)",
                  bottom: "calc(var(--space-4) * -1)",
                  width: "clamp(120px, 22vw, 190px)",
                  height: "auto",
                }}
              />
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* The Origin (CALM -- the long story reads, unchanged register) */}
      <Section space="small">
        <Container width="narrow">
          <ScrollReveal>
            <h2 className="h2" style={{ marginTop: 0, color: "var(--color-grape)" }}>
              Why I Became A Celebrant
            </h2>
            <div className="mt-[var(--space-5)] flex flex-col gap-[var(--space-4)]">
              <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                In 2019, my best friend asked me to marry her. Not as a guest, not as a
                bridesmaid. She wanted me to be the one standing at the front, leading
                the ceremony. There was just one problem: in Australia, that takes a
                registered celebrant.
              </p>
              <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                So I became one. I am a Commonwealth-registered marriage celebrant, and
                I put in over 300 hours of study to get there. It cost time and money,
                and it was worth every minute. Standing up at her wedding and leading
                her ceremony was the proudest moment of my working life.
              </p>
              <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                Because I was not a stranger reading a script. I knew their story. I
                knew the jokes that would land and the moments that would make the room
                go quiet. The ceremony felt like it belonged to them, because it did.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/*
        MOMENT 2 -- the "300+ hours" credential stamp (CALM-CRAFTED).
        A poster-numeral stat block on a flat tint field, sitting between the
        origin and the feedback as the page's one structural rhythm event across
        the reading folds. Grape numeral on tint (15.6:1). Reuses the StepCard
        poster-numeral treatment for cross-page consistency. No motion beyond the
        standard ScrollReveal; no chip, no accent-as-text beyond the numeral.
      */}
      <Section theme="tint" surface="calm" space="small" clip>
        <Container>
          <ScrollReveal>
            <div className="grid grid-cols-1 items-center gap-[var(--space-4)] sm:grid-cols-[auto_1fr]">
              {/* The poster numeral, overprinting partly behind the label. */}
              <span
                aria-hidden="true"
                className="relative select-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--font-size-display)",
                  lineHeight: 0.82,
                  color: "var(--color-grape)",
                  zIndex: 0,
                }}
              >
                300+
              </span>
              <div className="relative z-10">
                <p
                  className="meta-caps"
                  style={{ color: "var(--color-grape-soft)", margin: 0 }}
                >
                  Hours of study to marry her best friend
                </p>
                <p
                  style={{
                    color: "var(--color-grape-soft)",
                    marginTop: "var(--space-3)",
                    marginBottom: 0,
                    maxWidth: "46ch",
                  }}
                >
                  Not a weekend course. Three hundred hours, because a wedding only
                  happens once and the people in the room deserve someone who did the
                  work.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* The Feedback (the existing pull-quote Hype Line; unchanged) */}
      <Section theme="tint" surface="loud" space="small">
        <Container width="narrow">
          <ScrollReveal>
            <h2 className="h2" style={{ marginTop: 0, color: "var(--color-grape)" }}>
              What Their Friends Said
            </h2>
            <p
              className="hype"
              style={{
                color: "var(--color-grape)",
                margin: 0,
                marginTop: "var(--space-5)",
                marginBottom: "var(--space-5)",
                fontSize: "var(--font-size-h1)",
              }}
            >
              The most personal ceremony they had ever{" "}
              <span className="hit">been to</span>.
            </p>
            <div className="flex flex-col gap-[var(--space-4)]">
              <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                Afterwards, people kept saying the same thing. That it was the most
                personal ceremony they had ever been to. That it did not feel like a
                formality, it felt like the heart of the day.
              </p>
              <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                And my friends were over the moon, not just with the wedding, but with
                the idea. They started asking if I could coach them to do the same
                thing for their people. That is when I realised this could be more than
                one ceremony.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Why The Blueprint Exists (CALM -- the long story reads) */}
      <Section space="small">
        <Container width="narrow">
          <ScrollReveal>
            <h2 className="h2" style={{ marginTop: 0, color: "var(--color-grape)" }}>
              Why I Built The Blueprint
            </h2>
            <div className="mt-[var(--space-5)] flex flex-col gap-[var(--space-4)]">
              <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                I could not personally lead every wedding, but I could teach. So I took
                everything I had learned, the interviewing, the writing, the structure,
                the delivery, the way to calm a racing heart, and turned it into the
                Blueprint. Eight modules that get your chosen person ready.
              </p>
              <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                Now any couple can have a friend led ceremony that is both deeply
                personal and fully legal. Your mate brings the love and the voice. We
                bring the craft and handle the legals. Between us, your wedding gets the
                ceremony it deserves.
              </p>
              <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                Curious about <a href="/how-it-works">the Blueprint and how it works</a>?
                That is where the four steps live.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/*
        MOMENT 3 -- the closing CTA promoted to the page's loud peak.
        A coral eruption band carrying the page's one rationed confetti burst, so
        the last beat is the loudest (and a coral band above the grape footer
        gives the page the colour cadence it was missing). The HypeLine hit word
        flips to grape on coral (4.5:1); the primary CTA flips to grape fill /
        white label; the tertiary link flips to marigold (all via Zone 4).
      */}
      <Section theme="coral" surface="loud" space="large" clip>
        <Container width="narrow" className="flex flex-col items-center text-center">
          <HypeLine
            cue="Your Turn"
            cueVariant="loud"
            segments={[
              { text: "Now make it" },
              { text: "yours", hit: true },
            ]}
            scale="section"
            variant="grape"
            align="center"
            burst
            as="h2"
            className="mb-[var(--space-5)]"
          />
          <ScrollReveal delay={0.05}>
            <p
              className="text-large"
              style={{
                color: "var(--theme-text)",
                maxWidth: "48ch",
                margin: 0,
                marginBottom: "var(--space-6)",
              }}
            >
              I trained for one wedding. Then I built the Blueprint so you would not
              have to. The next personal ceremony in the room is yours, led by the
              person who knows you best.
            </p>
          </ScrollReveal>
          <ScrollReveal
            delay={0.1}
            className="flex flex-col items-center gap-[var(--space-4)] sm:flex-row sm:justify-center"
          >
            <Button as="a" href="/book" variant="primary" size="large">
              Book Now
            </Button>
            <a href="/contact" style={{ fontWeight: "var(--font-weight-semibold)" }}>
              Questions first? Contact me
            </a>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
