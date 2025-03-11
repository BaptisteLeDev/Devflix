import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if (user) {
        console.log('Logged In');
        navigate('/home')
      }
      else {
        console.log('Logged Out');
        navigate('/login')
      }
    })
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
  )
}

export default App