import React, { useState, useEffect } from 'react';
import { 
  getAdminNewsSources, 
  createAdminNewsSource, 
  updateAdminNewsSource, 
  deleteAdminNewsSource 
} from '../api/newsService';
import './NewsManageCategories.css'; // Reusing the same CSS file since layout is identical

// Minimal Custom Icons
const ArrowLeftIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);
const SearchIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const EditIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
);
const MoreIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
);
const FileIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
);
const InfoIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
);
const CheckCircleIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

export default function NewsManageSources({ onBack }) {
  const [sources, setSources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [originalCode, setOriginalCode] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    website_url: '',
    description: '',
    sort_order: 0,
    status: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState({ text: '', type: '' });

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sourceToDelete, setSourceToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    try {
      setIsLoading(true);
      const res = await getAdminNewsSources({ per_page: 50 });
      const payload = res.data?.items || res.data?.data || res.data || [];
      setSources(Array.isArray(payload) ? payload : []);
    } catch (err) {
      console.error('Failed to load sources', err);
      showToast(err.message || 'Failed to load sources', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (text, type = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg({ text: '', type: '' }), 4000);
  };

  const handleEditClick = (src) => {
    setEditingId(src.id);
    setOriginalCode(src.code || '');
    setFormData({
      name: src.name || '',
      code: src.code || '',
      website_url: src.website_url || '',
      description: src.description || '',
      sort_order: src.sort_order || 0,
      status: src.status !== undefined ? !!src.status : true,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', code: '', website_url: '', description: '', sort_order: 0, status: true });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = { ...formData };
      if (editingId) {
        // Prevent unique constraint bug on backend if code hasn't changed
        if (payload.code === originalCode) {
          delete payload.code;
        }
        await updateAdminNewsSource(editingId, payload);
        showToast('Source updated successfully!');
      } else {
        await createAdminNewsSource(payload);
        showToast('Source created successfully!');
      }
      handleCancelEdit();
      fetchSources();
    } catch (err) {
      showToast(err.message || 'Failed to save source', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = (src) => {
    setSourceToDelete(src);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!sourceToDelete) return;
    setIsDeleting(true);
    try {
      await deleteAdminNewsSource(sourceToDelete.id);
      setIsDeleteModalOpen(false);
      setSourceToDelete(null);
      showToast('Source deleted successfully!');
      fetchSources();
    } catch (err) {
      showToast(err.message || 'Failed to delete source', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSourceToDelete(null);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Filtered Sources
  const filteredSources = sources.filter(c => {
    if (statusFilter === 'active' && !c.status) return false;
    if (statusFilter === 'inactive' && c.status) return false;
    if (searchQuery && !c.name?.toLowerCase().includes(searchQuery.toLowerCase()) && !c.code?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Derived KPIs
  const totalSources = sources.length;
  const activeSources = sources.filter(c => c.status).length;
  const inactiveSources = sources.filter(c => !c.status).length;

  return (
    <div className="cat-container">
      {/* TOAST NOTIFICATION */}
      {toastMsg.text && (
        <div className={`cat-toast ${toastMsg.type}`}>
          <div className="cat-toast-icon">
            {toastMsg.type === 'error' ? '⚠' : '✓'}
          </div>
          <span>{toastMsg.text}</span>
        </div>
      )}
      
      {/* HEADER */}
      <div className="cat-header">
        <button className="cat-back-btn" onClick={onBack}>
          <ArrowLeftIcon size={14} /> Back to News & Articles
        </button>
        <div className="cat-title-block">
          <div className="cat-title-text">
            <h1>Manage News Sources</h1>
            <p>Manage the list of official news agencies, government portals, and media sources.</p>
          </div>
        </div>
      </div>

      {/* KPI ROW */}
      <div className="cat-kpi-row">
        <div className="cat-kpi-card">
          <div className="cat-kpi-icon green-bg"><FileIcon size={18} color="#059669" /></div>
          <div className="cat-kpi-data">
            <span className="cat-kpi-val">{totalSources}</span>
            <span className="cat-kpi-label">Total Sources</span>
          </div>
        </div>
        <div className="cat-kpi-card">
          <div className="cat-kpi-icon blue-bg"><CheckCircleIcon size={18} color="#2563eb" /></div>
          <div className="cat-kpi-data">
            <span className="cat-kpi-val">{activeSources}</span>
            <span className="cat-kpi-label">Active Sources</span>
          </div>
        </div>
        <div className="cat-kpi-card">
          <div className="cat-kpi-icon orange-bg"><FileIcon size={18} color="#d97706" /></div>
          <div className="cat-kpi-data">
            <span className="cat-kpi-val">{inactiveSources}</span>
            <span className="cat-kpi-label">Inactive Sources</span>
          </div>
        </div>
      </div>

      <div className="cat-main-layout">
        
        {/* LEFT COLUMN: TABLE */}
        <div className="cat-left-col">
          <div className="cat-table-toolbar">
            <div className="cat-search-box">
              <SearchIcon size={14} color="#6b7280" />
              <input type="text" placeholder="Search sources..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <select className="cat-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="cat-table-wrapper">
            <table className="cat-table">
              <thead>
                <tr>
                  <th width="5%">#</th>
                  <th width="15%">Code</th>
                  <th width="30%">Source Name</th>
                  <th width="20%">Website</th>
                  <th width="10%">Status</th>
                  <th width="12%">Created Date</th>
                  <th width="8%">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan="7" style={{textAlign:'center', padding:'20px'}}>Loading...</td></tr>
                ) : filteredSources.length === 0 ? (
                  <tr><td colSpan="7" style={{textAlign:'center', padding:'20px'}}>No sources found.</td></tr>
                ) : (
                  filteredSources.map((src, idx) => (
                    <tr key={src.id}>
                      <td>{idx + 1}</td>
                      <td><strong>{src.code || '-'}</strong></td>
                      <td>
                        <div className="cat-name-cell">
                          <span>{src.name}</span>
                        </div>
                      </td>
                      <td>
                        {src.website_url ? (
                          <a href={src.website_url} target="_blank" rel="noreferrer" style={{color: '#2563eb', textDecoration: 'none'}}>Link ⧉</a>
                        ) : '-'}
                      </td>
                      <td>
                        {src.status ? (
                          <span className="cat-status active"><span className="dot"></span> Active</span>
                        ) : (
                          <span className="cat-status inactive"><span className="dot"></span> Inactive</span>
                        )}
                      </td>
                      <td>{formatDate(src.created_at)}</td>
                      <td>
                        <div className="cat-actions">
                          <button className="cat-action-btn edit" onClick={() => handleEditClick(src)}>
                            <EditIcon size={12} /> Edit
                          </button>
                          <button className="cat-action-btn delete" onClick={() => handleDeleteClick(src)}>
                            <MoreIcon size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: FORM */}
        <div className="cat-right-sidebar">
          <div className="cat-form-card">
            <div className="cat-form-header">
              <h3>{editingId ? '✎ Edit Source' : '+ Add New Source'}</h3>
            </div>
            <form className="cat-form" onSubmit={handleFormSubmit}>
              
              <div className="cform-group">
                <label>Source Name <span className="req">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="e.g. Press Information Bureau" required />
              </div>

              <div className="cform-group">
                <label>Code</label>
                <input type="text" name="code" value={formData.code} onChange={handleFormChange} placeholder="e.g. PIB" />
              </div>

              <div className="cform-group">
                <label>Website URL</label>
                <input type="url" name="website_url" value={formData.website_url} onChange={handleFormChange} placeholder="https://..." />
              </div>

              <div className="cform-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleFormChange} rows="3" placeholder="Brief description..."></textarea>
              </div>

              <div className="cform-group">
                <label>Status</label>
                <div className="cform-status-toggle">
                  <label className="switch">
                    <input type="checkbox" name="status" checked={formData.status} onChange={handleFormChange} />
                    <span className="slider round"></span>
                  </label>
                  <span className="cform-status-text">{formData.status ? 'Active' : 'Inactive'}</span>
                </div>
              </div>

              <div className="cform-actions">
                <button type="button" className="cform-btn-cancel" onClick={handleCancelEdit}>Cancel</button>
                <button type="submit" className="cform-btn-save" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Source'}
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>

      {/* DELETE MODAL */}
      {isDeleteModalOpen && (
        <div className="cat-modal-overlay">
          <div className="cat-modal-content">
            <div className="cat-modal-header">
              <h3>Delete Source</h3>
            </div>
            <div className="cat-modal-body">
              <p>Are you sure you want to delete the source <strong>"{sourceToDelete?.name}"</strong>?</p>
              <p className="cat-modal-warning">This action cannot be undone.</p>
            </div>
            <div className="cat-modal-footer">
              <button className="cat-btn-cancel" onClick={cancelDelete} disabled={isDeleting}>Cancel</button>
              <button className="cat-btn-confirm-delete" onClick={confirmDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete Source'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
