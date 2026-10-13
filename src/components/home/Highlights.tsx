"use client";

import { motion } from "framer-motion";
import { Home, TreePine, UtensilsCrossed, Dog, Star, PawPrint } from "lucide-react";

const highlights = [
  {
    icon: Home,
    title: "Container House",
    description: "Modern 1 BHK container home with all amenities, surrounded by nature",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: PawPrint,
    title: "Horse Riding",
    description: "1-acre riding arena in open fields with trained horses & expert handlers",
    color: "bg-sky-50 text-sky-600",
  },
  {
    icon: TreePine,
    title: "Guava Orchard",
    description: "Hand-pick fresh guavas from our lush organic orchard",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: UtensilsCrossed,
    title: "Farm Kitchen",
    description: "Harvest vegetables & cook with our chef — farm-to-table dining",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Dog,
    title: "Friendly Dogs",
    description: "Our Labradors & canines will make your stay even more joyful",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Star,
    title: "2 Acres of Nature",
    description: "Open fields, grass beds, and serene countryside just 1hr from Delhi",
    color: "bg-sky-50 text-sky-600",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Highlights() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-green-600 font-semibold text-xs sm:text-sm uppercase tracking-widest"
          >
            What Awaits You
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-stone-900" style={{ fontFamily: "var(--font-heading)" }}
          >
            Why Choose ASTBAL?
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {highlights.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="p-5 sm:p-6 rounded-2xl bg-stone-50 hover:bg-white hover:shadow-lg transition-all duration-300 border border-stone-100 hover:border-stone-200"
            >
              <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-stone-900 mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                {item.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
