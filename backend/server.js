const express = require('express');
const axios = require('axios');

const admin = require('firebase-admin');
const { auth } = require('./back-firebase');


const app = express();
const PORT = process.env.PORT || 5000;


const TMDB_API_KEY='2dc54fd7c191340ef54dbc7b7f0763c9';
const FIREBASE_API_KEY='AIzaSyC1014ZMpWNSazrkQW239t99MbRwKFMZi4';


// Liste des origines autorisées
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5500",
    "https://devflix-ivory-three.vercel.app/",
];

// Middleware pour ajouter les en-têtes CORS
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
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
    const token = await auth.createCustomToken(userRecord.uid);
    res.status(201).json({ user: userRecord, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route de connexion
app.post('/api/login', async (req, res) => {
  try {
    const { email } = req.body;
    const userRecord = await auth.getUserByEmail(email);
    const token = await auth.createCustomToken(userRecord.uid);
    res.json({ token, user: userRecord });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Route de déconnexion
app.post('/api/logout', async (req, res) => {
  try {
    await auth.signOut();
    res.json({ message: 'Déconnexion réussie' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware de vérification du token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token non fourni' });
  }
  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide' });
  }
};

// Route pour vérifier l'état de l'authentification
app.get('/api/auth-state', async (req, res) => {
  // Implémentez la logique pour vérifier l'état de l'authentification
  // Par exemple, vous pouvez vérifier le token de l'utilisateur ici
  res.status(200).json({ user: null }); // Remplacez par la logique appropriée
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});