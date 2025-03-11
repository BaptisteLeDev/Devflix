import axios from 'axios';
import { toast } from 'react-toastify';

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
    const response = await axios.post('http://localhost:5000/api/login', { email, password });
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

export {
  signup,
  login,
  logout
}