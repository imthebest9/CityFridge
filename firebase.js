// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
export const db = getFirestore(app);