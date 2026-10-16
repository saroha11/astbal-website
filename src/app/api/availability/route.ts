import { NextResponse } from "next/server";
import { eachDayOfInterval, parseISO, subDays, format } from "date-fns";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const DATE = /^\d{4}-\d{2}-\d{2}$/;

// GET /api/availability?from=YYYY-MM-DD&to=YYYY-MM-DD
// Public: returns only the booked nights, never guest details.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";
  if (!DATE.test(from) || !DATE.test(to) || from > to) {
    return NextResponse.json({ error: "Invalid range" }, { status: 400 });
  }

  const { data, error } = await getSupabase()
    .from("bookings")
    .select("check_in, check_out")
    .eq("status", "confirmed")
    .lte("check_in", to)
    .gt("check_out", from);

  if (error) {
    console.error("Availability error:", error);
    return NextResponse.json({ error: "Could not load availability" }, { status: 500 });
  }

  const booked = new Set<string>();
  for (const b of data ?? []) {
    const last = subDays(parseISO(b.check_out), 1); // check-out night is free
    if (last < parseISO(b.check_in)) continue;
    for (const d of eachDayOfInterval({ start: parseISO(b.check_in), end: last })) {
      booked.add(format(d, "yyyy-MM-dd"));
    }
  }

  return NextResponse.json(
    { booked: [...booked].sort() },
    { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } }
  );
}
