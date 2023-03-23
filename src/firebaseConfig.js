// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdgV-F50fgZnT9dbv80Oky3IsJh2U49yM",
  authDomain: "shopping-1e678.firebaseapp.com",
  projectId: "shopping-1e678",
  storageBucket: "shopping-1e678.appspot.com",
  messagingSenderId: "661235326830",
  appId: "1:661235326830:web:2af51bbf9eaf6ad4bc2b7f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, app, auth };
