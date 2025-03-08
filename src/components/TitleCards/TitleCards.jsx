import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/cards_data';
import { Link } from 'react-router-dom';



const TitleCards = ({ title, category, language }) => {

    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGM1NGZkN2MxOTEzNDBlZjU0ZGJjN2I3ZjA3NjNjOSIsIm5iZiI6MTczNjk1MjQxMi45ODU5OTk4LCJzdWIiOiI2Nzg3Y2E1Y2I1MGM3MWRiNWM0ZTY5NmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WwhF3doAdurJrUSghlR2I1GDFFp-If62gKtEiK93KII'
        }
    };



    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;    
    }

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=${language?language:'fr'}&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleWheel);
    }, [])

    return (
        <div className='title-cards'>
            <h2>{title ? title : "Populaire sur Netflix"}</h2>
            <div className='card-list' ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className='card' key={card.id}>
                        <img src={'https://image.tmdb.org/t/p/w500'+card.backdrop_path} alt={card.original_title} />
                        <p>{card.title}</p>
                    </Link>
                })}
            </div>
        </div>
    );
}

export default TitleCards;