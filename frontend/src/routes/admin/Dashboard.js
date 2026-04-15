import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetch('/api/admin/stats', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token]);

  return (
    <AdminLayout>
      <h1>Dashboard</h1>
      {loading ? (
        <p className="loading-text">Loading stats...</p>
      ) : stats ? (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-num">{stats.totalUsers}</div>
              <div className="stat-label">Total Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{stats.totalContacts}</div>
              <div className="stat-label">Contact Messages</div>
            </div>
          </div>

          <div className="admin-table-wrapper">
            <h3>Recent Signups</h3>
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Email</th><th>Date</th></tr></thead>
              <tbody>
                {stats.recentUsers.map(u => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{new Date(u.registeredAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="admin-table-wrapper">
            <h3>Recent Messages</h3>
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Date</th></tr></thead>
              <tbody>
                {stats.recentContacts.map(c => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.subject}</td>
                    <td>{new Date(c.submittedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>Could not load stats. Make sure the backend is running.</p>
      )}
    </AdminLayout>
  );
}
