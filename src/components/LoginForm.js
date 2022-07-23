import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../actions/notificationsActions';
import { resetUser, setUser } from '../actions/userActions';
import loginRequest from '../services/loginRequest';
import notesRequest from '../services/notesRequest';
import { Button } from './ButtonForm';

export const LoginForm = () => {
  const dispatch = useDispatch();

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleUsernameChange = e => setUsername(e.target.value);
  const handleSetPassword = e => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = loginRequest.login({ username, password });
    user.then(res => {
      localStorage.setItem('loggedNoteAppUser', JSON.stringify(res));
      notesRequest.setToken(res.token);
      dispatch(setUser(res));
    }).catch(() => {
      dispatch(setNotification({ msg: 'User or password invalid', type: 'error' }));
      dispatch(resetUser());
    });
    
  };

  const motionInitial = {
    opacity: 0,
    x: -100,
    scale: 0.6
  };
  const motionAnimate = {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring'
    }
  };

  return (
    <motion.div
      initial={motionInitial}
      animate={motionAnimate}
      className="Login">
      <form className="LoginForm Form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleSetPassword}
        />
        <Button content={'Accept'} disable={!username || !password ? true : false} >
          <span className="material-symbols-outlined">input</span>
        </Button>
      </form>
    </motion.div>
  );
};
