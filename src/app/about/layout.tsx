import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about ASTBAL — a 2-acre nature retreat with container house, horse riding arena, guava orchard, and farm-to-table dining, just 1 hour from Delhi NCR.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
