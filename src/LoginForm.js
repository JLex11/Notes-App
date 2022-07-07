import { useState } from 'react';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = e => {
    e.preventDefault();
    console.log(`Username: ${username} Password: ${password}`);
  };

  return (
    <div className="Login">
      <form className="LoginForm Form" onSubmit={handleLoginSubmit}>
        <h1>Iniciar Sesión</h1>
        <input 
          type="text" 
          placeholder="username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        <button>login</button>
      </form>
    </div>
  );
};
