import { auth } from '@/config/firebaseConfig';
import { signOut as firebaseSignOut } from 'firebase/auth';

export async function signOutUser() {
  try {
    await firebaseSignOut(auth);
    // Clear the auth token cookie
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict; Secure';
  } catch (error) {
    console.error('Failed to sign out', error);
    throw error;
  }
}