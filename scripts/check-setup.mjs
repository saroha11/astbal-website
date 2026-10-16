// Verifies Supabase + admin env before going live.
// Usage: node --env-file=.env.local scripts/check-setup.mjs
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anon = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // optional
let failed = false;
const ok = (m) => console.log(`  ok    ${m}`);
const bad = (m) => { failed = true; console.log(`  FAIL  ${m}`); };

console.log("Environment");
url ? ok("SUPABASE_URL set") : bad("SUPABASE_URL missing");
service ? ok("SUPABASE_SERVICE_ROLE_KEY set") : bad("SUPABASE_SERVICE_ROLE_KEY missing");
const pw = process.env.ADMIN_PASSWORD;
!pw ? bad("ADMIN_PASSWORD missing") : pw.length < 12 ? bad("ADMIN_PASSWORD should be at least 12 characters") : ok("ADMIN_PASSWORD set");

if (url && service) {
  console.log("Database");
  const admin = createClient(url, service, { auth: { persistSession: false } });
  const { error } = await admin.from("bookings").select("id", { head: true, count: "exact" });
  error ? bad(`service key cannot read bookings table: ${error.message} (did you run supabase-schema.sql?)`) : ok("bookings table reachable with service key");

  if (anon) {
    const pub = createClient(url, anon, { auth: { persistSession: false } });
    const read = await pub.from("bookings").select("id").limit(1);
    const leaked = !read.error && read.data && read.data.length > 0;
    read.error || !leaked ? ok("public anon key cannot read bookings") : bad("public anon key CAN read bookings - run: DROP POLICY IF EXISTS \"Allow all\" ON bookings;");
    const w = await pub.from("bookings").insert({ name: "x", email: "x@x.x", phone: "0", check_in: "2099-01-01", check_out: "2099-01-02", guests: 1, total: 0 });
    w.error ? ok("public anon key cannot write bookings") : bad("public anon key CAN write bookings - remove open policies");
  } else {
    console.log("  skip  anon-key test (set SUPABASE_ANON_KEY to also verify public access is blocked)");
  }
}
console.log(failed ? "\nSetup NOT ready." : "\nSetup looks good.");
process.exit(failed ? 1 : 0);
