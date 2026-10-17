import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/accommodation", "/experiences", "/gallery", "/about", "/contact", "/book"].map((p) => ({
    url: `${siteUrl}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
