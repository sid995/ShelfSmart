// lib/auth.ts

import { auth } from '@/config/firebaseConfig';
import { signOut as firebaseSignOut } from 'firebase/auth';

export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);

    // Clear the session cookie on the server
    await fetch('/api/auth/signout', {
      method: 'POST',
      credentials: 'same-origin',
    });

    // Optionally, you can add a callback or return a value to indicate successful signout
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}