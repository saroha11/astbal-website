import { NextResponse, after } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { bookingSchema, hasBlockedNight } from "@/lib/bookingRules";
import { calculateTotalPrice } from "@/lib/bookingEngine";
import { alertsConfigured, notifyNewBooking } from "@/lib/notify";

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

    // Basic abuse limit: max 3 pending requests per phone/email per 24h.
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("bookings")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending")
      .gte("created_at", since)
      .or(`phone.eq.${b.phone.replace(/[,()]/g, "")},email.eq.${b.email.replace(/[,()]/g, "")}`);
    if ((count ?? 0) >= 3) {
      return NextResponse.json(
        { error: "Too many pending requests. Please call or WhatsApp us." },
        { status: 429 }
      );
    }

    const { total, nights, addons } = calculateTotalPrice(b.checkIn, b.checkOut, b.guests, b.addons);

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

    // Alert the owner (email / Telegram) after the response is sent, so the guest isn't kept waiting
    after(() =>
      notifyNewBooking({
        id: data.id,
        name: b.name,
        email: b.email,
        phone: b.phone,
        checkIn: b.checkIn,
        checkOut: b.checkOut,
        nights,
        guests: b.guests,
        addons: addons.map((a) => a.name),
        specialRequests: b.specialRequests ?? "",
        total,
      })
    );

    // `alerted` tells the page whether we were notified automatically (otherwise it falls back to WhatsApp)
    return NextResponse.json({ id: data.id, total, alerted: alertsConfigured() }, { status: 201 });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Could not save booking. Please try again." }, { status: 500 });
  }
}
