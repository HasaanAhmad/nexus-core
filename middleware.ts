import { NextResponse } from "next/server"
import { auth } from "@/server/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard')

  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL('/sign-in', req.nextUrl))
  }


  return NextResponse.next()
})

// Make sure middleware matches all dashboard routes
export const config = {
  matcher: '/dashboard/:path*'
}

