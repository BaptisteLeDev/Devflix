# Devflix

Devflix est une site inspirée de Netflix, développée avec React, Firebase et Vite.

## Fonctionnalités

- Authentification des utilisateurs (inscription et connexion)
- Navigation entre les pages (Accueil, Connexion, Lecteur)
- Affichage des films populaires, les mieux notés, à venir et en version originale
- Lecture des bandes-annonces des films
- Notifications toast pour les actions utilisateur
- Interface utilisateur réactive et moderne

## Installation

1. Clonez le dépôt :

    ```bash
    git clone https://github.com/BaptisteLeDev/Devflix.git
    cd Devflix
    ```

2. Installez les dépendances :

    ```bash
    npm install
    ```

3. Configurez Firebase :

    - Créez un projet Firebase sur [Firebase Console](https://console.firebase.google.com/).
    - Ajoutez votre configuration Firebase dans le fichier `src/firebase.js`.

4. Lancez l'application en mode développement :

    ```bash
    npm run dev
    ```

5. Construisez l'application pour la production :

    ```bash
    npm run build
    ```

6. Prévisualisez la version de production localement :

    ```bash
    npm run preview
    ```

## Déploiement

Pour déployer l'application sur Vercel :

1. Connectez votre dépôt GitHub à Vercel.
2. Configurez le nécessaire dans Vercel.
3. Déployez l'application.

## Structure du projet

```plaintext
Devflix/
├── public/
│   ├── netflix_favicon.ico
│   └── background_banner.jpg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Footer/
│   │   ├── Navbar/
│   │   └── TitleCards/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Login/
│   │   └── Player/
│   ├── [App.jsx](http://_vscodecontentref_/0)
│   ├── [firebase.js](http://_vscodecontentref_/1)
│   ├── [index.css](http://_vscodecontentref_/2)
│   ├── [main.jsx](http://_vscodecontentref_/3)
│   └── [vite.config.js](http://_vscodecontentref_/4)
├── .gitignore
├── [eslint.config.js](http://_vscodecontentref_/5)
├── [index.html](http://_vscodecontentref_/6)
├── [package.json](http://_vscodecontentref_/7)
└── [README.md](http://_vscodecontentref_/8)