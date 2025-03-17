import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TitleCards = ({ title, category, language }) => {

    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    // Gère le défilement horizontal avec la molette de la souris
    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;    
    }
    
    // Fonction pour tronquer le texte à 15 caractères
    const truncateTitle = (title) => {
        if (!title) return '';
        return title.length > 15 ? title.substring(0, 15) + '...' : title;
    }

    useEffect(() => {
        // Récupère les données de l'API pour les films via le back-end
        const fetchMovies = async () => {
            try {
                const API_URL = 'https://devflix.baptiste-dechamp.mds-vannes.yt/api' || 'http://localhost:5000/api';
                const response = await axios.get(`${API_URL.replace('/api', '')}/api/movies/${category ? category : 'now_playing'}?language=${language ? language : 'fr'}`);
                // Filtrer les films qui ont une image disponible
                const filteredMovies = response.data.results.filter(movie => movie.backdrop_path);
                setApiData(filteredMovies);
            } catch (error) {
                console.error('Erreur lors de la récupération des films', error);
            }
        };

        fetchMovies();
        cardsRef.current.addEventListener('wheel', handleWheel);
        
        // Nettoyage de l'écouteur d'événement lors du démontage du composant
        return () => {
            if (cardsRef.current) {
                cardsRef.current.removeEventListener('wheel', handleWheel);
            }
        };
    }, [category, language]);

    return (
        <div className='title-cards'>
            <h2>{title ? title : "Populaire sur Netflix"}</h2>
            <div className='card-list' ref={cardsRef}>
                {apiData.map((card) => (
                    <Link to={`/player/${card.id}`} className='card' key={card.id}>
                        <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
                        <p>{truncateTitle(card.title)}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default TitleCards;