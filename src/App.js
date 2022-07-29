import 'material-symbols';
import { memo, useEffect } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import Notes from './components/Notes';
import NotesToolbar from './components/NotesToolbar';
import NotificationsContainer from './components/NotificationsContainer';
import { useNotes } from './hooks/useNotes';

const App = () => {
  const notesF = useNotes();
  
  useEffect(() => {
    notesF.init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='App'>
      <Header />
      <NotificationsContainer />
      <NoteForm />
      <NotesToolbar />
      <Notes />
    </div>
  );
};

export default memo(App);