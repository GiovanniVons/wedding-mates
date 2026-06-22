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
