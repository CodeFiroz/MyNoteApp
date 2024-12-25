"use client"

import { useEffect, useState } from 'react'
import BinCard from '../BinCard/BinCard'
import style from './binfolder.module.css'

const BinFolder = () => {

  const [binIcon, setBinIcon] = useState("fi-rr-trash-restore")
  const [binIconActive, setBinIconActive] = useState("")
  const [binBox, setBinBox] = useState("")

  const [notes, setNotes] = useState([]);

  const ActiveBin = ()=>{
    if(binIconActive == "" || binBox == ""){
      setBinIcon("fi-rr-cross");
      setBinIconActive("active");
      setBinBox("active");
    }else{
      setBinIcon("fi-rr-trash-restore");
      setBinIconActive("");
      setBinBox("");
    }
  }


    const fetchNote = async () => {
      try {
        const response = await fetch('http://localhost:8000/getBinNotes');
        
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
    }, [BinFolder])


  return (
  <>

      <div className={`binIcon ${binIconActive}`} onClick={ActiveBin} title='Trash Items'>
        <i className={`fi ${binIcon}`}></i>
      </div>

    <div  className={`binLayout ${binBox}`}>
      <h1>Bin Items</h1>

        <div className={style.noteGrid}>

        {
  notes.length > 0 ? (
    notes.map((note)=>(
      <BinCard title={note.title} slug={note.slug} content={note.content} key={note._id} color={note.background} id={note._id}/>
    ))

  ) : (
    <h3>
      There is nothing in trash
    </h3>
  )
}

      
        </div>

    </div>
  </>
  )
}

export default BinFolder
