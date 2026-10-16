-- ASTBAL bookings. Run in the Supabase SQL editor.
-- All access goes through the Next.js API routes using the service-role key,
-- so RLS is enabled with NO policies: the public anon key can read/write nothing.

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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT bookings_dates_valid CHECK (check_out > check_in)
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- IMPORTANT if you ran the earlier version of this file: remove the open policy.
DROP POLICY IF EXISTS "Allow all" ON bookings;

CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings (check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings (status);
