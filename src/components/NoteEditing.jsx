import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNotes } from '../hooks/useNotes';
import styles from '../styles/Note.module.css';
import ImportantCheckbox from './ImportantCheckbox';
import TextArea from './TextArea';

const NoteEditing = ({id, setIsEditing}) => {
  const note = useSelector(state => state.notes.find(note => note.id === id));

  const notes = useNotes();
  
  const [newContent, setNewContent] = useState(note.content);
  const [ newImportant, setNewImportant ] = useState(note.important);

  const handleContentChange = useCallback(e =>
    setNewContent(e.target.value), []);

  const handleImportantChange = useCallback(e =>
    setNewImportant(e.target.checked), []);
  
  const resetNewNote = useCallback(() => {
    setIsEditing(false);
    setNewContent('');
    setNewImportant(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  const handleUpdateNote = () => {
    if (newContent.trim().length > 0) {
      notes.update(id, newContent, newImportant);
      resetNewNote();
    }
  };

  return (
    <>
      <TextArea
        newContent={newContent}
        handleContentChange={handleContentChange}
      />
      <div className={styles.ImportantAndSave}>
        <ImportantCheckbox
          id={id}
          newImportant={newImportant}
          handleImportantChange={handleImportantChange}
        />
        <span
          className={`material-symbols-outlined ${styles.SaveButton}`}
          onClick={handleUpdateNote}
        >
        save
        </span>
      </div>
    </>
  );
};

export default memo(NoteEditing);