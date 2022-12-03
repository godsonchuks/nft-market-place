// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBL_EI9H3tSlQQ9-YBW68IQCAcw-TQljUk",
  authDomain: "vultrivius-marketplace.firebaseapp.com",
  projectId: "vultrivius-marketplace",
  storageBucket: "vultrivius-marketplace.appspot.com",
  messagingSenderId: "241808235327",
  appId: "1:241808235327:web:75f50d8f01b6c2f9f0918a",
  measurementId: "G-3RZJCN21QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore()