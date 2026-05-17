/*
  # Harden RLS and revoke SELECT for anon/authenticated

  1. Tightens the leads INSERT policy so it no longer accepts arbitrary input
     (replaces a `WITH CHECK (true)` policy with validated checks for email,
     name, type, message, and budget length bounds).
  2. Removes the broad SELECT policies on chat_messages and form_submissions
     so the tables are no longer discoverable via the GraphQL schema by
     anon or authenticated.
  3. Explicitly revokes table-level SELECT (and other unintended grants) on
     chat_messages, form_submissions, and leads from anon and authenticated.
     INSERT remains granted so the marketing site can still write submissions
     under the validated RLS policies. Reads remain available exclusively to
     the service_role key (used by trusted backend/admin contexts).

  ## Tables affected
    - public.leads (policy replaced; SELECT revoked)
    - public.chat_messages (SELECT policy dropped; SELECT revoked)
    - public.form_submissions (SELECT policy dropped; SELECT revoked)

  ## Security notes
    1. No data is deleted.
    2. Anonymous and signed-in users can no longer enumerate rows from
       these tables. Inserts continue to work because the INSERT policies
       and grants are preserved.
    3. Reads should be performed via the service role from a trusted
       environment (e.g. an admin tool or Edge Function).
*/

DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

CREATE POLICY "Validated public insert of leads"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND length(email) <= 255
    AND name IS NOT NULL
    AND length(btrim(name)) >= 1
    AND length(name) <= 200
    AND type IS NOT NULL
    AND length(type) <= 100
    AND (message IS NULL OR length(message) <= 5000)
    AND (budget IS NULL OR length(budget) <= 100)
  );

DROP POLICY IF EXISTS "Allow public read access to chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Only authenticated users can read submissions" ON public.form_submissions;

REVOKE SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.chat_messages FROM anon, authenticated;
REVOKE SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.form_submissions FROM anon, authenticated;
REVOKE SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.leads FROM anon, authenticated;
