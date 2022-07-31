import { memo, useEffect } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import Notes from './components/Notes';
import NotesToolbar from './components/NotesToolbar';
import NotificationsContainer from './components/NotificationsContainer';
import { useNotes } from './hooks/useNotes';

const App = () => { // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <section className='App'>
      <aside className='Sidebar'></aside>
      <main className='Main'>
        <Header />
        <NotificationsContainer />
        <NoteForm />
        <NotesToolbar />
        <Notes />
      </main>
    </section>
  );
};

export default memo(App);