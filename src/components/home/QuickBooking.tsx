"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Users, ArrowRight } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function QuickBooking() {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero/farmhouse-luxury.jpg')" }}
          >
            <div className="absolute inset-0 bg-green-700/90" />
          </div>

          <div className="relative z-10 px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-10"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Ready for Your Nature Escape?
              </h2>
              <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto">
                Check availability and book your perfect stay at ASTBAL. Just 1 hour from Delhi NCR.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                {/* Check-in */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wide">
                    <Calendar className="w-3.5 h-3.5" />
                    Check-in
                  </label>
                  <DatePicker
                    selected={checkIn}
                    onChange={(date: Date | null) => setCheckIn(date)}
                    minDate={today}
                    placeholderText="Select date"
                    className="w-full text-stone-800 font-medium text-sm cursor-pointer border-none focus:outline-none focus:ring-0"
                    dateFormat="dd MMM yyyy"
                    wrapperClassName="w-full"
                  />
                </div>

                {/* Check-out */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wide">
                    <Calendar className="w-3.5 h-3.5" />
                    Check-out
                  </label>
                  <DatePicker
                    selected={checkOut}
                    onChange={(date: Date | null) => setCheckOut(date)}
                    minDate={checkIn || today}
                    placeholderText="Select date"
                    className="w-full text-stone-800 font-medium text-sm cursor-pointer border-none focus:outline-none focus:ring-0"
                    dateFormat="dd MMM yyyy"
                    wrapperClassName="w-full"
                  />
                </div>

                {/* Guests */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wide">
                    <Users className="w-3.5 h-3.5" />
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-stone-800 font-medium text-sm bg-white border-none focus:outline-none focus:ring-0 cursor-pointer"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 bg-amber-500 text-stone-900 px-8 py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-amber-400 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
                >
                  Check Availability
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
