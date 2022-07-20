import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from './ButtonForm';

export const LoginForm = ({handleLoginSubmit}) => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handleSetPassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit(username, password);
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
