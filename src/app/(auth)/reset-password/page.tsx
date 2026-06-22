import type { Metadata } from "next";
import { AuthShell } from "@/components/ui/AuthShell";
import { ResetForm } from "./ResetForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Set a new password",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <AuthShell chip="Members" heading="Set a new password">
      <p
        style={{
          margin: 0,
          marginTop: "calc(var(--space-4) * -1)",
          color: "var(--color-grape-soft)",
          fontSize: "var(--font-size-text-main)",
        }}
      >
        Choose a new password for your account.
      </p>
      <ResetForm />
    </AuthShell>
  );
}
