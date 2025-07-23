// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyANfzPfkdKgYcbdngMtPKpGkAYW9dGXzGI",
  authDomain: "cyber-8c0b7.firebaseapp.com",
  projectId: "cyber-8c0b7",
  storageBucket: "cyber-8c0b7.firebasestorage.app",
  messagingSenderId: "789179102019",
  appId: "1:789179102019:web:19b8d3b8860be2de6335f6",
  measurementId: "G-7HZ4LPM2BV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export {app}