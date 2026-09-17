import React, { useState } from 'react';
import './RolesPermissions.css';

export default function RolesPermissions() {
  const [activeTab, setActiveTab] = useState('Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All Modules');
  const [selectedRole, setSelectedRole] = useState('Super Administrator');

  // KPI Data
  const kpiData = [
    {
      label: 'Total Roles',
      value: '8',
      trend: '↑ 14.3%',
      trendColor: 'green',
      iconType: 'roles-group',
      bgClass: 'kpi-red',
    },
    {
      label: 'Total Users',
      value: '56',
      trend: '↑ 12.5%',
      trendColor: 'green',
      iconType: 'user-single',
      bgClass: 'kpi-blue',
    },
    {
      label: 'Total Permissions',
      value: '120',
      trend: '• No change',
      trendColor: 'muted',
      iconType: 'key',
      bgClass: 'kpi-amber',
    },
    {
      label: 'Active Roles',
      value: '8',
      trend: '↑ 0%',
      trendColor: 'green',
      iconType: 'shield-check',
      bgClass: 'kpi-green',
    },
    {
      label: 'Pending Requests',
      value: '3',
      trend: '↑ 50%',
      trendColor: 'green',
      iconType: 'clock',
      bgClass: 'kpi-rose',
    },
  ];

  // Roles List
  const rolesList = [
    {
      id: 1,
      name: 'Super Administrator',
      icon: 'crown',
      description: 'Full access to all modules and settings',
      users: 2,
      permissions: 120,
      status: 'Active',
      createdOn: '01 Jan 2026',
      lastUpdated: '15 Sep 2026',
      createdBy: 'System',
      fullDescription:
        'Has complete access to manage all features, users, content, payments, and system settings.',
    },
    {
      id: 2,
      name: 'Administrator',
      icon: 'gear',
      description: 'Manage platform operations and content',
      users: 5,
      permissions: 95,
      status: 'Active',
      createdOn: '01 Jan 2026',
      lastUpdated: '12 Sep 2026',
      createdBy: 'Super Admin',
      fullDescription:
        'Manage high-level operations, approve listings, monitor activities, and maintain content accuracy.',
    },
    {
      id: 3,
      name: 'Content Manager',
      icon: 'document',
      description: 'Manage news, articles, videos and CMS',
      users: 8,
      permissions: 45,
      status: 'Active',
      createdOn: '05 Jan 2026',
      lastUpdated: '10 Sep 2026',
      createdBy: 'Administrator',
      fullDescription:
        'Create, edit, curate and publish news, articles, videos, banners, and homepage CMS sections.',
    },
    {
      id: 4,
      name: 'Trader Manager',
      icon: 'users',
      description: 'Manage traders, verification and listings',
      users: 6,
      permissions: 52,
      status: 'Active',
      createdOn: '05 Jan 2026',
      lastUpdated: '08 Sep 2026',
      createdBy: 'Super Admin',
      fullDescription:
        'Review trader verification documents, approve buy/sell listings, and resolve trade disputes.',
    },
    {
      id: 5,
      name: 'Marketing Manager',
      icon: 'megaphone',
      description: 'Manage advertisements and campaigns',
      users: 4,
      permissions: 38,
      status: 'Active',
      createdOn: '10 Jan 2026',
      lastUpdated: '05 Sep 2026',
      createdBy: 'Administrator',
      fullDescription:
        'Manage advertiser profiles, ad banner slots, promotional campaigns, and monetisation analytics.',
    },
    {
      id: 6,
      name: 'Support Executive',
      icon: 'headset',
      description: 'Handle user queries and support tickets',
      users: 12,
      permissions: 28,
      status: 'Active',
      createdOn: '10 Jan 2026',
      lastUpdated: '02 Sep 2026',
      createdBy: 'Administrator',
      fullDescription:
        'Provide customer support, manage WhatsApp/SMS alerts, and resolve trader inquiries.',
    },
    {
      id: 7,
      name: 'Analyst',
      icon: 'chart',
      description: 'View analytics and generate reports',
      users: 6,
      permissions: 32,
      status: 'Active',
      createdOn: '12 Jan 2026',
      lastUpdated: '30 Aug 2026',
      createdBy: 'Super Admin',
      fullDescription:
        'Analyze mandi rates, commodity trends, platform growth metrics, and export intelligence data.',
    },
    {
      id: 8,
      name: 'Viewer',
      icon: 'eye',
      description: 'Read-only access to limited modules',
      users: 13,
      permissions: 12,
      status: 'Active',
      createdOn: '15 Jan 2026',
      lastUpdated: '25 Aug 2026',
      createdBy: 'Super Admin',
      fullDescription:
        'Basic read-only access to browse platform overviews, published articles, and public market rates.',
    },
  ];

  // Selected Role Details
  const activeRoleDetail =
    rolesList.find((r) => r.name === selectedRole) || rolesList[0];

  // Matrix: Access levels: 'full' (dark green), 'view' (light green), 'none' (grey)
  const matrixData = [
    {
      module: 'Dashboard',
      superAdmin: 'full',
      admin: 'full',
      content: 'view',
      trader: 'view',
      marketing: 'view',
      support: 'view',
      analyst: 'view',
      viewer: 'view',
    },
    {
      module: 'Market Intelligence',
      superAdmin: 'full',
      admin: 'full',
      content: 'view',
      trader: 'view',
      marketing: 'view',
      support: 'view',
      analyst: 'view',
      viewer: 'none',
    },
    {
      module: 'Traders',
      superAdmin: 'full',
      admin: 'view',
      content: 'none',
      trader: 'full',
      marketing: 'none',
      support: 'view',
      analyst: 'view',
      viewer: 'none',
    },
    {
      module: 'Subscriptions',
      superAdmin: 'full',
      admin: 'view',
      content: 'full',
      trader: 'none',
      marketing: 'view',
      support: 'none',
      analyst: 'view',
      viewer: 'none',
    },
    {
      module: 'Payments',
      superAdmin: 'full',
      admin: 'full',
      content: 'none',
      trader: 'full',
      marketing: 'none',
      support: 'none',
      analyst: 'view',
      viewer: 'none',
    },
    {
      module: 'Advertisements',
      superAdmin: 'full',
      admin: 'full',
      content: 'none',
      trader: 'none',
      marketing: 'full',
      support: 'none',
      analyst: 'view',
      viewer: 'none',
    },
    {
      module: 'News & Content',
      superAdmin: 'full',
      admin: 'full',
      content: 'full',
      trader: 'none',
      marketing: 'full',
      support: 'none',
      analyst: 'view',
      viewer: 'none',
    },
    {
      module: 'Website CMS',
      superAdmin: 'full',
      admin: 'view',
      content: 'full',
      trader: 'none',
      marketing: 'none',
      support: 'none',
      analyst: 'none',
      viewer: 'none',
    },
    {
      module: 'Analytics',
      superAdmin: 'full',
      admin: 'full',
      content: 'view',
      trader: 'view',
      marketing: 'view',
      support: 'full',
      analyst: 'full',
      viewer: 'none',
    },
    {
      module: 'Notifications',
      superAdmin: 'full',
      admin: 'full',
      content: 'full',
      trader: 'view',
      marketing: 'view',
      support: 'none',
      analyst: 'full',
      viewer: 'none',
    },
    {
      module: 'Settings',
      superAdmin: 'full',
      admin: 'full',
      content: 'none',
      trader: 'none',
      marketing: 'none',
      support: 'view',
      analyst: 'none',
      viewer: 'none',
    },
  ];

  // Helper icon renderer for roles table
  const renderRoleIcon = (type) => {
    switch (type) {
      case 'crown':
        return <span className="role-icon-crown">👑</span>;
      case 'gear':
        return (
          <svg className="role-svg-icon" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        );
      case 'document':
        return (
          <svg className="role-svg-icon" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        );
      case 'users':
        return (
          <svg className="role-svg-icon" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'megaphone':
        return (
          <svg className="role-svg-icon" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        );
      case 'headset':
        return (
          <svg className="role-svg-icon" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
          </svg>
        );
      case 'chart':
        return (
          <svg className="role-svg-icon" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        );
      case 'eye':
        return (
          <svg className="role-svg-icon" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        );
      default:
        return <span>🛡</span>;
    }
  };

  const renderAccessDot = (level) => {
    if (level === 'full') {
      return <span className="matrix-dot dot-full" title="Full Access" />;
    }
    if (level === 'view') {
      return <span className="matrix-dot dot-view" title="View Only" />;
    }
    return <span className="matrix-dot dot-none" title="No Access" />;
  };

  return (
    <div className="roles-page-container">
      {/* 1. Row 1: 5 KPI Summary Cards */}
      <div className="roles-kpi-row">
        {kpiData.map((kpi, idx) => (
          <div key={idx} className="roles-kpi-card">
            <div className={`roles-kpi-icon-box ${kpi.bgClass}`}>
              {kpi.iconType === 'roles-group' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              )}
              {kpi.iconType === 'user-single' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
              {kpi.iconType === 'key' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2l-2 2m-1.5 1.5L16 7l-2 2m-2-2l2-2 4-4" />
                  <circle cx="7.5" cy="15.5" r="5.5" />
                  <path d="M11.5 11.5L21 2" />
                  <path d="M15 8l2 2" />
                </svg>
              )}
              {kpi.iconType === 'shield-check' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              )}
              {kpi.iconType === 'clock' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 14 14" />
                </svg>
              )}
            </div>
            <div className="roles-kpi-content">
              <span className="roles-kpi-label">{kpi.label}</span>
              <span className="roles-kpi-value">{kpi.value}</span>
              <span className={`roles-kpi-trend ${kpi.trendColor}`}>
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Row 2: Tabs & Action Bar */}
      <div className="roles-tabs-bar">
        <div className="roles-nav-tabs">
          {['Roles', 'Permissions', 'Users', 'Access Requests', 'Audit Logs', 'Settings'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`roles-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="roles-top-actions">
          <button type="button" className="btn-create-role">
            <span>+</span>
            <span>Create Role</span>
          </button>
        </div>
      </div>

      {/* 3. Main Split Layout */}
      <div className="roles-main-split">
        {/* Left Column: Roles Table & Permissions Matrix */}
        <div className="roles-left-col">
          {/* Card 1: Roles (8) */}
          <div className="roles-card">
            <div className="roles-table-toolbar">
              <h2 className="roles-table-title">Roles (8)</h2>

              <div className="roles-table-filters">
                <div className="roles-search-box">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search role name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="roles-select-box">
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>

                <button
                  type="button"
                  className="btn-reset-filter"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('All Status');
                  }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="roles-table-wrapper">
              <table className="roles-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>#</th>
                    <th style={{ width: '180px' }}>Role Name</th>
                    <th>Description</th>
                    <th style={{ width: '70px', textAlign: 'center' }}>Users</th>
                    <th style={{ width: '90px', textAlign: 'center' }}>Permissions</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>Status</th>
                    <th style={{ width: '100px' }}>Created On</th>
                    <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rolesList.map((r) => {
                    const isSelected = selectedRole === r.name;
                    return (
                      <tr
                        key={r.id}
                        className={isSelected ? 'row-selected' : ''}
                        onClick={() => setSelectedRole(r.name)}
                      >
                        <td className="col-id">{r.id}</td>
                        <td className="col-name">
                          <span className="role-icon-wrapper">{renderRoleIcon(r.icon)}</span>
                          <span className="role-name-text">{r.name}</span>
                        </td>
                        <td className="col-desc">{r.description}</td>
                        <td className="col-users" style={{ textAlign: 'center' }}>{r.users}</td>
                        <td className="col-permissions" style={{ textAlign: 'center' }}>{r.permissions}</td>
                        <td style={{ textAlign: 'center' }}>
                          <span className="status-pill active">{r.status}</span>
                        </td>
                        <td className="col-date">{r.createdOn}</td>
                        <td className="col-action">
                          <div className="action-buttons-group">
                            <button
                              type="button"
                              className="btn-edit-role"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRole(r.name);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn-dots-menu"
                              onClick={(e) => e.stopPropagation()}
                            >
                              ⋮
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 2: Permissions Matrix */}
          <div className="roles-card matrix-card">
            <div className="matrix-header">
              <div className="matrix-title-group">
                <h2 className="matrix-title">Permissions Matrix</h2>
                <span className="matrix-subtitle">Manage module-wise permissions for each role</span>
              </div>

              <div className="matrix-legend">
                <span className="legend-item">
                  <span className="legend-dot dot-full" /> Full Access
                </span>
                <span className="legend-item">
                  <span className="legend-dot dot-view" /> View Only
                </span>
                <span className="legend-item">
                  <span className="legend-dot dot-none" /> No Access
                </span>
              </div>

              <div className="matrix-filter-box">
                <select value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)}>
                  <option>All Modules</option>
                  <option>Core Operations</option>
                  <option>Financials</option>
                  <option>Content & News</option>
                </select>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="matrix-table-wrapper">
              <table className="matrix-table">
                <thead>
                  <tr>
                    <th className="th-module">Module</th>
                    <th className="th-role">Super Admin</th>
                    <th className="th-role">Administrator</th>
                    <th className="th-role">Content Manager</th>
                    <th className="th-role">Trader Manager</th>
                    <th className="th-role">Marketing Manager</th>
                    <th className="th-role">Support Executive</th>
                    <th className="th-role">Analyst</th>
                    <th className="th-role">Viewer</th>
                  </tr>
                </thead>
                <tbody>
                  {matrixData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="td-module">{row.module}</td>
                      <td className="td-dot">{renderAccessDot(row.superAdmin)}</td>
                      <td className="td-dot">{renderAccessDot(row.admin)}</td>
                      <td className="td-dot">{renderAccessDot(row.content)}</td>
                      <td className="td-dot">{renderAccessDot(row.trader)}</td>
                      <td className="td-dot">{renderAccessDot(row.marketing)}</td>
                      <td className="td-dot">{renderAccessDot(row.support)}</td>
                      <td className="td-dot">{renderAccessDot(row.analyst)}</td>
                      <td className="td-dot">{renderAccessDot(row.viewer)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Role Details & Quick Actions */}
        <div className="roles-right-col">
          {/* Card 1: Role Details */}
          <div className="roles-card role-details-card">
            <div className="role-details-header">
              <h2 className="role-details-title">Role Details</h2>
              <button type="button" className="btn-details-edit">
                Edit
              </button>
            </div>

            <div className="role-badge-hero">
              <div className="role-hero-icon-box">
                👑
              </div>
              <div className="role-hero-meta">
                <div className="role-hero-title-row">
                  <span className="role-hero-name">{activeRoleDetail.name}</span>
                  <span className="status-pill active">{activeRoleDetail.status}</span>
                </div>
              </div>
            </div>

            <p className="role-short-desc">
              {activeRoleDetail.description} across the platform.
            </p>

            <div className="role-stats-list">
              <div className="role-stat-item">
                <span className="role-stat-label-with-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>Total Users</span>
                </span>
                <span className="role-stat-val">{activeRoleDetail.users}</span>
              </div>

              <div className="role-stat-item">
                <span className="role-stat-label-with-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>Total Permissions</span>
                </span>
                <span className="role-stat-val">{activeRoleDetail.permissions}</span>
              </div>

              <div className="role-stat-item">
                <span className="role-stat-label-with-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>Created On</span>
                </span>
                <span className="role-stat-val">{activeRoleDetail.createdOn}</span>
              </div>

              <div className="role-stat-item">
                <span className="role-stat-label-with-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Last Updated</span>
                </span>
                <span className="role-stat-val">{activeRoleDetail.lastUpdated}</span>
              </div>

              <div className="role-stat-item">
                <span className="role-stat-label-with-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>Created By</span>
                </span>
                <span className="role-stat-val">{activeRoleDetail.createdBy}</span>
              </div>
            </div>

            {/* Description Box */}
            <div className="role-detail-desc-box">
              <span className="desc-box-label">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                <span>Description</span>
              </span>
              <p className="desc-box-text">{activeRoleDetail.fullDescription}</p>
            </div>
          </div>

          {/* Card 2: Quick Actions */}
          <div className="roles-card quick-actions-card">
            <h2 className="quick-actions-title">Quick Actions</h2>

            <div className="quick-actions-list">
              <button type="button" className="quick-action-item">
                <div className="quick-icon-box q-red">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                </div>
                <div className="quick-text-box">
                  <span className="quick-title">Create New Role</span>
                  <span className="quick-desc">Add a new role with custom permissions</span>
                </div>
              </button>

              <button type="button" className="quick-action-item">
                <div className="quick-icon-box q-blue">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div className="quick-text-box">
                  <span className="quick-title">Manage Permissions</span>
                  <span className="quick-desc">View and configure module permissions</span>
                </div>
              </button>

              <button type="button" className="quick-action-item">
                <div className="quick-icon-box q-amber">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="quick-text-box">
                  <span className="quick-title">Assign Users</span>
                  <span className="quick-desc">Assign or remove users from roles</span>
                </div>
              </button>

              <button type="button" className="quick-action-item">
                <div className="quick-icon-box q-green">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                </div>
                <div className="quick-text-box">
                  <span className="quick-title">Access Requests</span>
                  <span className="quick-desc">Review pending role access requests</span>
                </div>
              </button>

              <button type="button" className="quick-action-item">
                <div className="quick-icon-box q-indigo">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>
                <div className="quick-text-box">
                  <span className="quick-title">Export Roles</span>
                  <span className="quick-desc">Download roles and permissions (CSV)</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
