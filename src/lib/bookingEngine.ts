import { format, addDays, parseISO, isWithinInterval, getDay } from "date-fns";
import availabilityData from "@/data/availability.json";
import pricingData from "@/data/pricing.json";
import type { BookingDate, PricingConfig } from "@/types";

const pricing: PricingConfig = pricingData;

export function getBlockedDates(): Set<string> {
  return new Set(availabilityData.blockedDates);
}

export function getLimitedDates(): Set<string> {
  return new Set(availabilityData.limitedDates);
}

export function getDateStatus(dateStr: string, booked: Set<string>): "available" | "booked" | "limited" {
  if (getBlockedDates().has(dateStr) || booked.has(dateStr)) return "booked";
  if (getLimitedDates().has(dateStr)) return "limited";
  return "available";
}

export function getPriceForDate(dateStr: string): number {
  const date = parseISO(dateStr);
  const dayOfWeek = getDay(date);
  const isWeekendDay = pricing.weekendDays.includes(dayOfWeek);

  // Check peak season
  const peakStart = parseISO(pricing.accommodation.peakSeasonStart);
  const peakEnd = parseISO(pricing.accommodation.peakSeasonEnd);

  if (isWithinInterval(date, { start: peakStart, end: peakEnd })) {
    return pricing.accommodation.peakSeason;
  }

  return isWeekendDay ? pricing.accommodation.weekend : pricing.accommodation.weekday;
}

export function getBookingDate(dateStr: string, booked: Set<string>): BookingDate {
  const date = parseISO(dateStr);
  return {
    date: dateStr,
    status: getDateStatus(dateStr, booked),
    price: getPriceForDate(dateStr),
    isWeekend: pricing.weekendDays.includes(getDay(date)),
    isPeak: isWithinInterval(date, {
      start: parseISO(pricing.accommodation.peakSeasonStart),
      end: parseISO(pricing.accommodation.peakSeasonEnd),
    }),
  };
}

// Booked nights come from the public availability API (one request per month view).
export async function getBookedDates(from: string, to: string): Promise<Set<string>> {
  try {
    const res = await fetch(`/api/availability?from=${from}&to=${to}`);
    if (!res.ok) return new Set();
    const json: { booked: string[] } = await res.json();
    return new Set(json.booked);
  } catch {
    return new Set();
  }
}

export async function getMonthDates(year: number, month: number): Promise<BookingDate[]> {
  const first = format(new Date(year, month, 1), "yyyy-MM-dd");
  const last = format(new Date(year, month + 1, 0), "yyyy-MM-dd");
  const booked = await getBookedDates(first, last);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dates: BookingDate[] = [];
  for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
    const dateStr = format(new Date(year, month, day), "yyyy-MM-dd");
    if (parseISO(dateStr) >= today) dates.push(getBookingDate(dateStr, booked));
  }
  return dates;
}

// Price + /book link for the date pickers on the home page.
export function getQuote(checkIn: Date | null, checkOut: Date | null, guests: number) {
  if (!checkIn || !checkOut || checkOut <= checkIn) return { nights: 0, total: 0, href: "/book" };
  const ci = format(checkIn, "yyyy-MM-dd");
  const co = format(checkOut, "yyyy-MM-dd");
  const { nights, total } = calculateTotalPrice(ci, co, guests, []);
  return { nights, total, href: `/book?checkIn=${ci}&checkOut=${co}&guests=${guests}` };
}

export function getStartingPrice(): number {
  return pricing.accommodation.weekday;
}

export function calculateTotalPrice(
  checkIn: string,
  checkOut: string,
  guestCount: number,
  selectedAddonIds: string[]
): {
  nights: number;
  accommodationCost: number;
  extraGuestCost: number;
  addonsCost: number;
  addons: { name: string; price: number; priceLabel?: string }[];
  total: number;
  currencySymbol: string;
} {
  const start = parseISO(checkIn);
  const end = parseISO(checkOut);
  const nights = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  let accommodationCost = 0;
  for (let i = 0; i < nights; i++) {
    const dateStr = format(addDays(start, i), "yyyy-MM-dd");
    accommodationCost += getPriceForDate(dateStr);
  }

  const extraGuests = Math.max(0, guestCount - pricing.accommodation.baseGuests);
  const extraGuestCost = extraGuests * pricing.accommodation.extraGuest * nights;

  const addons: { name: string; price: number; priceLabel?: string }[] = [];
  let addonsCost = 0;

  for (const addonId of selectedAddonIds) {
    const addon = pricing.addons.find((a) => a.id === addonId);
    if (addon) {
      const perPerson = "perPerson" in addon && addon.perPerson;
      const price = perPerson ? addon.price * guestCount : addon.price;
      addons.push({
        name: perPerson ? `${addon.name} × ${guestCount}` : addon.name,
        price,
        priceLabel: "priceLabel" in addon ? addon.priceLabel : undefined,
      });
      addonsCost += price;
    }
  }

  const total = accommodationCost + extraGuestCost + addonsCost;

  return {
    nights,
    accommodationCost,
    extraGuestCost,
    addonsCost,
    addons,
    total,
    currencySymbol: pricing.accommodation.currencySymbol,
  };
}

export function formatPrice(amount: number): string {
  return `${pricing.accommodation.currencySymbol}${amount.toLocaleString("en-IN")}`;
}

export function generateWhatsAppMessage(data: {
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  addons: string[];
  specialRequests: string;
  total: number;
}): string {
  return `🌿 *New Booking Request — ASTBAL*

*Name:* ${data.name}
*Phone:* ${data.phone}
*Check-in:* ${data.checkIn}
*Check-out:* ${data.checkOut}
*Guests:* ${data.guests}
*Add-ons:* ${data.addons.length > 0 ? data.addons.join(", ") : "None"}
*Special Requests:* ${data.specialRequests || "None"}
*Estimated Total:* ${formatPrice(data.total)}

Please confirm my booking. Thank you! 🙏`;
}

export const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
