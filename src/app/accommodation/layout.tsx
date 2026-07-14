import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accommodation — Container House 1 BHK",
  description: "Stay in our modern 1 BHK container house at ASTBAL. AC, WiFi, smart TV, private grass bed area. Weekday ₹4,500 | Weekend ₹6,500. Book now!",
};

export default function AccommodationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
