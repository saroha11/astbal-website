import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/about",
  "About Our Farm Retreat Near Delhi",
  "ASTBAL is a private farm retreat near Delhi with horses, a guava orchard and a kitchen garden, booked by one group at a time."
);

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
