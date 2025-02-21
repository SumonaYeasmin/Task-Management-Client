// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7UdeXtGQ09Eer1mW30Ea29mSGxusLcDc",
  authDomain: "task-management-3d3f4.firebaseapp.com",
  projectId: "task-management-3d3f4",
  storageBucket: "task-management-3d3f4.firebasestorage.app",
  messagingSenderId: "99201891574",
  appId: "1:99201891574:web:ed031d1e43c6f65defc0d7",
  measurementId: "G-VJ4Y8C4K37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);