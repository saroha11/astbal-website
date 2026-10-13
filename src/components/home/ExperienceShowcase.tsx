"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import experiences from "@/data/experiences.json";

const showcaseExperiences = experiences.slice(0, 3);

export default function ExperienceShowcase() {
  return (
    <section className="py-16 sm:py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-widest"
          >
            Unforgettable Moments
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-stone-900" style={{ fontFamily: "var(--font-heading)" }}
          >
            Experiences at ASTBAL
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {showcaseExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer"
            >
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                  {exp.title}
                </h3>
                <p className="text-white/70 text-sm mb-2">{exp.subtitle}</p>
                <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors group text-sm sm:text-base"
          >
            View All Experiences
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
