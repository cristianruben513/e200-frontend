// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBPhgpEGLrLfl5i3-0eZqECAEeS7Di0t3M",
  authDomain: "dorichangos.firebaseapp.com",
  projectId: "dorichangos",
  storageBucket: "dorichangos.appspot.com",
  messagingSenderId: "442870382963",
  appId: "1:442870382963:web:6ddaeb2296d26e3db8c506"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;