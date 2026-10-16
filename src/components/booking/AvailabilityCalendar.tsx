"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from "date-fns";
import {
  getMonthDates,
  monthNames,
  weekdays,
  formatPrice,
} from "@/lib/bookingEngine";
import type { BookingDate } from "@/types";

interface AvailabilityCalendarProps {
  onSelectDates: (checkIn: string, checkOut: string) => void;
  selectedCheckIn: string | null;
  selectedCheckOut: string | null;
}

export default function AvailabilityCalendar({
  onSelectDates,
  selectedCheckIn,
  selectedCheckOut,
}: AvailabilityCalendarProps) {
  const [viewDate, setViewDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [monthDates, setMonthDates] = useState<BookingDate[]>([]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthStart = startOfMonth(viewDate);
  const startDay = monthStart.getDay();

  useEffect(() => {
    let cancelled = false;
    getMonthDates(year, month).then((dates) => {
      if (!cancelled) setMonthDates(dates);
    });
    return () => { cancelled = true; };
  }, [year, month]);

  const prevMonth = () => setViewDate(new Date(year, month - 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1));

  const checkInDate = selectedCheckIn ? new Date(selectedCheckIn + "T00:00:00") : null;
  const checkOutDate = selectedCheckOut ? new Date(selectedCheckOut + "T00:00:00") : null;

  const isDateInRange = (day: Date) => {
    if (!checkInDate || !checkOutDate) return false;
    return day > checkInDate && day < checkOutDate;
  };

  const handleDateClick = (bookingDate: BookingDate) => {
    if (bookingDate.status === "booked") return;
    if (!selectedCheckIn || (selectedCheckIn && selectedCheckOut)) {
      // Start new selection
      onSelectDates(bookingDate.date, "");
    } else if (bookingDate.date > selectedCheckIn) {
      // Set check-out
      onSelectDates(selectedCheckIn, bookingDate.date);
    } else {
      // Clicked before check-in, restart
      onSelectDates(bookingDate.date, "");
    }
  };

  const bookingDateMap = useMemo(() => {
    const map = new Map<string, BookingDate>();
    for (const bd of monthDates) map.set(bd.date, bd);
    return map;
  }, [monthDates]);

  const daysInMonth = eachDayOfInterval({ start: monthStart, end: endOfMonth(viewDate) });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={prevMonth}
          className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 hover:border-stone-300 transition-colors shrink-0"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-stone-600" />
        </button>
        <h3
          className="text-lg sm:text-xl font-bold text-stone-900"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {monthNames[month]} {year}
        </h3>
        <button
          onClick={nextMonth}
          className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 hover:border-stone-300 transition-colors shrink-0"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-stone-600" />
        </button>
      </div>

      {/* Selection summary */}
      {(selectedCheckIn || selectedCheckOut) && (
        <div className="mb-4 flex items-center justify-center gap-3 sm:gap-6 bg-stone-50 rounded-xl py-2.5 px-3 text-xs sm:text-sm">
          <div className="text-center">
            <div className="text-stone-400 text-[10px] uppercase tracking-wide">Check-in</div>
            <div className="font-semibold text-stone-800">
              {selectedCheckIn ? format(new Date(selectedCheckIn + "T00:00:00"), "dd MMM") : "—"}
            </div>
          </div>
          <div className="text-stone-300">→</div>
          <div className="text-center">
            <div className="text-stone-400 text-[10px] uppercase tracking-wide">Check-out</div>
            <div className="font-semibold text-stone-800">
              {selectedCheckOut ? format(new Date(selectedCheckOut + "T00:00:00"), "dd MMM") : "—"}
            </div>
          </div>
        </div>
      )}

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-center text-[11px] sm:text-xs font-bold text-stone-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {daysInMonth.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const bookingDate = bookingDateMap.get(dateStr);
          const today = isToday(day);
          const isCheckIn = checkInDate && isSameDay(day, checkInDate);
          const isCheckOut = checkOutDate && isSameDay(day, checkOutDate);
          const selected = isCheckIn || isCheckOut;
          const inRange = isDateInRange(day);

          // Past dates or dates not in booking map = not bookable
          if (!bookingDate) {
            return (
              <div
                key={dateStr}
                className="aspect-square rounded-lg flex items-center justify-center text-stone-300 text-xs sm:text-sm"
              >
                {format(day, "d")}
              </div>
            );
          }

          const isBooked = bookingDate.status === "booked";
          const isLimited = bookingDate.status === "limited";

          return (
            <div
              key={dateStr}
              className="relative"
              onMouseEnter={() => setHoveredDate(dateStr)}
              onMouseLeave={() => setHoveredDate(null)}
            >
              <button
                onClick={() => handleDateClick(bookingDate)}
                disabled={isBooked}
                className={`
                  w-full aspect-square rounded-lg flex flex-col items-center justify-center
                  text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-150
                  relative
                  ${isBooked
                    ? "bg-red-50 text-red-300 cursor-not-allowed line-through"
                    : selected
                    ? "bg-sky-500 text-white shadow-md ring-2 ring-sky-300 ring-offset-1 scale-105"
                    : inRange
                    ? "bg-sky-100 text-sky-700"
                    : isLimited
                    ? "bg-amber-50 text-amber-700 hover:bg-amber-100 hover:scale-105"
                    : "bg-green-50 text-green-700 hover:bg-green-100 hover:scale-105"
                  }
                  ${today && !selected ? "ring-2 ring-green-400 ring-offset-1" : ""}
                `}
              >
                <span>{format(day, "d")}</span>
                {/* Weekend badge - only on available/limited, not selected or booked */}
                {!isBooked && !selected && bookingDate.isWeekend && (
                  <span className="text-[7px] sm:text-[8px] leading-none opacity-50 font-bold">
                    WE
                  </span>
                )}
                {/* Selected label */}
                {isCheckIn && (
                  <span className="text-[7px] sm:text-[8px] leading-none font-bold mt-0.5">
                    IN
                  </span>
                )}
                {isCheckOut && (
                  <span className="text-[7px] sm:text-[8px] leading-none font-bold mt-0.5">
                    OUT
                  </span>
                )}
              </button>

              {/* Tooltip (desktop only) */}
              {hoveredDate === dateStr && !isBooked && (
                <div className="hidden sm:block absolute top-full left-1/2 -translate-x-1/2 z-30 mt-1 bg-stone-900 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap pointer-events-none">
                  {formatPrice(bookingDate.price)}/night
                  {bookingDate.isPeak && " ⭐ Peak"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 pt-4 border-t border-stone-100">
        <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center text-xs text-stone-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-green-50 border border-green-200" />
            Available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-amber-50 border border-amber-200" />
            Limited
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-red-50 border border-red-200" />
            Booked
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-sky-500" />
            Selected
          </span>
        </div>
        <p className="text-center text-[11px] text-stone-400 mt-2.5 flex items-center justify-center gap-1">
          <Info className="w-3 h-3" />
          <span className="hidden sm:inline">Hover dates for pricing · </span>
          Tap check-in then check-out · WE = Weekend
        </p>
      </div>
    </div>
  );
}
