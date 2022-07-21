import notesRequest from '../../services/notesRequest';

export const initNotes = () => {
  return async (dispatch) => {
    const res = await notesRequest.getAll();
    dispatch({
      type: '@notes/INIT_NOTES',
      payload: res
    });
  };
};

export const addNote = (note) => {
  console.log(note);
  return async (dispatch) => {
    const res = await notesRequest.create({ note: note });
    dispatch({
      type: '@notes/ADD_NOTE',
      payload: res
    });
  };
};

export const deleteNote = (id) => {
  return async (dispatch) => {
    await notesRequest.delete({id});
    dispatch({
      type: '@notes/DELETE_NOTE',
      payload: id
    });
  };
};

export const updateNote = (note) => {
  return async (dispatch) => {
    const res = await notesRequest.update(note);
    dispatch({
      type: '@notes/UPDATE_NOTE',
      payload: res
    });
  };
};