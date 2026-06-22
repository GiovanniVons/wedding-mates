"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { NAV_LINKS } from "@/lib/site";

/**
 * MarketingHeader -- chooses the header register per route. The Home page opens
 * on a full-bleed photographic hero, so the header starts transparent (white
 * chrome over the grape scrim) and goes solid on scroll. Every other marketing
 * page is always-solid (grape chrome on the light page). The nav set is the
 * shared NAV_LINKS (Reviews is auto-hidden until it has content).
 */
export function MarketingHeader() {
  const pathname = usePathname();
  const transparent = pathname === "/";
  return (
    <Header transparent={transparent} nav={NAV_LINKS} currentPath={pathname} />
  );
}
