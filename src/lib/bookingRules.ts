import { z } from "zod";
import { parseISO, isValid, format, differenceInCalendarDays } from "date-fns";
import pricingData from "@/data/pricing.json";
import availabilityData from "@/data/availability.json";

const dateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((s) => isValid(parseISO(s)), "Invalid date");

export const bookingSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(200),
    phone: z.string().trim().regex(/^[+\d][\d\s-]{6,18}$/, "Invalid phone number"),
    checkIn: dateString,
    checkOut: dateString,
    guests: z.number().int().min(1).max(pricingData.accommodation.maxGuests),
    addons: z.array(z.string()).max(20).default([]),
    specialRequests: z.string().trim().max(1000).default(""),
  })
  .superRefine((v, ctx) => {
    const nights = differenceInCalendarDays(parseISO(v.checkOut), parseISO(v.checkIn));
    if (nights < pricingData.accommodation.minNights || nights > pricingData.accommodation.maxNights) {
      ctx.addIssue({
        code: "custom",
        path: ["checkOut"],
        message: `Stay must be ${pricingData.accommodation.minNights}-${pricingData.accommodation.maxNights} nights`,
      });
    }
    const today = format(new Date(), "yyyy-MM-dd");
    if (v.checkIn < today) {
      ctx.addIssue({ code: "custom", path: ["checkIn"], message: "Check-in is in the past" });
    }
    const known = new Set(pricingData.addons.map((a) => a.id));
    if (v.addons.some((id) => !known.has(id))) {
      ctx.addIssue({ code: "custom", path: ["addons"], message: "Unknown add-on" });
    }
  });

export type BookingInput = z.infer<typeof bookingSchema>;

// Nights (check-in inclusive, check-out exclusive) the owner has blocked by hand.
export function hasBlockedNight(checkIn: string, checkOut: string): boolean {
  const blocked = new Set(availabilityData.blockedDates);
  for (let d = parseISO(checkIn); format(d, "yyyy-MM-dd") < checkOut; d.setDate(d.getDate() + 1)) {
    if (blocked.has(format(d, "yyyy-MM-dd"))) return true;
  }
  return false;
}
