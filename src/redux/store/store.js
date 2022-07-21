import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { dropdownReducer } from '../reducers/dropdownReducer';
import { notesReducer } from '../reducers/notesReducer';
import { notificationsReducer } from '../reducers/notificationsReducer';
import { userReducer } from '../reducers/userReducer';

export const store = configureStore({
  reducer: combineReducers({
    notes: notesReducer,
    notification: notificationsReducer,
    user: userReducer,
    dropdown: dropdownReducer,
  })
});
