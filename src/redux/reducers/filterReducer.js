export const filterReducer = (state = [], action) => {
  switch (action.type) {
    case '@filter/INIT_FILTERS':
      state = action.payload;
      return state;
    
    case '@filter/SET_FILTER':
      return {
        ...state,
        selected: action.payload.selected
      };

    case '@filter/SET_ORDER':
      return {
        ...state,
        order: action.payload.order
      };
    
    case '@filter/SET_SEARCH':
      return {
        ...state,
        search: action.payload.search
      };
    
    default:
      return state;
  }
};