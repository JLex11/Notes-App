import { motion } from 'framer-motion';
import 'material-symbols';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNotes } from '../hooks/useNotes';
import { useUser } from '../hooks/useUser';
import Header from './Header';
import LoginForm from './LoginForm';
import Note from './Note';
import NoteForm from './NoteForm';
import Notification from './Notification';

const App = () => {
  const notes = useSelector(state => state.notes);
  const { user } = useUser();

  const notesF = useNotes();
  useEffect(() => {
    notesF.init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sortCondition = useCallback((a, b, noteKey, increment) => {
    noteKey = noteKey || 'date';
    increment = increment || 'desc';
    if (a[noteKey] > b[noteKey]) return increment === 'desc' ? -1 : 1;
    if (a[noteKey] < b[noteKey]) return increment === 'desc' ? 1 : -1;
    return 0;
  }, []);

  return (
    <div className='App'>
      <Header />
      <Notification/>
      {!user
        ? <LoginForm />
        : <NoteForm />
      }
      <motion.div layout className='Notes'>
        {notes.sort((a, b) => sortCondition(a, b, 'date', 'desc'))
          .map((note, i) =>
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

export default memo(App);