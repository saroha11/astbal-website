"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Calendar, Users, ArrowRight, MapPin } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getQuote, getStartingPrice } from "@/lib/bookingEngine";
import pricing from "@/data/pricing.json";

// Only claims that are true today. Add a rating here once there are real reviews.
const trustBadges = [
  "Free cancellation",
  "WhatsApp confirmation",
  "Pay after we confirm",
  "No hidden charges",
];

export default function Hero() {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const pricePerNight = getStartingPrice();
  const { nights, total: totalPrice, href: bookHref } = getQuote(checkIn, checkOut, guests);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-900">
      {/* Poster is the video's first frame, optimized and preloaded, so the hero never shows a blank box while the video loads */}
      <Image
        src="/images/hero/drone-poster.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        suppressHydrationWarning
        className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
      >
        <source src="/images/hero/drone-hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-6 w-full max-w-6xl mx-auto pt-24 pb-24">
        <div>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Experience Nature at{" "}
            <span className="text-green-400">ASTBAL</span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-3 leading-relaxed">
            Stay • Ride • Harvest • Dine on 2 Acres
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8 text-white/90 text-sm">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>1hr from Delhi NCR</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400 font-semibold">from ₹{pricePerNight.toLocaleString("en-IN")}/night</span>
            </div>
          </div>
        </div>

        {/* Inline Booking Widget */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
              {/* Check-in */}
              <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200">
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

              {/* Check-out */}
              <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200">
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

              {/* Guests */}
              <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 mb-2 uppercase tracking-wide">
                  <Users className="w-3.5 h-3.5" />
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full text-stone-800 font-medium text-sm bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer"
                >
                  {Array.from({ length: pricing.accommodation.maxGuests }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Link
                  href={bookHref}
                  className="w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Check Availability
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Price Preview & Availability */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-stone-200">
              {totalPrice > 0 ? (
                <div className="text-stone-700">
                  <span className="font-semibold text-lg text-green-600">₹{totalPrice.toLocaleString("en-IN")}</span>
                  <span className="text-sm ml-2">for {nights} {nights === 1 ? 'night' : 'nights'}</span>
                </div>
              ) : (
                <div className="text-stone-500 text-sm">Select dates to see pricing</div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-stone-200 text-xs text-stone-600">
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-1.5">
                  <span className="text-green-600">✓</span>
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary CTA */}
          <div className="mt-5 text-center">
            <Link
              href="/experiences"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors"
            >
              Explore Experiences
              <ChevronDown className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-white/60" />
      </motion.div>
    </section>
  );
}
