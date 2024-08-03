// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getUserIdToken } from './src/config/firebaseConfig';

// export async function middleware(request: NextRequest) {
//   const session = await getUserIdToken();

//   if (!session && !request.nextUrl.pathname.startsWith('/signin')) {
//     return NextResponse.redirect(new URL('/signin', request.url));
//   }

//   if (session && request.nextUrl.pathname === '/signin') {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { auth } from './app/lib/firebase-admin';

import admin from 'firebase-admin';

export const adminAuth = admin.auth();

export async function middleware(request: NextRequest) {
  const session = await adminAuth.verifyIdToken(request.cookies.get('token')?.value || '').catch(() => null);

  // Paths that require authentication
  const protectedPaths = ['/dashboard', '/analytics', '/recipe'];

  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));


  if (!session && isProtectedPath) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (session && request.nextUrl.pathname === '/signin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};