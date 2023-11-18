import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chatbot from './pages/ChatCode';
import About from './pages/About';

function App() {
  return (
  <Routes>
    <Route path="/" element={<Chatbot />}/>
    <Route path="/about" element={<About />}/>
  </Routes>

)
}

export default App;
