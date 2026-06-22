/**
 * pricing.ts -- the SINGLE SOURCE OF TRUTH for every amount in the booking
 * flow. Amounts are in the smallest currency unit (cents) so they map 1:1 to
 * Stripe line items and the orders table (base_amount_cents / total_amount_cents).
 *
 * The client NEVER sends a price or a total. It sends selected extra KEYS only.
 * The server recomputes the total from this file via computeTotal(); the Stripe
 * Checkout Session and the orders row both derive from the server figure. This
 * is the guard against a tampered client total.
 *
 * Display dollars live alongside the cents so the UI (running total, order
 * summary, "Pay $X") and the receipt email read from the same place and can
 * never drift from what is charged.
 */

export const CURRENCY = "aud" as const;

/** Base Wedding Mates package: $950 AUD. */
export const BASE_AMOUNT_CENTS = 95000 as const;

export type ExtraKey = "certificate" | "attendance" | "zoom" | "script";

export interface ExtraDef {
  key: ExtraKey;
  /** Verbatim toggle title (page-copy Step 5 + booking-portal-copy). */
  name: string;
  /** Amount in cents (Stripe + orders). */
  amountCents: number;
  /** Verbatim one-line description. */
  description: string;
}

/**
 * The 4 optional extras with their exact prices, keyed. Order is the display
 * order in the wizard. Verbatim names + descriptions from page-copy Step 5.
 */
export const EXTRAS: readonly ExtraDef[] = [
  {
    key: "certificate",
    name: "Official Marriage Certificate",
    amountCents: 6900,
    description:
      "Only required for name changes and visa applications.",
  },
  {
    key: "attendance",
    name: "Celebrant in Attendance on Your Wedding Day",
    amountCents: 29900,
    description:
      "A registered celebrant attends in person as backup or to legally officiate.",
  },
  {
    key: "zoom",
    name: "Zoom Rehearsal with Your Celebrant",
    amountCents: 9900,
    description: "30-minute rehearsal to review flow and delivery.",
  },
  {
    key: "script",
    name: "Custom Script Review",
    amountCents: 12900,
    description: "We'll review your script and suggest improvements.",
  },
] as const;

const EXTRA_BY_KEY: Record<ExtraKey, ExtraDef> = EXTRAS.reduce(
  (acc, e) => {
    acc[e.key] = e;
    return acc;
  },
  {} as Record<ExtraKey, ExtraDef>,
);

/** Type guard: is the string a known extra key. */
export function isExtraKey(value: string): value is ExtraKey {
  return value in EXTRA_BY_KEY;
}

/** Look up an extra definition by key (undefined if unknown). */
export function getExtra(key: string): ExtraDef | undefined {
  return isExtraKey(key) ? EXTRA_BY_KEY[key] : undefined;
}

/** Cents -> whole-dollar display string ("950", "69"). AUD has no fractional listing here. */
export function centsToDollars(cents: number): number {
  return Math.round(cents / 100);
}

export interface ComputedTotal {
  baseCents: number;
  /** The selected extras, de-duplicated, in canonical order, with amounts. */
  extras: ExtraDef[];
  extrasCents: number;
  totalCents: number;
}

/**
 * computeTotal -- the authoritative total. Accepts the client's selected KEYS,
 * ignores anything unknown, de-duplicates, and sums in canonical order. The
 * SERVER calls this; the result is what the Checkout Session charges and what
 * the orders row stores. Never trust a client-supplied total.
 */
export function computeTotal(selectedKeys: readonly string[]): ComputedTotal {
  const seen = new Set<ExtraKey>();
  // Canonical order = EXTRAS order, filtered to the (valid, unique) selection.
  const extras = EXTRAS.filter((e) => {
    const chosen = selectedKeys.includes(e.key) && !seen.has(e.key);
    if (chosen) seen.add(e.key);
    return chosen;
  });
  const extrasCents = extras.reduce((sum, e) => sum + e.amountCents, 0);
  return {
    baseCents: BASE_AMOUNT_CENTS,
    extras,
    extrasCents,
    totalCents: BASE_AMOUNT_CENTS + extrasCents,
  };
}
