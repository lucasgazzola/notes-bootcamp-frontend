import React, { useState } from "react";

export default function AddNotesForm({ handleLogOut, addNote }) {

  const [newNote, setNewNote] = useState('');

  const handleChange = ({ target }) => {
    setNewNote(target.value)
  }
  const handleSubmit = event => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };
    addNote(noteObject);
    setNewNote('');
  }
  return (
    <>
      <div>
        <button onClick={handleLogOut}>
          Cerrar Sesión
        </button>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            value={newNote}
            onChange={handleChange}
          />
          <button>Save</button>
        </form>
      </div>
    </>
  )
}