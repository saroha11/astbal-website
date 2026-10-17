import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/experiences",
  "Horse Riding & Farm Experiences Near Delhi",
  "Horse riding lessons, leisure rides, guava picking, kitchen garden harvest, bonfire nights and harvest festivals on a private farm near Delhi."
);

export default function ExperiencesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
