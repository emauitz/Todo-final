// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChSF8xh3iBOiOcRVWgW7dPUGQdYuBuzu4",
    authDomain: "react-todo-euitz.firebaseapp.com",
    projectId: "react-todo-euitz",
    storageBucket: "react-todo-euitz.appspot.com",
    messagingSenderId: "430963323749",
    appId: "1:430963323749:web:f555aea67009648a70678c",
    measurementId: "G-3Y2LBPWPWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
