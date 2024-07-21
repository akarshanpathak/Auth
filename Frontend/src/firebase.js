// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWCegpSj3lUxVCq-GAVXRD6hWpfOWd_Ok",
  authDomain: "auth-cdb38.firebaseapp.com",
  projectId: "auth-cdb38",
  storageBucket: "auth-cdb38.appspot.com",
  messagingSenderId: "1040313338235",
  appId: "1:1040313338235:web:03146a473da889f276d5de",
  measurementId: "G-2QDXHQVQR3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);