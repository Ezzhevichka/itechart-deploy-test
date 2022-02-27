import React, { useContext, useEffect, useState } from 'react';
import { auth } from './admin';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebase from 'firebase/compat/app';

firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "motivational-testing.firebaseapp.com",
    projectId: "motivational-testing",
    storageBucket: "motivational-testing.appspot.com",
    messagingSenderId: "103807964905",
    appId: "1:103807964905:web:c3a077c39cabe92c5d0278",
    measurementId: "G-KCD0KYFG1Q"
  }
  );

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvieder({ children }) {
    const [currentUser, setCurentUser] = useState();

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurentUser(user);
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        logOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
