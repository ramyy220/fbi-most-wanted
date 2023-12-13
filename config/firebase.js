// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8s5pXqUoDUNxxIiU03TEKcVfUeJLiulo",
  authDomain: "fbi-most-wanted.firebaseapp.com",
  projectId: "fbi-most-wanted",
  storageBucket: "fbi-most-wanted.appspot.com",
  messagingSenderId: "346901314085",
  appId: "1:346901314085:web:63c821cdd447a2c4b6ddcc",
  measurementId: "G-TJTKPHNEDM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);





const firestore = getFirestore(app);

const storage = getStorage(app);



export { auth, firestore, storage};