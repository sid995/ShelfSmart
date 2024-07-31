import { auth } from "@/config/firebaseAdminConfig"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { idToken } = await request.json()

  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn })

    const options = {
      name: 'session',
      value: sessionCookie,
      httpOnly: true,
      secure: true,
      maxAge: expiresIn,
    }
    return NextResponse.json({ success: true }, {
      status: 200,
      headers: {
        'Set-Cookie': `session=${sessionCookie}; Max-Age=${expiresIn}; Path=/; HttpOnly; Secure; SameSite=Strict`
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Unable to create session' }, { status: 401 });
  }
}