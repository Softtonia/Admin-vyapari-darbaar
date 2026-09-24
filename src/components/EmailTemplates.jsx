import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEmailTemplates, toggleEmailTemplateStatus, deleteEmailTemplate, bulkDeleteEmailTemplates } from '../api/emailTemplateApi';
import './EmailTemplates.css';

export default function EmailTemplates() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination & Filters
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Bulk Selection
  const [selectedIds, setSelectedIds] = useState([]);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  
  // Single Delete
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadTemplates();
  }, [currentPage, searchQuery, filterType]);

  const loadTemplates = async () => {
    setLoading(true);
    setError('');
    try {
      const params = { page: currentPage };
      if (searchQuery) params.search = searchQuery;
      if (filterType !== 'all') params.type = filterType;

      const res = await fetchEmailTemplates(params);
      if (res?.status) {
        setTemplates(res.data?.data || res.data || []);
        if (res.data?.last_page) {
          setTotalPages(res.data.last_page);
        }
      } else {
        setError(res?.message || 'Failed to load email templates.');
      }
    } catch (err) {
      setError(err.message || 'Error loading templates.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      setTemplates(prev => prev.map(t => t.id === id ? { ...t, is_active: newStatus } : t));
      const res = await toggleEmailTemplateStatus(id, newStatus);
      if (!res?.status) {
        // Revert on error
        setTemplates(prev => prev.map(t => t.id === id ? { ...t, is_active: currentStatus } : t));
        alert(res?.message || 'Failed to update status.');
      }
    } catch (err) {
      setTemplates(prev => prev.map(t => t.id === id ? { ...t, is_active: currentStatus } : t));
      alert(err.message || 'Error updating status.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      const res = await deleteEmailTemplate(deleteId);
      if (res?.status) {
        setDeleteId(null);
        setSelectedIds(prev => prev.filter(id => id !== deleteId));
        loadTemplates();
      } else {
        alert(res?.message || 'Failed to delete template.');
      }
    } catch (err) {
      alert(err.message || 'Error deleting template.');
    }
  };

  const handleBulkDeleteConfirm = async () => {
    if (selectedIds.length === 0) return;
    try {
      const res = await bulkDeleteEmailTemplates(selectedIds);
      if (res?.status) {
        setIsBulkDeleteModalOpen(false);
        setSelectedIds([]);
        loadTemplates();
      } else {
        alert(res?.message || 'Failed to delete templates.');
      }
    } catch (err) {
      alert(err.message || 'Error deleting templates.');
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(templates.map(t => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="et-wrapper">
      <div className="et-header">
        <div>
          <h2 className="et-title">Email Templates</h2>
          <p className="et-subtitle">Manage automated system emails and templates.</p>
        </div>
        <div className="et-header-actions">
          {selectedIds.length > 0 && (
            <button className="btn text-btn" onClick={() => setIsBulkDeleteModalOpen(true)} style={{ color: '#dc2626' }}>
              Delete Selected ({selectedIds.length})
            </button>
          )}
          <button className="btn primary" onClick={() => navigate('/admin/settings/email-templates/create')}>
            + Create Template
          </button>
        </div>
      </div>

      <div className="et-controls">
        <input 
          type="text" 
          className="et-search-input" 
          placeholder="Search templates..." 
          value={searchQuery}
          onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
        />
        <select 
          className="et-filter-select"
          value={filterType}
          onChange={e => { setFilterType(e.target.value); setCurrentPage(1); }}
        >
          <option value="all">All Types</option>
          <option value="html">HTML</option>
          <option value="plain">Plain Text</option>
        </select>
      </div>

      {error && <div className="alert error">{error}</div>}

      <div className="et-table-container">
        <table className="et-table">
          <thead>
            <tr>
              <th className="et-th-checkbox">
                <input 
                  type="checkbox" 
                  checked={templates.length > 0 && selectedIds.length === templates.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Name</th>
              <th>Key</th>
              <th>Subject</th>
              <th>Type</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="text-center py-8 text-gray-500">Loading templates...</td></tr>
            ) : templates.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-8 text-gray-500">No templates found.</td></tr>
            ) : (
              templates.map(t => (
                <tr key={t.id}>
                  <td className="et-td-checkbox">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(t.id)}
                      onChange={() => handleSelectOne(t.id)}
                    />
                  </td>
                  <td className="font-semibold text-gray-900">{t.name}</td>
                  <td><code className="et-badge-gray">{t.key}</code></td>
                  <td className="text-gray-600 truncate max-w-xs">{t.subject}</td>
                  <td>
                    <span className={`et-type-badge ${t.type === 'html' ? 'blue' : 'gray'}`}>
                      {t.type?.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <label className="et-switch">
                      <input 
                        type="checkbox" 
                        checked={!!t.is_active} 
                        onChange={() => handleToggleStatus(t.id, t.is_active)}
                      />
                      <span className="et-slider round"></span>
                    </label>
                  </td>
                  <td className="text-right et-actions-cell">
                    <button 
                      className="et-action-btn edit" 
                      onClick={() => navigate(`/admin/settings/email-templates/${t.id}/edit`)}
                      title="Edit"
                    >
                      ✎
                    </button>
                    <button 
                      className="et-action-btn delete" 
                      onClick={() => setDeleteId(t.id)}
                      title="Delete"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && totalPages > 1 && (
        <div className="et-pagination">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Single Modal */}
      {deleteId && (
        <div className="et-modal-backdrop" onClick={() => setDeleteId(null)}>
          <div className="et-modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="et-modal-header"><h3>Delete Template</h3></div>
            <div className="et-modal-body"><p>Are you sure you want to delete this template?</p></div>
            <div className="et-modal-footer">
              <button className="btn text-btn" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn primary" style={{backgroundColor: '#dc2626'}} onClick={handleDeleteConfirm}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Modal */}
      {isBulkDeleteModalOpen && (
        <div className="et-modal-backdrop" onClick={() => setIsBulkDeleteModalOpen(false)}>
          <div className="et-modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="et-modal-header"><h3>Bulk Delete Templates</h3></div>
            <div className="et-modal-body"><p>Are you sure you want to delete {selectedIds.length} templates?</p></div>
            <div className="et-modal-footer">
              <button className="btn text-btn" onClick={() => setIsBulkDeleteModalOpen(false)}>Cancel</button>
              <button className="btn primary" style={{backgroundColor: '#dc2626'}} onClick={handleBulkDeleteConfirm}>Delete All</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
