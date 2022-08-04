import notesRequest from '../../services/notesRequest';

export const initNotes = () => {
  return async (dispatch) => {
    let res = [];
    if (navigator.onLine) {
      res = await notesRequest.getAll();
      localStorage.setItem('notes', JSON.stringify(res));
    } else
      res = JSON.parse(localStorage.getItem('notes'));

    dispatch({
      type: '@notes/INIT_NOTES',
      payload: res
    });

    const filters = Object.keys(res[0]);
    let date = filters.filter((filter) => filter === 'date');
    
    dispatch({
      type: '@filter/INIT_FILTERS',
      payload: {
        filters: filters,
        selected: date || filters[0]
      }
    });
  };
};

export const addNote = (note) => {
  return async (dispatch) => {
    const res = await notesRequest.create({ note });
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