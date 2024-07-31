import { NextResponse } from "next/server"
import { adminAuth } from "@/config/firebaseAdminConfig"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const { idToken } = await request.json()

  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })

    cookies().set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expiresIn,
      path: '/'
    })

    return NextResponse.json({ status: 'success' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to create session' }, { status: 401 })
  }
}

export async function DELETE() {
  cookies().set('session', '', {
    maxAge: 0,
    path: '/items',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });
  return NextResponse.json({ status: 'success' }, { status: 200 });
}