import { auth } from "@/config/firebaseConfig"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    // Send the ID token to your server
    const response = await fetch('/api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to create session');
    }

    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
}

export const signOutUser = async () => {
  try {
    await auth.signOut();
    // Clear the session cookie
    await fetch('/api/auth/session', { method: 'DELETE' });
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};