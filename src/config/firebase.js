// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

//we tell which service we want to use
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBLzRxihGFFbJY_KIVsUvB6G1F28LZ5MRE",
  authDomain: "start-62afb.firebaseapp.com",
  projectId: "start-62afb",
  storageBucket: "start-62afb.appspot.com",
  messagingSenderId: "1061613007746",
  appId: "1:1061613007746:web:94249e48ec4d03ecfed59b",
  measurementId: "G-PD53QLT5LY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//for very service we create a variable
export const auth=getAuth(app);
export const db=getFirestore(app);