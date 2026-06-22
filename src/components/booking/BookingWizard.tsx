"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Stepper, BOOKING_STEPS } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { TextField, TextareaField, Choice } from "@/components/ui/Field";
import {
  ExtrasToggleCard,
  OrderSummary,
  RunningTotalBar,
  type Extra,
} from "@/components/ui/BookingExtras";
import { BookingHeader } from "@/components/layout/BookingHeader";
import { BOOKING_COPY } from "@/content/booking";
import {
  EXTRAS,
  BASE_AMOUNT_CENTS,
  centsToDollars,
  computeTotal,
  type ExtraKey,
} from "@/lib/stripe/pricing";
import {
  celebrantStepSchema,
  detailsStepSchema,
  dateStepSchema,
} from "@/lib/booking/schema";

/* ------------------------------------------------------------------ state */

interface BookingState {
  weddingDate: string;
  fullName: string;
  partnerName: string;
  email: string;
  mobile: string;
  suburb: string;
  preferredContact: "Email" | "Phone";
  celebrantNotChosen: boolean;
  celebrantName: string;
  celebrantEmail: string;
  celebrantPhone: string;
  ceremonyLocation: string;
  extras: ExtraKey[];
}

const EMPTY: BookingState = {
  weddingDate: "",
  fullName: "",
  partnerName: "",
  email: "",
  mobile: "",
  suburb: "",
  preferredContact: "Email",
  celebrantNotChosen: false,
  celebrantName: "",
  celebrantEmail: "",
  celebrantPhone: "",
  ceremonyLocation: "",
  extras: [],
};

const STORAGE_KEY = "wm-booking-draft";
const MIN_STEP = 1;
const MAX_STEP = 6; // step 7 is the separate /book/confirmation route

/** Map an extras pricing def to the ExtrasToggleCard shape (dollar display). */
const EXTRA_CARDS: Extra[] = EXTRAS.map((e) => ({
  id: e.key,
  name: e.name,
  price: centsToDollars(e.amountCents),
  description: e.description,
}));

const BASE_DOLLARS = centsToDollars(BASE_AMOUNT_CENTS);

/** True when the wedding date is less than 4 weeks (28 days) from today. */
function isWithinFourWeeks(dateStr: string): boolean {
  if (!dateStr) return false;
  const target = new Date(dateStr);
  if (Number.isNaN(target.getTime())) return false;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const fourWeeks = new Date(now);
  fourWeeks.setDate(now.getDate() + 28);
  return target >= now && target < fourWeeks;
}

/* ------------------------------------------------------------------ wizard */

export function BookingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();

  const stepParam = parseInt(searchParams.get("step") ?? "1", 10);
  const step = Number.isNaN(stepParam)
    ? 1
    : Math.min(MAX_STEP, Math.max(MIN_STEP, stepParam));
  const canceled = searchParams.get("canceled") === "1";

  const [data, setData] = useState<BookingState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [notConfigured, setNotConfigured] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const liveRef = useRef<HTMLDivElement>(null);

  // --- Restore the draft from sessionStorage on mount ------------------------
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setData({ ...EMPTY, ...(JSON.parse(raw) as Partial<BookingState>) });
    } catch {
      // ignore malformed draft
    }
    setHydrated(true);
  }, []);

  // --- Persist on every change (shareable/recoverable per ux.md) -------------
  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // storage unavailable (private mode): the URL step still works
    }
  }, [data, hydrated]);

  const set = useCallback(
    <K extends keyof BookingState>(key: K, value: BookingState[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => {
        if (!prev[key as string]) return prev;
        const next = { ...prev };
        delete next[key as string];
        return next;
      });
    },
    [],
  );

  const goToStep = useCallback(
    (next: number) => {
      const clamped = Math.min(MAX_STEP, Math.max(MIN_STEP, next));
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", String(clamped));
      params.delete("canceled");
      router.push(`/book?${params.toString()}`, { scroll: false });
      // Move focus to the step region for keyboard + SR users.
      requestAnimationFrame(() => liveRef.current?.focus());
    },
    [router, searchParams],
  );

  const total = useMemo(() => computeTotal(data.extras), [data.extras]);
  const extrasDollars = centsToDollars(total.extrasCents);
  const totalDollars = centsToDollars(total.totalCents);

  /* --------------------------------------------------------- validation */
  const validateStep = useCallback(
    (current: number): boolean => {
      setErrors({});
      if (current === 1) {
        const r = dateStepSchema.safeParse({ weddingDate: data.weddingDate });
        if (!r.success) {
          setErrors({ weddingDate: BOOKING_COPY.step1.error });
          return false;
        }
        return true;
      }
      if (current === 2) {
        const r = detailsStepSchema.safeParse({
          fullName: data.fullName,
          partnerName: data.partnerName,
          email: data.email,
          mobile: data.mobile,
          suburb: data.suburb,
          preferredContact: data.preferredContact,
        });
        if (!r.success) {
          const flat = r.error.flatten().fieldErrors;
          const next: Record<string, string> = {};
          for (const [k, v] of Object.entries(flat)) {
            if (v && v[0]) next[k] = v[0];
          }
          setErrors(next);
          return false;
        }
        return true;
      }
      if (current === 3) {
        // Optional; only validate a provided celebrant email format.
        if (!data.celebrantNotChosen && data.celebrantEmail) {
          const r = celebrantStepSchema.safeParse({
            celebrantNotChosen: data.celebrantNotChosen,
            celebrantName: data.celebrantName,
            celebrantEmail: data.celebrantEmail,
            celebrantPhone: data.celebrantPhone,
          });
          if (!r.success) {
            setErrors({ celebrantEmail: "That email does not look quite right." });
            return false;
          }
        }
        return true;
      }
      // Steps 4, 5, 6: no required gate.
      return true;
    },
    [data],
  );

  const handleContinue = useCallback(() => {
    if (!validateStep(step)) return;
    if (step < MAX_STEP) goToStep(step + 1);
  }, [step, validateStep, goToStep]);

  const handleSkip = useCallback(() => {
    if (step < MAX_STEP) goToStep(step + 1);
  }, [step, goToStep]);

  /* --------------------------------------------------------- payment submit */
  const handlePay = useCallback(async () => {
    setSubmitError(null);
    setNotConfigured(false);
    setSubmitting(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weddingDate: data.weddingDate,
          fullName: data.fullName,
          partnerName: data.partnerName,
          email: data.email,
          mobile: data.mobile,
          suburb: data.suburb,
          preferredContact: data.preferredContact,
          celebrantNotChosen: data.celebrantNotChosen,
          celebrantName: data.celebrantNotChosen ? "" : data.celebrantName,
          celebrantEmail: data.celebrantNotChosen ? "" : data.celebrantEmail,
          celebrantPhone: data.celebrantNotChosen ? "" : data.celebrantPhone,
          ceremonyLocation: data.ceremonyLocation,
          extras: data.extras,
        }),
      });

      if (res.status === 503) {
        setNotConfigured(true);
        setSubmitting(false);
        return;
      }
      if (!res.ok) {
        setSubmitError(BOOKING_COPY.step6.errors.generic);
        setSubmitting(false);
        return;
      }
      const body = (await res.json()) as { url?: string };
      if (body.url) {
        window.location.assign(body.url); // redirect to Stripe Checkout
        return;
      }
      setSubmitError(BOOKING_COPY.step6.errors.generic);
      setSubmitting(false);
    } catch {
      setSubmitError(BOOKING_COPY.step6.errors.generic);
      setSubmitting(false);
    }
  }, [data]);

  // Guard: if a user deep-links to step 6 without the required gates, send them
  // back to the first incomplete required step.
  useEffect(() => {
    if (!hydrated) return;
    if (step >= 2 && !dateStepSchema.safeParse({ weddingDate: data.weddingDate }).success) {
      goToStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, step]);

  const showFourWeekNote = step === 1 && isWithinFourWeeks(data.weddingDate);

  const stepTransition = {
    initial: { opacity: 0, x: reduceMotion ? 0 : 16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: reduceMotion ? 0 : -16 },
    transition: { duration: reduceMotion ? 0 : 0.28 },
  };

  return (
    <div
      data-surface="calm"
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-page)" }}
    >
      <BookingHeader current={step} total={7} />

      <main
        id="main"
        style={{
          paddingBlock: "var(--section-space-main)",
          // reserve room above the mobile sticky total bar on the extras step
          paddingBottom:
            step === 5 ? "calc(var(--section-space-main) + var(--total-bar-height))" : undefined,
        }}
      >
        <Container width="form">
          <Stepper current={step} className="mb-[var(--space-7)]" />

          <div
            ref={liveRef}
            tabIndex={-1}
            aria-live="polite"
            style={{ outline: "none" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={step} {...stepTransition}>
                {step === 1 && (
                  <StepShell cue={BOOKING_COPY.step1.cue} heading={BOOKING_COPY.step1.heading}>
                    <TextField
                      type="date"
                      label={BOOKING_COPY.step1.label}
                      helper={errors.weddingDate ? undefined : BOOKING_COPY.step1.helper}
                      error={errors.weddingDate}
                      value={data.weddingDate}
                      min={new Date().toISOString().slice(0, 10)}
                      onChange={(e) => set("weddingDate", e.target.value)}
                    />
                    {/* Reserve the note's space so Continue never shifts. */}
                    <div style={{ minHeight: "var(--space-2)" }}>
                      {showFourWeekNote && (
                        <div
                          className="mt-[var(--space-4)] flex items-start gap-[var(--space-3)]"
                          style={{
                            backgroundColor: "var(--color-field-mint)",
                            border: "var(--border-width-main) solid var(--color-mint-deep)",
                            borderRadius: "var(--radius-main)",
                            padding: "var(--space-4)",
                          }}
                        >
                          <Chip variant="mint">Legals sorted</Chip>
                          <p
                            style={{
                              margin: 0,
                              color: "var(--color-grape)",
                              fontSize: "var(--font-size-text-small)",
                              lineHeight: "var(--line-height-large)",
                            }}
                          >
                            {BOOKING_COPY.step1.legalNote}
                          </p>
                        </div>
                      )}
                    </div>
                    <StepActions onContinue={handleContinue} continueLabel={BOOKING_COPY.step1.cta} />
                  </StepShell>
                )}

                {step === 2 && (
                  <StepShell cue={BOOKING_COPY.step2.cue} heading={BOOKING_COPY.step2.heading}>
                    <div className="grid gap-[var(--space-5)] md:grid-cols-2">
                      <TextField
                        label={BOOKING_COPY.step2.labels.fullName}
                        placeholder={BOOKING_COPY.step2.placeholders.fullName}
                        value={data.fullName}
                        error={errors.fullName}
                        autoComplete="name"
                        onChange={(e) => set("fullName", e.target.value)}
                      />
                      <TextField
                        label={BOOKING_COPY.step2.labels.partnerName}
                        placeholder={BOOKING_COPY.step2.placeholders.partnerName}
                        value={data.partnerName}
                        error={errors.partnerName}
                        onChange={(e) => set("partnerName", e.target.value)}
                      />
                      <TextField
                        type="email"
                        label={BOOKING_COPY.step2.labels.email}
                        placeholder={BOOKING_COPY.step2.placeholders.email}
                        value={data.email}
                        error={errors.email}
                        autoComplete="email"
                        onChange={(e) => set("email", e.target.value)}
                      />
                      <TextField
                        type="tel"
                        label={BOOKING_COPY.step2.labels.mobile}
                        placeholder={BOOKING_COPY.step2.placeholders.mobile}
                        value={data.mobile}
                        error={errors.mobile}
                        autoComplete="tel"
                        onChange={(e) => set("mobile", e.target.value)}
                      />
                    </div>
                    <div className="mt-[var(--space-5)]">
                      <TextField
                        label={BOOKING_COPY.step2.labels.suburb}
                        helper={errors.suburb ? undefined : BOOKING_COPY.step2.suburbHelper}
                        error={errors.suburb}
                        value={data.suburb}
                        autoComplete="address-level2"
                        onChange={(e) => set("suburb", e.target.value)}
                      />
                    </div>
                    <fieldset className="mt-[var(--space-5)]" style={{ border: "none", margin: 0, padding: 0 }}>
                      <legend
                        className="mb-[var(--space-3)]"
                        style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: "var(--font-weight-bold)",
                          fontSize: "var(--font-size-text-small)",
                          color: "var(--color-grape)",
                        }}
                      >
                        {BOOKING_COPY.step2.labels.preferredContact}
                      </legend>
                      <div className="flex gap-[var(--space-5)]">
                        <Choice
                          type="radio"
                          name="preferredContact"
                          label="Email"
                          checked={data.preferredContact === "Email"}
                          onChange={() => set("preferredContact", "Email")}
                        />
                        <Choice
                          type="radio"
                          name="preferredContact"
                          label="Phone"
                          checked={data.preferredContact === "Phone"}
                          onChange={() => set("preferredContact", "Phone")}
                        />
                      </div>
                    </fieldset>
                    <StepActions
                      onBack={() => goToStep(1)}
                      onContinue={handleContinue}
                      continueLabel={BOOKING_COPY.step2.cta}
                    />
                  </StepShell>
                )}

                {step === 3 && (
                  <StepShell
                    cue={BOOKING_COPY.step3.cue}
                    heading={BOOKING_COPY.step3.heading}
                    optional
                    helper={BOOKING_COPY.step3.helper}
                  >
                    <Choice
                      type="checkbox"
                      label={BOOKING_COPY.step3.notChosen}
                      checked={data.celebrantNotChosen}
                      onChange={(e) => set("celebrantNotChosen", e.target.checked)}
                      className="mb-[var(--space-5)]"
                    />
                    {!data.celebrantNotChosen && (
                      <div className="flex flex-col gap-[var(--space-5)]">
                        <TextField
                          label={BOOKING_COPY.step3.labels.name}
                          placeholder={BOOKING_COPY.step3.placeholders.name}
                          optional
                          value={data.celebrantName}
                          onChange={(e) => set("celebrantName", e.target.value)}
                        />
                        <TextField
                          type="email"
                          label={BOOKING_COPY.step3.labels.email}
                          placeholder={BOOKING_COPY.step3.placeholders.email}
                          optional
                          error={errors.celebrantEmail}
                          value={data.celebrantEmail}
                          onChange={(e) => set("celebrantEmail", e.target.value)}
                        />
                        <TextField
                          type="tel"
                          label={BOOKING_COPY.step3.labels.phone}
                          placeholder={BOOKING_COPY.step3.placeholders.phone}
                          optional
                          value={data.celebrantPhone}
                          onChange={(e) => set("celebrantPhone", e.target.value)}
                        />
                      </div>
                    )}
                    <StepActions
                      onBack={() => goToStep(2)}
                      onContinue={handleContinue}
                      continueLabel={BOOKING_COPY.step3.cta}
                      onSkip={handleSkip}
                      skipLabel={BOOKING_COPY.step3.skip}
                    />
                  </StepShell>
                )}

                {step === 4 && (
                  <StepShell
                    cue={BOOKING_COPY.step4.cue}
                    heading={BOOKING_COPY.step4.heading}
                    optional
                  >
                    <TextareaField
                      label={BOOKING_COPY.step4.label}
                      helper={BOOKING_COPY.step4.helper}
                      optional
                      value={data.ceremonyLocation}
                      onChange={(e) => set("ceremonyLocation", e.target.value)}
                    />
                    <StepActions
                      onBack={() => goToStep(3)}
                      onContinue={handleContinue}
                      continueLabel={BOOKING_COPY.step4.cta}
                      onSkip={handleSkip}
                      skipLabel={BOOKING_COPY.step4.skip}
                    />
                  </StepShell>
                )}

                {step === 5 && (
                  <StepShell cue={BOOKING_COPY.step5.cue} heading={BOOKING_COPY.step5.heading} helper={BOOKING_COPY.step5.intro}>
                    <div className="grid gap-[var(--space-4)] md:grid-cols-2">
                      {EXTRA_CARDS.map((extra) => (
                        <ExtrasToggleCard
                          key={extra.id}
                          extra={extra}
                          checked={data.extras.includes(extra.id as ExtraKey)}
                          onToggle={(id, next) => {
                            const key = id as ExtraKey;
                            set(
                              "extras",
                              next
                                ? [...data.extras, key]
                                : data.extras.filter((k) => k !== key),
                            );
                          }}
                        />
                      ))}
                    </div>
                    <p
                      className="mt-[var(--space-5)]"
                      aria-live="polite"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--color-grape)",
                      }}
                    >
                      Base ${BASE_DOLLARS}
                      {extrasDollars > 0 ? ` + extras $${extrasDollars}` : ""} = ${totalDollars}
                    </p>
                    <StepActions
                      onBack={() => goToStep(4)}
                      onContinue={handleContinue}
                      continueLabel={BOOKING_COPY.step5.cta}
                    />
                  </StepShell>
                )}

                {step === 6 && (
                  <StepShell cue={BOOKING_COPY.step6.cue} heading={BOOKING_COPY.step6.heading}>
                    {canceled && (
                      <p
                        role="status"
                        className="mb-[var(--space-4)]"
                        style={{
                          color: "var(--color-grape-soft)",
                          fontSize: "var(--font-size-text-small)",
                        }}
                      >
                        No charge was made. Your details are saved, finish whenever you're ready.
                      </p>
                    )}
                    <OrderSummary
                      base={BASE_DOLLARS}
                      selected={EXTRA_CARDS.filter((e) =>
                        data.extras.includes(e.id as ExtraKey),
                      )}
                      gstNote={BOOKING_COPY.step6.gstNote}
                    />

                    {notConfigured && (
                      <div
                        role="status"
                        className="mt-[var(--space-5)]"
                        style={{
                          backgroundColor: "var(--color-page-tint)",
                          border: "var(--border-width-main) solid var(--color-grape-o40)",
                          borderRadius: "var(--radius-main)",
                          padding: "var(--space-4)",
                          color: "var(--color-grape)",
                          fontSize: "var(--font-size-text-small)",
                          lineHeight: "var(--line-height-large)",
                        }}
                      >
                        <strong style={{ display: "block", marginBottom: "var(--space-1)" }}>
                          Payments not configured
                        </strong>
                        {BOOKING_COPY.step6.notConfigured}
                      </div>
                    )}

                    {submitError && (
                      <p
                        role="alert"
                        className="mt-[var(--space-4)]"
                        style={{
                          color: "var(--color-coral-deep)",
                          fontWeight: "var(--font-weight-semibold)",
                          fontSize: "var(--font-size-text-small)",
                        }}
                      >
                        {submitError}
                      </p>
                    )}

                    <div className="mt-[var(--space-6)]">
                      <Button
                        variant="primary"
                        size="large"
                        fullWidth
                        disabled={submitting}
                        onClick={handlePay}
                      >
                        {submitting ? BOOKING_COPY.step6.errors.processing : `Pay $${totalDollars}`}
                      </Button>
                      <p
                        className="mt-[var(--space-3)] text-center"
                        style={{
                          color: "var(--color-grape-soft)",
                          fontSize: "var(--font-size-text-small)",
                        }}
                      >
                        {BOOKING_COPY.step6.trust}
                      </p>
                      <div className="mt-[var(--space-4)] flex justify-center">
                        <Button variant="tertiary" size="small" onClick={() => goToStep(5)}>
                          Back
                        </Button>
                      </div>
                    </div>
                  </StepShell>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </main>

      {/* Mobile sticky running total -- only on the extras step. */}
      {step === 5 && (
        <RunningTotalBar base={BASE_DOLLARS} extrasTotal={extrasDollars} variant="sticky" />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ shells */

function StepShell({
  cue,
  heading,
  helper,
  optional,
  children,
}: {
  cue: string;
  heading: string;
  helper?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby="step-heading">
      <div className="mb-[var(--space-4)] flex items-center gap-[var(--space-3)]">
        <Chip variant="calm">{cue}</Chip>
        {optional && (
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-chip)",
              fontWeight: "var(--font-weight-semibold)",
              textTransform: "uppercase",
              letterSpacing: "var(--letter-spacing-wide)",
              color: "var(--step-optional-label)",
            }}
          >
            Optional
          </span>
        )}
      </div>
      <h1
        id="step-heading"
        className="h2"
        style={{ margin: 0, marginBottom: helper ? "var(--space-3)" : "var(--space-6)", color: "var(--color-grape)" }}
      >
        {heading}
      </h1>
      {helper && (
        <p
          className="mb-[var(--space-6)]"
          style={{ color: "var(--color-grape-soft)", lineHeight: "var(--line-height-large)" }}
        >
          {helper}
        </p>
      )}
      {children}
    </section>
  );
}

function StepActions({
  onBack,
  onContinue,
  continueLabel,
  onSkip,
  skipLabel,
}: {
  onBack?: () => void;
  onContinue: () => void;
  continueLabel: string;
  onSkip?: () => void;
  skipLabel?: string;
}) {
  return (
    <div className="mt-[var(--space-7)] flex flex-col gap-[var(--space-4)]">
      <div className="flex items-center justify-between gap-[var(--space-4)]">
        {onBack ? (
          <Button variant="tertiary" size="medium" onClick={onBack}>
            Back
          </Button>
        ) : (
          <span />
        )}
        <Button variant="primary" size="medium" onClick={onContinue}>
          {continueLabel}
        </Button>
      </div>
      {onSkip && skipLabel && (
        <div className="flex justify-center">
          <Button variant="tertiary" size="small" onClick={onSkip}>
            {skipLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
