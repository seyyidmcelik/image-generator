// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdLpcPAPR6z2rwQFHFIe0lJ7N5-zhiytg",
  authDomain: "photo-generator-78d6d.firebaseapp.com",
  projectId: "photo-generator-78d6d",
  storageBucket: "photo-generator-78d6d.appspot.com",
  messagingSenderId: "941193809397",
  appId: "1:941193809397:web:464189d1502a6923a6e4bc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Auth = getAuth(app);
const Provider = new GoogleAuthProvider();
const db = getFirestore(app);
const store = getStorage(app);
const API_TOKEN = "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";

export { Auth, Provider, db, store, API_TOKEN };
