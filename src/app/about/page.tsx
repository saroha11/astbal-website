"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TreePine, MapPin, Clock, Home, Maximize, Dog, Sprout } from "lucide-react";
import PageHero from "@/components/layout/PageHero";

const stats = [
  { icon: Maximize, label: "Privacy", value: "1 Group", description: "The whole farm is yours" },
  { icon: TreePine, label: "Training Arena", value: "Pro", description: "Latest equipment & trainer" },
  { icon: Clock, label: "From Delhi", value: "1 Hour", description: "Easy weekend drive" },
  { icon: Home, label: "Accommodation", value: "1 BHK", description: "Modern container house" },
  { icon: Dog, label: "Our Dogs", value: "4+", description: "Labradors & Canines" },
  { icon: Sprout, label: "Kitchen Garden", value: "Farm-fresh", description: "Veggies for your meals" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="/images/hero/farmhouse-luxury.jpg"
        title="About ASTBAL"
        subtitle="A nature retreat where luxury meets the countryside"
      />

      {/* Story */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-widest">Our Story</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-5 text-stone-900" style={{ fontFamily: "var(--font-heading)" }}>
                Where Nature Meets Comfort
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed text-sm sm:text-base">
                <p>ASTBAL was born from a simple dream — to create a space where city dwellers could disconnect from the chaos and reconnect with nature. Just one hour from Delhi NCR, our private farm retreat offers an experience that&rsquo;s increasingly rare: the chance to slow down, breathe fresh air, and live simply, beautifully.</p>
                <p>Our modern container house is the heart of the stay — a thoughtfully designed 1 BHK that proves sustainable living doesn&rsquo;t mean compromising on comfort. Step outside, and you&rsquo;re greeted by our horse training arena, with the latest equipment and an experienced trainer, set against open fields, a guava orchard heavy with fruit, and a kitchen garden brimming with fresh vegetables.</p>
                <p>What makes ASTBAL truly special is the warmth — our cook who transforms farm-fresh ingredients into memorable meals, our friendly dogs (Labradors and Indian canines) who greet you like family, and the gentle pace of countryside life that heals without you even noticing.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden">
                <Image src="/images/property/container-house.jpg" alt="ASTBAL Container House" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-4 left-0 sm:-left-4 bg-green-600 text-white p-4 sm:p-5 rounded-xl shadow-lg">
                <p className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>All Yours</p>
                <p className="text-white/80 text-xs sm:text-sm">One group at a time</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 lg:py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.06 }}
                className="text-center p-4 sm:p-5 bg-white rounded-xl shadow-sm border border-stone-100">
                <stat.icon className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-xl sm:text-2xl font-bold text-stone-900" style={{ fontFamily: "var(--font-heading)" }}>{stat.value}</p>
                <p className="text-xs sm:text-sm font-medium text-stone-700">{stat.label}</p>
                <p className="text-[10px] sm:text-xs text-stone-400 mt-0.5 hidden sm:block">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900" style={{ fontFamily: "var(--font-heading)" }}>
              Easy to Reach, Hard to Leave
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-stone-500 mt-2 text-sm sm:text-base max-w-xl mx-auto">
              Located near Delhi NCR, ASTBAL is the perfect weekend escape
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-3xl mx-auto">
            {[
              { city: "Delhi", time: "~1 hour", route: "NH48 → State Highway" },
              { city: "Gurgaon", time: "~45 mins", route: "Sohna Road south" },
              { city: "Faridabad", time: "~50 mins", route: "Palwal Highway" },
            ].map((item, index) => (
              <motion.div key={item.city} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-stone-50 rounded-xl border border-stone-100">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-stone-900 text-sm">{item.city}</p>
                  <p className="text-green-600 font-medium text-xs sm:text-sm">{item.time}</p>
                  <p className="text-[10px] sm:text-xs text-stone-400 truncate">{item.route}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
