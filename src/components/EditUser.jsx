import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../api/config';
import './UserForm.css';

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    role: 'user',
    
    // Company fields for trader
    company_name: '',
    business_type: '',
    gstin: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    trade_preference: 'both',
    verification_status: 'pending'
  });

  useEffect(() => {
    if (!id) return;
    setFetching(true);
    apiFetch(`/api/admin/users/${id}`)
      .then(data => {
        if (data.status && data.data) {
          const user = data.data;
          setFormData({
            first_name: user.first_name || (user.name || user.full_name || '').split(' ')[0] || '',
            last_name: user.last_name || (user.name || user.full_name || '').split(' ').slice(1).join(' ') || '',
            email: user.email || '',
            phone_number: user.phone_number || '',
            role: user.role || 'user',
            company_name: user.company?.name || '',
            business_type: user.company?.business_type || '',
            gstin: user.company?.gstin || '',
            address: user.company?.address || '',
            city: user.company?.city || '',
            state: user.company?.state || '',
            country: user.company?.country || 'India',
            trade_preference: user.company?.trade_preference || 'both',
            verification_status: user.company?.verification_status || 'pending'
          });
        } else {
          setError('Failed to fetch user data');
        }
      })
      .catch(err => setError(err.message || 'Error fetching user'))
      .finally(() => setFetching(false));
  }, [id]);

  useEffect(() => {
    apiFetch('/api/admin/roles?per_page=100')
      .then(res => {
        if (res.status && res.data) {
          const rolesData = Array.isArray(res.data) ? res.data : (res.data.data || []);
          setRoles(rolesData);
        }
      })
      .catch(err => console.error("Error fetching roles:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formData)
      });
      
      if (response.status) {
        navigate(-1); // go back
      } else {
        setError(response.message || 'Failed to update user');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while updating the user');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="uf-container"><div className="uf-loading">Loading...</div></div>;

  return (
    <div className="uf-container">
      <div className="uf-header">
        <button className="uf-back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h1 className="uf-title">Edit User</h1>
      </div>

      {error && <div className="uf-error">{error}</div>}

      <form className="uf-form" onSubmit={handleSubmit}>
        <div className="uf-section">
          <h2 className="uf-section-title">Personal Details</h2>
          <div className="uf-grid">
            <div className="uf-form-group">
              <label>First Name *</label>
              <input type="text" name="first_name" required value={formData.first_name} onChange={handleChange} />
            </div>
            <div className="uf-form-group">
              <label>Last Name *</label>
              <input type="text" name="last_name" required value={formData.last_name} onChange={handleChange} />
            </div>
            <div className="uf-form-group">
              <label>Email *</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="uf-form-group">
              <label>Phone Number *</label>
              <input type="text" name="phone_number" required value={formData.phone_number} onChange={handleChange} />
            </div>
            <div className="uf-form-group">
              <label>Role *</label>
              <select name="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                {roles.length > 0 ? (
                  roles.map(r => (
                    <option key={r.id} value={r.name} style={{ textTransform: 'capitalize' }}>
                      {r.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="user">User</option>
                    <option value="trader">Trader</option>
                    <option value="subscriber">Subscriber</option>
                    <option value="advertiser">Advertiser</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        {formData.role === 'trader' && (
          <div className="uf-section">
            <h2 className="uf-section-title">Company Details (Trader)</h2>
            <div className="uf-grid">
              <div className="uf-form-group">
                <label>Company Name</label>
                <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} />
              </div>
              <div className="uf-form-group">
                <label>Business Type</label>
                <select name="business_type" value={formData.business_type} onChange={handleChange}>
                  <option value="">Select Type</option>
                  <option value="Wholesaler">Wholesaler</option>
                  <option value="Retailer">Retailer</option>
                  <option value="Manufacturer">Manufacturer</option>
                  <option value="Farmer">Farmer</option>
                </select>
              </div>
              <div className="uf-form-group">
                <label>GSTIN</label>
                <input type="text" name="gstin" value={formData.gstin} onChange={handleChange} />
              </div>
              <div className="uf-form-group">
                <label>Trade Preference</label>
                <select name="trade_preference" value={formData.trade_preference} onChange={handleChange}>
                  <option value="both">Both (Buy & Sell)</option>
                  <option value="buy">Buy Only</option>
                  <option value="sell">Sell Only</option>
                </select>
              </div>
              <div className="uf-form-group">
                <label>Verification Status</label>
                <select name="verification_status" value={formData.verification_status} onChange={handleChange}>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="uf-form-group uf-full-width">
                <label>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
              </div>
              <div className="uf-form-group">
                <label>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} />
              </div>
              <div className="uf-form-group">
                <label>State</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} />
              </div>
              <div className="uf-form-group">
                <label>Country</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} />
              </div>
            </div>
          </div>
        )}

        <div className="uf-actions">
          <button type="button" className="uf-btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="uf-btn-submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
