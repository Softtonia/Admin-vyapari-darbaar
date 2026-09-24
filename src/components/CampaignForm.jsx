import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCampaign, createCampaign, updateCampaign, fetchCampaignEvents } from '../api/campaignApi';
import { fetchEmailTemplates } from '../api/emailTemplateApi';
import './Campaigns.css';

export default function CampaignForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    email_template_id: '',
    send_type: 'now',
    event: '',
    scheduled_at: '',
    is_active: true
  });

  const [templates, setTemplates] = useState([]);
  const [events, setEvents] = useState([]);
  
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDependencies();
    if (isEdit) {
      loadCampaignData();
    }
  }, [id]);

  const loadDependencies = async () => {
    try {
      // Fetch Active Templates
      const tempRes = await fetchEmailTemplates({});
      if (tempRes?.status) {
        const allTemplates = tempRes.data?.data || tempRes.data || [];
        setTemplates(allTemplates);
      }

      // Fetch Events
      const evRes = await fetchCampaignEvents();
      if (evRes?.status) {
        setEvents(evRes.data || []);
      }
    } catch (err) {
      console.error('Failed to load dependencies', err);
    }
  };

  const loadCampaignData = async () => {
    try {
      const res = await fetchCampaign(id);
      if (res?.status && res.data) {
        setFormData({
          name: res.data.name || '',
          email_template_id: res.data.email_template_id || '',
          send_type: res.data.send_type || 'now',
          event: res.data.event || '',
          scheduled_at: res.data.scheduled_at ? res.data.scheduled_at.slice(0, 16) : '', // format for datetime-local
          is_active: !!res.data.is_active,
        });
      } else {
        setError(res?.message || 'Failed to load campaign.');
      }
    } catch (err) {
      setError(err.message || 'Error loading campaign.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: type === 'checkbox' ? checked : value };
      
      // UX Logic: Reset unrelated fields when send_type changes
      if (name === 'send_type') {
        if (value === 'now') {
          updated.event = '';
          updated.scheduled_at = '';
        } else if (value === 'schedule') {
          updated.event = '';
        } else if (value === 'trigger') {
          updated.scheduled_at = '';
        }
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    // Prepare payload
    const payload = { ...formData };
    if (payload.send_type === 'now') {
      payload.event = null;
      payload.scheduled_at = null;
    } else if (payload.send_type === 'schedule') {
      payload.event = null;
    } else if (payload.send_type === 'trigger') {
      payload.scheduled_at = null;
    }

    try {
      const res = isEdit 
        ? await updateCampaign(id, payload)
        : await createCampaign(payload);
        
      if (res?.status) {
        navigate('/admin/settings/campaigns');
      } else {
        setError(res?.message || 'Failed to save campaign.');
      }
    } catch (err) {
      setError(err.message || 'Error saving campaign.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="camp-wrapper">Loading...</div>;
  }

  return (
    <div className="camp-wrapper">
      <div className="camp-header">
        <div>
          <h2 className="camp-title">{isEdit ? 'Edit Campaign' : 'Create Campaign'}</h2>
          <p className="camp-subtitle">{isEdit ? 'Update existing campaign configuration.' : 'Set up a new email campaign.'}</p>
        </div>
        <div className="camp-header-actions">
          <button className="camp-btn-text" onClick={() => navigate('/admin/settings/campaigns')}>Cancel</button>
          <button className="camp-btn-primary" onClick={handleSubmit} disabled={saving}>
            {saving ? 'Saving...' : 'Save Campaign'}
          </button>
        </div>
      </div>

      {error && <div className="alert error">{error}</div>}

      <div className="camp-form-layout">
        <form onSubmit={handleSubmit}>
          
          <div className="camp-form-row">
            <div className="camp-form-group flex-1">
              <label>Campaign Name *</label>
              <input 
                required 
                type="text" 
                name="name" 
                className="camp-input"
                value={formData.name} 
                onChange={handleChange} 
                placeholder="e.g. Welcome Series 1" 
              />
            </div>
            <div className="camp-form-group flex-1">
              <label>Email Template *</label>
              <select 
                required 
                name="email_template_id" 
                className="camp-select"
                value={formData.email_template_id} 
                onChange={handleChange}
              >
                <option value="">Select a template...</option>
                {templates.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="camp-form-row" style={{ marginTop: '24px' }}>
            <div className="camp-form-group flex-1">
              <label>Sending Type *</label>
              <div className="camp-radio-group">
                <label className="camp-radio-label">
                  <input 
                    type="radio" 
                    name="send_type" 
                    value="now" 
                    checked={formData.send_type === 'now'} 
                    onChange={handleChange} 
                  />
                  Sent Now
                </label>
                <label className="camp-radio-label">
                  <input 
                    type="radio" 
                    name="send_type" 
                    value="schedule" 
                    checked={formData.send_type === 'schedule'} 
                    onChange={handleChange} 
                  />
                  Schedule
                </label>
                <label className="camp-radio-label">
                  <input 
                    type="radio" 
                    name="send_type" 
                    value="trigger" 
                    checked={formData.send_type === 'trigger'} 
                    onChange={handleChange} 
                  />
                  Trigger
                </label>
              </div>
            </div>

            <div className="camp-form-group flex-1" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <label style={{ marginBottom: '8px' }}>Status (Active)</label>
              <label className="camp-switch">
                <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
                <span className="camp-slider round"></span>
              </label>
            </div>
          </div>

          {/* Dynamic Fields */}
          <div className="camp-form-row" style={{ marginTop: '24px' }}>
            {formData.send_type === 'schedule' && (
              <div className="camp-form-group flex-1">
                <label>Scheduled Date & Time *</label>
                <input 
                  required 
                  type="datetime-local" 
                  name="scheduled_at" 
                  className="camp-input"
                  value={formData.scheduled_at} 
                  onChange={handleChange} 
                />
              </div>
            )}

            {formData.send_type === 'trigger' && (
              <div className="camp-form-group flex-1">
                <label>Trigger Event *</label>
                <select 
                  required 
                  name="event" 
                  className="camp-select"
                  value={formData.event} 
                  onChange={handleChange}
                >
                  <option value="">Select an event...</option>
                  {events.map(ev => (
                    <option key={ev.value} value={ev.value}>{ev.label}</option>
                  ))}
                </select>
              </div>
            )}
            
            {(formData.send_type === 'schedule' || formData.send_type === 'trigger') && (
              <div className="flex-1"></div>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
