import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchEmailTemplate, createEmailTemplate, updateEmailTemplate, fetchPlaceholders, previewEmailTemplate } from '../api/emailTemplateApi';
import './EmailTemplates.css';

export default function EmailTemplateForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    key: '',
    subject: '',
    body: '',
    type: 'html',
    is_active: true
  });

  const [keyEdited, setKeyEdited] = useState(false);

  const [placeholders, setPlaceholders] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  // Preview
  const [previewHtml, setPreviewHtml] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    loadPlaceholders();
    if (isEdit) {
      loadTemplateData();
    }
  }, [id]);

  const loadPlaceholders = async () => {
    try {
      const res = await fetchPlaceholders();
      if (res?.status) {
        setPlaceholders(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load placeholders', err);
    }
  };

  const loadTemplateData = async () => {
    try {
      const res = await fetchEmailTemplate(id);
      if (res?.status && res.data) {
        setFormData({
          name: res.data.name || '',
          key: res.data.key || '',
          subject: res.data.subject || '',
          body: res.data.body || '',
          type: res.data.type || 'html',
          is_active: !!res.data.is_active,
        });
      } else {
        setError(res?.message || 'Failed to load template.');
      }
    } catch (err) {
      setError(err.message || 'Error loading template.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
      
      if (name === 'name' && !isEdit && !keyEdited) {
        updated.key = value.toUpperCase().replace(/[^A-Z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
      }
      return updated;
    });
  };

  const handleKeyChange = (e) => {
    setKeyEdited(true);
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, '');
    setFormData(prev => ({ ...prev, key: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = isEdit 
        ? await updateEmailTemplate(id, formData)
        : await createEmailTemplate(formData);
        
      if (res?.status) {
        navigate('/admin/settings/email-templates');
      } else {
        setError(res?.message || 'Failed to save template.');
      }
    } catch (err) {
      setError(err.message || 'Error saving template.');
    } finally {
      setSaving(false);
    }
  };

  const handleCopyPlaceholder = (variable) => {
    navigator.clipboard.writeText(`{{${variable}}}`);
    // Optional: show small toast here
  };

  const handlePreview = async () => {
    setIsPreviewOpen(true);
    setPreviewLoading(true);
    try {
      const res = await previewEmailTemplate({ subject: formData.subject, body: formData.body });
      if (res?.status) {
        setPreviewHtml(res.data?.html || res.data || '');
      } else {
        setPreviewHtml(`<p style="color:red">Failed to load preview: ${res?.message}</p>`);
      }
    } catch (err) {
      setPreviewHtml(`<p style="color:red">Error loading preview.</p>`);
    } finally {
      setPreviewLoading(false);
    }
  };

  if (loading) {
    return <div className="et-wrapper">Loading...</div>;
  }

  return (
    <div className="et-wrapper">
      <div className="et-header">
        <div>
          <h2 className="et-title">{isEdit ? 'Edit Template' : 'Create Template'}</h2>
          <p className="et-subtitle">{isEdit ? 'Update existing email template configuration.' : 'Add a new email template to the system.'}</p>
        </div>
        <div className="et-header-actions">
          <button className="btn text-btn" onClick={() => navigate('/admin/settings/email-templates')}>Cancel</button>
          <button className="btn secondary" onClick={handlePreview}>Preview Template</button>
          <button className="btn primary" onClick={handleSubmit} disabled={saving}>
            {saving ? 'Saving...' : 'Save Template'}
          </button>
        </div>
      </div>

      {error && <div className="alert error">{error}</div>}

      <div className="et-form-layout">
        <div className="et-form-main">
          <form className="et-form" onSubmit={handleSubmit}>
            <div className="et-form-row">
              <div className="et-form-group flex-1">
                <label>Template Name *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. User Welcome Email" />
              </div>
              <div className="et-form-group flex-1">
                <label>Template Key *</label>
                <input required type="text" name="key" value={formData.key} onChange={handleKeyChange} placeholder="e.g. USER_WELCOME" />
                <span className="et-help-text">Unique identifier slug. Only uppercase letters, numbers, and underscores.</span>
              </div>
            </div>

            <div className="et-form-row">
              <div className="et-form-group flex-1">
                <label>Type</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                  <option value="html">HTML</option>
                  <option value="plain">Plain Text</option>
                </select>
              </div>
              <div className="et-form-group flex-1" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '24px' }}>
                <label className="et-switch">
                  <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
                  <span className="et-slider round"></span>
                </label>
                <label>Status (Active)</label>
              </div>
            </div>

            <div className="et-form-group">
              <label>Subject *</label>
              <input required type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Email subject line" />
            </div>

            <div className="et-form-group">
              <label>Body *</label>
              <textarea 
                required 
                name="body" 
                value={formData.body} 
                onChange={handleChange} 
                className="et-body-editor"
                rows="15"
                placeholder="Enter email body... (HTML supported)"
              />
              <span className="et-help-text">Raw HTML is supported. Use placeholders from the sidebar.</span>
            </div>
          </form>
        </div>

        {/* Placeholders Sidebar */}
        <div className="et-form-sidebar">
          <div className="et-sidebar-box">
            <h3>Dynamic Placeholders</h3>
            <p>Click on any variable to copy it to your clipboard.</p>
            {placeholders.length === 0 ? (
              <div className="text-gray-400 text-sm mt-4">No placeholders available.</div>
            ) : (
              <ul className="et-placeholder-list">
                {placeholders.map((p, idx) => (
                  <li key={idx} onClick={() => handleCopyPlaceholder(p.variable)}>
                    <code>{`{{${p.variable}}}`}</code>
                    <span>{p.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="et-modal-backdrop" onClick={() => setIsPreviewOpen(false)}>
          <div className="et-modal-dialog preview-dialog" onClick={e => e.stopPropagation()}>
            <div className="et-modal-header">
              <h3>Preview Email</h3>
              <button className="et-close-btn" onClick={() => setIsPreviewOpen(false)}>✕</button>
            </div>
            <div className="et-modal-body p-0">
              {previewLoading ? (
                <div className="p-8 text-center text-gray-500">Generating preview...</div>
              ) : (
                <div 
                  className="et-preview-container"
                  dangerouslySetInnerHTML={{ __html: previewHtml }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
