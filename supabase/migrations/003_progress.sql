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
