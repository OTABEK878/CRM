import React, { useState } from 'react';
import './LogIn.css';

const LogIn = ({ setIsAuthenticated, setUserRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'otabeknasimov' && password === '1220') {
      setIsAuthenticated(true);
      setUserRole('admin');
    } else if (username === 'nasimovotabek' && password === '1220') {
      setIsAuthenticated(true);
      setUserRole('student');
    } else {
      alert('Login yoki parol noto‘g‘ri!');
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome to CRM</h2>
      <div className="login-card">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
};

export default LogIn;
