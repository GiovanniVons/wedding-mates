/**
 * booking.ts -- the verbatim booking-wizard copy (page-copy.md Booking Wizard +
 * booking-portal-copy.txt). Every user-facing string the wizard renders lives
 * here so it can be checked against the source in one place. AU English; no em
 * dashes, no double hyphens in any client-facing string.
 */

export const BOOKING_COPY = {
  header: {
    saveExit: "Save & exit",
    support: "Need a hand? Message Sarah",
  },
  step1: {
    cue: "STEP 1 · YOUR WEDDING DATE",
    heading: "When's the big day?",
    label: "Wedding date",
    helper: "Select your wedding ceremony date.",
    legalNote:
      "Less than 4 weeks away? No problem. Your legal marriage will be registered after the ceremony and we'll guide you through it.",
    error: "Pick your wedding date so we can plan the legal steps around it.",
    cta: "Continue",
  },
  step2: {
    cue: "STEP 2 · YOUR DETAILS",
    heading: "A bit about you two",
    labels: {
      fullName: "Your full name",
      partnerName: "Partner's full name",
      email: "Email address",
      mobile: "Mobile number",
      suburb: "Home suburb",
      preferredContact: "Preferred contact method",
    },
    placeholders: {
      fullName: "Your name",
      partnerName: "Your partner's name",
      email: "you@example.com",
      mobile: "04XX XXX XXX",
    },
    suburbHelper: "Used to plan your legal face-to-face meeting",
    cta: "Continue",
  },
  step3: {
    cue: "STEP 3 · YOUR CELEBRANT",
    heading: "Who's your mate?",
    helper: "You can add this now or later.",
    notChosen: "We haven't chosen one yet",
    labels: {
      name: "Name of your chosen celebrant",
      email: "Email",
      phone: "Phone",
    },
    placeholders: {
      name: "Their full name",
      email: "Their email",
      phone: "Their mobile",
    },
    skip: "Skip for now",
    cta: "Continue",
  },
  step4: {
    cue: "STEP 4 · CEREMONY LOCATION",
    heading: "Where will it happen?",
    label: "Ceremony location",
    helper: "A venue, a backyard, a beach, anywhere",
    skip: "Skip for now",
    cta: "Continue",
  },
  step5: {
    cue: "STEP 5 · OPTIONAL EXTRAS",
    heading: "Want to add anything?",
    intro: "All optional. Add what you like, skip the rest.",
    added: "Added",
    add: "Add",
    cta: "Continue to payment",
  },
  step6: {
    cue: "STEP 6 · PAYMENT",
    heading: "Secure checkout",
    summaryHeading: "Your order",
    baseLine: "Wedding Mates package",
    gstNote: "All prices in AUD.",
    totalLabel: "Total",
    trust: "Secure payment via Stripe. Questions? Message Sarah any time.",
    disabledHelper: "Add your card details to continue.",
    notConfigured:
      "Payments are not configured in this preview. The booking details are captured and the checkout connects once the live Stripe keys are added.",
    errors: {
      declined:
        "That card was declined. Try another, or message us and we'll sort it.",
      generic:
        "Payment did not go through. No charge was made. Please try again.",
      processing: "Processing your payment, one moment.",
    },
  },
  step7: {
    cue: "THE KISS",
    heading: "You're booked. Let's get you wed.",
    subLine: "Everything your mate needs is ready and waiting.",
    orderRefLine: (ref: string) =>
      `Your booking reference is ${ref}. A receipt is on its way to your inbox.`,
    checklist: [
      "Your course login is in your inbox.",
      "Download your timeline checklist to map the journey.",
      "Book your onboarding call: legal steps, support, and Q&A.",
      "Celebrant welcome pack sent if you gave us their contact.",
    ],
    primaryCta: "Go to your course",
    secondaryCta: "Book your onboarding call",
    pending: "Confirming your payment, this only takes a moment.",
  },
} as const;
