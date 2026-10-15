-- ASTBAL Bookings Table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/dsrprfidvqvrzjwabdji/sql

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INT NOT NULL,
  addons TEXT[] DEFAULT '{}',
  special_requests TEXT,
  total INT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow all operations (for development)
CREATE POLICY IF NOT EXISTS "Allow all" ON bookings FOR ALL USING (true);

-- Index for faster availability queries
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings (check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings (status);
