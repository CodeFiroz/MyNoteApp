import style from './bincard.module.css'
const BinCard = (props) => {

  const noteId = props.id;
  const title = props.title;

  const DeleteNote = async (id, title)=>{

    const confirmDel = confirm(`Do you want to delete permanently "${title}"`);

    if(confirmDel){

      try {
        const response = await fetch(`http://localhost:8000/delete/${id}`, {
          method: 'DELETE', // Method itself
          headers: {
            'Content-Type': 'application/json', // Make sure the server expects JSON
          }
        });
    
        if (!response.ok) {
          throw new Error('Failed to send data');
        }
    
        const result = await response.json(); // Parse JSON response
        if(result){
  
        location.reload();
  
  
        }else{
          alert("Error while deleting notes.")
        }
      } catch (error) {
        alert("Error while deleting notes. Error ::: " + error)
      }

    }



  }


  const RestoreNote = async (id, title)=>{

    const confirmDel = confirm(`Do you want to Restore "${title}"`);

    if(confirmDel){

      try {
        const response = await fetch(`http://localhost:8000/restore/${id}`, {
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
  
          alert("Note Restored !")
        location.reload();
  
  
        }else{
          alert("Error while restoring notes.")
        }
      } catch (error) {
        alert("Error while restoring notes. Error ::: " + error)
      }
      
    }



  }

  return (
    <div className={style.noteBox}>
    <h4>
        {props.title}
    </h4>
    <p>
        {props.content}
    </p>

    <div className={style.btns}>
    <button onClick={()=> RestoreNote(noteId, title)}>Restore Note <i className="fi fi-rr-time-past"></i></button>
    <button onClick={()=> DeleteNote(noteId, title)}>Delete Note <i className="fi fi-rr-trash"></i></button>
    </div>

</div>
  )
}

export default BinCard
