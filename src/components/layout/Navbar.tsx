"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, TreePine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BookNowButton } from "@/components/booking/BookingDialog";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/accommodation", label: "Stay" },
  { href: "/experiences", label: "Experiences" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shrink-0">
              <TreePine className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <span className="block text-lg font-bold tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
                ASTBAL
              </span>
              <span className="block text-[10px] text-stone-500 -mt-0.5 whitespace-nowrap">
                Farm &amp; Retreat
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-green-700 transition-colors rounded-lg hover:bg-green-50 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Book Button + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <BookNowButton className="inline-flex items-center bg-green-600 text-white px-4 py-2 lg:px-5 lg:py-2.5 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm whitespace-nowrap" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6 text-stone-700" /> : <Menu className="w-6 h-6 text-stone-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-stone-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2.5 px-4 text-stone-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
