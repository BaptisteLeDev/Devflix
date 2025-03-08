import React from 'react'
import './Footer.css'
import youtube_icon from "../../assets/youtube_icon.png";
import facebook_icon from "../../assets/facebook_icon.png";
import instagram_icon from "../../assets/instagram_icon.png";
import twitter_icon from "../../assets/twitter_icon.png";

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-icons">
        <img src={facebook_icon} alt='facebook' />
        <img src={instagram_icon} alt='instagram' />
        <img src={twitter_icon} alt='twitter' />
        <img src={youtube_icon} alt='youtube' />
      </div>
      <ul>
      <li>Audio et sous-titres</li>
      <li>Centre d'aide</li>
      <li>Cartes cadeaux</li>
      <li>Presse</li>
      <li>Relations avec les investisseurs</li>
      <li>Recrutement</li>
      <li>Conditions d'utilisation</li>
      <li>Confidentialité</li>
      <li>Informations légales</li>
      <li>Préférences de cookies</li>
      <li>Nous contacter</li>
      </ul>
      <p className='copyright-text'>© 1997-2021 Netflix, Inc.</p>
    </div>
  )
}

export default Footer
