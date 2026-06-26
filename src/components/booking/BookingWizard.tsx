"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Stepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { TextField, TextareaField, Choice } from "@/components/ui/Field";
import { DateField } from "@/components/ui/DateField";
import { TierSelect } from "@/components/booking/TierSelect";
import {
  ExtrasToggleCard,
  OrderSummary,
  type Extra,
} from "@/components/ui/BookingExtras";
import { BookingHeader } from "@/components/layout/BookingHeader";
import { BOOKING_COPY } from "@/content/booking";
import {
  EXTRAS,
  DEFAULT_TIER,
  resolveTier,
  isTierKey,
  centsToDollars,
  formatDollars,
  computeTotal,
  type ExtraKey,
  type TierKey,
} from "@/lib/stripe/pricing";
import {
  celebrantStepSchema,
  detailsStepSchema,
  dateStepSchema,
} from "@/lib/booking/schema";

/* ------------------------------------------------------------------ state */

interface BookingState {
  tier: TierKey;
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
  tier: DEFAULT_TIER,
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
const MAX_STEP = 4; // 1 Date, 2 Details, 3 Your day, 4 Review & pay. Done = /book/confirmation.

/** Map an extras pricing def to the ExtrasToggleCard shape (dollar display). */
const EXTRA_CARDS: Extra[] = EXTRAS.map((e) => ({
  id: e.key,
  name: e.name,
  price: centsToDollars(e.amountCents),
  description: e.description,
}));

/** ISO date -> warm long display ("Saturday 5 September 2026"). */
function formatWeddingDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return "";
  return new Date(y, m - 1, d).toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

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
  const [tierPickerOpen, setTierPickerOpen] = useState(false);
  const liveRef = useRef<HTMLDivElement>(null);

  // --- Restore the draft + resolve the tier on mount -------------------------
  // Tier precedence: a valid ?tier= in the URL (a tier card was clicked) wins,
  // then the saved draft, then the default (hero) tier.
  useEffect(() => {
    let draft: Partial<BookingState> = {};
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) draft = JSON.parse(raw) as Partial<BookingState>;
    } catch {
      // ignore malformed draft
    }
    const urlTier = searchParams.get("tier");
    const tier: TierKey =
      urlTier && isTierKey(urlTier)
        ? urlTier
        : draft.tier && isTierKey(draft.tier)
          ? draft.tier
          : DEFAULT_TIER;
    setData({ ...EMPTY, ...draft, tier });
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const selectedTier = resolveTier(data.tier);
  const baseDollars = centsToDollars(selectedTier.amountCents);
  const total = useMemo(
    () => computeTotal(data.tier, data.extras),
    [data.tier, data.extras],
  );
  const totalDollars = centsToDollars(total.totalCents);
  const upgradeDelta = formatDollars(
    centsToDollars(resolveTier("complete").amountCents - resolveTier("ceremony").amountCents),
  );

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
        // Your day is optional; only validate a provided celebrant email format.
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
      // Step 4 (review & pay): no required gate (handlePay does the work).
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
          tier: data.tier,
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
        setSubmitError(BOOKING_COPY.step4.errors.generic);
        setSubmitting(false);
        return;
      }
      const body = (await res.json()) as { url?: string };
      if (body.url) {
        window.location.assign(body.url); // redirect to Stripe Checkout
        return;
      }
      setSubmitError(BOOKING_COPY.step4.errors.generic);
      setSubmitting(false);
    } catch {
      setSubmitError(BOOKING_COPY.step4.errors.generic);
      setSubmitting(false);
    }
  }, [data]);

  // Guard: if a user deep-links past step 1 without a valid date, send them back.
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
    transition: { duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <div
      data-surface="calm"
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-page)" }}
    >
      <BookingHeader />

      <main id="main" style={{ paddingBlock: "var(--section-space-main)" }}>
        <Container width="form">
          {/* Persistent purchase context: which package + price, always visible
              so the buyer never wonders what they are paying for. */}
          <div
            className="mb-[var(--space-5)] flex items-center justify-between gap-[var(--space-3)]"
            style={{
              backgroundColor: "var(--color-page-tint)",
              border: "var(--border-width-main) solid var(--color-grape-o20)",
              borderRadius: "var(--radius-main)",
              padding: "var(--space-3) var(--space-4)",
            }}
          >
            <span className="flex items-baseline gap-[var(--space-2)]" style={{ minWidth: 0 }}>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-heavy)",
                  color: "var(--color-grape)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {selectedTier.name}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-weight-heavy)",
                  color: "var(--color-coral-deep)",
                  whiteSpace: "nowrap",
                }}
              >
                ${formatDollars(baseDollars)}
              </span>
            </span>
            <button
              type="button"
              aria-expanded={tierPickerOpen}
              onClick={() => setTierPickerOpen((o) => !o)}
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-weight-semibold)",
                fontSize: "var(--font-size-text-small)",
                color: "var(--color-grape)",
                textDecoration: "underline",
                textDecorationColor: "var(--color-grape-o40)",
                textUnderlineOffset: "0.2em",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {tierPickerOpen ? "Close" : "Change"}
            </button>
          </div>
          <AnimatePresence initial={false}>
            {tierPickerOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.24 }}
                style={{ overflow: "hidden" }}
              >
                <div className="mb-[var(--space-5)]">
                  <TierSelect
                    value={data.tier}
                    onChange={(t) => {
                      set("tier", t);
                      setTierPickerOpen(false);
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Stepper current={step} onStepSelect={goToStep} className="mb-[var(--space-7)]" />

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
                    <DateField
                      label={BOOKING_COPY.step1.label}
                      helper={errors.weddingDate ? undefined : BOOKING_COPY.step1.helper}
                      error={errors.weddingDate}
                      value={data.weddingDate}
                      min={new Date().toISOString().slice(0, 10)}
                      onChange={(iso) => set("weddingDate", iso)}
                    />
                    {/* Reserve the note's space so Continue never shifts. */}
                    <div style={{ minHeight: "var(--space-2)" }}>
                      <AnimatePresence>
                        {data.weddingDate && !errors.weddingDate && (
                          <motion.div
                            key="date-locked"
                            initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-[var(--space-4)] flex items-center gap-[var(--space-3)]"
                          >
                            <motion.span
                              aria-hidden="true"
                              initial={{ scale: reduceMotion ? 1 : 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                delay: reduceMotion ? 0 : 0.12,
                                type: "spring",
                                stiffness: 500,
                                damping: 18,
                              }}
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "var(--radius-round)",
                                backgroundColor: "var(--color-coral)",
                                flexShrink: 0,
                              }}
                            />
                            <p
                              style={{
                                margin: 0,
                                color: "var(--color-grape)",
                                fontWeight: "var(--font-weight-semibold)",
                              }}
                            >
                              {formatWeddingDate(data.weddingDate)}. Locked in.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
                        optional
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
                        optional
                        value={data.mobile}
                        error={errors.mobile}
                        autoComplete="tel"
                        onChange={(e) => set("mobile", e.target.value)}
                      />
                    </div>
                    <div className="mt-[var(--space-5)]">
                      <TextField
                        label={BOOKING_COPY.step2.labels.suburb}
                        optional
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
                    <SubLabel>{BOOKING_COPY.step3.celebrant.label}</SubLabel>
                    <Choice
                      type="checkbox"
                      label={BOOKING_COPY.step3.celebrant.notChosen}
                      checked={data.celebrantNotChosen}
                      onChange={(e) => set("celebrantNotChosen", e.target.checked)}
                      className="mb-[var(--space-5)]"
                    />
                    {!data.celebrantNotChosen && (
                      <div className="flex flex-col gap-[var(--space-5)]">
                        <TextField
                          label={BOOKING_COPY.step3.celebrant.labels.name}
                          placeholder={BOOKING_COPY.step3.celebrant.placeholders.name}
                          optional
                          value={data.celebrantName}
                          onChange={(e) => set("celebrantName", e.target.value)}
                        />
                        <TextField
                          type="email"
                          label={BOOKING_COPY.step3.celebrant.labels.email}
                          placeholder={BOOKING_COPY.step3.celebrant.placeholders.email}
                          optional
                          error={errors.celebrantEmail}
                          value={data.celebrantEmail}
                          onChange={(e) => set("celebrantEmail", e.target.value)}
                        />
                        <TextField
                          type="tel"
                          label={BOOKING_COPY.step3.celebrant.labels.phone}
                          placeholder={BOOKING_COPY.step3.celebrant.placeholders.phone}
                          optional
                          value={data.celebrantPhone}
                          onChange={(e) => set("celebrantPhone", e.target.value)}
                        />
                      </div>
                    )}
                    <div className="mt-[var(--space-7)]">
                      <SubLabel>{BOOKING_COPY.step3.location.label}</SubLabel>
                      <TextareaField
                        label={BOOKING_COPY.step3.location.field}
                        helper={BOOKING_COPY.step3.location.helper}
                        optional
                        value={data.ceremonyLocation}
                        onChange={(e) => set("ceremonyLocation", e.target.value)}
                      />
                    </div>
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
                  <StepShell cue={BOOKING_COPY.step4.cue} heading={BOOKING_COPY.step4.heading}>
                    {canceled && (
                      <p
                        role="status"
                        className="mb-[var(--space-4)]"
                        style={{
                          color: "var(--color-grape-soft)",
                          fontSize: "var(--font-size-text-small)",
                        }}
                      >
                        {BOOKING_COPY.step4.canceled}
                      </p>
                    )}

                    {/* Order bump: optional add-ons, shown in the context of the order
                        rather than as a roadblock step before payment. */}
                    <SubLabel>{BOOKING_COPY.step4.extrasLabel}</SubLabel>
                    <p
                      className="mb-[var(--space-4)]"
                      style={{
                        margin: "0 0 var(--space-4)",
                        color: "var(--color-grape-soft)",
                        fontSize: "var(--font-size-text-small)",
                      }}
                    >
                      {BOOKING_COPY.step4.extrasIntro}
                    </p>
                    <div className="flex flex-col gap-[var(--space-3)]">
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

                    <div className="mt-[var(--space-7)]">
                      <OrderSummary
                        base={baseDollars}
                        baseLabel={selectedTier.name}
                        selected={EXTRA_CARDS.filter((e) =>
                          data.extras.includes(e.id as ExtraKey),
                        )}
                        gstNote={BOOKING_COPY.step4.gstNote}
                      />
                    </div>

                    {/* Upgrade nudge: only for the leaner Ceremony tier. One tap
                        swaps the tier in place (no navigation). */}
                    {data.tier === "ceremony" && (
                      <div
                        className="mt-[var(--space-5)] flex items-center justify-between gap-[var(--space-4)]"
                        style={{
                          backgroundColor: "var(--color-page-tint)",
                          border: "var(--border-width-main) solid var(--color-marigold-deep)",
                          borderRadius: "var(--radius-main)",
                          padding: "var(--space-4)",
                        }}
                      >
                        <div style={{ minWidth: 0 }}>
                          <strong
                            style={{
                              display: "block",
                              color: "var(--color-grape)",
                              fontSize: "var(--font-size-text-small)",
                            }}
                          >
                            Add the rehearsal and script review
                          </strong>
                          <span
                            style={{ color: "var(--color-grape-soft)", fontSize: "var(--font-size-text-small)" }}
                          >
                            Most couples choose Complete. Upgrade for ${upgradeDelta} more and walk in ready.
                          </span>
                        </div>
                        <Button variant="secondary" size="small" onClick={() => set("tier", "complete")}>
                          Upgrade
                        </Button>
                      </div>
                    )}

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
                        {BOOKING_COPY.step4.notConfigured}
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

                    <div
                      className="mt-[var(--space-5)] flex items-start gap-[var(--space-3)]"
                      style={{
                        backgroundColor: "var(--color-field-mint)",
                        border: "var(--border-width-main) solid var(--color-mint-deep)",
                        borderRadius: "var(--radius-main)",
                        padding: "var(--space-4)",
                      }}
                    >
                      <Chip variant="mint">You&rsquo;re covered</Chip>
                      <p
                        style={{
                          margin: 0,
                          color: "var(--color-grape)",
                          fontSize: "var(--font-size-text-small)",
                          lineHeight: "var(--line-height-large)",
                        }}
                      >
                        The legals are handled by a registered celebrant, and your mate is
                        trained and supported every step. You&rsquo;re not doing this on your own.
                      </p>
                    </div>

                    <div className="mt-[var(--space-6)]">
                      <Button
                        variant="primary"
                        size="large"
                        fullWidth
                        disabled={submitting}
                        onClick={handlePay}
                      >
                        {submitting ? BOOKING_COPY.step4.errors.processing : `Pay $${formatDollars(totalDollars)}`}
                      </Button>
                      <p
                        className="mt-[var(--space-3)] text-center"
                        style={{
                          color: "var(--color-grape-soft)",
                          fontSize: "var(--font-size-text-small)",
                        }}
                      >
                        {BOOKING_COPY.step4.trust}
                      </p>
                      <div className="mt-[var(--space-4)] flex justify-center">
                        <Button variant="tertiary" size="small" onClick={() => goToStep(3)}>
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
    </div>
  );
}

/* ------------------------------------------------------------------ shells */

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="h4"
      style={{
        margin: "0 0 var(--space-4)",
        color: "var(--color-grape)",
      }}
    >
      {children}
    </h2>
  );
}

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
      <div className="mb-[var(--space-4)] flex flex-wrap items-center gap-[var(--space-3)]">
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
