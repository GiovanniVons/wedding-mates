import type { Metadata } from "next";
import { AuthShell } from "@/components/ui/AuthShell";
import { ForgotForm } from "./ForgotForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reset your password",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      chip="Members"
      heading="Reset your password"
      footer={<a href="/login">Back to sign in</a>}
    >
      <p
        style={{
          margin: 0,
          marginTop: "calc(var(--space-4) * -1)",
          color: "var(--color-grape-soft)",
          fontSize: "var(--font-size-text-main)",
        }}
      >
        Enter your email and we&apos;ll send a reset link.
      </p>
      <ForgotForm />
    </AuthShell>
  );
}
