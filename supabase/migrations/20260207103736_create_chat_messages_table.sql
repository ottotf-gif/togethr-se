/*
  # Create chat messages table

  1. New Tables
    - `chat_messages`
      - `id` (uuid, primary key) - Unique identifier for each message
      - `session_id` (text) - Session identifier to group messages by conversation
      - `message` (text) - The actual message content
      - `sender` (text) - Either 'user' or 'agent' to identify who sent the message
      - `created_at` (timestamptz) - Timestamp when the message was created
      - `webhook_sent` (boolean) - Flag to track if message was sent to webhook
      - `webhook_response` (jsonb) - Store webhook response data (optional)
  
  2. Security
    - Enable RLS on `chat_messages` table
    - Add policy for public read access (for demo purposes)
    - Add policy for public insert access (for demo purposes)
    
  Note: In production, you would want to restrict access based on authentication
*/

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  message text NOT NULL,
  sender text NOT NULL CHECK (sender IN ('user', 'agent')),
  created_at timestamptz DEFAULT now(),
  webhook_sent boolean DEFAULT false,
  webhook_response jsonb
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to chat messages"
  ON chat_messages
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public insert of chat messages"
  ON chat_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);