import React, { useState, useRef, useEffect } from 'react';
import '../style/ChatCode.css';

const Chatbot = () => {
  // Inside your Chatbot component
  const [chatCount, setChatCount] = useState(1);

  const resetChat = () => {
  setConversation([]);
  setChatCount((prevCount) => prevCount + 1);
  };

  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [responses, setResponses] = useState([
    "Yes",
    "No",
    "I guess",
    "I don't think so..",
    "seriously? I don't answer stupid questions.."
  ]);

  const messagesContainerRef = useRef(null);

  const getRandomResponse = () => {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };

  const handleSend = () => {
    if (input) {
      const userMessage = {
        text: input,
        type: 'user',
      };

      const botResponse = getRandomResponse();
      const botMessage = {
        text: botResponse,
        type: 'bot',
      };

      setConversation([...conversation, userMessage, botMessage]);
      setInput('');
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      // Scroll to the bottom when a new message is added
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [conversation]);


  


  return (
    <div>
        <button onClick={resetChat} className="new-chat-button">
          New Chat
        </button>
    <div className="chat-container">
      <h1>Chatbot</h1>
      <div className="chat">
        <div className="messages" ref={messagesContainerRef}>
          {conversation.map((message, index) => (
            <div
              key={index}
              className={`message ${message.type === 'user' ? 'right' : 'left'}`}
            >
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="textfield">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a question.."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
    </div>
  );
};

export default Chatbot;