// ref
// https://firebase.google.com/docs/auth/web/start?hl=ko&authuser=1
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// ref getFirestore https://firebase.google.com/docs/firestore/quickstart?hl=ko#web-version-9
import { getFirestore } from "firebase/firestore";
// ref https://firebase.google.com/docs/storage/web/upload-files
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authService = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const dbService = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storageService = getStorage(app);
