import Image from "next/image";
import Link from "next/link";
import { ChevronDown, MapPin, ShieldCheck } from "lucide-react";
import { BookNowButton } from "@/components/booking/BookingDialog";
import { getStartingPrice } from "@/lib/bookingEngine";

// Only claims that are true today. Add a rating here once there are real reviews.
const trustBadges = ["Free cancellation", "WhatsApp confirmation", "Pay after we confirm", "No hidden charges"];

export default function Hero() {
  const pricePerNight = getStartingPrice();

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-stone-900">
      {/* Aerial photo of the farm (a still from our drone video), optimized and preloaded */}
      <Image
        src="/images/hero/farm-aerial.jpg"
        alt="Aerial view of the ASTBAL farm: orchard, horse arena and container house surrounded by green fields"
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/65" />

      <div className="relative z-10 text-center px-5 sm:px-6 w-full max-w-4xl mx-auto pt-24 pb-20 [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Experience Nature at <span className="text-green-400">ASTBAL</span>
        </h1>
        <p className="text-base sm:text-xl text-white/90 max-w-2xl mx-auto mb-4 leading-relaxed">
          Stay • Ride • Harvest • Dine, on a private farm an hour from Delhi
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-8 text-white/90 text-sm">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> 1hr from Delhi NCR
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Entire farm, one group at a time
          </span>
          <span className="text-amber-400 font-semibold">from ₹{pricePerNight.toLocaleString("en-IN")}/night</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <BookNowButton className="w-full sm:w-auto bg-green-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors shadow-xl">
            Book Now
          </BookNowButton>
          <Link
            href="/accommodation"
            className="w-full sm:w-auto bg-white/15 backdrop-blur-sm text-white border border-white/40 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/25 transition-colors"
          >
            See the stay
          </Link>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 mt-7 text-xs sm:text-sm text-white/85">
          {trustBadges.map((badge) => (
            <li key={badge} className="flex items-center gap-1.5">
              <span className="text-green-400">✓</span> {badge}
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#why-astbal"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-white animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}
