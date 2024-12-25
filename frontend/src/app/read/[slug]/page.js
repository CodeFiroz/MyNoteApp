"use client"
import { useState, useEffect } from 'react';
import style from './read.module.css'
import { useParams } from 'next/navigation';



const Read = () => {

  const [note, setNote] = useState([]);
  const params = useParams();
  const { slug } = params; 

  



  const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:8000/note/${slug}`);
        
        if (!response.ok) {
          throw new Error('Error in server: ' + response.statusText);
        }
        
        const data = await response.json();
        console.log(data); // Do something with the data
        setNote(data); // Return the data if needed;
      } catch (error) {
        console.error('Fetch failed:', error.message);
      }
    };
  
    useEffect(()=>{
      fetchNote();
    }, [])

    const NoteId = note._id;


    const MoveToTrash = async (id)=>{


      const confirmMsg = confirm("Do you want to move this to trash");
  
      if(confirmMsg){
          
    try {
      const response = await fetch(`http://localhost:8000/bin/${NoteId}`, {
        method: 'POST', // Method itself
        headers: {
          'Content-Type': 'application/json', // Make sure the server expects JSON
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to send data');
      }
  
      const result = await response.json(); // Parse JSON response
      if(result){
  
      alert("Item Moved to Bin");
      window.location.href = "http://localhost:3000/";
  
      }else{
        alert("Error while moving item to trash.")
      }
    } catch (error) {
      alert("Error while moving item to trash. Error ::: " + error)
    }
      }
  
  }

  return (

    <div className="container">


      <div className={style.readLayout} style={{ '--i': note.background}}>

      <div className={style.actionBtn}>

<button onClick={(id)=> MoveToTrash(NoteId)}>
    <i className="fi fi-rr-trash"></i>
    <span>Move To Trash</span>
</button>

<button onClick={()=> window.location.href = `http://localhost:3000/update/${note.slug}`}>
    <i className="fi fi-rr-pen-clip"></i>
    <span>Edit Note</span>
</button>

</div>

        <h1>
         {note.title}
        </h1>

        <textarea value={note.content} readOnly></textarea>

       

      </div>


    </div>

  )
}

export default Read