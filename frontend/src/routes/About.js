import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '80vh',
        padding: '4rem 2rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1a1a2e', marginBottom: '1.5rem' }}>About Trippy</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444', marginBottom: '1.5rem' }}>
          Trippy is your all-in-one travel companion, dedicated to making your
          travel dreams come true. Founded with a passion for exploration and
          adventure, we connect travelers with extraordinary destinations worldwide.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444', marginBottom: '1.5rem' }}>
          Our team of experienced travel experts curates the best experiences,
          from breathtaking beach getaways to thrilling mountain expeditions.
          We believe travel should be accessible, enjoyable, and unforgettable.
        </p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem', marginTop: '2rem'
        }}>
          {[
            { num: '500+', label: 'Destinations' },
            { num: '10K+', label: 'Happy Travelers' },
            { num: '50+', label: 'Expert Guides' },
            { num: '4.9★', label: 'Average Rating' }
          ].map((stat, i) => (
            <div key={i} style={{
              background: '#f0f2f5', padding: '1.5rem', borderRadius: '12px', textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#8b0000' }}>{stat.num}</div>
              <div style={{ color: '#666', marginTop: '0.3rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
