import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/accommodation",
  "Private Farm Stay Near Delhi: Container House",
  "Book the whole farm for your group: a 1 BHK container house with AC and WiFi, horses and open fields, about an hour from Delhi. Pets welcome."
);

export default function AccommodationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
