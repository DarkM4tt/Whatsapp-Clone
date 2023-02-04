import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8jab8C7AMlUUV0FFS5lAeZB-INAo3EnI",
  authDomain: "whatsapp-47f3a.firebaseapp.com",
  projectId: "whatsapp-47f3a",
  storageBucket: "whatsapp-47f3a.appspot.com",
  messagingSenderId: "343408589986",
  appId: "1:343408589986:web:67d9d4a9f16656ea146bfb",
  measurementId: "G-GGDRQ6NJ6F",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default db;
export { auth, provider };
