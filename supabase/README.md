# Wedding Mates -- Supabase

This folder holds the database schema for the gated course (auth, course access,
content mirror, progress, orders). The migrations are a **standalone schema**;
they do not reuse any Vonzie Nexus / Portal tables.

> The real Supabase project and keys are a **client decision** and do not exist
> yet. The app code builds and runs without them (with safe placeholder env), but
> it cannot authenticate until a real project is provisioned and these migrations
> are applied. See "What the client must provide" at the bottom.

## Migrations (apply in order)

| File | What it creates |
|---|---|
| `001_course_foundation.sql` | enums (`user_role`, `access_status`, `order_status`), `profiles` (+ auto-create trigger on `auth.users`), `course_access`, `is_admin()`, `has_course_access()`, RLS, admin bootstrap for `sarah@letsgetwed.com.au`. |
| `002_course_content.sql` | `modules`, `module_downloads`, `readings`. Gated read (`has_course_access() OR is_admin()`). Mirrors `src/content/course.ts`. |
| `003_progress.sql` | `lesson_progress` (PK `user_id, module_id`). User-owned. |
| `004_orders.sql` | `orders` (base $950 AUD = 95000 cents, jsonb extras, Stripe + wedding fields). User reads own; writes via service role. |

Every migration is **idempotent** (DO-block guards, `IF NOT EXISTS`), so a
re-run is safe.

## How to apply

### Option A -- Supabase SQL editor (simplest)
1. Create a project at https://supabase.com.
2. Open **SQL Editor** in the dashboard.
3. Paste and run each file **in order**: `001`, `002`, `003`, `004`.

### Option B -- Supabase CLI
```bash
# from this project root
npm i -g supabase                 # if not installed
supabase link --project-ref <your-project-ref>
supabase db push                  # applies everything in supabase/migrations
```
(The CLI applies files in lexical order; the `001..004` prefixes guarantee the
correct sequence.)

### Option C -- psql
```bash
psql "<your-connection-string>" -f supabase/migrations/001_course_foundation.sql
psql "<your-connection-string>" -f supabase/migrations/002_course_content.sql
psql "<your-connection-string>" -f supabase/migrations/003_progress.sql
psql "<your-connection-string>" -f supabase/migrations/004_orders.sql
```

## After applying

1. **Set the env vars** (copy `.env.example` to `.env.local`, fill real values):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only; never exposed to the browser)
2. **Promote the admin:** the bootstrap in `001` only runs if Sarah's
   `auth.users` row already exists. If you create her account afterwards, re-run
   the final `UPDATE profiles ... WHERE email = 'sarah@letsgetwed.com.au'` block,
   or set `role = 'admin'` on her `profiles` row manually.
3. **Auth settings:** in the dashboard, set the Site URL and the redirect URLs to
   include `<your-domain>/auth/callback` (and `http://localhost:5067/auth/callback`
   for local testing), and configure SMTP for the password-reset emails.
4. **Granting course access:** access is granted by inserting/updating a
   `course_access` row with `status = 'active'` using the **service-role** client.
   This is the Stripe webhook's job (next build batch). RLS blocks all client
   writes to `course_access`, by design.

## What the client must provide before auth works

- A **Supabase project** (URL + anon key + service-role key).
- These **four migrations applied** in order.
- **Auth redirect URLs** and **SMTP** configured for reset emails.
- Once the above exist and `NEXT_PUBLIC_SUPABASE_URL` points at the real project,
  the DEV preview gating bypass (`NEXT_PUBLIC_PREVIEW_GATING`) is automatically
  ignored and the gate is fully enforced.
