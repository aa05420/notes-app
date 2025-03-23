import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordPage = ({ setIsLoggedIn }) => {
  const [password, setPassword] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('diaryPassword');
    if (!stored) setIsFirstTime(true);
  }, []);

  const handleSubmit = () => {
    const stored = localStorage.getItem('diaryPassword');
    if (isFirstTime) {
      localStorage.setItem('diaryPassword', password);
      setIsLoggedIn(true);
      navigate('/diary');
    } else if (password === stored) {
      setIsLoggedIn(true);
      navigate('/diary');
    } else {
      alert('Wrong password!');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{isFirstTime ? 'Set a Password' : 'Enter Password'}</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginRight: '1rem' }}
      />
      <button onClick={handleSubmit}>
        {isFirstTime ? 'Set Password' : 'Unlock'}
      </button>
    </div>
  );
};

export default PasswordPage;
