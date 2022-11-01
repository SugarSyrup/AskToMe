// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // import { getAuth } from "firebase/auth";


// // const firebaseConfig = {
// //     apiKey: process.env.REACT_APP_API_KEY,
// //     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
// //     projectId: process.env.REACT_APP_PROJECT_ID,
// //     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// //     messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
// //     appId: process.env.REACT_APP_APP_ID
// // };

// // // const app = initializeApp(firebaseConfig);
// // // const db = getFirestore(app);
// // // export const authService = getAuth();

// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// // // const auth = getAuth();

// // console.log(app);

// // export default app;
// // // export const authService = firebase.auth()

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

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