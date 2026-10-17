import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/gallery",
  "Farm Stay Photos & Videos",
  "Photos and videos of ASTBAL: the container house, our horses, the guava orchard, our dogs, and the farm by day and at night."
);

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
