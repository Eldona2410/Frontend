import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ApiContext, AuthContext } from '../App';

export default function Login({ i18n }) {
  const { api } = useContext(ApiContext);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${api}/api/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Login failed');
        return;
      }

      // Save user locally
      setAuth({ user: data.user, token: data.token });
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/profile');
    } catch (err) {
      setMessage('Login failed: ' + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {message && <p className="mb-2 text-red-600">{message}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
      </form>

      <p className="mt-3 text-sm">
        Don't have an account? <Link to="/register" className="text-blue-600 underline">Register here</Link>
      </p>
    </div>
  );
}
