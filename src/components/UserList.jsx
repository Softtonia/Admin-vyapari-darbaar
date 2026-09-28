import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api/config';
import DeleteModal from './DeleteModal';
import './UserList.css';

export default function UserList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Users');
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, active: 0, subscribers: 0, advertisers: 0, traders: 0, pending: 0 });
  const [search, setSearch] = useState('');
  const [userType, setUserType] = useState('All User Types');
  const [userStatus, setUserStatus] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    apiFetch('/api/admin/users/stats')
      .then(res => {
        if (res.status && res.data) setStats(res.data);
      })
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [activeTab, search, userType, userStatus, currentPage]);

  const fetchUsers = () => {
    setLoading(true);
    let queryParams = `?page=${currentPage}&per_page=20`;
    if (userStatus !== 'All Status') queryParams += `&status=${userStatus.toLowerCase()}`;
    let role = '';
    if (activeTab === 'Traders') role = 'trader';
    else if (activeTab === 'Subscribers') role = 'subscriber';
    else if (activeTab === 'Advertisers') role = 'advertiser';
    else if (activeTab === 'Pending Verification') queryParams += `&status=pending`;
    if (userType !== 'All User Types') role = userType.toLowerCase();
    if (role) queryParams += `&role=${role}`;
    if (search.trim()) queryParams += `&search=${encodeURIComponent(search.trim())}`;

    apiFetch(`/api/admin/users${queryParams}`)
      .then(data => {
        if (data.status && data.data && data.data.data) {
          const formattedUsers = data.data.data.map((user, idx) => ({
            id: user.id,
            name: user.name || user.full_name || 'N/A',
            email: user.email || 'N/A',
            phone: user.phone_number || 'N/A',
            company: user.company?.name || user.company?.company_name || 'N/A',
            type: user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1).replace('_', ' ') : 'User',
            location: user.company?.city && user.company?.state ? `${user.company.city}, ${user.company.state}` : 'N/A',
            address: user.company?.address || user.company?.address_line_1 || 'N/A',
            gstin: user.company?.gstin || 'N/A',
            joinDate: new Date(user.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            status: user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Active',
            kyc: user.company?.verification_status ? user.company.verification_status.charAt(0).toUpperCase() + user.company.verification_status.slice(1) : 'Pending',
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.full_name || 'User')}&background=random`,
          }));
          setUsersData(formattedUsers);
          if (formattedUsers.length > 0 && !selectedUser) setSelectedUser(formattedUsers[0]);
          setTotalPages(data.data.last_page || 1);
          setTotalItems(data.data.total || 0);
        }
      })
      .catch(err => console.error("Error fetching users:", err))
      .finally(() => setLoading(false));
  };

  const handleReset = () => {
    setSearch(''); setUserType('All User Types'); setUserStatus('All Status'); setActiveTab('All Users'); setCurrentPage(1);
  };

  const confirmDelete = (id) => {
    setUserToDelete(id);
    setDeleteModalOpen(true);
  };

  const executeDelete = () => {
    if (!userToDelete) return;
    apiFetch(`/api/admin/users/${userToDelete}`, { method: 'DELETE' })
      .then(res => {
        if (res.status) {
          fetchUsers();
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
    <div className="ul-page-container">
      <div className="ul-header-area">
        <div className="ul-title-section">
          <h1 className="ul-page-title">User List</h1>
          <p className="ul-page-subtitle">Manage all registered users, traders, subscribers and advertisers on the platform.</p>
        </div>
      </div>
      <div className="ul-kpi-row">
        <div className="ul-kpi-card">
          <div className="ul-kpi-header">
            <div className="ul-kpi-icon-box" style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div className="ul-kpi-info">
              <h3 className="ul-kpi-value">{stats.total.toLocaleString()}</h3>
              <p className="ul-kpi-label">Total Users</p>
            </div>
          </div>
          <div className="ul-kpi-trend green">↑ +12% this month</div>
        </div>
        <div className="ul-kpi-card">
          <div className="ul-kpi-header">
            <div className="ul-kpi-icon-box" style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
            </div>
            <div className="ul-kpi-info">
              <h3 className="ul-kpi-value">{stats.active.toLocaleString()}</h3>
              <p className="ul-kpi-label">Active Users</p>
            </div>
          </div>
          <div className="ul-kpi-trend green">↑ +8% this month</div>
        </div>
        <div className="ul-kpi-card">
          <div className="ul-kpi-header">
            <div className="ul-kpi-icon-box" style={{ backgroundColor: '#fff7ed', color: '#f97316' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div className="ul-kpi-info">
              <h3 className="ul-kpi-value">{stats.subscribers.toLocaleString()}</h3>
              <p className="ul-kpi-label">Subscribers</p>
            </div>
          </div>
          <div className="ul-kpi-trend green">↑ +15% this month</div>
        </div>
        <div className="ul-kpi-card">
          <div className="ul-kpi-header">
            <div className="ul-kpi-icon-box" style={{ backgroundColor: '#f3e8ff', color: '#a855f7' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 19 2 12 11 5 11 19"></polygon><path d="M22 12A10 10 0 0 1 12 22"></path></svg>
            </div>
            <div className="ul-kpi-info">
              <h3 className="ul-kpi-value">{stats.advertisers.toLocaleString()}</h3>
              <p className="ul-kpi-label">Advertisers</p>
            </div>
          </div>
          <div className="ul-kpi-trend green">↑ +22% this month</div>
        </div>
        <div className="ul-kpi-card">
          <div className="ul-kpi-header">
            <div className="ul-kpi-icon-box" style={{ backgroundColor: '#fef2f2', color: '#ef4444' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <div className="ul-kpi-info">
              <h3 className="ul-kpi-value">{stats.pending.toLocaleString()}</h3>
              <p className="ul-kpi-label">Pending Verification</p>
            </div>
          </div>
          <div className="ul-kpi-trend green">↑ +5% this month</div>
        </div>
      </div>
      <div className="ul-tabs-actions-row">
        <div className="ul-tabs">
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
                className={`ul-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => navigate(getRoute(tab))}
              >
                {tab} {tab === 'All Users' ? `(${stats.total.toLocaleString()})` : tab === 'Traders' ? `(${stats.traders.toLocaleString()})` : tab === 'Subscribers' ? `(${stats.subscribers.toLocaleString()})` : tab === 'Advertisers' ? `(${stats.advertisers.toLocaleString()})` : `(${stats.pending.toLocaleString()})`}
              </button>
            )
          })}
        </div>
        <button className="ul-btn-add" onClick={() => navigate('/user/add')}>+ Add New User</button>
      </div>
      <div className="ul-filters-row">
        <div className="ul-search-wrapper">
          <svg className="ul-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" placeholder="Search by name, email or phone..." className="ul-search-input" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
        </div>
        <select className="ul-filter-select" value={userType} onChange={(e) => { setUserType(e.target.value); setCurrentPage(1); }}>
          <option>All User Types</option><option value="Trader">Trader</option><option value="Subscriber">Subscriber</option><option value="Advertiser">Advertiser</option>
        </select>
        <select className="ul-filter-select" value={userStatus} onChange={(e) => { setUserStatus(e.target.value); setCurrentPage(1); }}>
          <option>All Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option>
        </select>
        <button className="ul-btn-reset" onClick={handleReset}>Reset</button>
      </div>
      <div className="ul-main-content">
        <div className="ul-table-area">
          <div className="ul-table-wrapper">
            <table className="ul-table">
              <thead><tr><th className="ul-th-checkbox"><input type="checkbox" /></th><th className="ul-th-id">#</th><th>User Details</th><th>User Type</th><th>Location</th><th>Join Date</th><th>Status</th><th>KYC</th><th className="text-center">Actions</th></tr></thead>
              <tbody>
                {loading ? (<tr><td colSpan="9" className="text-center" style={{padding: '20px'}}>Loading...</td></tr>) : usersData.length === 0 ? (<tr><td colSpan="9" className="text-center" style={{padding: '20px'}}>No users found.</td></tr>) : usersData.map((user, index) => (
                  <tr key={user.id}>
                    <td className="ul-td-checkbox" onClick={e => e.stopPropagation()}><input type="checkbox" /></td>
                    <td className="ul-td-id">{(currentPage - 1) * 20 + index + 1}</td>
                    <td><div className="ul-user-cell"><img src={user.avatar} alt={user.name} className="ul-user-avatar" /><div className="ul-user-meta"><span className="ul-user-name">{user.name}</span><span className="ul-user-contact">{user.email}</span><span className="ul-user-contact">{user.phone}</span></div></div></td>
                    <td><span className={`ul-badge-type ${(user.role || user.type || '').toLowerCase()}`}>{user.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1)) : user.type}</span></td>
                    <td><div className="ul-location-cell"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg><span>{user.location}</span></div></td>
                    <td className="ul-date-cell">{user.joinDate}</td>
                    <td><span className={`ul-badge-status ${user.status.toLowerCase()}`}><span className="ul-dot"></span> {user.status}</span></td>
                    <td><span className={`ul-badge-kyc ${user.kyc.toLowerCase()}`}><span className="ul-dot"></span> {user.kyc}</span></td>
                    <td className="ul-actions-cell" onClick={e => e.stopPropagation()}>
                      <button className="ul-action-icon-btn" onClick={() => navigate(`/user/view/${user.id}`)} title="View">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
                      <button className="ul-action-icon-btn" onClick={() => navigate(`/user/edit/${user.id}`)} title="Edit">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button className="ul-action-icon-btn" onClick={() => confirmDelete(user.id)} title="Delete">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="ul-pagination">
            <span className="ul-page-info">Showing {usersData.length > 0 ? (currentPage - 1) * 20 + 1 : 0} to {Math.min(currentPage * 20, totalItems)} of {totalItems} users</span>
            <div className="ul-page-controls">
              <button className="ul-page-nav" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNum = currentPage;
                if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage > totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;
                if (pageNum > 0 && pageNum <= totalPages) {
                  return (<button key={pageNum} className={`ul-page-num ${currentPage === pageNum ? 'active' : ''}`} onClick={() => setCurrentPage(pageNum)}>{pageNum}</button>);
                }
                return null;
              })}
              <button className="ul-page-nav" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
            </div>
          </div>
        </div>
      </div>
      
      <DeleteModal 
        isOpen={deleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)} 
        onConfirm={executeDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
      />
    </div>
  );
}
