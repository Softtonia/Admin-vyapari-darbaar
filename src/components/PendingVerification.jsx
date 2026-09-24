import React, { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState('All Pending');
  const [selectedItem, setSelectedItem] = useState(pendingData[0]);
  const [dpTab, setDpTab] = useState('Overview');

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
            <h3 className="pv-kpi-value">450</h3>
            <p className="pv-kpi-label">Pending Verification</p>
            <span className="pv-kpi-trend red">↓ -8% from last week</span>
          </div>
        </div>
        
        <div className="pv-kpi-card">
          <div className="pv-kpi-icon-box" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div className="pv-kpi-info">
            <h3 className="pv-kpi-value">280</h3>
            <p className="pv-kpi-label">Trader Applications</p>
            <span className="pv-kpi-trend green">↑ +12% from last week</span>
          </div>
        </div>

        <div className="pv-kpi-card">
          <div className="pv-kpi-icon-box" style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div className="pv-kpi-info">
            <h3 className="pv-kpi-value">120</h3>
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
            <h3 className="pv-kpi-value">50</h3>
            <p className="pv-kpi-label">Advertiser Applications</p>
            <span className="pv-kpi-trend green">↑ +15% from last week</span>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="pv-tabs-actions-row">
        <div className="pv-tabs">
          {['All Pending (450)', 'Traders (280)', 'Subscribers (120)', 'Advertisers (50)'].map(tab => (
            <button 
              key={tab} 
              className={`pv-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
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
                {pendingData.map((user, index) => (
                  <tr 
                    key={user.id} 
                    className={selectedItem?.id === user.id ? 'selected-row' : ''}
                    onClick={() => setSelectedItem(user)}
                  >
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
                      <span className={`pv-badge-type ${user.userType.toLowerCase()}`}>{user.userType}</span>
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
                    <td className="pv-actions-cell" onClick={e => e.stopPropagation()}>
                      <button className="pv-action-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                      <button className="pv-action-btn success"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></button>
                      <button className="pv-action-btn danger"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                      <button className="pv-action-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="pv-pagination">
            <span className="pv-page-info">Showing 1 to 10 of 450 pending verifications</span>
            <div className="pv-page-controls">
              <button className="pv-page-nav">←</button>
              <button className="pv-page-num active">1</button>
              <button className="pv-page-num">2</button>
              <button className="pv-page-num">3</button>
              <button className="pv-page-num">4</button>
              <button className="pv-page-num">5</button>
              <span className="pv-page-dots">...</span>
              <button className="pv-page-num">45</button>
              <button className="pv-page-nav">→</button>
            </div>
          </div>
        </div>

        {/* Right: Details Panel */}
        <div className="pv-details-panel">
          {selectedItem ? (
            <div className="pv-dp-inner">
              <div className="pv-dp-header">
                <h3>User Verification Details</h3>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <button className="pv-close-btn" onClick={() => setSelectedItem(null)}>×</button>
                </div>
              </div>
              
              <div className="pv-dp-profile">
                <div className="pv-dp-profile-top">
                  <img src={selectedItem.avatar} alt={selectedItem.name} className="pv-dp-avatar" />
                  <div className="pv-dp-name-box">
                    <h4 className="pv-dp-name">
                      {selectedItem.name} 
                      <span className={`pv-badge-status ${selectedItem.status.toLowerCase().replace(' ', '-')}`} style={{marginLeft: 'auto', padding: '2px 6px', fontSize: '10px'}}>
                         {selectedItem.status}
                      </span>
                    </h4>
                    <p className="pv-dp-role">{selectedItem.userType} | ID: #TRD001</p>
                    <p className="pv-dp-member-since">Applied on: {selectedItem.appliedOn} | 10:24 AM</p>
                  </div>
                </div>
              </div>

              <div className="pv-dp-tabs">
                {['Overview', 'Documents', 'KYC Details', 'Activity'].map(tab => (
                  <button 
                    key={tab} 
                    className={`pv-dp-tab ${dpTab === tab ? 'active' : ''}`}
                    onClick={() => setDpTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {dpTab === 'Overview' && (
                <div className="pv-dp-content">
                  <div className="pv-dp-grid">
                    <div className="pv-dp-item">
                      <div className="pv-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                      <div className="pv-dp-data">
                        <span className="pv-dp-label">Email</span>
                        <a href={`mailto:${selectedItem.email}`} className="pv-dp-value link">{selectedItem.email}</a>
                      </div>
                    </div>

                    <div className="pv-dp-item">
                      <div className="pv-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
                      <div className="pv-dp-data">
                        <span className="pv-dp-label">Phone</span>
                        <span className="pv-dp-value" style={{color: '#1e3a8a'}}>{selectedItem.phone}</span>
                      </div>
                    </div>

                    <div className="pv-dp-item">
                      <div className="pv-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg></div>
                      <div className="pv-dp-data">
                        <span className="pv-dp-label">Company</span>
                        <span className="pv-dp-value" style={{color: '#1e3a8a'}}>{selectedItem.company}</span>
                      </div>
                    </div>

                    <div className="pv-dp-item">
                      <div className="pv-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
                      <div className="pv-dp-data">
                        <span className="pv-dp-label">GSTIN</span>
                        <span className="pv-dp-value">10ABCDE1234F1Z5</span>
                      </div>
                    </div>
                    
                    <div className="pv-dp-item">
                      <div className="pv-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
                      <div className="pv-dp-data">
                        <span className="pv-dp-label">User Type</span>
                        <span className="pv-dp-value">{selectedItem.userType}</span>
                      </div>
                    </div>

                    <div className="pv-dp-item">
                      <div className="pv-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
                      <div className="pv-dp-data">
                        <span className="pv-dp-label">Location</span>
                        <span className="pv-dp-value">Patna, Bihar</span>
                      </div>
                    </div>
                    
                    <div className="pv-dp-item">
                      <div className="pv-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
                      <div className="pv-dp-data">
                        <span className="pv-dp-label">Address</span>
                        <span className="pv-dp-value" style={{lineHeight: '1.4'}}>Near Gandhi Maidan, Patna, Bihar 800001</span>
                      </div>
                    </div>
                  </div>

                  <div className="pv-dp-section">
                    <div className="pv-dp-section-header">
                      <h5 className="pv-dp-subtitle">Documents Status</h5>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span className="pv-badge-docs partial">3/4 Uploaded</span>
                        <a href="#" className="pv-dp-link-small" onClick={e=>e.preventDefault()}>View All</a>
                      </div>
                    </div>
                    
                    <div className="pv-docs-grid">
                      <div className="pv-doc-card">
                        <div className="pv-doc-img-box">
                          {/* Mock Image Placeholder */}
                        </div>
                        <span className="pv-doc-name">Aadhaar Card</span>
                        <span className="pv-doc-status success"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Uploaded</span>
                      </div>
                      
                      <div className="pv-doc-card">
                        <div className="pv-doc-img-box">
                        </div>
                        <span className="pv-doc-name">PAN Card</span>
                        <span className="pv-doc-status success"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Uploaded</span>
                      </div>
                      
                      <div className="pv-doc-card">
                        <div className="pv-doc-img-box">
                        </div>
                        <span className="pv-doc-name">GST Certificate</span>
                        <span className="pv-doc-status success"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Uploaded</span>
                      </div>
                      
                      <div className="pv-doc-card empty">
                        <div className="pv-doc-img-box empty">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </div>
                        <span className="pv-doc-name">Business Proof</span>
                        <span className="pv-doc-status error"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg> Not Uploaded</span>
                      </div>
                    </div>
                  </div>

                  <div className="pv-dp-bottom-actions">
                    <div style={{display: 'flex', gap: '8px', width: '100%'}}>
                      <button className="pv-dp-btn-solid approve"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Approve User</button>
                      <button className="pv-dp-btn-solid reject"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Reject</button>
                    </div>
                    <button className="pv-dp-btn-outline"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Request More Info</button>
                  </div>

                </div>
              )}

            </div>
          ) : (
            <div className="pv-dp-empty">
              Select an application from the list to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
