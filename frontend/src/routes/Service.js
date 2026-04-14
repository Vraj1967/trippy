import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Service() {
  const services = [
    { icon: '✈️', title: 'Flight Booking', desc: 'Book domestic and international flights at the best prices.' },
    { icon: '🏨', title: 'Hotel Reservations', desc: 'Find and book premium hotels and resorts worldwide.' },
    { icon: '🗺️', title: 'Tour Packages', desc: 'Curated travel packages for every type of traveler.' },
    { icon: '🚗', title: 'Car Rentals', desc: 'Rent cars at your destination for convenient travel.' },
    { icon: '🎯', title: 'Activity Booking', desc: 'Discover and book local experiences and activities.' },
    { icon: '📋', title: 'Travel Insurance', desc: 'Travel with peace of mind with our insurance plans.' }
  ];

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '80vh', padding: '4rem 2rem', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#1a1a2e', textAlign: 'center', marginBottom: '0.5rem' }}>
            Our Services
          </h1>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem', fontSize: '1.1rem' }}>
            Everything you need for the perfect trip
          </p>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {services.map((s, i) => (
              <div key={i} style={{
                background: 'white', padding: '2rem', borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.06)', transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{s.icon}</div>
                <h3 style={{ color: '#1a1a2e', marginBottom: '0.5rem' }}>{s.title}</h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
