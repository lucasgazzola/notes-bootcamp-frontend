import React, { useState, useRef } from 'react'
import Togglable from './Togglable'

export default function AddNotesForm ({ handleLogOut, addNote }) {
  const [newNote, setNewNote] = useState('')
  const togglableRef = useRef()
  const handleChange = ({ target }) => {
    setNewNote(target.value)
  }
  const handleSubmit = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }
    addNote(noteObject)
    setNewNote('')
    togglableRef.current.toggleVisibility()
  }

  return (
    <>
      <Togglable ref={togglableRef} buttonLabel='Add new note'>
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
      </Togglable>
    </>
  )
}
