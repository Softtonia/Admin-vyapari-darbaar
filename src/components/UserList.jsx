import React, { useState } from 'react';
import './UserList.css';

// Mock Data
const usersData = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh.trader@gmail.com', phone: '+91 98765 43210', type: 'Trader', location: 'Patna, Bihar', joinDate: '17 Sep 2026', status: 'Active', kyc: 'Verified', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Priya Singh', email: 'priya.singh@agrotraders.in', phone: '+91 98765 43211', type: 'Subscriber', location: 'Indore, Madhya Pradesh', joinDate: '16 Sep 2026', status: 'Active', kyc: 'Verified', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Amit Sharma', email: 'amit@globalexport.com', phone: '+91 98765 43212', type: 'Advertiser', location: 'Mumbai, Maharashtra', joinDate: '15 Sep 2026', status: 'Active', kyc: 'Verified', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Neha Verma', email: 'neha.verma@gmail.com', phone: '+91 98765 43213', type: 'Trader', location: 'Kota, Rajasthan', joinDate: '14 Sep 2026', status: 'Active', kyc: 'Pending', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'Sandeep Yadav', email: 'sandeepy@gmail.com', phone: '+91 98765 43214', type: 'Trader', location: 'Kanpur, Uttar Pradesh', joinDate: '13 Sep 2026', status: 'Inactive', kyc: 'Verified', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: 6, name: 'Kavita Rao', email: 'kavita@spicesindia.com', phone: '+91 98765 43215', type: 'Subscriber', location: 'Ahmedabad, Gujarat', joinDate: '12 Sep 2026', status: 'Active', kyc: 'Verified', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: 7, name: 'Rohit Mehta', email: 'rohit.mehta@gmail.com', phone: '+91 98765 43216', type: 'Trader', location: 'Delhi, Delhi', joinDate: '11 Sep 2026', status: 'Active', kyc: 'Pending', avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: 8, name: 'Anjali Gupta', email: 'anjali.gupta@farmers.in', phone: '+91 98765 43217', type: 'Subscriber', location: 'Lucknow, Uttar Pradesh', joinDate: '10 Sep 2026', status: 'Active', kyc: 'Verified', avatar: 'https://i.pravatar.cc/150?u=8' },
  { id: 9, name: 'Vikram Joshi', email: 'vikram@tradelink.com', phone: '+91 98765 43218', type: 'Advertiser', location: 'Jaipur, Rajasthan', joinDate: '09 Sep 2026', status: 'Active', kyc: 'Verified', avatar: 'https://i.pravatar.cc/150?u=9' },
  { id: 10, name: 'Sunil Patel', email: 'sunil.patel@gmail.com', phone: '+91 98765 43219', type: 'Trader', location: 'Bhopal, Madhya Pradesh', joinDate: '08 Sep 2026', status: 'Inactive', kyc: 'Verified', avatar: 'https://i.pravatar.cc/150?u=10' },
];

export default function UserList() {
  const [activeTab, setActiveTab] = useState('All Users');
  const [selectedUser, setSelectedUser] = useState(usersData[0]); // By default select first user for details panel
  
  return (
    <div className="ul-page-container">
      {/* Header section is managed via Dashboard usually, but the design shows a specific title and KPI cards */}
      <div className="ul-header-area">
        <div className="ul-title-section">
          <h1 className="ul-page-title">User List</h1>
          <p className="ul-page-subtitle">Manage all registered users, traders, subscribers and advertisers on the platform.</p>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="ul-kpi-row">
        <div className="ul-kpi-card">
          <div className="ul-kpi-icon-box" style={{ backgroundColor: '#e6f7f2', color: '#10b981' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div className="ul-kpi-info">
            <h3 className="ul-kpi-value">12,842</h3>
            <p className="ul-kpi-label">Total Users</p>
            <span className="ul-kpi-trend green">↑ +12% this month</span>
          </div>
        </div>
        
        <div className="ul-kpi-card">
          <div className="ul-kpi-icon-box" style={{ backgroundColor: '#e0f2f1', color: '#00897b' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
          </div>
          <div className="ul-kpi-info">
            <h3 className="ul-kpi-value">8,621</h3>
            <p className="ul-kpi-label">Active Users</p>
            <span className="ul-kpi-trend green">↑ +8% this month</span>
          </div>
        </div>

        <div className="ul-kpi-card">
          <div className="ul-kpi-icon-box" style={{ backgroundColor: '#fff3e0', color: '#f57c00' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <div className="ul-kpi-info">
            <h3 className="ul-kpi-value">1,245</h3>
            <p className="ul-kpi-label">Subscribers</p>
            <span className="ul-kpi-trend green">↑ +15% this month</span>
          </div>
        </div>

        <div className="ul-kpi-card">
          <div className="ul-kpi-icon-box" style={{ backgroundColor: '#f3e5f5', color: '#8e24aa' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 19 2 12 11 5 11 19"></polygon><path d="M22 12A10 10 0 0 1 12 22"></path></svg>
          </div>
          <div className="ul-kpi-info">
            <h3 className="ul-kpi-value">326</h3>
            <p className="ul-kpi-label">Advertisers</p>
            <span className="ul-kpi-trend green">↑ +22% this month</span>
          </div>
        </div>

        <div className="ul-kpi-card">
          <div className="ul-kpi-icon-box" style={{ backgroundColor: '#ffebee', color: '#e53935' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <div className="ul-kpi-info">
            <h3 className="ul-kpi-value">450</h3>
            <p className="ul-kpi-label">Pending Verification</p>
            <span className="ul-kpi-trend green">↑ +5% this month</span>
          </div>
        </div>
      </div>

      {/* Tabs and Actions Row */}
      <div className="ul-tabs-actions-row">
        <div className="ul-tabs">
          {['All Users', 'Traders', 'Subscribers', 'Advertisers', 'Pending Verification'].map(tab => (
            <button 
              key={tab} 
              className={`ul-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab} {tab === 'All Users' ? '(12,842)' : tab === 'Traders' ? '(8,215)' : tab === 'Subscribers' ? '(1,245)' : tab === 'Advertisers' ? '(326)' : '(450)'}
            </button>
          ))}
        </div>
        <button className="ul-btn-add">+ Add New User</button>
      </div>

      {/* Filters Row */}
      <div className="ul-filters-row">
        <div className="ul-search-wrapper">
          <svg className="ul-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" placeholder="Search by name, email, phone or company..." className="ul-search-input" />
        </div>
        
        <select className="ul-filter-select">
          <option>All User Types</option>
          <option>Trader</option>
          <option>Subscriber</option>
          <option>Advertiser</option>
        </select>
        
        <select className="ul-filter-select">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        
        <select className="ul-filter-select">
          <option>All States</option>
          <option>Bihar</option>
          <option>Maharashtra</option>
          <option>Madhya Pradesh</option>
        </select>
        
        <div className="ul-date-picker">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          <span>Join Date Range</span>
        </div>
        
        <button className="ul-btn-reset">Reset</button>
      </div>

      {/* Main Split Layout */}
      <div className="ul-main-content">
        
        {/* Left: Table Area */}
        <div className="ul-table-area">
          <div className="ul-table-wrapper">
            <table className="ul-table">
              <thead>
                <tr>
                  <th className="ul-th-checkbox"><input type="checkbox" /></th>
                  <th className="ul-th-id">#</th>
                  <th>User Details</th>
                  <th>User Type</th>
                  <th>Location</th>
                  <th>Join Date ▾</th>
                  <th>Status</th>
                  <th>KYC</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user, index) => (
                  <tr 
                    key={user.id} 
                    className={selectedUser?.id === user.id ? 'selected-row' : ''}
                    onClick={() => setSelectedUser(user)}
                  >
                    <td className="ul-td-checkbox" onClick={e => e.stopPropagation()}>
                      <input type="checkbox" />
                    </td>
                    <td className="ul-td-id">{index + 1}</td>
                    <td>
                      <div className="ul-user-cell">
                        <img src={user.avatar} alt={user.name} className="ul-user-avatar" />
                        <div className="ul-user-meta">
                          <span className="ul-user-name">{user.name}</span>
                          <span className="ul-user-contact">{user.email}</span>
                          <span className="ul-user-contact">{user.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`ul-badge-type ${user.type.toLowerCase()}`}>{user.type}</span>
                    </td>
                    <td>
                      <div className="ul-location-cell">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <span>{user.location}</span>
                      </div>
                    </td>
                    <td className="ul-date-cell">{user.joinDate}</td>
                    <td>
                      <span className={`ul-badge-status ${user.status.toLowerCase()}`}>
                        <span className="ul-dot"></span> {user.status}
                      </span>
                    </td>
                    <td>
                      <span className={`ul-badge-kyc ${user.kyc.toLowerCase()}`}>
                        <span className="ul-dot"></span> {user.kyc}
                      </span>
                    </td>
                    <td className="ul-actions-cell" onClick={e => e.stopPropagation()}>
                      <button className="ul-action-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                      <button className="ul-action-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                      <button className="ul-action-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="ul-pagination">
            <span className="ul-page-info">Showing 1 to 10 of 12,842 users</span>
            <div className="ul-page-controls">
              <button className="ul-page-nav">←</button>
              <button className="ul-page-num active">1</button>
              <button className="ul-page-num">2</button>
              <button className="ul-page-num">3</button>
              <button className="ul-page-num">4</button>
              <button className="ul-page-num">5</button>
              <span className="ul-page-dots">...</span>
              <button className="ul-page-num">1,285</button>
              <button className="ul-page-nav">→</button>
            </div>
          </div>
        </div>

        {/* Right: User Details Panel */}
        <div className="ul-details-panel">
          {selectedUser ? (
            <div className="ul-dp-inner">
              <div className="ul-dp-header">
                <h3>User Details</h3>
                <span className={`ul-badge-status ${selectedUser.status.toLowerCase()}`}>
                  <span className="ul-dot"></span> {selectedUser.status}
                </span>
              </div>
              
              <div className="ul-dp-profile">
                <img src={selectedUser.avatar} alt={selectedUser.name} className="ul-dp-avatar" />
                <div className="ul-dp-name-box">
                  <h4 className="ul-dp-name">{selectedUser.name}</h4>
                  <p className="ul-dp-role">{selectedUser.type} | ID: #USR00{selectedUser.id}</p>
                  <p className="ul-dp-member-since">Member since {selectedUser.joinDate}</p>
                </div>
              </div>

              <div className="ul-dp-tabs">
                <button className="ul-dp-tab active">Overview</button>
                <button className="ul-dp-tab">Subscription</button>
                <button className="ul-dp-tab">KYC Documents</button>
              </div>

              <div className="ul-dp-content">
                <div className="ul-dp-grid">
                  <div className="ul-dp-item">
                    <div className="ul-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                    <div className="ul-dp-data">
                      <span className="ul-dp-label">Email</span>
                      <a href={`mailto:${selectedUser.email}`} className="ul-dp-value link">{selectedUser.email}</a>
                    </div>
                  </div>

                  <div className="ul-dp-item">
                    <div className="ul-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
                    <div className="ul-dp-data">
                      <span className="ul-dp-label">Phone</span>
                      <span className="ul-dp-value">{selectedUser.phone}</span>
                    </div>
                  </div>

                  <div className="ul-dp-item">
                    <div className="ul-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg></div>
                    <div className="ul-dp-data">
                      <span className="ul-dp-label">Company</span>
                      <span className="ul-dp-value">Rajesh Agro Traders</span>
                    </div>
                  </div>

                  <div className="ul-dp-item">
                    <div className="ul-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
                    <div className="ul-dp-data">
                      <span className="ul-dp-label">User Type</span>
                      <span className="ul-dp-value">{selectedUser.type}</span>
                    </div>
                  </div>

                  <div className="ul-dp-item">
                    <div className="ul-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
                    <div className="ul-dp-data">
                      <span className="ul-dp-label">Location</span>
                      <span className="ul-dp-value">{selectedUser.location}</span>
                    </div>
                  </div>

                  <div className="ul-dp-item">
                    <div className="ul-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
                    <div className="ul-dp-data">
                      <span className="ul-dp-label">Address</span>
                      <span className="ul-dp-value">Near Gandhi Maidan, Patna, Bihar 800001</span>
                    </div>
                  </div>

                  <div className="ul-dp-item">
                    <div className="ul-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
                    <div className="ul-dp-data">
                      <span className="ul-dp-label">GST Number</span>
                      <span className="ul-dp-value">10ABCDE1234F1Z5</span>
                    </div>
                  </div>

                  <div className="ul-dp-item">
                    <div className="ul-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg></div>
                    <div className="ul-dp-data">
                      <span className="ul-dp-label">KYC Status</span>
                      <span className={`ul-badge-kyc ${selectedUser.kyc.toLowerCase()}`} style={{ width: 'fit-content', padding: '2px 8px', fontSize: '11px', marginTop: '2px' }}>
                        <span className="ul-dot"></span> {selectedUser.kyc}
                      </span>
                    </div>
                  </div>

                  <div className="ul-dp-item">
                    <div className="ul-dp-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
                    <div className="ul-dp-data">
                      <span className="ul-dp-label">Last Login</span>
                      <span className="ul-dp-value">17 Sep 2026, 09:15 AM</span>
                    </div>
                  </div>

                </div>
              </div>

              <div className="ul-dp-actions">
                <button className="ul-dp-btn-outline">Send Message</button>
                <button className="ul-dp-btn-solid"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Edit User</button>
              </div>

            </div>
          ) : (
            <div className="ul-dp-empty">
              Select a user from the list to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
