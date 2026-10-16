"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bed, Wifi, AirVent, Bath, UtensilsCrossed, Car, Tv, Coffee, CheckCircle2, Calendar } from "lucide-react";
import { formatPrice } from "@/lib/bookingEngine";
import PageHero from "@/components/layout/PageHero";

const amenities = [
  { icon: Bed, label: "1 Bedroom with Queen Bed" },
  { icon: Bath, label: "Attached Bathroom" },
  { icon: AirVent, label: "Air Conditioning" },
  { icon: Wifi, label: "Free WiFi" },
  { icon: Tv, label: "Smart TV" },
  { icon: UtensilsCrossed, label: "Mini Kitchen" },
  { icon: Coffee, label: "Coffee & Tea Maker" },
  { icon: Car, label: "Free Parking" },
];

const images = [
  { src: "/images/property/container-house.jpg", alt: "ASTBAL Container House Exterior" },
  { src: "/images/hero/farmhouse-luxury.jpg", alt: "Container House and Lawn" },
  { src: "/images/property/grass-bed.jpg", alt: "Outdoor Grass Bed Area" },
  { src: "/images/property/farmhouse.jpg", alt: "Farmhouse and Parking" },
];

export default function AccommodationPage() {
  return (
    <>
      <PageHero
        image="/images/property/container-house.jpg"
        title="The Container House"
        subtitle="Modern 1 BHK · Surrounded by Nature · Farm Views"
      />

      {/* Image Gallery */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[140px] sm:auto-rows-[200px]">
            {images.map((img, index) => (
              <motion.div key={img.src} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: index * 0.08 }}
                className={`relative rounded-xl sm:rounded-2xl overflow-hidden ${index === 0 ? "col-span-2 row-span-2" : ""}`}>
                <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 25vw" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Details + Pricing */}
      <section className="py-12 sm:py-16 lg:py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Left */}
            <div className="lg:col-span-2 space-y-10 sm:space-y-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Your Home Away From Home
                </h2>
                <p className="text-stone-600 leading-relaxed mb-4 text-sm sm:text-base">
                  Our container house is a beautifully converted shipping container that proves sustainable living can be luxurious. This modern 1 BHK is designed with floor-to-ceiling windows that frame the surrounding farmland, letting natural light flood in while you wake up to birdsong and green views.
                </p>
                <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                  Step outside to your private grass bed area — a perfect spot for morning yoga, evening stargazing, or simply lying down with a book. The house comes with everything you need: air conditioning, smart TV, WiFi, a mini kitchen, and a plush queen bed that ensures a restful night.
                </p>
              </motion.div>

              {/* Amenities */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mb-5" style={{ fontFamily: "var(--font-heading)" }}>Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {amenities.map((item, index) => (
                    <motion.div key={item.label} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: index * 0.04 }}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-100">
                      <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-stone-700 text-xs sm:text-sm font-medium">{item.label}</span>
                      <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto shrink-0" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Grass Bed */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden">
                <div className="h-56 sm:h-64 relative">
                  <Image src="/images/property/grass-bed.jpg" alt="Grass Bed" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>Your Private Grass Bed</h3>
                    <p className="text-white/70 text-xs sm:text-sm max-w-sm">
                      Step outside to your own grassy outdoor area — perfect for morning tea, evening bonfires, yoga, or watching the sunset.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Pricing Card */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sm:p-7 lg:sticky lg:top-24">
                <h3 className="text-xl font-bold text-stone-900 mb-5" style={{ fontFamily: "var(--font-heading)" }}>Pricing</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl">
                    <div><p className="font-medium text-stone-800 text-sm">Weekday</p><p className="text-[10px] text-stone-400">Mon – Thu</p></div>
                    <p className="text-lg font-bold text-stone-800">{formatPrice(4500)}<span className="text-xs font-normal text-stone-400">/night</span></p>
                  </div>
                  <div className="flex items-center justify-between p-3.5 bg-amber-50 rounded-xl">
                    <div><p className="font-medium text-stone-800 text-sm">Weekend</p><p className="text-[10px] text-stone-400">Fri – Sun</p></div>
                    <p className="text-lg font-bold text-stone-800">{formatPrice(6500)}<span className="text-xs font-normal text-stone-400">/night</span></p>
                  </div>
                  <div className="flex items-center justify-between p-3.5 bg-red-50 rounded-xl">
                    <div><p className="font-medium text-stone-800 text-sm">Peak Season</p><p className="text-[10px] text-stone-400">Dec 20 – Jan 5</p></div>
                    <p className="text-lg font-bold text-stone-800">{formatPrice(8500)}<span className="text-xs font-normal text-stone-400">/night</span></p>
                  </div>
                </div>
                <div className="space-y-2 mb-6 text-xs sm:text-sm text-stone-500">
                  <p>✓ Up to 2 guests included</p>
                  <p>✓ Extra guest: {formatPrice(500)}/night</p>
                  <p>✓ Max 4 guests</p>
                  <p>✓ Min 1 night · Max 7 nights</p>
                </div>
                <Link href="/book"
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3.5 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-sm text-sm sm:text-base">
                  <Calendar className="w-4 h-4" />
                  Check Availability &amp; Book
                </Link>
                <p className="text-center text-[10px] sm:text-xs text-stone-400 mt-3">
                  Free cancellation up to 48 hours before check-in
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
