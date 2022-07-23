export const userReducer = (state = null, action) => {
  switch (action.type) {
    case '@user/SET_USER':
      return action.payload;

    case '@user/RESET_USER':
      return null;

    default:
      return state;
  }
};