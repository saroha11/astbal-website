import { addDays, differenceInCalendarDays, format, parseISO, startOfMonth, subMonths } from "date-fns";
import type { Booking } from "@/types";
import pricing from "@/data/pricing.json";

const nights = (b: Booking) => differenceInCalendarDays(parseISO(b.check_out), parseISO(b.check_in));

export function computeInsights(bookings: Booking[], now = new Date()) {
  const today = format(now, "yyyy-MM-dd");
  const live = bookings.filter((b) => b.status !== "cancelled");
  const confirmed = bookings.filter((b) => b.status === "confirmed");
  const pending = bookings.filter((b) => b.status === "pending");
  const cancelled = bookings.filter((b) => b.status === "cancelled");

  const sum = (xs: Booking[]) => xs.reduce((t, b) => t + b.total, 0);
  const decided = confirmed.length + cancelled.length;

  // Occupancy: confirmed nights in the next 30 days / 30
  const horizon = format(addDays(now, 30), "yyyy-MM-dd");
  let bookedNights = 0;
  for (const b of confirmed) {
    const start = b.check_in < today ? today : b.check_in;
    const end = b.check_out > horizon ? horizon : b.check_out;
    if (end > start) bookedNights += differenceInCalendarDays(parseISO(end), parseISO(start));
  }

  // Requests and confirmed revenue per month: 5 months back to 3 ahead (by check-in month)
  const monthly = Array.from({ length: 9 }, (_, i) => {
    const m = startOfMonth(subMonths(now, 5));
    const d = new Date(m.getFullYear(), m.getMonth() + i, 1);
    const key = format(d, "yyyy-MM");
    const inMonth = live.filter((b) => b.check_in.startsWith(key));
    return {
      label: format(d, "MMM"),
      requests: inMonth.length,
      revenue: sum(inMonth.filter((b) => b.status === "confirmed")),
    };
  });

  const addonCounts = new Map<string, number>();
  for (const b of live) for (const a of b.addons ?? []) addonCounts.set(a, (addonCounts.get(a) ?? 0) + 1);
  const topAddons = [...addonCounts.entries()]
    .map(([id, count]) => ({ name: pricing.addons.find((a) => a.id === id)?.name ?? id, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const upcoming = confirmed.filter((b) => b.check_out >= today).sort((a, b) => a.check_in.localeCompare(b.check_in)).slice(0, 5);

  return {
    total: bookings.length,
    pendingCount: pending.length,
    pendingValue: sum(pending),
    confirmedCount: confirmed.length,
    confirmedRevenue: sum(confirmed),
    cancelledCount: cancelled.length,
    confirmRate: decided ? Math.round((confirmed.length / decided) * 100) : null,
    avgStay: live.length ? +(live.reduce((t, b) => t + nights(b), 0) / live.length).toFixed(1) : 0,
    avgGuests: live.length ? +(live.reduce((t, b) => t + b.guests, 0) / live.length).toFixed(1) : 0,
    occupancy30: Math.round((bookedNights / 30) * 100),
    monthly,
    topAddons,
    upcoming,
  };
}
