"use client"

import NoteCard from "./components/NoteCard/NoteCard";
import { useState, useEffect } from "react";
import { NoteForm } from "./components/NoteForm/NoteForm";
import BinFolder from "./components/BinFolder/BinFolder";

export default function Home() {

  const [notes, setNotes] = useState([]);
   
  const fetchNote = async () => {
    try {
      const response = await fetch('http://localhost:8000/notes');
      
      if (!response.ok) {
        throw new Error('Error in server: ' + response.statusText);
      }
      
      const data = await response.json();
      setNotes(data); // Return the data if needed;
    } catch (error) {
      console.error('Fetch failed:', error.message);
    }
  };

  useEffect(()=>{
    fetchNote();
  }, [])

  return (
    <>



    
    <div className="container">

      <NoteForm />
      <BinFolder />

      <div className="noteGrid">

      {
        notes.map((note)=>(
          <NoteCard title={note.title} slug={note.slug} content={note.content} key={note._id} color={note.background} id={note._id}/>
        ))
      }


    
      </div>

    </div>
    
    </>
  );
}
