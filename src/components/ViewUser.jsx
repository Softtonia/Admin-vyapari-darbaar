import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../api/config';
import './UserForm.css';

export default function ViewUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiFetch(`/api/admin/users/${id}`)
      .then(data => {
        if (data.status && data.data) {
          setUser(data.data);
        } else {
          setError('Failed to fetch user data');
        }
      })
      .catch(err => setError(err.message || 'Error fetching user'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="uf-container"><div className="uf-loading">Loading...</div></div>;
  if (error) return <div className="uf-container"><div className="uf-error">{error}</div></div>;
  if (!user) return <div className="uf-container">User not found</div>;

  return (
    <div className="uf-container">
      <div className="uf-header">
        <button className="uf-back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h1 className="uf-title">View User Profile</h1>
      </div>

      <div className="uf-section">
        <div className="uv-profile-header">
          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.full_name || 'User')}&size=128&background=random`} alt="Avatar" className="uv-avatar" />
          <div className="uv-header-info">
            <h2>{user.name || user.full_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Guest'}</h2>
            <span className="uv-role-badge">{user.role || 'User'}</span>
          </div>
        </div>

        <h2 className="uf-section-title">Personal Details</h2>
        <div className="uv-details-grid">
          <div className="uv-detail-item">
            <span className="uv-detail-label">First Name</span>
            <span className="uv-detail-value">{user.first_name || (user.name || user.full_name || '').split(' ')[0] || 'N/A'}</span>
          </div>
          <div className="uv-detail-item">
            <span className="uv-detail-label">Last Name</span>
            <span className="uv-detail-value">{user.last_name || (user.name || user.full_name || '').split(' ').slice(1).join(' ') || 'N/A'}</span>
          </div>
          <div className="uv-detail-item">
            <span className="uv-detail-label">Email</span>
            <span className="uv-detail-value">{user.email || 'N/A'}</span>
          </div>
          <div className="uv-detail-item">
            <span className="uv-detail-label">Phone Number</span>
            <span className="uv-detail-value">{user.phone_number || 'N/A'}</span>
          </div>
          <div className="uv-detail-item">
            <span className="uv-detail-label">Status</span>
            <span className="uv-detail-value" style={{textTransform: 'capitalize'}}>{user.status || 'Active'}</span>
          </div>
        </div>
      </div>

      {user.role === 'trader' && user.company && (
        <div className="uf-section">
          <h2 className="uf-section-title">Company Details</h2>
          <div className="uv-details-grid">
            <div className="uv-detail-item">
              <span className="uv-detail-label">Company Name</span>
              <span className="uv-detail-value">{user.company.name || 'N/A'}</span>
            </div>
            <div className="uv-detail-item">
              <span className="uv-detail-label">Business Type</span>
              <span className="uv-detail-value">{user.company.business_type || 'N/A'}</span>
            </div>
            <div className="uv-detail-item">
              <span className="uv-detail-label">GSTIN</span>
              <span className="uv-detail-value">{user.company.gstin || 'N/A'}</span>
            </div>
            <div className="uv-detail-item">
              <span className="uv-detail-label">Trade Preference</span>
              <span className="uv-detail-value">{user.company.trade_preference || 'N/A'}</span>
            </div>
            <div className="uv-detail-item">
              <span className="uv-detail-label">Verification Status</span>
              <span className="uv-detail-value" style={{textTransform: 'capitalize'}}>{user.company.verification_status || 'Pending'}</span>
            </div>
            <div className="uv-detail-item">
              <span className="uv-detail-label">Address</span>
              <span className="uv-detail-value">{user.company.address || 'N/A'}</span>
            </div>
            <div className="uv-detail-item">
              <span className="uv-detail-label">City</span>
              <span className="uv-detail-value">{user.company.city || 'N/A'}</span>
            </div>
            <div className="uv-detail-item">
              <span className="uv-detail-label">State</span>
              <span className="uv-detail-value">{user.company.state || 'N/A'}</span>
            </div>
            <div className="uv-detail-item">
              <span className="uv-detail-label">Country</span>
              <span className="uv-detail-value">{user.company.country || 'N/A'}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="uf-actions">
        <button type="button" className="uf-btn-submit" onClick={() => navigate(`/user/edit/${user.id}`)}>Edit User</button>
      </div>
    </div>
  );
}
