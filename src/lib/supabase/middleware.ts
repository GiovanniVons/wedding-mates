import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isPreviewGatingBypass } from "@/lib/auth/preview";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

/**
 * updateSession -- the Portal `updateSession()` helper, adapted for Wedding
 * Mates. Differences from the Portal version:
 *
 *   - The `.vonzie.app` shared-subdomain cookie-domain logic is dropped; cookies
 *     are host-only on this single-domain app.
 *   - The protected-prefix allow-list is reduced to a single prefix: only
 *     `/course` requires authentication. Everything else (marketing, /book) is
 *     public.
 *   - The auth pages (/login, /register, /forgot-password, /reset-password)
 *     bounce an already-authenticated visitor to /course.
 *
 * DEV-ONLY preview bypass: when NEXT_PUBLIC_PREVIEW_GATING === "off-for-preview"
 * AND no real Supabase project is configured, the middleware does not redirect
 * unauthenticated visitors away from /course (so the gated UI can be previewed
 * locally before the client provisions Supabase). This can never weaken
 * production: the moment real Supabase env vars are present the bypass is
 * ignored. See src/lib/auth/preview.ts.
 */
export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Routes that require authentication. Only the gated course area.
  const needsAuth = pathname === "/course" || pathname.startsWith("/course/");

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

  // Skip the Supabase round-trip entirely for fully public routes.
  if (!needsAuth && !isAuthPage) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Same-origin redirects: use the request's own origin so local dev redirects
  // stay on localhost. NEXT_PUBLIC_SITE_URL is for cross-origin email/Stripe
  // links where there is no request to derive from.
  const baseOrigin = request.nextUrl.origin;

  // Unauthenticated visitor to a gated route -> /login. The preview bypass only
  // applies when there is no real Supabase project (dev preview), never in prod.
  if (!user && needsAuth) {
    if (isPreviewGatingBypass()) {
      return supabaseResponse;
    }
    return NextResponse.redirect(new URL("/login", baseOrigin));
  }

  // Authenticated visitor on an auth page -> /course.
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/course", baseOrigin));
  }

  return supabaseResponse;
}
