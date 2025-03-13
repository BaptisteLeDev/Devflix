import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signup } from '../../front-firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif';

// Constantes pour les états de connexion et d'inscription
const SIGN_IN = "Se connecter";
const SIGN_UP = "S'inscrire";

const Login = () => {
  const [signState, setSignState] = useState(SIGN_IN);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Authentification de l'utilisateur
  const handleAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (signState === SIGN_IN) {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
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
  return loading ? (
    <div className="login-spinner">
      <img src={netflix_spinner} alt="spinner" />
    </div>
  ) : (
    <div className="login">
      <img src={logo} alt="logo" className="login-logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form action="">
          {renderNameInput()}
          <input
            type="email"
            id="email"
            pattern=".+@example\.com"
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
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label>Se souvenir</label>
            </div>
            <div className="help">
              <p>Besoin d'aide ?</p>
            </div>
          </div>
        </form>
        <div className="form-switch">{signStateSwitchText()}</div>
      </div>
    </div>
  );
};

export default Login;