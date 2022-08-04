import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import 'moment/locale/es';
import { memo, useCallback, useRef, useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import { useUser } from '../hooks/useUser';
import styles from '../styles/Note.module.css';
import BodyNote from './BodyNote';
import HeaderNote from './HeaderNote';
import NoteEditing from './NoteEditing';
moment.locale('es');


const Note = ({ note, timeTransition }) => {
  const user = useUser();
  const notes = useNotes();

  const { id, content, date, important } = note;
  const { name } = note.user;

  const [ isEditing, setIsEditing ] = useState(false);
  
  
  const [deleting, setDeleting] = useState(false);
  const [ dropdown, setDropdown ] = useState(false);

  const noteRef = useRef();
  
  const handleDropdown = () => setDropdown(!dropdown);

  const dateFormatted = moment(date).startOf('minute').fromNow();

  const handleEditNote = useCallback(() => {
    setDropdown(false);
    if (!isEditing) setIsEditing(true);
    else setIsEditing(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  const handleDelete = () => {
    setDeleting(!deleting);
    setTimeout(() => {
      !deleting && notes.remove(id);
    }, 550);
  };

  let gridSpan = 'span 0';
  if (content.length > 120) gridSpan = 'span 2';

  const customStyles = {
    animationDelay: timeTransition,
    gridColumn: gridSpan,
  };

  const noteClassNames = `${styles.Note} ${styles[`i-${important}`]} ${isEditing && styles.NoteEditing}`;
  
  const motionInitial = {
    y: 300,
    scale: 0.6,
    opacity: 0,
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
    transition: {
      duration: 0.5
    }
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
            handleEditNote={handleEditNote}
            isEditing={isEditing}
            handleDelete={handleDelete}
            handleDropdown={handleDropdown}
            dropdown={dropdown}
          />
          <div>
            <h5>{name}</h5>
          </div>
          {isEditing ? (
            <NoteEditing
              id={id}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              setDropdown={setDropdown}
            />
          )
            : <BodyNote content = { content } />
          }
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(Note);