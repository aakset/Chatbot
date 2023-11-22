import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/Login.css";
import Chatbot from './ChatCode'; // Import your Chatbot component

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setIsLoggedIn(true); 
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setUsername(username);
        setIsLoggedIn(true); 
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      {isLoggedIn ? ( 
        <Chatbot user={username} />
      ) : (
        <>
          <h2>Login or Register</h2>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={message.includes("username") ? "error" : ""}
          />
          <button onClick={handleRegister} disabled={!username}>Register</button>
          <button onClick={handleLogin} disabled={!username}>Login</button>
          <p>{message}</p>
        </>
      )}
    </div>
  );
};

export default LoginForm;
