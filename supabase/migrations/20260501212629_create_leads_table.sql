/*
  # Create leads table for app waitlist and service inquiries

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `email` (text, required) - contact email
      - `name` (text, optional) - lead name
      - `type` (text, required) - either 'waitlist' or 'inquiry'
      - `message` (text, optional) - inquiry details / project description
      - `budget` (text, optional) - estimated budget for service inquiries
      - `created_at` (timestamptz) - submission timestamp

  2. Security
    - Enable RLS on `leads` table
    - Allow anonymous users to INSERT leads (so the public marketing site can capture submissions)
    - No SELECT/UPDATE/DELETE policies — data is private to the project owner via service role only

  3. Notes
    - Anonymous insert is the standard pattern for public marketing forms
    - Owner can read submissions via Supabase dashboard (uses service role)
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text DEFAULT '',
  type text NOT NULL DEFAULT 'waitlist',
  message text DEFAULT '',
  budget text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
