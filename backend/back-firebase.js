import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signOut
} from "firebase/auth";
import {
  getFirestore
} from "firebase/firestore";
import axios from 'axios';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "netflix-clone-bdev.firebaseapp.com",
  projectId: "netflix-clone-bdev",
  storageBucket: "netflix-clone-bdev.firebasestorage.app",
  messagingSenderId: "144693247738",
  appId: "1:144693247738:web:0ca5327ec2857ab1959343",
  measurementId: "G-6X357CZ4VF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json');

// Initialiser Firebase Admin SDK une seule fois
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const auth = admin.auth();

// Fonction d'inscription
const signup = async (name, email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/signup', { name, email, password });
    console.log.success('Inscription réussie');
  } catch (error) {
    console.log(error);
    console.error('Erreur lors de l\'inscription');
  }
}

// Fonction de connexion
const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/login', { email, password });
    console.log('Connexion réussie');
  } catch (error) {
    console.log(error);
    console.error('Erreur lors de la connexion');
  }
}

// Fonction de déconnexion
const logout = async () => {
  // Implémentez la logique de déconnexion si nécessaire
  console.log('Déconnexion réussie');
}

export {
  signup,
  login,
  logout,
  auth,
  db,
  admin
}