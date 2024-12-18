import { authenticated } from "@/middleware/authentication"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const authenticatedResponse = await authenticated(request, response)
  if (authenticatedResponse.authenticated) return response
  else return NextResponse.redirect(new URL(authenticatedResponse.pathname, request.url))
}

export const config = {
  matcher: [
    "/product",
    "/product/:path*",
    "/user/settings",
    "/user/settings/:path"
  ]
}
