import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// 🔥 CONFIGURA FIREBASE CON TUS DATOS
const firebaseConfig = {
    apiKey: "AIzaSyC2Ihu6i7cV-gRp5dvk8YAR6aGbHQfAJcA",
    authDomain: "crud-react-41546.firebaseapp.com",
    projectId: "crud-react-41546",
    storageBucket: "crud-react-41546.firebasestorage.app",
    messagingSenderId: "399142519499",
    appId: "1:399142519499:web:812b99b5887e82b49c914e"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, deleteDoc, doc };
