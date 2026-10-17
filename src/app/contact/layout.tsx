import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/contact",
  "Contact & Location",
  "Reach ASTBAL Farm & Retreat on WhatsApp or email, and see where the farm is on the map, about an hour's drive from Delhi."
);

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
