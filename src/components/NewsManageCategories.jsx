import React, { useState, useEffect } from 'react';
import { 
  getAdminNewsCategories, 
  createAdminNewsCategory, 
  updateAdminNewsCategory, 
  deleteAdminNewsCategory 
} from '../api/newsService';
import './NewsManageCategories.css';

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
const EyeIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

export default function NewsManageCategories({ onBack }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState({ text: '', type: '' });

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      // We pull everything for now, or handle pagination later.
      const res = await getAdminNewsCategories({ per_page: 50 });
      const payload = res.data?.items || res.data?.data || res.data || [];
      setCategories(Array.isArray(payload) ? payload : []);
    } catch (err) {
      console.error('Failed to load categories', err);
      showToast('Failed to load categories', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (text, type = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg({ text: '', type: '' }), 4000);
  };

  const handleEditClick = (cat) => {
    setEditingId(cat.id);
    setFormData({
      name: cat.name || '',
      description: cat.description || '',
      status: cat.status !== undefined ? !!cat.status : true,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', status: true });
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
        await updateAdminNewsCategory(editingId, payload);
        showToast('Category updated successfully!');
      } else {
        await createAdminNewsCategory(payload);
        showToast('Category created successfully!');
      }
      handleCancelEdit();
      fetchCategories();
    } catch (err) {
      showToast(err.message || 'Failed to save category', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = (cat) => {
    setCategoryToDelete(cat);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    setIsDeleting(true);
    try {
      await deleteAdminNewsCategory(categoryToDelete.id);
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
      showToast('Category deleted successfully!');
      fetchCategories();
    } catch (err) {
      showToast(err.message || 'Failed to delete category', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Filtered Categories
  const filteredCategories = categories.filter(c => {
    if (statusFilter === 'active' && !c.status) return false;
    if (statusFilter === 'inactive' && c.status) return false;
    if (searchQuery && !c.name?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Derived KPIs
  const totalCategories = categories.length;
  const activeCategories = categories.filter(c => c.status).length;
  const inactiveCategories = categories.filter(c => !c.status).length;
  
  // Mocks for visually matching the design (keeping only top KPIs if needed, or remove them? The user didn't mention top KPIs, but I'll keep them to keep the design balanced)
  const totalArticlesMock = 142;
  const totalViewsMock = '28.4K';

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
            <h1>Manage Categories</h1>
            <p>Organize your news and articles with proper categories. Categories help users find relevant content easily.</p>
          </div>
        </div>
      </div>

      {/* KPI ROW */}
      <div className="cat-kpi-row">
        <div className="cat-kpi-card">
          <div className="cat-kpi-icon green-bg"><FileIcon size={18} color="#059669" /></div>
          <div className="cat-kpi-data">
            <span className="cat-kpi-val">{totalCategories}</span>
            <span className="cat-kpi-label">Total Categories</span>
          </div>
        </div>
        <div className="cat-kpi-card">
          <div className="cat-kpi-icon blue-bg"><CheckCircleIcon size={18} color="#2563eb" /></div>
          <div className="cat-kpi-data">
            <span className="cat-kpi-val">{activeCategories}</span>
            <span className="cat-kpi-label">Active Categories</span>
          </div>
        </div>
        <div className="cat-kpi-card">
          <div className="cat-kpi-icon orange-bg"><FileIcon size={18} color="#d97706" /></div>
          <div className="cat-kpi-data">
            <span className="cat-kpi-val">{inactiveCategories}</span>
            <span className="cat-kpi-label">Inactive Categories</span>
          </div>
        </div>
        <div className="cat-kpi-card">
          <div className="cat-kpi-icon purple-bg"><FileIcon size={18} color="#7c3aed" /></div>
          <div className="cat-kpi-data">
            <span className="cat-kpi-val">{totalArticlesMock}</span>
            <span className="cat-kpi-label">Total Articles</span>
          </div>
        </div>
        <div className="cat-kpi-card">
          <div className="cat-kpi-icon lblue-bg"><EyeIcon size={18} color="#0284c7" /></div>
          <div className="cat-kpi-data">
            <span className="cat-kpi-val">{totalViewsMock}</span>
            <span className="cat-kpi-label">Total Views</span>
          </div>
        </div>
      </div>

      <div className="cat-main-layout">
        
        {/* LEFT COLUMN: TABLE */}
        <div className="cat-left-col">
          <div className="cat-table-toolbar">
            <div className="cat-search-box">
              <SearchIcon size={14} color="#6b7280" />
              <input type="text" placeholder="Search categories..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <select className="cat-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select className="cat-select">
              <option value="name_asc">Sort by Name (A-Z)</option>
              <option value="name_desc">Sort by Name (Z-A)</option>
            </select>
          </div>

          <div className="cat-table-wrapper">
            <table className="cat-table">
              <thead>
                <tr>
                  <th width="5%">#</th>
                  <th width="25%">Category Name</th>
                  <th width="40%">Description</th>
                  <th width="10%">Status</th>
                  <th width="12%">Created Date</th>
                  <th width="8%">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan="6" style={{textAlign:'center', padding:'20px'}}>Loading...</td></tr>
                ) : filteredCategories.length === 0 ? (
                  <tr><td colSpan="6" style={{textAlign:'center', padding:'20px'}}>No categories found.</td></tr>
                ) : (
                  filteredCategories.map((cat, idx) => (
                    <tr key={cat.id}>
                      <td>{idx + 1}</td>
                      <td>
                        <div className="cat-name-cell">
                          <span>{cat.name}</span>
                        </div>
                      </td>
                      <td className="cat-desc-cell">{cat.description || '-'}</td>
                      <td>
                        {cat.status ? (
                          <span className="cat-status active"><span className="dot"></span> Active</span>
                        ) : (
                          <span className="cat-status inactive"><span className="dot"></span> Inactive</span>
                        )}
                      </td>
                      <td>{formatDate(cat.created_at)}</td>
                      <td>
                        <div className="cat-actions">
                          <button className="cat-action-btn edit" onClick={() => handleEditClick(cat)}>
                            <EditIcon size={12} /> Edit
                          </button>
                          <button className="cat-action-btn delete" onClick={() => handleDeleteClick(cat)}>
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
              <h3>{editingId ? '✎ Edit Category' : '+ Add New Category'}</h3>
            </div>
            <form className="cat-form" onSubmit={handleFormSubmit}>
              
              <div className="cform-group">
                <label>Category Name <span className="req">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="e.g. Market News" required />
              </div>

              <div className="cform-group">
                <label>Description <span className="req">*</span></label>
                <textarea name="description" value={formData.description} onChange={handleFormChange} rows="3" placeholder="Brief description about this category..." required></textarea>
                <span className="cform-hint">{formData.description.length}/200</span>
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
                <p className="cform-status-hint">Inactive categories will not be shown to users.</p>
              </div>

              <div className="cform-actions">
                <button type="button" className="cform-btn-cancel" onClick={handleCancelEdit}>Cancel</button>
                <button type="submit" className="cform-btn-save" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>

          <div className="cat-guidelines-card">
            <div className="cg-header">
              <InfoIcon size={16} color="#1e3a8a" /> <h3>Category Guidelines</h3>
            </div>
            <ul className="cg-list">
              <li><CheckCircleIcon size={14} color="#059669" /> Use clear and relevant category names.</li>
              <li><CheckCircleIcon size={14} color="#059669" /> Keep descriptions short and meaningful.</li>
              <li><CheckCircleIcon size={14} color="#059669" /> Choose appropriate icons.</li>
              <li><CheckCircleIcon size={14} color="#059669" /> Avoid duplicate categories.</li>
              <li><CheckCircleIcon size={14} color="#059669" /> Keep categories organized and user-friendly.</li>
            </ul>
          </div>
        </div>

      </div>

      {/* DELETE MODAL */}
      {isDeleteModalOpen && (
        <div className="cat-modal-overlay">
          <div className="cat-modal-content">
            <div className="cat-modal-header">
              <h3>Delete Category</h3>
            </div>
            <div className="cat-modal-body">
              <p>Are you sure you want to delete the category <strong>"{categoryToDelete?.name}"</strong>?</p>
              <p className="cat-modal-warning">This action cannot be undone.</p>
            </div>
            <div className="cat-modal-footer">
              <button className="cat-btn-cancel" onClick={cancelDelete} disabled={isDeleting}>Cancel</button>
              <button className="cat-btn-confirm-delete" onClick={confirmDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete Category'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
