import { useState } from "react";

export const NoteForm = ({addNote}) => { 
  const [newNote, setNewNote] = useState('');

  const handleChange = e => { 
    setNewNote(e.target.value);
  }

  const handleSubmit = e => { 
    e.preventDefault();
    
    if (newNote.trim().length > 0) {
      const toAddNote = {
        content: newNote,
        important: Math.random() < 0.5
      };

      addNote(toAddNote);
      setNewNote('');
    }
  }

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <h2>Notes</h2>
      <input
        type="text"
        onChange={handleChange}
        value={newNote}
        placeholder="Enter a new note"
      />
      <button>agregar nota</button>
    </form>
  )
};