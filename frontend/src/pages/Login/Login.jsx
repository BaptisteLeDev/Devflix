import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../../front-firebase';
import './Login.css';
import netflix_spinner from '../../assets/netflix_spinner.gif';

// Constantes pour les états de connexion et d'inscription
const SIGN_IN = "Se connecter";
const SIGN_UP = "S'inscrire";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signState, setSignState] = useState(SIGN_IN);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true); // Afficher le spinner pendant l'authentification
    
    try {
      if (signState === SIGN_UP) {
        await signup(name, email, password);
      } else {
        await login(email, password);
      }
      navigate('/home');
    } catch (error) {
      console.error('Erreur:', error);
      setLoading(false); // Cacher le spinner en cas d'erreur
    }
  };

  // Affiche le champ de nom pour l'inscription
  const renderNameInput = () =>
    signState === SIGN_UP && (
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    );

  // Affiche le bouton d'authentification approprié en fonction de l'état
  const renderAuthButton = () =>
    signState === SIGN_UP ? (
      <button onClick={handleAuth} type="submit">
        S'inscrire
      </button>
    ) : (
      <button onClick={handleAuth} type="submit">
        Se connecter
      </button>
    );

  // Affiche le texte de basculement entre "Se connecter" et "S'inscrire"
  const signStateSwitchText = () => (
    signState === SIGN_IN ? (
      <p>
        Nouveau sur Netflix ?{' '}
        <span onClick={() => setSignState(SIGN_UP)}>Inscrivez-vous</span>
      </p>
    ) : (
      <p>
        Déjà un compte ?{' '}
        <span onClick={() => setSignState(SIGN_IN)}>Connectez-vous</span>
      </p>
    )
  );

  if (loading) {
    return (
      <div className="login-spinner">
        <img src={netflix_spinner} alt="spinner" />
      </div>
    );
  }

  return (
    <div className="login">
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={handleAuth}>
          {renderNameInput()}
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="pass"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {renderAuthButton()}
          {signStateSwitchText()}
        </form>
      </div>
    </div>
  );
};

export default Login;