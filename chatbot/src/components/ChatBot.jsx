import React, { useState } from 'react';
import axios from 'axios';
import "../style/ChatBot.css"

// Inside your ChatBot component
const [error, setError] = useState('');

// Update your Axios request functions
const handleLogin = async () => {
  try {
    const response = await axios.post('/login', { username });
    setResponse(response.data.message);
  } catch (error) {
    setError('Login failed. Please try again.');
    console.error(error);
  }
};

const handleSendMessage = async () => {
  try {
    await axios.post('/saveMessage', { username, message });
    // You can display a success message or update the chat interface here
  } catch (error) {
    setError('Message sending failed. Please try again.');
    console.error(error);
  }
};


function ChatBot() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', { username });
      setResponse(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = async () => {
    try {
      await axios.post('/saveMessage', { username, message });
      // You can display a success message or update the chat interface here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>ChatBot</h1>
      <div>
        <label>Username:</label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <label>Message:</label>
        <input type="text" onChange={(e) => setMessage(e.target.value)} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <div>
        <p>Response: {response}</p>
      </div>
    </div>
  );
}

export default ChatBot;
