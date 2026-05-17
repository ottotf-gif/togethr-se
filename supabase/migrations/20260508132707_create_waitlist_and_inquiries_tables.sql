/*
  # Split leads into separate waitlist and inquiries tables

  1. New Tables
    - `waitlist` — early access / coming-soon signups
      - `id` (uuid, primary key)
      - `email` (text, required)
      - `name` (text, default '')
      - `company` (text, default '')
      - `source` (text, default '') — where the signup came from (e.g. 'home', 'websites')
      - `created_at` (timestamptz, default now())
    - `inquiries` — project inquiries from the websites page
      - `id` (uuid, primary key)
      - `name` (text, default '')
      - `email` (text, required)
      - `plan` (text, default '') — selected plan from the inquiry form
      - `message` (text, default '')
      - `created_at` (timestamptz, default now())

  2. Security
    - RLS enabled on both tables.
    - Anonymous and authenticated visitors may INSERT only — needed for the public
      forms on the marketing site.
    - No SELECT/UPDATE/DELETE policies are added, so reads/writes from the
      browser are blocked. Only the service role (server-side / dashboard)
      can read submissions.

  3. Notes
    - The existing `leads` table is left intact so historical data is preserved.
    - New form submissions will be routed to the new tables by the frontend.
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text DEFAULT '',
  company text DEFAULT '',
  source text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'waitlist'
      AND policyname = 'Anyone can join the waitlist'
  ) THEN
    CREATE POLICY "Anyone can join the waitlist"
      ON waitlist
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (email IS NOT NULL AND length(email) > 0);
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text DEFAULT '',
  email text NOT NULL,
  plan text DEFAULT '',
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'inquiries'
      AND policyname = 'Anyone can submit an inquiry'
  ) THEN
    CREATE POLICY "Anyone can submit an inquiry"
      ON inquiries
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (email IS NOT NULL AND length(email) > 0);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON waitlist (created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at DESC);
