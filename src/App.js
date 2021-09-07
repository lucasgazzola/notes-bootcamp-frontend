import "./styles.css";
import { useEffect, useState } from "react";
import { Note } from "./Note";
import { getAllNotes } from "./services/notes/getAllNotes";
import { createNotes } from "./services/notes/createNotes";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("render");
    setLoading(true);
    getAllNotes().then((notes) => {
      setNotes(notes);
      setLoading(false);
    });
  }, []);

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const noteToAddToState = {
      userId: 1,
      title: newNote,
      body: newNote
    };

    createNotes(noteToAddToState).then((newNote) => {
      setNotes((prevNotes) => prevNotes.concat(newNote));
    });
    setNewNote("");
  };

  return (
    <div>
      <h1>Notes</h1>
      <h4>{loading ? "cargando" : ""}</h4>
      <ol>
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </ol>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newNote} onChange={handleChange} />
        <button>Crear Nota</button>
      </form>
    </div>
  );
}
