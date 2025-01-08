// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyCWoh95tjhWtUZEccMDyTjmuB9YeGpqES4",
    authDomain: "stepon-4f239.firebaseapp.com",
    projectId: "stepon-4f239",
    storageBucket: "stepon-4f239.firebasestorage.app",
    messagingSenderId: "873116921868",
    appId: "1:873116921868:web:8d175273197315c84a7e29",
    measurementId: "G-QS4XXS36YD"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);



