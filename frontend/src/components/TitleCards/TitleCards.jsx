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

    useEffect(() => {
        // Récupère les données de l'API pour les films via le back-end
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/movies/${category ? category : 'now_playing'}?language=${language ? language : 'fr'}`);
                setApiData(response.data.results);
            } catch (error) {
                console.error('Erreur lors de la récupération des films', error);
            }
        };

        fetchMovies();
        cardsRef.current.addEventListener('wheel', handleWheel);
    }, [category, language]);

    return (
        <div className='title-cards'>
            <h2>{title ? title : "Populaire sur Netflix"}</h2>
            <div className='card-list' ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className='card' key={card.id}>
                        <img src={'https://image.tmdb.org/t/p/w500' + card.backdrop_path} alt={card.original_title} />
                        <p>{card.title}</p>
                    </Link>
                })}
            </div>
        </div>
    );
}

export default TitleCards;