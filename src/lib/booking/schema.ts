import { z } from "zod";
import { EXTRAS, type ExtraKey } from "@/lib/stripe/pricing";

/**
 * schema.ts -- the booking wizard validation, modelled on the auth schemas
 * pattern (zod, AU-English error messages verbatim from page-copy Booking
 * Wizard). The client sends selected extra KEYS only (never prices); the server
 * recomputes the total from pricing.ts.
 *
 * Two required gates (Step 1 Date, Step 2 Details). Steps 3 (Celebrant) and 4
 * (Location) are fully optional and may be empty. Step 5 extras is a key list.
 */

const EXTRA_KEYS = EXTRAS.map((e) => e.key) as [ExtraKey, ...ExtraKey[]];

// AU mobile: 04XX XXX XXX, tolerant of spaces. Also accepts +614 form.
const AU_MOBILE = /^(?:\+?61|0)4[0-9 ]{8,}$/;

/** Step 1 -- Date. ISO yyyy-mm-dd from the native date input. */
export const dateStepSchema = z.object({
  weddingDate: z
    .string()
    .min(1, "Pick your wedding date so we can plan the legal steps around it.")
    .refine(
      (v) => !Number.isNaN(Date.parse(v)),
      "Pick your wedding date so we can plan the legal steps around it.",
    ),
});

/** Step 2 -- Details (required gate). */
export const detailsStepSchema = z.object({
  fullName: z.string().trim().min(1, "We'll need your name to get started."),
  partnerName: z
    .string()
    .trim()
    .min(1, "And your partner's name too."),
  email: z.string().trim().email("That email does not look quite right."),
  mobile: z
    .string()
    .trim()
    .regex(AU_MOBILE, "Pop in a valid Australian mobile number."),
  suburb: z
    .string()
    .trim()
    .min(1, "Your suburb helps us plan the legal meeting."),
  preferredContact: z.enum(["Email", "Phone"]).default("Email"),
});

/** Step 3 -- Celebrant (optional; either "not chosen" or partial details). */
export const celebrantStepSchema = z.object({
  celebrantNotChosen: z.boolean().default(false),
  celebrantName: z.string().trim().optional().default(""),
  celebrantEmail: z
    .string()
    .trim()
    .email("That email does not look quite right.")
    .optional()
    .or(z.literal("")),
  celebrantPhone: z.string().trim().optional().default(""),
});

/** Step 4 -- Location (optional free text). */
export const locationStepSchema = z.object({
  ceremonyLocation: z.string().trim().optional().default(""),
});

/** Step 5 -- Extras (selected keys only). */
export const extrasStepSchema = z.object({
  extras: z.array(z.enum(EXTRA_KEYS)).default([]),
});

/**
 * The full booking payload POSTed to /api/stripe/checkout. The server validates
 * this, recomputes the total from the keys, and inserts the orders row. Note the
 * absence of any price/total field: amounts are server-derived only.
 */
export const bookingPayloadSchema = z.object({
  weddingDate: dateStepSchema.shape.weddingDate,
  fullName: detailsStepSchema.shape.fullName,
  partnerName: detailsStepSchema.shape.partnerName,
  email: detailsStepSchema.shape.email,
  mobile: detailsStepSchema.shape.mobile,
  suburb: detailsStepSchema.shape.suburb,
  preferredContact: detailsStepSchema.shape.preferredContact,
  celebrantName: z.string().trim().optional().default(""),
  celebrantEmail: z.string().trim().optional().default(""),
  celebrantPhone: z.string().trim().optional().default(""),
  celebrantNotChosen: z.boolean().optional().default(false),
  ceremonyLocation: z.string().trim().optional().default(""),
  extras: z.array(z.string()).default([]),
});

export type BookingPayload = z.infer<typeof bookingPayloadSchema>;
export type DetailsValues = z.infer<typeof detailsStepSchema>;
