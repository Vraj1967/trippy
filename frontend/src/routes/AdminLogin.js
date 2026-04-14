import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        login({ email: formData.email, role: 'admin' }, data.token);
        navigate('/admin');
      } else {
        setError(data.message);
      }
    } catch {
      setError('Something went wrong. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ background: '#1a1a2e' }}>
      <div className="auth-card">
        <h2>🛡️ Admin Login</h2>
        <p className="auth-sub">Trippy Administration Panel</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Admin Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Admin Password" value={formData.password} onChange={handleChange} required />
          <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Admin Login'}</button>
        </form>
      </div>
    </div>
  );
}
