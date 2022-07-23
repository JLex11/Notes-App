import { useDispatch } from 'react-redux';
import { addNote, deleteNote, initNotes, updateNote } from '../redux/actions/notesActions';
import { setNotification } from '../redux/actions/notificationsActions';

export const useNotes = () => {
  const dispatch = useDispatch();

  const init = () => {
    dispatch(initNotes());
  };

  const add = (newNote, newImportant) => {
    const toAddNote = {
      content: newNote,
      important: newImportant,
    };
    dispatch(addNote(toAddNote));
    dispatch(setNotification({ msg: 'Note added', type: 'success' }));
  };

  const update = (id, newContent, newImportant) => {
    const toUpdateNote = {
      id,
      note: {
        content: newContent,
        important: newImportant,
      },
    };
    dispatch(updateNote(toUpdateNote));
    dispatch(setNotification({ msg: 'Note updated', type: 'success' }));
  };

  const remove = id => {
    dispatch(deleteNote(id));
    dispatch(setNotification({ msg: 'Note deleted', type: 'success' }));
  };

  return {
    init,
    add,
    update,
    remove
  };
};