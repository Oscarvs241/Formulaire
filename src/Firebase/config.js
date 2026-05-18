import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUrZxCP6_FGzuU3bur7MzyF8iinCJnz-c",
  authDomain: "taskflorent.firebaseapp.com",
  projectId: "taskflorent",
  storageBucket: "taskflorent.appspot.com", // ✅ correction ici
  messagingSenderId: "550200030488",
  appId: "1:550200030488:web:9e49222991999718c99a6d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
