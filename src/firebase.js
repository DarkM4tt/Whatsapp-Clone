import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBONRW3UD9gESjLTgrR1xOYERZG0CabcfM",
  authDomain: "whatsapp-clone-33949.firebaseapp.com",
  projectId: "whatsapp-clone-33949",
  storageBucket: "whatsapp-clone-33949.appspot.com",
  messagingSenderId: "217830503777",
  appId: "1:217830503777:web:2361b0d69998e2a17bc120",
  measurementId: "G-50V7KF1EZF",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default db;
export { auth, provider };
