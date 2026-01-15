// proxy.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value
  const { pathname } = request.nextUrl

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
