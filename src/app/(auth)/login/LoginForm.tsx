"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { FormAlert } from "@/components/ui/FormAlert";
import { createClient } from "@/lib/supabase/client";
import { loginSchema, type LoginValues } from "@/lib/auth/schemas";

/**
 * LoginForm -- email + password sign-in against the Supabase browser client.
 * On success, redirects to /course (full reload so the middleware/session is
 * picked up server-side). Copy from page-copy Auth > Login.
 */
export function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginValues) {
    setServerError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      const tooMany = error.message.toLowerCase().includes("too many");
      setServerError(
        tooMany
          ? "Too many tries. Wait a moment, then try again or reset your password."
          : "That email or password did not match. Give it another go.",
      );
      return;
    }
    window.location.assign("/course");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-[var(--space-4)]">
      {serverError && <FormAlert tone="error">{serverError}</FormAlert>}
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
        autoComplete="current-password"
        placeholder="Your password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Button type="submit" variant="primary" size="large" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Signing in" : "Sign in"}
      </Button>
    </form>
  );
}
