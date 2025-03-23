import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('diaryPassword');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav style={{
      padding: '1rem',
      borderBottom: '1px solid #ccc',
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        {!isLoggedIn && (
          <Link to="/" style={{ marginRight: '1rem' }}>
            🔐 Login
          </Link>
        )}

        {isLoggedIn && (
          <>
            <Link to="/diary" style={{ marginRight: '1rem' }}>✍️ Write</Link>
            <Link to="/view-notes">📓 View Notes</Link>
          </>
        )}
      </div>

      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="logout"
          style={{ padding: '0.4rem 0.8rem' }}
        >
          🚪 Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
