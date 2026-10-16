"use client";

import { motion } from "framer-motion";
import { Calendar, Users, Plus, Minus, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { formatPrice } from "@/lib/bookingEngine";
import pricingData from "@/data/pricing.json";

const maxGuests = pricingData.accommodation.maxGuests;
const shortDate = (d: string) => format(new Date(d + "T00:00:00"), "EEE, d MMM");

interface PriceBreakdownProps {
  checkIn: string | null;
  checkOut: string | null;
  guests: number;
  pricing: {
    nights: number;
    accommodationCost: number;
    extraGuestCost: number;
    addonsCost: number;
    addons: { name: string; price: number }[];
    total: number;
    currencySymbol: string;
  } | null;
  onGuestsChange: (n: number) => void;
}

export default function PriceBreakdown({ checkIn, checkOut, guests, pricing, onGuestsChange }: PriceBreakdownProps) {
  if (!pricing) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Booking Summary</h3>
        <div className="text-center py-6">
          <Calendar className="w-10 h-10 text-stone-200 mx-auto mb-3" />
          <p className="text-stone-400 text-xs sm:text-sm">Select your check-in and check-out dates to see pricing</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Price Breakdown</h3>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <div className="bg-stone-50 rounded-lg p-3">
          <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wide">Check-in</p>
          <p className="font-semibold text-stone-800 text-xs sm:text-sm mt-0.5">{checkIn && shortDate(checkIn)}</p>
        </div>
        <div className="bg-stone-50 rounded-lg p-3">
          <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wide">Check-out</p>
          <p className="font-semibold text-stone-800 text-xs sm:text-sm mt-0.5">{checkOut && shortDate(checkOut)}</p>
        </div>
      </div>

      {/* Guests */}
      <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg mb-5">
        <span className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-500"><Users className="w-3.5 h-3.5" />Guests</span>
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Fewer guests" disabled={guests <= 1} onClick={() => onGuestsChange(Math.max(1, guests - 1))}
            className="w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            <Minus className="w-3 h-3" />
          </button>
          <span className="font-semibold text-stone-800 w-4 text-center text-sm">{guests}</span>
          <button type="button" aria-label="More guests" disabled={guests >= maxGuests} onClick={() => onGuestsChange(Math.min(maxGuests, guests + 1))}
            className="w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-2.5 mb-5 text-xs sm:text-sm">
        <div className="flex justify-between">
          <span className="text-stone-500">{formatPrice(Math.round(pricing.accommodationCost / pricing.nights))} × {pricing.nights} night{pricing.nights > 1 ? "s" : ""}</span>
          <span className="font-medium text-stone-800">{formatPrice(pricing.accommodationCost)}</span>
        </div>
        {pricing.extraGuestCost > 0 && (
          <div className="flex justify-between">
            <span className="text-stone-500">Extra guests</span>
            <span className="font-medium text-stone-800">{formatPrice(pricing.extraGuestCost)}</span>
          </div>
        )}
        {pricing.addons.map((addon, i) => (
          <div key={i} className="flex justify-between">
            <span className="text-stone-500 flex items-center gap-1"><Sparkles className="w-3 h-3 text-amber-500" />{addon.name}</span>
            <span className="font-medium text-stone-800">{formatPrice(addon.price)}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="pt-4 border-t-2 border-stone-100">
        <div className="flex justify-between items-center">
          <span className="text-base font-bold text-stone-900" style={{ fontFamily: "var(--font-heading)" }}>Total</span>
          <span className="text-xl sm:text-2xl font-bold text-green-600" style={{ fontFamily: "var(--font-heading)" }}>{formatPrice(pricing.total)}</span>
        </div>
        <p className="text-[10px] sm:text-xs text-stone-400 mt-1">Includes all taxes</p>
      </div>
    </motion.div>
  );
}
