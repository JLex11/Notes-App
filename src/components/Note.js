import 'material-symbols';
import moment from 'moment';
import 'moment/locale/es';
import { NoteActionButton } from './NoteActionButton';

import { useState } from 'react';
import { Dropdown } from './Dropdown';
import { ImportantCheckbox } from './ImportantCheckbox';
import { TextArea } from './TextArea';
moment.locale('es');

export const Note = ({ ...props }) => {
  const { note, user, timeTransition, handleDeleteNote, handleUpdateNote } = props;
  const { id, content, date, important } = note;
  const { name } = note.user;

  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const [newImportant, setNewImportant] = useState(important);

  const dateFormatted = moment(date).startOf('minute').fromNow();

  const handleEditNote = () => {
    if (!isEditing) {
      setIsEditing(true);
      setNewContent(content);
      setNewImportant(important);
    } else {
      setIsEditing(false);
      setNewContent('');
      setNewImportant('');
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

  const handleDelete = () => handleDeleteNote(id);

  const customStyles = {
    animationDelay: timeTransition,
    gridColumn: content.length > 150 ? 'span 2' : 'span 0',
  };

  return (
    <div className={`Note i-${important} ${isEditing && 'NoteEditing'}`} style={customStyles}>
      <div className="HeaderNote">
        <div className="Date">
          <span className='material-symbols-outlined'>history</span>
          <b>{dateFormatted}</b>
        </div>
        <Dropdown user={user}>
          <NoteActionButton handleClick={handleEditNote} label={'Edit'}>
            <span className='material-symbols-outlined'>{!isEditing ? 'edit' : 'undo'}</span>
          </NoteActionButton>
          {!isEditing && (
            <NoteActionButton handleClick={handleDelete} label={'Delete'}>
              <span className='material-symbols-outlined'>delete</span>
            </NoteActionButton>
          )}
        </Dropdown>
      </div>
      <div className="NoteBody">
        {isEditing ? (
          <>
            <TextArea newContent={newContent} handleContentChange={handleContentChange} />
            <div>
              <ImportantCheckbox id={id} newImportant={newImportant} handleImportantChange={handleImportantChange} />
              <span className='material-symbols-outlined SaveButton' onClick={handleUpdate}>
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
