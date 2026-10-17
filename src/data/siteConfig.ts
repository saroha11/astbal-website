export const siteConfig = {
  name: "ASTBAL",
  tagline: "Experience Nature, Just 1 Hour from Delhi",
  description:
    "A boutique nature retreat on 2 acres of lush farmland near Delhi NCR. Stay in our container house, ride horses through open fields, pick fresh guavas from our orchard, harvest vegetables from our kitchen garden, and savor farm-to-table meals — all in one unforgettable experience.",
  url: "https://astbal.in",
  phone: "+91 98765 43210",
  email: "hello@astbal.in",
  whatsapp: "917018619039",
  mapUrl: "https://maps.app.goo.gl/qG2CSzdSGSiXXQf86",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.5!2d76.9!3d28.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI0JzAwLjAiTiA3NsKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000",
  socials: {
    instagram: "https://instagram.com/astbal",
    facebook: "https://facebook.com/astbal",
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
