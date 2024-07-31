import { auth } from "@/config/firebaseAdminConfig"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value || '';

  // Check if the user is accessing the signin page
  if (request.nextUrl.pathname === '/signin') {
    if (session) {
      try {
        // If the session is valid, redirect to home
        const idToken = await auth.verifySessionCookie(session, true);
        console.log("IDTOKEN: ", idToken)
        if (!idToken) {
          return NextResponse.redirect(new URL('/', request.url));
        }
      } catch {
        // If the session is invalid, allow access to signin page
        return NextResponse.next();
      }
    }
    // If no session, allow access to signin page
    return NextResponse.next();
  }

  // For all other pages, check authentication
  if (!session) {
    // If no session, redirect to signin page
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  try {
    // Verify the session
    await auth.verifySessionCookie(session, true);
    // If valid, allow access to the requested page
    return NextResponse.next();
  } catch (error) {
    // If invalid, redirect to signin page
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};