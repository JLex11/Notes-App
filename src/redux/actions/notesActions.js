export const initNotes = (notes) => {
  return { type: '@notes/INIT_NOTES', payload: notes };
};

export const addNote = (note) => {
  return {type: '@notes/ADD_NOTE', payload: note};
};

export const deleteNote = (id) => {
  return { type: '@notes/DELETE_NOTE', payload: id };
};

export const updateNote = (note) => {
  return { type: '@notes/UPDATE_NOTE', payload: note };
};