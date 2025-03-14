import React, { useState, useEffect } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    typeof: ''
  });

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // Modifier fr en fr-FR pour correspondre au format attendu par TMDB
        const response = await axios.get(`http://localhost:5000/api/movies/${id}/videos?language=fr-FR`);
        
        if (response.data.results && response.data.results.length > 0) {
          setApiData(response.data.results[0]);
        } else {
          // Essayer en anglais si aucune vidéo n'est disponible en français
          const fallbackResponse = await axios.get(`http://localhost:5000/api/movies/${id}/videos?language=en-US`);
          
          if (fallbackResponse.data.results && fallbackResponse.data.results.length > 0) {
            setApiData(fallbackResponse.data.results[0]);
          } else {
            console.log("Aucune vidéo disponible pour ce film");
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la vidéo', error);
      }
    };

    fetchVideo();
  }, [id]);

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt='back' className='back-arrow' onClick={() => navigate(-1)} />
      {apiData.key ? (
        <>
          <iframe 
            width='80%' 
            height='80%' 
            // Utiliser youtube-nocookie.com au lieu de youtube.com
            src={`https://www.youtube-nocookie.com/embed/${apiData.key}`} 
            title='trailer' 
            frameBorder="0"
            allowFullScreen
            // Ajouter des attributs pour améliorer la compatibilité
            loading="lazy"
            referrerPolicy="origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
          <div className="player-info">
            {apiData.published_at && <p>{apiData.published_at.slice(0, 10)}-</p>}
            <p>{apiData.name || 'Vidéo sans titre'}</p>
            <p>{apiData.typeof || ''}</p>
          </div>
        </>
      ) : (
        <div style={{textAlign: 'center'}}>
          <h2>Vidéo non disponible</h2>
          <p>Désolé, aucune bande-annonce n'est disponible pour ce contenu.</p>
        </div>
      )}
    </div>
  );
}

export default Player;