"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * client.ts -- the browser Supabase client. Copy-adapted from the Vonzie
 * Portal with the `.vonzie.app` production COOKIE_DOMAIN removed: Wedding Mates
 * runs on its own domain, so cookies stay host-only and need no domain option.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
