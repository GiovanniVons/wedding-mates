"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { FormAlert } from "@/components/ui/FormAlert";
import { createClient } from "@/lib/supabase/client";
import { resetSchema, type ResetValues } from "@/lib/auth/schemas";

/**
 * ResetForm -- sets a new password. The recovery session is established by the
 * auth callback (which exchanges the recovery code for a session before routing
 * here), so updateUser() applies to the signed-in recovery session. On success
 * we sign the user straight into the course. Copy from page-copy Auth > Reset.
 */
export function ResetForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetValues>({ resolver: zodResolver(resetSchema) });

  async function onSubmit(values: ResetValues) {
    setServerError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: values.password,
    });
    if (error) {
      const expired =
        error.message.toLowerCase().includes("expired") ||
        error.message.toLowerCase().includes("session");
      setServerError(
        expired
          ? "That reset link has expired. Request a new one and we'll resend it."
          : error.message,
      );
      return;
    }
    setDone(true);
    window.setTimeout(() => window.location.assign("/course"), 900);
  }

  if (done) {
    return <FormAlert tone="success">Password saved. Signing you in.</FormAlert>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-[var(--space-4)]">
      {serverError && <FormAlert tone="error">{serverError}</FormAlert>}
      <TextField
        label="New password"
        type="password"
        autoComplete="new-password"
        helper="At least 8 characters, with a number."
        error={errors.password?.message}
        {...register("password")}
      />
      <TextField
        label="Confirm new password"
        type="password"
        autoComplete="new-password"
        placeholder="Type it again"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button type="submit" variant="primary" size="large" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Saving" : "Save password"}
      </Button>
    </form>
  );
}
