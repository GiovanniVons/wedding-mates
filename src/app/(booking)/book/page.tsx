import { Suspense } from "react";
import { BookingWizard } from "@/components/booking/BookingWizard";

/**
 * /book -- the single-route, client-driven 7-step wizard. Step state lives in
 * the URL (?step=N) so progress is shareable and recoverable. Steps 1-6 are the
 * wizard; step 7 (Done) is the separate /book/confirmation route reached only on
 * a Stripe-confirmed success.
 *
 * The wizard reads useSearchParams, so it is wrapped in Suspense per the Next 16
 * requirement. force-dynamic: the wizard is fully interactive and never cached.
 */
export const dynamic = "force-dynamic";

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{ minHeight: "100vh", backgroundColor: "var(--color-page)" }}
          aria-hidden="true"
        />
      }
    >
      <BookingWizard />
    </Suspense>
  );
}
