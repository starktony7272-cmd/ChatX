import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6TCAnxV2lqPtGV1dcX97TfrpQ--5Rz-U",
  authDomain: "the-hub-7d15e.firebaseapp.com",
  projectId: "the-hub-7d15e",
  storageBucket: "the-hub-7d15e.firebasestorage.app",
  messagingSenderId: "644575843815",
  appId: "1:644575843815:web:a6e5ab3450f3bac5f99942",
  measurementId: "G-P1J7SY04KW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
