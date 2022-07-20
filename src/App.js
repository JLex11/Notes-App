import { motion } from 'framer-motion';
import 'material-symbols';
import { useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './components/Header';
import { LoginForm } from './components/LoginForm';
import { Note } from './components/Note';
import { NoteForm } from './components/NoteForm';
import { Notification } from './components/Notification';
import { initNotes } from './redux/actions/notesActions';
import { setNotification } from './redux/actions/notificationsActions';
import { resetUser, setUser } from './redux/actions/userActions';
import notesRequest from './services/notesRequest';

export const App = () => {
  const dispatch = useDispatch();
  
  const notes = useSelector(state => state.notes);
  const user = useSelector(state => state.user);
  const message = useSelector(state => state.notification);

  useEffect(() => {
    dispatch(setNotification({ msg: 'Loading', type: 'loading' }));
    notesRequest.getAll().then(res => {
      dispatch(initNotes(res));
      setTimeout(() => dispatch(setNotification({ msg: 'Notes loaded', type: 'success' })), 500);
    });
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      if (user?.token) {
        setUser(user);
        notesRequest.setToken(user.token);
        dispatch(setUser(user));
      } else dispatch(resetUser());
    }
  }, [dispatch]);

  const handleUpdateNote = async toUpdateNote => {
    try {
      await notesRequest.update({
        id: toUpdateNote.id,
        note: {
          content: toUpdateNote.newContent,
          important: toUpdateNote.newImportant,
        },
      });
      await notesRequest.getAll().then(res => dispatch(initNotes(res)));
      dispatch(setNotification({ msg: 'Note updated', type: 'success' }));
    } catch {
      dispatch(setNotification({ msg: 'Error updating note', type: 'error' }));
    }
  };

  const handleDeleteNote = async id => {
    try {
      await notesRequest.delete({ id });
      await notesRequest.getAll().then(res => dispatch(initNotes(res)));
      dispatch(setNotification({ msg: 'Note deleted', type: 'success' }));
    } catch {
      dispatch(setNotification({ msg: 'Error deleting note', type: 'error' }));
    }
  };

  return (
    <div className='App'>
      <Header />
      <Notification>
        {message?.type === 'loading'
          && <TailSpin color='white' height={25} width={30} />
        }
      </Notification>
      {!user
        ? <LoginForm />
        : <NoteForm />
      }
      <motion.div layout className='Notes'>
        {notes.map((note, i) =>
          <Note
            key={note.id}
            note={note}
            handleDeleteNote={handleDeleteNote}
            handleUpdateNote={handleUpdateNote}
            timeTransition={'0.' + i}
            user={user}
          />
        )}
      </motion.div>
    </div>
  );
};
