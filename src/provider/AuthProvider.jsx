
import { createContext, useEffect, useState } from "react";
import {  GoogleAuthProvider,  onAuthStateChanged,  signInWithPopup,  } from "firebase/auth";
import { auth } from "../firebase/firebase.init";


export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
      // Login with Google
      const provider = new GoogleAuthProvider();

      const loginWithGoogle = () => {
          setLoading(true);
          return signInWithPopup(auth, provider)
      }
      
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // console.log('current user', currentUser);
                setLoading(false);
        });
        return () => {
            return unsubscribe();
        }
    }, []);
    const authInfo ={
        user,
        loading,
        loginWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
