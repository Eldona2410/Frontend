import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ApiContext, AuthContext } from '../App';

export default function Register({ i18n }) {
  const { api } = useContext(ApiContext); // e.g., http://localhost:8000
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== passwordConfirm) {
      setMessage('Passwords do not match');
      return;
    }

    try {
const res = await fetch("http://127.0.0.1:8000/api/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name,
    email,
    password,
    password_confirmation: passwordConfirm,
  }),
});

// Debug: log what server actually returned
const text = await res.text();
console.log("Raw response:", text);
console.log("Fetching:", `${api}/api/signup`);

let data = null;
try {
  data = JSON.parse(text);
} catch (err) {
  console.error("Not JSON:", text);
  setMessage("Server returned invalid response (HTML instead of JSON)");
  return;
}


      if (!res.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(', ');
          setMessage(errorMessages);
        } else if (data.message) {
          setMessage(data.message);
        } else {
          setMessage('Registration failed');
        }
        return;
      }

      if (!data.user || !data.token) {
        setMessage('Invalid server response');
        return;
      }

      setAuth({ user: data.user, token: data.token });
      navigate('/');
    } catch (err) {
      console.error('Fetch error:', err);
      setMessage('Server error. Check console for details.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">{i18n?.register || 'Register'}</h2>

      {message && <p className="mb-2 text-red-600">{message}</p>}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Confirm Password:</label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          {i18n?.register || 'Register'}
        </button>
      </form>

      <p className="mt-3 text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 underline">
          Login here
        </Link>
      </p>
    </div>
  );
}
