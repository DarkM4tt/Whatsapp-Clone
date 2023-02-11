import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArjDAPfREvmR9yHvwewX_A_RtJkoTsPzo",
  authDomain: "chatsapp-bfb32.firebaseapp.com",
  projectId: "chatsapp-bfb32",
  storageBucket: "chatsapp-bfb32.appspot.com",
  messagingSenderId: "583658933592",
  appId: "1:583658933592:web:b385b340938399561ea92d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default db;
export { auth, provider };
