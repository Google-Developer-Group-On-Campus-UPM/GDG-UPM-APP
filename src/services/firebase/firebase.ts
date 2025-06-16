
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "@/config/firebaseConfig";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


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