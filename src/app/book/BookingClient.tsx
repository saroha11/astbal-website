"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Send, User, Mail, Phone, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import AvailabilityCalendar from "@/components/booking/AvailabilityCalendar";
import AddOnsSelector from "@/components/booking/AddOnsSelector";
import PriceBreakdown from "@/components/booking/PriceBreakdown";
import PageHero from "@/components/layout/PageHero";
import { calculateTotalPrice, formatPrice } from "@/lib/bookingEngine";
import { siteConfig } from "@/data/siteConfig";

// "2026-11-09" -> "Mon, 9 Nov 2026"
function prettyDate(date: string) {
  return format(new Date(date + "T00:00:00"), "EEE, d MMM yyyy");
}

interface BookingClientProps {
  initialCheckIn: string | null;
  initialCheckOut: string | null;
  initialGuests: number;
}

export default function BookingClient({ initialCheckIn, initialCheckOut, initialGuests }: BookingClientProps) {
  const [checkIn, setCheckIn] = useState<string | null>(initialCheckIn);
  const [checkOut, setCheckOut] = useState<string | null>(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

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
    if (!checkIn || !checkOut || !pricing || isSubmitting) return;
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
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitError(data.error || "Booking failed. Please try again.");
        return;
      }

      // Also send WhatsApp so the owner is notified right away
      if (data.alerted) {
        // We were alerted automatically (email/Telegram); WhatsApp is just an optional button
        const message = `Hi ASTBAL! I just sent booking request #${data.id} for ${prettyDate(checkIn)} to ${prettyDate(checkOut)} (${guests} guests).`;
        setWhatsappUrl(`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`);
      } else {
        // No automatic alerts set up yet: open WhatsApp with the full details so the guest can send them to us
        const addonNames = pricing.addons.map((a) => a.name);
        const message = `🌿 *New Booking — ASTBAL*\n\n*Booking #:* ${data.id}\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Check-in:* ${prettyDate(checkIn)}\n*Check-out:* ${prettyDate(checkOut)}\n*Guests:* ${guests}\n*Add-ons:* ${addonNames.length > 0 ? addonNames.join(", ") : "None"}\n*Total:* ${formatPrice(data.total ?? pricing.total)}`;
        const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
        setWhatsappUrl(url);
        window.open(url, "_blank");
      }

      setSubmitted(true);
      window.scrollTo({ top: 0 });
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    const nextSteps = [
      "We've received your request and will WhatsApp or email you within a few hours to confirm.",
      "Once confirmed, pay by UPI or bank transfer to lock your dates.",
      "Free cancellation up to 48 hours before check-in.",
    ];
    return (
      <section className="min-h-screen pt-20 bg-stone-50">
        <div className="max-w-lg mx-auto px-4 py-12 sm:py-20">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sm:p-10 text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Request Received!</h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-6">Your dates are not confirmed yet. Here&rsquo;s what happens next:</p>
            <ol className="text-left space-y-3 mb-6">
              {nextSteps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-stone-700">
                  <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <div className="bg-stone-50 rounded-xl p-4 mb-6 text-left space-y-1.5 text-xs sm:text-sm">
              <p><span className="text-stone-400">Check-in:</span> <span className="font-medium text-stone-800">{checkIn && prettyDate(checkIn)}</span></p>
              <p><span className="text-stone-400">Check-out:</span> <span className="font-medium text-stone-800">{checkOut && prettyDate(checkOut)}</span></p>
              <p><span className="text-stone-400">Guests:</span> <span className="font-medium text-stone-800">{guests}</span></p>
              {pricing && <p><span className="text-stone-400">Total:</span> <span className="font-bold text-green-600 text-base">{formatPrice(pricing.total)}</span></p>}
            </div>
            <div className="flex flex-col gap-3">
              {whatsappUrl && (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-green-700 transition-colors">
                  <MessageSquare className="w-4 h-4" /> Questions? Chat with us on WhatsApp
                </a>
              )}
              <button onClick={() => { setSubmitted(false); setWhatsappUrl(""); setCheckIn(null); setCheckOut(null); setSelectedAddons([]); setFormData({ name: "", email: "", phone: "" }); }}
                className="text-stone-500 px-6 py-2 rounded-full font-medium text-sm hover:text-stone-800 transition-colors">
                Book another stay
              </button>
            </div>
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
                      <input type="text" placeholder="Full Name *" required autoComplete="name" aria-label="Full name" value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm text-stone-800 bg-stone-50" />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input type="email" placeholder="Email *" required autoComplete="email" aria-label="Email" value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm text-stone-800 bg-stone-50" />
                    </div>
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input type="tel" placeholder="Phone Number *" required autoComplete="tel" inputMode="tel" aria-label="Phone number" value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm text-stone-800 bg-stone-50" />
                  </div>
                  {submitError && (
                    <p role="alert" className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-xl px-3.5 py-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0" /> {submitError}
                    </p>
                  )}
                  {/* Total right above the button: on phones the price summary sits below the form */}
                  {pricing ? (
                    <div className="flex items-center justify-between gap-3 bg-green-50 rounded-xl px-4 py-3 text-sm">
                      <span className="text-stone-600">
                        {prettyDate(checkIn!)} → {prettyDate(checkOut!)} · {pricing.nights} night{pricing.nights > 1 ? "s" : ""}
                      </span>
                      <span className="font-bold text-green-700 text-base shrink-0">{formatPrice(pricing.total)}</span>
                    </div>
                  ) : (
                    <p className="text-center text-xs sm:text-sm text-amber-700 bg-amber-50 rounded-xl px-4 py-2.5">
                      {checkIn ? "Now pick your check-out date on the calendar" : "Pick your check-in date on the calendar to continue"}
                    </p>
                  )}
                  <button type="submit"
                    disabled={!pricing || !formData.name || !formData.email || !formData.phone || isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3.5 rounded-full font-semibold text-sm sm:text-base hover:bg-green-700 transition-all shadow-sm disabled:bg-stone-300 disabled:cursor-not-allowed">
                    <Send className="w-4 h-4" /> {isSubmitting ? "Sending..." : "Request Booking"}
                  </button>
                  <p className="text-center text-[10px] sm:text-xs text-stone-400">
                    No payment now. We&rsquo;ll contact you to confirm. Questions?{" "}
                    <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-green-600">WhatsApp us</a>
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
