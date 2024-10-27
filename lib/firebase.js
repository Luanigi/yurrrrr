// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaiWtg7SM8Rf-7FD9qnukXzdJW9-Kkm_0",
  authDomain: "mscplayer.firebaseapp.com",
  projectId: "mscplayer",
  storageBucket: "mscplayer.appspot.com",
  messagingSenderId: "797180851829",
  appId: "1:797180851829:web:2169acdf4954bd7edc2a3c"
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage(app);

export { storage };