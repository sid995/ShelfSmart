import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { adminAuth } from '@/config/firebaseAdminConfig';

const protectedRoutes = ['/dashboard', '/analytics', '/recipe'];

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const pathname = request.nextUrl.pathname;

  // Allow unrestricted access to the root path
  if (pathname === '/') {
    return NextResponse.next();
  }

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (!session) {
    // If not authenticated and trying to access a protected route, redirect to login
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
    // If not authenticated and trying to access signin, allow
    if (pathname === '/signin') {
      return NextResponse.next();
    }
  } else {
    // Validate session
    try {
      const decodedClaims = await adminAuth.verifySessionCookie(session, true);
      console.log("Decoded claims:", decodedClaims);

      // If authenticated and trying to access login, redirect to dashboard
      if (pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Allow access to protected routes
      if (protectedRoutes.includes(pathname)) {
        return NextResponse.next();
      }
    } catch (error) {
      console.error("Error validating session cookie:", error);
      // If session is invalid, clear the cookie and redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('session');
      return response;
    }
  }

  // For any other routes, allow the request to proceed
  return NextResponse.next();
}

/**
 * This code defines a configuration object for Next.js middleware.
 * Middleware is a function that runs before a request is handled by a page or API route.
 * 
 * The `config` object has a `matcher` property, which is an array of regular expressions
 * that define the paths that this middleware should be applied to.
 * In this case, it matches any path that does not start
 * with `/api`, `/_next/static`, `/_next/image`, or `/favicon.ico`.
 * This means that the middleware will be applied to all other paths.
 * 
 * The middleware function defined in this code snippet verifies a session cookie
 * for authentication. If the session cookie is valid, it allows the request to
 * proceed to the page or API route. If the session cookie is invalid or
 * missing, it redirects the user to the login page.
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
