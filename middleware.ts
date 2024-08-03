import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserIdToken } from './config/firebaseConfig';

export async function middleware(request: NextRequest) {
  const session = await getUserIdToken();

  if (!session && !request.nextUrl.pathname.startsWith('/signin')) {
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