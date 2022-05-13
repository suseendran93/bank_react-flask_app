import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, pass) {
    return auth.createUserWithEmailAndPassword(email, pass);
  }

  function signin(email, pass) {
    return auth.signInWithEmailAndPassword(email, pass);
  }

  function signout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    signout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
