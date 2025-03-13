import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000/api';

const apiKey = "AIzaSyC1014ZMpWNSazrkQW239t99MbRwKFMZi4";
const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;


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
    const response = await axios.post(`${url}/signup`, { 
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
    await axios.post(`${url}/logout`);
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
      const response = await axios.get(`${url}/auth-state`, {
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

// Fonction de connexion modifiée
const login = async (email, password) => {
  console.log(`Tentative de connexion avec : ${email} et ${password}`);

  try {
    const response = await axios.post(`${url}/login`, { 
      email, 
      password 
    });
    
    console.log('Réponse du serveur:', response.data); // Debug
    
    if (response.data.token) {
      setAuthToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success('Connexion réussie');
      return response.data;
    } else {
      throw new Error('Token non reçu du serveur');
    }
  } catch (error) {
    console.error('Erreur de connexion:', error);
    const errorMessage = error.response?.data?.error || 'Erreur lors de la connexion';
    toast.error(errorMessage);
    throw error;
  }
};

export {
  signup,
  login,
  logout,
  checkAuthState
};