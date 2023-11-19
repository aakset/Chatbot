import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chatbot from './pages/ChatCode';
import About from './pages/About';
import LoginForm from './pages/Login';

function App() {
  return (
  <Routes>
    <Route path="/" element={<Chatbot />}/>
    <Route path="/about" element={<About />}/>
    <Route path="/login" element={<LoginForm />}/>
  </Routes>

)
}

export default App;
