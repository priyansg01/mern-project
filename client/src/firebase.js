// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-project-5445c.firebaseapp.com",
  projectId: "mern-project-5445c",
  storageBucket: "mern-project-5445c.appspot.com",
  messagingSenderId: "126864543375",
  appId: "1:126864543375:web:c0367109662166a01beafa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);