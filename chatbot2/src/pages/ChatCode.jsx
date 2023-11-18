import React, { useState, useEffect, useRef } from 'react';
import '../style/ChatCode.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scrollen bei neuen nachrichten
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleUserMessage = (message) => {
    const newMessage = { text: message, type: 'user' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setTimeout(() => {
      handleBotResponse();
    }, 1000);
  };

  const handleBotResponse = () => {
    const responseOptions = ['Yes', 'No', 'Probably', 'I don\'t think so', 'Definitely', 'Maybe', 'Ask again later... I\'m busy contemplating'];
    const randomIndex = Math.floor(Math.random() * responseOptions.length);
    const botResponse = responseOptions[randomIndex];
    const newMessage = { text: botResponse, type: 'bot' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
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
