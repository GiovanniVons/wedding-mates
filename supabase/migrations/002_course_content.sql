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
