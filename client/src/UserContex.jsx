import React, { createContext, useState,useEffect } from "react";
import axios from "axios";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready,setReady] = useState(false);
  const [showNav,setShowNav] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    
    if (!user && token) {
      console.log("here");
      axios.get('/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(({ data }) => {
        console.log(data);
        setUser(data);
        setReady(true);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [user]);
  

  return (
    <UserContext.Provider value={{ user, setUser ,ready,showNav,setShowNav}}>
      {children}
    </UserContext.Provider>
  );
}
