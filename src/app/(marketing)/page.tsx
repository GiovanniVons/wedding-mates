import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { HypeLine } from "@/components/ui/HypeLine";
import { StepCard, FeatureCard, PricingCard, LoveStoryCard } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { HomeHero } from "@/components/sections/HomeHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ScrollReveal, RevealItem } from "@/components/animations/ScrollReveal";
import { CONTENT_FLAGS } from "@/lib/site";
import {
  HOME_STEPS,
  BLUEPRINT_FEATURES,
  HOME_INCLUSIONS,
  HOME_FAQ,
  LOVE_STORIES,
} from "@/content/copy";
import { getSortedPosts } from "@/content/blog";

export const metadata: Metadata = pageMetadata({
  title: "Friend Led Wedding Ceremonies | Let's Get Wed",
  description:
    "Have your best mate lead your wedding ceremony while a registered celebrant handles the legals. One package, fully sorted. Book your friend led ceremony today.",
  path: "/",
  ogTitle: "Get wed your way: married by the one who knows you best",
  ogDescription:
    "Your best mate leads the ceremony, a registered celebrant handles the legals. One $950 package, training and all. Book your friend led ceremony.",
});

export default function HomePage() {
  return (
    <>
      {/* ── Section 1: Hero (signature) ── */}
      <HomeHero />

      {/* ── Section 2: The Reframe ── */}
      <Section theme="tint" surface="loud" space="large" clip>
        <Container>
          <div className="grid grid-cols-1 items-center gap-[var(--space-6)] lg:grid-cols-[55fr_45fr]">
            <div>
              <h2 className="sr-only">
                Why choose a celebrant, when you could choose a mate?
              </h2>
              <HypeLine
                cue="The Stranger"
                cueVariant="loud"
                segments={[
                  { text: "Why choose a celebrant, when you could choose a" },
                  { text: "mate", hit: true },
                  { text: "?" },
                ]}
                scale="section"
                variant="light"
                as="p"
              />
              <ScrollReveal className="mt-[var(--space-6)] flex flex-col gap-[var(--space-4)]">
                <p className="text-large" style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                  You scroll through endless websites, check availability, and hope a
                  stranger you have never met will nail the most special day of your
                  life. Why leave the most personal moment of your wedding to chance?
                </p>
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--font-size-h2)",
                    color: "var(--color-coral)",
                    lineHeight: 1,
                  }}
                >
                  &middot;
                </span>
                <p className="text-large" style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                  Now picture a more personal option. You are standing in front of
                  everyone you love, the music fades, and your best mate steps forward.
                  Not with a generic script, but with a cheeky grin and the whole room
                  on their side.
                </p>
              </ScrollReveal>
            </div>
            {/* Image bleeds the right gutter, overprinting the tint field. */}
            <ScrollReveal y={28} className="relative">
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "4 / 5",
                  borderRadius: "var(--radius-main)",
                }}
              >
                <Image
                  src="/images/wedding2.jpg"
                  alt="A close friend at the front of a wedding, leading the ceremony for the couple"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* ── Section 3: The 4-Step Process ── */}
      <Section space="main">
        <Container>
          <ScrollReveal className="mb-[var(--space-7)] max-w-[var(--container-narrow)]">
            <Chip variant="loud" className="mb-[var(--space-3)]">
              The Process
            </Chip>
            <h2 className="h2" style={{ margin: 0, color: "var(--color-grape)" }}>
              Four Steps To A Ceremony You&rsquo;ll Relive
            </h2>
            <p style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-3)" }}>
              A great ceremony is built, not winged. Here is how it goes.
            </p>
          </ScrollReveal>
          <ScrollReveal
            stagger
            className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2 lg:grid-cols-4"
          >
            {HOME_STEPS.map((step, i) => (
              <RevealItem key={step.numeral}>
                <StepCard
                  index={i + 1}
                  numeral={step.numeral}
                  title={step.title}
                  body={step.body}
                  iconSrc={step.iconSrc}
                  iconAlt={step.iconAlt}
                />
              </RevealItem>
            ))}
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="mt-[var(--space-6)] flex justify-center">
            <Button as="a" href="/book" variant="primary" size="large">
              Start Your Journey
            </Button>
          </ScrollReveal>
        </Container>
      </Section>

      {/* ── Section 4: Legality Reassurance (calm trust beat) ── */}
      <Section theme="tint" surface="calm" space="small">
        <Container width="narrow">
          <ScrollReveal>
            <HypeLine
              cue="Legals Sorted"
              cueVariant="mint"
              segments={[
                { text: "Yes, your mate can really marry" },
                { text: "you", hit: true },
              ]}
              scale="section"
              variant="light"
              as="h2"
            />
            <div className="mt-[var(--space-6)] flex flex-col gap-[var(--space-4)]">
              <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                Two questions come up every time. Is it legal? And how will a friend
                know how to pull off an amazing ceremony? Fair questions. Here are the
                honest answers.
              </p>
              <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                The legal part is handled by us. A registered celebrant takes care of
                the legal solemnisation and paperwork before the day, so your marriage
                is fully valid. Your mate leads and delivers the ceremony itself, the
                part that makes it yours.
              </p>
              <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                And the delivery? That is exactly what the Blueprint course is for. We
                have helped friends with no public-speaking experience stand up and
                lead ceremonies that left the whole room in happy tears. Your mate does
                not need to be polished. They just need to love you, and we get them
                ready.
              </p>
              <p style={{ margin: 0 }}>
                <a href="/faq">Read the full legality answers</a>
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* ── Section 5: The Blueprint (4-feature grid) ── */}
      <Section space="large">
        <Container>
          <ScrollReveal className="mb-[var(--space-7)] max-w-[var(--container-narrow)]">
            <h2 className="sr-only">Elevate your ceremony to unforgettable</h2>
            <HypeLine
              cue="The Blueprint"
              cueVariant="loud"
              segments={[
                { text: "Elevate your ceremony to" },
                { text: "unforgettable", hit: true },
              ]}
              scale="section"
              variant="light"
              as="p"
            />
            <p style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-5)" }}>
              The Blueprint is the craft, broken into four things your mate will learn
              to do well.
            </p>
          </ScrollReveal>
          {/* Offset 2x2: second column shifts down --space-5 to break the grid. */}
          <ScrollReveal
            stagger
            className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2"
          >
            {BLUEPRINT_FEATURES.map((f, i) => (
              <RevealItem
                key={f.title}
                style={i % 2 === 1 ? { marginTop: undefined } : undefined}
                className={i % 2 === 1 ? "sm:mt-[var(--space-6)]" : undefined}
              >
                <FeatureCard
                  iconSrc={f.iconSrc}
                  iconAlt={f.iconAlt}
                  title={f.title}
                  body={f.body}
                  field={i === 1 ? "mint" : "none"}
                  chipTone={i === 1 ? "mint" : "marigold"}
                />
              </RevealItem>
            ))}
          </ScrollReveal>
        </Container>
      </Section>

      {/* ── Section 6: Pricing Teaser ── */}
      <Section space="main">
        <Container width="narrow">
          <ScrollReveal className="mb-[var(--space-6)] text-center">
            <HypeLine
              cue="The Investment"
              cueVariant="loud"
              segments={[
                { text: "The investment," },
                { text: "$950", hit: true },
                { text: ". The memories, priceless." },
              ]}
              scale="section"
              variant="light"
              align="center"
              as="h2"
            />
            <p style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-4)" }}>
              A friend led wedding ceremony for one price of $950, the Blueprint course
              and the legals included.
            </p>
          </ScrollReveal>
          <ScrollReveal y={28}>
            <PricingCard
              price="$950"
              heading="All The Good Stuff, In One Package"
              inclusions={HOME_INCLUSIONS}
              extrasNote="A few optional extras can be added at booking, no pressure."
              imageSrc="/images/wedding-mates-package.jpg"
              imageAlt="What is included in the $950 Wedding Mates package"
            >
              <div className="flex flex-col items-stretch gap-[var(--space-3)] sm:flex-row sm:items-center">
                <Button as="a" href="/book" variant="primary" size="large" fullWidth>
                  Book Now
                </Button>
              </div>
              <p
                style={{
                  marginTop: "var(--space-4)",
                  marginBottom: 0,
                  textAlign: "center",
                }}
              >
                <a href="/pricing">See the full pricing</a>
              </p>
            </PricingCard>
          </ScrollReveal>
        </Container>
      </Section>

      {/* ── Section 7: Founder Story ── */}
      <Section theme="tint" surface="loud" space="large" clip>
        <Container>
          <div className="grid grid-cols-1 items-center gap-[var(--space-7)] lg:grid-cols-2">
            <ScrollReveal y={28} className="relative">
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "4 / 5", borderRadius: "var(--radius-main)" }}
              >
                <Image
                  src="/images/sarah-wedding.jpg"
                  alt="Sarah, founder of Wedding Mates and a registered marriage celebrant, at the 2019 wedding where she married her best friend"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              {/* Signature graphic overprints the portrait bottom-right corner. */}
              <Image
                src="/images/sign.png"
                alt=""
                width={170}
                height={126}
                className="pointer-events-none absolute"
                style={{
                  right: "calc(var(--space-4) * -1)",
                  bottom: "calc(var(--space-5) * -1)",
                  width: "clamp(120px, 22vw, 180px)",
                  height: "auto",
                }}
              />
            </ScrollReveal>
            <ScrollReveal>
              <Chip variant="loud" className="mb-[var(--space-4)]">
                The Founder
              </Chip>
              <h2 className="h1" style={{ margin: 0, color: "var(--color-grape)" }}>
                Hi, I&rsquo;m Sarah
              </h2>
              <div className="mt-[var(--space-5)] flex flex-col gap-[var(--space-4)]">
                <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                  In 2019 I trained as a registered celebrant for one reason: to marry
                  my best friend. Over 300 hours of study later, I stood up at her
                  wedding and led the most personal ceremony I have ever been part of.
                  It was the proudest moment of my career.
                </p>
                <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                  Friends started asking me to coach them through doing the same for
                  their people. So I turned that coaching into the Blueprint, the
                  course your mate uses now, so any couple can be married by someone who
                  actually loves them.
                </p>
              </div>
              <div className="mt-[var(--space-5)]">
                <Button as="a" href="/about" variant="tertiary" size="medium">
                  Read more
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* ── Section 8: Featured Love Stories (CONDITIONAL on rights) ──
          Renders the 2-up gallery grid from LOVE_STORIES. Gated on BOTH the flag
          and the data being present, so the section never ships as an orphan
          heading: to surface it, paste entries into LOVE_STORIES and flip
          loveStoriesHaveRights (src/lib/site.ts). */}
      {CONTENT_FLAGS.loveStoriesHaveRights && LOVE_STORIES.length > 0 && (
        <Section space="main">
          <Container>
            <ScrollReveal className="mb-[var(--space-6)] max-w-[var(--container-narrow)]">
              <Chip variant="loud" className="mb-[var(--space-3)]">
                Love Stories
              </Chip>
              <h2 className="h2" style={{ margin: 0, color: "var(--color-grape)" }}>
                Real Couples, Real Mates
              </h2>
            </ScrollReveal>
            <ScrollReveal
              stagger
              className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2"
            >
              {LOVE_STORIES.slice(0, 2).map((s) => (
                <RevealItem key={s.slug}>
                  <LoveStoryCard
                    couple={s.couple}
                    imageSrc={s.imageSrc}
                    imageAlt={s.imageAlt}
                    href={`/love-stories/${s.slug}`}
                  />
                </RevealItem>
              ))}
            </ScrollReveal>
            <ScrollReveal className="mt-[var(--space-6)]">
              <a href="/reviews">See all the love stories</a>
            </ScrollReveal>
          </Container>
        </Section>
      )}

      {/* ── Section 9: Blog Teaser (CONDITIONAL on real posts) ──
          Renders the 3 most recent posts. Gated on BOTH the flag and posts
          existing, so it never ships as an orphan heading: to surface it, add a
          post to POSTS (src/content/blog.ts) and flip blogHasPosts. */}
      {CONTENT_FLAGS.blogHasPosts && getSortedPosts().length > 0 && (
        <Section space="main">
          <Container>
            <ScrollReveal className="mb-[var(--space-6)] max-w-[var(--container-narrow)]">
              <Chip variant="loud" className="mb-[var(--space-3)]">
                The Blog
              </Chip>
              <h2 className="h2" style={{ margin: 0, color: "var(--color-grape)" }}>
                Wedding Inspiration
              </h2>
            </ScrollReveal>
            <ScrollReveal
              stagger
              className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-3"
            >
              {getSortedPosts()
                .slice(0, 3)
                .map((post) => (
                  <RevealItem key={post.slug}>
                    <a
                      href={`/blog/${post.slug}`}
                      className="link-plain card flex h-full flex-col"
                      style={{ padding: "var(--space-5)" }}
                    >
                      <span
                        className="meta-caps"
                        style={{ color: "var(--color-grape-soft)", marginBottom: "var(--space-2)" }}
                      >
                        {new Date(post.date).toLocaleDateString("en-AU", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <h3
                        className="h3"
                        style={{ margin: 0, marginBottom: "var(--gap-title-body)", color: "var(--color-grape)" }}
                      >
                        {post.title}
                      </h3>
                      <p style={{ color: "var(--color-grape-soft)", margin: 0 }}>
                        {post.excerpt}
                      </p>
                    </a>
                  </RevealItem>
                ))}
            </ScrollReveal>
            <ScrollReveal className="mt-[var(--space-6)]">
              <a href="/blog">Read the blog</a>
            </ScrollReveal>
          </Container>
        </Section>
      )}

      {/* ── Section 10: Final CTA (the one permitted confetti eruption) ── */}
      <CtaBand
        theme="coral"
        hype={{
          cue: "The Kiss",
          segments: [
            { text: "And just like that, you're" },
            { text: "married", hit: true },
          ],
          burst: true,
        }}
        body="Picture it years from now. The laughter, the happy tears, the inside joke only your room would get. All of it led by the person who knows you best. That is the wedding waiting on the other side of one decision."
        primaryLabel="Get Started Today"
        primaryHref="/book"
      />

      {/* ── Section 11: FAQ (inline accordion, visible-only, no FAQPage here) ── */}
      <Section space="main">
        <Container width="narrow">
          <ScrollReveal className="mb-[var(--space-6)]">
            <Chip variant="loud" className="mb-[var(--space-3)]">
              FAQ
            </Chip>
            <h2 className="h2" style={{ margin: 0, color: "var(--color-grape)" }}>
              The Questions Everyone Asks First
            </h2>
          </ScrollReveal>
          <Accordion items={HOME_FAQ} />
          <p style={{ marginTop: "var(--space-5)" }}>
            <a href="/faq">More questions? Read the full FAQ</a>
          </p>
        </Container>
      </Section>
    </>
  );
}
