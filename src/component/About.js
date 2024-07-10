import React, { useContext, useEffect } from 'react'
import Notecontext from '../context/notes/Notecontext'  //here we are importing The Notecontext not the NoteState

export default function About() {
  // const a=useContext(Notecontext)  //here we are using Notecontext
  // useEffect(()=>{
  //     a.update();
  //     // eslint-disable-next-line
  // },[])
  return (
    <div>
      {/* this is about {a.state.name} and he is in class {a.state.class} */}
      This is about page
    </div>
  )
}
