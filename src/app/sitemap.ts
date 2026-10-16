import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/accommodation", "/experiences", "/gallery", "/about", "/contact", "/book"].map((p) => ({
    url: `${siteConfig.url}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
