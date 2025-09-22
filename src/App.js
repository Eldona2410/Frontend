import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ServiceList from './pages/ServiceList';
import ServiceDetail from './pages/ServiceDetail';
import BookingForm from './pages/BookingForm';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register'; // import the register page
import i18n from './utils/i18n';

const API = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

// Contexts
export const ApiContext = React.createContext({
  api: "http://127.0.0.1:8000",
});

export const AuthContext = React.createContext({
  auth: { user: null, token: null },
  setAuth: () => {}
});

function App() {
  const [lang, setLang] = useState('en');
  const [auth, setAuth] = useState({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null
  });

  // Update html lang/dir
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Save auth to localStorage when it changes
  useEffect(() => {
    if (auth.user && auth.token) {
      localStorage.setItem('user', JSON.stringify(auth.user));
      localStorage.setItem('token', auth.token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [auth]);

  const handleLogout = () => setAuth({ user: null, token: null });

  return (
    <ApiContext.Provider value={{ api: API }}>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <BrowserRouter>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <Link className="navbar-brand" to="/">AutoOne</Link>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => setLang('en')}
                >
                  EN
                </button>
                <button
                  className="btn btn-sm btn-outline-primary me-3"
                  onClick={() => setLang('ar')}
                >
                  AR
                </button>

                {auth.user ? (
                  <>
                    <span className="me-2">Hello, {auth.user.name}</span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link className="btn btn-sm btn-primary me-2" to="/login">Login</Link>
                    <Link className="btn btn-sm btn-success" to="/register">Register</Link>
                  </>
                )}
              </div>
            </div>
          </nav>

          <div className="container my-4">
            <Routes>
              <Route path="/" element={<Home i18n={i18n[lang]} />} />
              <Route path="/services/:type" element={<ServiceList i18n={i18n[lang]} />} />
              <Route path="/service/:id" element={<ServiceDetail i18n={i18n[lang]} />} />
              <Route path="/book/:id" element={<BookingForm i18n={i18n[lang]} />} />
              <Route path="/profile" element={<Profile i18n={i18n[lang]} />} />
              <Route path="/login" element={<Login i18n={i18n[lang]} />} />
              <Route path="/register" element={<Register i18n={i18n[lang]} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    </ApiContext.Provider>
  );
}

export default App;
