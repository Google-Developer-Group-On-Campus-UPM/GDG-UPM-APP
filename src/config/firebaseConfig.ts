const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const missingEnvVars: string[] = [];
if (!firebaseConfig.apiKey) missingEnvVars.push("NEXT_PUBLIC_FIREBASE_API_KEY");
if (!firebaseConfig.authDomain)
  missingEnvVars.push("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
if (!firebaseConfig.projectId)
  missingEnvVars.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
if (!firebaseConfig.storageBucket)
  missingEnvVars.push("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");
if (!firebaseConfig.messagingSenderId)
  missingEnvVars.push("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
if (!firebaseConfig.appId) missingEnvVars.push("NEXT_PUBLIC_FIREBASE_APP_ID");

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required Firebase environment variables: ${missingEnvVars.join(
      ", ",
    )}. Please check your .env file or production environment settings.`,
  );
}

export default firebaseConfig;
