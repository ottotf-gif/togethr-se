/*
  # Revoke SELECT on waitlist and inquiries from anon and authenticated roles

  These tables are write-only from the client side (public forms).
  Revoking SELECT prevents them from appearing in the GraphQL schema
  for both anonymous and signed-in users, closing the discovery leak.

  No data is lost — existing INSERT policies remain intact.
*/

REVOKE SELECT ON TABLE public.waitlist FROM anon, authenticated;
REVOKE SELECT ON TABLE public.inquiries FROM anon, authenticated;
