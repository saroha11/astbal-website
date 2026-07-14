import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiences — Horse Riding, Orchard, Farm & More",
  description: "Discover unforgettable experiences at ASTBAL: horse riding in open fields, guava orchard picking, kitchen garden harvest, farm-to-table dining, and meet our friendly dogs.",
};

export default function ExperiencesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
