"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import testimonialData from "@/data/testimonials.json";
import type { Testimonial } from "@/types";

// Add real guest reviews to src/data/testimonials.json; the section stays hidden while it's empty.
const testimonials: Testimonial[] = testimonialData;

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  if (testimonials.length === 0) return null;
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-16 sm:py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-widest"
          >
            Guest Reviews
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-stone-900" style={{ fontFamily: "var(--font-heading)" }}
          >
            What Our Guests Say
          </motion.h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-stone-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6 italic">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {testimonials[current].avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm">{testimonials[current].name}</p>
                    <p className="text-xs text-stone-500">{testimonials[current].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 pt-5 border-t border-stone-100">
              <div className="flex gap-1.5">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === current ? "bg-green-600 w-6" : "bg-stone-200 w-1.5"
                    }`}
                    aria-label={`Review ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={prev} className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors" aria-label="Previous">
                  <ChevronLeft className="w-4 h-4 text-stone-600" />
                </button>
                <button onClick={next} className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors" aria-label="Next">
                  <ChevronRight className="w-4 h-4 text-stone-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
