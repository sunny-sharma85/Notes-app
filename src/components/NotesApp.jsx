import axios from "axios";
import { useEffect, useState } from "react"

const NotesApp = () => {

  const[notes,SetNotes]=useState({
    title:"",
    description:""
  })
  const[error,setError]=useState("")
  const[getNotes,SetGetNotes]=useState(
     JSON.parse(localStorage.getItem("notes")) || [] )

  
  const[editId,Seteditid]=useState(null)
  const handlechange=(e)=>{
SetNotes({
  ...notes,
  [e.target.name] : e.target.value
})
  
  }
  const handlesubmit= async(e)=>{
    e.preventDefault();
    if(!notes.title || !notes.description){
      setError("Field Cant be Empty")
      return;
    }
    if(editId){
      const updatenotes=getNotes.map((item)=> item.id===editId? {...item,...notes}:item);
      SetGetNotes(updatenotes)
      localStorage.setItem("notes",JSON.stringify(updatenotes))
      Seteditid(null)
      SetNotes({
        title:"",
        description:""
      })
    }
    else{
      
      
     
     const NewNotes= {
      id:Date.now(),
      ...notes,

     }
     const updatednotes=[...getNotes,NewNotes]
     SetGetNotes(updatednotes)
     
      localStorage.setItem("notes",JSON.stringify(updatednotes))
      SetNotes({
        title:"",
        description:""
      })
      setError("")
    
    }
  }


const handleedit=(note)=>{
  SetNotes({
    title: note.title,
    description: note.description
  });
Seteditid(note.id)
}
const handledelete= (id)=>{
   const updatenotes=getNotes.filter((note)=> note.id !== id);
   SetGetNotes(updatenotes)
   localStorage.setItem("notes",JSON.stringify(updatenotes))
};

  return (
     <main className="notes-app">

      <div className="notes-wrapper">

        <div className="heading">
          <h1>My Notes</h1>
          <p>Write and manage your daily notes.</p>
        </div>

        <form className="note-form" onSubmit={handlesubmit}>

          <input
            type="text"
            placeholder="Enter note title"
            name="title"
            value={notes.title}
            onChange={handlechange}
          />

          <textarea
            placeholder="Write your description..."
            name="description"
            value={notes.description}
            onChange={handlechange}
          ></textarea>
{error&& <p style={{color:"red"}}>{error}</p>}
          <button>{editId? "Update": "AddNote"}</button>

        </form>

        <section className="notes-section">

          <h2>Your Notes</h2>

          <div className="notes-container">

{getNotes.map((note)=>(
            <div className="note-card" key={note.id}>

              <h3>{note.title}</h3>

              <p>
               {note.description}
              </p>

              <div className="card-buttons">
                <button onClick={()=> handleedit(note)}className="edit-btn">Edit</button>
                <button  onClick={()=>handledelete(note.id)}className="delete-btn">Delete</button>
              </div>

            </div>
  ))}

          </div>
        
        </section>

      </div>
      </main>
  )
}

export default NotesApp
