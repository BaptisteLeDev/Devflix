import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import TitleCards from '../../components/TitleCards/TitleCards';
import heroBanner from '../../assets/hero_banner.jpg';
import heroTitle from '../../assets/hero_title.png';
import playIcon from '../../assets/play_icon.png';
import infoIcon from '../../assets/info_icon.png';
import axios from 'axios';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies/popular');
        setPopularMovies(response.data.results);
      } catch (error) {
        console.error('Erreur lors de la récupération des films populaires', error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={heroBanner} alt="hero banner" className="banner-img" />
        <div className="hero-caption">
          <img src={heroTitle} alt="hero title" className="caption-img" />
          <p>Une capitaine de l'armée et son bataillon historique exclusivement composé d'Afro-Américaines défient les obstacles pour apporter de l'espoir au front pendant la Seconde Guerre mondiale.</p>
          <div className="hero-btns">
            <button className="btn">
              <img src={playIcon} alt="play" />
              Lire
            </button>
            <button className="btn dark-btn">
              <img src={infoIcon} alt="info" />
              Plus d'infos
            </button>
          </div>
          <TitleCards category="popular" movies={popularMovies} />
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title="Meilleures notations" category="top_rated" />
        <TitleCards title="Populaire" category="now_playing" />
        <TitleCards title="Bientôt sur Netflix" category="upcoming" />
        <TitleCards title="Film en VO" language="en-US" />
      </div>
      <Footer />
    </div>
  );
};

export default Home;