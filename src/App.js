import { motion } from 'framer-motion';
import 'material-symbols';
import { useEffect } from 'react';
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

  useEffect(() => {
    dispatch(setNotification({ msg: 'Loading', type: 'loading' }));
    notesRequest.getAll()
      .then(res => {
        dispatch(initNotes(res));
        setTimeout(() => dispatch(setNotification({ msg: 'Notes loaded', type: 'success' })), 500);
      })
      .catch(() => {
        dispatch(setNotification({ msg: 'Error loading notes', type: 'error' }));
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

  return (
    <div className='App'>
      <Header />
      <Notification/>
      {!user
        ? <LoginForm />
        : <NoteForm />
      }
      <motion.div layout className='Notes'>
        {notes.map((note, i) =>
          <Note
            key={note.id}
            note={note}
            timeTransition={'0.' + i}
          />
        )}
      </motion.div>
    </div>
  );
};
