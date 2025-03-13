import React, { useEffect } from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { checkAuthState } from './front-firebase'; // Nouvelle fonction pour vérifier l'état de l'authentification

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Écoute les changements d'état de connexion de l'utilisateur
    checkAuthState((user) => {
      if (user) {
        console.log('Connecté');
        navigate('/home');
      } else {
        console.log('Déconnecté');
        navigate('/login');
      }
    });
  }, []);

  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="*" element={<Navigate to="/login" />} /> {/* Redirection pour les erreurs 404 */}
      </Routes>
    </div>
  );
};

export default App;