# Wedding Mates — Deploy Guide

The repo (`github.com/GiovanniVons/wedding-mates`) is deploy-ready: server runtime, no static export, the Stripe webhook is a Node serverless route. This guide gets it live on a real domain.

## Host: Netlify via GitHub (chosen)

Deploying to **Netlify**, auto-building on push to `main`. Netlify natively supports **Next.js 16 with zero config** (it auto-detects Next and runs the App Router + route handlers as serverless functions via its OpenNext-based runtime). The build is on Next 16.2.9, past the 16.2.6 security patch Netlify recommends, so there is no version issue. `netlify.toml` just pins the build command.

> Do NOT add `output: 'export'` to `next.config.ts` -- that would break the Stripe webhook, auth, and the gated course. (Vercel is a drop-in alternative if ever needed: import the repo, set the same env vars, zero-config.)

## Environment variables (set in the host dashboard, never in the repo)

`.env.local` is gitignored. Set these in the host's Environment settings.

| Var | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://<prod-domain>` | **Change from localhost.** Drives Stripe success/cancel URLs, canonicals, OG, and the no-tracking-on-localhost gate. |
| `NEXT_PUBLIC_SUPABASE_URL` | the Supabase project URL | public (inlined at build) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | the Supabase anon (legacy JWT) | public (inlined at build) |
| `SUPABASE_SERVICE_ROLE_KEY` | the Supabase service_role (legacy JWT) | **secret** — webhook account creation + access grant |
| `STRIPE_SECRET_KEY` | `sk_live_…` (or `sk_test_…` first) | **secret** |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` from the Stripe webhook endpoint | **secret** |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_…` / `pk_test_…` | public |
| `RESEND_API_KEY` | `re_…` | **secret** |
| `EMAIL_FROM` | `Wedding Mates <hello@letsgetwed.com.au>` | domain must be verified in Resend |
| `SUPPORT_EMAIL` | `sarah@letsgetwed.com.au` | |
| `SUPPORT_WHATSAPP` | `0410 820 300` | |
| `ONBOARDING_CALL_URL` | the Calendly/Cal.com link | optional; falls back gracefully if unset |

> `NEXT_PUBLIC_*` vars are inlined at **build** time, so changing them requires a **redeploy**, not just a restart.

## Steps

### Vercel
1. Import `GiovanniVons/wedding-mates` at vercel.com → New Project (Next.js auto-detected).
2. Add all env vars above (Production scope).
3. Deploy. Note the production URL; set `NEXT_PUBLIC_SITE_URL` to it (or the custom domain) and redeploy.

### Netlify
1. New site from Git → pick the repo. `netlify.toml` sets the build command + Next runtime.
2. Add all env vars above (Site settings → Environment).
3. Deploy. If the build errors on the Next 16 version, see "Host choice" above.

## Stripe webhook (after first deploy)
1. Stripe Dashboard → Developers → Webhooks → **Add endpoint**: `https://<prod-domain>/api/stripe/webhook`.
2. Events: `checkout.session.completed`, `charge.refunded`.
3. Copy the **Signing secret** (`whsec_…`) → set `STRIPE_WEBHOOK_SECRET` in the host → redeploy.
4. Test mode first: run a `sk_test`/`pk_test` deploy, complete a test booking with card `4242 4242 4242 4242`, and confirm the order → account → course-access → emails chain. Then flip to live keys.

## Resend
1. Verify the `letsgetwed.com.au` sending domain in Resend (SPF/DKIM DNS records).
2. Set `RESEND_API_KEY` + `EMAIL_FROM` in the host.

## Post-deploy verification
- `https://<domain>/` renders; `/robots.txt` + `/sitemap.xml` show the prod domain.
- `/course` (logged out) → redirects to `/login`; a real purchase grants access.
- Stripe test booking → confirmation page + the 5 emails arrive.
- `/design-book`, `/course/*`, auth + booking routes are noindex/disallowed.
- Run the pre-launch checklist (CTA destination audit, dead-file sweep, footer legal links, third-party widget check) and integrate Vonzie Nexus CMP + consent-gated analytics.

## Custom domain
Point `letsgetwed.com.au` (or the chosen domain) at the host, set it as `NEXT_PUBLIC_SITE_URL`, redeploy, and add `https://<domain>/auth/callback` to the Supabase Auth redirect URLs.
