import 'material-symbols';
import moment from "moment";
import 'moment/locale/es';
import { NoteActionButton } from './NoteActionButton';

import { useState } from 'react';
moment.locale("es");


export const Note = (note) => {
  const {id, content, date, important, handleDeleteNote, handleUpdateNote, timeTransition, user} = note;
  const dateFormatted = moment(date).startOf("minute").fromNow();

  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const [newImportant, setNewImportant] = useState(important);

  const handleEditNote = () => {
    setIsEditing(true);
    setNewContent(content);
    setNewImportant(important);
  }

  const handleContentChange = (e) => { 
    setNewContent(e.target.value);
  }

  const handleImportantChange = (e) => {
    setNewImportant(e.target.checked);
  }

  const handleUpdate = () => {
    const noteToUpdate = {
      id,
      newContent,
      newImportant
    }
    handleUpdateNote(noteToUpdate);
    setIsEditing(false);
    setNewContent(null);
    setNewImportant(null);
  }

  const handleDelete = () => {
    handleDeleteNote(id);
  }

  const customStyles = {
    animationDelay: timeTransition,
    gridColumn: content.length > 150 ? "span 2" : "span 0",
  };

  return (
    <div className={`Note i-${important}`} style={customStyles} >
      <div className="HeaderNote">
        <div className="Date">
          <span className='material-symbols-outlined'>history</span>
          <b>{dateFormatted}</b>
        </div>
        {user ? (
          <div className='ActionButtons'>
            <NoteActionButton handleClick={handleDelete}>
              <span className='material-symbols-outlined'>delete</span>
            </NoteActionButton>
            <NoteActionButton handleClick={handleEditNote}>
              <span className='material-symbols-outlined'>edit</span>
            </NoteActionButton>
          </div>
        ) : null}
      </div>
      <div className='NoteBody'>
        {isEditing ? (
          <>
            <div>
              <b>Important</b>
              <input type="checkbox" id={`checkbox-${id}`} checked={newImportant} onChange={handleImportantChange} />
              <label htmlFor={`checkbox-${id}`}>
                <span
                  className='material-symbols-outlined'>
                  {newImportant
                    ? 'select_check_box'
                    : 'check_box_outline_blank'
                  }
                </span>
              </label>
            </div>
            <textarea 
              className='EditingTextarea' 
              value={newContent} 
              onChange={handleContentChange}
            />
            <span
              className='material-symbols-outlined SaveButton'
              onClick={handleUpdate}>
              save
            </span>
          </>
        ): (<p>{content}</p>)}
      </div>
    </div>
  );
};