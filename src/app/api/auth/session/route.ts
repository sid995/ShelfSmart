import { NextResponse } from 'next/server'
import { adminAuth } from '@/config/firebaseAdminConfig'

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json()

    // Verify the ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken)

    const { uid, email, name } = decodedToken

    // Create a session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })

    // Set cookie policy for session cookie
    const options = {
      name: 'session',
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    }

    // Return the session cookie to the client
    return NextResponse.json(
      {
        success: true,
        user: { uid, email, name },
        decodedToken
      },
      {
        status: 200,
        headers: { 'Set-Cookie': `session=${sessionCookie}; Max-Age=${options.maxAge}; Path=${options.path}; HttpOnly; SameSite=Strict${options.secure ? '; Secure' : ''}` }
      }
    )
  } catch (error) {
    console.error('Session creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}