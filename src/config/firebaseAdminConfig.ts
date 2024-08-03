import { initializeApp, getApps, cert, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from "firebase-admin/firestore"

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
};

export const firebaseAdmin =
  getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApp();

const adminAuth = getAuth(firebaseAdmin);
const adminDb = getFirestore(firebaseAdmin)

export { adminAuth, adminDb }