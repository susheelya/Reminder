
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword,onAuthStateChanged,signOut } from "firebase/auth"
import { getDatabase,ref, set,onValue,push,remove } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBHYDuj-eu0EIL6hG17yYtAbMgyBOI-9iQ",
  authDomain: "reminder-application-c95bf.firebaseapp.com",
  databaseURL: "https://reminder-application-c95bf-default-rtdb.firebaseio.com",
  projectId: "reminder-application-c95bf",
  storageBucket: "reminder-application-c95bf.appspot.com",
  messagingSenderId: "634319951917",
  appId: "1:634319951917:web:11688dabfb7c21c88c00a4",
  measurementId: "G-0V8ZZM822F"
};


const app = initializeApp(firebaseConfig);

export {getAuth,createUserWithEmailAndPassword,push,onValue,remove,signInWithEmailAndPassword,onAuthStateChanged,signOut,getDatabase,ref, set}