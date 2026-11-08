"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Send, User, Phone, Minus, Plus, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";
import AvailabilityCalendar from "@/components/booking/AvailabilityCalendar";
import AddOnsSelector from "@/components/booking/AddOnsSelector";
import { calculateTotalPrice, formatPrice } from "@/lib/bookingEngine";
import { siteConfig } from "@/data/siteConfig";
import { trackEvent } from "@/lib/analytics";
import pricingData from "@/data/pricing.json";

const { accommodation } = pricingData;

// "2026-11-09" -> "Mon, 9 Nov 2026"
function prettyDate(date: string) {
  return format(new Date(date + "T00:00:00"), "EEE, d MMM yyyy");
}

// The whole booking in one panel (used inside the Book Now dialog): pick dates and
// guests, optionally add experiences, enter name + phone, and send the request —
// no separate page. Email is not asked for; we confirm on WhatsApp.
export default function DialogBooking({ onClose }: { onClose?: () => void }) {
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [guests, setGuests] = useState(accommodation.baseGuests);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const pricing = useMemo(
    () => (checkIn && checkOut ? calculateTotalPrice(checkIn, checkOut, guests, selectedAddons) : null),
    [checkIn, checkOut, guests, selectedAddons],
  );

  const toggleAddon = (id: string) =>
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));

  const canSubmit = !!pricing && form.name.trim().length >= 2 && form.phone.trim().length >= 6 && !isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut || !pricing || !canSubmit) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, checkIn, checkOut, guests, addons: selectedAddons }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Booking failed. Please try again.");
        return;
      }
      trackEvent("generate_lead", { nights: pricing.nights, guests, addon_count: selectedAddons.length });

      const addonNames = pricing.addons.map((a) => a.name);
      const message = data.alerted
        ? `Hi ASTBAL! I just sent booking request #${data.id} for ${prettyDate(checkIn)} to ${prettyDate(checkOut)} (${guests} guests).`
        : `🌿 *New Booking — ASTBAL*\n\n*Booking #:* ${data.id}\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Check-in:* ${prettyDate(checkIn)}\n*Check-out:* ${prettyDate(checkOut)}\n*Guests:* ${guests}\n*Add-ons:* ${addonNames.length ? addonNames.join(", ") : "None"}\n*Total:* ${formatPrice(data.total ?? pricing.total)}`;
      const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
      setWhatsappUrl(url);
      if (!data.alerted) window.open(url, "_blank");
      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <span className="inline-flex w-14 h-14 rounded-full bg-green-100 text-green-600 items-center justify-center mb-4">
          <CheckCircle className="w-7 h-7" />
        </span>
        <h3 className="text-xl font-bold text-stone-900" style={{ fontFamily: "var(--font-heading)" }}>
          Request sent!
        </h3>
        <p className="text-sm text-stone-600 mt-2 max-w-sm mx-auto">
          We&rsquo;ll WhatsApp or call you within a few hours to confirm your dates. No payment until we confirm.
        </p>
        <div className="mt-5 flex flex-col items-center gap-3">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors"
            >
              <MessageSquare className="w-4 h-4" /> Send us the details on WhatsApp
            </a>
          )}
          <button
            type="button"
            onClick={() => onClose?.()}
            className="text-stone-500 text-sm font-medium hover:text-stone-800"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AvailabilityCalendar onSelectDates={(ci, co) => { setCheckIn(ci); setCheckOut(co); }} selectedCheckIn={checkIn} selectedCheckOut={checkOut} />

      {/* Guests */}
      <div className="flex items-center justify-between rounded-2xl border border-stone-200 px-4 py-3">
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wide text-stone-900">Guests</span>
          <span className="block text-sm text-stone-700">{guests} guest{guests > 1 ? "s" : ""}</span>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1}
            className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center hover:border-stone-900 disabled:opacity-30" aria-label="Fewer guests">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button type="button" onClick={() => setGuests((g) => Math.min(accommodation.maxGuests, g + 1))} disabled={guests >= accommodation.maxGuests}
            className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center hover:border-stone-900 disabled:opacity-30" aria-label="More guests">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Optional add-ons */}
      <AddOnsSelector selectedAddons={selectedAddons} onToggle={toggleAddon} onClear={() => setSelectedAddons([])} />

      {/* Name + phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input type="text" placeholder="Full name *" required autoComplete="name" aria-label="Full name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm text-stone-800 bg-stone-50" />
        </div>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input type="tel" placeholder="Phone number *" required autoComplete="tel" inputMode="tel" aria-label="Phone number" value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-sm text-stone-800 bg-stone-50" />
        </div>
      </div>

      {submitError && (
        <p role="alert" className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-xl px-3.5 py-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" /> {submitError}
        </p>
      )}

      {/* Total + submit */}
      {pricing ? (
        <div className="flex items-center justify-between gap-3 bg-green-50 rounded-xl px-4 py-3 text-sm">
          <span className="text-stone-600">
            {prettyDate(checkIn!)} → {prettyDate(checkOut!)} · {pricing.nights} night{pricing.nights > 1 ? "s" : ""}
          </span>
          <span className="font-bold text-green-700 text-base shrink-0">{formatPrice(pricing.total)}</span>
        </div>
      ) : (
        <p className="text-center text-xs sm:text-sm text-amber-700 bg-amber-50 rounded-xl px-4 py-2.5">
          {checkIn ? "Now pick your check-out date above" : "Pick your check-in date above to see the price"}
        </p>
      )}

      <button type="submit" disabled={!canSubmit}
        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3.5 rounded-full font-semibold text-sm sm:text-base hover:bg-green-700 transition-all shadow-sm disabled:bg-stone-300 disabled:cursor-not-allowed">
        <Send className="w-4 h-4" /> {isSubmitting ? "Sending..." : "Request Booking"}
      </button>
      <p className="text-center text-[10px] sm:text-xs text-stone-400">
        No payment now. We&rsquo;ll contact you to confirm.
      </p>
    </form>
  );
}
