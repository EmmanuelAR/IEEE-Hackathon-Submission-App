import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, isValidAdminToken } from "@/lib/admin-auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (await isValidAdminToken(token)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/admin", request.url));
}

export const config = {
  matcher: ["/admin/:path*"],
};
