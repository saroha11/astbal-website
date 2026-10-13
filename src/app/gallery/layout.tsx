import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — Photos of ASTBAL Farm & Retreat",
  description: "Browse stunning photos of ASTBAL: container house, horse riding arena, guava orchard, kitchen garden, our friendly dogs, and the beautiful countryside.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
