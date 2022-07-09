import { useState } from "react";
import { Button } from "./FormButton";

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
      window.scrollTo({
        top: document.body.offsetHeight,
        behavior: 'smooth'
      });
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
      <Button content={'Add a new note'} disable={newNote.length < 1} >
        <span className="material-symbols-outlined">note_add</span>
      </Button>
    </form>
  )
};