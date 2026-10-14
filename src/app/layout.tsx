import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import StickyBookingBar from "@/components/home/StickyBookingBar";

export const metadata: Metadata = {
  title: {
    default: "ASTBAL — Farm & Retreat | Nature Stay Near Delhi NCR",
    template: "%s | ASTBAL Farm & Retreat",
  },
  description:
    "Experience nature at ASTBAL — a boutique 2-acre farm retreat just 1 hour from Delhi NCR. Stay in our container house, ride horses, pick guavas from our orchard, harvest farm-fresh vegetables, and enjoy farm-to-table dining. Book your nature escape today!",
  keywords: [
    "ASTBAL",
    "farm stay near Delhi",
    "farmhouse near Gurgaon",
    "horse riding near Delhi",
    "nature retreat NCR",
    "container house stay",
    "farm to table dining",
    "guava orchard",
    "kitchen garden",
    "weekend getaway Delhi",
    "farm stay Haryana",
    "eco stay near Delhi",
  ],
  openGraph: {
    title: "ASTBAL — Farm & Retreat | Nature Stay Near Delhi NCR",
    description:
      "2-acre nature retreat with container house, horse riding, guava orchard, kitchen garden & farm-to-table dining. Just 1 hour from Delhi NCR.",
    type: "website",
    locale: "en_IN",
    siteName: "ASTBAL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <StickyBookingBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
