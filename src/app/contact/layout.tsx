import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Location — Find ASTBAL",
  description: "Get in touch with ASTBAL Farm & Retreat. Find us on Google Maps, get driving directions from Delhi, Gurgaon, or Faridabad. Call, email, or WhatsApp us.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
