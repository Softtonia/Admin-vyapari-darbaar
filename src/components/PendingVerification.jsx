import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api/config';
import DeleteModal from './DeleteModal';
import './PendingVerification.css';

// Mock Data for Pending Verification
const pendingData = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh.trader@gmail.com', phone: '+91 98765 43210', userType: 'Trader', company: 'Rajesh Agro Traders', appliedOn: '17 Sep 2026', docsStatus: '3/4 Uploaded', kycStatus: 'Not Verified', status: 'Pending Review', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Priya Singh', email: 'priya.singh@agrotraders.in', phone: '+91 98765 43211', userType: 'Subscriber', company: 'PS Commodities', appliedOn: '16 Sep 2026', docsStatus: '4/4 Uploaded', kycStatus: 'Under Review', status: 'Pending Review', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Amit Sharma', email: 'amit@krishiworld.com', phone: '+91 98765 43212', userType: 'Trader', company: 'Krishi World', appliedOn: '15 Sep 2026', docsStatus: '2/4 Uploaded', kycStatus: 'Not Verified', status: 'Pending Review', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Neha Verma', email: 'neha.verma@gmail.com', phone: '+91 98765 43213', userType: 'Advertiser', company: 'Seed Mart', appliedOn: '14 Sep 2026', docsStatus: '4/4 Uploaded', kycStatus: 'Verified', status: 'Pending Approval', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'Sandeep Yadav', email: 'sandeep@yadavtrading.in', phone: '+91 98765 43214', userType: 'Trader', company: 'Yadav Trading', appliedOn: '13 Sep 2026', docsStatus: '3/4 Uploaded', kycStatus: 'Under Review', status: 'Pending Review', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: 6, name: 'Kavita Rao', email: 'kavita@spicesindia.com', phone: '+91 98765 43215', userType: 'Subscriber', company: 'Spices India', appliedOn: '12 Sep 2026', docsStatus: '4/4 Uploaded', kycStatus: 'Verified', status: 'Pending Approval', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: 7, name: 'Rohit Mehta', email: 'rohit.mehta@gmail.com', phone: '+91 98765 43216', userType: 'Advertiser', company: 'Mehta Commodities', appliedOn: '11 Sep 2026', docsStatus: '1/4 Uploaded', kycStatus: 'Not Verified', status: 'Pending Review', avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: 8, name: 'Anjali Gupta', email: 'anjali@foodpro.in', phone: '+91 98765 43217', userType: 'Trader', company: 'Food Pro Industries', appliedOn: '10 Sep 2026', docsStatus: '3/4 Uploaded', kycStatus: 'Under Review', status: 'Pending Review', avatar: 'https://i.pravatar.cc/150?u=8' },
  { id: 9, name: 'Vikram Joshi', email: 'vikram@tradekart.in', phone: '+91 98765 43218', userType: 'Trader', company: 'TradeKart', appliedOn: '09 Sep 2026', docsStatus: '4/4 Uploaded', kycStatus: 'Verified', status: 'Pending Approval', avatar: 'https://i.pravatar.cc/150?u=9' },
  { id: 10, name: 'Sunil Patel', email: 'sunil@agriexport.com', phone: '+91 98765 43219', userType: 'Advertiser', company: 'Agri Export Co.', appliedOn: '08 Sep 2026', docsStatus: '2/4 Uploaded', kycStatus: 'Not Verified', status: 'Pending Review', avatar: 'https://i.pravatar.cc/150?u=10' },
];

export default function PendingVerification() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Pending Verification');
  const [pendingDataState, setPendingDataState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, traders: 0, subscribers: 0, advertisers: 0 });
  const [tabStats, setTabStats] = useState({ total: 0, traders: 0, subscribers: 0, advertisers: 0, pending: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiFetch(`/api/admin/users?verification_status=pending&page=${currentPage}&per_page=10`)
      .then(data => {
        if (data.status && data.data && data.data.data) {
          const formatted = data.data.data.map(user => ({
            id: user.id,
            name: user.name || user.full_name || 'N/A',
            email: user.email || 'N/A',
            phone: user.phone_number || 'N/A',
            userType: user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Trader',
            company: user.company?.name || 'N/A',
            appliedOn: new Date(user.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            docsStatus: '2/4 Uploaded', // Mock fallback
            kycStatus: 'Under Review',
            status: 'Pending Approval',
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.full_name || 'User')}&background=random`
          }));
          setPendingDataState(formatted);
          setTotalPages(data.data.last_page || 1);
          setTotalItems(data.data.total || 0);
        }
      })
      .catch(err => console.error("Error fetching pending verifications:", err))
      .finally(() => setLoading(false));

    apiFetch('/api/admin/users/stats?verification_status=pending')
      .then(data => {
        if (data.status && data.data) {
          setStats({
            total: data.data.total || 0,
            traders: data.data.traders || 0,
            subscribers: data.data.subscribers || 0,
            advertisers: data.data.advertisers || 0,
          });
        }
      })
      .catch(err => console.error("Error fetching pending stats:", err));

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
          setPendingDataState(pendingDataState.filter(u => u.id !== userToDelete));
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
    <div className="pv-page-container">
      {/* Header */}
      <div className="pv-header-area">
        <div className="pv-title-section">
          <h1 className="pv-page-title">Pending Verification</h1>
          <p className="pv-page-subtitle">Review and verify new users, traders, subscribers and advertisers before activation.</p>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="pv-kpi-row">
        <div className="pv-kpi-card">
          <div className="pv-kpi-icon-box" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            <svg style={{display:'none'}} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l2-9 4 18 2-9h4"></path></svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div className="pv-kpi-info">
            <h3 className="pv-kpi-value">{stats.total}</h3>
            <p className="pv-kpi-label">Pending Verification</p>
            <span className="pv-kpi-trend red">↓ -8% from last week</span>
          </div>
        </div>
        
        <div className="pv-kpi-card">
          <div className="pv-kpi-icon-box" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div className="pv-kpi-info">
            <h3 className="pv-kpi-value">{stats.traders}</h3>
            <p className="pv-kpi-label">Trader Applications</p>
            <span className="pv-kpi-trend green">↑ +12% from last week</span>
          </div>
        </div>

        <div className="pv-kpi-card">
          <div className="pv-kpi-icon-box" style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div className="pv-kpi-info">
            <h3 className="pv-kpi-value">{stats.subscribers}</h3>
            <p className="pv-kpi-label">Subscriber Applications</p>
            <span className="pv-kpi-trend green">↑ +6% from last week</span>
          </div>
        </div>

        <div className="pv-kpi-card">
          <div className="pv-kpi-icon-box" style={{ backgroundColor: '#dcfce7', color: '#166534' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            <svg style={{display:'none'}} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon></svg>
            <svg style={{display:'none'}} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5"></path><path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z"></path></svg>
            <svg style={{position:'absolute', backgroundColor:'#dcfce7'}} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            <svg style={{position:'absolute', backgroundColor:'#dcfce7'}} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon></svg>
            <svg style={{position:'absolute', backgroundColor:'#dcfce7'}} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>
          </div>
          <div className="pv-kpi-info">
            <h3 className="pv-kpi-value">{stats.advertisers}</h3>
            <p className="pv-kpi-label">Advertiser Applications</p>
            <span className="pv-kpi-trend green">↑ +15% from last week</span>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="pv-tabs-actions-row">
        <div className="pv-tabs">
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
                className={`pv-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => navigate(getRoute(tab))}
              >
                {tab} {tab === 'All Users' ? `(${tabStats.total.toLocaleString()})` : tab === 'Traders' ? `(${tabStats.traders.toLocaleString()})` : tab === 'Subscribers' ? `(${tabStats.subscribers.toLocaleString()})` : tab === 'Advertisers' ? `(${tabStats.advertisers.toLocaleString()})` : `(${tabStats.pending.toLocaleString()})`}
              </button>
            )
          })}
        </div>
        <button className="pv-btn-bulk">
          Bulk Actions ▾
        </button>
      </div>

      {/* Filters 1 Row */}
      <div className="pv-filters-container">
        <div className="pv-filters-row">
          <div className="pv-search-wrapper" style={{ flex: '1.5' }}>
            <svg className="pv-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Search by name, email, phone, company..." className="pv-search-input" />
          </div>
          
          <select className="pv-filter-select"><option>All User Types</option></select>
          <select className="pv-filter-select"><option>All Cities</option></select>
          <select className="pv-filter-select"><option>All Documents Status</option></select>
          <div className="pv-date-picker">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span>Application Date Range</span>
          </div>
          <button className="pv-btn-reset">Reset</button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="pv-main-content">
        
        {/* Left: Table Area */}
        <div className="pv-table-area">
          <div className="pv-table-wrapper">
            <table className="pv-table">
              <thead>
                <tr>
                  <th className="pv-th-checkbox"><input type="checkbox" /></th>
                  <th className="pv-th-id">#</th>
                  <th>User Details</th>
                  <th className="text-center">User Type</th>
                  <th>Company Name</th>
                  <th>Applied On</th>
                  <th className="text-center">Documents Status</th>
                  <th>KYC Status</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingDataState.map((user, index) => (
                  <tr key={user.id}>
                    <td className="pv-td-checkbox" onClick={e => e.stopPropagation()}>
                      <input type="checkbox" />
                    </td>
                    <td className="pv-td-id">{index + 1}</td>
                    <td>
                      <div className="pv-user-cell">
                        <img src={user.avatar} alt={user.name} className="pv-user-avatar" />
                        <div className="pv-user-meta">
                          <span className="pv-user-name">{user.name}</span>
                          <span className="pv-user-contact">{user.email}</span>
                          <span className="pv-user-contact">{user.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <span className={`pv-badge-type ${(user.role || user.userType || '').toLowerCase()}`}>
                        {user.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1)) : user.userType}
                      </span>
                    </td>
                    <td><span className="pv-company-name">{user.company}</span></td>
                    <td className="pv-date-cell">{user.appliedOn}</td>
                    <td className="text-center">
                      <span className={`pv-badge-docs ${user.docsStatus.startsWith('4') ? 'full' : user.docsStatus.startsWith('3') ? 'partial' : 'low'}`}>
                        {user.docsStatus}
                      </span>
                    </td>
                    <td>
                      <span className={`pv-badge-kyc ${user.kycStatus.toLowerCase().replace(' ', '-')}`}>
                        {user.kycStatus === 'Verified' ? (
                          <span className="pv-dot green"></span>
                        ) : user.kycStatus === 'Under Review' ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        ) : (
                          <span className="pv-dot orange"></span>
                        )}
                        {user.kycStatus}
                      </span>
                    </td>
                    <td>
                      <span className={`pv-badge-status ${user.status.toLowerCase().replace(' ', '-')}`}>
                        {user.status === 'Pending Approval' ? (
                          <span className="pv-dot blue"></span>
                        ) : (
                          <span className="pv-dot orange"></span>
                        )}
                        {user.status}
                      </span>
                    </td>
                    <td className="pv-actions-cell" onClick={e => e.stopPropagation()} style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                      <button className="pv-action-btn" onClick={() => navigate(`/user/view/${user.id}`)} title="View" style={{background:'none',border:'none',color:'#1e3a8a',cursor:'pointer',padding:'4px'}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
                      <button className="pv-action-btn" onClick={() => navigate(`/user/edit/${user.id}`)} title="Edit" style={{background:'none',border:'none',color:'#1e3a8a',cursor:'pointer',padding:'4px'}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button className="pv-action-btn danger" onClick={() => confirmDelete(user.id)} title="Delete" style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer',padding:'4px'}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="pv-pagination">
            <span className="pv-page-info">Showing {pendingDataState.length > 0 ? (currentPage - 1) * 10 + 1 : 0} to {Math.min(currentPage * 10, totalItems)} of {totalItems} pending verifications</span>
            <div className="pv-page-controls">
              <button 
                className="pv-page-nav"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >←</button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = currentPage - 2 + i;
                  if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                }
                return (
                  <button 
                    key={pageNum}
                    className={`pv-page-num ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="pv-page-dots">...</span>
                  <button 
                    className="pv-page-num"
                    onClick={() => setCurrentPage(totalPages)}
                  >{totalPages}</button>
                </>
              )}
              <button 
                className="pv-page-nav"
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
        title="Delete User"
        message="Are you sure you want to delete this verification request? This action cannot be undone."
      />
    </div>
  );
}
