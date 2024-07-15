// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d9ee3.firebaseapp.com",
  projectId: "mern-estate-d9ee3",
  storageBucket: "mern-estate-d9ee3.appspot.com",
  messagingSenderId: "723082797177",
  appId: "1:723082797177:web:a3d178a374c0569f12f4a8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);