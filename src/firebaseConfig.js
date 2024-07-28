// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVRuJJodI5rif-pK4w607LSfcmNI3adYA",
  authDomain: "ecknow-784e6.firebaseapp.com",
  databaseURL: "https://ecknow-784e6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ecknow-784e6",
  storageBucket: "ecknow-784e6.appspot.com",
  messagingSenderId: "585976567943",
  appId: "1:585976567943:web:a98f042dabd69150e24022",
  measurementId: "G-CH7GJ7M3KG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth, analytics };
