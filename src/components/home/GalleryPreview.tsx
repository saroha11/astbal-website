"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const images = [
  { src: "/images/property/container-house.jpg", alt: "Container House at ASTBAL", span: "row-span-2" },
  { src: "/images/experiences/horse-riding.jpg", alt: "Horse Riding", span: "" },
  { src: "/images/experiences/kitchen-garden.jpg", alt: "Kitchen Garden", span: "" },
  { src: "/images/dogs/labrador.jpg", alt: "Labradors", span: "" },
  { src: "/images/experiences/guava-orchard.jpg", alt: "Guava Orchard", span: "row-span-2" },
  { src: "/images/gallery/horse-white.jpg", alt: "White Horse", span: "" },
];

export default function GalleryPreview() {
  return (
    <section className="py-16 sm:py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 sm:mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-widest"
            >
              A Glimpse
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-stone-900" style={{ fontFamily: "var(--font-heading)" }}
            >
              Life at ASTBAL
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link href="/gallery" className="hidden sm:inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors group text-sm">
              View Gallery
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-[200px] sm:auto-rows-[220px]">
          {images.map((img, index) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`relative rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link href="/gallery" className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm">
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
