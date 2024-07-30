import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from "@/utils/firebaseConfig"

export async function middleware(request: NextRequest) {
  const auth = getAuth(app)

  const user = await new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => resolve(user))
  })

  console.log("middleware", user)

  if (!user && !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  if (user && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/auth/:path*']
}