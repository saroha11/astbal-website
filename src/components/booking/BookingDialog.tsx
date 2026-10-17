"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import BookingCard from "@/components/stay/BookingCard";

// One "Book Now" panel for the whole site: any BookNowButton opens it, showing the
// booking card with its calendar already open (dates, guests, live total -> /book).
const BookingDialogContext = createContext<() => void>(() => {});

export function BookingDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close when the guest continues to /book (or navigates anywhere else)
  const [openedOn, setOpenedOn] = useState(pathname);
  if (open && pathname !== openedOn) setOpen(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <BookingDialogContext.Provider
      value={() => {
        setOpenedOn(pathname);
        setOpen(true);
      }}
    >
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[80] bg-black/50 flex items-end sm:items-center justify-center sm:p-6"
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Book your stay"
        >
          <div className="relative w-full md:w-[720px] max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white">
            <div className="sticky top-0 z-50 flex items-center justify-between bg-white px-5 py-3 border-b border-stone-100">
              <p className="font-bold text-stone-900" style={{ fontFamily: "var(--font-heading)" }}>
                Book your stay
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-stone-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-5 min-h-[560px]">
              <BookingCard startOpen id="reserve-dialog" />
            </div>
          </div>
        </div>
      )}
    </BookingDialogContext.Provider>
  );
}

export function BookNowButton({
  className,
  children = "Book Now",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const open = useContext(BookingDialogContext);
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
