import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST /api/bookings - Create a new booking
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, checkIn, checkOut, guests, addons, specialRequests, total } = body;

    if (!name || !phone || !checkIn || !checkOut || !total) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check for double-booking
    const { data: conflicts, error: conflictError } = await supabase
      .from("bookings")
      .select("id")
      .eq("status", "confirmed")
      .or(`and(check_in.lte.${checkOut},check_out.gte.${checkIn})`);

    if (conflictError) {
      console.error("Conflict check error:", conflictError);
    }

    if (conflicts && conflicts.length > 0) {
      return NextResponse.json(
        { error: "Dates not available", available: false },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          name,
          email,
          phone,
          check_in: checkIn,
          check_out: checkOut,
          guests,
          addons: addons || [],
          special_requests: specialRequests || "",
          total,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Booking insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ booking: data, available: true }, { status: 201 });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET /api/bookings - List bookings (admin) or check availability
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    let query = supabase.from("bookings").select("*").order("check_in", { ascending: true });

    if (status) {
      query = query.eq("status", status);
    }

    if (checkIn && checkOut) {
      query = query.or(`and(check_in.lte.${checkOut},check_out.gte.${checkIn})`);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ bookings: data || [] });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}