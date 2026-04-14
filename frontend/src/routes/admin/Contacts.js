import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { useAuth } from '../../context/AuthContext';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const { token } = useAuth();

  const fetchContacts = () => {
    fetch('http://localhost:5000/admin/contacts', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => { setContacts(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchContacts(); }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await fetch(`http://localhost:5000/admin/contacts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchContacts();
  };

  return (
    <AdminLayout>
      <h1>Contact Messages ({contacts.length})</h1>
      <div className="admin-table-wrapper">
        {loading ? (
          <p className="loading-text">Loading messages...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>No messages yet</td></tr>
              ) : contacts.map((c, i) => (
                <React.Fragment key={c._id}>
                  <tr
                    style={{ cursor: 'pointer' }}
                    onClick={() => setExpanded(expanded === c._id ? null : c._id)}
                  >
                    <td>{i + 1}</td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.subject}</td>
                    <td>{new Date(c.submittedAt).toLocaleDateString('en-IN')}</td>
                    <td onClick={e => e.stopPropagation()}>
                      <button className="btn-delete" onClick={() => handleDelete(c._id)}>Delete</button>
                    </td>
                  </tr>
                  {expanded === c._id && (
                    <tr>
                      <td colSpan="6" style={{ background: '#f8f8f8', padding: '1rem 1.5rem', fontSize: '0.9rem', color: '#444' }}>
                        <strong>Message:</strong><br />{c.message}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
