// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// ✅ Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBhCr7i7Ed5f_kT5unRVrKlqNdceh_DV4g",
  authDomain: "clb-tinhoc-haithanh.firebaseapp.com",
  projectId: "clb-tinhoc-haithanh",
  storageBucket: "clb-tinhoc-haithanh.firebasestorage.app",
  messagingSenderId: "347797334445",
  appId: "1:347797334445:web:f5c14ceb6d55ead1159924",
  measurementId: "G-RY8X641GE6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
