import React, { useContext, useState } from 'react'
import Notecontext from "../context/notes/Notecontext";

const AddNote = (props) => {
    const context = useContext(Notecontext);
    const { addnote } = context
    const [note, setnote] = useState({ title: "", description: "", tag: "" });
    //handleclick function
    const handleclick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        setnote({ title: "", description: "", tag: "" });
        props.showalert("Added Successfully","success");
    }

    //onchange function
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })  //here it means to add the note in the existing note
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add A Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} minLength={5} required />
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
