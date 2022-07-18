import 'material-symbols';
import moment from 'moment';
import 'moment/locale/es';
import { ActionButton } from './ActionButton';

import { useRef, useState } from 'react';
import { Dropdown } from './Dropdown';
import { ImportantCheckbox } from './ImportantCheckbox';
import { TextArea } from './TextArea';
moment.locale('es');

export const Note = ({ ...props }) => {
  const { note, user, timeTransition, handleDeleteNote, handleUpdateNote } = props;
  const { id, content, date, important } = note;
  const { name } = note.user;

  const [ isAnimation, setIsAnimation ] = useState('isAnimation');
  const [ isEditing, setIsEditing ] = useState(false);
  const [ newContent, setNewContent ] = useState(content);
  const [ newImportant, setNewImportant ] = useState(important);
  const [ dropdown, setDropdown ] = useState(false);

  const dateFormatted = moment(date).startOf('minute').fromNow();

  const noteRef = useRef();

  const handleDropdown = () => {
    if (dropdown) setDropdown(false);
    else setDropdown(true);
  };

  const handleEditNote = () => {
    setDropdown(false);
    if (!isEditing) {
      setIsEditing(true);
      setNewContent(content);
      setNewImportant(important);

      noteRef.current.animate([
        { transform: 'translateY(50px) scale(0.5)', opacity: 0 },
        { transform: 'translateY(0) scale(1)', opacity: 1 },
      ], { duration: 300 });
    } else {
      noteRef.current.animate([
        { transform: 'translateY(0) scale(1)', opacity: 1 },
        { transform: 'translateY(50px) scale(0)', opacity: 0 }
      ], { duration: 300, }
      ).onfinish = () => {
        setIsEditing(false);
        setNewContent('');
        setNewImportant(false);
      };
    }
  };

  const handleContentChange = e => setNewContent(e.target.value);

  const handleImportantChange = e => setNewImportant(e.target.checked);

  const handleUpdate = () => {
    const noteToUpdate = { id, newContent, newImportant };
    handleUpdateNote(noteToUpdate);
    setIsEditing(false);
    setNewContent('');
    setNewImportant('');
  };

  const handleDelete = () => {
    handleDeleteNote(id);
    setDropdown(false);
  };

  setTimeout(() => {
    setIsAnimation('');
  }, 3000);

  const customStyles = {
    animationDelay: timeTransition,
    gridColumn: content.length > 150 ? 'span 2' : 'span 0',
  };

  return (
    <div className={`Note i-${important} ${isEditing && 'NoteEditing'} ${isAnimation}`} style={customStyles} ref={noteRef}>
      <div className="HeaderNote">
        <div className="Date">
          <span className="material-symbols-outlined">history</span>
          <b>{dateFormatted}</b>
        </div>
        <Dropdown user={user} dropdown={dropdown} handleDropdown={handleDropdown}>
          <ActionButton handleClick={handleEditNote} label={'Edit'}>
            <span className="material-symbols-outlined">{!isEditing ? 'edit' : 'undo'}</span>
          </ActionButton>
          {!isEditing && (
            <ActionButton handleClick={handleDelete} label={'Delete'}>
              <span className="material-symbols-outlined">delete</span>
            </ActionButton>
          )}
        </Dropdown>
      </div>
      <div className="NoteBody">
        {isEditing ? (
          <>
            <TextArea newContent={newContent} handleContentChange={handleContentChange} />
            <div>
              <ImportantCheckbox
                id={id}
                newImportant={newImportant}
                handleImportantChange={handleImportantChange}
              />
              <span className="material-symbols-outlined SaveButton" onClick={handleUpdate}>
                save
              </span>
            </div>
          </>
        ) : (
          <>
            <h3>{name}</h3>
            <p>{content}</p>
          </>
        )}
      </div>
    </div>
  );
};
