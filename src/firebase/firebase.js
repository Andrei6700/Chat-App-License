import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDk6f-iX5PZ95CMs1tQxZT-S0Gx3hp06ts",
  authDomain: "licenta-chatapp.firebaseapp.com",
  projectId: "licenta-chatapp",
  storageBucket: "licenta-chatapp.appspot.com",
  messagingSenderId: "377378890485",
  appId: "1:377378890485:web:59c986fbd99664ddad1bbc",
  measurementId: "G-3VW17B4BCK"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const analytics = getAnalytics(app);
export { firebaseConfig };

