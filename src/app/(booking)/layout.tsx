import type { Metadata } from "next";

/**
 * (booking) layout -- the focused single-task surface for the 7-step wizard and
 * the confirmation screen. No marketing header / footer, no sticky Book Now bar
 * (they are already converting). The booking chrome (minimal header) is rendered
 * by the wizard itself. noindex: the wizard is a functional route, not a landing
 * page (robots.ts also disallows /book).
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
