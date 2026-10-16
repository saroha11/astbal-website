import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// HTTP Basic auth gate for the admin dashboard and its API. Fails closed when
// ADMIN_PASSWORD is not configured.
export function proxy(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return new NextResponse("Admin is not configured", { status: 503 });
  }
  const user = process.env.ADMIN_USER || "admin";

  const header = request.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const sep = decoded.indexOf(":");
      if (sep > -1) {
        const okUser = safeEqual(decoded.slice(0, sep), user);
        const okPass = safeEqual(decoded.slice(sep + 1), password);
        if (okUser && okPass) return NextResponse.next();
      }
    } catch {
      // fall through to 401
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="ASTBAL Admin", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
