import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000/api';

// Configuration d'axios avec le token
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // Stocke également le token dans localStorage
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    // Supprime le token du localStorage
    localStorage.removeItem('token');
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
    if (!token) {
      callback(null);
      return;
    }

    setAuthToken(token); // Réinitialise le token dans axios

    try {
      const response = await axios.get(`${API_URL}/auth-state`);
      if (response.data.user) {
        callback(response.data.user);
      } else {
        setAuthToken(null);
        callback(null);
      }
    } catch (error) {
      console.error('Erreur auth-state:', error);
      setAuthToken(null);
      callback(null);
    }
  } catch (error) {
    console.error('Erreur checkAuthState:', error);
    setAuthToken(null);
    callback(null);
  }
};

// Fonction de connexion modifiée
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { 
      email, 
      password 
    });
    
    if (response.data.token) {
      setAuthToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      toast.success('Connexion réussie');
    }
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.error || 'Erreur lors de la connexion');
    throw error;
  }
};

export {
  signup,
  login,
  logout,
  checkAuthState
};