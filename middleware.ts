import { auth } from "@/config/firebaseAdminConfig"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value || ""
  try {
    if (session) {
      await auth.verifySessionCookie(session, true)
      if (request.nextUrl.pathname === "/signin") {
        return NextResponse.redirect(new URL("/", request.url))
      }
    } else if (request.nextUrl.pathname !== "/signin") {
      return NextResponse.redirect(new URL("/signin", request.url))
    }
  } catch (error) {
    if (request.nextUrl.pathname !== "/signin") {
      return NextResponse.redirect(new URL("/signin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};