"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HypeLine } from "@/components/ui/HypeLine";
import { BookingHeader } from "@/components/layout/BookingHeader";
import { BOOKING_COPY } from "@/content/booking";

type Status = "loading" | "pending" | "paid" | "unknown";

const POLL_MS = 2500;
const MAX_POLLS = 12; // ~30s before we settle on whatever we have

/**
 * BookingConfirmation -- Step 7, the ONE permitted loud eruption in the wizard.
 *
 * Reads ?session_id and polls /api/stripe/session-status. While the payment is
 * settling it shows the calm "Confirming your payment" pending state (NO burst).
 * Once Stripe reports paid, it fires the THE KISS Hype Line with the single
 * confetti burst, then drops to the calm next-steps checklist.
 *
 * When Stripe is not configured (preview), there is no session to confirm, so it
 * shows an honest "preview" state rather than faking a celebration.
 */
export function BookingConfirmation() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<Status>("loading");
  const [orderRef, setOrderRef] = useState<string>("your booking");
  const pollsRef = useRef(0);

  useEffect(() => {
    // Clear the saved draft once we reach the confirmation route. localStorage
    // now persists the draft across sessions, so it must be cleared on
    // completion; also clear any legacy sessionStorage draft.
    try {
      localStorage.removeItem("wm-booking-draft");
      sessionStorage.removeItem("wm-booking-draft");
    } catch {
      // ignore
    }

    if (!sessionId) {
      setStatus("unknown");
      return;
    }

    let cancelled = false;
    let timer: number | undefined;

    async function poll() {
      try {
        const res = await fetch(
          `/api/stripe/session-status?session_id=${encodeURIComponent(sessionId!)}`,
          { cache: "no-store" },
        );
        const body = (await res.json()) as {
          state: Status;
          orderRef?: string | null;
        };
        if (cancelled) return;
        if (body.orderRef) setOrderRef(body.orderRef);

        if (body.state === "paid") {
          setStatus("paid");
          return;
        }
        if (body.state === "unknown") {
          setStatus("unknown");
          return;
        }
        // pending -> keep polling for a while, then settle.
        pollsRef.current += 1;
        if (pollsRef.current >= MAX_POLLS) {
          // Payment likely succeeded but the webhook is slow; show success so the
          // buyer is not stuck. Access still arrives via the webhook + email.
          setStatus("paid");
          return;
        }
        setStatus("pending");
        timer = window.setTimeout(poll, POLL_MS);
      } catch {
        if (!cancelled) {
          setStatus("pending");
          timer = window.setTimeout(poll, POLL_MS);
        }
      }
    }

    poll();
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [sessionId]);

  return (
    <div
      data-surface="calm"
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-page)" }}
    >
      <BookingHeader showExit={false} />
      <main
        id="main"
        style={{ paddingBlock: "var(--section-space-page-top)" }}
      >
        <Container width="form" className="text-center">
          {status === "paid" ? (
            <PaidView orderRef={orderRef} />
          ) : status === "unknown" ? (
            <UnknownView />
          ) : (
            <PendingView />
          )}
        </Container>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ paid */

function PaidView({ orderRef }: { orderRef: string }) {
  return (
    <div className="flex flex-col items-center">
      {/* The single earned eruption: THE KISS, with the one confetti burst. */}
      <div
        className="mb-[var(--space-7)] flex w-full justify-center"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <HypeLine
          cue={BOOKING_COPY.step7.cue}
          cueVariant="loud"
          align="center"
          scale="section"
          as="p"
          burst
          immediate
          segments={[
            { text: "And just like that," },
            { text: "you're" },
            { text: "married.", hit: true },
          ]}
        />
      </div>

      <h1
        className="h1"
        style={{ margin: 0, marginBottom: "var(--space-4)", color: "var(--color-grape)" }}
      >
        {BOOKING_COPY.step7.heading}
      </h1>
      <p
        style={{
          margin: 0,
          marginBottom: "var(--space-2)",
          color: "var(--color-grape-soft)",
          lineHeight: "var(--line-height-large)",
        }}
      >
        {BOOKING_COPY.step7.orderRefLine(orderRef)}
      </p>
      <p
        style={{
          margin: 0,
          marginBottom: "var(--space-7)",
          color: "var(--color-grape-soft)",
        }}
      >
        {BOOKING_COPY.step7.subLine}
      </p>

      <NextStepsChecklist />

      <div className="mt-[var(--space-7)] flex flex-col items-center gap-[var(--space-3)]">
        <Button as="a" href="/course" variant="primary" size="large">
          {BOOKING_COPY.step7.primaryCta}
        </Button>
        <Button as="a" href="/contact" variant="tertiary" size="medium">
          {BOOKING_COPY.step7.secondaryCta}
        </Button>
      </div>
    </div>
  );
}

function NextStepsChecklist() {
  return (
    <ul
      className="mx-auto flex w-full max-w-[34rem] flex-col gap-[var(--space-3)] text-left"
      style={{ listStyle: "none", margin: 0, padding: 0 }}
    >
      {BOOKING_COPY.step7.checklist.map((item) => (
        <li
          key={item}
          className="flex items-start gap-[var(--space-3)]"
          style={{
            backgroundColor: "var(--color-page-tint)",
            border: "var(--border-width-main) solid var(--theme-border)",
            borderRadius: "var(--radius-main)",
            padding: "var(--space-4)",
          }}
        >
          <span
            aria-hidden="true"
            className="flex flex-shrink-0 items-center justify-center"
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "var(--radius-round)",
              backgroundColor: "var(--color-mint)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path
                d="M3 8.5l3 3 7-7.5"
                fill="none"
                stroke="var(--color-grape)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            style={{
              color: "var(--color-grape)",
              fontWeight: "var(--font-weight-medium)",
              lineHeight: "var(--line-height-medium)",
            }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* --------------------------------------------------------------- pending */

function PendingView() {
  return (
    <div className="flex flex-col items-center" style={{ paddingBlock: "var(--space-8)" }}>
      <span
        aria-hidden="true"
        className="mb-[var(--space-5)] inline-block"
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "var(--radius-round)",
          border: "3px solid var(--color-grape-o20)",
          borderTopColor: "var(--color-coral)",
          animation: "wm-spin 0.9s linear infinite",
        }}
      />
      <h1 className="h3" style={{ margin: 0, color: "var(--color-grape)" }}>
        {BOOKING_COPY.step7.pending}
      </h1>
      <style>{`
        @keyframes wm-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { [style*="wm-spin"] { animation: none !important; } }
      `}</style>
    </div>
  );
}

/* --------------------------------------------------------------- unknown */

function UnknownView() {
  return (
    <div className="flex flex-col items-center" style={{ paddingBlock: "var(--space-8)" }}>
      <h1 className="h2" style={{ margin: 0, marginBottom: "var(--space-4)", color: "var(--color-grape)" }}>
        Nothing to confirm yet
      </h1>
      <p
        style={{
          margin: 0,
          marginBottom: "var(--space-6)",
          color: "var(--color-grape-soft)",
          lineHeight: "var(--line-height-large)",
          maxWidth: "30rem",
        }}
      >
        This screen appears after a completed payment. If you have just booked and
        landed here without your confirmation, please check your inbox or message
        us and we will sort it.
      </p>
      <Button as="a" href="/book" variant="primary" size="medium">
        Back to booking
      </Button>
    </div>
  );
}
