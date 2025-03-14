import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Créer un objet de configuration depuis les variables d'environnement ou le fichier
let serviceAccount;

if (process.env.SERVICE_ACCOUNT_KEY_JSON) {
  // Si la variable d'environnement contient le JSON complet
  serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY_JSON);
} else {
  try {
    // En développement, essayer de lire le fichier
    const { readFileSync } = await import('fs');
    const { join } = await import('path');
    const serviceAccountPath = join(__dirname, 'config', 'serviceAccountKey.json');
    serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
  } catch (error) {
    console.error('Erreur lors du chargement du fichier serviceAccountKey.json:', error);
    // Créer un objet de configuration à partir des variables d'environnement individuelles
    serviceAccount = {
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
    };
  }
}

// Initialisation de Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const auth = admin.auth();

export { auth };