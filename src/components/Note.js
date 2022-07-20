import { AnimatePresence, motion } from 'framer-motion';
import 'material-symbols';
import moment from 'moment';
import 'moment/locale/es';
import { useRef, useState } from 'react';
import { BodyNote } from './BodyNote';
import { HeaderNote } from './HeaderNote';
moment.locale('es');

export const Note = ({ ...props }) => {
  const { note, user, timeTransition, handleDeleteNote, handleUpdateNote} = props;
  const { id, content, date, important } = note;
  const { name } = note.user;

  const [ isAnimation, setIsAnimation ] = useState('isAnimation');
  const [ isEditing, setIsEditing ] = useState(false);
  const [ newContent, setNewContent ] = useState(content);
  const [ newImportant, setNewImportant ] = useState(important);
  const [dropdown, setDropdown] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const dateFormatted = moment(date).startOf('minute').fromNow();

  const noteRef = useRef();

  const handleDropdown = () => setDropdown(!dropdown);

  const handleEditNote = () => {
    setDropdown(false);
    if (!isEditing) {
      setIsEditing(true);
      setNewContent(content);
      setNewImportant(important);
    } else resetNewNote();
  };

  const resetNewNote = () => {
    setIsEditing(false);
    setNewContent('');
    setNewImportant(false);
  };

  const handleContentChange = e =>
    setNewContent(e.target.value);

  const handleImportantChange = e =>
    setNewImportant(e.target.checked);

  const handleUpdate = () => {
    const noteToUpdate = { id, newContent, newImportant };
    handleUpdateNote(noteToUpdate);
    resetNewNote();
  };

  const handleDelete = () => {
    setDeleting(!deleting);
    setDropdown(false);
    !deleting && handleDeleteNote(id);
  };

  setTimeout(() => setIsAnimation(''), 3000);

  const customStyles = {
    animationDelay: timeTransition,
    gridColumn: content.length > 120 ? 'span 2' : 'span 0',
  };

  const noteClassNames = `Note i-${important} ${isEditing && 'NoteEditing'} ${isAnimation}`;

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
          ref={noteRef}
        >
          <HeaderNote
            dateFormatted={dateFormatted}
            user={user}
            dropdown={dropdown}
            handleDropdown={handleDropdown}
            handleEditNote={handleEditNote}
            isEditing={isEditing}
            handleDelete={handleDelete}
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
            handleUpdate={handleUpdate}
            content={content}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};