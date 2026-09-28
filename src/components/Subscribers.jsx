import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api/config';
import DeleteModal from './DeleteModal';
import './Subscribers.css';

// Mock Data for Subscribers
const subscribersData = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh.trader@gmail.com', phone: '+91 98765 43210', planName: 'Premium', planDuration: 'Monthly', amount: '₹1,999', paymentMethod: 'Razorpay', paymentSub: '**** 4321', startDate: '01 Sep 2026', expiryDate: '01 Oct 2026', status: 'Active', autoRenew: true, avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Priya Singh', email: 'priya.singh@agrotraders.in', phone: '+91 98765 43211', planName: 'Basic', planDuration: 'Monthly', amount: '₹499', paymentMethod: 'UPI', paymentSub: 'priya@upi', startDate: '05 Sep 2026', expiryDate: '05 Oct 2026', status: 'Active', autoRenew: true, avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Amit Sharma', email: 'amit@globalexport.com', phone: '+91 98765 43212', planName: 'Premium', planDuration: 'Yearly', amount: '₹19,999', paymentMethod: 'Credit Card', paymentSub: '**** 1234', startDate: '12 Aug 2026', expiryDate: '12 Aug 2027', status: 'Active', autoRenew: true, avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Neha Verma', email: 'neha.verma@gmail.com', phone: '+91 98765 43213', planName: 'Standard', planDuration: 'Monthly', amount: '₹999', paymentMethod: 'Net Banking', paymentSub: 'HDFC Bank', startDate: '28 Aug 2026', expiryDate: '28 Sep 2026', status: 'Expiring Soon', autoRenew: false, avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'Sandeep Yadav', email: 'sandeepy@yadavtrading.in', phone: '+91 98765 43214', planName: 'Premium', planDuration: 'Monthly', amount: '₹1,999', paymentMethod: 'UPI', paymentSub: 'sandeep@upi', startDate: '15 Aug 2026', expiryDate: '15 Sep 2026', status: 'Expiring Soon', autoRenew: true, avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: 6, name: 'Kavita Rao', email: 'kavita@spicesindia.com', phone: '+91 98765 43215', planName: 'Basic', planDuration: 'Monthly', amount: '₹499', paymentMethod: 'Razorpay', paymentSub: '**** 7890', startDate: '10 Jul 2026', expiryDate: '10 Aug 2026', status: 'Expired', autoRenew: false, avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: 7, name: 'Rohit Mehta', email: 'rohit.mehta@gmail.com', phone: '+91 98765 43216', planName: 'Standard', planDuration: 'Yearly', amount: '₹9,999', paymentMethod: 'Credit Card', paymentSub: '**** 5678', startDate: '18 Aug 2026', expiryDate: '18 Aug 2027', status: 'Active', autoRenew: true, avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: 8, name: 'Anjali Gupta', email: 'anjali.gupta@farmers.in', phone: '+91 98765 43217', planName: 'Premium', planDuration: 'Monthly', amount: '₹1,999', paymentMethod: 'UPI', paymentSub: 'anjali@upi', startDate: '20 Aug 2026', expiryDate: '20 Sep 2026', status: 'Expiring Soon', autoRenew: false, avatar: 'https://i.pravatar.cc/150?u=8' },
  { id: 9, name: 'Vikram Joshi', email: 'vikram@tradelink.com', phone: '+91 98765 43218', planName: 'Basic', planDuration: 'Monthly', amount: '₹499', paymentMethod: 'Net Banking', paymentSub: 'SBI', startDate: '01 Aug 2026', expiryDate: '01 Sep 2026', status: 'Expired', autoRenew: false, avatar: 'https://i.pravatar.cc/150?u=9' },
  { id: 10, name: 'Sunil Patel', email: 'sunil.patel@gmail.com', phone: '+91 98765 43219', planName: 'Standard', planDuration: 'Monthly', amount: '₹999', paymentMethod: 'Razorpay', paymentSub: '**** 2468', startDate: '25 Aug 2026', expiryDate: '25 Sep 2026', status: 'Active', autoRenew: true, avatar: 'https://i.pravatar.cc/150?u=10' },
];

export default function Subscribers() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Subscribers');
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, active: 0, expiring_soon: 0, expired: 0, revenue: 0 });
  const [tabStats, setTabStats] = useState({ total: 0, traders: 0, subscribers: 0, advertisers: 0, pending: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiFetch(`/api/admin/users?role=subscriber&page=${currentPage}&per_page=10`)
      .then(data => {
        if (data.status && data.data && data.data.data) {
          const formatted = data.data.data.map(user => ({
            id: user.id,
            name: user.name || user.full_name || 'N/A',
            phone: user.phone_number || 'N/A',
            email: user.email || 'N/A',
            planName: 'Basic', // mock fallback
            planDuration: 'Monthly',
            amount: '₹499',
            paymentMethod: 'UPI',
            paymentSub: 'user@upi',
            startDate: new Date(user.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            expiryDate: 'N/A',
            status: user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Active',
            autoRenew: true,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.full_name || 'Subscriber')}&background=random`
          }));
          setSubs(formatted);
          setTotalPages(data.data.last_page || 1);
          setTotalItems(data.data.total || 0);
        }
      })
      .catch(err => console.error("Error fetching subscribers:", err))
      .finally(() => setLoading(false));

    apiFetch('/api/admin/users/stats?role=subscriber')
      .then(data => {
        if (data.status && data.data) {
          setStats({
            total: data.data.total || 0,
            active: data.data.active || 0,
            expiring_soon: data.data.expiring_soon || 0,
            expired: data.data.expired || 0,
            revenue: data.data.revenue || 0,
          });
        }
      })
      .catch(err => console.error("Error fetching subscriber stats:", err));

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
          setSubs(subs.filter(s => s.id !== userToDelete));
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

  const toggleAutoRenew = (id) => {
    setSubs(prev => prev.map(s => s.id === id ? { ...s, autoRenew: !s.autoRenew } : s));
  };

  return (
    <div className="sub-page-container">
      {/* Header */}
      <div className="sub-header-area">
        <div className="sub-title-section">
          <h1 className="sub-page-title">Subscribers</h1>
          <p className="sub-page-subtitle">Manage premium subscribers, their plans, renewals and access to paid features.</p>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="sub-kpi-row">
        <div className="sub-kpi-card">
          <div className="sub-kpi-icon-box" style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div className="sub-kpi-info">
            <h3 className="sub-kpi-value">{stats.total}</h3>
            <p className="sub-kpi-label">Total Subscribers</p>
            <span className="sub-kpi-trend green">↑ +18% this month</span>
          </div>
        </div>
        
        <div className="sub-kpi-card">
          <div className="sub-kpi-icon-box" style={{ backgroundColor: '#e0f2f1', color: '#00897b' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
          </div>
          <div className="sub-kpi-info">
            <h3 className="sub-kpi-value">{stats.active}</h3>
            <p className="sub-kpi-label">Active Subscribers</p>
            <span className="sub-kpi-trend green">↑ +12% this month</span>
          </div>
        </div>

        <div className="sub-kpi-card">
          <div className="sub-kpi-icon-box" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div className="sub-kpi-info">
            <h3 className="sub-kpi-value">{stats.expiring_soon}</h3>
            <p className="sub-kpi-label">Expiring Soon</p>
            <span className="sub-kpi-trend green">↑ +5% this month</span>
          </div>
        </div>

        <div className="sub-kpi-card">
          <div className="sub-kpi-icon-box" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div className="sub-kpi-info">
            <h3 className="sub-kpi-value">{stats.expired}</h3>
            <p className="sub-kpi-label">Expired Subscribers</p>
            <span className="sub-kpi-trend red">↓ -8% this month</span>
          </div>
        </div>

        <div className="sub-kpi-card">
          <div className="sub-kpi-icon-box" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div className="sub-kpi-info">
            <h3 className="sub-kpi-value">₹{stats.revenue}</h3>
            <p className="sub-kpi-label">Monthly Revenue</p>
            <span className="sub-kpi-trend green">↑ +22% this month</span>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="sub-tabs-actions-row">
        <div className="sub-tabs">
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
                className={`sub-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => navigate(getRoute(tab))}
              >
                {tab} {tab === 'All Users' ? `(${tabStats.total.toLocaleString()})` : tab === 'Traders' ? `(${tabStats.traders.toLocaleString()})` : tab === 'Subscribers' ? `(${tabStats.subscribers.toLocaleString()})` : tab === 'Advertisers' ? `(${tabStats.advertisers.toLocaleString()})` : `(${tabStats.pending.toLocaleString()})`}
              </button>
            )
          })}
        </div>
        <button className="sub-btn-add" onClick={() => navigate('/user/add')}>+ Add Subscriber</button>
      </div>

      {/* Filters 2 Rows */}
      <div className="sub-filters-container">
        <div className="sub-filters-row">
          <div className="sub-search-wrapper" style={{ flex: '1.5' }}>
            <svg className="sub-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Search by name, email, company or phone..." className="sub-search-input" />
          </div>
          
          <select className="sub-filter-select"><option>All Plans</option></select>
          <select className="sub-filter-select"><option>All Status</option></select>
          <select className="sub-filter-select"><option>All Payment Methods</option></select>
          <div className="sub-date-picker">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span>Join Date Range</span>
          </div>
          <button className="sub-btn-reset">Reset</button>
        </div>
        
        <div className="sub-filters-row bottom-row">
          <button className="sub-btn-export">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export ▾
          </button>
          
          <button className="sub-btn-bulk">
            Bulk Actions ▾
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="sub-main-content">
        
        {/* Left: Table Area */}
        <div className="sub-table-area">
          <div className="sub-table-wrapper">
            <table className="sub-table">
              <thead>
                <tr>
                  <th className="sub-th-checkbox"><input type="checkbox" /></th>
                  <th className="sub-th-id">#</th>
                  <th>Subscriber Details</th>
                  <th>Plan ▾</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Start Date ▾</th>
                  <th>Expiry Date ▾</th>
                  <th>Status ▾</th>
                  <th className="text-center">Auto Renew</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subs.map((sub, index) => (
                  <tr key={sub.id}>
                    <td className="sub-td-checkbox" onClick={e => e.stopPropagation()}>
                      <input type="checkbox" />
                    </td>
                    <td className="sub-td-id">{index + 1}</td>
                    <td>
                      <div className="sub-user-cell">
                        <img src={sub.avatar} alt={sub.name} className="sub-user-avatar" />
                        <div className="sub-user-meta">
                          <span className="sub-user-name">{sub.name}</span>
                          <span className="sub-user-contact">{sub.email}</span>
                          <span className="sub-user-contact">{sub.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="sub-plan-cell">
                        <span className={`sub-badge-plan ${sub.planName.toLowerCase()}`}>
                          {sub.planName === 'Premium' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 17l10 5 10-5M2 12l10 5 10-5M12 2L2 7l10 5 10-5-10-5z"></path></svg>}
                          {sub.planName === 'Standard' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>}
                          {sub.planName}
                        </span>
                        <span className="sub-plan-sub">{sub.planDuration}</span>
                      </div>
                    </td>
                    <td className="font-semibold text-gray-900">{sub.amount}</td>
                    <td>
                      <div className="sub-payment-cell">
                        <span className="sub-pm-main"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg> {sub.paymentMethod}</span>
                        <span className="sub-pm-sub">{sub.paymentSub}</span>
                      </div>
                    </td>
                    <td className="sub-date-cell">{sub.startDate}</td>
                    <td className="sub-date-cell">{sub.expiryDate}</td>
                    <td>
                      <span className={`sub-badge-status ${sub.status.toLowerCase().replace(' ', '-')}`}>
                        <span className="sub-dot"></span> {sub.status}
                      </span>
                    </td>
                    <td className="text-center" onClick={e => e.stopPropagation()}>
                      <label className="sub-switch">
                        <input 
                          type="checkbox" 
                          checked={sub.autoRenew} 
                          onChange={() => toggleAutoRenew(sub.id)}
                        />
                        <span className="sub-slider round"></span>
                      </label>
                    </td>
                    <td className="sub-actions-cell" onClick={e => e.stopPropagation()} style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                      <button className="sub-action-btn" onClick={() => navigate(`/user/view/${sub.id}`)} title="View" style={{background:'none',border:'none',color:'#1e3a8a',cursor:'pointer',padding:'4px'}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
                      <button className="sub-action-btn" onClick={() => navigate(`/user/edit/${sub.id}`)} title="Edit" style={{background:'none',border:'none',color:'#1e3a8a',cursor:'pointer',padding:'4px'}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button className="sub-action-btn" onClick={() => confirmDelete(sub.id)} title="Delete" style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer',padding:'4px'}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="sub-pagination">
            <span className="sub-page-info">Showing {subs.length > 0 ? (currentPage - 1) * 10 + 1 : 0} to {Math.min(currentPage * 10, totalItems)} of {totalItems} subscribers</span>
            <div className="sub-page-controls">
              <button 
                className="sub-page-nav"
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
                    className={`sub-page-num ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="sub-page-dots">...</span>
                  <button 
                    className="sub-page-num"
                    onClick={() => setCurrentPage(totalPages)}
                  >{totalPages}</button>
                </>
              )}
              <button 
                className="sub-page-nav"
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
        title="Delete Subscriber"
        message="Are you sure you want to delete this subscriber? This action cannot be undone."
      />
    </div>
  );
}
