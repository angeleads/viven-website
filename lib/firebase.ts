import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA2IBA3mKUXxc1wUZRX40c7uE0HZAYgwKY",
  authDomain: "viven-3a88a.firebaseapp.com",
  projectId: "viven-3a88a",
  storageBucket: "viven-3a88a.firebasestorage.app",
  messagingSenderId: "305488420792",
  appId: "1:305488420792:web:36216bee6d5604bafb794d",
  measurementId: "G-CEX21J193K"
};

// 1. Prevent duplicate initialization during Next.js Hot Reloads
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// 2. Export core services used across the app
export const auth = getAuth(app);
export const db = getFirestore(app);

// 3. Initialize Analytics ONLY on the client-side (browser)
export let analytics: ReturnType<typeof getAnalytics> | undefined;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export default app;