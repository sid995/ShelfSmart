import { auth } from "@/config/firebaseConfig"
import { GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth"

export const signInWithGoogle = async () => {
  let user = null
  let error = null

  const provider = new GoogleAuthProvider()
  try {
    const res = await signInWithPopup(auth, provider)
    console.log(res)
    user = res.user
    error = null
  } catch (error) {
    console.error("Error signing in with Google", error);
    user = null
    error = error
  } finally {
    return { user, error }
  }
}

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};