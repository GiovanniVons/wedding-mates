import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { HypeLine } from "@/components/ui/HypeLine";
import { CtaBand } from "@/components/sections/CtaBand";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { JsonLd, courseSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Can My Friend Be My Celebrant? | Let's Get Wed",
  description:
    "Yes, your mate can lead your ceremony. We train them with the Blueprint course and a registered celebrant takes care of the legal paperwork. See how it works.",
  path: "/how-it-works",
  ogTitle: "How a friend leads your ceremony (and who handles the legals)",
  ogDescription:
    "Your mate leads, a registered celebrant handles the legals, the Blueprint course gets them ready. Here is exactly who does what.",
});

const STEPS = [
  {
    numeral: "01",
    title: "Choose Your Person",
    image: "/images/wedding2.jpg",
    imageAlt: "A couple choosing the friend who will lead their ceremony",
    body: "This is the easy part and the best part. You pick the person who already knows your story, the one whose voice means something to both of you. A best mate, a sibling, a parent. There is no audition and no stranger to vet.",
    split: "What you do: choose your mate and tell them the good news. What they do: say yes (most people are honoured to be asked). What we handle: getting them set up with the course and account.",
  },
  {
    numeral: "02",
    title: "They Get Trained",
    image: "/images/course.jpg",
    imageAlt: "A friend working through the Blueprint course at their own pace",
    body: "Your mate works through the Blueprint, our eight-module course, at their own pace. It walks them through interviewing you, writing your love story, structuring the ceremony, adding music and vows, and delivering it all with confidence. Around fifteen to seventeen hours of work, spread over a few weeks.",
    split: "What you do: sit for one fun interview and read a draft or two. What they do: the course, the writing, the rehearsing. What we handle: support the whole way, by email or WhatsApp, whenever they get stuck.",
  },
  {
    numeral: "03",
    title: "We Handle The Legals",
    image: "/images/celebrant-img.jpg",
    imageAlt: "A registered celebrant taking care of the legal paperwork before the day",
    body: "This is the part couples worry about, so we will be clear. A registered celebrant takes care of the legal solemnisation and the required paperwork before the day. Your marriage is legally valid; your mate does not have to touch a single form.",
    split: "What you do: provide a few details at booking. What they do: nothing on the legal side, by design. What we handle: every legal requirement, sorted before anyone arrives.",
    softLink: { label: "Who handles the legals?", href: "/faq" },
    mintPeak: true,
  },
  {
    numeral: "04",
    title: "You Get Married",
    image: "/images/wedding-img2.jpg",
    imageAlt: "A friend leading the ceremony as the couple get married",
    body: "On the day, your mate stands at the front and leads a ceremony written for you, in a voice you already love. There are laughs in the right places and a tear or two in the others. Then the cue for the kiss, and you are married.",
    split: "What you do: show up and be married. What they do: lead the moment they have been preparing for. What we handle: everything that lets them focus only on you.",
  },
];

const RESPONSIBILITIES = [
  {
    header: "The Couple",
    field: "var(--color-field-coral)",
    items: [
      "Choose your mate to lead the ceremony",
      "Sit for one relaxed interview",
      "Read a draft and share feedback",
      "Show up and get married",
    ],
  },
  {
    header: "Your Mate",
    field: "var(--color-field-marigold)",
    items: [
      "Work through the Blueprint course",
      "Interview the couple and write the ceremony",
      "Rehearse the delivery",
      "Lead the ceremony on the day",
    ],
  },
  {
    header: "We Handle",
    field: "var(--color-field-mint)",
    items: [
      "All legal paperwork and solemnisation",
      "The onboarding call and support",
      "Templates, readings and sample scripts",
      "Everything legal, sorted before the day",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={courseSchema()} />

      {/* Section 1: Intro */}
      <Section space="page-top" spaceBottom="small">
        <Container width="narrow">
          <ScrollReveal>
            <Chip variant="loud" className="mb-[var(--space-4)]">
              How It Works
            </Chip>
            <h1 style={{ margin: 0, color: "var(--color-grape)" }}>
              How A Friend Leads Your Ceremony
            </h1>
            <p
              className="text-large"
              style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-5)" }}
            >
              Yes, your friend can be the one who leads your wedding ceremony in
              Australia. Here is the honest version of how it works: your mate leads
              and delivers the day, and a registered celebrant handles the legal
              solemnisation and paperwork behind the scenes. Personal and fully valid,
              both at once.
            </p>
            <div className="mt-[var(--space-6)]">
              <Button as="a" href="/book" variant="primary" size="large">
                Book Now
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Section 2: The 4 Steps Expanded */}
      <Section space="main">
        <Container>
          <ScrollReveal className="mb-[var(--space-7)]">
            <h2 className="h2" style={{ marginTop: 0, color: "var(--color-grape)" }}>
              The Four Steps, In Full
            </h2>
          </ScrollReveal>
          <div className="flex flex-col gap-[var(--section-space-small)]">
            {STEPS.map((step, i) => {
              const imageFirst = i % 2 === 0;
              return (
                <ScrollReveal key={step.numeral} y={28}>
                  <div className="grid grid-cols-1 items-center gap-[var(--space-6)] lg:grid-cols-2">
                    <div
                      className={`relative overflow-hidden ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
                      style={{ aspectRatio: "4 / 3", borderRadius: "var(--radius-main)" }}
                    >
                      <Image
                        src={step.image}
                        alt={step.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                      <span
                        aria-hidden="true"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--font-size-hype)",
                          color: "var(--color-coral)",
                          lineHeight: 0.9,
                          display: "block",
                          marginBottom: "var(--space-2)",
                        }}
                      >
                        {step.numeral}
                      </span>
                      {step.mintPeak ? (
                        <HypeLine
                          cue="Legals Sorted"
                          cueVariant="mint"
                          segments={[
                            { text: "We handle the" },
                            { text: "legals", hit: true },
                          ]}
                          scale="section"
                          variant="light"
                          as="h3"
                        />
                      ) : (
                        <h3 className="h3" style={{ marginTop: 0, color: "var(--color-grape)" }}>
                          {step.title}
                        </h3>
                      )}
                      <p style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-4)" }}>
                        {step.body}
                      </p>
                      <p
                        style={{
                          color: "var(--color-grape-soft)",
                          fontSize: "var(--font-size-text-small)",
                          marginTop: "var(--space-3)",
                          paddingTop: "var(--space-3)",
                          borderTop: "var(--border-width-main) solid var(--color-grape-o12)",
                        }}
                      >
                        {step.split}
                      </p>
                      {step.softLink && (
                        <p style={{ marginTop: "var(--space-3)" }}>
                          <a href={step.softLink.href}>{step.softLink.label}</a>
                        </p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Section 3: Who Does What (colour-as-structure) */}
      <Section space="main">
        <Container>
          <ScrollReveal className="mb-[var(--space-6)]">
            <h2 className="h2" style={{ marginTop: 0, color: "var(--color-grape)" }}>
              Who Does What, At A Glance
            </h2>
          </ScrollReveal>
          <ScrollReveal stagger className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-3">
            {RESPONSIBILITIES.map((col) => (
              <div
                key={col.header}
                className="flex flex-col"
                style={{
                  backgroundColor: col.field,
                  borderRadius: "var(--radius-main)",
                  padding: "var(--space-6)",
                }}
              >
                <h3 className="h3" style={{ marginTop: 0, color: "var(--color-grape)" }}>
                  {col.header}
                </h3>
                <ul
                  className="flex flex-col"
                  style={{ listStyle: "none", padding: 0, margin: 0, gap: "var(--gap-list-item)", marginTop: "var(--space-2)" }}
                >
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-[var(--space-2)]"
                      style={{ color: "var(--color-grape-soft)" }}
                    >
                      <span
                        aria-hidden="true"
                        style={{ color: "var(--color-grape)", fontWeight: "var(--font-weight-heavy)", flexShrink: 0 }}
                      >
                        &middot;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ScrollReveal>
        </Container>
      </Section>

      {/* Section 4: Legality (calm, mint chip, no burst) */}
      <Section theme="tint" surface="calm" space="small">
        <Container width="narrow">
          <ScrollReveal>
            <Chip variant="mint" className="mb-[var(--space-4)]">
              Legals Sorted
            </Chip>
            <h2 className="h2" style={{ marginTop: 0, color: "var(--color-grape)" }}>
              The Legal Bit, Made Simple
            </h2>
            <div className="mt-[var(--space-5)] flex flex-col gap-[var(--space-4)]">
              <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                In Australia, only a Commonwealth-registered marriage celebrant can
                legally solemnise a marriage. That is the law, and it is a good one. It
                is also the part that stops most couples from having a friend lead the
                day.
              </p>
              <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                Wedding Mates removes that blocker. A registered celebrant handles the
                legal solemnisation and paperwork, so your marriage is completely
                valid. Your mate is free to do the part that matters most to you: lead
                a ceremony that is personal, warm, and entirely yours.
              </p>
              <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                So you never have to choose between personal and legal. You get both.
                Your person at the front, the legals quietly handled, and a wedding
                that is real in every sense.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Section 5: CTA */}
      <CtaBand
        theme="coral"
        hype={{
          cue: "Get Started",
          segments: [
            { text: "Ready to get wed your" },
            { text: "way", hit: true },
            { text: "?" },
          ],
          burst: true,
        }}
        body="One booking, and your mate gets everything they need to lead your day."
        primaryLabel="Book Now"
        primaryHref="/book"
        secondary={{ label: "See the price", href: "/pricing" }}
      />
    </>
  );
}
