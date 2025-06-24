import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser({ email, password });
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err.message);
      alert('❌ Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ width: '250%', boxSizing: 'border-box' }}>
      <h1 style={{ textAlign: 'center' }}>🔐 Login to Your Account</h1>
      <form
        onSubmit={handleLogin}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3rem',
          margin: '0 auto',
          maxWidth: '400px',
          height: '500px',
          justifyContent: 'center'
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="📧 Enter your email"
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            height: '50px',
            fontSize: '16px'
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="🔑 Enter your password"
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            height: '50px',
            fontSize: '16px'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          ✅ Login
        </button>
      </form>
    </div>
  );
};

export default Login;
