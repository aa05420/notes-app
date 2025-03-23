import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PasswordPage from './PasswordPage';
import DiaryPage from './DiaryPage';
import ViewNotesPage from './ViewNotesPage';
import Navbar from './Navbar';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('diaryPassword'));

  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored === 'true') setDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      <Router>
        <div style={{ padding: '1rem' }}>
          <button onClick={toggleDarkMode} style={{ marginBottom: '1rem' }}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>

          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>

        <Routes>
          <Route path="/" element={<PasswordPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route
            path="/diary"
            element={
              <ProtectedRoute>
                <DiaryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-notes"
            element={
              <ProtectedRoute>
                <ViewNotesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
