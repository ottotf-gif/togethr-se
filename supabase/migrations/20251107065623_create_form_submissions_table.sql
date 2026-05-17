/*
  # Create form_submissions table

  1. New Tables
    - `form_submissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `ai_help` (text)
      - `communication` (text)
      - `special_requests` (text)
      - `email` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `form_submissions` table
    - Allow anyone to insert new submissions
    - Allow only authenticated users to read submissions
*/

CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  ai_help text NOT NULL,
  communication text NOT NULL,
  special_requests text,
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert form submissions"
  ON form_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can read submissions"
  ON form_submissions
  FOR SELECT
  TO authenticated
  USING (true);
