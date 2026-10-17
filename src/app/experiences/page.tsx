"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import experiences from "@/data/experiences.json";
import PageHero from "@/components/layout/PageHero";
import FieldExperiences from "@/components/experiences/FieldExperiences";

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        image="/images/experiences/horse-arena.jpg"
        title="Experiences"
        subtitle="Unforgettable moments await at every turn"
      />

      {/* Experiences */}
      <section className="py-12 sm:py-16 lg:py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 sm:space-y-16 lg:space-y-24">
            {experiences.map((exp, index) => (
              <motion.div key={exp.id} id={exp.id}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                {/* Image */}
                <div className={`relative h-56 sm:h-80 rounded-2xl overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Image src={exp.image} alt={exp.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  {exp.included && (
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">Included with Stay</div>
                  )}
                </div>
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="text-green-600 font-semibold text-xs uppercase tracking-widest">{exp.subtitle}</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1.5 mb-3" style={{ fontFamily: "var(--font-heading)" }}>{exp.title}</h2>
                  <p className="text-stone-600 leading-relaxed mb-5 text-sm sm:text-base">{exp.longDescription}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                    {exp.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-stone-600">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/book"
                    className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors group text-sm">
                    {exp.addonId ? "Book This Experience" : "Book Your Stay"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FieldExperiences />

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Ready to Experience It All?
            </h2>
            <p className="text-white/80 mb-8 text-sm sm:text-base max-w-lg mx-auto">
              Book your stay at ASTBAL and enjoy all these experiences. Custom packages available.
            </p>
            <Link href="/book"
              className="inline-flex items-center gap-2 bg-white text-green-700 px-7 sm:px-8 py-3.5 rounded-full font-semibold hover:bg-stone-50 transition-colors shadow-lg text-sm sm:text-base">
              Book Your Stay Now <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
