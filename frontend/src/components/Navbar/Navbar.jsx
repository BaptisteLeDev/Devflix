import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase'; // Utilisez uniquement logout

const Navbar = () => {
  const [name, setName] = useState('');
  const navRef = useRef();

  useEffect(() => {
    // Simulez la récupération du nom de l'utilisateur depuis le back-end
    const fetchUserName = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user'); // Remplacez par votre route back-end
        setName(response.data.name);
      } catch (error) {
        console.error('Erreur lors de la récupération du nom de l\'utilisateur', error);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 50) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    });
  }, []);

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt='logo' />
        <ul>
          <li onClick={'/home'}>Accueil</li>
          <li>Séries TV</li>
          <li>Films</li>
          <li>Nouveautés & Populaire</li>
          <li>Ma Liste</li>
          <li>Parcourir</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="search" className='icons' />
        <img src={bell_icon} alt="bell" className='icons' />
        <div className="navbar-profile">
          <img src={profile_img} alt="profile" className='profile' />
          <img src={caret_icon} alt="caret" />
          <div className="dropdown">
            <p onClick={() => { logout(); }}>Se déconnecter</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;