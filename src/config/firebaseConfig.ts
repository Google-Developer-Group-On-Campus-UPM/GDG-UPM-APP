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

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration object
// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Export the app instance
export default app;

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
