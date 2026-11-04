import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { isAdminRequest } from "@/lib/adminSession";

// PATCH /api/admin/bookings/[id] - gated by src/proxy.ts and re-checked here (defence in depth).
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const bookingId = Number(id);
  if (!Number.isInteger(bookingId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const status = body?.status;
  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const supabase = getSupabase();

  if (status === "confirmed") {
    const { data: current } = await supabase
      .from("bookings")
      .select("check_in, check_out")
      .eq("id", bookingId)
      .single();
    if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const { data: clash } = await supabase
      .from("bookings")
      .select("id")
      .eq("status", "confirmed")
      .neq("id", bookingId)
      .lt("check_in", current.check_out)
      .gt("check_out", current.check_in)
      .limit(1);
    if (clash && clash.length > 0) {
      return NextResponse.json(
        { error: "Overlaps another confirmed booking" },
        { status: 409 }
      );
    }
  }

  const { data, error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error("Admin update error:", error);
    return NextResponse.json({ error: "Could not update booking" }, { status: 500 });
  }
  return NextResponse.json({ booking: data });
}
