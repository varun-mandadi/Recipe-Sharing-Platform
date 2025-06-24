import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  let username = '';

  // Extract name from token if logged in
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.email) {
        username = payload.email.split('@')[0];
        username = username.charAt(0).toUpperCase() + username.slice(1); // Capitalize
      }
    } catch (err) {
      console.error('Failed to decode token:', err);
    }
  }

  const logoutUser = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 30px',
        backgroundColor: 'lightblue' ,
        flexWrap: 'wrap'
      }}
    >
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/">🏠 Home</Link>
        {isLoggedIn && <Link to="/add">➕ Add Recipe</Link>}
        {isLoggedIn && <Link to="/my-dishes">🍽️ My Dishes</Link>}
        {!isLoggedIn ? (
          <>
            <Link to="/login">🔐 Login</Link>
            <Link to="/register">📝 Register</Link>
          </>
        ) : (
          <button
            onClick={logoutUser}
            style={{
              padding: '6px 14px',
              backgroundColor: '#e63946',
              border: 'none',
              color: '#fff',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🚪 Logout
          </button>
        )}
      </div>

      {/* Display logged in username if available */}
      {isLoggedIn && (
        <div style={{ fontWeight: '600', color: '#333', marginTop: '10px' }}>
          👤 Logged in user: <span style={{ color: '#1d4ed8' }}>{username}</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
