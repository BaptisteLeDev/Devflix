import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import TitleCards from '../../components/TitleCards/TitleCards';
import heroBanner from '../../assets/hero_banner.jpg';
import heroTitle from '../../assets/hero_title.png';
import playIcon from '../../assets/play_icon.png';
import infoIcon from '../../assets/info_icon.png';

// Constantes pour les textes et les icônes réutilisables
const HERO_TEXT =
    "Une capitaine de l'armée et son bataillon historique exclusivement composé d'Afro-Américaines défient les obstacles pour apporter de l'espoir au front pendant la Seconde Guerre mondiale.";
const BUTTONS = [
    { icon: playIcon, text: 'Regarder', className: 'btn' },
    { icon: infoIcon, text: 'Plus d\'infos', className: 'btn dark-btn' },
];

// Composant réutilisable pour les boutons
const HeroButtons = () => (
    <div className="hero-btns">
        {BUTTONS.map(({ icon, text, className }) => (
            <button key={text} className={className}>
                <img src={icon} alt={text.toLowerCase()} />
                {text}
            </button>
        ))}
    </div>
);

// Composant réutilisable pour la section TitleCards
const MoreCards = () => (
    <div className="more-cards">
        <TitleCards title="Meilleures notations" category="top_rated" />
        <TitleCards title="Populaire" category="now_playing" />
        <TitleCards title="Bientôt sur Netflix" category="upcoming" />
        <TitleCards title="Film en VO" language="en-US" />
    </div>
);

const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <div className="hero">
                <img src={heroBanner} alt="hero banner" className="banner-img" />
                <div className="hero-caption">
                    <img src={heroTitle} alt="hero title" className="caption-img" />
                    <p>{HERO_TEXT}</p>
                    <HeroButtons />
                    <TitleCards category="popular" />
                </div>
            </div>
            <MoreCards />
            <Footer />
        </div>
    );
};

export default Home;