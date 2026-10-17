import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/book",
  "Book Your Farm Stay",
  "Check live availability and book your private farm stay near Delhi. No payment now: we confirm on WhatsApp or email first."
);

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
