import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import Ournalpage from './components/journalsPage';
import AdvicePage from './components/AdvicePage';
import MotivationPage from './components/MotivationPage';
import MoodAnlPage from './components/MoodAnlPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:7701/api/users/me', { withCredentials: true });
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif',
      fontSize: '24px',
      color: '#333',
    }}>
      <div>
        <span style={{ animation: 'pulse 1.5s infinite' }}>🔄 Yükleniyor...</span>
      </div>
  
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.3; }
            50% { opacity: 1; }
            100% { opacity: 0.3; }
          }
        `}
      </style>
    </div>
  );
  

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Register />} />
        <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/menu" element={isAuthenticated ? <MenuPage /> : <Navigate to="/login" />} />
        <Route path="/journals" element={isAuthenticated ? <Ournalpage /> : <Navigate to="/login" />} />
        <Route path="/advice" element={isAuthenticated ? <AdvicePage /> : <Navigate to="/login" />} />
        <Route path="/motivation" element={isAuthenticated ? <MotivationPage /> : <Navigate to="/login" />} />
        <Route path="/mood-analysis" element={isAuthenticated ? <MoodAnlPage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
