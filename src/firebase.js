// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABf2zamg7op-udg7PPIiaIr1QdIbbAzx8",
    authDomain: "whak25-b33dc.firebaseapp.com",
    projectId: "whak25-b33dc",
    storageBucket: "whak25-b33dc.firebasestorage.app",
    messagingSenderId: "637639566288",
    appId: "1:637639566288:web:27910c3b7f37a4c0ce4fd5",
    measurementId: "G-CRBGY90QLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
