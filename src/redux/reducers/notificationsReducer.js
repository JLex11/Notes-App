const initialState = [{msg: 'Loading', type: 'loading'}];

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case '@notifications/SET_MESSAGE':
      return [ ...state, action.payload ];
    
    case '@notifications/RESET_MESSAGE':
      return state.filter(notification => notification.msg !== action.payload.msg);

    default:
      return state;
  }
};