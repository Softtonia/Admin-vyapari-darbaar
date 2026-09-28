import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api/config';
import DeleteModal from './DeleteModal';
import './Advertisers.css';

// Mock Data for Advertisers
const advertisersData = [
  { id: 1, contactName: 'Rajesh Kumar', email: 'rajesh@agrolinks.com', phone: '+91 98765 43210', company: 'Agro Links Pvt Ltd', adType: 'Banner', adPlan: 'Premium', startDate: '01 Sep 2026', endDate: '30 Sep 2026', status: 'Active', totalSpend: '₹24,999', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, contactName: 'Priya Singh', email: 'priya@farmfresh.in', phone: '+91 98765 43211', company: 'Farm Fresh Foods', adType: 'Sidebar', adPlan: 'Basic', startDate: '05 Sep 2026', endDate: '05 Oct 2026', status: 'Active', totalSpend: '₹9,999', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, contactName: 'Amit Sharma', email: 'amit@krishiworld.com', phone: '+91 98765 43212', company: 'Krishi World', adType: 'Homepage', adPlan: 'Premium', startDate: '10 Aug 2026', endDate: '10 Sep 2026', status: 'Expired', totalSpend: '₹49,999', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, contactName: 'Neha Verma', email: 'neha@seedmart.com', phone: '+91 98765 43213', company: 'Seed Mart', adType: 'Category', adPlan: 'Standard', startDate: '12 Sep 2026', endDate: '12 Oct 2026', status: 'Active', totalSpend: '₹14,999', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, contactName: 'Sandeep Yadav', email: 'sandeep@machineryhub.in', phone: '+91 98765 43214', company: 'Machinery Hub', adType: 'Marketplace', adPlan: 'Premium', startDate: '08 Sep 2026', endDate: '08 Oct 2026', status: 'Pending', totalSpend: '₹19,999', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: 6, contactName: 'Kavita Rao', email: 'kavita@exportindia.com', phone: '+91 98765 43215', company: 'Export India', adType: 'Banner', adPlan: 'Standard', startDate: '01 Jul 2026', endDate: '31 Jul 2026', status: 'Inactive', totalSpend: '₹12,499', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: 7, contactName: 'Rohit Mehta', email: 'rohit@spicesglobal.com', phone: '+91 98765 43216', company: 'Spices Global', adType: 'Homepage', adPlan: 'Premium', startDate: '15 Sep 2026', endDate: '15 Oct 2026', status: 'Active', totalSpend: '₹29,999', avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: 8, contactName: 'Anjali Gupta', email: 'anjali@foodpro.in', phone: '+91 98765 43217', company: 'Food Pro Industries', adType: 'Sidebar', adPlan: 'Basic', startDate: '20 Aug 2026', endDate: '20 Sep 2026', status: 'Active', totalSpend: '₹7,499', avatar: 'https://i.pravatar.cc/150?u=8' },
  { id: 9, contactName: 'Vikram Joshi', email: 'vikram@tradekart.in', phone: '+91 98765 43218', company: 'TradeKart', adType: 'Category', adPlan: 'Standard', startDate: '18 Sep 2026', endDate: '18 Oct 2026', status: 'Active', totalSpend: '₹14,999', avatar: 'https://i.pravatar.cc/150?u=9' },
  { id: 10, contactName: 'Sunil Patel', email: 'sunil@agriexport.com', phone: '+91 98765 43219', company: 'Agri Export Co.', adType: 'Marketplace', adPlan: 'Premium', startDate: '25 Aug 2026', endDate: '25 Sep 2026', status: 'Pending', totalSpend: '₹34,999', avatar: 'https://i.pravatar.cc/150?u=10' },
];

export default function Advertisers() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Advertisers');
  const [advertisersDataState, setAdvertisersDataState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, pending: 0, revenue: 0 });
  const [tabStats, setTabStats] = useState({ total: 0, traders: 0, subscribers: 0, advertisers: 0, pending: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiFetch(`/api/admin/users?role=advertiser&page=${currentPage}&per_page=10`)
      .then(data => {
        if (data.status && data.data && data.data.data) {
          const formatted = data.data.data.map(user => ({
            id: user.id,
            contactName: user.name || user.full_name || 'N/A',
            phone: user.phone_number || 'N/A',
            email: user.email || 'N/A',
            company: user.company?.name || 'N/A',
            adType: 'Banner',
            adPlan: 'Premium',
            startDate: new Date(user.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            endDate: 'N/A',
            status: user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Active',
            totalSpend: '₹0',
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.full_name || 'Advertiser')}&background=random`
          }));
          setAdvertisersDataState(formatted);
          setTotalPages(data.data.last_page || 1);
          setTotalItems(data.data.total || 0);
        }
      })
      .catch(err => console.error("Error fetching advertisers:", err))
      .finally(() => setLoading(false));

    apiFetch('/api/admin/users/stats?role=advertiser')
      .then(data => {
        if (data.status && data.data) {
          setStats({
            total: data.data.total || 0,
            active: data.data.active || 0,
            inactive: data.data.inactive || 0,
            pending: data.data.pending || 0,
            revenue: data.data.revenue || 0,
          });
        }
      })
      .catch(err => console.error("Error fetching advertiser stats:", err));

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
          setAdvertisersDataState(advertisersDataState.filter(a => a.id !== userToDelete));
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
    <div className="adv-page-container">
      {/* Header */}
      <div className="adv-header-area">
        <div className="adv-title-section">
          <h1 className="adv-page-title">Advertisers</h1>
          <p className="adv-page-subtitle">Manage businesses and brands advertising on the platform.</p>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="adv-kpi-row">
        <div className="adv-kpi-card">
          <div className="adv-kpi-icon-box" style={{ backgroundColor: '#fff3e0', color: '#f57c00' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div className="adv-kpi-info">
            <h3 className="adv-kpi-value">{stats.total}</h3>
            <p className="adv-kpi-label">Total Advertisers</p>
            <span className="adv-kpi-trend green">↑ +16% this month</span>
          </div>
        </div>
        
        <div className="adv-kpi-card">
          <div className="adv-kpi-icon-box" style={{ backgroundColor: '#e0f2f1', color: '#00897b' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
          </div>
          <div className="adv-kpi-info">
            <h3 className="adv-kpi-value">{stats.active}</h3>
            <p className="adv-kpi-label">Active Advertisers</p>
            <span className="adv-kpi-trend green">↑ +12% this month</span>
          </div>
        </div>

        <div className="adv-kpi-card">
          <div className="adv-kpi-icon-box" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div className="adv-kpi-info">
            <h3 className="adv-kpi-value">{stats.inactive}</h3>
            <p className="adv-kpi-label">Inactive Advertisers</p>
            <span className="adv-kpi-trend red">↓ -8% this month</span>
          </div>
        </div>

        <div className="adv-kpi-card">
          <div className="adv-kpi-icon-box" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div className="adv-kpi-info">
            <h3 className="adv-kpi-value">{stats.pending}</h3>
            <p className="adv-kpi-label">Pending Approval</p>
            <span className="adv-kpi-trend green">↑ +20% this month</span>
          </div>
        </div>

        <div className="adv-kpi-card">
          <div className="adv-kpi-icon-box" style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div className="adv-kpi-info">
            <h3 className="adv-kpi-value">₹{stats.revenue}</h3>
            <p className="adv-kpi-label">Monthly Ad Revenue</p>
            <span className="adv-kpi-trend green">↑ +28% this month</span>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="adv-tabs-actions-row">
        <div className="adv-tabs">
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
                className={`adv-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => navigate(getRoute(tab))}
              >
                {tab} {tab === 'All Users' ? `(${tabStats.total.toLocaleString()})` : tab === 'Traders' ? `(${tabStats.traders.toLocaleString()})` : tab === 'Subscribers' ? `(${tabStats.subscribers.toLocaleString()})` : tab === 'Advertisers' ? `(${tabStats.advertisers.toLocaleString()})` : `(${tabStats.pending.toLocaleString()})`}
              </button>
            )
          })}
        </div>
        <button className="adv-btn-add" onClick={() => navigate('/user/add')}>+ Add New Advertiser</button>
      </div>

      {/* Filters 1 Row */}
      <div className="adv-filters-container">
        <div className="adv-filters-row">
          <div className="adv-search-wrapper" style={{ flex: '1.5' }}>
            <svg className="adv-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Search by company name, email, phone or GSTIN..." className="adv-search-input" />
          </div>
          
          <select className="adv-filter-select"><option>All Ad Types</option></select>
          <select className="adv-filter-select"><option>All Status</option></select>
          <select className="adv-filter-select"><option>All Cities</option></select>
          <div className="adv-date-picker">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span>Join Date Range</span>
          </div>
          <button className="adv-btn-reset">Reset</button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="adv-main-content">
        
        {/* Left: Table Area */}
        <div className="adv-table-area">
          <div className="adv-table-wrapper">
            <table className="adv-table">
              <thead>
                <tr>
                  <th className="adv-th-checkbox"><input type="checkbox" /></th>
                  <th className="adv-th-id">#</th>
                  <th>Advertiser Details</th>
                  <th>Company Name</th>
                  <th className="text-center">Ad Type</th>
                  <th className="text-center">Ad Plan</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Total Spend</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {advertisersDataState.map((adv, index) => (
                  <tr key={adv.id}>
                    <td className="adv-td-checkbox" onClick={e => e.stopPropagation()}>
                      <input type="checkbox" />
                    </td>
                    <td className="adv-td-id">{index + 1}</td>
                    <td>
                      <div className="adv-user-cell">
                        <img src={adv.avatar} alt={adv.contactName} className="adv-user-avatar" />
                        <div className="adv-user-meta">
                          <span className="adv-user-name">{adv.contactName}</span>
                          <span className="adv-user-contact">{adv.email}</span>
                          <span className="adv-user-contact">{adv.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className="adv-company-name">{adv.company}</span></td>
                    <td className="text-center">
                      <span className={`adv-badge-type ${adv.adType.toLowerCase()}`}>{adv.adType}</span>
                    </td>
                    <td className="text-center">
                      <span className={`adv-badge-plan ${adv.adPlan.toLowerCase()}`}>{adv.adPlan}</span>
                    </td>
                    <td className="adv-date-cell">{adv.startDate}</td>
                    <td className="adv-date-cell">{adv.endDate}</td>
                    <td>
                      <span className={`adv-badge-status ${adv.status.toLowerCase().replace(' ', '-')}`}>
                        <span className="adv-dot"></span> {adv.status}
                      </span>
                    </td>
                    <td className="font-semibold text-gray-900">{adv.totalSpend}</td>
                    <td className="adv-actions-cell" onClick={e => e.stopPropagation()} style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                      <button className="adv-action-btn" onClick={() => navigate(`/user/view/${adv.id}`)} title="View" style={{background:'none',border:'none',color:'#1e3a8a',cursor:'pointer',padding:'4px'}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
                      <button className="adv-action-btn" onClick={() => navigate(`/user/edit/${adv.id}`)} title="Edit" style={{background:'none',border:'none',color:'#1e3a8a',cursor:'pointer',padding:'4px'}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button className="adv-action-btn" onClick={() => confirmDelete(adv.id)} title="Delete" style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer',padding:'4px'}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="adv-pagination">
            <span className="adv-page-info">Showing {advertisersDataState.length > 0 ? (currentPage - 1) * 10 + 1 : 0} to {Math.min(currentPage * 10, totalItems)} of {totalItems} advertisers</span>
            <div className="adv-page-controls">
              <button 
                className="adv-page-nav"
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
                    className={`adv-page-num ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="adv-page-dots">...</span>
                  <button 
                    className="adv-page-num"
                    onClick={() => setCurrentPage(totalPages)}
                  >{totalPages}</button>
                </>
              )}
              <button 
                className="adv-page-nav"
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
        title="Delete Advertiser"
        message="Are you sure you want to delete this advertiser? This action cannot be undone."
      />
    </div>
  );
}
