// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "foodiewe-fccca.firebaseapp.com",
  projectId: "foodiewe-fccca",
  storageBucket: "foodiewe-fccca.firebasestorage.app",
  messagingSenderId: "773263130363",
  appId: "1:773263130363:web:e4b066f3b21ce5742dfa5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app,auth};