import { useDispatch } from 'react-redux';
import { orderFilter, selectedFilter } from '../redux/actions/filterActions';
import { addNote, deleteNote, initNotes, updateNote } from '../redux/actions/notesActions';
import { setNotification } from '../redux/actions/notificationsActions';
import { setUser } from '../redux/actions/userActions';
import notesRequest from '../services/notesRequest';

export const useNotes = () => {
  const dispatch = useDispatch();

  const init = () => {
    dispatch(initNotes());
    const loggedNoteAppUser = JSON.parse(localStorage.getItem('loggedNoteAppUser'));
    if (loggedNoteAppUser) {
      dispatch(setNotification({ msg: 'Welcome back', type: 'info' }));
      dispatch(setUser(loggedNoteAppUser));
      notesRequest.setToken(loggedNoteAppUser.token);
    }
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

  const setSelectedFilter = filter => {
    filter && dispatch(selectedFilter(filter));
  };

  const setOrder = order => {
    order && dispatch(orderFilter(order));
  };

  return {
    init,
    add,
    update,
    remove,
    setSelectedFilter,
    setOrder
  };
};