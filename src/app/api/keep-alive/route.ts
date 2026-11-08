import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// GET /api/keep-alive
// Hit once a day by a Vercel Cron (see vercel.json). It makes one tiny database
// query so the Supabase project never counts as idle and gets auto-paused on the
// free plan. Returns no data, only a status.
export async function GET() {
  try {
    const { error } = await getSupabase()
      .from("bookings")
      .select("id", { count: "exact", head: true });
    if (error) throw error;
    return NextResponse.json({ ok: true, ts: new Date().toISOString() });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
