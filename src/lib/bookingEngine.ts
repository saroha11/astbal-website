import { format, addDays, parseISO, isWithinInterval, isWeekend, getDay } from "date-fns";
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

export function getDateStatus(dateStr: string): "available" | "booked" | "limited" {
  const blocked = getBlockedDates();
  const limited = getLimitedDates();

  if (blocked.has(dateStr)) return "booked";
  if (limited.has(dateStr)) return "limited";
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

export function getBookingDate(dateStr: string): BookingDate {
  const date = parseISO(dateStr);
  return {
    date: dateStr,
    status: getDateStatus(dateStr),
    price: getPriceForDate(dateStr),
    isWeekend: pricing.weekendDays.includes(getDay(date)),
    isPeak: isWithinInterval(date, {
      start: parseISO(pricing.accommodation.peakSeasonStart),
      end: parseISO(pricing.accommodation.peakSeasonEnd),
    }),
  };
}

export function getMonthDates(year: number, month: number): BookingDate[] {
  const dates: BookingDate[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = format(new Date(year, month, day), "yyyy-MM-dd");
    const bookingDate = getBookingDate(dateStr);
    // Only show dates from today onwards
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (parseISO(dateStr) >= today) {
      dates.push(bookingDate);
    }
  }

  return dates;
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
  addons: { name: string; price: number }[];
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

  const addons: { name: string; price: number }[] = [];
  let addonsCost = 0;

  for (const addonId of selectedAddonIds) {
    const addon = pricing.addons.find((a) => a.id === addonId);
    if (addon) {
      addons.push({ name: addon.name, price: addon.price });
      addonsCost += addon.price;
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
