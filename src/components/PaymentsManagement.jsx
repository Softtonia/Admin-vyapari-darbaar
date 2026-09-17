import React, { useState } from 'react';
import {
  SearchIcon,
  CalendarIcon,
  ChevronDownIcon,
  MoreVerticalIcon,
} from './Icons';
import './PaymentsManagement.css';

export default function PaymentsManagement() {
  const [activeTab, setActiveTab] = useState('All Payments');
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentType, setPaymentType] = useState('All Types');
  const [planProduct, setPlanProduct] = useState('All Plans');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [dateRange, setDateRange] = useState('01 Sep 2026 - 17 Sep 2026');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('10 / page');
  const [revenueRange, setRevenueRange] = useState('Last 6 Months');

  // Exact 10 rows from the screenshot
  const payments = [
    {
      id: '#PAY10248',
      dateTime: '17 Sep 2026',
      time: '10:22 AM',
      trader: 'Rajesh Kumar',
      company: 'ABC Traders',
      type: 'Subscription',
      typeClass: 'subscription',
      product: 'Premium Plan (1 Year)',
      amount: '₹4,999',
      method: 'UPI',
      methodIcon: 'upi',
      status: 'Success',
      statusClass: 'success',
      invoice: 'INV10248',
    },
    {
      id: '#PAY10247',
      dateTime: '17 Sep 2026',
      time: '09:48 AM',
      trader: 'Amit Singh',
      company: 'Sharma Trading',
      type: 'Contact Unlock',
      typeClass: 'unlock',
      product: '100 Unlocks',
      amount: '₹999',
      method: 'Credit Card',
      methodIcon: 'card',
      status: 'Success',
      statusClass: 'success',
      invoice: 'INV10247',
    },
    {
      id: '#PAY10246',
      dateTime: '16 Sep 2026',
      time: '08:32 PM',
      trader: 'Neha Verma',
      company: 'Global Grains',
      type: 'Subscription',
      typeClass: 'subscription',
      product: 'Business Plan (1 Year)',
      amount: '₹2,999',
      method: 'UPI',
      methodIcon: 'upi',
      status: 'Success',
      statusClass: 'success',
      invoice: 'INV10246',
    },
    {
      id: '#PAY10245',
      dateTime: '16 Sep 2026',
      time: '05:21 PM',
      trader: 'Vikram Patel',
      company: 'Jai Hind Exports',
      type: 'Advertisement',
      typeClass: 'ad',
      product: 'Banner Ad (30 Days)',
      amount: '₹5,000',
      method: 'Net Banking',
      methodIcon: 'bank',
      status: 'Success',
      statusClass: 'success',
      invoice: 'INV10245',
    },
    {
      id: '#PAY10244',
      dateTime: '16 Sep 2026',
      time: '11:10 AM',
      trader: 'Sandeep Yadav',
      company: 'Kisan Supply Co.',
      type: 'Subscription',
      typeClass: 'subscription',
      product: 'Basic Plan (1 Year)',
      amount: '₹999',
      method: 'Wallet',
      methodIcon: 'wallet',
      status: 'Pending',
      statusClass: 'pending',
      invoice: 'INV10244',
    },
    {
      id: '#PAY10243',
      dateTime: '15 Sep 2026',
      time: '06:42 PM',
      trader: 'Pooja Mehta',
      company: 'Mehta Commodities',
      type: 'Contact Unlock',
      typeClass: 'unlock',
      product: '50 Unlocks',
      amount: '₹599',
      method: 'UPI',
      methodIcon: 'upi',
      status: 'Success',
      statusClass: 'success',
      invoice: 'INV10243',
    },
    {
      id: '#PAY10242',
      dateTime: '15 Sep 2026',
      time: '04:15 PM',
      trader: 'Deepak Jain',
      company: 'Narmada Exports',
      type: 'Subscription',
      typeClass: 'subscription',
      product: 'Premium Plan (1 Year)',
      amount: '₹4,999',
      method: 'Credit Card',
      methodIcon: 'card',
      status: 'Failed',
      statusClass: 'failed',
      invoice: 'INV10242',
    },
    {
      id: '#PAY10241',
      dateTime: '14 Sep 2026',
      time: '02:28 PM',
      trader: 'Ramesh Gupta',
      company: 'Gupta Traders',
      type: 'Advertisement',
      typeClass: 'ad',
      product: 'Sidebar Ad (15 Days)',
      amount: '₹2,500',
      method: 'UPI',
      methodIcon: 'upi',
      status: 'Success',
      statusClass: 'success',
      invoice: 'INV10241',
    },
    {
      id: '#PAY10240',
      dateTime: '14 Sep 2026',
      time: '11:05 AM',
      trader: 'Kiran Sharma',
      company: 'Agro Mart',
      type: 'Subscription',
      typeClass: 'subscription',
      product: 'Business Plan (1 Year)',
      amount: '₹2,999',
      method: 'Net Banking',
      methodIcon: 'bank',
      status: 'Refunded',
      statusClass: 'refunded',
      invoice: 'INV10240',
    },
    {
      id: '#PAY10239',
      dateTime: '13 Sep 2026',
      time: '09:32 AM',
      trader: 'Alok Mishra',
      company: 'Mishra & Sons',
      type: 'Contact Unlock',
      typeClass: 'unlock',
      product: '200 Unlocks',
      amount: '₹1,999',
      method: 'UPI',
      methodIcon: 'upi',
      status: 'Success',
      statusClass: 'success',
      invoice: 'INV10239',
    },
  ];

  // Recent Transactions list (from right sidebar)
  const recentTransactions = [
    {
      badge: 'RK',
      badgeBg: '#8b5cf6',
      name: 'Rajesh Kumar',
      detail: 'Premium Plan',
      amount: '₹4,999',
      timeAgo: '2 mins ago',
    },
    {
      badge: 'AS',
      badgeBg: '#0284c7',
      name: 'Amit Singh',
      detail: '100 Unlocks',
      amount: '₹999',
      timeAgo: '15 mins ago',
    },
    {
      badge: 'NV',
      badgeBg: '#10b981',
      name: 'Neha Verma',
      detail: 'Business Plan',
      amount: '₹2,999',
      timeAgo: '1 hour ago',
    },
    {
      badge: 'DJ',
      badgeBg: '#e11d48',
      name: 'Deepak Jain',
      detail: 'Premium Plan',
      amount: '₹4,999',
      timeAgo: '2 hours ago',
    },
    {
      badge: 'KS',
      badgeBg: '#0f766e',
      name: 'Kiran Sharma',
      detail: 'Business Plan',
      amount: '₹2,999',
      timeAgo: '3 hours ago',
    },
  ];

  // 6-month stacked bars
  const stackedRevenueBars = [
    { month: 'Apr', hSub: 35, hAd: 15, hUnl: 10, hOth: 5 },
    { month: 'May', hSub: 45, hAd: 20, hUnl: 12, hOth: 6 },
    { month: 'Jun', hSub: 55, hAd: 22, hUnl: 15, hOth: 8 },
    { month: 'Jul', hSub: 65, hAd: 25, hUnl: 18, hOth: 9 },
    { month: 'Aug', hSub: 75, hAd: 28, hUnl: 20, hOth: 10 },
    { month: 'Sep', hSub: 85, hAd: 30, hUnl: 22, hOth: 12 },
  ];

  const renderMethodIcon = (methodIcon) => {
    if (methodIcon === 'upi') {
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    }
    if (methodIcon === 'card') {
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      );
    }
    if (methodIcon === 'bank') {
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="21" x2="21" y2="21" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <polyline points="5 10 5 21" />
          <polyline points="19 10 19 21" />
          <polyline points="10 10 10 21" />
          <polyline points="14 10 14 21" />
          <path d="M2 10L12 3l10 7H2z" />
        </svg>
      );
    }
    if (methodIcon === 'wallet') {
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
          <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
          <circle cx="18" cy="12" r="1" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="pay-container">
      {/* ====================================================================
          ROW 1: 5 KPI Cards
          ==================================================================== */}
      <div className="pay-kpi-row-5">
        {/* Card 1: Total Revenue */}
        <div className="pay-kpi-card">
          <div className="pay-kpi-top">
            <div className="pay-icon-box green">
              <span className="pay-rupee-symbol">₹</span>
            </div>
            <div className="pay-kpi-info">
              <span className="pay-kpi-label">Total Revenue</span>
              <span className="pay-kpi-val">₹12,48,320</span>
              <span className="pay-kpi-trend green">↑ 18.6% <small>vs last month</small></span>
            </div>
            <div className="pay-sparkline green">
              <span style={{ height: '30%' }} />
              <span style={{ height: '45%' }} />
              <span style={{ height: '40%' }} />
              <span style={{ height: '65%' }} />
              <span style={{ height: '80%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>
        </div>

        {/* Card 2: Successful Payments */}
        <div className="pay-kpi-card">
          <div className="pay-kpi-top">
            <div className="pay-icon-box purple">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <div className="pay-kpi-info">
              <span className="pay-kpi-label">Successful Payments</span>
              <span className="pay-kpi-val">1,842</span>
              <span className="pay-kpi-trend green">↑ 22.4% <small>vs last month</small></span>
            </div>
            <div className="pay-sparkline cyan">
              <span style={{ height: '25%' }} />
              <span style={{ height: '40%' }} />
              <span style={{ height: '55%' }} />
              <span style={{ height: '50%' }} />
              <span style={{ height: '75%' }} />
              <span style={{ height: '95%' }} />
            </div>
          </div>
        </div>

        {/* Card 3: Pending Payments */}
        <div className="pay-kpi-card">
          <div className="pay-kpi-top">
            <div className="pay-icon-box amber">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="pay-kpi-info">
              <span className="pay-kpi-label">Pending Payments</span>
              <span className="pay-kpi-val">126</span>
              <span className="pay-kpi-trend red">↓ 6.8% <small>vs last month</small></span>
            </div>
            <div className="pay-sparkline amber">
              <span style={{ height: '35%' }} />
              <span style={{ height: '50%' }} />
              <span style={{ height: '60%' }} />
              <span style={{ height: '75%' }} />
              <span style={{ height: '85%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>
        </div>

        {/* Card 4: Failed Payments */}
        <div className="pay-kpi-card">
          <div className="pay-kpi-top">
            <div className="pay-icon-box red">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <div className="pay-kpi-info">
              <span className="pay-kpi-label">Failed Payments</span>
              <span className="pay-kpi-val">48</span>
              <span className="pay-kpi-trend red">↓ 12.3% <small>vs last month</small></span>
            </div>
            <div className="pay-sparkline pink">
              <span style={{ height: '30%' }} />
              <span style={{ height: '45%' }} />
              <span style={{ height: '55%' }} />
              <span style={{ height: '70%' }} />
              <span style={{ height: '85%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>
        </div>

        {/* Card 5: Refunds Issued */}
        <div className="pay-kpi-card">
          <div className="pay-kpi-top">
            <div className="pay-icon-box blue">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            </div>
            <div className="pay-kpi-info">
              <span className="pay-kpi-label">Refunds Issued</span>
              <span className="pay-kpi-val">32</span>
              <span className="pay-kpi-trend red">↓ 4.1% <small>vs last month</small></span>
            </div>
            <div className="pay-sparkline cyan-light">
              <span style={{ height: '30%' }} />
              <span style={{ height: '40%' }} />
              <span style={{ height: '55%' }} />
              <span style={{ height: '65%' }} />
              <span style={{ height: '80%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          MAIN SPLIT: Left Area + Right Sidebar
          ==================================================================== */}
      <div className="pay-main-split">
        {/* Left Column: Payments List & Management */}
        <div className="pay-left-content">
          {/* Tabs & Action Buttons Bar */}
          <div className="pay-tabs-actions-bar">
            <div className="pay-tabs-row">
              {['All Payments', 'Successful', 'Pending', 'Failed', 'Refunds', 'Settlements', 'Payouts'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`pay-tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="pay-actions-group">
              <button type="button" className="btn-pay-export">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Export</span>
              </button>
              <button type="button" className="btn-pay-report">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                <span>Generate Report</span>
              </button>
            </div>
          </div>

          {/* Filter Toolbar Card */}
          <div className="pay-filter-toolbar">
            <div className="filter-group search-group">
              <label className="filter-lbl">Search</label>
              <div className="filter-search-box">
                <SearchIcon size={12} color="#9ca3af" />
                <input
                  type="text"
                  placeholder="Transaction ID, name, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Payment Type</label>
              <div className="filter-dropdown">
                <span>{paymentType}</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Plan / Product</label>
              <div className="filter-dropdown">
                <span>{planProduct}</span>
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

          {/* Payments Table Card */}
          <div className="pay-card pay-table-card">
            <div className="pay-card-header">
              <h3 className="pay-card-title">Payments (2,048)</h3>
            </div>

            <div className="pay-table-wrapper">
              <table className="pay-data-table">
                <thead>
                  <tr>
                    <th className="th-check"><input type="checkbox" /></th>
                    <th>#</th>
                    <th>Date & Time</th>
                    <th>Trader / Customer</th>
                    <th>Type</th>
                    <th>Plan / Product</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Status</th>
                    <th>Invoice</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((item) => (
                    <tr key={item.id}>
                      <td className="td-check"><input type="checkbox" /></td>
                      <td className="td-id">{item.id}</td>
                      <td className="td-datetime">
                        <span className="pay-date-txt">{item.dateTime}</span>
                        <span className="pay-time-txt">{item.time}</span>
                      </td>
                      <td className="td-trader">
                        <span className="pay-trader-name">{item.trader}</span>
                        <span className="pay-trader-comp">{item.company}</span>
                      </td>
                      <td>
                        <span className={`pay-type-pill ${item.typeClass}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="td-product">{item.product}</td>
                      <td className="td-amount">{item.amount}</td>
                      <td className="td-method">
                        <span className="method-badge">
                          {renderMethodIcon(item.methodIcon)}
                          <span className="method-name">{item.method}</span>
                        </span>
                      </td>
                      <td>
                        <span className={`pay-status-pill ${item.statusClass}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="td-invoice">{item.invoice}</td>
                      <td className="td-action">
                        <button type="button" className="pay-action-btn">View</button>
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
            <div className="pay-pagination-row">
              <span className="pagination-info">Showing 1 to 10 of 2,048 entries</span>

              <div className="pagination-nav-group">
                <button type="button" className="page-nav-btn" disabled>‹</button>
                <button type="button" className={`page-num-btn ${currentPage === 1 ? 'active' : ''}`}>1</button>
                <button type="button" className="page-num-btn">2</button>
                <button type="button" className="page-num-btn">3</button>
                <button type="button" className="page-num-btn">4</button>
                <button type="button" className="page-num-btn">5</button>
                <span className="page-ellipsis">...</span>
                <button type="button" className="page-num-btn">205</button>
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
        <div className="pay-right-sidebar">
          {/* Card 1: Revenue Breakdown Stacked Chart */}
          <div className="pay-card rev-breakdown-card">
            <div className="pay-card-header">
              <h3 className="pay-card-title">Revenue Breakdown</h3>
              <div className="pay-dropdown-mini">
                <span>{revenueRange}</span>
                <ChevronDownIcon size={11} color="#4b5563" />
              </div>
            </div>

            <div className="rev-breakdown-body">
              <div className="stacked-chart-wrap">
                <div className="stacked-y-axis">
                  <span>₹4L</span>
                  <span>₹3L</span>
                  <span>₹2L</span>
                  <span>₹1L</span>
                  <span>₹0</span>
                </div>
                <div className="stacked-bars-track">
                  {stackedRevenueBars.map((bar, idx) => (
                    <div key={idx} className="stacked-bar-col">
                      <div className="stacked-bar-slot">
                        <div className="seg-oth" style={{ height: `${bar.hOth}px` }} />
                        <div className="seg-unl" style={{ height: `${bar.hUnl}px` }} />
                        <div className="seg-ad" style={{ height: `${bar.hAd}px` }} />
                        <div className="seg-sub" style={{ height: `${bar.hSub}px` }} />
                      </div>
                      <span className="stacked-bar-month">{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stacked Chart Legend */}
              <div className="stacked-legend-grid">
                <div className="sleg-item">
                  <span className="sleg-dot green" />
                  <span>Subscriptions</span>
                </div>
                <div className="sleg-item">
                  <span className="sleg-dot purple" />
                  <span>Advertisements</span>
                </div>
                <div className="sleg-item">
                  <span className="sleg-dot amber" />
                  <span>Contact Unlocks</span>
                </div>
                <div className="sleg-item">
                  <span className="sleg-dot blue" />
                  <span>Others</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Payment Method Distribution Donut */}
          <div className="pay-card method-dist-card">
            <div className="pay-card-header">
              <h3 className="pay-card-title">Payment Method Distribution</h3>
            </div>

            <div className="method-donut-body">
              <div className="method-donut-wrap">
                <svg width="95" height="95" viewBox="0 0 100 100">
                  {/* UPI 46.2% (dark green) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#026544"
                    strokeWidth="12"
                    strokeDasharray="110 238"
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Credit Card 22.8% (blue) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#0284c7"
                    strokeWidth="12"
                    strokeDasharray="54 238"
                    strokeDashoffset="-110"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Net Banking 15.4% (indigo/purple) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#6366f1"
                    strokeWidth="12"
                    strokeDasharray="37 238"
                    strokeDashoffset="-164"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Wallet 8.6% (amber/orange) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#f59e0b"
                    strokeWidth="12"
                    strokeDasharray="20 238"
                    strokeDashoffset="-201"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Others 7.0% (slate) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#64748b"
                    strokeWidth="12"
                    strokeDasharray="17 238"
                    strokeDashoffset="-221"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="method-donut-center">
                  <strong className="donut-big-num">2,048</strong>
                  <span className="donut-sub-lbl">Total Payments</span>
                </div>
              </div>

              <div className="method-donut-legend">
                <div className="method-leg-row">
                  <span className="dot green" />
                  <span className="leg-title">UPI</span>
                  <strong className="leg-val">46.2%</strong>
                </div>
                <div className="method-leg-row">
                  <span className="dot blue" />
                  <span className="leg-title">Credit Card</span>
                  <strong className="leg-val">22.8%</strong>
                </div>
                <div className="method-leg-row">
                  <span className="dot indigo" />
                  <span className="leg-title">Net Banking</span>
                  <strong className="leg-val">15.4%</strong>
                </div>
                <div className="method-leg-row">
                  <span className="dot amber" />
                  <span className="leg-title">Wallet</span>
                  <strong className="leg-val">8.6%</strong>
                </div>
                <div className="method-leg-row">
                  <span className="dot slate" />
                  <span className="leg-title">Others</span>
                  <strong className="leg-val">7.0%</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Recent Transactions */}
          <div className="pay-card recent-trans-card">
            <div className="pay-card-header">
              <h3 className="pay-card-title">Recent Transactions</h3>
              <a href="#viewall" className="pay-card-link">View All →</a>
            </div>

            <div className="recent-trans-body">
              {recentTransactions.map((item, idx) => (
                <div key={idx} className="trans-item-row">
                  <div className="trans-badge-circle" style={{ backgroundColor: item.badgeBg }}>
                    {item.badge}
                  </div>
                  <div className="trans-info-col">
                    <span className="trans-name-txt">{item.name}</span>
                    <span className="trans-plan-txt">{item.detail}</span>
                  </div>
                  <div className="trans-amount-col">
                    <strong className="trans-amount-txt">{item.amount}</strong>
                    <span className="trans-time-txt">
                      <span className="green-live-dot" />
                      {item.timeAgo}
                    </span>
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
      <div className="pay-bottom-values-row">
        {/* Value 1 */}
        <div className="pay-value-card">
          <div className="val-icon-box green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Secure Transactions</h4>
            <p className="val-desc">All payments are encrypted and secure.</p>
          </div>
        </div>

        {/* Value 2 */}
        <div className="pay-value-card">
          <div className="val-icon-box amber-soft">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Multiple Payment Options</h4>
            <p className="val-desc">UPI, Cards, Net Banking, Wallets.</p>
          </div>
        </div>

        {/* Value 3 */}
        <div className="pay-value-card">
          <div className="val-icon-box brown">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Automated Invoices</h4>
            <p className="val-desc">Generate and send invoices instantly.</p>
          </div>
        </div>

        {/* Value 4 */}
        <div className="pay-value-card">
          <div className="val-icon-box gold-soft">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Refund Management</h4>
            <p className="val-desc">Easy refund and dispute handling.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
