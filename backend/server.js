import express from 'express';
import { auth } from './back-firebase.js';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 5000;

const TMDB_API_KEY = '2dc54fd7c191340ef54dbc7b7f0763c9';

const FIREBASE_API_KEY='AIzaSyC1014ZMpWNSazrkQW239t99MbRwKFMZi4';

// Liste des origines autorisées
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5500",
    "https://devflix-ivory-three.vercel.app/",
];

// Middleware pour ajouter les en-têtes CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// Middleware pour parser le corps des requêtes
app.use(express.json());

// Route pour obtenir les films populaires
app.get('/api/movies/popular', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=fr-FR`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des films populaires' });
  }
});

// Route pour obtenir les films populaires en VO
app.get('/api/movies/popular_vo', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des films populaires en VO' });
  }
});

// Routes pour différentes catégories de films
app.get('/api/movies/top_rated', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=fr-FR`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des films les mieux notés' });
  }
});

// Route pour obtenir les films a venir
app.get('/api/movies/upcoming', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=fr-FR`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des films A venir' });
  }
});

// Route pour obtenir les films Now playing
app.get('/api/movies/now_playing', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=fr-FR`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des films Now playing' });
  }
});

// Route d'inscription
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name
    });
    res.status(201).json({ user: userRecord });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Utiliser l'API REST Firebase Auth pour la connexion
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    );
    
    // Récupérer le token et l'identifiant utilisateur
    const { idToken, localId } = response.data;
    
    // Récupérer des informations supplémentaires sur l'utilisateur avec l'Admin SDK
    const userRecord = await auth.getUser(localId);
    
    res.json({
      token: idToken,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName || '',
        authProvider: 'local'
      }
    });
  } catch (error) {
    console.error('Erreur de connexion:', error.response?.data || error.message);
    res.status(401).json({ error: 'Email ou mot de passe incorrect' });
  }
});

// Route de déconnexion
app.post('/api/logout', async (req, res) => {
  // La déconnexion est principalement gérée côté client
  // Le serveur n'a pas besoin de "déconnecter" l'utilisateur car Firebase utilise des tokens sans état
  res.json({ message: 'Déconnexion réussie' });
});

// Middleware de vérification du token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token non fourni' });
    }

    try {
      // Vérifier le token avec Firebase Admin
      const decodedToken = await auth.verifyIdToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      console.error('Erreur de vérification du token:', error);
      res.status(401).json({ error: 'Token invalide' });
    }
  } catch (error) {
    console.error('Erreur de vérification du token:', error);
    res.status(401).json({ error: 'Token invalide' });
  }
};

// Route pour vérifier l'état de l'authentification
app.get('/api/auth-state', verifyToken, async (req, res) => {
  try {
    const user = await auth.getUser(req.user.uid);
    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: 'Session invalide' });
  }
});

// Route pour obtenir les vidéos d'un film spécifique
app.get('/api/movies/:id/videos', async (req, res) => {
  try {
    const { id } = req.params;
    const { language = 'fr-FR' } = req.query;
    
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}&language=${language}`
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des vidéos:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des vidéos' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});