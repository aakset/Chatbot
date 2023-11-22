import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/Login.css";
import Chatbot from './ChatCode'; // Import your Chatbot component

const LoginForm = ({setUsername}) => {
  const [loginUsername, setLoginUsername] = useState('');
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
        body: JSON.stringify({ username: loginUsername }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setUsername(loginUsername)
        setIsLoggedIn(true);
        navigate('/'); // Navigate to "/" after successful registration
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
        body: JSON.stringify({ username:loginUsername }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setUsername(loginUsername)
        setIsLoggedIn(true);
        navigate('/'); // Navigate to "/" after successful login
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      {isLoggedIn ? ( 
        <Chatbot user={loginUsername} />
      ) : (
        <>
          <h2>Login or Register</h2>
          <input
            type="text"
            placeholder="Enter your username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            className={message.includes("username") ? "error" : ""}
          />
          <button onClick={handleRegister} disabled={!loginUsername}>Register</button>
          <button onClick={handleLogin} disabled={!loginUsername}>Login</button>
          <p>{message}</p>
        </>
      )}
    </div>
  );
};

export default LoginForm;
