"use client"

import NoteCard from "./components/NoteCard/NoteCard";
import { useState, useEffect } from "react";
import { NoteForm } from "./components/NoteForm/NoteForm";
import Cookies from "js-cookie";
import BinFolder from "./components/BinFolder/BinFolder";
import { useUser } from "./context/UserContext/UserContext";


export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);


  const {userid} = useUser();

    // Fetch notes if authenticated

        const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/notes');
      if (!response.ok) {
        throw new Error('Error in server: ' + response.statusText);
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Fetch failed:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("userToken"); // Check for cookie

    if (token) {
      
      fetchNotes();  // Fetch notes only if token is found
    } else {
      
      window.location.href = "/login"
    }

  }, []);


  return (
    <>
      <div className="container">
        <NoteForm />
        <BinFolder />



        <div className="noteGrid">
          {loading ? (
            <div>Loading notes...</div>
          ) : (
            notes.map((note) => (
              <NoteCard
                title={note.title}
                slug={note.slug}
                content={note.content}
                key={note._id}
                color={note.background}
                id={note._id}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
