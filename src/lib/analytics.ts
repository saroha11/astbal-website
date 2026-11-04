import { sendGAEvent } from "@next/third-parties/google";

// GA4 events. GA only loads in production builds, so skip quietly when it isn't there
// (sendGAEvent would otherwise warn on every click in dev). Never pass personal details here.
export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined" || !("dataLayer" in window)) return;
  sendGAEvent("event", name, params);
}

// Where on the page a tracked link sits: an explicit data-track-location, else the nearest region
export function linkLocation(el: Element) {
  const tagged = el.closest<HTMLElement>("[data-track-location]");
  if (tagged) return tagged.dataset.trackLocation as string;
  if (el.closest('[role="dialog"]')) return "booking_dialog";
  if (el.closest("footer")) return "footer";
  if (el.closest("nav, header")) return "navbar";
  return "page";
}
