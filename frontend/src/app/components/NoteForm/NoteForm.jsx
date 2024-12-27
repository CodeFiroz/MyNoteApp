"use client"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useUser } from "@/app/context/UserContext/UserContext";

export const NoteForm = () => {

  const {userId} = useUser();

useEffect(()=>{
    const token = Cookies.get("userToken"); // Check for cookie
  
      if (!token) window.location.href = "/login";
        
}, [])

    const [overlay, setOverlay] = useState("");
    const [form, setForm] = useState("");
    const [button, setbutton] = useState("");


    const [btnText, setBtnText] = useState("Create Note");
    const [btnStatus, setBtnStatus] = useState("");
      const [formData, setFormData] = useState({
        title: '',
        content: '',
        background: '',
        author: userId
      });



    const handleFormActive = ()=>{
        if(overlay == "" || form == ""){
          setOverlay("active");
          setForm("active");
          setbutton("active")
        }else{
          setForm("");
          setbutton("")
          setOverlay("");
        }
      }

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const handleSubmit = async (e)=>{
      e.preventDefault();
      
   

      setBtnText("Working...");

      try {
        const response = await fetch('http://localhost:8000/create', {
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

        location.reload();


        }else{
          alert("Error while creating notes.")
          setBtnText("Create Note")
        }
      } catch (error) {
        setBtnText("Create Note")
        alert("Error while creating notes. Error ::: " + error)
      }

    }

  return (
    <>

<button className={`newNote ${button}`} onClick={handleFormActive}>   
        <i className="fi fi-rr-plus  "></i>
      </button>

      <div className={`overlay ${overlay}`} onClick={handleFormActive}></div>

    <div className={`newNoteForm ${form}`}>

      <h3>
        Create A New Note <i className="fi fi-rr-edit"></i>
      </h3>

      <form action="#" onSubmit={handleSubmit}>

        <label htmlFor="title">Note Title</label>
        <input type="text" name="title" required onChange={handleChange} />

       

        <label htmlFor="content">Content</label>
        <textarea name="content" id="content" required onChange={handleChange}></textarea>

        <label htmlFor="color">Choose Theme :</label>
          <div className="themeSelection">
            {[
              { id: "red", value: "#ff5d51" },
              { id: "yellow", value: "#ffa000" },
              { id: "yellow2", value: "#ffc700" },
              { id: "green", value: "#87ff00" },
              { id: "skyblue", value: "#5182ff" },
              { id: "purple", value: "#7800ff" },
              { id: "cyan", value: "#00ffb3" },
              { id: "pink", value: "#ff5aa0" },
            ].map((color) => (
              <div key={color.id}>
                <input
                  type="radio"
                  name="background"
                  id={color.id}
                  onChange={handleChange}
                  value={color.value}
                  hidden
                />
                <label htmlFor={color.id} style={{ "--i": color.value }}></label>
              </div>
            ))}
          </div>

    <button type="submit" className={`${btnStatus}`}> 
      {btnText}
    </button>

      </form>

    </div>


    </>
  )
}
