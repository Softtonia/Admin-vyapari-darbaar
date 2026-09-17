import React, { useState } from 'react';
import './NotificationManagement.css';

export default function NotificationManagement() {
  const [activeTab, setActiveTab] = useState('All Notifications');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedAudience, setSelectedAudience] = useState('All Users');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [dateRange, setDateRange] = useState('01 Sep 2026 - 17 Sep 2026');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [pageSize, setPageSize] = useState('10 / page');
  const [currentPage, setCurrentPage] = useState(1);

  const tabs = [
    'All Notifications',
    'Create Notification',
    'Templates',
    'Scheduled',
    'Campaigns',
    'Settings',
  ];

  // 10 Table Rows Data
  const notificationsData = [
    {
      id: '#NOT1024',
      title: "Today's Mandi Rates Updated",
      iconBg: '#dcfce7',
      iconColor: '#16a34a',
      iconType: 'paperplane',
      type: 'Market Alert',
      typeTheme: 'green',
      audience: 'All Traders',
      sentOn: '17 Sep 2026',
      sentTime: '09:00 AM',
      status: 'Sent',
      reach: '24,680',
      openRate: '72.4%',
    },
    {
      id: '#NOT1023',
      title: 'New Buy Requirement in Makhana',
      iconBg: '#e0f2fe',
      iconColor: '#0284c7',
      iconType: 'share',
      type: 'Trade Alert',
      typeTheme: 'cyan',
      audience: 'Relevant Traders',
      sentOn: '16 Sep 2026',
      sentTime: '04:30 PM',
      status: 'Sent',
      reach: '8,420',
      openRate: '65.2%',
    },
    {
      id: '#NOT1022',
      title: 'Government Policy Update on Agri Exports',
      iconBg: '#fef3c7',
      iconColor: '#d97706',
      iconType: 'document',
      type: 'Policy Update',
      typeTheme: 'purple',
      audience: 'All Users',
      sentOn: '16 Sep 2026',
      sentTime: '11:15 AM',
      status: 'Sent',
      reach: '32,180',
      openRate: '68.9%',
    },
    {
      id: '#NOT1021',
      title: 'New Article Published: Global Food Prices',
      iconBg: '#ffedd5',
      iconColor: '#ea580c',
      iconType: 'newspaper',
      type: 'Content Update',
      typeTheme: 'orange',
      audience: 'All Users',
      sentOn: '15 Sep 2026',
      sentTime: '06:20 PM',
      status: 'Sent',
      reach: '28,450',
      openRate: '61.3%',
    },
    {
      id: '#NOT1020',
      title: 'Subscription Renewal Reminder',
      iconBg: '#e0e7ff',
      iconColor: '#4f46e5',
      iconType: 'bell',
      type: 'Account',
      typeTheme: 'red',
      audience: 'Subscribers',
      sentOn: '15 Sep 2026',
      sentTime: '10:00 AM',
      status: 'Sent',
      reach: '12,340',
      openRate: '54.8%',
    },
    {
      id: '#NOT1019',
      title: 'New Video: Commodity Market Analysis',
      iconBg: '#fee2e2',
      iconColor: '#dc2626',
      iconType: 'video',
      type: 'Video Update',
      typeTheme: 'coral',
      audience: 'All Users',
      sentOn: '14 Sep 2026',
      sentTime: '05:45 PM',
      status: 'Sent',
      reach: '26,780',
      openRate: '66.1%',
    },
    {
      id: '#NOT1018',
      title: 'Advertisement Slot Now Available',
      iconBg: '#fef9c3',
      iconColor: '#ca8a04',
      iconType: 'megaphone',
      type: 'Advertisement',
      typeTheme: 'amber',
      audience: 'Advertisers',
      sentOn: '14 Sep 2026',
      sentTime: '12:30 PM',
      status: 'Sent',
      reach: '4,820',
      openRate: '49.6%',
    },
    {
      id: '#NOT1017',
      title: 'Payment Successful',
      iconBg: '#e0f2fe',
      iconColor: '#0284c7',
      iconType: 'check',
      type: 'Transaction',
      typeTheme: 'cyan',
      audience: 'Individual User',
      sentOn: '13 Sep 2026',
      sentTime: '08:15 PM',
      status: 'Sent',
      reach: '1,120',
      openRate: '81.3%',
    },
    {
      id: '#NOT1016',
      title: 'Welcome to Vyapari Darbaar',
      iconBg: '#dcfce7',
      iconColor: '#026544',
      iconType: 'building',
      type: 'System',
      typeTheme: 'gray',
      audience: 'New Users',
      sentOn: '13 Sep 2026',
      sentTime: '10:00 AM',
      status: 'Sent',
      reach: '980',
      openRate: '78.2%',
    },
    {
      id: '#NOT1015',
      title: 'Weekly Market Insights Newsletter',
      iconBg: '#e0e7ff',
      iconColor: '#3b82f6',
      iconType: 'newsletter',
      type: 'Newsletter',
      typeTheme: 'purple',
      audience: 'Subscribers',
      sentOn: '12 Sep 2026',
      sentTime: '06:00 PM',
      status: 'Scheduled',
      reach: '-',
      openRate: '-',
    },
  ];

  // Channel items
  const channels = [
    {
      name: 'In-App Notifications',
      desc: 'Send notifications within platform',
      iconBg: '#fee2e2',
      iconColor: '#dc2626',
      icon: 'bell',
      status: 'Active',
    },
    {
      name: 'Email Notifications',
      desc: 'Send via email to users',
      iconBg: '#e0f2fe',
      iconColor: '#0284c7',
      icon: 'mail',
      status: 'Active',
    },
    {
      name: 'WhatsApp Notifications',
      desc: 'Send via WhatsApp (API)',
      iconBg: '#dcfce7',
      iconColor: '#16a34a',
      icon: 'whatsapp',
      status: 'Active',
    },
    {
      name: 'SMS Notifications',
      desc: 'Send via SMS to mobile',
      iconBg: '#f3e8ff',
      iconColor: '#9333ea',
      icon: 'phone',
      status: 'Active',
    },
    {
      name: 'Push Notifications',
      desc: 'Send browser push notifications',
      iconBg: '#fee2e2',
      iconColor: '#ea580c',
      icon: 'megaphone',
      status: 'Active',
    },
  ];

  // Quick templates
  const templates = [
    {
      name: 'Market Rate Alert',
      desc: 'Notify users about updated mandi rates',
      iconBg: '#fef3c7',
      iconColor: '#d97706',
      icon: 'bell',
    },
    {
      name: 'New Trade Requirement',
      desc: 'Alert relevant traders about new buy/sell requirements',
      iconBg: '#dcfce7',
      iconColor: '#16a34a',
      icon: 'paperplane',
    },
    {
      name: 'Policy Update',
      desc: 'Share government policy updates',
      iconBg: '#f3e8ff',
      iconColor: '#9333ea',
      icon: 'document',
    },
    {
      name: 'Newsletter',
      desc: 'Weekly or monthly newsletter',
      iconBg: '#e0f2fe',
      iconColor: '#0284c7',
      icon: 'newsletter',
    },
    {
      name: 'Payment Reminder',
      desc: 'Remind users about subscription renewal',
      iconBg: '#fee2e2',
      iconColor: '#dc2626',
      icon: 'creditcard',
    },
  ];

  // Recent notifications
  const recentNotifications = [
    { name: "Today's Mandi Rates Updated", dotColor: '#16a34a', time: '2 mins ago' },
    { name: 'New Buy Requirement in Makhana', dotColor: '#0284c7', time: '3 hours ago' },
    { name: 'Government Policy Update', dotColor: '#0284c7', time: '6 hours ago' },
    { name: 'New Article Published', dotColor: '#f59e0b', time: '1 day ago' },
    { name: 'Subscription Renewal Reminder', dotColor: '#dc2626', time: '1 day ago' },
  ];

  const handleToggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      setSelectedRows(notificationsData.map((d) => d.id));
      setSelectAll(true);
    }
  };

  const handleToggleRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((r) => r !== id));
      setSelectAll(false);
    } else {
      const next = [...selectedRows, id];
      setSelectedRows(next);
      if (next.length === notificationsData.length) {
        setSelectAll(true);
      }
    }
  };

  // Render Table Row Icon
  const renderRowIcon = (type, color) => {
    switch (type) {
      case 'paperplane':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        );
      case 'share':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        );
      case 'document':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        );
      case 'newspaper':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
            <path d="M18 14h-8" />
            <path d="M15 18h-5" />
            <path d="M10 6h8v4h-8V6Z" />
          </svg>
        );
      case 'bell':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        );
      case 'video':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2.18" ry="2.18" />
            <polygon points="10 8 16 12 10 16 10 8" fill={color} />
          </svg>
        );
      case 'megaphone':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 11 18-5v12L3 13v-2z" />
            <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
          </svg>
        );
      case 'check':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );
      case 'building':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h1M9 13h1M9 17h1M14 9h1M14 13h1M14 17h1" />
          </svg>
        );
      case 'newsletter':
      default:
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <line x1="7" y1="8" x2="17" y2="8" />
            <line x1="7" y1="12" x2="17" y2="12" />
            <line x1="7" y1="16" x2="13" y2="16" />
          </svg>
        );
    }
  };

  return (
    <div className="notif-viewport">
      {/* ====================================================================
          Row 1: 4 Summary KPI Cards
          ==================================================================== */}
      <div className="notif-kpi-row">
        {/* Card 1: Total Notifications */}
        <div className="notif-kpi-card">
          <div className="notif-kpi-left">
            <div className="notif-kpi-icon-box gold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <div className="notif-kpi-details">
              <span className="notif-kpi-label">Total Notifications</span>
              <span className="notif-kpi-value">1,284</span>
              <div className="notif-kpi-trend green">
                <span className="notif-trend-arrow">↑ 12.4%</span>
                <span className="notif-trend-period">vs last month</span>
              </div>
            </div>
          </div>
          <div className="notif-kpi-sparkline green">
            <span style={{ height: '35%' }} />
            <span style={{ height: '48%' }} />
            <span style={{ height: '62%' }} />
            <span style={{ height: '75%' }} />
            <span style={{ height: '90%' }} />
            <span style={{ height: '100%' }} />
          </div>
        </div>

        {/* Card 2: Sent Notifications */}
        <div className="notif-kpi-card">
          <div className="notif-kpi-left">
            <div className="notif-kpi-icon-box cyan">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#0284c7" />
              </svg>
            </div>
            <div className="notif-kpi-details">
              <span className="notif-kpi-label">Sent Notifications</span>
              <span className="notif-kpi-value">1,162</span>
              <div className="notif-kpi-trend green">
                <span className="notif-trend-arrow">↑ 15.8%</span>
                <span className="notif-trend-period">vs last month</span>
              </div>
            </div>
          </div>
          <div className="notif-kpi-sparkline cyan">
            <span style={{ height: '40%' }} />
            <span style={{ height: '55%' }} />
            <span style={{ height: '65%' }} />
            <span style={{ height: '72%' }} />
            <span style={{ height: '88%' }} />
            <span style={{ height: '100%' }} />
          </div>
        </div>

        {/* Card 3: Recipients Reached */}
        <div className="notif-kpi-card">
          <div className="notif-kpi-left">
            <div className="notif-kpi-icon-box red">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="notif-kpi-details">
              <span className="notif-kpi-label">Recipients Reached</span>
              <span className="notif-kpi-value">3,24,680</span>
              <div className="notif-kpi-trend green">
                <span className="notif-trend-arrow">↑ 22.1%</span>
                <span className="notif-trend-period">vs last month</span>
              </div>
            </div>
          </div>
          <div className="notif-kpi-sparkline amber">
            <span style={{ height: '32%' }} />
            <span style={{ height: '46%' }} />
            <span style={{ height: '60%' }} />
            <span style={{ height: '74%' }} />
            <span style={{ height: '86%' }} />
            <span style={{ height: '100%' }} />
          </div>
        </div>

        {/* Card 4: Average Open Rate */}
        <div className="notif-kpi-card">
          <div className="notif-kpi-left">
            <div className="notif-kpi-icon-box green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div className="notif-kpi-details">
              <span className="notif-kpi-label">Average Open Rate</span>
              <span className="notif-kpi-value">68.4%</span>
              <div className="notif-kpi-trend green">
                <span className="notif-trend-arrow">↑ 8.6%</span>
                <span className="notif-trend-period">vs last month</span>
              </div>
            </div>
          </div>
          <div className="notif-kpi-sparkline green">
            <span style={{ height: '42%' }} />
            <span style={{ height: '54%' }} />
            <span style={{ height: '68%' }} />
            <span style={{ height: '78%' }} />
            <span style={{ height: '90%' }} />
            <span style={{ height: '100%' }} />
          </div>
        </div>
      </div>

      {/* ====================================================================
          Tab Navigation & Top Action Button
          ==================================================================== */}
      <div className="notif-tabs-row">
        <div className="notif-tabs-nav">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`notif-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <button type="button" className="notif-create-btn">
          <span>+ Create Notification</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* ====================================================================
          Filter Toolbar
          ==================================================================== */}
      <div className="notif-filter-bar">
        <div className="notif-filter-group search">
          <label className="notif-filter-label">Search</label>
          <div className="notif-input-with-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="notif-search-svg">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search title, message, audienc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="notif-filter-input"
            />
          </div>
        </div>

        <div className="notif-filter-group">
          <label className="notif-filter-label">Notification Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="notif-filter-select"
          >
            <option value="All Types">All Types</option>
            <option value="Market Alert">Market Alert</option>
            <option value="Trade Alert">Trade Alert</option>
            <option value="Policy Update">Policy Update</option>
            <option value="Content Update">Content Update</option>
          </select>
        </div>

        <div className="notif-filter-group">
          <label className="notif-filter-label">Audience</label>
          <select
            value={selectedAudience}
            onChange={(e) => setSelectedAudience(e.target.value)}
            className="notif-filter-select"
          >
            <option value="All Users">All Users</option>
            <option value="All Traders">All Traders</option>
            <option value="Relevant Traders">Relevant Traders</option>
            <option value="Subscribers">Subscribers</option>
            <option value="Advertisers">Advertisers</option>
          </select>
        </div>

        <div className="notif-filter-group">
          <label className="notif-filter-label">Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="notif-filter-select"
          >
            <option value="All Status">All Status</option>
            <option value="Sent">Sent</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        <div className="notif-filter-group date">
          <label className="notif-filter-label">Date Range</label>
          <div className="notif-date-range-box">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{dateRange}</span>
          </div>
        </div>

        <div className="notif-filter-actions">
          <button type="button" className="notif-apply-btn">
            Apply Filters
          </button>
          <button type="button" className="notif-reset-btn">
            Reset
          </button>
        </div>
      </div>

      {/* ====================================================================
          Main Split Layout: Left Table vs Right Sidebar Cards
          ==================================================================== */}
      <div className="notif-main-split">
        {/* Left Area: Notifications Table */}
        <div className="notif-table-card">
          <div className="notif-table-header">
            <span className="notif-table-title">Notifications (1,284)</span>
          </div>

          <div className="notif-table-wrapper">
            <table className="notif-data-table">
              <thead>
                <tr>
                  <th style={{ width: '28px' }}>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleToggleSelectAll}
                      className="notif-checkbox"
                    />
                  </th>
                  <th style={{ width: '75px' }}>#</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Audience</th>
                  <th>Sent On</th>
                  <th>Status</th>
                  <th>Reach</th>
                  <th>Open Rate</th>
                  <th style={{ width: '80px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {notificationsData.map((row) => {
                  const isChecked = selectedRows.includes(row.id);
                  return (
                    <tr key={row.id} className={isChecked ? 'selected' : ''}>
                      <td>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleRow(row.id)}
                          className="notif-checkbox"
                        />
                      </td>
                      <td className="notif-td-id">{row.id}</td>
                      <td className="notif-td-title">
                        <div className="notif-title-cell">
                          <div
                            className="notif-title-icon-box"
                            style={{ background: row.iconBg }}
                          >
                            {renderRowIcon(row.iconType, row.iconColor)}
                          </div>
                          <span className="notif-title-text">{row.title}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`notif-type-pill ${row.typeTheme}`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="notif-td-audience">{row.audience}</td>
                      <td className="notif-td-sent">
                        <span className="notif-date">{row.sentOn}</span>
                        <span className="notif-time">{row.sentTime}</span>
                      </td>
                      <td>
                        <span className={`notif-status-pill ${row.status.toLowerCase()}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="notif-td-reach">{row.reach}</td>
                      <td className="notif-td-openrate">{row.openRate}</td>
                      <td>
                        <div className="notif-action-cell">
                          <button type="button" className="notif-view-btn">
                            View
                          </button>
                          <button type="button" className="notif-more-btn" title="More options">
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

          {/* Pagination Row */}
          <div className="notif-pagination-row">
            <span className="notif-pagination-info">Showing 1 to 10 of 1,284 entries</span>
            <div className="notif-pagination-controls">
              <button
                type="button"
                className="notif-page-nav-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                ‹
              </button>
              <button
                type="button"
                className={`notif-page-num-btn ${currentPage === 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button
                type="button"
                className={`notif-page-num-btn ${currentPage === 2 ? 'active' : ''}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button
                type="button"
                className={`notif-page-num-btn ${currentPage === 3 ? 'active' : ''}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <button
                type="button"
                className={`notif-page-num-btn ${currentPage === 4 ? 'active' : ''}`}
                onClick={() => setCurrentPage(4)}
              >
                4
              </button>
              <button
                type="button"
                className={`notif-page-num-btn ${currentPage === 5 ? 'active' : ''}`}
                onClick={() => setCurrentPage(5)}
              >
                5
              </button>
              <span className="notif-page-ellipsis">...</span>
              <button
                type="button"
                className="notif-page-num-btn"
                onClick={() => setCurrentPage(129)}
              >
                129
              </button>
              <button
                type="button"
                className="notif-page-nav-btn"
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                ›
              </button>
            </div>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
              className="notif-page-size-select"
            >
              <option value="10 / page">10 / page</option>
              <option value="25 / page">25 / page</option>
              <option value="50 / page">50 / page</option>
            </select>
          </div>
        </div>

        {/* Right Area: Notification Channels, Quick Templates, Recent Notifications */}
        <div className="notif-sidebar-area">
          {/* Card 1: Notification Channels */}
          <div className="notif-side-card">
            <div className="notif-side-card-header">
              <span className="notif-side-card-title">Notification Channels</span>
            </div>
            <div className="notif-channels-list">
              {channels.map((ch, idx) => (
                <div key={idx} className="notif-channel-item">
                  <div className="notif-channel-left">
                    <div className="notif-channel-icon" style={{ background: ch.iconBg, color: ch.iconColor }}>
                      {ch.icon === 'bell' && (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                      )}
                      {ch.icon === 'mail' && (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      )}
                      {ch.icon === 'whatsapp' && (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                      )}
                      {ch.icon === 'phone' && (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      )}
                      {ch.icon === 'megaphone' && (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m3 11 18-5v12L3 13v-2z" />
                          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                        </svg>
                      )}
                    </div>
                    <div className="notif-channel-info">
                      <span className="notif-channel-title">{ch.name}</span>
                      <span className="notif-channel-desc">{ch.desc}</span>
                    </div>
                  </div>
                  <span className="notif-channel-status-pill">{ch.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Quick Templates */}
          <div className="notif-side-card">
            <div className="notif-side-card-header">
              <span className="notif-side-card-title">Quick Templates</span>
              <a href="#templates" className="notif-view-all-link">View All →</a>
            </div>
            <div className="notif-templates-list">
              {templates.map((tpl, idx) => (
                <div key={idx} className="notif-template-item">
                  <div className="notif-tpl-icon" style={{ background: tpl.iconBg, color: tpl.iconColor }}>
                    {tpl.icon === 'bell' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      </svg>
                    )}
                    {tpl.icon === 'paperplane' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" />
                      </svg>
                    )}
                    {tpl.icon === 'document' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    )}
                    {tpl.icon === 'newsletter' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <line x1="7" y1="8" x2="17" y2="8" />
                        <line x1="7" y1="12" x2="17" y2="12" />
                      </svg>
                    )}
                    {tpl.icon === 'creditcard' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                    )}
                  </div>
                  <div className="notif-tpl-info">
                    <span className="notif-tpl-name">{tpl.name}</span>
                    <span className="notif-tpl-desc">{tpl.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Recent Notifications */}
          <div className="notif-side-card">
            <div className="notif-side-card-header">
              <span className="notif-side-card-title">Recent Notifications</span>
              <a href="#recent" className="notif-view-all-link">View All →</a>
            </div>
            <div className="notif-recent-list">
              {recentNotifications.map((item, idx) => (
                <div key={idx} className="notif-recent-row">
                  <div className="notif-recent-left">
                    <span className="notif-recent-dot" style={{ background: item.dotColor }} />
                    <span className="notif-recent-name">{item.name}</span>
                  </div>
                  <span className="notif-recent-time">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          Row 3: 4 Feature Value Cards
          ==================================================================== */}
      <div className="notif-features-row">
        {/* Card 1: Schedule Notifications */}
        <div className="notif-feature-card">
          <div className="notif-feature-icon-box red">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="notif-feature-text">
            <span className="notif-feature-title">Schedule Notifications</span>
            <span className="notif-feature-desc">Plan and send notifications at the right time.</span>
          </div>
        </div>

        {/* Card 2: Audience Targeting */}
        <div className="notif-feature-card">
          <div className="notif-feature-icon-box orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="notif-feature-text">
            <span className="notif-feature-title">Audience Targeting</span>
            <span className="notif-feature-desc">Send to specific user groups.</span>
          </div>
        </div>

        {/* Card 3: Personalization */}
        <div className="notif-feature-card">
          <div className="notif-feature-icon-box amber">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="notif-feature-text">
            <span className="notif-feature-title">Personalization</span>
            <span className="notif-feature-desc">Use dynamic content for better engagement.</span>
          </div>
        </div>

        {/* Card 4: Detailed Reports */}
        <div className="notif-feature-card">
          <div className="notif-feature-icon-box gold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <div className="notif-feature-text">
            <span className="notif-feature-title">Detailed Reports</span>
            <span className="notif-feature-desc">Track delivery, open rate and user actions.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
