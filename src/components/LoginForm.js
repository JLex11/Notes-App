import { useState } from "react";
import { Button } from "./FormButton";

export const LoginForm = ({handleLoginSubmit}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    </div>
  );
};
