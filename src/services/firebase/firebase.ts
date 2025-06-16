import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { Firestore, getFirestore } from "firebase/firestore";
import firebaseConfig from "@/config/firebaseConfig";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase

let firestore: Firestore | null = null;

export const initFirebase = (): { db: Firestore } => {
  if (!firestore) {
    const app = initializeApp(firebaseConfig);
    firestore = getFirestore(app);

    isSupported().then((result) => {
      if (result) getAnalytics(app);
    });
  }

  return { db: firestore };
};
