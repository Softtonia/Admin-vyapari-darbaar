import React, { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState('Advertisers');
  const [selectedAdv, setSelectedAdv] = useState(advertisersData[0]);
  const [dpTab, setDpTab] = useState('Overview');

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
            <h3 className="adv-kpi-value">326</h3>
            <p className="adv-kpi-label">Total Advertisers</p>
            <span className="adv-kpi-trend green">↑ +16% this month</span>
          </div>
        </div>
        
        <div className="adv-kpi-card">
          <div className="adv-kpi-icon-box" style={{ backgroundColor: '#e0f2f1', color: '#00897b' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
          </div>
          <div className="adv-kpi-info">
            <h3 className="adv-kpi-value">278</h3>
            <p className="adv-kpi-label">Active Advertisers</p>
            <span className="adv-kpi-trend green">↑ +12% this month</span>
          </div>
        </div>

        <div className="adv-kpi-card">
          <div className="adv-kpi-icon-box" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div className="adv-kpi-info">
            <h3 className="adv-kpi-value">36</h3>
            <p className="adv-kpi-label">Inactive Advertisers</p>
            <span className="adv-kpi-trend red">↓ -8% this month</span>
          </div>
        </div>

        <div className="adv-kpi-card">
          <div className="adv-kpi-icon-box" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div className="adv-kpi-info">
            <h3 className="adv-kpi-value">48</h3>
            <p className="adv-kpi-label">Pending Approval</p>
            <span className="adv-kpi-trend green">↑ +20% this month</span>
          </div>
        </div>

        <div className="adv-kpi-card">
          <div className="adv-kpi-icon-box" style={{ backgroundColor: '#f3e8ff', color: '#7e22ce' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div className="adv-kpi-info">
            <h3 className="adv-kpi-value">₹8.4L</h3>
            <p className="adv-kpi-label">Monthly Ad Revenue</p>
            <span className="adv-kpi-trend green">↑ +28% this month</span>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="adv-tabs-actions-row">
        <div className="adv-tabs">
          {['All Users', 'Traders', 'Subscribers', 'Advertisers', 'Pending Verification'].map(tab => (
            <button 
              key={tab} 
              className={`adv-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab} {tab === 'All Users' ? '(12,842)' : tab === 'Traders' ? '(8,215)' : tab === 'Subscribers' ? '(1,245)' : tab === 'Advertisers' ? '(326)' : '(450)'}
            </button>
          ))}
        </div>
        <button className="adv-btn-add">+ Add New Advertiser</button>
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
                {advertisersData.map((adv, index) => (
                  <tr 
                    key={adv.id} 
                    className={selectedAdv?.id === adv.id ? 'selected-row' : ''}
                    onClick={() => setSelectedAdv(adv)}
                  >
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
                    <td className="adv-actions-cell" onClick={e => e.stopPropagation()}>
                      <button className="adv-action-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                      <button className="adv-action-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                      <button className="adv-action-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="adv-pagination">
            <span className="adv-page-info">Showing 1 to 10 of 326 advertisers</span>
            <div className="adv-page-controls">
              <button className="adv-page-nav">←</button>
              <button className="adv-page-num active">1</button>
              <button className="adv-page-num">2</button>
              <button className="adv-page-num">3</button>
              <button className="adv-page-num">4</button>
              <button className="adv-page-num">5</button>
              <span className="adv-page-dots">...</span>
              <button className="adv-page-num">33</button>
              <button className="adv-page-nav">→</button>
            </div>
          </div>
        </div>

        {/* Right: Details Panel */}
        <div className="adv-details-panel">
          {selectedAdv ? (
            <div className="adv-dp-inner">
              <div className="adv-dp-header">
                <h3>Advertiser Details</h3>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <button className="adv-close-btn" onClick={() => setSelectedAdv(null)}>×</button>
                </div>
              </div>
              
              <div className="adv-dp-profile">
                <div className="adv-dp-profile-top">
                  <div className="adv-dp-logo">
                    UOPB {/* Mock logo initials/image */}
                  </div>
                  <div className="adv-dp-name-box">
                    <h4 className="adv-dp-name">
                      {selectedAdv.company} 
                      <span className={`adv-badge-status ${selectedAdv.status.toLowerCase()}`} style={{marginLeft: 'auto', padding: '2px 6px', fontSize: '10px'}}>
                        <span className="adv-dot"></span> {selectedAdv.status}
                      </span>
                    </h4>
                    <p className="adv-dp-role">Advertiser ID: #ADV00{selectedAdv.id}</p>
                    <p className="adv-dp-member-since">Joined on 01 Sep 2026</p>
                  </div>
                </div>
              </div>

              <div className="adv-dp-tabs">
                {['Overview', 'Advertisement', 'Billing', 'Documents'].map(tab => (
                  <button 
                    key={tab} 
                    className={`adv-dp-tab ${dpTab === tab ? 'active' : ''}`}
                    onClick={() => setDpTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {dpTab === 'Overview' && (
                <div className="adv-dp-content">
                  <div className="adv-dp-grid">
                    <div className="adv-dp-item">
                      <div className="adv-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>
                      <div className="adv-dp-data">
                        <span className="adv-dp-label">Contact Person</span>
                        <span className="adv-dp-value" style={{color: '#1e3a8a'}}>{selectedAdv.contactName}</span>
                      </div>
                    </div>

                    <div className="adv-dp-item">
                      <div className="adv-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                      <div className="adv-dp-data">
                        <span className="adv-dp-label">Email</span>
                        <a href={`mailto:${selectedAdv.email}`} className="adv-dp-value link">{selectedAdv.email}</a>
                      </div>
                    </div>

                    <div className="adv-dp-item">
                      <div className="adv-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
                      <div className="adv-dp-data">
                        <span className="adv-dp-label">Phone</span>
                        <span className="adv-dp-value" style={{color: '#1e3a8a'}}>{selectedAdv.phone}</span>
                      </div>
                    </div>

                    <div className="adv-dp-item">
                      <div className="adv-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg></div>
                      <div className="adv-dp-data">
                        <span className="adv-dp-label">Company</span>
                        <span className="adv-dp-value" style={{color: '#1e3a8a'}}>{selectedAdv.company}</span>
                      </div>
                    </div>

                    <div className="adv-dp-item">
                      <div className="adv-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
                      <div className="adv-dp-data">
                        <span className="adv-dp-label">GSTIN</span>
                        <span className="adv-dp-value">10AABCA1234F1Z5</span>
                      </div>
                    </div>

                    <div className="adv-dp-item">
                      <div className="adv-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></div>
                      <div className="adv-dp-data">
                        <span className="adv-dp-label">Website</span>
                        <a href="#" className="adv-dp-value link" onClick={e=>e.preventDefault()}>www.agrolinks.com</a>
                      </div>
                    </div>

                    <div className="adv-dp-item">
                      <div className="adv-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
                      <div className="adv-dp-data">
                        <span className="adv-dp-label">Location</span>
                        <span className="adv-dp-value">Patna, Bihar</span>
                      </div>
                    </div>

                    <div className="adv-dp-item">
                      <div className="adv-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg></div>
                      <div className="adv-dp-data">
                        <span className="adv-dp-label">Business Type</span>
                        <span className="adv-dp-value">Manufacturer</span>
                      </div>
                    </div>

                    <div className="adv-dp-item" style={{alignItems: 'center'}}>
                      <div className="adv-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg></div>
                      <div className="adv-dp-data" style={{flexDirection: 'row', alignItems: 'center', gap: '8px'}}>
                        <span className="adv-dp-label" style={{marginBottom: 0}}>Verified</span>
                        <span className="adv-badge-kyc verified" style={{ padding: '2px 6px', fontSize: '11px' }}>
                          <span className="adv-dot"></span> Yes
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="adv-dp-section">
                    <h5 className="adv-dp-subtitle">Active Advertisement</h5>
                    
                    <div className="adv-plan-card">
                      <div className="adv-plan-card-header">
                        <div className="adv-ad-image-box">
                          {/* Mock background image */}
                        </div>
                        <div className="adv-ad-header-info">
                          <span className="adv-ad-title">Premium Banner Ad</span>
                          <span className="adv-ad-subtitle">Homepage Banner</span>
                        </div>
                        <span className="adv-badge-status active">
                          <span className="adv-dot"></span> Active
                        </span>
                      </div>
                      
                      <div className="adv-plan-grid">
                        <div className="apg-row">
                          <span className="apg-label">Plan</span>
                          <span className="apg-val" style={{color: '#ea580c'}}>{selectedAdv.adPlan}</span>
                        </div>
                        <div className="apg-row">
                          <span className="apg-label">Start Date</span>
                          <span className="apg-val">{selectedAdv.startDate}</span>
                        </div>
                        <div className="apg-row">
                          <span className="apg-label">End Date</span>
                          <span className="apg-val" style={{color: '#ea580c'}}>
                            {selectedAdv.endDate} (13 days left)
                          </span>
                        </div>
                        <div className="apg-row">
                          <span className="apg-label">Total Spend</span>
                          <span className="apg-val">{selectedAdv.totalSpend}</span>
                        </div>
                        <div className="apg-row">
                          <span className="apg-label">Views</span>
                          <span className="apg-val">125,432</span>
                        </div>
                        <div className="apg-row">
                          <span className="apg-label">Clicks</span>
                          <span className="apg-val">3,245</span>
                        </div>
                      </div>

                      <div className="adv-plan-actions">
                        <button className="adv-dp-btn-solid"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> View Ad Preview</button>
                        <button className="adv-dp-btn-outline"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Edit Ad</button>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>
          ) : (
            <div className="adv-dp-empty">
              Select an advertiser from the list to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
