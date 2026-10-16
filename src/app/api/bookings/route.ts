import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { bookingSchema, hasBlockedNight } from "@/lib/bookingRules";
import { calculateTotalPrice } from "@/lib/bookingEngine";

// POST /api/bookings - create a pending booking request.
// The total is always recomputed here; the client's number is ignored.
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid booking details" },
      { status: 400 }
    );
  }
  const b = parsed.data;

  if (hasBlockedNight(b.checkIn, b.checkOut)) {
    return NextResponse.json({ error: "Dates not available" }, { status: 409 });
  }

  try {
    const supabase = getSupabase();

    // Back-to-back stays are fine: a booking ending on the 5th doesn't block one starting on the 5th.
    const { data: conflicts, error: conflictError } = await supabase
      .from("bookings")
      .select("id")
      .eq("status", "confirmed")
      .lt("check_in", b.checkOut)
      .gt("check_out", b.checkIn)
      .limit(1);

    if (conflictError) throw conflictError;
    if (conflicts && conflicts.length > 0) {
      return NextResponse.json({ error: "Dates not available" }, { status: 409 });
    }

    const { total } = calculateTotalPrice(b.checkIn, b.checkOut, b.guests, b.addons);

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        name: b.name,
        email: b.email,
        phone: b.phone,
        check_in: b.checkIn,
        check_out: b.checkOut,
        guests: b.guests,
        addons: b.addons,
        special_requests: b.specialRequests,
        total,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) throw error;
    return NextResponse.json({ id: data.id, total }, { status: 201 });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Could not save booking. Please try again." }, { status: 500 });
  }
}
