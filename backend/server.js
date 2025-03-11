const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const admin = require('firebase-admin');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Initialiser Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://netflix-clone-bdev.firebaseio.com"
});

// Route pour obtenir les films populaires
app.get('/api/movies/popular', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=fr-FR`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des films populaires' });
  }
});

// Autres routes pour différentes catégories de films
app.get('/api/movies/top_rated', async (req, res) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=fr-FR`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des films les mieux notés' });
  }
});

// Route pour l'inscription
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      name,
      email,
    });
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
  }
});

// Route pour la connexion
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    // Vous pouvez ajouter une logique pour vérifier le mot de passe ici
    res.status(200).json({ message: 'Connexion réussie', user: userRecord });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});