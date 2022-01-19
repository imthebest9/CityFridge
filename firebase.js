
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDoBJdIhigS7L98zEOQBvMeRFRl8a9upYI",
  authDomain: "cityfridge-acf48.firebaseapp.com",
  projectId: "cityfridge-acf48",
  storageBucket: "cityfridge-acf48.appspot.com",
  messagingSenderId: "342160592749",
  appId: "1:342160592749:web:966d0ce5ac018fcf5bd464"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app)
