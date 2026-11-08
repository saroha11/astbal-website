"use client";

import { MessageCircle } from "lucide-react";
import { BookNowButton } from "@/components/booking/BookingDialog";
import { siteConfig } from "@/data/siteConfig";

// Phone-only bar pinned to the bottom of every page: the two things a guest most
// wants are always one tap away — start a booking, or ask on WhatsApp.
export default function MobileBookingBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-stone-200 px-3 py-2.5 flex items-center gap-2 [padding-bottom:calc(0.625rem+env(safe-area-inset-bottom))]">
      <BookNowButton
        location="mobile_bar"
        className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-green-700 transition-colors"
      >
        Book Now
      </BookNowButton>
      <a
        href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hi ASTBAL! I'm interested in booking a stay.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        data-track-location="mobile_bar"
        className="shrink-0 w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center hover:brightness-95 transition"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
