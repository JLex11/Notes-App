import 'material-symbols';
import { useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { LoginForm } from './components/LoginForm';
import { Note } from './components/Note';
import { NoteForm } from './components/NoteForm';
import { Notification } from './components/Notification';
import loginRequest from './services/loginRequest';
import notesRequest from './services/notesRequest';


export const App = () => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const notesRef = useRef();

  useEffect(() => {
    notesRequest.getAll().then(setNotes);
  }, []);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      notesRequest.setToken(user.token);
    }
  }, []);

  const handleSetUser = () => {
    setUser(null);
    localStorage.removeItem('loggedNoteAppUser');
    notesRequest.setToken(null);
  }

  const addNote = async (toAddNote) => {
    try {
      const addedNote = await notesRequest.create({ note: toAddNote });
      setNotes(notes.concat(addedNote));
    } catch {
      setError('Note creation failed');
    }
  };

  const handleLoginSubmit = async (username, password) => {
    try {
      const user = await loginRequest.login({ username, password });
      localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
      notesRequest.setToken(user.token);
      setUser(user);
    } catch {
      setError('Error al iniciar sesión');
      setTimeout(() => { 
        setError(null);
      }, 5000);
    }
  }

  const handleDeleteNote = async id => {
    try {
      await notesRequest.delete({ id });
      setNotes(notes.filter(note => note.id !== id));
    } catch {
      setError('Note deletion failed');
    }
  }

  console.log({notesRef});

  return (
    <div className="App">
      <Header user={user} handleSetUser={handleSetUser} />
      {error ? <Notification message={error} /> : null}
      {!user ? (
        <LoginForm
          handleLoginSubmit={handleLoginSubmit}
        />
      ) : (
        <NoteForm addNote={addNote} />
      )}

      <div className="Notes">
        {notes.map((note, i) =>
          <Note
            key={note.id}
            id={note.id}
            content={note.content}
            date={note.date}
            important={note.important}
            handleDeleteNote={handleDeleteNote}
            timeTransition={'0.' + i + 's'}
            user={user}
          />

        )}
      </div>
    </div>
  );
};
