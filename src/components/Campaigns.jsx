import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCampaigns, toggleCampaignStatus, deleteCampaign, bulkDeleteCampaigns } from '../api/campaignApi';
import { fetchEmailTemplates } from '../api/emailTemplateApi';
import './Campaigns.css';

export default function Campaigns() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
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

  const [templatesMap, setTemplatesMap] = useState({});

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const res = await fetchEmailTemplates({});
      if (res?.status) {
        const list = res.data?.data || res.data || [];
        const map = {};
        list.forEach(t => { map[t.id] = t.name; });
        setTemplatesMap(map);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, [currentPage, searchQuery, filterType]);

  const loadCampaigns = async () => {
    setLoading(true);
    setError('');
    try {
      const params = { page: currentPage };
      if (searchQuery) params.search = searchQuery;
      if (filterType !== 'all') params.send_type = filterType;

      const res = await fetchCampaigns(params);
      if (res?.status) {
        setCampaigns(res.data?.data || res.data || []);
        if (res.data?.last_page) {
          setTotalPages(res.data.last_page);
        }
      } else {
        setError(res?.message || 'Failed to load campaigns.');
      }
    } catch (err) {
      setError(err.message || 'Error loading campaigns.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      setCampaigns(prev => prev.map(c => c.id === id ? { ...c, is_active: newStatus } : c));
      const res = await toggleCampaignStatus(id, newStatus);
      if (!res?.status) {
        setCampaigns(prev => prev.map(c => c.id === id ? { ...c, is_active: currentStatus } : c));
        alert(res?.message || 'Failed to update status.');
      }
    } catch (err) {
      setCampaigns(prev => prev.map(c => c.id === id ? { ...c, is_active: currentStatus } : c));
      alert(err.message || 'Error updating status.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      const res = await deleteCampaign(deleteId);
      if (res?.status) {
        setDeleteId(null);
        setSelectedIds(prev => prev.filter(id => id !== deleteId));
        loadCampaigns();
      } else {
        alert(res?.message || 'Failed to delete campaign.');
      }
    } catch (err) {
      alert(err.message || 'Error deleting campaign.');
    }
  };

  const handleBulkDeleteConfirm = async () => {
    if (selectedIds.length === 0) return;
    try {
      const res = await bulkDeleteCampaigns(selectedIds);
      if (res?.status) {
        setIsBulkDeleteModalOpen(false);
        setSelectedIds([]);
        loadCampaigns();
      } else {
        alert(res?.message || 'Failed to delete campaigns.');
      }
    } catch (err) {
      alert(err.message || 'Error deleting campaigns.');
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(campaigns.map(c => c.id));
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

  const renderEventOrSchedule = (c) => {
    if (c.send_type === 'trigger') return <span className="text-gray-600">Event: {c.event}</span>;
    if (c.send_type === 'schedule') return <span className="text-gray-600">Time: {c.scheduled_at ? new Date(c.scheduled_at).toLocaleString('en-GB') : '-'}</span>;
    return <span className="text-gray-400">Immediate</span>;
  };

  return (
    <div className="camp-wrapper">
      <div className="camp-header">
        <div>
          <h2 className="camp-title">Email Campaigns</h2>
          <p className="camp-subtitle">Automate and schedule your email communications.</p>
        </div>
        <div className="camp-header-actions">
          {selectedIds.length > 0 && (
            <button className="camp-btn-text" onClick={() => setIsBulkDeleteModalOpen(true)} style={{ color: '#dc2626' }}>
              Delete Selected ({selectedIds.length})
            </button>
          )}
          <button className="camp-btn-primary" onClick={() => navigate('/admin/settings/campaigns/create')}>
            + Create Campaign
          </button>
        </div>
      </div>

      <div className="camp-controls">
        <input 
          type="text" 
          className="camp-search-input" 
          placeholder="Search campaigns..." 
          value={searchQuery}
          onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
        />
        <select 
          className="camp-filter-select"
          value={filterType}
          onChange={e => { setFilterType(e.target.value); setCurrentPage(1); }}
        >
          <option value="all">All Types</option>
          <option value="now">Sent Now</option>
          <option value="schedule">Scheduled</option>
          <option value="trigger">Trigger Based</option>
        </select>
      </div>

      {error && <div className="alert error">{error}</div>}

      <div className="camp-table-container">
        <table className="camp-table">
          <thead>
            <tr>
              <th className="camp-th-checkbox">
                <input 
                  type="checkbox" 
                  checked={campaigns.length > 0 && selectedIds.length === campaigns.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Campaign Name</th>
              <th>Email Template</th>
              <th>Sending Type</th>
              <th>Event / Schedule</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="text-center py-8 text-gray-500">Loading campaigns...</td></tr>
            ) : campaigns.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-8 text-gray-500">No campaigns found.</td></tr>
            ) : (
              campaigns.map(c => (
                <tr key={c.id}>
                  <td className="camp-td-checkbox">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(c.id)}
                      onChange={() => handleSelectOne(c.id)}
                    />
                  </td>
                  <td className="font-semibold text-gray-900">{c.name}</td>
                  <td className="text-gray-600">
                    {c.email_template?.name || c.template?.name || c.emailTemplate?.name || templatesMap[c.email_template_id] || `ID: ${c.email_template_id}`}
                  </td>
                  <td>
                    <span className={`camp-badge-type ${c.send_type}`}>
                      {c.send_type?.toUpperCase()}
                    </span>
                  </td>
                  <td>{renderEventOrSchedule(c)}</td>
                  <td>
                    <label className="camp-switch">
                      <input 
                        type="checkbox" 
                        checked={!!c.is_active} 
                        onChange={() => handleToggleStatus(c.id, c.is_active)}
                      />
                      <span className="camp-slider round"></span>
                    </label>
                  </td>
                  <td className="text-right camp-actions-cell">
                    <button 
                      className="camp-action-btn edit" 
                      onClick={() => navigate(`/admin/settings/campaigns/${c.id}/edit`)}
                      title="Edit"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button 
                      className="camp-action-btn delete" 
                      onClick={() => setDeleteId(c.id)}
                      title="Delete"
                    >
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
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
        <div className="camp-modal-backdrop" onClick={() => setDeleteId(null)}>
          <div className="camp-modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="camp-modal-header"><h3>Delete Campaign</h3></div>
            <div className="camp-modal-body"><p>Are you sure you want to delete this campaign? This action cannot be undone.</p></div>
            <div className="camp-modal-footer">
              <button className="camp-btn-text" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="camp-btn-danger" onClick={handleDeleteConfirm}>Delete Campaign</button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Modal */}
      {isBulkDeleteModalOpen && (
        <div className="camp-modal-backdrop" onClick={() => setIsBulkDeleteModalOpen(false)}>
          <div className="camp-modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="camp-modal-header"><h3>Bulk Delete Campaigns</h3></div>
            <div className="camp-modal-body"><p>Are you sure you want to delete {selectedIds.length} campaigns? This action cannot be undone.</p></div>
            <div className="camp-modal-footer">
              <button className="camp-btn-text" onClick={() => setIsBulkDeleteModalOpen(false)}>Cancel</button>
              <button className="camp-btn-danger" onClick={handleBulkDeleteConfirm}>Delete All</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
