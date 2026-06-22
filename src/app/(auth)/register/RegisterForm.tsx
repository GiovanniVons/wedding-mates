"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { FormAlert } from "@/components/ui/FormAlert";
import { createClient } from "@/lib/supabase/client";
import { registerSchema, type RegisterValues } from "@/lib/auth/schemas";

/**
 * RegisterForm -- creates a Supabase auth account. The DB trigger
 * (handle_new_user) creates the matching profiles row; full_name is passed in
 * the signup metadata so the trigger can populate it. On success we show the
 * confirm-email state (or redirect if the project has email confirmation off).
 * Copy from page-copy Auth > Register.
 */
export function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(values: RegisterValues) {
    setServerError(null);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: { full_name: values.fullName },
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback`
            : undefined,
      },
    });
    if (error) {
      const taken = error.message.toLowerCase().includes("already");
      setServerError(
        taken
          ? "That email already has an account. Try signing in."
          : error.message,
      );
      return;
    }
    // When email confirmation is on, Supabase returns a user with no session.
    if (data.user && !data.session) {
      setSent(true);
      return;
    }
    window.location.assign("/course");
  }

  if (sent) {
    return (
      <FormAlert tone="success">
        Check your inbox to confirm your email, then sign in to start the course.
      </FormAlert>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-[var(--space-4)]">
      {serverError && <FormAlert tone="error">{serverError}</FormAlert>}
      <TextField
        label="Your name"
        type="text"
        autoComplete="name"
        placeholder="First and last name"
        error={errors.fullName?.message}
        {...register("fullName")}
      />
      <TextField
        label="Email address"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="new-password"
        helper="At least 8 characters, with a number."
        error={errors.password?.message}
        {...register("password")}
      />
      <TextField
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        placeholder="Type it again"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button type="submit" variant="primary" size="large" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Creating account" : "Create account"}
      </Button>
    </form>
  );
}
