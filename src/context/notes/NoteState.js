import React, { useState } from "react";
import Notecontext from "./Notecontext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  //this is a example how the useContext is used
  // const s1={
  //     "name":"harry",
  //     "class": "5b"
  // }
  // const [state,setstate]=useState(s1);  //it is state
  // const update=()=>{
  //     setTimeout(() => {
  //         setstate({
  //             "name": "rohan",
  //             "class": "10b"
  //         })
  //     }, 2000);
  // }

  // return (
  // <Notecontext.Provider value={{state: state,update: update}}>
  //     {props.children}
  // </Notecontext.Provider> 

  const [notes, setnotes] = useState([])

  //function to fetch the notes;
  const getnotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const data = await response.json();
    // console.log(data);
    setnotes(data[0]);
  }

  //function to add a note
  const addnote = async (title, description, tag) => {
    //todo api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });
    // const json=response.json();
    //logic to add a note;
    const note = await response.json();
    // setnotes([...notes, note]); this can be also used;
    setnotes(notes.concat(note));
  }



  //function to delete a note 
  const deletenote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    });
    const data = await response.json();
    // console.log(data);

    //logic to delete a note
    // console.log(`The note is deleted ${id}`)
    const newnotes = notes.filter((note) => { return note._id !== id });  //here it is used to delete a particular note
    setnotes(newnotes);
  }




  //function to edit a note
  const editnote = async (id, title, description, tag) => {
    //API calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    // console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
    //logic to edit a note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
  }





  return (
    <Notecontext.Provider value={{ notes, setnotes, addnote, deletenote, editnote, getnotes }}>
      {props.children}
    </Notecontext.Provider>
  )
}

export default NoteState;