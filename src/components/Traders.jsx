import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api/config';
import DeleteModal from './DeleteModal';
import './Traders.css';

export default function Traders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Traders');
  const [tradersData, setTradersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, active: 0, premium: 0, new_this_month: 0, verified: 0 });
  const [tabStats, setTabStats] = useState({ total: 0, traders: 0, subscribers: 0, advertisers: 0, pending: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  useEffect(() => {
    // Fetch Traders Data
    setLoading(true);
    apiFetch(`/api/admin/users?role=trader&page=${currentPage}&per_page=10`)
      .then(data => {
        if (data.status && data.data && data.data.data) {
          const formatted = data.data.data.map(user => ({
            id: user.id,
            name: user.full_name || 'N/A',
            phone: user.phone_number || 'N/A',
            email: user.email || 'N/A',
            company: user.company?.name || 'N/A',
            type: user.company?.business_type || 'Trader',
            commodities: user.company?.commodities_handled?.length > 0 
                ? user.company.commodities_handled 
                : ['N/A'],
            moreComm: Math.max(0, (user.company?.commodities_handled?.length || 0) - 2),
            location: user.company?.city && user.company?.state ? `${user.company.city}, ${user.company.state}` : 'N/A',
            joinDate: new Date(user.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            status: user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Active',
            kyc: user.company?.verification_status ? user.company.verification_status.charAt(0).toUpperCase() + user.company.verification_status.slice(1) : 'Pending',
            plan: 'Basic', // Hardcoded fallback for now, as API might not provide it yet
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || 'Trader')}&background=random`
          }));
          setTradersData(formatted);
          setTotalPages(data.data.last_page || 1);
          setTotalItems(data.data.total || 0);
        }
      })
      .catch(err => console.error("Error fetching traders:", err))
      .finally(() => setLoading(false));

    // Fetch Stats
    apiFetch('/api/admin/users/stats?role=trader')
      .then(data => {
        if (data.status && data.data) {
          setStats({
            total: data.data.total || 0,
            active: data.data.active || 0,
            premium: data.data.premium || 0,
            new_this_month: data.data.new_this_month || 0,
            verified: data.data.verified || 0,
          });
        }
      })
      .catch(err => console.error("Error fetching trader stats:", err));

    // Fetch Global Stats for Tabs
    apiFetch('/api/admin/users/stats')
      .then(data => {
        if (data.status && data.data) {
          setTabStats({
            total: data.data.total || 0,
            traders: data.data.traders || 0,
            subscribers: data.data.subscribers || 0,
            advertisers: data.data.advertisers || 0,
            pending: data.data.pending || 0,
          });
        }
      })
      .catch(err => console.error("Error fetching global stats:", err));
  }, [currentPage]);

  const confirmDelete = (id) => {
    setUserToDelete(id);
    setDeleteModalOpen(true);
  };

  const executeDelete = () => {
    if (!userToDelete) return;
    apiFetch(`/api/admin/users/${userToDelete}`, { method: 'DELETE' })
      .then(res => {
        if (res.status) {
          setTradersData(tradersData.filter(t => t.id !== userToDelete));
        } else {
          alert(res.message || 'Failed to delete user');
        }
      })
      .catch(err => {
        console.error("Error deleting user:", err);
        alert("Error deleting user");
      })
      .finally(() => {
        setDeleteModalOpen(false);
        setUserToDelete(null);
      });
  };
  
  return (
    <div className="trd-page-container">
      {/* Header */}
      <div className="trd-header-area">
        <div className="trd-title-section">
          <h1 className="trd-page-title">Traders</h1>
          <p className="trd-page-subtitle">Manage all registered traders, buyers and sellers on the platform.</p>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="trd-kpi-row">
        <div className="trd-kpi-card">
          <div className="trd-kpi-icon-box" style={{ backgroundColor: '#e6f7f2', color: '#10b981' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div className="trd-kpi-info">
            <h3 className="trd-kpi-value">{stats.total}</h3>
            <p className="trd-kpi-label">Total Traders</p>
            <span className="trd-kpi-trend green">↑ +12% this month</span>
          </div>
        </div>
        
        <div className="trd-kpi-card">
          <div className="trd-kpi-icon-box" style={{ backgroundColor: '#e0f2f1', color: '#00897b' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
          </div>
          <div className="trd-kpi-info">
            <h3 className="trd-kpi-value">{stats.active}</h3>
            <p className="trd-kpi-label">Active Traders</p>
            <span className="trd-kpi-trend green">↑ +9% this month</span>
          </div>
        </div>

        <div className="trd-kpi-card">
          <div className="trd-kpi-icon-box" style={{ backgroundColor: '#fff3e0', color: '#f57c00' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 17l10 5 10-5M2 12l10 5 10-5M12 2L2 7l10 5 10-5-10-5z"></path></svg>
          </div>
          <div className="trd-kpi-info">
            <h3 className="trd-kpi-value">{stats.premium}</h3>
            <p className="trd-kpi-label">Premium Traders</p>
            <span className="trd-kpi-trend green">↑ +18% this month</span>
          </div>
        </div>

        <div className="trd-kpi-card">
          <div className="trd-kpi-icon-box" style={{ backgroundColor: '#ede9fe', color: '#8b5cf6' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
          </div>
          <div className="trd-kpi-info">
            <h3 className="trd-kpi-value">{stats.new_this_month}</h3>
            <p className="trd-kpi-label">New This Month</p>
            <span className="trd-kpi-trend green">↑ +25% this month</span>
          </div>
        </div>

        <div className="trd-kpi-card">
          <div className="trd-kpi-icon-box" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
          </div>
          <div className="trd-kpi-info">
            <h3 className="trd-kpi-value">{stats.verified}</h3>
            <p className="trd-kpi-label">Verified Traders</p>
            <span className="trd-kpi-trend green">↑ +14% this month</span>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="trd-tabs-actions-row">
        <div className="trd-tabs">
          {['All Users', 'Traders', 'Subscribers', 'Advertisers', 'Pending Verification'].map(tab => {
            const getRoute = (t) => {
              if(t === 'Traders') return '/traders';
              if(t === 'Subscribers') return '/subscribers';
              if(t === 'Advertisers') return '/advertisers';
              if(t === 'Pending Verification') return '/pending-verification';
              return '/user-list';
            };
            return (
              <button 
                key={tab} 
                className={`trd-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => navigate(getRoute(tab))}
              >
                {tab} {tab === 'All Users' ? `(${tabStats.total.toLocaleString()})` : tab === 'Traders' ? `(${tabStats.traders.toLocaleString()})` : tab === 'Subscribers' ? `(${tabStats.subscribers.toLocaleString()})` : tab === 'Advertisers' ? `(${tabStats.advertisers.toLocaleString()})` : `(${tabStats.pending.toLocaleString()})`}
              </button>
            )
          })}
        </div>
        <button className="trd-btn-add" onClick={() => navigate('/user/add')}>+ Add New Trader</button>
      </div>

      {/* Filters 2 Rows */}
      <div className="trd-filters-container">
        <div className="trd-filters-row">
          <div className="trd-search-wrapper" style={{ flex: '1.5' }}>
            <svg className="trd-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Search trader name, company, mobile or email..." className="trd-search-input" />
          </div>
          
          <select className="trd-filter-select"><option>All States</option></select>
          <select className="trd-filter-select"><option>All Cities</option></select>
          <select className="trd-filter-select"><option>All Commodities</option></select>
          <select className="trd-filter-select"><option>All Trader Types</option></select>
          <select className="trd-filter-select"><option>KYC Status</option></select>
        </div>
        
        <div className="trd-filters-row bottom-row">
          <div className="left-filters">
            <select className="trd-filter-select"><option>Subscription Plan</option></select>
            <div className="trd-date-picker">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span>Join Date Range</span>
            </div>
            <button className="trd-btn-reset">Reset</button>
          </div>
          <div className="right-filters">
            <button className="trd-btn-export">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Export ▾
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="trd-main-content">
        
        {/* Left: Table Area */}
        <div className="trd-table-area">
          <div className="trd-table-wrapper">
            <table className="trd-table">
              <thead>
                <tr>
                  <th className="trd-th-checkbox"><input type="checkbox" /></th>
                  <th className="trd-th-id">#</th>
                  <th>Trader Details</th>
                  <th>Company Name</th>
                  <th>Trader Type</th>
                  <th>Commodities</th>
                  <th>Location</th>
                  <th>Join Date ▾</th>
                  <th>Status</th>
                  <th>KYC ▾</th>
                  <th>Plan ▾</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="11" className="text-center" style={{padding: '20px'}}>Loading...</td></tr>
                ) : tradersData.length === 0 ? (
                  <tr><td colSpan="11" className="text-center" style={{padding: '20px'}}>No traders found.</td></tr>
                ) : tradersData.map((trader, index) => (
                  <tr key={trader.id}>
                    <td className="trd-td-checkbox" onClick={e => e.stopPropagation()}>
                      <input type="checkbox" />
                    </td>
                    <td className="trd-td-id">{index + 1}</td>
                    <td>
                      <div className="trd-user-cell">
                        <img src={trader.avatar} alt={trader.name} className="trd-user-avatar" />
                        <div className="trd-user-meta">
                          <span className="trd-user-name">{trader.name}</span>
                          <span className="trd-user-contact">{trader.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className="trd-company-name">{trader.company}</span></td>
                    <td>
                      <span className={`trd-badge-type ${(trader.role || trader.type || '').toLowerCase()}`}>
                        {trader.role ? (trader.role.charAt(0).toUpperCase() + trader.role.slice(1)) : trader.type}
                      </span>
                    </td>
                    <td>
                      <div className="trd-commodity-cell">
                        <span className="trd-comm-main">{trader.commodities[0]}</span>
                        {trader.commodities[1] && <span className="trd-comm-sub">{trader.commodities[1]} {trader.moreComm > 0 ? `+${trader.moreComm}` : ''}</span>}
                      </div>
                    </td>
                    <td>
                      <div className="trd-location-cell">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <span>{trader.location}</span>
                        </div>
                      </div>
                    </td>
                    <td className="trd-date-cell">{trader.joinDate}</td>
                    <td>
                      <span className={`trd-badge-status ${trader.status.toLowerCase()}`}>
                        <span className="trd-dot"></span> {trader.status}
                      </span>
                    </td>
                    <td>
                      <span className={`trd-badge-kyc ${trader.kyc.toLowerCase()}`}>
                        <span className="trd-dot"></span> {trader.kyc}
                      </span>
                    </td>
                    <td>
                      <span className={`trd-badge-plan ${trader.plan.toLowerCase()}`}>
                        {trader.plan === 'Premium' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 17l10 5 10-5M2 12l10 5 10-5M12 2L2 7l10 5 10-5-10-5z"></path></svg>}
                        {trader.plan}
                      </span>
                    </td>
                    <td className="trd-actions-cell" onClick={e => e.stopPropagation()} style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                      <button className="trd-action-btn" onClick={() => navigate(`/user/view/${trader.id}`)} title="View" style={{background:'none',border:'none',color:'#1e3a8a',cursor:'pointer',padding:'4px'}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
                      <button className="trd-action-btn" onClick={() => navigate(`/user/edit/${trader.id}`)} title="Edit" style={{background:'none',border:'none',color:'#1e3a8a',cursor:'pointer',padding:'4px'}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button className="trd-action-btn" onClick={() => confirmDelete(trader.id)} title="Delete" style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer',padding:'4px'}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="trd-pagination">
            <span className="trd-page-info">Showing {tradersData.length > 0 ? (currentPage - 1) * 10 + 1 : 0} to {Math.min(currentPage * 10, totalItems)} of {totalItems} traders</span>
            <div className="trd-page-controls">
              <button 
                className="trd-page-nav" 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >←</button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // simple pagination logic for display
                let pageNum = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = currentPage - 2 + i;
                  if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                }
                return (
                  <button 
                    key={pageNum}
                    className={`trd-page-num ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="trd-page-dots">...</span>
                  <button 
                    className="trd-page-num"
                    onClick={() => setCurrentPage(totalPages)}
                  >{totalPages}</button>
                </>
              )}
              <button 
                className="trd-page-nav"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
              >→</button>
            </div>
          </div>
        </div>
      </div>
      
      <DeleteModal 
        isOpen={deleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)} 
        onConfirm={executeDelete}
        title="Delete Trader"
        message="Are you sure you want to delete this trader? This action cannot be undone."
      />
    </div>
  );
}
