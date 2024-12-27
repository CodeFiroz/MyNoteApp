"use client"

import { useEffect } from 'react';
import Cookies from 'js-cookie';

const Login = () => {
  useEffect(() => {
    const token = Cookies.get("userToken"); // Check for cookie

    if (token) {
      Cookies.remove('userToken');
      window.location.href = "/login";
    }
    else window.location.href = "/login";

  }, []);

    

  return (
   <h1>
    Loggin Out
   </h1>
  )
}

export default Login