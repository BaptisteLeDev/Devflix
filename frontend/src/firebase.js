import axios from 'axios';
import { toast } from 'react-toastify';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflix-clone-bdev.firebaseapp.com",
  projectId: "netflix-clone-bdev",
  storageBucket: "netflix-clone-bdev.appspot.com",
  messagingSenderId: "144693247738",
  appId: "1:144693247738:web:0ca5327ec2857ab1959343",
  measurementId: "G-6X357CZ4VF"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Fonction d'inscription
const signup = async (name, email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/signup', { name, email, password });
    toast.success('Inscription réussie');
  } catch (error) {
    console.log(error);
    toast.error('Erreur lors de l\'inscription');
  }
}

// Fonction de connexion
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    const response = await axios.post('http://localhost:5000/api/login', { token });
    toast.success('Connexion réussie');
  } catch (error) {
    console.log(error);
    toast.error('Erreur lors de la connexion');
  }
}

// Fonction de déconnexion
const logout = async () => {
  // Implémentez la logique de déconnexion si nécessaire
  toast.success('Déconnexion réussie');
}

// Fonction pour vérifier l'état de l'authentification
const checkAuthState = async (callback) => {
  try {
    const response = await axios.get('http://localhost:5000/api/auth-state');
    callback(response.data.user);
  } catch (error) {
    console.log(error);
    callback(null);
  }
}

export {
  signup,
  login,
  logout,
  checkAuthState
}