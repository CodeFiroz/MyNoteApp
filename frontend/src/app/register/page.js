"use client"

import { useState } from 'react';
import style from './register.module.css'

const Register = () => {

    const [formData, setFormData] = useState({
          name: '',
          email: '',
          password: '',
        });
    const [passType, setPassType] = useState("password");
    const [passLabel, setPassLabel] = useState("Show Password");
    const [passIcon, setPassIcon] = useState("fi-rr-eye");
    const [BtnText, setBtnText] = useState("Sign up");

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
        
                if(formData.name == ""){
                    setBtnText("Sign up");
                    setError("*Please enter a valid name");
                    return false;
                }else if(formData.name.length < 3){
                    setBtnText("Sign up");
                    setError("*Please enter a valid name");
                    return false;
                }else if(formData.email == ""){
                    setBtnText("Sign up");
                    setError("*Please enter a valid email address");
                    return false;
                }else if(formData.email.length < 8){
                    setBtnText("Sign up");
                    setError("*Please enter a valid email address");
                    return false;
                }else if(formData.password == ""){
                    setBtnText("Sign up");
                    setError("*Please create a password");
                    return false;
                }else if(formData.password.length < 6){
                    setBtnText("Sign up");
                    setError("*Password must be 6 character long.");
                    return false;
                }else{

                    setBtnText("Working...");

                    const response = await fetch('http://localhost:8000/register', {
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
                      if(result){
              
                        console.log(result);

                        setFormData({
                            name : "",
                            email: "",
                            password: ""
                        });

                        alert("Registred");

              
              
                      }else{
                        alert("Error while registreing user.")
                        setBtnText("Sign up")
                      }




                }

            }catch(error){
                alert(error);
            }

            


    }

  return (
    <div className={style.registerLayout}>

        <div className={style.registerContainer}>

                <h1>Sign up</h1>
                <p>
                    Register in mynoteapp and get all your notes inone place.
                </p>

                <form onSubmit={handleSubmit}>


                <label htmlFor="name">Name</label>
                    <input 
                    type="text"
                    name='name'
                    id='name'
                    value={formData.name}
                    onChange={handleChange}
                     />

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

export default Register