import { isValid, parseISO } from "date-fns";
import BookingClient from "./BookingClient";
import pricing from "@/data/pricing.json";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function validDate(v: string | string[] | undefined): string | null {
  return typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && isValid(parseISO(v)) ? v : null;
}

export default async function BookPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  let checkIn = validDate(params.checkIn);
  let checkOut = validDate(params.checkOut);
  if (!checkIn || !checkOut || checkOut <= checkIn) {
    checkIn = null;
    checkOut = null;
  }
  const guests = Number(params.guests);
  const initialGuests =
    Number.isInteger(guests) && guests >= 1 && guests <= pricing.accommodation.maxGuests ? guests : 2;

  // Key on the dates so that arriving at /book with new dates (e.g. from the Book Now
  // dialog's Reserve, which can land on /book while already on /book) remounts the form
  // with those dates instead of keeping the earlier, empty state.
  return (
    <BookingClient
      key={`${checkIn ?? ""}-${checkOut ?? ""}-${initialGuests}`}
      initialCheckIn={checkIn}
      initialCheckOut={checkOut}
      initialGuests={initialGuests}
    />
  );
}
