

import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.init';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    setLoading(true);
    const stored = localStorage.getItem('isLoggedIn');
    
    return stored === 'true'; 

  });

  useEffect(() => {
    
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && isLoggedIn) {
        setUser(currentUser);
        setIsLoggedIn(true);
        if(currentUser?.email){
          const userData = {email: currentUser.email}
          axios.post('http://localhost:3000/jwt',userData,{
            withCredentials: true
          })
          .then(res => {
            console.log(res.data)
          })
          .catch(error => console.log(error));
          
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isLoggedIn]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
