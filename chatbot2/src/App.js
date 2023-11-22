import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chatbot from './pages/ChatCode';
import About from './pages/About';
import LoginForm from './pages/Login';

import { useState } from 'react';

function App() {
  const [username, setUsername] = useState("")
  return (
  <Routes>
    <Route path="/" element={<Chatbot user={username} />}/>
    <Route path="/about" element={<About />}/>
    <Route path="/login" element={<LoginForm setUsername={setUsername}/>}/>
    
  </Routes>

)
}

export default App;
