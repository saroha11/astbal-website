import type { NextConfig } from "next";

// Security headers applied to every response. These are safe defaults that don't
// change how the site renders; a full Content-Security-Policy is intentionally
// left out for now because the embedded Google Map and Analytics would need it
// tuned carefully.
const securityHeaders = [
  // Force HTTPS for two years, including subdomains.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Don't let browsers guess (sniff) a different content type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Block the site from being embedded in a frame elsewhere (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Don't leak the full URL to other sites in the Referer header.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // No page needs the camera, microphone or location.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
