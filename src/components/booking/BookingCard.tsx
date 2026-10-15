"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, ArrowRight, X, ChevronUp } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatPrice } from "@/lib/bookingEngine";

interface BookingCardProps {
  compact?: boolean;
}

export default function BookingCard({ compact = false }: BookingCardProps) {
  const [isExpanded, setIsExpanded] = useState(!compact);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const pricePerNight = 6000;
  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const totalPrice = nights > 0 ? nights * pricePerNight : 0;

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-green-600 text-white px-5 py-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg" style={{ fontFamily: "var(--font-heading)" }}>
            Check Availability
          </h3>
          <p className="text-green-100 text-xs">Book your stay at ASTBAL</p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          {isExpanded ? <X className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="p-5 space-y-4">
              {/* Date Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-stone-50 rounded-xl p-3 border border-stone-200">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 mb-2 uppercase tracking-wide">
                    <Calendar className="w-3.5 h-3.5" />
                    Check-in
                  </label>
                  <DatePicker
                    selected={checkIn}
                    onChange={(date: Date | null) => setCheckIn(date)}
                    minDate={today}
                    placeholderText="Select date"
                    className="w-full text-stone-800 font-medium text-sm cursor-pointer border-none focus:outline-none focus:ring-0 bg-transparent"
                    dateFormat="dd MMM yyyy"
                    wrapperClassName="w-full"
                  />
                </div>

                <div className="bg-stone-50 rounded-xl p-3 border border-stone-200">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 mb-2 uppercase tracking-wide">
                    <Calendar className="w-3.5 h-3.5" />
                    Check-out
                  </label>
                  <DatePicker
                    selected={checkOut}
                    onChange={(date: Date | null) => setCheckOut(date)}
                    minDate={checkIn || today}
                    placeholderText="Select date"
                    className="w-full text-stone-800 font-medium text-sm cursor-pointer border-none focus:outline-none focus:ring-0 bg-transparent"
                    dateFormat="dd MMM yyyy"
                    wrapperClassName="w-full"
                  />
                </div>

                <div className="bg-stone-50 rounded-xl p-3 border border-stone-200">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 mb-2 uppercase tracking-wide">
                    <Users className="w-3.5 h-3.5" />
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-stone-800 font-medium text-sm bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Preview */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                {totalPrice > 0 ? (
                  <div className="text-stone-700">
                    <span className="font-bold text-lg text-green-600">{formatPrice(totalPrice)}</span>
                    <span className="text-sm ml-2">for {nights} {nights === 1 ? 'night' : 'nights'}</span>
                  </div>
                ) : (
                  <div className="text-stone-500 text-sm">Select dates to see pricing</div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-stone-600 font-medium">3 slots left</span>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/book"
                className="w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
              >
                Book Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
