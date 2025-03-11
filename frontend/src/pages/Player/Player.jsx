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
    // Récupère les données de l'API pour la vidéo via le back-end
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${id}/videos?language=fr`);
        setApiData(response.data.results[0]);
      } catch (error) {
        console.error('Erreur lors de la récupération de la vidéo', error);
      }
    };

    fetchVideo();
  }, [id]);

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt='back' className='back-arrow' onClick={() => { navigate(-1) }} />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder="0" allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}-</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>
    </div>
  );
}

export default Player;