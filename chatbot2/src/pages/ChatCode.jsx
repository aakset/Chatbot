import React, { useState, useEffect, useRef } from 'react';
import '../style/ChatCode.css';

const Chatbot = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const [username, setUsername] = useState(user);

  const getData = async () => {

    const response = await fetch('http://localhost:3001/getchats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    }).then((response) => response.json());
    setMessages(await response.chats)

  }


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(()=> {
    getData()
  },[])

  const handleUserMessage = async (message) => {
    try {
      if (message.toLowerCase() === 'about') {
        window.location.href = '/about'; 
        return;
      }

      if (message.toLowerCase() === 'log out') {
        window.location.href = '/login'; 
        return;
      }

      const response = await fetch('http://localhost:3001/saveChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender: username, message }),
      }).then((response) => response.json());

      const newMessage = { message: message, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      setTimeout(() => {
        let botResponse = response.bot;
        const newMessage = { message: botResponse, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }, 1000);
    } catch (error) {
      console.error('Error saving user message:', error);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === 'bot' ? 'bot-message': 'user-message'}`}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleUserMessage(e.target.value);
              e.target.value = '';
            }
          }}
        />
        <button className="clear-button" onClick={handleClearChat}>
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
