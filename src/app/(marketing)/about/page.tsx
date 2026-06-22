import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
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

      {/* Section 1: Hero (type-as-image name beside the bleeding portrait) */}
      <Section space="page-top" spaceBottom="main" clip>
        <Container>
          <div className="grid grid-cols-1 items-center gap-[var(--space-7)] lg:grid-cols-2">
            <ScrollReveal>
              <Chip variant="loud" className="mb-[var(--space-4)]">
                The Founder
              </Chip>
              <h1 style={{ margin: 0, color: "var(--color-grape)" }}>Hi, I&rsquo;m Sarah</h1>
              <p
                className="text-large"
                style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-5)" }}
              >
                The celebrant who would rather make you a celebrant.
              </p>
            </ScrollReveal>
            <ScrollReveal y={28}>
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "4 / 5", borderRadius: "var(--radius-main)" }}
              >
                <Image
                  src="/images/sarah-wedding.jpg"
                  alt="Sarah, founder of Wedding Mates and a registered marriage celebrant, at the 2019 wedding where she married her best friend"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
                <Image
                  src="/images/sign.png"
                  alt=""
                  width={170}
                  height={126}
                  className="pointer-events-none absolute"
                  style={{
                    right: "var(--space-4)",
                    bottom: "var(--space-4)",
                    width: "clamp(110px, 20vw, 170px)",
                    height: "auto",
                  }}
                />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Section 2: The Origin */}
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

      {/* Section 3: The Feedback (with a calm pull-quote, type-as-image) */}
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

      {/* Section 4: Why The Blueprint Exists */}
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

      {/* Section 5: CTA (calm close, tint, no burst, restraint) */}
      <Section theme="tint" surface="calm" space="main">
        <Container width="narrow" className="text-center">
          <ScrollReveal>
            <h2 className="h2" style={{ marginTop: 0, color: "var(--color-grape)" }}>
              Want Your Mate To Lead?
            </h2>
            <div className="mt-[var(--space-6)] flex flex-col items-center gap-[var(--space-4)] sm:flex-row sm:justify-center">
              <Button as="a" href="/book" variant="primary" size="large">
                Book Now
              </Button>
              <a href="/contact" style={{ fontWeight: "var(--font-weight-semibold)" }}>
                Questions first? Contact me
              </a>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
