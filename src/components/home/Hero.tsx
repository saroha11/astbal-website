"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Calendar } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/nature-retreat.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-6 w-full max-w-4xl mx-auto pt-24 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-xs sm:text-sm font-medium mb-6">
            🌿 Farm &amp; Retreat · Just 1 Hour from Delhi NCR
          </span>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Experience Nature at{" "}
            <span className="text-green-400">ASTBAL</span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Stay in our container house, ride horses through open fields, pick fresh guavas
            from our orchard, and savor farm-to-table meals — all on our beautiful 2-acre retreat.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <Link
            href="/book"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
          >
            <Calendar className="w-5 h-5" />
            Book Your Stay
          </Link>
          <Link
            href="/experiences"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white/30 transition-all border border-white/30"
          >
            Explore Experiences
          </Link>
        </motion.div>
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
