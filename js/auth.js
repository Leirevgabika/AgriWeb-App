// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app"; // para usar la libreria local, pero da un error
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// configuracion de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCQIHBs1rhS6DfaWk0RRVeCWrPZD1qp6lU",
    authDomain: "agriweb-c97e4.firebaseapp.com",
    projectId: "agriweb-c97e4",
    storageBucket: "agriweb-c97e4.firebasestorage.app",
    messagingSenderId: "685890326589",
    appId: "1:685890326589:web:14a9bf476762f206221a54"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Manejo del formulario de registro
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Usuario registrado
            const user = userCredential.user;
            document.getElementById('auth-status').textContent = `Usuario registrado: ${user.email}`;
        })
        .catch((error) => {
            // Manejo de errores
            document.getElementById('auth-status').textContent = `Error: ${error.message}`;
        });
});

// Manejo del formulario de inicio de sesión
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Usuario autenticado
            const user = userCredential.user;
            document.getElementById('auth-status').textContent = `Usuario autenticado: ${user.email}`;
        })
        .catch((error) => {
            // Manejo de errores
            document.getElementById('auth-status').textContent = `Error: ${error.message}`;
        });
});