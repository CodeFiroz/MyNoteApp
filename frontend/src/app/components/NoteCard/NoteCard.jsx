import style from './notecard.module.css'
import Link from 'next/link';

const NoteCard = (props) => {

    const NoteId = props.id;
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
        location.reload();

        }else{
          alert("Error while moving item to trash.")
        }
      } catch (error) {
        alert("Error while moving item to trash. Error ::: " + error)
      }
        }

    }

  return (
    <div className={style.noteCard} style={{ '--i': props.color}}>

        <h4>
           {props.title}
        </h4>
        <p>
            {props.content}
        </p>

        <div className={style.actionBtns}>

            <Link href={`/read/${props.slug}`} title='Open Note'>
                <i className="fi fi-rr-book-alt"></i>
            </Link>

            <button title='Move To Trash' onClick={()=>{MoveToTrash(props.slug)}}>
                <i className="fi fi-rr-trash"></i>
            </button>

            <Link href={`/update/${props.slug}`} title='Edit Note'   >
                <i className="fi fi-rr-pen-clip"></i>
            </Link>

        </div>

    </div>
  )
}

export default NoteCard