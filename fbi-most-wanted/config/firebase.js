// Importez les fonctions dont vous avez besoin à partir des SDK dont vous avez besoin
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';


// Votre configuration Firebase pour l'application web
const firebaseConfig = {
  apiKey: "AIzaSyD8s5pXqUoDUNxxIiU03TEKcVfUeJLiulo",
  authDomain: "fbi-most-wanted.firebaseapp.com",
  projectId: "fbi-most-wanted",
  storageBucket: "fbi-most-wanted.appspot.com",
  messagingSenderId: "346901314085",
  appId: "1:346901314085:web:63c821cdd447a2c4b6ddcc",
  measurementId: "G-TJTKPHNEDM"
};

// Initialisez Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };