import type { Metadata } from "next";
import { AuthShell } from "@/components/ui/AuthShell";
import { RegisterForm } from "./RegisterForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Create your account",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <AuthShell
      chip="Members"
      heading="Create your account"
      footer={
        <span style={{ color: "var(--color-grape-soft)" }}>
          Already have an account? <a href="/login">Sign in</a>
        </span>
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
        Set up your login so you can start the course.
      </p>
      <RegisterForm />
      <p
        style={{
          margin: 0,
          color: "var(--color-grape-soft)",
          fontSize: "var(--font-size-text-small)",
          lineHeight: "var(--line-height-relaxed)",
        }}
      >
        Most accounts are set up automatically when the couple books. This page
        is for a mate invited to join.
      </p>
    </AuthShell>
  );
}
