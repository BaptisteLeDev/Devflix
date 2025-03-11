const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

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

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});