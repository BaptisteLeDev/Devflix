import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC1014ZMpWNSazrkQW239t99MbRwKFMZi4",
    authDomain: "netflix-clone-bdev.firebaseapp.com",
    projectId: "netflix-clone-bdev",
    storageBucket: "netflix-clone-bdev.firebasestorage.app",
    messagingSenderId: "144693247738",
    appId: "1:144693247738:web:0ca5327ec2857ab1959343",
    measurementId: "G-6X357CZ4VF"
};
import { toast } from 'react-toastify';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Fonction d'inscription
const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name,
            authprovider: 'local',
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(''));
    }
}

// Fonction de connexion
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(''));

    }
}

// Fonction de déconnexion
const logout = () => {
    signOut(auth);
}

export {
    signup,
    login,
    logout,
    auth,
    db
}