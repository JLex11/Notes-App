import { motion } from 'framer-motion';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks/useField';
import { setNotification } from '../redux/actions/notificationsActions';
import { resetUser, setUser } from '../redux/actions/userActions';
import loginRequest from '../services/loginRequest';
import notesRequest from '../services/notesRequest';
import styles from '../styles/LoginForm.module.css';
import Button from './ButtonForm';

const LoginForm = () => {
  const dispatch = useDispatch();

  const pattern = /^[a-zA-Z0-9]{3,30}$/;
  const username = useField('text', pattern);
  const password = useField('password', pattern);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = loginRequest.login({ username: username.value, password: password.value });
    
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
    y: 200,
    scale: 0.8
  };
  const motionAnimate = {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring'
    }
  };

  return (
    <motion.div
      initial={motionInitial}
      animate={motionAnimate}
      className={styles.Login}>
      <form className={styles.LoginForm} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type={username.type}
          value={username.value}
          onChange={username.onChange}
          placeholder="Username"
        />
        <input
          type={password.type}
          value={password.value}
          onChange={password.onChange}
          placeholder="Password"
        />
        <Button
          content={'Accept'}
          disable={username.error || password.error ? true : false}
        >
          <span className="material-symbols-outlined">input</span>
        </Button>
      </form>
    </motion.div>
  );
};

export default memo(LoginForm);