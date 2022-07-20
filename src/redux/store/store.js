import { combineReducers, createStore } from 'redux';
import { dropdownReducer } from '../reducers/dropdownReducer';
import { notesReducer } from '../reducers/notesReducer';
import { notificationsReducer } from '../reducers/notificationsReducer';
import { userReducer } from '../reducers/userReducer';

export const store = createStore(
  combineReducers({
    notes: notesReducer,
    notification: notificationsReducer,
    user: userReducer,
    dropdown: dropdownReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
