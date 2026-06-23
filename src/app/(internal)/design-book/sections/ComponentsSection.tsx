"use client";

import { useState } from "react";
import Image from "next/image";
import { DBSection, DBSubhead, DBPanel } from "./db-shared";
import { Button, type ButtonVariant, type ButtonSize } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { HypeLine } from "@/components/ui/HypeLine";
import {
  FeatureCard,
  StepCard,
  PricingCard,
  ModuleCard,
  LoveStoryCard,
} from "@/components/ui/Card";
import { TextField, TextareaField, SelectField, Choice } from "@/components/ui/Field";
import { Accordion } from "@/components/ui/Accordion";
import { Stepper } from "@/components/ui/Stepper";
import {
  ExtrasToggleCard,
  RunningTotalBar,
  OrderSummary,
  type Extra,
} from "@/components/ui/BookingExtras";
import { ProgressRing } from "@/components/ui/ProgressRing";
import {
  VideoSlot,
  Callout,
  DownloadCard,
  LessonShell,
  CompleteAndContinue,
  CourseSidebar,
  LockedState,
  type ModuleTreeItem,
} from "@/components/ui/CourseUI";
import { AuthShell } from "@/components/ui/AuthShell";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";

const BUTTON_VARIANTS: ButtonVariant[] = [
  "primary",
  "display",
  "secondary",
  "tertiary",
  "success",
];
const BUTTON_SIZES: ButtonSize[] = ["small", "medium", "large"];

const EXTRAS: Extra[] = [
  { id: "cert", name: "Printed certificate", price: 69, description: "A keepsake copy of your ceremony certificate, posted to you." },
  { id: "attend", name: "Celebrant in attendance", price: 299, description: "A registered celebrant on site on the day for total peace of mind." },
];

const MODULE_TREE: ModuleTreeItem[] = [
  { label: "Introduction", status: "complete", href: "#" },
  { label: "Module 1", status: "complete", href: "#" },
  { label: "Module 2", status: "current", href: "#" },
  { label: "Module 3", status: "locked" },
  { label: "Module 4", status: "locked" },
];

const FAQ_ITEMS = [
  { question: "Is a friend led wedding actually legal?", answer: "Yes. A registered celebrant takes care of the legal paperwork and requirements before the day, so your mate can lead the ceremony and you are fully, properly married." },
  { question: "Can my friend really pull this off?", answer: "They were asked because you trust them. The Blueprint course teaches them how to interview you, write your story, and deliver it with calm hands, and Sarah is one message away the whole time." },
  { question: "What does The Ceremony, Complete package include?", answer: "The full Blueprint course for your mate, a rehearsal and a script review, the legal solemnisation handled by a registered celebrant, and support from Sarah throughout. Optional extras can be added at booking." },
];

export function ComponentsSection() {
  const [checkedExtras, setCheckedExtras] = useState<Record<string, boolean>>({
    attend: true,
  });
  const selected = EXTRAS.filter((e) => checkedExtras[e.id]);
  const extrasTotal = selected.reduce((s, e) => s + e.price, 0);

  return (
    <DBSection
      id="components"
      title="Components"
      intro="Every primitive the project uses, patterns-sourced plumbing and bespoke alike. The signature Hype Line is shown over a light, a grape, and an over-photo surface; the dual register shows a loud marketing sample beside a calm wizard sample."
    >
      {/* ── BUTTONS ── */}
      <DBSubhead>Buttons · variant × size</DBSubhead>
      <div className="flex flex-col gap-[var(--space-5)]">
        {BUTTON_VARIANTS.map((variant) => (
          <div key={variant}>
            <span className="meta-caps" style={{ color: "var(--color-grape-soft)", display: "block", marginBottom: "var(--space-3)" }}>
              {variant}
            </span>
            <div className="flex flex-wrap items-center gap-[var(--space-3)]">
              {BUTTON_SIZES.map((size) => (
                <Button key={size} variant={variant} size={size}>
                  {variant} {size}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <DBSubhead>Buttons · states (primary)</DBSubhead>
      <div className="flex flex-wrap items-center gap-[var(--space-4)]">
        <div className="flex flex-col items-center gap-[var(--space-2)]">
          <Button variant="primary">Default</Button>
          <span style={{ fontSize: "var(--font-size-chip)", color: "var(--color-grape-soft)" }}>default</span>
        </div>
        <div className="flex flex-col items-center gap-[var(--space-2)]">
          <Button variant="primary" forceState="hover">Hover</Button>
          <span style={{ fontSize: "var(--font-size-chip)", color: "var(--color-grape-soft)" }}>hover</span>
        </div>
        <div className="flex flex-col items-center gap-[var(--space-2)]">
          <Button variant="primary" forceState="active">Active</Button>
          <span style={{ fontSize: "var(--font-size-chip)", color: "var(--color-grape-soft)" }}>active</span>
        </div>
        <div className="flex flex-col items-center gap-[var(--space-2)]">
          <Button variant="primary" disabled>Disabled</Button>
          <span style={{ fontSize: "var(--font-size-chip)", color: "var(--color-grape-soft)" }}>disabled</span>
        </div>
        <div className="flex flex-col items-center gap-[var(--space-2)]">
          <Button variant="primary">
            With arrow
            <span className="btn-icon" aria-hidden="true">&rarr;</span>
          </Button>
          <span style={{ fontSize: "var(--font-size-chip)", color: "var(--color-grape-soft)" }}>trailing icon</span>
        </div>
      </div>

      <DBSubhead>Buttons on dark surfaces (per-surface flip)</DBSubhead>
      <div className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-2">
        <DBPanel label="On grape (CTA stays coral, white label)" theme="grape">
          <div className="flex flex-wrap gap-[var(--space-3)]">
            <Button variant="primary">Book Now</Button>
            <Button variant="secondary">See how</Button>
            <Button variant="tertiary">Read more</Button>
          </div>
        </DBPanel>
        <DBPanel label="On coral (CTA flips to grape fill, white label)" theme="coral">
          <div className="flex flex-wrap gap-[var(--space-3)]">
            <Button variant="primary">Get Started</Button>
            <Button variant="secondary">See how</Button>
          </div>
        </DBPanel>
      </div>

      {/* ── CUE CHIP ── */}
      <DBSubhead>Cue chip (the dual-register bridge)</DBSubhead>
      <div className="flex flex-wrap items-center gap-[var(--space-3)]">
        <Chip variant="loud">The Welcome</Chip>
        <Chip variant="calm">Step 3 · Celebrant</Chip>
        <Chip variant="mint">Legals sorted</Chip>
        <DBPanel theme="grape" padded>
          <div className="flex flex-wrap gap-[var(--space-3)]">
            <Chip variant="loud">The Kiss</Chip>
            <Chip variant="calm">Lesson 4 of 9</Chip>
          </div>
        </DBPanel>
      </div>

      {/* ── SIGNATURE: HYPE LINE over light / grape / over-photo ── */}
      <DBSubhead>Signature: the Hype Line (per-surface adaptation)</DBSubhead>
      <div className="grid grid-cols-1 gap-[var(--space-5)]">
        <DBPanel label="Light surface (grape line, coral hit word, marigold chip)" surface="loud">
          <HypeLine
            cue="The Welcome"
            segments={[
              { text: "The music drops, and your best mate steps" },
              { text: "up", hit: true },
            ]}
            scale="section"
            variant="light"
            burst
            as="p"
          />
        </DBPanel>

        <DBPanel label="Grape surface (page-white line, coral hit word, burst pops on dark)" theme="grape" surface="loud">
          <HypeLine
            cue="The Kiss"
            segments={[
              { text: "And just like that, you're" },
              { text: "married", hit: true },
            ]}
            scale="section"
            variant="grape"
            burst
            as="p"
          />
        </DBPanel>

        <DBPanel label="Over-photo (line sits in a flat grape colour-block beside the photo, AA-safe)" padded={false}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div style={{ position: "relative", minHeight: "260px" }}>
              <Image
                src="/images/wedding2.jpg"
                alt="A friend leading a wedding ceremony"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              className="flex items-center"
              style={{ backgroundColor: "var(--color-page)", padding: "var(--space-6)" }}
            >
              <HypeLine
                cue="The Stranger"
                segments={[
                  { text: "A name off a list, hoping they get you" },
                  { text: "right", hit: true },
                ]}
                scale="section"
                variant="light"
                as="p"
              />
            </div>
          </div>
        </DBPanel>

        <DBPanel label="Quiet teaching object (inside a course lesson: no burst, no oversized scale)" surface="calm">
          <HypeLine
            cue="Module 7 · Example"
            cueVariant="calm"
            segments={[
              { text: "Inflection, pauses and pace make a line" },
              { text: "land", hit: true },
            ]}
            scale="section"
            variant="light"
            as="p"
          />
        </DBPanel>
      </div>

      {/* ── DUAL REGISTER side by side ── */}
      <DBSubhead>Dual register (loud marketing vs calm wizard, same family)</DBSubhead>
      <div className="grid grid-cols-1 gap-[var(--space-4)] lg:grid-cols-2">
        <DBPanel label="LOUD · marketing peak" surface="loud">
          <Chip variant="loud" className="mb-[var(--space-3)]">The Choice</Chip>
          <p className="hype" style={{ margin: 0, color: "var(--color-grape)" }}>
            Why choose a celebrant, when you could choose a <span className="hit">mate</span>?
          </p>
          <div className="mt-[var(--space-5)]">
            <Button variant="primary" size="large">Start Your Journey</Button>
          </div>
        </DBPanel>
        <DBPanel label="CALM · booking wizard step" surface="calm">
          <Chip variant="calm" className="mb-[var(--space-3)]">Step 2 · Details</Chip>
          <h3 className="h2" style={{ margin: 0, marginBottom: "var(--space-4)", color: "var(--color-grape)" }}>
            A bit about you two
          </h3>
          <div className="flex flex-col gap-[var(--space-4)]">
            <TextField label="Your full name" placeholder="Alex Taylor" />
            <Button variant="primary" size="medium">Continue</Button>
          </div>
        </DBPanel>
      </div>

      {/* ── CARDS ── */}
      <DBSubhead>Cards</DBSubhead>
      <span className="meta-caps" style={{ color: "var(--color-grape-soft)", display: "block", marginBottom: "var(--space-3)" }}>Step cards (poster numerals)</span>
      <div className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2 lg:grid-cols-4">
        <StepCard index={1} numeral="01" title="Choose your celebrant" body="Pick the person who knows you best. The one whose voice already means something to you both." iconSrc="/images/icons/camera.svg" iconAlt="" />
        <StepCard index={2} numeral="02" title="They get trained" body="Your mate works through the Blueprint at their own pace. Sarah is one message away the whole time." iconSrc="/images/icons/edit.svg" iconAlt="" />
        <StepCard index={3} numeral="03" title="We handle the legals" body="A registered celebrant takes care of the legal paperwork before the day." iconSrc="/images/icons/performance.svg" iconAlt="" />
        <StepCard index={4} numeral="04" title="A wedding to remember" body="Your mate leads a ceremony in a voice you already love. The kind people talk about for years." iconSrc="/images/icons/music.svg" iconAlt="" />
      </div>

      <span className="meta-caps" style={{ color: "var(--color-grape-soft)", display: "block", margin: "var(--space-5) 0 var(--space-3)" }}>Feature cards (one on a tinted field for overprint rhythm)</span>
      <div className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2">
        <FeatureCard iconSrc="/images/icons/camera.svg" title="Capture the love story" body="Interview the couple and pull out the moments that matter, in their own words." />
        <FeatureCard iconSrc="/images/icons/edit.svg" title="Write a ceremony that fits" body="Structure the day, mark up the script, and build the line that lands." field="mint" chipTone="mint" />
      </div>

      <span className="meta-caps" style={{ color: "var(--color-grape-soft)", display: "block", margin: "var(--space-5) 0 var(--space-3)" }}>Pricing card · Module card · Love-story card (with honest empty state)</span>
      <div className="grid grid-cols-1 gap-[var(--space-5)] lg:grid-cols-3">
        <PricingCard
          price="$1,490"
          recommended
          badge="Most couples choose this"
          heading="The Ceremony, Complete"
          tagline="The full done-with-you experience."
          inclusions={["The full Blueprint course", "A rehearsal and a script review", "Legals handled by a registered celebrant", "A ceremony in a voice you love"]}
          extrasNote="Optional extras can be added at booking."
          imageSrc="/images/wedding-mates-package.jpg"
          imageAlt="The Wedding Mates package"
        >
          <Button variant="primary" size="large" fullWidth>Book Now</Button>
        </PricingCard>
        <ModuleCard
          thumbSrc="/images/module3.jpg"
          chip="Module 3"
          title="Structuring the ceremony"
          summary="Build the running order that carries the room from welcome to kiss."
          status="current"
          estTime="Approx 45 min"
        />
        <div className="flex flex-col gap-[var(--space-4)]">
          <LoveStoryCard imageSrc="/images/kat-david-img.jpg" couple="Kat + David" />
          <LoveStoryCard couple="Kristi + Mark" />
        </div>
      </div>

      {/* ── FORM INPUTS ── */}
      <DBSubhead>Form inputs (every state)</DBSubhead>
      <div className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-2" style={{ maxWidth: "var(--container-form)" }}>
        <TextField label="Default" placeholder="Type here" />
        <TextField label="Filled" defaultValue="Alex Taylor" />
        <TextField label="With helper" helper="Used to plan your legal face-to-face meeting" placeholder="Suburb" />
        <TextField label="Error state" error="Please enter a valid email address" defaultValue="not-an-email" />
        <TextField label="Disabled" placeholder="Unavailable" disabled />
        <SelectField label="Select" defaultValue="">
          <option value="" disabled>Choose one</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </SelectField>
        <TextareaField label="Message" placeholder="A venue, a backyard, a beach, anywhere" className="md:col-span-2" />
      </div>
      <div className="mt-[var(--space-4)] flex flex-wrap gap-[var(--space-5)]">
        <Choice type="checkbox" label="We haven't chosen one yet" />
        <Choice type="checkbox" label="Checked example" defaultChecked />
        <Choice type="radio" name="db-contact" label="Email" defaultChecked />
        <Choice type="radio" name="db-contact" label="Phone" />
      </div>

      {/* ── NAVIGATION ── */}
      <DBSubhead>Navigation</DBSubhead>
      <p style={{ color: "var(--color-grape-soft)", marginBottom: "var(--space-3)" }}>
        The smart header (transparent-on-hero, solid-on-scroll, focus-trapped mobile drawer) is mounted live at the top of this page. Below: a static preview of the solid state and the drawer field colour.
      </p>
      <div className="grid grid-cols-1 gap-[var(--space-4)] lg:grid-cols-2">
        <DBPanel label="Desktop nav (solid)">
          <div className="flex items-center gap-[var(--space-5)]">
            <a href="#" className="nav-link link-plain" aria-current="page" style={{ color: "var(--color-grape)" }}>How It Works</a>
            <a href="#" className="nav-link link-plain" style={{ color: "var(--color-grape)" }}>Pricing</a>
            <a href="#" className="nav-link link-plain" style={{ color: "var(--color-grape)" }}>About</a>
            <Button variant="primary" size="small">Book Now</Button>
          </div>
        </DBPanel>
        <DBPanel label="Mobile drawer field (grape, page-white links)" theme="grape">
          <div className="flex flex-col gap-[var(--space-3)]">
            <a href="#" className="drawer-link" style={{ fontSize: "var(--font-size-h3)" }}>How It Works</a>
            <a href="#" className="drawer-link" style={{ fontSize: "var(--font-size-h3)" }}>Pricing</a>
            <a href="#" className="drawer-link" style={{ fontSize: "var(--font-size-h3)" }}>About</a>
          </div>
        </DBPanel>
      </div>

      {/* ── PERSISTENT OVERLAYS ── */}
      <DBSubhead>Persistent overlays (reserve space, invert per surface)</DBSubhead>
      <p style={{ color: "var(--color-grape-soft)", marginBottom: "var(--space-3)" }}>
        The sticky mobile CTA bar reserves its own height via a page-rendered spacer and inverts colour per the surface it scrolls over (coral with a grape label on light sections; a grape bar with a page-white label over a grape section). Shown here in both states for review.
      </p>
      <div className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-2">
        <DBPanel label="Over a light section (coral bar)" padded={false}>
          <div style={{ position: "relative", height: "var(--sticky-cta-height)" }} className="[&>div]:!static">
            <StickyCtaBar surface="light" />
          </div>
        </DBPanel>
        <DBPanel label="Over a grape section (inverts)" padded={false}>
          <div style={{ position: "relative", height: "var(--sticky-cta-height)" }} className="[&>div]:!static">
            <StickyCtaBar surface="grape" />
          </div>
        </DBPanel>
      </div>

      {/* ── SECTION / CONTAINER LAYOUT PRIMITIVES ── */}
      <DBSubhead>Section + Container (the rhythm + width primitives)</DBSubhead>
      <p style={{ color: "var(--color-grape-soft)", marginBottom: "var(--space-3)" }}>
        Section carries the data-theme inversion and the vertical rhythm token; Container centres content at a token width with the fluid site margin. A tint Section with a narrow Container:
      </p>
      <div style={{ borderRadius: "var(--radius-main)", overflow: "hidden", border: "var(--border-width-main) solid var(--color-grape-o20)" }}>
        <Section theme="tint" space="small" surface="loud">
          <Container width="narrow">
            <Chip variant="loud" className="mb-[var(--space-3)]">Tint section</Chip>
            <h3 className="h2" style={{ margin: 0, color: "var(--color-grape)" }}>
              A tint band, narrow container
            </h3>
            <p style={{ color: "var(--color-grape-soft)", marginTop: "var(--space-3)" }}>
              Section sets data-theme=&ldquo;tint&rdquo; and the vertical rhythm; Container holds the measure at --container-narrow with the fluid --site-margin gutter.
            </p>
          </Container>
        </Section>
      </div>

      {/* ── ACCORDION ── */}
      <DBSubhead>Accordion (FAQ, one open at a time)</DBSubhead>
      <div style={{ maxWidth: "var(--container-narrow)" }}>
        <Accordion items={FAQ_ITEMS} />
      </div>

      {/* ── BOOKING COMPONENTS ── */}
      <DBSubhead>Booking · stepper, extras, totals (calm register)</DBSubhead>
      <DBPanel label="Step indicator (current = Extras)" surface="calm">
        <Stepper current={5} />
      </DBPanel>
      <div className="mt-[var(--space-5)] grid grid-cols-1 gap-[var(--space-5)] lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-[var(--space-4)]">
          {EXTRAS.map((e) => (
            <ExtrasToggleCard
              key={e.id}
              extra={e}
              checked={!!checkedExtras[e.id]}
              onToggle={(id, next) => setCheckedExtras((p) => ({ ...p, [id]: next }))}
            />
          ))}
        </div>
        <div className="flex flex-col gap-[var(--space-4)]">
          <RunningTotalBar base={1490} extrasTotal={extrasTotal} variant="rail" />
          <OrderSummary base={1490} baseLabel="The Ceremony, Complete" selected={selected} gstNote="GST treatment to be confirmed by the client (inclusive vs exclusive)." />
        </div>
      </div>
      <span className="meta-caps" style={{ color: "var(--color-grape-soft)", display: "block", margin: "var(--space-5) 0 var(--space-3)" }}>
        Mobile running-total bar (reserves its own height; figure ticks up on toggle)
      </span>
      <div style={{ position: "relative", height: "var(--total-bar-height)", borderRadius: "var(--radius-small)", overflow: "hidden", border: "var(--border-width-main) solid var(--color-grape-o20)" }}>
        <div style={{ position: "absolute", inset: 0 }} className="[&>div]:!static [&>div]:!block">
          <div data-theme="grape" style={{ minHeight: "var(--total-bar-height)", backgroundColor: "var(--total-bar-bg)", color: "var(--total-bar-text)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)", paddingInline: "var(--site-margin)" }}>
            <span style={{ fontSize: "var(--font-size-text-small)", color: "var(--total-bar-text)" }}>
              Base $1,490 {extrasTotal > 0 ? `+ extras $${extrasTotal}` : ""}
            </span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--font-size-h3)", color: "var(--total-bar-accent)", lineHeight: 1 }}>
              ${1490 + extrasTotal}
            </span>
          </div>
        </div>
      </div>

      <DBSubhead>Booking · confirmation beat (the one earned eruption)</DBSubhead>
      <DBPanel label="Step 7 · THE KISS Hype Line + the single flow burst" theme="coral" surface="loud">
        <HypeLine
          cue="The Kiss"
          cueVariant="loud"
          segments={[
            { text: "And just like that, you're" },
            { text: "married", hit: true },
          ]}
          scale="section"
          variant="grape"
          align="center"
          burst
          as="p"
        />
      </DBPanel>

      {/* ── COURSE COMPONENTS ── */}
      <DBSubhead>Course · lesson shell, video slot, downloads, progress, complete-and-continue</DBSubhead>
      <div className="grid grid-cols-1 gap-[var(--space-5)] lg:grid-cols-[280px_1fr]">
        <DBPanel label="Course sidebar (persistent rail)" padded={false}>
          <div style={{ height: "560px" }}>
            <CourseSidebar completed={2} total={9} modules={MODULE_TREE} />
          </div>
        </DBPanel>
        <DBPanel label="Lesson reading column" surface="calm">
          <LessonShell moduleLabel="Module 3" title="Structuring the ceremony" estTime="Approx 45 min" lessonOf="Lesson 4 of 9">
            <VideoSlot />
            <p style={{ marginTop: "var(--space-5)" }}>
              A great ceremony is built, not winged. In this lesson you will map the running order from the welcome through to the kiss, and learn where to place the beats that get a laugh and the ones that bring a tear.
            </p>
            <Callout tone="warm">This part will be fun. Take lots of notes. Too many is fine; too few will leave you stuck later.</Callout>
            <Callout tone="tip">Read the whole script out loud once before you cut a single line. You will hear what works.</Callout>
            <Callout tone="example">Welcome, story, vows, ring exchange, the legal words, the kiss. That order carries almost every ceremony.</Callout>
            <div className="mt-[var(--space-5)] flex flex-col gap-[var(--space-3)]">
              <DownloadCard name="Ceremony running-order template" href="#" meta="PDF · opens in a new tab" />
              <DownloadCard name="Vows-writing guide (Module 5)" />
            </div>
            <CompleteAndContinue />
          </LessonShell>
        </DBPanel>
      </div>

      <div className="mt-[var(--space-5)] grid grid-cols-1 items-center gap-[var(--space-5)] md:grid-cols-2">
        <DBPanel label="Progress ring (animates on mount)">
          <div className="flex justify-center">
            <ProgressRing completed={2} total={9} />
          </div>
        </DBPanel>
        <DBPanel label="Locked / paywall state" padded={false}>
          <LockedState />
        </DBPanel>
      </div>

      {/* ── AUTH SHELL ── */}
      <DBSubhead>Auth screen shell</DBSubhead>
      <DBPanel padded={false}>
        <div style={{ transform: "scale(1)", borderRadius: "var(--radius-main)", overflow: "hidden" }}>
          <div style={{ minHeight: "520px" }}>
            <AuthShell
              chip="Sign in"
              heading="Welcome back"
              footer={
                <>
                  <a href="#">Forgot password?</a>
                  <a href="#">New here? Create account</a>
                </>
              }
            >
              <TextField label="Email" type="email" placeholder="you@example.com" />
              <TextField label="Password" type="password" placeholder="••••••••" />
              <Button variant="primary" size="large" fullWidth>Sign in</Button>
            </AuthShell>
          </div>
        </div>
      </DBPanel>
    </DBSection>
  );
}
