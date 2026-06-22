"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextField, TextareaField } from "@/components/ui/Field";
import { FormAlert } from "@/components/ui/FormAlert";

/**
 * ContactForm -- the calm-register contact form. Every field is visibly
 * labelled; validation messages use the exact page-copy microcopy. On a valid
 * submit it POSTs to /api/contact, which emails Sarah via Resend (and degrades
 * gracefully to the same success state when the key is not yet provisioned, a
 * flagged client decision). Submitting, success, and error states are all here.
 */

type Errors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string)?.trim() ?? "";
    const email = (data.get("email") as string)?.trim() ?? "";
    const message = (data.get("message") as string)?.trim() ?? "";

    const next: Errors = {};
    if (!name) next.name = "This one is needed so we can reply.";
    if (!email) next.email = "This one is needed so we can reply.";
    else if (!EMAIL_RE.test(email))
      next.email = "That email does not look quite right. Mind checking it?";
    if (!message) next.message = "This one is needed so we can reply.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSendError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        setSendError(
          "Something went wrong sending your message. Please try again, or email us directly.",
        );
        return;
      }

      setSent(true);
      form.reset();
    } catch {
      setSendError(
        "We could not reach our server. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div
        role="status"
        className="card flex flex-col items-start gap-[var(--space-3)]"
        style={{ backgroundColor: "var(--color-field-mint)" }}
      >
        <span
          className="meta-caps"
          style={{ color: "var(--color-mint-deep)", margin: 0 }}
        >
          Message sent
        </span>
        <p style={{ color: "var(--color-grape)", margin: 0 }}>
          Thanks, your message is on its way. We will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-[var(--space-5)]">
      <h2 className="h3" style={{ marginTop: 0, color: "var(--color-grape)" }}>
        Send us a message
      </h2>
      {sendError && <FormAlert tone="error">{sendError}</FormAlert>}
      <TextField
        name="name"
        label="Your name"
        placeholder="First and last name"
        autoComplete="name"
        error={errors.name}
      />
      <TextField
        name="email"
        type="email"
        label="Email address"
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email}
      />
      <TextareaField
        name="message"
        label="Your message"
        placeholder="Tell us a little about your wedding and what you would like to know."
        error={errors.message}
      />
      <div>
        <Button type="submit" variant="primary" size="large" disabled={submitting}>
          {submitting ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
