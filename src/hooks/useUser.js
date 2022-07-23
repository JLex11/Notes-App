import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser, setUser } from '../redux/actions/userActions';
import notesRequest from '../services/notesRequest';

export const useUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      if (user?.token) {
        setUser(user);
        notesRequest.setToken(user.token);
        dispatch(setUser(user));
      } else dispatch(resetUser());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    user: useSelector(state => state.user),
  };
};