import './styles.css'
import { useEffect, useState } from 'react'
import { Note } from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import AddNotesForm from './components/AddNotesForm'
import ErrorMessage from './components/ErrorMessage'

export default function App () {
  const [notes, setNotes] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const getNotes = () => {
    console.log('Hola')
    noteService
      .getAll()
      .then((notes) => {
        setNotes(notes)
      })
  }

  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
      .then((returnedObject) => {
        setNotes([...notes, returnedObject])
      })
  }

  const handleLogOut = () => {
    setUser(null)
    noteService.setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
    setNotes([])
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      getNotes()
      console.log(user)
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setErrorMessage('Wrong username or password')
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

  const notesToShow = notes

  return (
    <div>
      <h1>Notes</h1>
      {
      errorMessage
        ? <ErrorMessage errorMessage={errorMessage} />
        : ''
      }
      {
        !user
          ? <LoginForm
              username={username}
              password={password}
              handleUsernameChange={event => setUsername(event.target.value)}
              handlePasswordChange={event => setPassword(event.target.value)}
              handleLogin={handleLogin}
            />
          : <AddNotesForm
              handleLogOut={handleLogOut}
              addNote={addNote}
            />
      }
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show
          {' '}
          {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) => (
          <Note
            key={i}
            note={note}
          // toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )
        )}
      </ul>
    </div>
  )
}
