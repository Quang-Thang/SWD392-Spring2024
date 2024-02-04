import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDDHom10hVaHlll84bq1_0nj5qSB-FB-M4",
  authDomain: "real-estate-auction-system.firebaseapp.com",
  projectId: "real-estate-auction-system",
  storageBucket: "real-estate-auction-system.appspot.com",
  messagingSenderId: "501917704438",
  appId: "1:501917704438:web:f46fcdb9e509e22db60cd7",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
