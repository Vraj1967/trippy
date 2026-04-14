import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const res = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('✅ Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('❌ ' + data.message);
      }
    } catch {
      setStatus('❌ Something went wrong. Is the server running?');
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
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '550px'
        }}>
          <h2 style={{ marginBottom: '0.25rem', fontSize: '1.8rem' }}>Get in Touch</h2>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>We'd love to hear from you!</p>
          {status && (
            <div style={{
              padding: '0.6rem 1rem', borderRadius: '6px', marginBottom: '1rem',
              background: status.includes('✅') ? '#e8f5e9' : '#fee',
              color: status.includes('✅') ? '#2e7d32' : '#c00',
              fontSize: '0.9rem'
            }}>{status}</div>
          )}
          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required
              style={{ width: '100%', padding: '0.75rem 1rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' }} />
            <input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required
              style={{ width: '100%', padding: '0.75rem 1rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' }} />
            <input name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required
              style={{ width: '100%', padding: '0.75rem 1rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' }} />
            <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required rows="4"
              style={{ width: '100%', padding: '0.75rem 1rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box', resize: 'vertical' }} />
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '0.85rem', background: loading ? '#ccc' : '#8b0000',
              color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '600'
            }}>{loading ? 'Sending...' : 'Send Message'}</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
