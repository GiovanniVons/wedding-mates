import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isDemoMode } from "@/lib/auth/preview";

/**
 * /demo -- a tidy, shareable entry into the no-account course walkthrough.
 * When NEXT_PUBLIC_DEMO_MODE is on, it drops the visitor straight into the
 * first lesson (the gating layout renders the "Demo preview" banner). When the
 * flag is off (the live selling storefront), there is nothing to demo, so it
 * sends them to the booking flow instead. noindex either way.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DemoEntry() {
  redirect(isDemoMode() ? "/course/introduction" : "/book");
}
