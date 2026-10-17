"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarCheck, MessageCircle, Wallet, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    title: "Pick your dates",
    description: "Choose your nights and see the price straight away. Optional add-ons can be added now or at the farm.",
  },
  {
    icon: MessageCircle,
    title: "We confirm on WhatsApp",
    description: "We'll message you within a few hours to confirm your stay and answer any questions.",
  },
  {
    icon: Wallet,
    title: "Pay & pack your bags",
    description: "Pay by UPI or bank transfer once we confirm. Free cancellation up to 48 hours before check-in.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-widest">
            Simple Booking
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-stone-900"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            How Booking Works
          </h2>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-stone-50 rounded-2xl p-6 border border-stone-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <step.icon className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wide">Step {i + 1}</span>
              </div>
              <h3 className="font-bold text-stone-900 mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                {step.title}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">{step.description}</p>
            </motion.li>
          ))}
        </ol>

        <div className="text-center mt-10">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-sm"
          >
            Check Availability
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
