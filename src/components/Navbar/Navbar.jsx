import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout, auth, db } from '../../firebase'; // Ajouter db pour accéder à Firestore
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Navbar = () => {
  const [name, setName] = useState('');
  const navRef = useRef();

  useEffect(() => {
    // Écoute les changements d'état de connexion de l'utilisateur
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Récupère les données de Firestore pour l'utilisateur connecté
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setName(userDoc.data().name); // Récupère le champ "name" et le met dans l'état local
        }
      } else {
        setName(''); // Réinitialise si déconnecté
      }
    });

    // Nettoie l'écoute
    return () => unsubscribe();
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
          <li onClick={'/home'}>Home</li>
          <li>Série TV</li>
          <li>Films</li>
          <li>Nouveauté & Populaire</li>
          <li>Ma Liste</li>
          <li>Parcourir </li>
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