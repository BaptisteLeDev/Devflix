import React, { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { checkAuthState } from './front-firebase';

const App = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérification de l'état d'authentification
    checkAuthState((user) => {
      if (user) {
        navigate('/home');
      } else {
        navigate('/login');
      }
      setLoading(false);
    });
  }, [navigate]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;