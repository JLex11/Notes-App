export const notesReducer = (state = [], action) => {
  switch (action.type) {
    case '@notes/INIT_NOTES':
      state = action.payload;
      return state;
    
    case '@notes/ADD_NOTE':
      return [...state, action.payload];
    
    case '@notes/DELETE_NOTE':
      return state.filter((note) => note.id !== action.payload);
    
    case '@notes/UPDATE_NOTE':
      return state.map((note) => {
        if (note.id === action.payload.id) {
          return { ...note, ...action.payload };
        }
        return note;
      });
    
    default:
      return state;
  }
};