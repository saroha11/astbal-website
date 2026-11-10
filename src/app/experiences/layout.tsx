import { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/experiences",
  "Horse Riding & Farm Experiences Near Delhi",
  "Horse riding lessons, guided morning and evening farm tours, guava picking, kitchen garden harvest, pottery, bonfire nights and harvest festivals on a private farm near Delhi."
);

export default function ExperiencesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
