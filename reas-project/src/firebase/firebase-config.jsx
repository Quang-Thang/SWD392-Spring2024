// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  increment,
} from "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAFB1umWBs1V1plw6kHvihl_IAnkK_m8s",
  authDomain: "learn-firebase-928b2.firebaseapp.com",
  databaseURL:
    "https://learn-firebase-928b2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "learn-firebase-928b2",
  storageBucket: "learn-firebase-928b2.appspot.com",
  messagingSenderId: "514838998268",
  appId: "1:514838998268:web:15f0ac133315c9f706fb79",
  measurementId: "G-E2ZCFLCM2E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const realtimeDB = getDatabase();

export { auth, app, db, realtimeDB, ref, set, onValue, update, increment };
