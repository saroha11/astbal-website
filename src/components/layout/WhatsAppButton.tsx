"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hi ASTBAL! I'm interested in booking a stay.")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </motion.a>
  );
}
