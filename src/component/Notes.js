import React, { useContext, useEffect, useRef, useState } from 'react'
import Notecontext from "../context/notes/Notecontext";
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useHistory } from 'react-router-dom';

export default function Notes(props) {
    const context = useContext(Notecontext);
    const { notes, setnotes, addnote, getnotes, editnote } = context;
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const ref = useRef(null);
    const refClose = useRef(null);
    let history = useHistory();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getnotes();
        }
        else {
            history.push("/login");
        }
        // eslint-disable-next-line 
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    //handleclick function
    const handleclick = (e) => {
        // e.preventDefault();
        // console.log("updating the note: ",note);
        editnote(note.id, note.etitle, note.edescription, note.etag);
        ref.current.click();
        props.showalert("Updated Successfully", "success");
    }

    //onchange function
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })  //here it means to add the note in the existing note
    }
    return (
        <>
            <AddNote showalert={props.showalert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" value={note.etitle} name='etitle' aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} className="btn btn-primary" onClick={handleclick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <h2>Your Notes</h2>
                <div className="container mx-1">
                    {notes.length === 0 && "No notes to Display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showalert={props.showalert} note={note} />  // key={note._id}  here we should write in this way to get the id as a unique and _id is used because from mongodb we get the id by _id not simple id
                })}
            </div>
        </>
    )
}
