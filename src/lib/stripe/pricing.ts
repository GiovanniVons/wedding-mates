/**
 * pricing.ts -- the SINGLE SOURCE OF TRUTH for every amount in the booking
 * flow. Amounts are in the smallest currency unit (cents) so they map 1:1 to
 * Stripe line items and the orders table (base_amount_cents / total_amount_cents).
 *
 * The client NEVER sends a price or a total. It sends a tier KEY plus selected
 * extra KEYS only. The server recomputes the total from this file via
 * computeTotal(); the Stripe Checkout Session and the orders row both derive
 * from the server figure. This is the guard against a tampered client total.
 *
 * Display dollars live alongside the cents so the UI (running total, order
 * summary, "Pay $X") and the receipt email read from the same place and can
 * never drift from what is charged.
 *
 * PRICING (2026-06-23, two-tier): recommended by the pricing council. $950
 * sat inside the $600-1,200 celebrant band, which invited the wrong (economic)
 * comparison. The two tiers escape that band so the offer is judged on the
 * emotional frame. "The Ceremony" is a deliberately leaner anchor that makes
 * "The Ceremony, Complete" the obvious choice; the two failure-preventing
 * deliverables (rehearsal + script review) now live INSIDE Complete rather
 * than as paid add-ons. Launch ("founding-couples") rates; step Complete to
 * 1,790 once real reviews + a gallery exist. APPROVED by the client 2026-06-26
 * (founding-couples rates). To reprice, change the two amountCents below only.
 */

export const CURRENCY = "aud" as const;

/* ============================================================ TIERS ====== */

export type TierKey = "ceremony" | "complete";

export interface TierDef {
  key: TierKey;
  /** Display name. */
  name: string;
  /** Base price in cents (Stripe line item + orders.base_amount_cents). */
  amountCents: number;
  /** One-line tagline shown under the name. */
  tagline: string;
  /** Inclusion bullets (marketing + the pricing cards). */
  inclusions: string[];
  /** The hero tier most couples should land on (emphasised in the UI). */
  recommended?: boolean;
}

export const TIERS: readonly TierDef[] = [
  {
    key: "ceremony",
    name: "The Ceremony",
    amountCents: 115000,
    tagline: "Everything your mate needs to lead the day.",
    inclusions: [
      "The Wedding Ceremony Blueprint, eight modules",
      "Onboarding video call for you and your mate",
      "Legal paperwork handled by a registered celebrant",
      "Ceremony templates and sample scripts",
      "A readings and music library",
      "Performance and nerves strategies",
    ],
  },
  {
    key: "complete",
    name: "The Ceremony, Complete",
    amountCents: 149000,
    tagline: "The full done-with-you experience. Most couples choose this.",
    recommended: true,
    inclusions: [
      "Everything in The Ceremony",
      "A live Zoom rehearsal with your celebrant",
      "A custom review of your ceremony script",
      "Priority support from Sarah, every step",
    ],
  },
] as const;

/** The tier a booking defaults to (the hero) when none is specified. */
export const DEFAULT_TIER: TierKey = "complete";

const TIER_BY_KEY: Record<TierKey, TierDef> = TIERS.reduce(
  (acc, t) => {
    acc[t.key] = t;
    return acc;
  },
  {} as Record<TierKey, TierDef>,
);

/** Type guard: is the string a known tier key. */
export function isTierKey(value: string): value is TierKey {
  return value in TIER_BY_KEY;
}

/** Look up a tier definition by key (undefined if unknown). */
export function getTier(key: string): TierDef | undefined {
  return isTierKey(key) ? TIER_BY_KEY[key] : undefined;
}

/** Resolve a tier key to its def, falling back to the default (hero) tier. */
export function resolveTier(key: string | null | undefined): TierDef {
  return (key && getTier(key)) || TIER_BY_KEY[DEFAULT_TIER];
}

/** Tier keys as a non-empty tuple for zod enum validation. */
export const TIER_KEYS = TIERS.map((t) => t.key) as [TierKey, ...TierKey[]];

/* =========================================================== EXTRAS ====== */

export type ExtraKey = "certificate" | "attendance";

export interface ExtraDef {
  key: ExtraKey;
  /** Verbatim toggle title. */
  name: string;
  /** Amount in cents (Stripe + orders). */
  amountCents: number;
  /** Verbatim one-line description. */
  description: string;
}

/**
 * The optional extras with their exact prices, keyed. Order is the display
 * order in the wizard. The Zoom rehearsal and custom script review are NOT
 * here: they are the failure-preventing core and now ship inside the
 * "Complete" tier (see TIERS above), not as paid add-ons.
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

/* =========================================================== TOTALS ====== */

/** Cents -> whole-dollar display number (115000 -> 1150, 6900 -> 69). */
export function centsToDollars(cents: number): number {
  return Math.round(cents / 100);
}

/** Whole dollars -> grouped display string (1490 -> "1,490", 69 -> "69"). */
export function formatDollars(dollars: number): string {
  return dollars.toLocaleString("en-AU");
}

export interface ComputedTotal {
  /** The chosen tier (resolved; never undefined). */
  tier: TierDef;
  baseCents: number;
  /** The selected extras, de-duplicated, in canonical order, with amounts. */
  extras: ExtraDef[];
  extrasCents: number;
  totalCents: number;
}

/**
 * computeTotal -- the authoritative total. Accepts the client's tier KEY and
 * selected extra KEYS, resolves the tier (falling back to the default), ignores
 * anything unknown, de-duplicates, and sums in canonical order. The SERVER
 * calls this; the result is what the Checkout Session charges and what the
 * orders row stores. Never trust a client-supplied total.
 */
export function computeTotal(
  tierKey: string | null | undefined,
  selectedKeys: readonly string[],
): ComputedTotal {
  const tier = resolveTier(tierKey);
  const seen = new Set<ExtraKey>();
  // Canonical order = EXTRAS order, filtered to the (valid, unique) selection.
  const extras = EXTRAS.filter((e) => {
    const chosen = selectedKeys.includes(e.key) && !seen.has(e.key);
    if (chosen) seen.add(e.key);
    return chosen;
  });
  const extrasCents = extras.reduce((sum, e) => sum + e.amountCents, 0);
  return {
    tier,
    baseCents: tier.amountCents,
    extras,
    extrasCents,
    totalCents: tier.amountCents + extrasCents,
  };
}
