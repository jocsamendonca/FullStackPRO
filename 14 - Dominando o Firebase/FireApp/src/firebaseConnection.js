import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJr5N9YF-NbSx7TChApsL-0ENvCHIDn-0",
  authDomain: "curso-sujeito-programado-edecc.firebaseapp.com",
  projectId: "curso-sujeito-programado-edecc",
  storageBucket: "curso-sujeito-programado-edecc.firebasestorage.app",
  messagingSenderId: "969216683241",
  appId: "1:969216683241:web:ce63ca9094dc402e745478",
  measurementId: "G-9D59QMGVHS",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
