import { AnimatePresence, motion } from 'framer-motion';
import 'material-symbols';
import moment from 'moment';
import 'moment/locale/es';
import { memo, useCallback, useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import { useUser } from '../hooks/useUser';
import BodyNote from './BodyNote';
import HeaderNote from './HeaderNote';
moment.locale('es');


const Note = ({ note, timeTransition }) => {
  const user = useUser();
  const notes = useNotes();

  const { id, content, date, important } = note;
  const { name } = note.user;

  const [ isEditing, setIsEditing ] = useState(false);
  const [ newContent, setNewContent ] = useState(content);
  const [ newImportant, setNewImportant ] = useState(important);
  const [deleting, setDeleting] = useState(false);
  const [ dropdown, setDropdown ] = useState(false);
  
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const dateFormatted = moment(date).startOf('minute').fromNow();

  const handleUpdateNote = () => {
    if (newContent.trim().length > 0) {
      notes.update(id, newContent, newImportant);
      resetNewNote();
    }
  };

  const handleEditNote = () => {
    setDropdown(false);
    if (!isEditing) {
      setIsEditing(true);
      setNewContent(content);
      setNewImportant(important);
    } else
      resetNewNote();
  };

  const resetNewNote = useCallback(() => {
    setIsEditing(false);
    setNewContent('');
    setNewImportant(false);
  }, [setIsEditing, setNewContent, setNewImportant]);

  const handleContentChange = useCallback(e =>
    setNewContent(e.target.value), [setNewContent]);

  const handleImportantChange = useCallback(e =>
    setNewImportant(e.target.checked), [setNewImportant]);

  const handleDelete = () => {
    setDeleting(!deleting);
    !deleting && notes.remove(id);
  };

  let gridSpan = 'span 0';
  if (content.length > 120) gridSpan = 'span 2';

  const customStyles = {
    animationDelay: timeTransition,
    gridColumn: gridSpan,
  };

  const noteClassNames = `Note i-${important} ${isEditing && 'NoteEditing'}`;

  const motionInitial = {
    y: 300,
    scale: 0.6,
    opacity: 0
  };
  const motionAnimate = {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 100,
      delay: timeTransition
    }
  };
  const motionExit = {
    backgroundColor: '#e12c1f',
    y: 100,
    scale: 0,
    opacity: 0,
  };

  return (
    <AnimatePresence>
      {!deleting && (
        <motion.div
          initial={motionInitial}
          animate={motionAnimate}
          exit={motionExit}
          className={noteClassNames}
          style={customStyles}
        >
          <HeaderNote
            dateFormatted={dateFormatted}
            user={user}
            handleEditNote={handleEditNote}
            isEditing={isEditing}
            handleDelete={handleDelete}
            handleDropdown={handleDropdown}
            dropdown={dropdown}
          />
          <div>
            <h5>{name}</h5>
          </div>
          <BodyNote
            isEditing={isEditing}
            newContent={newContent}
            handleContentChange={handleContentChange}
            id={id}
            newImportant={newImportant}
            handleImportantChange={handleImportantChange}
            handleUpdate={handleUpdateNote}
            content={content}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(Note);