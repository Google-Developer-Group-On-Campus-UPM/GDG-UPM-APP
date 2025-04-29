// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD65w9AxhzVSLTIyUWM0WlXzSp3Sjru23Y",
  authDomain: "gdgoc-upm-website.firebaseapp.com",
  projectId: "gdgoc-upm-website",
  storageBucket: "gdgoc-upm-website.firebasestorage.app",
  messagingSenderId: "962251099610",
  appId: "1:962251099610:web:6d13ca4195895ce12984e3",
  measurementId: "G-0JPRDM9KX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let analytics = null;

isSupported().then((result) => {
  if (result) {
      analytics = getAnalytics(app);
  }
})

export { db, analytics };
export default firebaseConfig;