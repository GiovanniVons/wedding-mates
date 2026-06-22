"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { FormAlert } from "@/components/ui/FormAlert";
import { createClient } from "@/lib/supabase/client";
import { forgotSchema, type ForgotValues } from "@/lib/auth/schemas";

/**
 * ForgotForm -- sends the Supabase password-reset email. The success copy is
 * deliberately neutral (does not confirm whether the email has an account), per
 * page-copy Auth > Forgot Password.
 */
export function ForgotForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotValues>({ resolver: zodResolver(forgotSchema) });

  async function onSubmit(values: ForgotValues) {
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo:
        typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback?next=/reset-password`
          : undefined,
    });
    // Always show the same neutral success state (no account enumeration).
    setSent(true);
  }

  if (sent) {
    return (
      <FormAlert tone="success">
        Check your inbox. If that email has an account, a reset link is on its
        way.
      </FormAlert>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-[var(--space-4)]">
      <TextField
        label="Email address"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <Button type="submit" variant="primary" size="large" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Sending" : "Send reset link"}
      </Button>
    </form>
  );
}
