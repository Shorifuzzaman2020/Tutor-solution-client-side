
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk5pP--zVp2WqzuU6nlzSS8GrKT3hxRfk",
  authDomain: "event-discovery-project.firebaseapp.com",
  projectId: "event-discovery-project",
  storageBucket: "event-discovery-project.firebasestorage.app",
  messagingSenderId: "931228422736",
  appId: "1:931228422736:web:82f613e41b9485bd657755",
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
