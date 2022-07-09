import 'material-symbols';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
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
  const [message, setMessage] = useState('Loading');

  window.addEventListener('load', () => {
    setTimeout(() => {
      setMessage('');
    }, 1000);
  });

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
      setMessage('Note creation failed');
    }
  };

  const handleLoginSubmit = async (username, password) => {
    try {
      const user = await loginRequest.login({ username, password });
      localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
      notesRequest.setToken(user.token);
      setUser(user);
    } catch {
      setMessage('Error al iniciar sesión');
      setTimeout(() => setMessage(null), 3000);
    }
  }

  const handleDeleteNote = async id => {
    try {
      await notesRequest.delete({ id });
      setNotes(notes.filter(note => note.id !== id));
    } catch {
      setMessage('Note deletion failed');
      setTimeout(() => { 
        setMessage(null);
      }, 3000);
    }
  }

  return (
    <div className="App">
      <Header user={user} handleSetUser={handleSetUser} />
      {message ?
        <Notification message={message}>
          <TailSpin	color="white" height={30} width={50} />
        </Notification>
        : null}
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
