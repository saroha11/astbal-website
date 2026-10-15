"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import AvailabilityCalendar from "@/components/booking/AvailabilityCalendar";
import AddOnsSelector from "@/components/booking/AddOnsSelector";
import PriceBreakdown from "@/components/booking/PriceBreakdown";
import BookingCard from "@/components/booking/BookingCard";
import PageHero from "@/components/layout/PageHero";
import { calculateTotalPrice, formatPrice } from "@/lib/bookingEngine";
import { siteConfig } from "@/data/siteConfig";

export default function BookPage() {
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", specialRequests: "" });
  const [submitted, setSubmitted] = useState(false);

  const pricing = useMemo(() => {
    if (!checkIn || !checkOut) return null;
    return calculateTotalPrice(checkIn, checkOut, guests, selectedAddons);
  }, [checkIn, checkOut, guests, selectedAddons]);

  const handleSelectDates = (checkInDate: string, checkOutDate: string) => {
    setCheckIn(checkInDate);
    setCheckOut(checkOutDate);
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) => prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut || !pricing) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          checkIn,
          checkOut,
          guests,
          addons: selectedAddons,
          specialRequests: formData.specialRequests,
          total: pricing.total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error || "Booking failed. Please try again.");
        return;
      }

      // Also send WhatsApp as backup
      const message = `🌿 *New Booking — ASTBAL*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Check-in:* ${checkIn}\n*Check-out:* ${checkOut}\n*Guests:* ${guests}\n*Add-ons:* ${selectedAddons.length > 0 ? selectedAddons.join(", ") : "None"}\n*Requests:* ${formData.specialRequests || "None"}\n*Total:* ${formatPrice(pricing.total)}`;
      window.open(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");

      setSubmitted(true);
    } catch (err) {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="min-h-screen pt-20 bg-stone-50">
        <div className="max-w-lg mx-auto px-4 py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 sm:p-10 text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Booking Request Sent!</h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-6">Your request has been saved and sent via WhatsApp. Our team will confirm within a few hours.</p>
            <div className="bg-stone-50 rounded-xl p-4 mb-6 text-left space-y-1.5 text-xs sm:text-sm">
              <p><span className="text-stone-400">Check-in:</span> <span className="font-medium text-stone-800">{checkIn}</span></p>
              <p><span className="text-stone-400">Check-out:</span> <span className="font-medium text-stone-800">{checkOut}</span></p>
              <p><span className="text-stone-400">Guests:</span> <span className="font-medium text-stone-800">{guests}</span></p>
              {pricing && <p><span className="text-stone-400">Total:</span> <span className="font-bold text-green-600 text-base">{formatPrice(pricing.total)}</span></p>}
            </div>
            <button onClick={() => { setSubmitted(false); setCheckIn(null); setCheckOut(null); setSelectedAddons([]); setFormData({ name: "", email: "", phone: "", specialRequests: "" }); }}
              className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-green-700 transition-colors">
              Book Another Stay
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        image="/images/hero/nature-retreat.jpg"
        title="Book Your Stay"
        subtitle="Select your dates and experiences"
        height="sm"
      />

      {/* Booking Content */}
      <section className="py-8 sm:py-12 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              <AvailabilityCalendar onSelectDates={handleSelectDates} selectedCheckIn={checkIn} selectedCheckOut={checkOut} />
              <AddOnsSelector selectedAddons={selectedAddons} onToggle={toggleAddon} />

              {/* Booking Form */}
              <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Your Details</h3>
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input type="text" placeholder="Full Name *" required value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm text-stone-800 bg-stone-50" />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input type="email" placeholder="Email *" required value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm text-stone-800 bg-stone-50" />
                    </div>
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input type="tel" placeholder="Phone Number *" required value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm text-stone-800 bg-stone-50" />
                  </div>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                    <textarea placeholder="Special Requests (optional)" rows={3} value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm text-stone-800 bg-stone-50 resize-none" />
                  </div>
                  <button type="submit"
                    disabled={!checkIn || !checkOut || !formData.name || !formData.phone}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3.5 rounded-full font-semibold text-sm sm:text-base hover:bg-green-700 transition-all shadow-sm disabled:bg-stone-300 disabled:cursor-not-allowed">
                    <Send className="w-4 h-4" /> Send Booking via WhatsApp
                  </button>
                  <p className="text-center text-[10px] sm:text-xs text-stone-400">
                    Your request will be sent via WhatsApp. You can also call us at{" "}
                    <a href={`tel:${siteConfig.phone}`} className="text-green-600">{siteConfig.phone}</a>
                  </p>
                </form>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                <PriceBreakdown checkIn={checkIn} checkOut={checkOut} guests={guests} pricing={pricing} onGuestsChange={setGuests} />
                <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4 sm:p-5">
                  <h4 className="font-semibold text-stone-800 text-sm mb-3">Why Book With Us</h4>
                  <div className="space-y-2 text-[10px] sm:text-xs text-stone-500">
                    <p>✓ No hidden charges</p>
                    <p>✓ Free cancellation (48 hrs before)</p>
                    <p>✓ Direct WhatsApp confirmation</p>
                    <p>✓ Flexible check-in/check-out</p>
                    <p>✓ Personalized experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
