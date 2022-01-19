import React, { useState, useEffect } from 'react';
// import notes from '../../assets/data';
import ListItem from '../../Components/ListItem/ListItem';
import AddButton from '../../Components/AddButton/AddButton';
import { useParams } from 'react-router-dom';


const NoteListPage = () => {
    
    let [notes, setNotes] = useState([]);
    let [change, setChange] = useState(false);

    useEffect(() => {
        getNotes()
    }, [change]);

    let getNotes = async () => {
        let response = await fetch('http://localhost:5000/notes')
        let data = await response.json();
        setNotes(data);
        setChange(true);
    }

    return (
        <div className="notes">
            <div className="notes-header" >
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className="notes-count">{notes.length}</p>
            </div>
            <div className="notes-list">
                {notes.map((note, index) => (
                    <ListItem key={index} note={note} />
                ))}
            </div>
            <AddButton />
        </div >
    )
}

export default NoteListPage;