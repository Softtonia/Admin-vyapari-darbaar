import React, { useState, useEffect, useCallback } from 'react';
import commWheat from '../assets/comm_wheat.png';
import commMaize from '../assets/comm_maize.png';
import commMakhana from '../assets/comm_makhana.png';
import commChana from '../assets/comm_chana.png';
import commCotton from '../assets/comm_cotton.png';
import commRice from '../assets/comm_rice.png';
import commSoybean from '../assets/comm_soybean.png';
import newsThumb1 from '../assets/news_thumb_1.png';
import newsThumb2 from '../assets/news_thumb_2.png';
import adminAvatar from '../assets/admin_avatar.png';
import mandiBannerThumb from '../assets/mandi_banner_thumb.png';

import {
  SearchIcon,
  CalendarIcon,
  ChevronDownIcon,
  MoreVerticalIcon,
} from './Icons';
import './NewsContentCMS.css';
import NewsArticleView from './NewsArticleView';
import NewsArticleForm from './NewsArticleForm';

// API Services
import {
  getAdminNewsArticles,
  getAdminNewsCategoriesOptions,
  getAdminNewsSourcesOptions,
  deleteAdminNewsArticle,
  updateAdminNewsStatus
} from '../api/newsService';

// Minimal Custom Icons needed
const EditIcon = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
);
const EyeIcon = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const FolderIcon = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
);
const TagIcon = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
);
const UsersIconLocal = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);
const StarIcon = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);
const SettingsIconLocal = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);


export default function NewsContentCMS({ onNavigateToCategories, onNavigateToSources, onNavigateToImports }) {
  const [activeTab, setActiveTab] = useState('All Articles');
  const [viewingArticleId, setViewingArticleId] = useState(null);
  const [editingArticleId, setEditingArticleId] = useState(null);
  
  // API State
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination & Filtering State
  const [keywordSearch, setKeywordSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // delayed search
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
  const perPage = 15;

  // Handle delayed search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(keywordSearch);
      setPage(1); // reset to page 1 on search
    }, 500);
    return () => clearTimeout(timer);
  }, [keywordSearch]);

  const fetchFiltersOptions = async () => {
    try {
      const [catRes, srcRes] = await Promise.all([
        getAdminNewsCategoriesOptions(),
        getAdminNewsSourcesOptions()
      ]);
      if (catRes?.status && catRes?.data) {
        setCategories(Array.isArray(catRes.data) ? catRes.data : (catRes.data.data || []));
      }
      if (srcRes?.status && srcRes?.data) {
        setSources(Array.isArray(srcRes.data) ? srcRes.data : (srcRes.data.data || []));
      }
    } catch (err) {
      console.error('Failed to load filter options:', err);
    }
  };

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Map tabs to API status
      let statusParam = '';
      if (activeTab === 'Published') statusParam = 'published';
      if (activeTab === 'Drafts') statusParam = 'draft';
      if (activeTab === 'Scheduled') statusParam = 'scheduled';
      if (activeTab === 'Archived') statusParam = 'archived';

      const params = {
        search: searchQuery,
        status: statusParam,
        news_source_id: sourceFilter,
        news_category_id: categoryFilter,
        content_type: '',
        is_featured: '',
        is_breaking: '',
        per_page: perPage,
        page: page,
      };

      const res = await getAdminNewsArticles(params);
      if (res) {
        // If the API wraps response in { status: true, data: { ... } }, payload is res.data
        // If the API returns a Laravel Resource { data: [...], meta: {...} }, payload is res
        const payload = res.data && res.status !== undefined ? res.data : res;

        if (Array.isArray(payload)) {
          setArticles(payload);
          setMeta({ current_page: 1, last_page: 1, total: payload.length });
        } else {
          // Look for items array or data array
          const articlesArray = Array.isArray(payload.items) ? payload.items : (Array.isArray(payload.data) ? payload.data : []);
          setArticles(articlesArray);
          
          setMeta(payload.meta || payload.pagination || { 
            current_page: payload.current_page || 1, 
            last_page: payload.last_page || 1, 
            total: payload.total || articlesArray.length
          });
        }
      } else {
        throw new Error(res?.message || 'Failed to fetch articles');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [page, searchQuery, activeTab, categoryFilter, sourceFilter]);

  useEffect(() => {
    fetchFiltersOptions();
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= meta.last_page) {
      setPage(newPage);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteAdminNewsArticle(id);
        fetchArticles();
      } catch (err) {
        alert(err.message || 'Failed to delete article');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAdminNewsStatus(id, newStatus);
      fetchArticles();
    } catch (err) {
      alert(err.message || 'Failed to update status');
    }
  };

  const tabs = ['All Articles', 'Published', 'Drafts', 'Scheduled', 'Archived'];

  const kpis = [
    { label: 'Total Articles', value: meta.total || '128', trend: '+12%', color: 'emerald', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> },
    { label: 'Published', value: '96', trend: '+8%', color: 'green', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle></svg> },
    { label: 'Drafts', value: '18', trend: '+50%', color: 'amber', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> },
    { label: 'Scheduled', value: '6', trend: '+200%', color: 'blue', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> },
    { label: 'Total Views', value: '52.4K', trend: '+28%', color: 'purple', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> },
  ];

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'published': return 'status-published';
      case 'draft': return 'status-draft';
      case 'scheduled': return 'status-scheduled';
      default: return '';
    }
  };

  const getCategoryColor = (categoryName, index = 0) => {
    switch (categoryName) {
      case 'Market News': return { bg: '#e0f2fe', color: '#0284c7' };
      case 'Export Import': return { bg: '#fee2e2', color: '#dc2626' };
      case 'Government Update': return { bg: '#dcfce7', color: '#16a34a' };
      case 'Price Analysis': return { bg: '#ffedd5', color: '#ea580c' };
      case 'Global Market': return { bg: '#e0e7ff', color: '#4f46e5' };
      case 'Expert Opinion': return { bg: '#fce7f3', color: '#db2777' };
      case 'Trade Insights': return { bg: '#f3e8ff', color: '#9333ea' };
      default: 
        const colors = ['#3b82f6', '#f97316', '#ef4444', '#d946ef', '#ec4899', '#f43f5e', '#ea580c', '#f59e0b', '#10b981'];
        return { bg: '#f3f4f6', color: colors[index % colors.length] };
    }
  };

  const getThumbImage = (imgUrl) => {
    return imgUrl || newsThumb1;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  if (editingArticleId) {
    return (
      <NewsArticleForm 
        articleId={editingArticleId} 
        onBack={() => { setEditingArticleId(null); fetchArticles(); }} 
        categories={categories}
        sources={sources}
      />
    );
  }

  if (viewingArticleId) {
    return <NewsArticleView articleId={viewingArticleId} onBack={() => setViewingArticleId(null)} onEdit={(id) => setEditingArticleId(id)} />;
  }

  return (
    <div className="na-container">
      {/* HEADER SECTION */}
      <div className="na-header">
        <div className="na-header-left">
          <h1 className="na-title">News & Articles</h1>
          <p className="na-subtitle">Manage market news, expert articles, insights and updates for the commodity trading community.</p>
        </div>
        <div className="na-header-right">
          <div className="na-banner">
             <div className="na-banner-text">
               <span className="quote-text">"Knowledge<br/>Today,<br/>Better Trades<br/>Tomorrow."</span>
             </div>
             <div className="na-banner-img-wrap">
               <img src={mandiBannerThumb} alt="Banner" className="na-banner-img" onError={(e) => { e.target.style.display = 'none'; }} />
             </div>
             <div className="na-banner-tags">
                <span className="tag-red">TRADE</span>
                <span className="tag-red">INFORM</span>
                <span className="tag-red">CONNECT</span>
                <span className="tag-red">GROW</span>
             </div>
          </div>
        </div>
      </div>

      {/* KPI SECTION */}
      <div className="na-kpi-row">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="na-kpi-card">
            <div className="na-kpi-top">
              <div className={`na-icon-box ${kpi.color}`}>
                {kpi.icon}
              </div>
              <div className="na-kpi-info">
                <span className="na-kpi-val">{kpi.value}</span>
                <span className="na-kpi-label">{kpi.label}</span>
              </div>
            </div>
            <div className="na-kpi-bottom">
              <span className="na-kpi-trend">↑ {kpi.trend} this month</span>
            </div>
          </div>
        ))}
      </div>

      {/* TABS SECTION */}
      <div className="na-tabs-row">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`na-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => { setActiveTab(tab); setPage(1); }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* MAIN LAYOUT SPLIT */}
      <div className="na-main-split">
        
        {/* LEFT CONTENT */}
        <div className="na-left-content">
          
          {/* FILTER TOOLBAR */}
          <div className="na-filter-toolbar">
            <div className="na-filter-group na-search-group">
              <SearchIcon size={16} color="#9ca3af" />
              <input
                type="text"
                placeholder="Search articles by title, content or tags..."
                value={keywordSearch}
                onChange={(e) => setKeywordSearch(e.target.value)}
              />
              <div className="shortcut">Ctrl + K</div>
            </div>

            <div className="na-filter-dropdowns">
              <select 
                className="na-dropdown" 
                value={categoryFilter} 
                onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              <select 
                className="na-dropdown" 
                value={sourceFilter} 
                onChange={(e) => { setSourceFilter(e.target.value); setPage(1); }}
              >
                <option value="">All Sources</option>
                {sources.map(src => (
                  <option key={src.id} value={src.id}>{src.name}</option>
                ))}
              </select>

              <div className="na-dropdown">
                <span>All Authors</span>
                <ChevronDownIcon size={14} color="#6b7280" />
              </div>
              <div className="na-dropdown na-date-dropdown">
                <CalendarIcon size={14} color="#6b7280" />
                <span>Select Date Range</span>
              </div>
            </div>
          </div>

          {/* DATA TABLE */}
          <div className="na-table-card">
            <div className="na-table-wrapper">
              <table className="na-data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title <span className="sort-icon">⇅</span></th>
                    <th>Category</th>
                    <th>Source</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Views <span className="sort-icon">⇅</span></th>
                    <th>Status <span className="sort-icon">⇅</span></th>
                    <th className="th-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="9" style={{ textAlign: 'center', padding: '40px' }}>Loading articles...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: 'red' }}>Error: {error}</td>
                    </tr>
                  ) : articles.length === 0 ? (
                    <tr>
                      <td colSpan="9" style={{ textAlign: 'center', padding: '40px' }}>No articles found.</td>
                    </tr>
                  ) : (
                    articles.map((item, index) => {
                      const rowNumber = (meta.current_page - 1) * perPage + index + 1;
                      const categoryName = item.category?.name || 'Uncategorized';
                      const sourceName = item.source?.name || 'Vyapari Darbaar';
                      return (
                        <tr key={item.id}>
                          <td className="td-id">{rowNumber}</td>
                          <td className="td-title">
                            <div className="title-cell">
                              <img src={getThumbImage(item.featured_image)} alt="" className="item-thumb" />
                              <span className="item-title">{item.title}</span>
                            </div>
                          </td>
                          <td className="td-category">
                            <span className="cat-pill" style={{ backgroundColor: getCategoryColor(categoryName).bg, color: getCategoryColor(categoryName).color }}>
                              {categoryName}
                            </span>
                          </td>
                          <td className="td-commodity">
                            <span className="comm-text">{sourceName}</span>
                          </td>
                          <td className="td-author">
                            <div className="author-cell">
                              <img src={adminAvatar} alt="" className="author-avatar" />
                              <span className="author-name">{item.author_name || 'Admin'}</span>
                            </div>
                          </td>
                          <td className="td-date">{formatDate(item.published_at || item.created_at)}</td>
                          <td className="td-views">
                            <div className="views-cell">
                              <EyeIcon size={12} color="#026544" />
                              <span>{item.view_count || '0'}</span>
                            </div>
                          </td>
                          <td className="td-status">
                            <select 
                              className={`status-pill ${getStatusClass(item.status)}`}
                              value={item.status}
                              onChange={(e) => handleStatusChange(item.id, e.target.value)}
                              style={{ paddingRight: '20px', border: '1px solid #e5e7eb', appearance: 'none', cursor: 'pointer' }}
                            >
                              <option value="published">Published</option>
                              <option value="draft">Draft</option>
                              <option value="scheduled">Scheduled</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                          <td className="td-actions">
                            <div className="action-btns">
                              <button className="action-btn" title="Edit" onClick={() => setEditingArticleId(item.id)}><EditIcon size={14} color="#6b7280" /></button>
                              <button className="action-btn" title="View" onClick={() => setViewingArticleId(item.id)}><EyeIcon size={14} color="#6b7280" /></button>
                              <button className="action-btn" title="Delete" onClick={() => handleDelete(item.id)}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="na-pagination-row">
              <span className="pagination-info">
                Showing {articles.length > 0 ? (meta.current_page - 1) * perPage + 1 : 0} to {Math.min(meta.current_page * perPage, meta.total)} of {meta.total} articles
              </span>
              <div className="pagination-nav">
                <button 
                  className="page-nav-btn" 
                  disabled={meta.current_page === 1}
                  onClick={() => handlePageChange(meta.current_page - 1)}
                >←</button>
                
                {Array.from({ length: Math.min(5, meta.last_page) }, (_, i) => {
                  let pageNum = i + 1;
                  if (meta.current_page > 3 && meta.last_page > 5) {
                    pageNum = meta.current_page - 2 + i;
                    if (pageNum > meta.last_page) pageNum = meta.last_page - (4 - i);
                  }
                  return (
                    <button 
                      key={pageNum}
                      className={`page-num-btn ${meta.current_page === pageNum ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {meta.last_page > 5 && meta.current_page < meta.last_page - 2 && (
                  <>
                    <span className="page-ellipsis">...</span>
                    <button 
                      className="page-num-btn"
                      onClick={() => handlePageChange(meta.last_page)}
                    >{meta.last_page}</button>
                  </>
                )}
                
                <button 
                  className="page-nav-btn"
                  disabled={meta.current_page === meta.last_page || meta.last_page === 0}
                  onClick={() => handlePageChange(meta.current_page + 1)}
                >→</button>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="na-right-sidebar">
          <button className="btn-create-article" onClick={() => setEditingArticleId('new')}>
            + Create New Article
          </button>

          <div className="na-sidebar-menu">
            <button type="button" className="na-menu-item" onClick={onNavigateToCategories} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '12px 16px' }}>
              <FolderIcon size={16} color="#026544" />
              <span>Manage Categories</span>
            </button>
            <button type="button" className="na-menu-item" onClick={onNavigateToSources} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '12px 16px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px' }}>📰</span>
              <span>Manage Sources</span>
            </button>
            <button type="button" className="na-menu-item" onClick={onNavigateToImports} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '12px 16px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px' }}>⚡</span>
              <span>Automated Imports</span>
            </button>
          </div>

          <div className="na-categories-card">
            <div className="na-cat-header">
              <h3>Article Categories</h3>
              <button type="button" onClick={onNavigateToCategories} style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>Manage →</button>
            </div>
            <div className="na-cat-list">
              {categories.length === 0 ? (
                <div style={{ padding: '12px', textAlign: 'center', color: '#6b7280', fontSize: '13px' }}>No categories found</div>
              ) : (
                categories.slice(0, 8).map((cat, idx) => (
                  <div key={cat.id} className="na-cat-row">
                    <div className="na-cat-name">
                      <span className="dot" style={{ backgroundColor: getCategoryColor(cat.name, idx).color }}></span>
                      <span>{cat.name}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="na-pro-tip">
            <div className="tip-header">
              <span className="tip-icon">💡</span>
              <h4>Pro Tip</h4>
            </div>
            <p>Regular, high-quality content helps build trust, improve SEO, and keep traders engaged on your platform.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
