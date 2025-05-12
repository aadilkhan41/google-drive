import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
};

// console.log("Key:", import.meta.env.VITE_API_KEY);
// console.log("Key:", import.meta.env.VITE_AUTH_DOMAIN);
// console.log("Key:", import.meta.env.VITE_PROJECT_ID);
// console.log("Key:", import.meta.env.VITE_STORAGE_BUCKET);
// console.log("Key:", import.meta.env.VITE_MESSAGING_SENDER_ID);
// console.log("Key:", import.meta.env.VITE_APP_ID);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

const db = getFirestore(app);

export { auth, googleProvider, db };