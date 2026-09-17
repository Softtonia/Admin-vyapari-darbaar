import React, { useState } from 'react';
import {
  ChevronDownIcon,
  SearchIcon,
  CalendarIcon,
  MoreVerticalIcon,
} from './Icons';
import './SubscriptionPlans.css';

export default function SubscriptionPlans() {
  const [activeTab, setActiveTab] = useState('All Subscriptions');
  const [searchQuery, setSearchQuery] = useState('');
  const [planType, setPlanType] = useState('All Plans');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [dateRange, setDateRange] = useState('01 Sep 2026 - 17 Sep 2026');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('10 / page');
  const [revenueRange, setRevenueRange] = useState('Last 6 Months');

  // Exact 10 rows from the screenshot
  const subscribers = [
    {
      id: '#SUB1024',
      badge: 'RK',
      badgeBg: '#8b5cf6',
      name: 'Rajesh Kumar',
      company: 'ABC Traders',
      plan: 'Premium',
      planClass: 'premium',
      amount: '₹4,999',
      startDate: '01 Sep 2026',
      endDate: '01 Sep 2027',
      status: 'Active',
      statusClass: 'active',
      autoRenew: true,
    },
    {
      id: '#SUB1023',
      badge: 'AS',
      badgeBg: '#0284c7',
      name: 'Amit Singh',
      company: 'Sharma Trading',
      plan: 'Business',
      planClass: 'business',
      amount: '₹2,999',
      startDate: '28 Aug 2026',
      endDate: '28 Aug 2027',
      status: 'Active',
      statusClass: 'active',
      autoRenew: true,
    },
    {
      id: '#SUB1022',
      badge: 'NV',
      badgeBg: '#10b981',
      name: 'Neha Verma',
      company: 'Global Grains',
      plan: 'Basic',
      planClass: 'basic',
      amount: '₹999',
      startDate: '15 Aug 2026',
      endDate: '15 Aug 2027',
      status: 'Active',
      statusClass: 'active',
      autoRenew: true,
    },
    {
      id: '#SUB1021',
      badge: 'VP',
      badgeBg: '#7c3aed',
      name: 'Vikram Patel',
      company: 'Jai Hind Exports',
      plan: 'Premium',
      planClass: 'premium',
      amount: '₹4,999',
      startDate: '12 Aug 2026',
      endDate: '12 Aug 2027',
      status: 'Expiring Soon',
      statusClass: 'expiring',
      autoRenew: true,
    },
    {
      id: '#SUB1020',
      badge: 'SY',
      badgeBg: '#6366f1',
      name: 'Sandeep Yadav',
      company: 'Kisan Supply Co.',
      plan: 'Business',
      planClass: 'business',
      amount: '₹2,999',
      startDate: '10 Aug 2026',
      endDate: '10 Aug 2027',
      status: 'Active',
      statusClass: 'active',
      autoRenew: true,
    },
    {
      id: '#SUB1019',
      badge: 'PM',
      badgeBg: '#ec4899',
      name: 'Pooja Mehta',
      company: 'Mehta Commodities',
      plan: 'Basic',
      planClass: 'basic',
      amount: '₹999',
      startDate: '05 Aug 2026',
      endDate: '05 Aug 2027',
      status: 'Cancelled',
      statusClass: 'cancelled',
      autoRenew: false,
    },
    {
      id: '#SUB1018',
      badge: 'DJ',
      badgeBg: '#e11d48',
      name: 'Deepak Jain',
      company: 'Narmada Exports',
      plan: 'Business',
      planClass: 'business',
      amount: '₹2,999',
      startDate: '01 Aug 2026',
      endDate: '01 Aug 2027',
      status: 'Active',
      statusClass: 'active',
      autoRenew: true,
    },
    {
      id: '#SUB1017',
      badge: 'RG',
      badgeBg: '#2563eb',
      name: 'Ramesh Gupta',
      company: 'Gupta Traders',
      plan: 'Premium',
      planClass: 'premium',
      amount: '₹4,999',
      startDate: '28 Jul 2026',
      endDate: '28 Jul 2027',
      status: 'Active',
      statusClass: 'active',
      autoRenew: true,
    },
    {
      id: '#SUB1016',
      badge: 'KS',
      badgeBg: '#115e59',
      name: 'Kiran Sharma',
      company: 'Agro Mart',
      plan: 'Basic',
      planClass: 'basic',
      amount: '₹999',
      startDate: '25 Jul 2026',
      endDate: '25 Jul 2027',
      status: 'Expired',
      statusClass: 'expired',
      autoRenew: false,
    },
    {
      id: '#SUB1015',
      badge: 'AM',
      badgeBg: '#0284c7',
      name: 'Alok Mishra',
      company: 'Mishra & Sons',
      plan: 'Business',
      planClass: 'business',
      amount: '₹2,999',
      startDate: '20 Jul 2026',
      endDate: '20 Jul 2027',
      status: 'Active',
      statusClass: 'active',
      autoRenew: true,
    },
  ];

  // Upcoming Renewals list
  const upcomingRenewals = [
    {
      badge: 'RK',
      badgeBg: '#8b5cf6',
      name: 'Rajesh Kumar',
      company: 'ABC Traders',
      plan: 'Premium',
      planClass: 'premium',
      days: 'in 3 days',
      date: '01 Oct 2026',
    },
    {
      badge: 'VP',
      badgeBg: '#7c3aed',
      name: 'Vikram Patel',
      company: 'Jai Hind Exports',
      plan: 'Business',
      planClass: 'business',
      days: 'in 5 days',
      date: '03 Oct 2026',
    },
    {
      badge: 'SY',
      badgeBg: '#6366f1',
      name: 'Sandeep Yadav',
      company: 'Kisan Supply Co.',
      plan: 'Business',
      planClass: 'business',
      days: 'in 7 days',
      date: '05 Oct 2026',
    },
    {
      badge: 'DJ',
      badgeBg: '#e11d48',
      name: 'Deepak Jain',
      company: 'Narmada Exports',
      plan: 'Premium',
      planClass: 'premium',
      days: 'in 10 days',
      date: '08 Oct 2026',
    },
    {
      badge: 'KS',
      badgeBg: '#115e59',
      name: 'Kiran Sharma',
      company: 'Agro Mart',
      plan: 'Basic',
      planClass: 'basic',
      days: 'in 12 days',
      date: '10 Oct 2026',
    },
  ];

  // Revenue chart 6-month bars
  const sixMonthRevenue = [
    { month: 'Apr', height: '45%' },
    { month: 'May', height: '60%' },
    { month: 'Jun', height: '70%' },
    { month: 'Jul', height: '80%' },
    { month: 'Aug', height: '88%' },
    { month: 'Sep', height: '100%' },
  ];

  return (
    <div className="sub-container">
      {/* ====================================================================
          ROW 1: 5 KPI Cards
          ==================================================================== */}
      <div className="sub-kpi-row-5">
        {/* Card 1: Total Subscribers */}
        <div className="sub-kpi-card">
          <div className="sub-kpi-top">
            <div className="sub-icon-box green">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="sub-kpi-info">
              <span className="sub-kpi-label">Total Subscribers</span>
              <span className="sub-kpi-val">5,842</span>
              <span className="sub-kpi-trend green">↑ 12.4% <small>vs last month</small></span>
            </div>
            <div className="kpi-sparkline green">
              <span style={{ height: '30%' }} />
              <span style={{ height: '45%' }} />
              <span style={{ height: '40%' }} />
              <span style={{ height: '65%' }} />
              <span style={{ height: '80%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>
        </div>

        {/* Card 2: Total Revenue */}
        <div className="sub-kpi-card">
          <div className="sub-kpi-top">
            <div className="sub-icon-box purple">
              <span className="rupee-icon-text">₹</span>
            </div>
            <div className="sub-kpi-info">
              <span className="sub-kpi-label">Total Revenue</span>
              <span className="sub-kpi-val">₹12,48,320</span>
              <span className="sub-kpi-trend green">↑ 18.6% <small>vs last month</small></span>
            </div>
            <div className="kpi-sparkline teal">
              <span style={{ height: '35%' }} />
              <span style={{ height: '50%' }} />
              <span style={{ height: '65%' }} />
              <span style={{ height: '60%' }} />
              <span style={{ height: '85%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>
        </div>

        {/* Card 3: Expiring Soon */}
        <div className="sub-kpi-card">
          <div className="sub-kpi-top">
            <div className="sub-icon-box amber">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="sub-kpi-info">
              <span className="sub-kpi-label">Expiring Soon</span>
              <span className="sub-kpi-val">426</span>
              <span className="sub-kpi-trend red">↓ 6.2% <small>vs last month</small></span>
            </div>
            <div className="kpi-sparkline amber">
              <span style={{ height: '100%' }} />
              <span style={{ height: '80%' }} />
              <span style={{ height: '65%' }} />
              <span style={{ height: '50%' }} />
              <span style={{ height: '40%' }} />
              <span style={{ height: '30%' }} />
            </div>
          </div>
        </div>

        {/* Card 4: Active Subscriptions */}
        <div className="sub-kpi-card">
          <div className="sub-kpi-top">
            <div className="sub-icon-box green-tint">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="sub-kpi-info">
              <span className="sub-kpi-label">Active Subscriptions</span>
              <span className="sub-kpi-val">4,980</span>
              <span className="sub-kpi-trend green">↑ 14.8%</span>
            </div>
            <div className="kpi-sparkline green-tint">
              <span style={{ height: '25%' }} />
              <span style={{ height: '40%' }} />
              <span style={{ height: '55%' }} />
              <span style={{ height: '70%' }} />
              <span style={{ height: '85%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>
        </div>

        {/* Card 5: Cancelled/Expired */}
        <div className="sub-kpi-card">
          <div className="sub-kpi-top">
            <div className="sub-icon-box red">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="17" y1="8" x2="23" y2="14" />
                <line x1="23" y1="8" x2="17" y2="14" />
              </svg>
            </div>
            <div className="sub-kpi-info">
              <span className="sub-kpi-label">Cancelled/Expired</span>
              <span className="sub-kpi-val">862</span>
              <span className="sub-kpi-trend red">↓ 3.1%</span>
            </div>
            <div className="kpi-sparkline red">
              <span style={{ height: '40%' }} />
              <span style={{ height: '45%' }} />
              <span style={{ height: '60%' }} />
              <span style={{ height: '55%' }} />
              <span style={{ height: '80%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          MAIN SPLIT: Left Area + Right Sidebar
          ==================================================================== */}
      <div className="sub-main-split">
        {/* Left Column: Subscriptions Management */}
        <div className="sub-left-content">
          {/* Top Bar: Tabs + Create Plan Button */}
          <div className="sub-tabs-actions-bar">
            {/* Tabs */}
            <div className="sub-tabs-row">
              {['All Subscriptions', 'Subscription Plans', 'Payments', 'Renewals', 'Invoices', 'Discounts & Coupons'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`sub-tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Right Action Button */}
            <div className="sub-actions-group">
              <button type="button" className="btn-create-plan">
                <span>+</span>
                <span>Create Plan</span>
                <ChevronDownIcon size={12} color="#ffffff" />
              </button>
            </div>
          </div>

          {/* Filter Toolbar Card */}
          <div className="sub-filter-toolbar">
            <div className="filter-group search-group">
              <label className="filter-lbl">Search</label>
              <div className="filter-search-box">
                <SearchIcon size={12} color="#9ca3af" />
                <input
                  type="text"
                  placeholder="Name, email, mobile, company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Plan Type</label>
              <div className="filter-dropdown">
                <span>{planType}</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Status</label>
              <div className="filter-dropdown">
                <span>{statusFilter}</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </div>
            </div>

            <div className="filter-group date-group">
              <label className="filter-lbl">Date Range</label>
              <div className="filter-date-box">
                <CalendarIcon size={12} color="#9ca3af" />
                <span>{dateRange}</span>
              </div>
            </div>

            <div className="filter-actions">
              <button type="button" className="btn-apply-filters">
                Apply Filters
              </button>
              <button type="button" className="btn-reset-filters">
                Reset
              </button>
            </div>
          </div>

          {/* Table Card */}
          <div className="sub-card sub-table-card">
            <div className="sub-card-header">
              <h3 className="sub-card-title">Subscribers (5,842)</h3>
              <button type="button" className="btn-sub-export">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Export</span>
              </button>
            </div>

            <div className="sub-table-wrapper">
              <table className="sub-data-table">
                <thead>
                  <tr>
                    <th className="th-check"><input type="checkbox" /></th>
                    <th>#</th>
                    <th>Name / Company</th>
                    <th>Plan</th>
                    <th>Amount</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Auto Renew</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((item) => (
                    <tr key={item.id}>
                      <td className="td-check"><input type="checkbox" /></td>
                      <td className="td-id">{item.id}</td>
                      <td className="td-subscriber-cell">
                        <div className="sub-badge-circle" style={{ backgroundColor: item.badgeBg }}>
                          {item.badge}
                        </div>
                        <div className="sub-name-block">
                          <span className="sub-person-name">{item.name}</span>
                          <span className="sub-company-name">{item.company}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`sub-plan-pill ${item.planClass}`}>
                          {item.plan}
                        </span>
                      </td>
                      <td className="td-amount">{item.amount}</td>
                      <td className="td-date">{item.startDate}</td>
                      <td className="td-date">{item.endDate}</td>
                      <td>
                        <span className={`sub-status-pill ${item.statusClass}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="td-auto-renew">
                        <div className="toggle-wrapper">
                          <span className={`toggle-switch ${item.autoRenew ? 'active' : ''}`}>
                            <span className="toggle-thumb" />
                          </span>
                          <span className="toggle-label">{item.autoRenew ? 'On' : 'Off'}</span>
                        </div>
                      </td>
                      <td className="td-action">
                        <button type="button" className="sub-action-btn">View</button>
                      </td>
                      <td className="td-more">
                        <MoreVerticalIcon size={14} color="#9ca3af" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="sub-pagination-row">
              <span className="pagination-info">Showing 1 to 10 of 5,842 entries</span>

              <div className="pagination-nav-group">
                <button type="button" className="page-nav-btn" disabled>‹</button>
                <button type="button" className={`page-num-btn ${currentPage === 1 ? 'active' : ''}`}>1</button>
                <button type="button" className="page-num-btn">2</button>
                <button type="button" className="page-num-btn">3</button>
                <button type="button" className="page-num-btn">4</button>
                <button type="button" className="page-num-btn">5</button>
                <span className="page-ellipsis">...</span>
                <button type="button" className="page-num-btn">585</button>
                <button type="button" className="page-nav-btn">›</button>

                <div className="page-size-selector">
                  <span>{pageSize}</span>
                  <ChevronDownIcon size={11} color="#6b7280" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="sub-right-sidebar">
          {/* Card 1: Revenue Overview */}
          <div className="sub-card revenue-overview-card">
            <div className="sub-card-header">
              <h3 className="sub-card-title">Revenue Overview</h3>
              <div className="sub-dropdown-mini">
                <span>{revenueRange}</span>
                <ChevronDownIcon size={11} color="#4b5563" />
              </div>
            </div>

            <div className="sub-revenue-body">
              <div className="sub-rev-header-stats">
                <div className="rev-num-block">
                  <strong className="rev-big-num">₹12,48,320</strong>
                  <span className="rev-sub-lbl">Total Revenue</span>
                </div>
                <span className="rev-growth-pill">↑ 18.6%</span>
              </div>

              <div className="sub-rev-chart-wrap">
                <div className="rev-y-axis">
                  <span>₹3L</span>
                  <span>₹2L</span>
                  <span>₹1L</span>
                  <span>₹0</span>
                </div>
                <div className="rev-bars-track">
                  {sixMonthRevenue.map((item, idx) => (
                    <div key={idx} className="rev-bar-col">
                      <div className="rev-bar-slot">
                        <span className="rev-bar-fill" style={{ height: item.height }} />
                      </div>
                      <span className="rev-bar-month">{item.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Subscription Plan Distribution Donut */}
          <div className="sub-card plan-dist-card">
            <div className="sub-card-header">
              <h3 className="sub-card-title">Subscription Plan Distribution</h3>
            </div>

            <div className="plan-donut-body">
              <div className="plan-donut-wrap">
                <svg width="95" height="95" viewBox="0 0 100 100">
                  {/* Business 41.4% (amber/orange) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#f59e0b"
                    strokeWidth="12"
                    strokeDasharray="99 238"
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Basic 33.9% (dark green) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#026544"
                    strokeWidth="12"
                    strokeDasharray="81 238"
                    strokeDashoffset="-99"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Premium 24.7% (purple) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#7c3aed"
                    strokeWidth="12"
                    strokeDasharray="58 238"
                    strokeDashoffset="-180"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="plan-donut-center">
                  <strong className="donut-big-num">5,842</strong>
                  <span className="donut-sub-lbl">Total Subscribers</span>
                </div>
              </div>

              <div className="plan-donut-legend">
                <div className="plan-leg-row">
                  <span className="dot green" />
                  <span className="leg-title">Basic</span>
                  <strong className="leg-val">1,980 (33.9%)</strong>
                </div>
                <div className="plan-leg-row">
                  <span className="dot gold" />
                  <span className="leg-title">Business</span>
                  <strong className="leg-val">2,420 (41.4%)</strong>
                </div>
                <div className="plan-leg-row">
                  <span className="dot purple" />
                  <span className="leg-title">Premium</span>
                  <strong className="leg-val">1,442 (24.7%)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Upcoming Renewals */}
          <div className="sub-card upcoming-renewals-card">
            <div className="sub-card-header">
              <h3 className="sub-card-title">Upcoming Renewals</h3>
              <a href="#viewall" className="sub-card-link">View All →</a>
            </div>

            <div className="renewals-list-body">
              {upcomingRenewals.map((item, idx) => (
                <div key={idx} className="renewal-item-row">
                  <div className="renewal-badge-circle" style={{ backgroundColor: item.badgeBg }}>
                    {item.badge}
                  </div>
                  <div className="renewal-info-col">
                    <span className="renewal-name-txt">{item.name}</span>
                    <span className="renewal-comp-txt">{item.company}</span>
                  </div>
                  <span className={`sub-plan-pill mini ${item.planClass}`}>
                    {item.plan}
                  </span>
                  <div className="renewal-time-col">
                    <span className="renew-days-txt">{item.days}</span>
                    <span className="renew-date-txt">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          ROW 3: 4 Bottom Brand Value Cards
          ==================================================================== */}
      <div className="sub-bottom-values-row">
        {/* Value 1 */}
        <div className="sub-value-card">
          <div className="val-icon-box gold">
            <span className="val-icon">👑</span>
          </div>
          <div className="val-text">
            <h4 className="val-title">Flexible Plans</h4>
            <p className="val-desc">Multiple plans for every trader need.</p>
          </div>
        </div>

        {/* Value 2 */}
        <div className="sub-value-card">
          <div className="val-icon-box green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Secure Payments</h4>
            <p className="val-desc">Razorpay/Stripe/UPI integration.</p>
          </div>
        </div>

        {/* Value 3 */}
        <div className="sub-value-card">
          <div className="val-icon-box orange">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Automatic Renewals</h4>
            <p className="val-desc">Hassle-free subscription management.</p>
          </div>
        </div>

        {/* Value 4 */}
        <div className="sub-value-card">
          <div className="val-icon-box gold-soft">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Detailed Reports</h4>
            <p className="val-desc">Track revenue, growth and churn.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
