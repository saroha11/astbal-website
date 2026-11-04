import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { isAdminRequest } from "@/lib/adminSession";

export const dynamic = "force-dynamic";

// GET /api/admin/bookings - gated by src/proxy.ts and re-checked here (defence in depth).
export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
