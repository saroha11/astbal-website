"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PageHeroProps {
  image: string;
  title: string;
  subtitle?: string;
  height?: "sm" | "md" | "lg";
}

export default function PageHero({ image, title, subtitle, height = "md" }: PageHeroProps) {
  const heightClass =
    height === "sm" ? "h-56 sm:h-72" : height === "lg" ? "h-72 sm:h-80 lg:h-96" : "h-64 sm:h-80 lg:h-96";

  return (
    <section className="relative pt-16 lg:pt-20">
      <div className={`${heightClass} relative`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
          <div className="max-w-7xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/70 mt-2 text-sm sm:text-lg"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
