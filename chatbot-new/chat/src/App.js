import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import ChatCode from './pages/ChatCode';
import Login from './pages/Login';

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Chatbot</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<ChatCode />} />
      </Routes>
    </>
  );
}

export default App;
