import { Suspense } from "react";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";

/**
 * /book/confirmation -- Step 7. Renders the celebration only on a Stripe-
 * confirmed success (reads ?session_id and verifies via the session-status API).
 * Until the webhook settles it shows the calm pending state. force-dynamic +
 * Suspense (useSearchParams).
 */
export const dynamic = "force-dynamic";

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{ minHeight: "100vh", backgroundColor: "var(--color-page)" }}
          aria-hidden="true"
        />
      }
    >
      <BookingConfirmation />
    </Suspense>
  );
}
