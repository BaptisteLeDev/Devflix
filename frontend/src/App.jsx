import React, { useEffect, useState } from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { 
  checkAuthState } from './front-firebase';
import netflix_spinner from './assets/netflix_spinner.gif';

const App = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      // Ajouter un délai pour laisser le temps au token d'être enregistré
      await new Promise(resolve => setTimeout(resolve, 500));
      
      checkAuthState((user) => {
        setIsAuthenticated(!!user);
        setLoading(false);
        if (user) {
          navigate('/home');
        }
      });
    };

    verifyAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'black' 
      }}>
        <img src={netflix_spinner} alt="Loading..." style={{ width: '60px' }} />
      </div>
    );
  }

  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/player/:id" element={isAuthenticated ? <Player /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
    </div>
  );
};

export default App;


