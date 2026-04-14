import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: '800' }}>
          Explore the World with <span style={{ color: '#ffd700' }}>Trippy</span>
        </h1>
        <p style={{ fontSize: '1.3rem', maxWidth: '600px', opacity: 0.9, lineHeight: 1.6 }}>
          Discover amazing destinations, plan your perfect trip, and create memories that last a lifetime.
        </p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <a href="/service" style={{
            padding: '14px 32px', background: '#8b0000', color: 'white',
            borderRadius: '10px', textDecoration: 'none', fontWeight: '600',
            fontSize: '1.05rem', transition: 'transform 0.2s'
          }}>Our Services</a>
          <a href="/contact" style={{
            padding: '14px 32px', background: 'rgba(255,255,255,0.2)', color: 'white',
            borderRadius: '10px', textDecoration: 'none', fontWeight: '600',
            fontSize: '1.05rem', border: '1px solid rgba(255,255,255,0.4)'
          }}>Contact Us</a>
        </div>
      </div>
      <Footer />
    </>
  );
}
