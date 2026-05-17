/*
  # Fix Security Issues

  ## Changes
  
  1. **Remove Unused Index**
    - Drop `idx_chat_messages_created_at` as it's not being used in queries
    - Keep `idx_chat_messages_session_id` which is used for fetching conversation history
  
  2. **Improve RLS Policies for chat_messages**
    - Replace unrestricted INSERT policy with validated policy that checks:
      - Message content is not empty
      - Sender is valid ('user' or 'agent')
      - Session ID is provided and reasonable length (1-255 chars)
    - This maintains public access while preventing abuse
  
  3. **Improve RLS Policies for form_submissions**
    - Replace unrestricted INSERT policy with validated policy that checks:
      - All required fields are not empty
      - Email format is valid (basic check)
      - Name is reasonable length (1-200 chars)
    - This maintains public form submission while preventing spam/abuse
  
  ## Security Notes
  - Tables remain publicly accessible for anonymous users (required for demo/form functionality)
  - Added validation prevents empty submissions and basic abuse patterns
  - Consider adding rate limiting at application or edge function level for production
*/

-- Drop unused index on chat_messages
DROP INDEX IF EXISTS idx_chat_messages_created_at;

-- Update chat_messages INSERT policy with validation
DROP POLICY IF EXISTS "Allow public insert of chat messages" ON chat_messages;

CREATE POLICY "Allow validated public insert of chat messages"
  ON chat_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Ensure message is not empty
    message IS NOT NULL AND 
    trim(message) != '' AND 
    length(message) <= 10000 AND
    -- Ensure sender is valid
    sender IN ('user', 'agent') AND
    -- Ensure session_id is provided and reasonable
    session_id IS NOT NULL AND
    length(session_id) >= 1 AND
    length(session_id) <= 255
  );

-- Update form_submissions INSERT policy with validation
DROP POLICY IF EXISTS "Anyone can insert form submissions" ON form_submissions;

CREATE POLICY "Allow validated form submissions"
  ON form_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Validate required fields are not empty
    name IS NOT NULL AND 
    trim(name) != '' AND 
    length(name) >= 1 AND
    length(name) <= 200 AND
    -- Validate email format (basic check)
    email IS NOT NULL AND
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
    length(email) <= 255 AND
    -- Validate other required fields
    ai_help IS NOT NULL AND 
    trim(ai_help) != '' AND
    length(ai_help) <= 2000 AND
    communication IS NOT NULL AND 
    trim(communication) != '' AND
    length(communication) <= 500 AND
    -- Special requests is optional but limit length if provided
    (special_requests IS NULL OR length(special_requests) <= 2000)
  );
