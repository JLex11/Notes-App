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
  const [message, setMessage] = useState({ msg: 'Loading', type: 'loading' });
  
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
      if (user && user.token) {
        setUser(user);
        notesRequest.setToken(user.token);
      } else {
        setUser(null);
      }
    }
  }, []);

  const handleResetMessage = () => {
    setMessage(null);
  };

  const resetLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedNoteAppUser');
    notesRequest.setToken(null);
  };

  const handleLogout = () => {
    resetLogout();
    setMessage({ msg: 'Logged out', type: 'info' });
  };

  const addNote = async (toAddNote) => {
    try {
      const addedNote = await notesRequest.create({ note: toAddNote });
      setNotes(notes.concat(addedNote));
      setMessage({ msg: 'Note added', type: 'success' });
    } catch {
      setMessage({ msg: 'Note creation failed', type: 'error' });
    }
  };

  const handleUpdateNote = async (toUpdateNote) => {
    try {
      await notesRequest.update({
        id: toUpdateNote.id,
        note: {
          content: toUpdateNote.newContent,
          important: toUpdateNote.newImportant
        }
      });
      setMessage({msg: 'Note updated', type: 'success'});
      await notesRequest.getAll().then(setNotes);
    } catch {
      setMessage({ msg: 'Note update failed', type: 'error' });
    }
  };

  const handleDeleteNote = async id => {
    try {
      await notesRequest.delete({ id });
      setNotes(notes.filter(note => note.id !== id));
      setMessage({ msg: 'Note deleted', type: 'success' });
    } catch {
      setMessage({msg: 'Note deletion failed',type: 'info'});
    }
  };

  const handleLoginSubmit = async (username, password) => {
    try {
      const user = await loginRequest.login({ username, password });
      localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
      notesRequest.setToken(user.token);
      setUser(user);
      setMessage({msg: 'Login successful', type: 'success'});
    } catch {
      setMessage({ msg: 'User or password invalid', type: 'error'});
      resetLogout();
    }
  };

  return (
    <div className="App">
      <Header user={user} handleLogout={handleLogout} />
      {message ?
        <Notification
          message={message.msg}
          type={message.type}
          handleResetMessage={handleResetMessage}>
          {message.type === 'loading' &&
            <TailSpin
                color="white"
                height={30}
                width={60}
            />
          }
        </Notification>
        : null}
      {!user ? (
        <LoginForm handleLoginSubmit={handleLoginSubmit} />
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
            handleUpdateNote={handleUpdateNote}
            timeTransition={'0.' + i + 's'}
            user={user}
          />
        )}
      </div>
    </div>
  );
};
