import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Stay — Check Availability & Pricing",
  description: "Book your stay at ASTBAL. Check availability on our live calendar, see pricing per date, add horse riding, orchard visits & more. Just 1 hour from Delhi NCR.",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
