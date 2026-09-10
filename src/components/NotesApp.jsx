import axios from "axios";
import { useEffect, useState } from "react"

const NotesApp = () => {
  const header ={"Acess-Control-Allow-Origin": "*"};

  const[notes,SetNotes]=useState({
    title:"",
    description:""
  })
  const[error,setError]=useState("")
  const[getNotes,SetGetNotes]=useState([])
  const[editId,setEditId]=useState(null)
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
      await axios.put(`https://6a853c749c451dc67a636590.mockapi.io/Notes/${editId}`)
    }
    else{
      axios.post("https://6a853c749c451dc67a636590.mockapi.io/Notes",
        notes,{
          headers:{"Content-Type": "application/json"}
        }
      )
      
      SetNotes({
        title:"",
        description:""
      })
      setError("")
    
    
  }
}
const fetchNotes= async()=>{
  try{
  const res= await axios.get("https://6a853c749c451dc67a636590.mockapi.io/Notes")
  SetGetNotes(res.data)
  }
  catch(err){
    console.log("Error")
  }
}
const handleedit=(note)=>{
  SetNotes({
    title: note.title,
    description: note.description
  });
setEditId(note.id)
}
const handledelete= async(id)=>{
   await axios.delete(`https://6a853c749c451dc67a636590.mockapi.io/Notes/${id}`)
  SetGetNotes((note)=> note.filter((item)=> item.id!==id))
};
useEffect(()=>{
  fetchNotes();
  

},[])
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
          <button>Add Note</button>

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
