import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from './ButtonForm';
import { ImportantCheckbox } from './ImportantCheckbox';

export const NoteForm = ({addNote}) => {
  const [ newNote, setNewNote ] = useState('');
  const [ newImportant, setNewImportant ] = useState(false);
  
  const handleChange = e => {
    setNewNote(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    if (newNote.trim().length > 0) {
      const toAddNote = {
        content: newNote,
        important: newImportant,
      };

      addNote(toAddNote);
      setNewNote('');
      setNewImportant(false);
      
      window.scrollTo({
        top: document.body.offsetHeight,
        behavior: 'smooth'
      });
    }
  };
  
  const handleImportantChange = e => {
    setNewImportant(e.target.checked);
  };

  const motionInitial = {
    opacity: 0,
    x: -100,
    scale: 0.6
  };
  const motionAnimate = {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring'
    }
  };

  return (
    <motion.form
      initial={motionInitial}
      animate={motionAnimate}
      className="Form"
      onSubmit={handleSubmit}>
      <h2>Notes</h2>
      <input
        type="text"
        className='FormInputAutoExpand'
        onChange={handleChange}
        value={newNote}
        placeholder="Enter a new note"
        size={newNote.length}
      />
      <ImportantCheckbox
        newImportant={newImportant}
        handleImportantChange={handleImportantChange}
      />
      <Button content={'Add a new note'} disable={newNote.length < 1} >
        <span className="material-symbols-outlined">note_add</span>
      </Button>
    </motion.form>
  );
};