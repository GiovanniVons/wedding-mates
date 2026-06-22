-- ============================================================
-- Wedding Mates -- ALL MIGRATIONS, in order (001 -> 004).
-- Paste this whole file into the Supabase SQL editor and Run.
-- Idempotent: safe to run more than once.
-- Generated 2026-06-22 from supabase/migrations/.
-- ============================================================


-- ==================== migrations/001_course_foundation.sql ====================

/*
  # Course Foundation -- Wedding Mates

  1. Overview
    - Standalone schema for the Wedding Mates gated course. Does NOT reuse any
      Vonzie Nexus / Portal tables. Patterns (idempotent DO-blocks, enums, RLS,
      SECURITY DEFINER STABLE helper functions, admin bootstrap) are adapted from
      Nexus migration 024.
    - Safe to run on an empty Supabase project. Every statement is idempotent.

  2. New Enums
    - user_role     -- user, admin
    - access_status -- none, active, refunded
    - order_status  -- pending, paid, refunded, failed (defined here; the orders
                       table that uses it ships in 004)

  3. New Tables
    - profiles       -- one row per auth.users row (auto-created by trigger)
    - course_access  -- per-user gate state; writes only via service role

  4. Functions
    - is_admin()           -- caller has profiles.role = 'admin'
    - has_course_access()  -- caller has an active course_access row

  5. Security
    - RLS on both tables.
    - profiles: user reads/updates own row; is_admin() has full access.
    - course_access: user reads own row; all writes go through the service role
      (the Stripe webhook grants/refunds access). No anon/authenticated write
      policy is created, so RLS denies client writes by default.

  6. Bootstrap
    - sarah@letsgetwed.com.au is promoted to admin if her auth.users row exists.
*/

-- ============================================================================
-- Enums
-- ============================================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('user', 'admin');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'access_status') THEN
    CREATE TYPE access_status AS ENUM ('none', 'active', 'refunded');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
    CREATE TYPE order_status AS ENUM ('pending', 'paid', 'refunded', 'failed');
  END IF;
END $$;

-- ============================================================================
-- profiles
-- ============================================================================
CREATE TABLE IF NOT EXISTS profiles (
  id               uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  full_name        text,
  partner_name     text,
  email            text,
  mobile           text,
  suburb           text,
  preferred_contact text,
  role             user_role NOT NULL DEFAULT 'user',
  created_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles (role);

-- Auto-create a profiles row whenever a new auth.users row is inserted. The
-- function is SECURITY DEFINER so it can write to profiles regardless of the
-- inserting context. full_name / partner_name / mobile are pulled from the
-- signup metadata when present.
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, partner_name, mobile)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'partner_name',
    NEW.raw_user_meta_data ->> 'mobile'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================================
-- course_access
-- ============================================================================
CREATE TABLE IF NOT EXISTS course_access (
  user_id    uuid PRIMARY KEY REFERENCES profiles (id) ON DELETE CASCADE,
  status     access_status NOT NULL DEFAULT 'none',
  order_id   uuid,
  granted_at timestamptz,
  source     text
);

CREATE INDEX IF NOT EXISTS idx_course_access_status ON course_access (status);

-- ============================================================================
-- Helper functions (SECURITY DEFINER STABLE)
-- ============================================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
      AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION has_course_access()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM course_access
    WHERE user_id = auth.uid()
      AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ============================================================================
-- RLS -- profiles
-- ============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'profiles' AND policyname = 'Users read own profile'
  ) THEN
    CREATE POLICY "Users read own profile"
      ON profiles FOR SELECT
      TO authenticated
      USING (id = auth.uid() OR is_admin());
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'profiles' AND policyname = 'Users update own profile'
  ) THEN
    CREATE POLICY "Users update own profile"
      ON profiles FOR UPDATE
      TO authenticated
      USING (id = auth.uid() OR is_admin())
      WITH CHECK (id = auth.uid() OR is_admin());
  END IF;
END $$;

-- Admins may insert/delete profiles (e.g. manual provisioning). Normal rows are
-- created by the trigger under SECURITY DEFINER, so no broad insert policy is
-- needed for ordinary signups.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'profiles' AND policyname = 'Admins insert profiles'
  ) THEN
    CREATE POLICY "Admins insert profiles"
      ON profiles FOR INSERT
      TO authenticated
      WITH CHECK (is_admin());
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'profiles' AND policyname = 'Admins delete profiles'
  ) THEN
    CREATE POLICY "Admins delete profiles"
      ON profiles FOR DELETE
      TO authenticated
      USING (is_admin());
  END IF;
END $$;

-- ============================================================================
-- RLS -- course_access
-- ============================================================================
ALTER TABLE course_access ENABLE ROW LEVEL SECURITY;

-- User can read their own gate state (and admins can read all). There is NO
-- write policy for authenticated/anon, so RLS denies all client writes; only
-- the service-role client (which bypasses RLS) grants or refunds access.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'course_access' AND policyname = 'Users read own access'
  ) THEN
    CREATE POLICY "Users read own access"
      ON course_access FOR SELECT
      TO authenticated
      USING (user_id = auth.uid() OR is_admin());
  END IF;
END $$;

-- ============================================================================
-- Admin bootstrap
-- ============================================================================
UPDATE profiles
SET role = 'admin'
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'sarah@letsgetwed.com.au'
);

-- Documentation
COMMENT ON TABLE profiles IS 'One row per auth.users row, auto-created on signup by handle_new_user().';
COMMENT ON TABLE course_access IS 'Per-user course gate state. Writes only via the service-role client (Stripe webhook).';
COMMENT ON FUNCTION has_course_access() IS 'True iff the caller has a course_access row with status = active.';
COMMENT ON FUNCTION is_admin() IS 'True iff the caller profiles.role = admin.';


-- ==================== migrations/002_course_content.sql ====================

/*
  # Course Content -- Wedding Mates

  1. Overview
    - The structured course content the gated app renders. The canonical source
      of this content lives in src/content/course.ts; these tables mirror it so
      the content can optionally be served from / edited in the database later.
    - All three tables are gated: SELECT is allowed only to a caller who has
      active course access (or is an admin). Patterns adapted from Nexus 024.
    - Depends on 001 (has_course_access(), is_admin()).

  2. New Tables
    - modules           -- Introduction + 8 modules
    - module_downloads  -- per-module resource links (Canva / Drive / pending)
    - readings          -- the readings library (grouped by category)

  3. Security
    - RLS on all three. SELECT USING (has_course_access() OR is_admin()).
    - No client write policies; content is seeded / maintained by the service
      role or an admin tool. RLS denies authenticated/anon writes by default.
*/

-- ============================================================================
-- modules
-- ============================================================================
CREATE TABLE IF NOT EXISTS modules (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text NOT NULL UNIQUE,
  order_index integer NOT NULL DEFAULT 0,
  title       text NOT NULL,
  subtitle    text,
  body_md     text,
  is_intro    boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_modules_order ON modules (order_index);

-- ============================================================================
-- module_downloads
-- ============================================================================
CREATE TABLE IF NOT EXISTS module_downloads (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id   uuid NOT NULL REFERENCES modules (id) ON DELETE CASCADE,
  label       text NOT NULL,
  url         text,            -- nullable: pending downloads render as "coming soon"
  kind        text,            -- 'canva' | 'drive' | 'pending' | other
  order_index integer NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_module_downloads_module ON module_downloads (module_id);

-- ============================================================================
-- readings (the readings library)
-- ============================================================================
CREATE TABLE IF NOT EXISTS readings (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category    text NOT NULL,
  title       text NOT NULL,
  url         text,
  order_index integer NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_readings_order ON readings (order_index);

-- ============================================================================
-- RLS -- gated SELECT on all three
-- ============================================================================
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'modules' AND policyname = 'Course access reads modules'
  ) THEN
    CREATE POLICY "Course access reads modules"
      ON modules FOR SELECT
      TO authenticated
      USING (has_course_access() OR is_admin());
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'module_downloads' AND policyname = 'Course access reads downloads'
  ) THEN
    CREATE POLICY "Course access reads downloads"
      ON module_downloads FOR SELECT
      TO authenticated
      USING (has_course_access() OR is_admin());
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'readings' AND policyname = 'Course access reads readings'
  ) THEN
    CREATE POLICY "Course access reads readings"
      ON readings FOR SELECT
      TO authenticated
      USING (has_course_access() OR is_admin());
  END IF;
END $$;

COMMENT ON TABLE modules IS 'Course modules. Mirrors src/content/course.ts. Gated read.';
COMMENT ON TABLE module_downloads IS 'Per-module resource links. url is null for the 2 pending downloads.';
COMMENT ON TABLE readings IS 'The readings library (Module 5). Gated read.';


-- ==================== migrations/003_progress.sql ====================

/*
  # Lesson Progress -- Wedding Mates

  1. Overview
    - Tracks which modules a user has marked complete. One row per
      (user, module). Patterns adapted from Nexus 024.
    - Depends on 001 (profiles, is_admin()).

  2. New Table
    - lesson_progress -- PK (user_id, module_id)

  3. Security
    - RLS: the user fully owns their own progress rows (select/insert/update/
      delete). Admins may read all (for support). The module_id is stored as the
      content slug-or-id the app uses; it is not FK-constrained to modules so
      progress works whether content is served from the DB or from
      src/content/course.ts.
*/

CREATE TABLE IF NOT EXISTS lesson_progress (
  user_id      uuid NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  module_id    text NOT NULL,
  completed    boolean NOT NULL DEFAULT false,
  completed_at timestamptz,
  PRIMARY KEY (user_id, module_id)
);

CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON lesson_progress (user_id);

ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'lesson_progress' AND policyname = 'Users read own progress'
  ) THEN
    CREATE POLICY "Users read own progress"
      ON lesson_progress FOR SELECT
      TO authenticated
      USING (user_id = auth.uid() OR is_admin());
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'lesson_progress' AND policyname = 'Users insert own progress'
  ) THEN
    CREATE POLICY "Users insert own progress"
      ON lesson_progress FOR INSERT
      TO authenticated
      WITH CHECK (user_id = auth.uid());
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'lesson_progress' AND policyname = 'Users update own progress'
  ) THEN
    CREATE POLICY "Users update own progress"
      ON lesson_progress FOR UPDATE
      TO authenticated
      USING (user_id = auth.uid())
      WITH CHECK (user_id = auth.uid());
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'lesson_progress' AND policyname = 'Users delete own progress'
  ) THEN
    CREATE POLICY "Users delete own progress"
      ON lesson_progress FOR DELETE
      TO authenticated
      USING (user_id = auth.uid());
  END IF;
END $$;

COMMENT ON TABLE lesson_progress IS 'Per-user module completion. PK (user_id, module_id). User-owned.';


-- ==================== migrations/004_orders.sql ====================

/*
  # Orders -- Wedding Mates

  1. Overview
    - The booking + payment record. Created by the booking wizard / Stripe
      webhook (next batch). Defined now so the schema is complete and the gate
      can reference order_id. Patterns adapted from Nexus 024.
    - Depends on 001 (profiles, order_status enum, is_admin()).

  2. New Table
    - orders -- one row per booking. Base package is $950 AUD (95000 cents);
      extras are stored as jsonb and rolled into total_amount_cents.

  3. Security
    - RLS: a signed-in user reads their own orders (matched by user_id). Admins
      read all. All writes go through the service-role client (the Stripe
      webhook), so there is no authenticated/anon write policy and RLS denies
      client writes by default. The webhook also links the order to the buyer's
      profile and grants course_access.
*/

CREATE TABLE IF NOT EXISTS orders (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid REFERENCES profiles (id) ON DELETE SET NULL,
  email               text NOT NULL,
  status              order_status NOT NULL DEFAULT 'pending',
  base_amount_cents   integer NOT NULL DEFAULT 95000,
  extras              jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_amount_cents  integer,
  currency            text NOT NULL DEFAULT 'aud',
  stripe_session_id   text,
  stripe_payment_intent text,
  wedding_date        date,
  partner_name        text,
  mobile              text,
  suburb              text,
  preferred_contact   text,
  celebrant_name      text,
  celebrant_email     text,
  celebrant_phone     text,
  ceremony_location   text,
  created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders (user_id);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders (email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session ON orders (stripe_session_id);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'orders' AND policyname = 'Users read own orders'
  ) THEN
    CREATE POLICY "Users read own orders"
      ON orders FOR SELECT
      TO authenticated
      USING (user_id = auth.uid() OR is_admin());
  END IF;
END $$;

COMMENT ON TABLE orders IS 'Booking + payment record. Writes via service role (Stripe webhook). User reads own.';
COMMENT ON COLUMN orders.base_amount_cents IS 'Base Wedding Mates package, $950 AUD = 95000 cents.';
COMMENT ON COLUMN orders.extras IS 'Selected paid extras as jsonb array (label + amount_cents).';

