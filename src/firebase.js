// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCJwaxUA62gnGGZSAfn3h9NBQFoadS7Oqo",
    authDomain: "hotelbookingapp-394517.firebaseapp.com",
    projectId: "hotelbookingapp-394517",
    storageBucket: "hotelbookingapp-394517.appspot.com",
    messagingSenderId: "582276530235",
    appId: "1:582276530235:web:ae5b60b7467a4b0ea81c1e",
    measurementId: "G-PNWP9LX7WC"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);