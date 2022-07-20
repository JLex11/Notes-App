export const dropdownReducer = (state = false, action) => {
  switch (action.type) {
    case '@dropdown/SET_DROPDOWN':
      return action.payload;

    case '@dropdown/RESET_DROPDOWN':
      return false;
      
    default:
      return state;
  }
};