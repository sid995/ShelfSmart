import { adminAuth } from "@/config/firebaseAdminConfig";
import { cookies } from "next/headers";

export async function getServerSession() {
  const sessionCookie = cookies().get('session')?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaim = await adminAuth.verifySessionCookie(sessionCookie, true);
    return {
      user: {
        id: decodedClaim.uid,
        email: decodedClaim.email,
        name: decodedClaim.name,
        // Add any other user properties you need
      }
    };
  } catch (error) {
    return null;
  }
}