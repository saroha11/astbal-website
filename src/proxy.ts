import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/adminSession";

// Gate for the admin dashboard and its API. Fails closed if ADMIN_PASSWORD is unset.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApi = pathname.startsWith("/api/");

  if (!process.env.ADMIN_PASSWORD) {
    return new NextResponse("Admin is not configured", { status: 503 });
  }

  // Login endpoints/page are public.
  if (pathname === "/admin/login" || pathname === "/api/admin/login") return NextResponse.next();

  if (await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.next();
  }

  if (isApi) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
