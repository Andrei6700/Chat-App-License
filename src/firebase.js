import { initializeApp } from "firebase/app";
import { getAuth } from "getAuth/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9P8_dpB6dMv3LSYWMHDJk9F5JUxZyFQQ",
  authDomain: "chat-app-6197e.firebaseapp.com",
  projectId: "chat-app-6197e",
  storageBucket: "chat-app-6197e.appspot.com",
  messagingSenderId: "1067879573681",
  appId: "1:1067879573681:web:7003180dae3c3905061a90"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()