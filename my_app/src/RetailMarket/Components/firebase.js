// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBxXHejQsFmSUq2w1jF83Ggsq6WqU8KhJ0",
    authDomain: "retailmarketing-535e2.firebaseapp.com",
    projectId: "retailmarketing-535e2",
    storageBucket: "retailmarketing-535e2.firebasestorage.app",
    messagingSenderId: "527174732207",
    appId: "1:527174732207:web:269a014f8500ea3089875a",
    measurementId: "G-QEP1FFFZ2X"
};

const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
