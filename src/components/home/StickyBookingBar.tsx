"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, ArrowRight } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function StickyBookingBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate price
  const pricePerNight = 6000;
  const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const totalPrice = nights > 0 ? nights * pricePerNight : 0;

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling 80vh (past hero section)
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-stone-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col lg:flex-row items-center gap-3">
              {/* Brand */}
              <div className="hidden lg:block">
                <Link href="/" className="text-xl font-bold text-green-600" style={{ fontFamily: "var(--font-heading)" }}>
                  ASTBAL
                </Link>
              </div>

              {/* Booking Inputs */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-2 w-full">
                {/* Check-in */}
                <div className="bg-stone-50 rounded-lg px-3 py-2 border border-stone-200">
                  <label className="flex items-center gap-1 text-xs font-semibold text-stone-500 mb-1">
                    <Calendar className="w-3 h-3" />
                    Check-in
                  </label>
                  <DatePicker
                    selected={checkIn}
                    onChange={(date: Date | null) => setCheckIn(date)}
                    minDate={today}
                    placeholderText="Select"
                    className="w-full text-stone-800 text-sm cursor-pointer border-none focus:outline-none focus:ring-0 bg-transparent p-0"
                    dateFormat="dd MMM"
                    wrapperClassName="w-full"
                  />
                </div>

                {/* Check-out */}
                <div className="bg-stone-50 rounded-lg px-3 py-2 border border-stone-200">
                  <label className="flex items-center gap-1 text-xs font-semibold text-stone-500 mb-1">
                    <Calendar className="w-3 h-3" />
                    Check-out
                  </label>
                  <DatePicker
                    selected={checkOut}
                    onChange={(date: Date | null) => setCheckOut(date)}
                    minDate={checkIn || today}
                    placeholderText="Select"
                    className="w-full text-stone-800 text-sm cursor-pointer border-none focus:outline-none focus:ring-0 bg-transparent p-0"
                    dateFormat="dd MMM"
                    wrapperClassName="w-full"
                  />
                </div>

                {/* Guests */}
                <div className="bg-stone-50 rounded-lg px-3 py-2 border border-stone-200">
                  <label className="flex items-center gap-1 text-xs font-semibold text-stone-500 mb-1">
                    <Users className="w-3 h-3" />
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-stone-800 text-sm bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer p-0"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CTA Button with Price */}
                <Link
                  href="/book"
                  className="bg-green-600 text-white rounded-lg px-4 py-2 flex flex-col items-center justify-center hover:bg-green-700 transition-colors"
                >
                  {totalPrice > 0 ? (
                    <>
                      <span className="text-xs font-medium">₹{totalPrice.toLocaleString()}</span>
                      <span className="text-xs opacity-90">{nights} {nights === 1 ? 'night' : 'nights'}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm font-semibold">Book Now</span>
                      <span className="text-xs opacity-90">₹{pricePerNight.toLocaleString()}/nt</span>
                    </>
                  )}
                </Link>
              </div>

              {/* Availability Indicator */}
              <div className="hidden xl:flex items-center gap-2 text-xs whitespace-nowrap">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-stone-600 font-medium">3 slots left</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
