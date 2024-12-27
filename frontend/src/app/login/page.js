"use client"

import { useState, useEffect } from 'react';
import style from '../register/register.module.css'
import Cookies from 'js-cookie';

const Login = () => {
  useEffect(() => {
    const token = Cookies.get("userToken"); // Check for cookie

    if (token) window.location.href = "/"

  }, []);

    const [formData, setFormData] = useState({
          email: '',
          password: '',
        });
    const [passType, setPassType] = useState("password");
    const [passLabel, setPassLabel] = useState("Show Password");
    const [passIcon, setPassIcon] = useState("fi-rr-eye");
    const [BtnText, setBtnText] = useState("Sign in");

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const ShowPassword = ()=>{
        if(passType == "password"){
            setPassType("text");
            setPassIcon("fi-rr-eye-crossed")
            setPassLabel("Hide Password")
        }else{
            setPassType("password");
            setPassIcon("fi-rr-eye")
            setPassLabel("Show Password")
        }
    }

    const handleSubmit = async (e)=>{

        e.preventDefault();

       
            try{

                setError("");
                setBtnText("Working...");
        
                if(formData.email == ""){
                    setBtnText("Sign up");
                    setError("*Please enter a valid email address");
                    return false;
                }else if(formData.email.length < 8){
                    setBtnText("Sign up");
                    setError("*Please enter a valid email address");
                    return false;
                }else if(formData.password == ""){
                    setBtnText("Sign up");
                    setError("*Please enter a password");
                    return false;
                }else{

                    setBtnText("Working...");

                    const response = await fetch('http://localhost:8000/login', {
                        method: 'POST', // Method itself
                        headers: {
                          'Content-Type': 'application/json', // Make sure the server expects JSON
                        },
                        body: JSON.stringify(formData), // Convert JS object to JSON string
                      });
                  
                      if (!response.ok) {
                        throw new Error('Failed to send data');
                      }
                  
                      const result = await response.json(); // Parse JSON response
                      if(result.error){
                        setError(result.message);
                        setBtnText("Sign in");
                      }else{
                        
                        Cookies.set('userToken', result.token, { expires: 365 })

                        setBtnText("Sign in");
                        setFormData({
                            name: "",
                            email : "",
                            password: ""
                        })

                        window.location.href = "/";
                        
                      }




                }

            }catch(error){
                alert(error);
            }

            


    }

  return (
    <div className={style.registerLayout}>

        <div className={style.registerContainer}>

                <h1>Sign in</h1>
                <p>
                    log in to your account & manage your notes.
                </p>

                <form onSubmit={handleSubmit}>


                    <label htmlFor="email">Email Address</label>
                    <input 
                    type="email"
                    name='email'
                    id='email'
                    value={formData.email}
                    onChange={handleChange}
                     />

                    <label htmlFor="password">Password</label>
                    <input 
                    type={passType}
                    name='password'
                    id='password'
                    value={formData.password}
                    onChange={handleChange}
                     />
                     <div className={style.passVisiblity}>
                        <input type="checkbox" id='passtype'onChange={ShowPassword} hidden />
                        <label htmlFor="passtype">{passLabel} <i className={`fi ${passIcon}`}></i></label>
                     </div>

<div className={style.error}>
    {error}
</div>

                    <button type='submit'>
                        {BtnText}
                    </button>

                </form>

        </div>

    </div>
  )
}

export default Login