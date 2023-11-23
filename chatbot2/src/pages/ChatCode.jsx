import React, { useState, useEffect, useRef } from 'react';
import '../style/ChatCode.css';

const Chatbot = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  const getData = async () => {

    const response = await fetch('http://localhost:3001/getchats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: user }),
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
  },[user])


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

      if (message.toLowerCase() === 'log out') {
        window.location.href = '/login'; 
        return;
      }

      if (message.toLowerCase().includes("favorite song?")) {
        window.open('https://www.youtube.com/watch?v=1kQyZ9cD6Z8', "_blank"); 
        return;
      }

      if (message.toLowerCase() === "open netflix") {
        window.open('https://www.netflix.com/login', "_blank"); 
        return;
      }

      if (message.toLowerCase() === "open wikipedia") {
        window.open('https://www.wikipedia.org/', "_blank"); 
        return;
      }

      if (message.toLowerCase() === "open youtube") {
        window.open('https://www.youtube.com/', "_blank"); 
        return;
      }
      if (message.toLowerCase().includes("random")) {
        const randomSites = [
          'https://chat.openai.com/',
          'https://updatefaker.com/windows11/index.html',
          'https://www.instagram.com/aakashsonics/',
          'https://web.whatsapp.com/',
          'https://trello.com/b/V7SBUlFh/school-everyday',
          'https://www.icloud.com/notes/021Cz80HGF0KKVGBusbJT4Qpg'
        ];
        const randomIndex = Math.floor(Math.random() * randomSites.length);
        const randomSite = randomSites[randomIndex];
        window.open(randomSite, "_blank");
        return;
      }

      const response = await fetch('http://localhost:3001/saveChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender: user, message }),
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
