// proxy.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export async function proxy(request: NextRequest) {
  // 1. Use the request object to get cookies
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  // Debugging in production logs
  console.log(`Path: ${pathname}, Token present: ${!!token}`);

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register")

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/write")

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/write/:path*"],
}
