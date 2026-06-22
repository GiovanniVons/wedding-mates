import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * proxy.ts -- the Next 16 request proxy (formerly middleware.ts). Copy-adapted
 * from the Vonzie Portal middleware.
 *
 *   - Keeps the PKCE fallback: an auth `?code` that lands on the root URL is
 *     forwarded to /auth/callback for the session exchange.
 *   - Delegates session refresh + the course gate to updateSession().
 *
 * The matcher excludes Next internals (_next/static, _next/image, favicon.ico),
 * the future Stripe webhook (api/stripe/webhook -- its raw body must reach the
 * route untouched for signature verification), and the auth callback (which
 * runs its own code exchange).
 */
export async function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/" &&
    request.nextUrl.searchParams.has("code")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/callback";
    return NextResponse.redirect(url);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|api/stripe/webhook|auth/callback).*)",
  ],
};
