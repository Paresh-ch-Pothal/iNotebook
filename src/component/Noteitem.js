import React, { useContext } from 'react'
import Notecontext from "../context/notes/Notecontext";

export default function Noteitem(props) {
    const context = useContext(Notecontext);
    const { deletenote } = context


    const { note, updateNote } = props;
    return (
        <>
            <div className='col-md-3 my-3'>
                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fa-solid fa-trash" onClick={() => {
                            deletenote(note._id); props.showalert("Deleted Successfully", "success");
                        }} ></i>
                        <i className="fa-solid fa-pen-to-square mx-3" onClick={() => { updateNote(note) }}></i>
                        {/* whenever we use a function through props and we have to give some arguments then we have to do like this shown above with updateNote function using a arrow fucntion */}

                    </div>
                </div>
            </div>
        </>
    )
}
