import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { siteConfig, siteUrl } from "@/data/siteConfig";
import { BookingDialogProvider } from "@/components/booking/BookingDialog";

// Google Analytics 4 measurement ID (G-...). NEXT_PUBLIC_GA_ID overrides the one in siteConfig;
// production builds only, so local testing doesn't show up as visitors.
const gaId = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_GA_ID || siteConfig.gaId : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ASTBAL | Private Farm Stay Near Delhi with Horse Riding",
    template: "%s | ASTBAL",
  },
  description:
    "Private farm stay about an hour from Delhi, booked by one group at a time. Container house, horse riding, guava orchard, and pets welcome.",
  alternates: { canonical: "/" },
  keywords: [
    "farm stay near Delhi",
    "private farm stay near Delhi",
    "farm stay near Delhi NCR",
    "farm stay Haryana",
    "horse riding near Delhi",
    "pet friendly farm stay near Delhi",
    "weekend getaway near Delhi",
    "container house stay",
    "ASTBAL",
  ],
  openGraph: {
    title: "ASTBAL | Private Farm Stay Near Delhi with Horse Riding",
    description:
      "A private farm stay about an hour from Delhi: container house, horse riding, guava orchard and open fields, for one group at a time.",
    url: "/",
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
    `${siteUrl}/images/gallery/night-garden.jpg`,
  ],
  address: {
    "@type": "PostalAddress",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: siteConfig.geo.lat, longitude: siteConfig.geo.lng },
  hasMap: siteConfig.mapUrl,
  petsAllowed: true,
  numberOfRooms: 1,
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
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
