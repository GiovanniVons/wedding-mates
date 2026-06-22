import type { Metadata } from "next";

/**
 * (auth) layout -- the gated-edge surface (login, register, forgot, reset).
 * No marketing header/footer: each page renders its own AuthShell chrome
 * (logo only), per the page-copy Auth direction. noindex: these are functional
 * surfaces, already disallowed in robots.ts.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
