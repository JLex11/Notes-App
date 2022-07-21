import { AnimatePresence, motion } from 'framer-motion';
import 'material-symbols';
import moment from 'moment';
import 'moment/locale/es';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDropdown } from '../redux/actions/dropdownActions';
import { deleteNote, updateNote } from '../redux/actions/notesActions';
import { setNotification } from '../redux/actions/notificationsActions';
import notesRequest from '../services/notesRequest';
import { BodyNote } from './BodyNote';
import { HeaderNote } from './HeaderNote';
moment.locale('es');

export const Note = ({ note, timeTransition }) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const dropdown = useSelector(state => state.dropdown);

  const { id, content, date, important } = note;
  const { name } = note.user;

  const [ isEditing, setIsEditing ] = useState(false);
  const [ newContent, setNewContent ] = useState(content);
  const [ newImportant, setNewImportant ] = useState(important);
  const [deleting, setDeleting] = useState(false);

  const dateFormatted = moment(date).startOf('minute').fromNow();

  const handleDropdown = () => dispatch(setDropdown(!dropdown));

  const handleUpdateNote = () => {
    if (newContent.trim().length > 0) {
      const toUpdateNote = {
        id,
        note: {
          content: newContent,
          important: newImportant,
        },
      };
    
      const updatedNote = notesRequest.update(toUpdateNote);
      updatedNote
        .then(note => {
          dispatch(updateNote(toUpdateNote));
          dispatch(setNotification({ msg: 'Note updated', type: 'success' }));
          resetNewNote();
          console.log({ note });
        })
        .catch(() => {
          dispatch(setNotification({ msg: 'Error updating note', type: 'error' }));
        });
      /* await notesRequest.getAll().then(res => dispatch(initNotes(res))); */
      /* catch {
        dispatch(setNotification({ msg: 'Error updating note', type: 'error' }));
      } */
    }
  };

  const handleDeleteNote = () => {
    const deletedNote = notesRequest.delete({ id });
    deletedNote
      .then((note) => {
        console.log({ note });
        dispatch(deleteNote(id));
        dispatch(setNotification({ msg: 'Note deleted', type: 'success' }));
      }).catch(() => {
        dispatch(setNotification({ msg: 'Error deleting note', type: 'error' }));
      });
    /* await notesRequest.getAll().then(res => dispatch(initNotes(res))); */
    /* dispatch(deleteNotes(id));
    dispatch(setNotification({ msg: 'Note deleted', type: 'success' })); */
  };

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

  const handleDelete = () => {
    setDeleting(!deleting);
    setDropdown(false);
    !deleting && handleDeleteNote(id);
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
            handleUpdate={handleUpdateNote}
            content={content}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};