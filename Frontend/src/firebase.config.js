// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBl0sp8Mo9e2wggBhG7FhSrCoO5eCfAGKE",
  authDomain: "otp-project-3530b.firebaseapp.com",
  projectId: "otp-project-3530b",
  storageBucket: "otp-project-3530b.appspot.com",
  messagingSenderId: "554579287607",
  appId: "1:554579287607:web:ceeb786995b07c31e729b2",
  measurementId: "G-PF3F0EQPMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };