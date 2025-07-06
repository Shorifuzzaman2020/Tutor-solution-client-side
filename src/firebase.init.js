
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIEEXwe-5kfFZ5xtVM_fzi8nP6HKEfmQ8",
  authDomain: "fir-auth-5fe90.firebaseapp.com",
  projectId: "fir-auth-5fe90",
  storageBucket: "fir-auth-5fe90.firebasestorage.app",
  messagingSenderId: "195863202100",
  appId: "1:195863202100:web:2ef516f6f3acc828b4fd61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Set persistence for authentication to browserLocalPersistence
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Firebase Storage reference
export const storage = getStorage(app);
