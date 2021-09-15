import "./styles.css";
import { useEffect, useState } from "react";
import { Note } from "./Note";
import noteService from "./services/notes"
import loginService from "./services/login"

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then((notes) => {
        setNotes(notes);
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(returnedObject => {
        setNotes([...notes, returnedObject])
        setNewNote('')
      })
  }

  const handleLogOut = () => {
    setUser(null);
    noteService.setToken(user.token);
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      console.log(user);
      noteService.setToken(user.token)
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (e) {
      setErrorMessage('Wrong username or password');
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const noteToAddToState = {
  //     userId: 1,
  //     content: newNote
  //   };

  //   noteService.create(noteToAddToState).then((newNote) => {
  //     const error = newNote;
  //     console.log(error.error);
  //     if (!error.error) return setNotes((prevNotes) => prevNotes.concat(newNote))
  //   });
  //   setNewNote("");
  // };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type='text'
          value={username}
          name='Username'
          placeholder='Username'
          onChange={event => setUsername(event.target.value)}
        />
      </div>
      <div>
        <input
          type='password'
          value={password}
          name='Password'
          placeholder='Password'
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <button>Login</button>
    </form>
  )


  const renderAddNotesForm = () => (
    <>
      <div>
        <button onClick={handleLogOut}>
          Cerrar Sesión
        </button>
      </div>
      <div>
        <form onSubmit={addNote}>
          <input
            value={newNote}
            onChange={handleNoteChange}
          />
          <button>Save</button>
        </form>
      </div>
    </>
  )


  const notesToShow = notes

  return (
    <div>
      <h1>Notes</h1>
      {
        !user
          ? renderLoginForm()
          : renderAddNotesForm()
      }
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) =>
          <Note
            key={i}
            note={note}
          // toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
    </div>
  );
}
