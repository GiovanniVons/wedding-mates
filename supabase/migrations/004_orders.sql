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
