import 'material-symbols';
import { memo, useEffect } from 'react';
import FilterSelect from './components/FilterSelect';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import Notes from './components/Notes';
import Notification from './components/Notification';
import { useNotes } from './hooks/useNotes';

const App = () => {
  const notesF = useNotes();
  
  useEffect(() => {
    notesF.init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='App'>
      <Header />
      <Notification/>
      <NoteForm />
      <FilterSelect />
      <Notes />
    </div>
  );
};

export default memo(App);