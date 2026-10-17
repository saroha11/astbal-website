"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Clock, Minus, Plus, Sun, X } from "lucide-react";
import { calculateTotalPrice, formatPrice, getBlockedDates, getBookedDates } from "@/lib/bookingEngine";
import { siteConfig } from "@/data/siteConfig";
import pricing from "@/data/pricing.json";

const { accommodation } = pricing;
const ymd = (d: Date) => format(d, "yyyy-MM-dd");

// Airbnb-style reserve card: pick dates + guests, see the live total, then continue to /book pre-filled.
// `startOpen` opens the calendar straight away (used in the Book Now panel).
export default function BookingCard({ startOpen = false, id = "reserve" }: { startOpen?: boolean; id?: string }) {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(accommodation.baseGuests);
  const [calendarOpen, setCalendarOpen] = useState(startOpen);
  const [booked, setBooked] = useState<Set<string>>(() => getBlockedDates());
  const [wide, setWide] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Booked nights for the next 6 months (one request), merged with manually blocked dates
  useEffect(() => {
    getBookedDates(ymd(today), ymd(addDays(today, 183))).then((nights) =>
      setBooked((prev) => new Set([...prev, ...nights]))
    );
  }, [today]);

  // Two months side by side on wider screens, one on phones
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Close the calendar on outside click / Esc
  useEffect(() => {
    if (!calendarOpen) return;
    const onDown = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) setCalendarOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCalendarOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [calendarOpen]);

  // Every night from check-in up to (not including) the given day must be free
  const nightsFree = (from: Date, to: Date) => {
    for (let d = from; d < to; d = addDays(d, 1)) if (booked.has(ymd(d))) return false;
    return true;
  };

  // While choosing check-out: allow days after check-in within the max stay, even if that day itself is booked
  const choosingCheckOut = !!checkIn && !checkOut;
  // (dates before check-in stay clickable to start over)
  const isSelectable = (date: Date) => {
    if (choosingCheckOut && date > checkIn!) {
      const nights = differenceInCalendarDays(date, checkIn!);
      return nights <= accommodation.maxNights && nightsFree(checkIn!, date);
    }
    return !booked.has(ymd(date));
  };

  const onChange = ([start, end]: [Date | null, Date | null]) => {
    setCheckIn(start);
    setCheckOut(end);
    if (start && end) setCalendarOpen(false);
  };

  const quote =
    checkIn && checkOut ? calculateTotalPrice(ymd(checkIn), ymd(checkOut), guests, []) : null;
  const bookHref =
    checkIn && checkOut ? `/book?checkIn=${ymd(checkIn)}&checkOut=${ymd(checkOut)}&guests=${guests}` : "/book";

  const dateBox = (label: string, value: Date | null) => (
    <button
      type="button"
      onClick={() => setCalendarOpen(true)}
      className="text-left px-3 py-2.5 hover:bg-stone-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-[inherit]"
    >
      <span className="block text-[10px] font-bold uppercase tracking-wide text-stone-900">{label}</span>
      <span className={`block text-sm ${value ? "text-stone-900" : "text-stone-500"}`}>
        {value ? format(value, "d MMM yyyy") : "Add date"}
      </span>
    </button>
  );

  return (
    <div ref={cardRef} id={id} className="relative scroll-mt-28">
      <div className="rounded-2xl border border-stone-200 shadow-[0_6px_16px_rgba(0,0,0,0.12)] p-6 bg-white">
        <p className="text-stone-900">
          {quote ? (
            <>
              <span className="text-2xl font-bold">{formatPrice(Math.round(quote.accommodationCost / quote.nights))}</span>
              <span className="text-stone-500"> night avg</span>
            </>
          ) : (
            // No price until dates are picked
            <span className="text-xl font-bold">Add dates for prices</span>
          )}
        </p>

        {/* Dates + guests, like Airbnb's three-part box */}
        <div className="mt-5 rounded-xl border border-stone-400">
          <div className="grid grid-cols-2 divide-x divide-stone-400 border-b border-stone-400">
            {dateBox("Check-in", checkIn)}
            {dateBox("Checkout", checkOut)}
          </div>
          <div className="flex items-center justify-between px-3 py-2.5">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wide text-stone-900">Guests</span>
              <span className="block text-sm text-stone-900">
                {guests} guest{guests > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                disabled={guests <= 1}
                className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center hover:border-stone-900 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Fewer guests"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.min(accommodation.maxGuests, g + 1))}
                disabled={guests >= accommodation.maxGuests}
                className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center hover:border-stone-900 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="More guests"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {quote ? (
          <Link
            href={bookHref}
            className="mt-4 w-full inline-flex items-center justify-center bg-green-600 text-white py-3.5 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Reserve
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setCalendarOpen(true)}
            className="mt-4 w-full bg-green-600 text-white py-3.5 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Check availability
          </button>
        )}
        <p className="text-center text-xs text-stone-500 mt-3">You won&rsquo;t pay anything yet</p>

        {/* Live price breakdown */}
        {quote && (
          <div className="mt-5 space-y-3 text-sm" aria-live="polite">
            <div className="flex justify-between text-stone-700">
              <span className="underline underline-offset-2 decoration-stone-300">
                {quote.nights} night{quote.nights > 1 ? "s" : ""}
              </span>
              <span>{formatPrice(quote.accommodationCost)}</span>
            </div>
            {quote.extraGuestCost > 0 && (
              <div className="flex justify-between text-stone-700">
                <span className="underline underline-offset-2 decoration-stone-300">
                  Extra guest{guests - accommodation.baseGuests > 1 ? "s" : ""} ({guests - accommodation.baseGuests} × {formatPrice(accommodation.extraGuest)} × {quote.nights})
                </span>
                <span>{formatPrice(quote.extraGuestCost)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-stone-900 pt-3 border-t border-stone-200">
              <span>Total</span>
              <span>{formatPrice(quote.total)}</span>
            </div>
            <p className="text-xs text-stone-500">Add riding, meals and bonfire on the next step.</p>
          </div>
        )}

        <div className="space-y-1.5 mt-5 pt-5 border-t border-stone-200 text-xs text-stone-600">
          <p className="flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 shrink-0" /> Check-in after {siteConfig.checkIn.label}
          </p>
          <p className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 shrink-0" /> Checkout before {siteConfig.checkOut.label}
          </p>
        </div>
      </div>

      {/* Calendar popover: opens over the card, wide enough for two months on bigger screens */}
      {calendarOpen && (
        <div className="booking-calendar absolute z-40 top-0 right-0 w-full md:w-[680px] bg-white rounded-2xl border border-stone-200 shadow-2xl p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-bold text-stone-900 text-lg">
                {quote ? `${quote.nights} night${quote.nights > 1 ? "s" : ""}` : checkIn ? "Select checkout date" : "Select check-in date"}
              </p>
              <p className="text-xs text-stone-500">
                {checkIn
                  ? `${format(checkIn, "d MMM")}${checkOut ? ` – ${format(checkOut, "d MMM yyyy")}` : ""}`
                  : `Minimum stay: ${accommodation.minNights} night · up to ${accommodation.maxNights} nights`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCalendarOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-stone-100"
              aria-label="Close calendar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <DatePicker
            inline
            selectsRange
            startDate={checkIn}
            endDate={checkOut}
            onChange={onChange}
            minDate={today}
            maxDate={addDays(today, 365)}
            filterDate={isSelectable}
            monthsShown={wide ? 2 : 1}
          />
          <div className="flex justify-between items-center mt-3">
            <button
              type="button"
              onClick={() => { setCheckIn(null); setCheckOut(null); }}
              className="text-sm font-semibold text-stone-900 underline underline-offset-4 disabled:text-stone-300"
              disabled={!checkIn}
            >
              Clear dates
            </button>
            <button
              type="button"
              onClick={() => setCalendarOpen(false)}
              className="text-sm font-semibold bg-stone-900 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Phone-only bar pinned to the bottom of the screen that jumps to the card above
export function MobileReserveBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-stone-200 px-4 py-3 flex items-center justify-between">
      <p className="text-stone-900">
        <span className="font-bold">Add dates for prices</span>
        <span className="block text-xs text-stone-500">Free cancellation · 48 hrs</span>
      </p>
      <a
        href="#reserve"
        className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
      >
        Check dates
      </a>
    </div>
  );
}
