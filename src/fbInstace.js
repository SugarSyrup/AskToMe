import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "nwitter-616a8.firebaseapp.com",
  projectId: "nwitter-616a8",
  storageBucket: "nwitter-616a8.appspot.com",
  messagingSenderId: "1002681552407",
  appId: "1:1002681552407:web:4711dfa70ba60f36be9652"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
export const authService = getAuth();