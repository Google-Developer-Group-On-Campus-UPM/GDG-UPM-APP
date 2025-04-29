/**
 * Firebase Configuration
 *
 * This file contains the Firebase configuration and initialization.
 * It sets up Firebase services for the GDG UPM application.
 *
 * Required Firebase Services:
 * 1. Firestore Database - For storing team and event data
 * 2. Authentication - For admin authentication (optional)
 * 3. Storage - For uploading images (future feature)
 *
 * Environment Variables Required:
 * - NEXT_PUBLIC_FIREBASE_API_KEY
 * - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
 * - NEXT_PUBLIC_FIREBASE_PROJECT_ID
 * - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
 * - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
 * - NEXT_PUBLIC_FIREBASE_APP_ID
 *
 * Setup Instructions:
 * 1. Create a Firebase project at https://console.firebase.google.com
 * 2. Enable Firestore Database
 * 3. Get your config from Project Settings > General > Your apps
 * 4. Add the config values to your .env.local file
 * 5. Update the firebaseConfig object below
 */

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

/**
 * Firestore Collections Structure (edit this based off of the requirements):
 *
 * /teams/{teamId}
 * - name: string
 * - department: string
 * - photo: string (filename)
 * - role: string
 * - bio: string (optional)
 *
 * /events/{eventId}
 * - title: string
 * - description: string
 * - date: timestamp
 * - image: string (filename)
 * - location: string
 * - registrationLink: string (optional)
 * - isActive: boolean
 */
