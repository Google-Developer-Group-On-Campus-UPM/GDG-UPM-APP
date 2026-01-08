import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";
import firebaseConfig from "@/config/firebaseConfig";
import { Auth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase

let firestore: Firestore | null = null;
let authInit: Auth;

const initFirebase = (): { db: Firestore; auth: Auth } => {
  if (!firestore) {
    const app: FirebaseApp = initializeApp(firebaseConfig);
    firestore = getFirestore(app);
    authInit = getAuth(app);

    isSupported().then((result) => {
      if (result) getAnalytics(app);
    });
  }

  return { db: firestore, auth: authInit };
};

export const db = initFirebase().db;
export const auth = initFirebase().auth;
