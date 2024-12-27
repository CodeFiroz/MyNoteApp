"use client"

import { createContext, useContext, useState, useEffect, Children } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const UserContext = createContext();

export const UserProvider = ({children}) =>{
    const [userId, setUserId] = useState(null);

    

    useEffect(()=>{
        const userToken = Cookies.get("userToken");
        if(userToken){
           try{

            const decoded = jwt.decode(userToken); // Use decode instead of verify
            if (decoded && decoded.id) {
                setUserId(decoded.id);
            }

           }catch(error){
            console.error("Invalid token", error);

           }
        }

    }, []);

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
          {children}
        </UserContext.Provider>
      );
    

};

// Custom hook to access the context
export const useUser = () => {
    return useContext(UserContext);
  };