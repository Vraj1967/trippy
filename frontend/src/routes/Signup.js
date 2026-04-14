import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SignUpPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        alert('🎉 Registration successful!');
        navigate('/login');
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
    <>
      <Navbar />
      <div style={{
        minHeight: '80vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: '#f5f5f5', padding: '2rem'
      }}>
        <div style={{
          background: 'white', padding: '2.5rem', borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '420px'
        }}>
          <h2 style={{ marginBottom: '0.25rem', fontSize: '1.8rem' }}>Create Account</h2>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>Join Trippy and start exploring</p>
          {error && (
            <div style={{
              background: '#fee', color: '#c00', border: '1px solid #fcc',
              borderRadius: '6px', padding: '0.6rem 1rem', marginBottom: '1rem', fontSize: '0.9rem'
            }}>{error}</div>
          )}
          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required
              style={{ width: '100%', padding: '0.75rem 1rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' }} />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required
              style={{ width: '100%', padding: '0.75rem 1rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' }} />
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required
              style={{ width: '100%', padding: '0.75rem 1rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' }} />
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '0.85rem', background: loading ? '#ccc' : '#8b0000',
              color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '600'
            }}>{loading ? 'Signing up...' : 'Sign Up'}</button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
            Already have an account? <a href="/login" style={{ color: '#8b0000', fontWeight: '600', textDecoration: 'none' }}>Login</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
