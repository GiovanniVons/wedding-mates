import type { Metadata } from "next";
import { AuthShell } from "@/components/ui/AuthShell";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <AuthShell
      chip="Members"
      heading="Welcome back"
      footer={
        <>
          <a href="/forgot-password">Forgot password?</a>
          <span style={{ color: "var(--color-grape-soft)" }}>
            New here? <a href="/register">Create account</a>
          </span>
        </>
      }
    >
      <p
        style={{
          margin: 0,
          marginTop: "calc(var(--space-4) * -1)",
          color: "var(--color-grape-soft)",
          fontSize: "var(--font-size-text-main)",
        }}
      >
        Sign in to pick up where you left off.
      </p>
      <LoginForm />
    </AuthShell>
  );
}
