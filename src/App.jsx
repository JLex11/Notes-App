import Header from './components/Header'
import NoteForm from './components/NoteForm'
import Notes from './components/Notes'
import NotesToolbar from './components/NotesToolbar'
import NotificationsContainer from './components/NotificationsContainer'

export default function App() {
  return (
    <section className='App'>
      <aside className='Sidebar'>Aside</aside>
      <main className='Main'>
        <Header />
        <NotificationsContainer />
        <NoteForm />
        <NotesToolbar />
        <Notes />
      </main>
    </section>
  )
}
