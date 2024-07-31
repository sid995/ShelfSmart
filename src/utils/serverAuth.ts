import { auth } from '@/config/firebaseAdminConfig';
import { cookies } from 'next/headers';

export async function getServerSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(session, true);
    return decodedClaims;
  } catch (error) {
    return null;
  }
}