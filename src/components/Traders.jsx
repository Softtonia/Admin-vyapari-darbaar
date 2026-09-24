import React, { useState } from 'react';
import './Traders.css';

// Mock Data for Traders
const tradersData = [
  { id: 1, name: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'rajesh.trader@gmail.com', company: 'Rajesh Agro Traders', type: 'Buyer', commodities: ['Makhana', 'Wheat'], moreComm: 2, location: 'Patna, Bihar', joinDate: '17 Sep 2026', status: 'Active', kyc: 'Verified', plan: 'Premium', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Sunil Gupta', phone: '+91 98765 43211', email: 'sunil@gupta.com', company: 'Gupta Trading Co.', type: 'Seller', commodities: ['Maize', 'Soybean'], moreComm: 3, location: 'Indore, Madhya Pradesh', joinDate: '16 Sep 2026', status: 'Active', kyc: 'Verified', plan: 'Free', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Priya Singh', phone: '+91 98765 43212', email: 'priya@ps.com', company: 'PS Commodities', type: 'Buyer', commodities: ['Pulses', 'Rice'], moreComm: 1, location: 'Jaipur, Rajasthan', joinDate: '15 Sep 2026', status: 'Active', kyc: 'Verified', plan: 'Premium', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Amit Sharma', phone: '+91 98765 43213', email: 'amit@sharma.com', company: 'Sharma Traders', type: 'Seller', commodities: ['Wheat', 'Mustard'], moreComm: 2, location: 'Kota, Rajasthan', joinDate: '14 Sep 2026', status: 'Active', kyc: 'Pending', plan: 'Basic', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'Neha Verma', phone: '+91 98765 43214', email: 'neha@verma.com', company: 'Verma Exports', type: 'Exporter', commodities: ['Makhana', 'Spices'], moreComm: 4, location: 'Delhi, Delhi', joinDate: '13 Sep 2026', status: 'Active', kyc: 'Verified', plan: 'Premium', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: 6, name: 'Sandeep Yadav', phone: '+91 98765 43215', email: 'sandeep@yadav.com', company: 'Yadav Trading', type: 'Buyer', commodities: ['Maize', 'Cotton'], moreComm: 1, location: 'Kanpur, Uttar Pradesh', joinDate: '12 Sep 2026', status: 'Inactive', kyc: 'Verified', plan: 'Free', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: 7, name: 'Rohit Mehta', phone: '+91 98765 43216', email: 'rohit@mehta.com', company: 'Mehta Commodities', type: 'Seller', commodities: ['Soybean', 'Chana'], moreComm: 2, location: 'Ahmedabad, Gujarat', joinDate: '11 Sep 2026', status: 'Active', kyc: 'Verified', plan: 'Basic', avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: 8, name: 'Anjali Gupta', phone: '+91 98765 43217', email: 'anjali@agri.com', company: 'Agri Mart India', type: 'Trader', commodities: ['Makhana', 'Wheat'], moreComm: 3, location: 'Lucknow, Uttar Pradesh', joinDate: '10 Sep 2026', status: 'Active', kyc: 'Pending', plan: 'Premium', avatar: 'https://i.pravatar.cc/150?u=8' },
  { id: 9, name: 'Vikram Joshi', phone: '+91 98765 43218', email: 'vikram@joshi.com', company: 'Joshi Agro LLP', type: 'Buyer', commodities: ['Rice', 'Pulses'], moreComm: 2, location: 'Bhopal, Madhya Pradesh', joinDate: '09 Sep 2026', status: 'Active', kyc: 'Verified', plan: 'Free', avatar: 'https://i.pravatar.cc/150?u=9' },
  { id: 10, name: 'Kavita Rao', phone: '+91 98765 43219', email: 'kavita@rao.com', company: 'Rao Global Trade', type: 'Exporter', commodities: ['Makhana', 'Herbs'], moreComm: 3, location: 'Mumbai, Maharashtra', joinDate: '08 Sep 2026', status: 'Active', kyc: 'Verified', plan: 'Premium', avatar: 'https://i.pravatar.cc/150?u=10' },
];

export default function Traders() {
  const [activeTab, setActiveTab] = useState('Traders');
  const [selectedTrader, setSelectedTrader] = useState(tradersData[0]);
  const [dpTab, setDpTab] = useState('Overview');
  
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
            <h3 className="trd-kpi-value">8,215</h3>
            <p className="trd-kpi-label">Total Traders</p>
            <span className="trd-kpi-trend green">↑ +12% this month</span>
          </div>
        </div>
        
        <div className="trd-kpi-card">
          <div className="trd-kpi-icon-box" style={{ backgroundColor: '#e0f2f1', color: '#00897b' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
          </div>
          <div className="trd-kpi-info">
            <h3 className="trd-kpi-value">6,824</h3>
            <p className="trd-kpi-label">Active Traders</p>
            <span className="trd-kpi-trend green">↑ +9% this month</span>
          </div>
        </div>

        <div className="trd-kpi-card">
          <div className="trd-kpi-icon-box" style={{ backgroundColor: '#fff3e0', color: '#f57c00' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 17l10 5 10-5M2 12l10 5 10-5M12 2L2 7l10 5 10-5-10-5z"></path></svg>
          </div>
          <div className="trd-kpi-info">
            <h3 className="trd-kpi-value">1,021</h3>
            <p className="trd-kpi-label">Premium Traders</p>
            <span className="trd-kpi-trend green">↑ +18% this month</span>
          </div>
        </div>

        <div className="trd-kpi-card">
          <div className="trd-kpi-icon-box" style={{ backgroundColor: '#ede9fe', color: '#8b5cf6' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
          </div>
          <div className="trd-kpi-info">
            <h3 className="trd-kpi-value">540</h3>
            <p className="trd-kpi-label">New This Month</p>
            <span className="trd-kpi-trend green">↑ +25% this month</span>
          </div>
        </div>

        <div className="trd-kpi-card">
          <div className="trd-kpi-icon-box" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
          </div>
          <div className="trd-kpi-info">
            <h3 className="trd-kpi-value">870</h3>
            <p className="trd-kpi-label">Verified Traders</p>
            <span className="trd-kpi-trend green">↑ +14% this month</span>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="trd-tabs-actions-row">
        <div className="trd-tabs">
          {['All Users', 'Traders', 'Subscribers', 'Advertisers', 'Pending Verification'].map(tab => (
            <button 
              key={tab} 
              className={`trd-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab} {tab === 'All Users' ? '(12,842)' : tab === 'Traders' ? '(8,215)' : tab === 'Subscribers' ? '(1,245)' : tab === 'Advertisers' ? '(326)' : '(450)'}
            </button>
          ))}
        </div>
        <button className="trd-btn-add">+ Add New Trader</button>
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
                {tradersData.map((trader, index) => (
                  <tr 
                    key={trader.id} 
                    className={selectedTrader?.id === trader.id ? 'selected-row' : ''}
                    onClick={() => setSelectedTrader(trader)}
                  >
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
                      <span className={`trd-badge-type ${trader.type.toLowerCase()}`}>{trader.type}</span>
                    </td>
                    <td>
                      <div className="trd-commodity-cell">
                        <span className="trd-comm-main">{trader.commodities[0]}</span>
                        <span className="trd-comm-sub">{trader.commodities[1]} +{trader.moreComm}</span>
                      </div>
                    </td>
                    <td>
                      <div className="trd-location-cell">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <span>{trader.location.split(',')[0]},</span>
                          <span>{trader.location.split(',')[1]}</span>
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
                    <td className="trd-actions-cell" onClick={e => e.stopPropagation()}>
                      <button className="trd-action-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                      <button className="trd-action-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                      <button className="trd-action-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="trd-pagination">
            <span className="trd-page-info">Showing 1 to 10 of 8,215 traders</span>
            <div className="trd-page-controls">
              <button className="trd-page-nav">←</button>
              <button className="trd-page-num active">1</button>
              <button className="trd-page-num">2</button>
              <button className="trd-page-num">3</button>
              <button className="trd-page-num">4</button>
              <button className="trd-page-num">5</button>
              <span className="trd-page-dots">...</span>
              <button className="trd-page-num">822</button>
              <button className="trd-page-nav">→</button>
            </div>
          </div>
        </div>

        {/* Right: Trader Details Panel */}
        <div className="trd-details-panel">
          {selectedTrader ? (
            <div className="trd-dp-inner">
              <div className="trd-dp-header">
                <h3>Trader Details</h3>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <span className={`trd-badge-status ${selectedTrader.status.toLowerCase()}`}>
                    <span className="trd-dot"></span> {selectedTrader.status}
                  </span>
                  <button className="trd-close-btn" onClick={() => setSelectedTrader(null)}>×</button>
                </div>
              </div>
              
              <div className="trd-dp-profile">
                <img src={selectedTrader.avatar} alt={selectedTrader.name} className="trd-dp-avatar" />
                <div className="trd-dp-name-box">
                  <h4 className="trd-dp-name">{selectedTrader.name}</h4>
                  <p className="trd-dp-role">{selectedTrader.type} | ID: #TRD00{selectedTrader.id}</p>
                  <p className="trd-dp-member-since">Member since {selectedTrader.joinDate}</p>
                </div>
              </div>

              <div className="trd-dp-tabs">
                {['Overview', 'Business', 'Activity', 'Documents'].map(tab => (
                  <button 
                    key={tab} 
                    className={`trd-dp-tab ${dpTab === tab ? 'active' : ''}`}
                    onClick={() => setDpTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {dpTab === 'Overview' && (
                <div className="trd-dp-content">
                  <div className="trd-dp-grid">
                    <div className="trd-dp-item">
                      <div className="trd-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg></div>
                      <div className="trd-dp-data">
                        <span className="trd-dp-label">Company</span>
                        <span className="trd-dp-value" style={{color: '#1e3a8a'}}>{selectedTrader.company}</span>
                      </div>
                    </div>

                    <div className="trd-dp-item">
                      <div className="trd-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
                      <div className="trd-dp-data">
                        <span className="trd-dp-label">Trader Type</span>
                        <span className="trd-dp-value">{selectedTrader.type}</span>
                      </div>
                    </div>

                    <div className="trd-dp-item">
                      <div className="trd-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
                      <div className="trd-dp-data">
                        <span className="trd-dp-label">Mobile</span>
                        <span className="trd-dp-value" style={{color: '#1e3a8a'}}>{selectedTrader.phone}</span>
                      </div>
                    </div>

                    <div className="trd-dp-item">
                      <div className="trd-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                      <div className="trd-dp-data">
                        <span className="trd-dp-label">Email</span>
                        <a href={`mailto:${selectedTrader.email}`} className="trd-dp-value link">{selectedTrader.email}</a>
                      </div>
                    </div>

                    <div className="trd-dp-item">
                      <div className="trd-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
                      <div className="trd-dp-data">
                        <span className="trd-dp-label">Location</span>
                        <span className="trd-dp-value" style={{color: '#1e3a8a'}}>{selectedTrader.location}</span>
                      </div>
                    </div>

                    <div className="trd-dp-item">
                      <div className="trd-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
                      <div className="trd-dp-data">
                        <span className="trd-dp-label">Address</span>
                        <span className="trd-dp-value" style={{lineHeight: '1.4'}}>Near Gandhi Maidan, Patna, Bihar 800001</span>
                      </div>
                    </div>

                    <div className="trd-dp-item" style={{alignItems: 'center'}}>
                      <div className="trd-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg></div>
                      <div className="trd-dp-data" style={{flexDirection: 'row', alignItems: 'center', gap: '8px'}}>
                        <span className="trd-dp-label" style={{marginBottom: 0}}>KYC Status</span>
                        <span className={`trd-badge-kyc ${selectedTrader.kyc.toLowerCase()}`} style={{ padding: '2px 6px', fontSize: '11px' }}>
                          <span className="trd-dot"></span> {selectedTrader.kyc}
                        </span>
                        <a href="#" className="trd-dp-link-small" onClick={e => e.preventDefault()}>View Documents</a>
                      </div>
                    </div>

                    <div className="trd-dp-item" style={{alignItems: 'center'}}>
                      <div className="trd-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>
                      <div className="trd-dp-data">
                        <span className="trd-dp-label" style={{marginBottom: '4px'}}>Subscription Plan</span>
                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                           <span className={`trd-badge-plan ${selectedTrader.plan.toLowerCase()}`} style={{ padding: '2px 8px', fontSize: '11px' }}>
                            {selectedTrader.plan === 'Premium' && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 17l10 5 10-5M2 12l10 5 10-5M12 2L2 7l10 5 10-5-10-5z"></path></svg>}
                            {selectedTrader.plan}
                           </span>
                           <span className="trd-dp-small-gray">Valid till 17 Sep 2027</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="trd-dp-section">
                    <h5 className="trd-dp-subtitle">Preferred Commodities</h5>
                    <div className="trd-dp-chips">
                      <span className="trd-chip">Makhana</span>
                      <span className="trd-chip">Wheat</span>
                      <span className="trd-chip">Pulses</span>
                      <span className="trd-chip">Maize</span>
                    </div>
                  </div>

                  <div className="trd-dp-section">
                    <h5 className="trd-dp-subtitle">About</h5>
                    <p className="trd-dp-about-text">
                      We are a leading commodities trading company dealing in makhana, wheat, pulses and other agri products across Bihar and neighbouring states.
                    </p>
                  </div>
                </div>
              )}

              <div className="trd-dp-actions">
                <button className="trd-dp-btn-solid"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> Send Message</button>
                <button className="trd-dp-btn-outline"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Edit Trader</button>
                <button className="trd-dp-btn-more"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
              </div>

            </div>
          ) : (
            <div className="trd-dp-empty">
              Select a trader from the list to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
