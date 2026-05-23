import { getAnalytics, isSupported } from "firebase/analytics";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import firebaseConfig from "@/config/firebaseConfig";

let firestore: Firestore | null = null;
let authInit: Auth;

const initFirebase = (): { db: Firestore; auth: Auth } => {
	if (!firestore) {
		const app: FirebaseApp = initializeApp(firebaseConfig);
		firestore = getFirestore(app);
		authInit = getAuth(app);
	if (!firestore) {
		const app: FirebaseApp = initializeApp(firebaseConfig);
		firestore = getFirestore(app);
		authInit = getAuth(app);

		isSupported().then((result) => {
			if (result) getAnalytics(app);
		});
	}
		isSupported().then((result) => {
			if (result) getAnalytics(app);
		});
	}

	return { db: firestore, auth: authInit };
	return { db: firestore, auth: authInit };
};

export const db = initFirebase().db;
export const auth = initFirebase().auth;
