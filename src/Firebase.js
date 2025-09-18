import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDfRJxwQ7nfXegTxUgR-pYpcq0fBVAfOw",
  authDomain: "finance-tracker-achu.firebaseapp.com",
  projectId: "finance-tracker-achu",
  storageBucket: "finance-tracker-achu.appspot.com", // FIXED
  messagingSenderId: "109107269974",
  appId: "1:109107269974:web:8d4fae0d78b5dfbd3486f7",
  measurementId: "G-GJF0HYJ8L1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
