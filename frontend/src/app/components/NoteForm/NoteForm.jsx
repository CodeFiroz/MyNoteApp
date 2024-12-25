"use client"
import { useState } from "react";

export const NoteForm = () => {

    const [overlay, setOverlay] = useState("");
    const [form, setForm] = useState("");
    const [button, setbutton] = useState("");

    // const [title, setTitle] = useState("");
    // const [content, setContent] = useState("");
    // const [background, setBackground] = useState("");
    const [btnText, setBtnText] = useState("Create Note");
    const [btnStatus, setBtnStatus] = useState("");
    const [formData, setFormData] = useState({
      title: '',
      content: '',
      background: '',
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
          <div>
            <input type="radio" name="background" id="red" onChange={handleChange} value="#ff5d51" />
            <label htmlFor="red" style={{ '--i': '#ff5d51'}}></label>
          </div>

          <div>
            <input type="radio" name="background" id="yellow" onChange={handleChange} value="#ffa000" />
            <label htmlFor="yellow" style={{ '--i': '#ffa000'}}></label>
          </div>

          <div>
            <input type="radio" name="background" id="yellow2" onChange={handleChange} value="#ffc700" />
            <label htmlFor="yellow2" style={{ '--i': '#ffc700'}}></label>
          </div>

          <div>
            <input type="radio" name="background" id="green" onChange={handleChange} value="#87ff00" />
            <label htmlFor="green" style={{ '--i': '#87ff00'}}></label>
          </div>

          <div>
            <input type="radio" name="background" id="skyblue" onChange={handleChange} value="#5182ff" />
            <label htmlFor="skyblue" style={{ '--i': '#5182ff'}}></label>
          </div>

          <div>
            <input type="radio" name="background" id="purple" onChange={handleChange} value="#7800ff" />
            <label htmlFor="purple" style={{ '--i': '#7800ff'}}></label>
          </div>

          <div>
            <input type="radio" name="background" id="cyan" onChange={handleChange} value="#00ffb3" />
            <label htmlFor="cyan" style={{ '--i': '#00ffb3'}}></label>
          </div>

          <div>
            <input type="radio" name="background" id="pink" onChange={handleChange} value="#ff5aa0" />
            <label htmlFor="pink" style={{ '--i': '#ff5aa0'}}></label>
          </div>

        </div>

    <button type="submit" className={`${btnStatus}`}> 
      Create Note 
    </button>

      </form>

    </div>


    </>
  )
}
