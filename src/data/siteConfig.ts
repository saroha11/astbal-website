export const siteConfig = {
  name: "ASTBAL",
  tagline: "Experience Nature, Just 1 Hour from Delhi",
  description:
    "A private nature retreat on lush farmland near Delhi NCR, booked by one group at a time. Stay in our container house, ride horses through open fields, pick fresh guavas from our orchard, harvest vegetables from our kitchen garden, and savor farm-to-table meals — all in one unforgettable experience.",
  url: "https://astbal.in",
  phone: "+91 70186 19039",
  phoneHref: "tel:+917018619039",
  email: "hello@astbal.in",
  whatsapp: "917018619039",
  mapUrl: "https://maps.app.goo.gl/qG2CSzdSGSiXXQf86",
  // Farm location (from the Google Maps link above), shown as a view-only map
  geo: { lat: 28.894349, lng: 76.75149 },
  mapEmbedUrl: "https://maps.google.com/maps?q=28.894349,76.751490&z=13&output=embed",
  socials: {
    instagram: "https://www.instagram.com/astbal.retreat/",
    facebook: "", // add the real page link when there is one
    youtube: "",
    twitter: "",
  },
  address: "ASTBAL Farm & Retreat, Near Delhi NCR, Haryana, India",
  checkIn: { label: "2:00 PM", time: "14:00" },
  checkOut: { label: "11:00 AM", time: "11:00" },
  directions: [
    "From Delhi: Take NH48 towards Gurgaon, then follow state highways south for approx 1 hour.",
    "From Gurgaon: Head south via Sohna Road, continue for about 45 minutes.",
    "From Faridabad: Take the Palwal highway south, approximately 50 minutes drive.",
  ],
} as const;

export type SiteConfig = typeof siteConfig;

// Live address of the site. On Vercel this is the production domain (astbal-website.vercel.app today,
// astbal.in automatically once that domain is connected), so sitemap and share links never point at a dead URL.
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : siteConfig.url;
