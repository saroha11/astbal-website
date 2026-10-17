import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig, siteUrl } from "@/data/siteConfig";
import pricing from "@/data/pricing.json";
import { BookingDialogProvider } from "@/components/booking/BookingDialog";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ASTBAL — Farm & Retreat | Nature Stay Near Delhi NCR",
    template: "%s | ASTBAL Farm & Retreat",
  },
  description:
    "Experience nature at ASTBAL — a private farm retreat just 1 hour from Delhi NCR, booked by one group at a time. Stay in our container house, ride horses, pick guavas from our orchard, harvest farm-fresh vegetables, and enjoy farm-to-table dining. Book your nature escape today!",
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
      "Private farm retreat with container house, horse riding, guava orchard, kitchen garden & farm-to-table dining. Just 1 hour from Delhi NCR.",
    type: "website",
    locale: "en_IN",
    siteName: "ASTBAL",
    images: [{ url: "/images/hero/farm-aerial.jpg", width: 1920, height: 1080, alt: "Aerial view of the ASTBAL farm" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/hero/farm-aerial.jpg"],
  },
};

// Structured data so Google understands this is a bookable farm stay (location, price range, amenities).
// No ratings here on purpose: add an aggregateRating only once there are real reviews.
const { weekday, weekend, peakSeason } = pricing.accommodation;
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "ASTBAL Farm & Retreat",
  description: siteConfig.description,
  url: siteUrl,
  email: siteConfig.email,
  image: [
    `${siteUrl}/images/hero/farm-aerial.jpg`,
    `${siteUrl}/images/property/container-house.jpg`,
    `${siteUrl}/images/experiences/horse-riding.jpg`,
  ],
  address: {
    "@type": "PostalAddress",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  hasMap: siteConfig.mapUrl,
  priceRange: `₹${Math.min(weekday, weekend, peakSeason).toLocaleString("en-IN")} – ₹${Math.max(weekday, weekend, peakSeason).toLocaleString("en-IN")} per night`,
  currenciesAccepted: "INR",
  checkinTime: siteConfig.checkIn.time,
  checkoutTime: siteConfig.checkOut.time,
  amenityFeature: ["Horse riding", "Guava orchard", "Kitchen garden", "Farm-to-table dining", "Bonfire"].map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
  sameAs: Object.values(siteConfig.socials).filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <BookingDialogProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </BookingDialogProvider>
        <Analytics />
      </body>
    </html>
  );
}
