const initialState = {
  message: {
    msg: 'Loading', type: 'loading'
  }
};

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case '@notifications/SET_MESSAGE':
      return { message: action.payload };
    
    case '@notifications/RESET_MESSAGE':
      return { message: null };

    default:
      return state;
  }
};