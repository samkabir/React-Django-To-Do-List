import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import notes from '../../assets/data';
import { ReactComponent as ArrowLeft } from '../../assets/arrow-left.svg';

const NotePage = () => {
    let navigate = useNavigate();
    let params = useParams();

    let [note, setNote] = useState(null); 
    // let note = notes.find(note => params.id == Number(note.id));

    useEffect(() => {
        getNote()
    }, [params.id])

    let getNote = async () => {
        if (params.id == 'new') return
        let response = await fetch(`http://localhost:5000/notes/${params.id}`);
        let data = await response.json();
        setNote(data);
    }


    let createNote = async () => {
        await fetch(`http://127.0.0.1:5000/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
        });
    }

    let updateNote = async () => {
        await fetch(`http://127.0.0.1:5000/notes/${params.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
        });
    }
    const deleteNote = async () => {
        await fetch(`http://127.0.0.1:5000/notes/${params.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });
        navigate('/');
    }

    let handleSubmit = () => {
        if (params.id!= "new" && !note.body) {
            deleteNote();
        } else if (params.id != "new") {
            updateNote();
        } else if (params.id === 'new' && note !== null) {
            createNote();
        }
        navigate('/');
        
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to="/">
                        <ArrowLeft onClick={handleSubmit} />
                    </Link>
                </h3>


                {params.id != 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <textarea onChange={ (e) => { setNote({ ...note, 'body': e.target.value }) }} placeholder='Edit note' value={note?.body}>
                
            </textarea>
        </div>
    );
};

export default NotePage;