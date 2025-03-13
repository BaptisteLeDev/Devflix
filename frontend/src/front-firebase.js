import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000/api';

// Configuration d'axios avec le token
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Fonction d'inscription
const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { 
      name, 
      email, 
      password 
    });
    const { token } = response.data;
    setAuthToken(token);
    localStorage.setItem('token', token);
    toast.success('Inscription réussie');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error || 'Erreur lors de l\'inscription');
    throw error;
  }
};

// Fonction de connexion
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { 
      email, 
      password 
    });
    const { token } = response.data;
    setAuthToken(token);
    localStorage.setItem('token', token);
    toast.success('Connexion réussie');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error || 'Erreur lors de la connexion');
    throw error;
  }
};

// Fonction de déconnexion
const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
    localStorage.removeItem('token');
    setAuthToken(null);
    toast.success('Déconnexion réussie');
  } catch (error) {
    toast.error('Erreur lors de la déconnexion');
    throw error;
  }
};

// Fonction pour vérifier l'état de l'authentification
const checkAuthState = async (callback) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      const response = await axios.get(`${API_URL}/auth-state`);
      callback(response.data.user);
    } else {
      callback(null);
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'authentification:', error);
    callback(null);
  }
};

export {
  signup,
  login,
  logout,
  checkAuthState  // Ajout de l'export ici
};