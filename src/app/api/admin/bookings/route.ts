import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// GET /api/admin/bookings - protected by src/proxy.ts
export async function GET() {
  const { data, error } = await getSupabase()
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Admin list error:", error);
    return NextResponse.json({ error: "Could not load bookings" }, { status: 500 });
  }
  return NextResponse.json({ bookings: data ?? [] });
}
