import React, { useState, useEffect, useRef } from 'react';
import '../style/ChatCode.css';

const Chatbot = ({user}) => {
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const [username, setUsername] = useState(user); 

  useEffect(() => {
    // Automatisches "scrollen" bei neuen Nachrichten
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleUserMessage = async (message) => {
    try {
      // nachricht --> backend
      const response = await fetch('http://localhost:3001/saveChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender: username, message }),
      }).then((response) => response.json());

      const newMessage = { text: message, type: 'user' };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // delay für bot (chammer lösche bruchts nöd)
      setTimeout(() => {
        let botResponse = response.bot
        const newMessage = { text: botResponse, type: 'bot' };
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
            className={`message ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {msg.text}
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
