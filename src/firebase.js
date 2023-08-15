import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMBFT3Hmg_WHiIbZpXThlgtKLfJlOQgls",
  authDomain: "chat-app-376a6.firebaseapp.com",
  projectId: "chat-app-376a6",
  storageBucket: "chat-app-376a6.appspot.com",
  messagingSenderId: "993903288655",
  appId: "1:993903288655:web:97254920c7cffd5512e53a"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();