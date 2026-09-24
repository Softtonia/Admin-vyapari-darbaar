import React, { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState('Subscribers');
  const [selectedSub, setSelectedSub] = useState(subscribersData[0]);
  const [dpTab, setDpTab] = useState('Overview');
  const [subs, setSubs] = useState(subscribersData);

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
            <h3 className="sub-kpi-value">1,245</h3>
            <p className="sub-kpi-label">Total Subscribers</p>
            <span className="sub-kpi-trend green">↑ +18% this month</span>
          </div>
        </div>
        
        <div className="sub-kpi-card">
          <div className="sub-kpi-icon-box" style={{ backgroundColor: '#e0f2f1', color: '#00897b' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
          </div>
          <div className="sub-kpi-info">
            <h3 className="sub-kpi-value">982</h3>
            <p className="sub-kpi-label">Active Subscribers</p>
            <span className="sub-kpi-trend green">↑ +12% this month</span>
          </div>
        </div>

        <div className="sub-kpi-card">
          <div className="sub-kpi-icon-box" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div className="sub-kpi-info">
            <h3 className="sub-kpi-value">186</h3>
            <p className="sub-kpi-label">Expiring Soon</p>
            <span className="sub-kpi-trend green">↑ +5% this month</span>
          </div>
        </div>

        <div className="sub-kpi-card">
          <div className="sub-kpi-icon-box" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div className="sub-kpi-info">
            <h3 className="sub-kpi-value">77</h3>
            <p className="sub-kpi-label">Expired Subscribers</p>
            <span className="sub-kpi-trend red">↓ -8% this month</span>
          </div>
        </div>

        <div className="sub-kpi-card">
          <div className="sub-kpi-icon-box" style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div className="sub-kpi-info">
            <h3 className="sub-kpi-value">₹12.4L</h3>
            <p className="sub-kpi-label">Monthly Revenue</p>
            <span className="sub-kpi-trend green">↑ +22% this month</span>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="sub-tabs-actions-row">
        <div className="sub-tabs">
          {['All Users', 'Traders', 'Subscribers', 'Advertisers', 'Pending Verification'].map(tab => (
            <button 
              key={tab} 
              className={`sub-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab} {tab === 'All Users' ? '(12,842)' : tab === 'Traders' ? '(8,215)' : tab === 'Subscribers' ? '(1,245)' : tab === 'Advertisers' ? '(326)' : '(450)'}
            </button>
          ))}
        </div>
        <button className="sub-btn-add">+ Add Subscriber</button>
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
                  <tr 
                    key={sub.id} 
                    className={selectedSub?.id === sub.id ? 'selected-row' : ''}
                    onClick={() => setSelectedSub(sub)}
                  >
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
                    <td className="sub-actions-cell" onClick={e => e.stopPropagation()}>
                      <button className="sub-action-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                      <button className="sub-action-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                      <button className="sub-action-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="sub-pagination">
            <span className="sub-page-info">Showing 1 to 10 of 1,245 subscribers</span>
            <div className="sub-page-controls">
              <button className="sub-page-nav">←</button>
              <button className="sub-page-num active">1</button>
              <button className="sub-page-num">2</button>
              <button className="sub-page-num">3</button>
              <button className="sub-page-num">4</button>
              <button className="sub-page-num">5</button>
              <span className="sub-page-dots">...</span>
              <button className="sub-page-num">125</button>
              <button className="sub-page-nav">→</button>
            </div>
          </div>
        </div>

        {/* Right: Details Panel */}
        <div className="sub-details-panel">
          {selectedSub ? (
            <div className="sub-dp-inner">
              <div className="sub-dp-header">
                <h3>Subscriber Details</h3>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <button className="sub-close-btn" onClick={() => setSelectedSub(null)}>×</button>
                </div>
              </div>
              
              <div className="sub-dp-profile">
                <div className="sub-dp-profile-top">
                  <img src={selectedSub.avatar} alt={selectedSub.name} className="sub-dp-avatar" />
                  <div className="sub-dp-name-box">
                    <h4 className="sub-dp-name">{selectedSub.name} <span className="sub-status-dot-active"></span></h4>
                    <p className="sub-dp-role">Subscriber ID: #SUB00{selectedSub.id}</p>
                    <p className="sub-dp-member-since">Member since {selectedSub.startDate}</p>
                  </div>
                </div>
              </div>

              <div className="sub-dp-tabs">
                {['Overview', 'Subscription', 'Activity', 'Documents'].map(tab => (
                  <button 
                    key={tab} 
                    className={`sub-dp-tab ${dpTab === tab ? 'active' : ''}`}
                    onClick={() => setDpTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {dpTab === 'Overview' && (
                <div className="sub-dp-content">
                  <div className="sub-dp-grid">
                    <div className="sub-dp-item">
                      <div className="sub-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                      <div className="sub-dp-data">
                        <span className="sub-dp-label">Email</span>
                        <a href={`mailto:${selectedSub.email}`} className="sub-dp-value link">{selectedSub.email}</a>
                      </div>
                    </div>

                    <div className="sub-dp-item">
                      <div className="sub-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
                      <div className="sub-dp-data">
                        <span className="sub-dp-label">Phone</span>
                        <span className="sub-dp-value" style={{color: '#1e3a8a'}}>{selectedSub.phone}</span>
                      </div>
                    </div>

                    <div className="sub-dp-item">
                      <div className="sub-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg></div>
                      <div className="sub-dp-data">
                        <span className="sub-dp-label">Company</span>
                        <span className="sub-dp-value" style={{color: '#1e3a8a'}}>Rajesh Agro Traders</span>
                      </div>
                    </div>

                    <div className="sub-dp-item">
                      <div className="sub-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
                      <div className="sub-dp-data">
                        <span className="sub-dp-label">Location</span>
                        <span className="sub-dp-value">Patna, Bihar</span>
                      </div>
                    </div>

                    <div className="sub-dp-item">
                      <div className="sub-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
                      <div className="sub-dp-data">
                        <span className="sub-dp-label">GSTIN</span>
                        <span className="sub-dp-value">10ABCDE1234F1Z5</span>
                      </div>
                    </div>

                    <div className="sub-dp-item" style={{alignItems: 'center'}}>
                      <div className="sub-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg></div>
                      <div className="sub-dp-data" style={{flexDirection: 'row', alignItems: 'center', gap: '8px'}}>
                        <span className="sub-dp-label" style={{marginBottom: 0}}>KYC Status</span>
                        <span className="sub-badge-kyc verified" style={{ padding: '2px 6px', fontSize: '11px' }}>
                          <span className="sub-dot"></span> Verified
                        </span>
                        <a href="#" className="sub-dp-link-small" onClick={e => e.preventDefault()}>View Documents</a>
                      </div>
                    </div>
                  </div>

                  <div className="sub-dp-section">
                    <h5 className="sub-dp-subtitle">Subscription</h5>
                    
                    <div className="sub-plan-card">
                      <div className="sub-plan-card-header">
                        <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                          <span className={`sub-badge-plan ${selectedSub.planName.toLowerCase()} lrg`}>
                            {selectedSub.planName === 'Premium' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 17l10 5 10-5M2 12l10 5 10-5M12 2L2 7l10 5 10-5-10-5z"></path></svg>}
                            {selectedSub.planName} Plan
                          </span>
                        </div>
                        <span className={`sub-badge-status ${selectedSub.status.toLowerCase().replace(' ', '-')}`}>
                          <span className="sub-dot"></span> {selectedSub.status}
                        </span>
                      </div>
                      <div className="sub-plan-price">
                        {selectedSub.amount} <span className="period">/ {selectedSub.planDuration === 'Yearly' ? 'Year' : 'Month'}</span>
                      </div>
                      
                      <div className="sub-plan-grid">
                        <div className="spg-row">
                          <span className="spg-label">Start Date</span>
                          <span className="spg-val">{selectedSub.startDate}</span>
                        </div>
                        <div className="spg-row">
                          <span className="spg-label">Expiry Date</span>
                          <span className="spg-val" style={{color: selectedSub.status === 'Expiring Soon' ? '#ea580c' : '#111827'}}>
                            {selectedSub.expiryDate} {selectedSub.status === 'Expiring Soon' && '(14 days left)'}
                          </span>
                        </div>
                        <div className="spg-row">
                          <span className="spg-label">Auto Renew</span>
                          <span className="spg-val" style={{color: selectedSub.autoRenew ? '#16a34a' : '#6b7280'}}>
                            {selectedSub.autoRenew ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                        <div className="spg-row">
                          <span className="spg-label">Payment Method</span>
                          <span className="spg-val">{selectedSub.paymentMethod} ({selectedSub.paymentSub})</span>
                        </div>
                      </div>

                      <div className="sub-plan-actions">
                        <button className="sub-dp-btn-outline sm">Change Plan</button>
                        <button className="sub-dp-btn-outline sm"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> View Invoices</button>
                      </div>
                    </div>
                  </div>

                  <div className="sub-dp-section">
                    <h5 className="sub-dp-subtitle">Quick Actions</h5>
                    <div className="sub-qa-grid">
                      <button className="sub-qa-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> Send Message</button>
                      <button className="sub-qa-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Extend Plan</button>
                      <button className="sub-qa-btn danger"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg> Deactivate</button>
                      <button className="sub-qa-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Reset Password</button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="sub-dp-empty">
              Select a subscriber from the list to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
