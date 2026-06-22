import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

/**
 * /auth/callback -- exchanges the PKCE / recovery code for a session, then
 * redirects (default /course; ?next overrides, e.g. /reset-password from the
 * forgot-password flow). Copy-adapted from the Vonzie Portal callback with the
 * `.vonzie.app` COOKIE_DOMAIN removed (single-domain app) and the default
 * destination changed to /course.
 *
 * This route is excluded from the middleware matcher so it runs its own code
 * exchange untouched.
 */
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/course";
  const origin = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=Missing+auth+code`);
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
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
            // Ignore -- can happen in certain server contexts.
          }
        },
      },
    },
  );

  try {
    const { error } = await Promise.race([
      supabase.auth.exchangeCodeForSession(code),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout: code exchange took >10s")), 10_000),
      ),
    ]);

    if (error) {
      if (error.message.includes("flow state")) {
        return NextResponse.redirect(
          `${origin}/login?message=${encodeURIComponent("Email confirmed. Please sign in to continue.")}`,
        );
      }
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent(error.message)}`,
      );
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Code exchange failed";
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(message)}`,
    );
  }

  return NextResponse.redirect(`${origin}${next}`);
}
