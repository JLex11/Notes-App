import { motion } from 'framer-motion';
import 'material-symbols';
import { useSelector } from 'react-redux';
import { useUser } from '../hooks/useUser';
import { Header } from './Header';
import { LoginForm } from './LoginForm';
import { Note } from './Note';
import { NoteForm } from './NoteForm';
import { Notification } from './Notification';

export const App = () => {
  const notes = useSelector(state => state.notes);
  const {user} = useUser();

  const sortCondition = (a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  };

  return (
    <div className='App'>
      <Header />
      <Notification/>
      {!user
        ? <LoginForm />
        : <NoteForm />
      }
      <motion.div layout className='Notes'>
        {notes
          .sort((a, b) => sortCondition(a, b))
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
