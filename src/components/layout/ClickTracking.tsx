"use client";

import { useEffect } from "react";
import { linkLocation, trackEvent } from "@/lib/analytics";

// One click listener for the whole site, so every wa.me link and every link to /book is
// counted without each (often server-rendered) component having to wire it up itself.
export default function ClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      // Admin's WhatsApp links are the owner messaging guests, not guests reaching out
      if (window.location.pathname.startsWith("/admin")) return;
      const url = new URL(link.href, window.location.href);
      if (url.hostname === "wa.me" || url.hostname === "api.whatsapp.com") {
        trackEvent("whatsapp_click", { link_location: linkLocation(link) });
      } else if (url.origin === window.location.origin && url.pathname === "/book") {
        trackEvent("book_click", { method: "link", link_location: linkLocation(link) });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
