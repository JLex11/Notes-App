import { useState } from "react";

export const LoginForm = ({handleLoginSubmit}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const disabledBtn = !username || !password ? true : false;

  const handleUsernameChange = e => { 
    setUsername(e.target.value);
  }

  const handleSetPassword = e => { 
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => { 
    e.preventDefault();
    handleLoginSubmit(username, password);
  }

  return (
    <div className="Login">
      <form className="LoginForm Form" onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>
        <input 
          type="text" 
          placeholder="username" 
          value={username} 
          onChange={handleUsernameChange} 
        />
        <input 
          type="password" 
          placeholder="password" 
          value={password} 
          onChange={handleSetPassword} 
        />
        <button className={disabledBtn ? 'disabledBtn' : null}>login</button>
      </form>
    </div>
  );
};
