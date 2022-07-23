import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { notesReducer } from '../reducers/notesReducer';
import { notificationsReducer } from '../reducers/notificationsReducer';
import { userReducer } from '../reducers/userReducer';

const rootReducer = combineReducers({
  notes: notesReducer,
  notification: notificationsReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});
