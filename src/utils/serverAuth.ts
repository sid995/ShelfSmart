import { auth } from '@/config/firebaseAdminConfig';
import { cookies } from 'next/headers';

export async function getServerSession() {
  const sessionCookie = cookies().get('session')?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    return {
      user: {
        uid: decodedClaims.uid,
        name: decodedClaims.name,
        email: decodedClaims.email,
      }
    };
  } catch (error) {
    return null;
  }
}