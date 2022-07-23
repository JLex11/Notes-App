import { motion } from 'framer-motion';
import { memo, useCallback, useState } from 'react';
import { useField } from '../hooks/useField';
import { useNotes } from '../hooks/useNotes';
import Button from './ButtonForm';
import ImportantCheckbox from './ImportantCheckbox';


const NoteForm = () => {
  const notes = useNotes();

  const noteField = useField('text');
  const [ newImportant, setNewImportant ] = useState(false);
  
  const handleSubmit = useCallback(e => {
    e.preventDefault();
    
    if (noteField.value.trim().length > 0) {
      notes.add(noteField.value, newImportant);
      noteField.reset();
      setNewImportant(false);
    }
  }, [noteField, notes, newImportant]);

  const handleImportantChange = useCallback(e =>
    setNewImportant(e.target.checked), [setNewImportant]);

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
        type={noteField.type}
        placeholder="Enter your note"
        value={noteField.value}
        onChange={noteField.onChange}
        className={noteField.error ? 'FormInputAutoExpand error' : 'FormInputAutoExpand'}
        size={noteField.value.length}
      />
      <ImportantCheckbox
        newImportant={newImportant}
        handleImportantChange={handleImportantChange}
      />
      <Button content={'Add a new note'} disable={noteField.value.length < 1} >
        <span className="material-symbols-outlined">note_add</span>
      </Button>
    </motion.form>
  );
};

export default memo(NoteForm);