import './index.css';
import { useEffect, useState } from 'react';
import { Note } from './Note';

export const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(notes => setNotes(notes));
  }, []);

  const handleChange = e => {
    setNewNote(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newNoteToAddState = {
      id: notes.length + 1,
      title: newNote,
      body: newNote,
    };
    setNotes(notes.concat(newNoteToAddState));
    setNewNote('');
  };

  return (
    <div className="App">
      <h1>Notes</h1>
      <form className="Form" onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} />
        <button>agregar nota</button>
      </form>
      {
        notes.map(note => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            body={note.body}
          />
        ))
      }
    </div>
  );
};
