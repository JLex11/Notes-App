import { useDispatch } from 'react-redux';
import { resetUser, setUser } from '../redux/actions/userActions';
import loginRequest from '../services/loginRequest';

export const useUser = () => {
  const dispatch = useDispatch();
  
  const login = async ({username, password}) => {
    const user = await loginRequest.login({ username: username.value, password: password.value });
    localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
    dispatch(setUser(user));
    console.log(user);
  };

  const logout = () => {
    localStorage.removeItem('loggedNoteAppUser');
    dispatch(resetUser());
  };

  return {
    login,
    logout
  };
};