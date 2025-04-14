// src/firebase.config.js or firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_BEbwvqCfOdlyDhDAiVki0boQXOxlI0Y",
  authDomain: "auth-project-1fdc1.firebaseapp.com",
  projectId: "auth-project-1fdc1",
  storageBucket: "auth-project-1fdc1.appspot.com",
  messagingSenderId: "618062268959",
  appId: "1:618062268959:web:6c7cbe883281d9a1f1e32a",
  measurementId: "G-G7W1JWVCH1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // ✅ this is what you're missing

export { auth, provider };
