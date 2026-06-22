import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

/**
 * server.ts -- the SSR (cookie-based) Supabase client and the service-role
 * client. Copy-adapted from the Vonzie Portal. Wedding Mates is its own
 * single-domain app, so the Portal's `.vonzie.app` shared-subdomain cookie
 * logic is dropped entirely; the session cookie is host-only everywhere.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component -- middleware handles refresh.
          }
        },
      },
    },
  );
}

/**
 * Service-role client -- bypasses RLS entirely. Used only by trusted server
 * code (the Stripe webhook that grants course access, admin operations). Never
 * import this into a client component or expose its key to the browser.
 */
export function createServiceClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {},
      },
    },
  );
}
