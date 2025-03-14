import axios from 'axios';
import { toast } from 'react-toastify';

// Utilisation d'une variable d'environnement ou détection de l'environnement
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


// Configuration d'axios avec le token
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
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
    const user = localStorage.getItem('user');

    if (!token || !user) {
      callback(null);
      return;
    }

    try {
      const parsedUser = JSON.parse(user);
      // Vérifier le token côté serveur
      const response = await axios.get(`${API_URL}/auth-state`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.user) {
        callback(parsedUser);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthToken(null);
        callback(null);
      }
    } catch (error) {
      console.error('Erreur auth-state:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setAuthToken(null);
      callback(null);
    }
  } catch (error) {
    console.error('Erreur checkAuthState:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
    callback(null);
  }
};

// Fonction de connexion modifiée pour utiliser l'API backend
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    
    const { token, user } = response.data;
    
    // Stockage du token et des informations utilisateur
    setAuthToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    
    toast.success('Connexion réussie');
    return response.data;
  } catch (error) {
    console.error('Erreur de connexion:', error);
    toast.error('Email ou mot de passe incorrect');
    throw error;
  }
};

export {
  signup,
  logout,
  checkAuthState
};