-- KASHITE: loans table with RLS policies
-- Created: 2026-02-15

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create loans table
CREATE TABLE IF NOT EXISTS loans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL CHECK (char_length(item_name) <= 100),
  borrower_name TEXT NOT NULL CHECK (char_length(borrower_name) <= 50),
  memo TEXT CHECK (char_length(memo) <= 500),
  lent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  returned_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'returned')),
  share_token UUID NOT NULL DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS loans_user_id_idx ON loans(user_id);
CREATE INDEX IF NOT EXISTS loans_status_idx ON loans(status);
CREATE INDEX IF NOT EXISTS loans_share_token_idx ON loans(share_token);
CREATE INDEX IF NOT EXISTS loans_lent_at_idx ON loans(lent_at DESC);
CREATE INDEX IF NOT EXISTS loans_user_status_idx ON loans(user_id, status);

-- Enable Row Level Security
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can view their own loans
CREATE POLICY "Users can view own loans"
  ON loans
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own loans
CREATE POLICY "Users can insert own loans"
  ON loans
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own loans
CREATE POLICY "Users can update own loans"
  ON loans
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own loans
CREATE POLICY "Users can delete own loans"
  ON loans
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Anonymous users can view limited loan info via share_token
CREATE POLICY "Anyone can view shared loan info"
  ON loans
  FOR SELECT
  TO anon
  USING (share_token IS NOT NULL);

-- Note: The share endpoint should only return item_name, borrower_name, lent_at
-- This is enforced at the application level, not RLS

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_loans_updated_at
  BEFORE UPDATE ON loans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON loans TO authenticated;
GRANT SELECT ON loans TO anon;
