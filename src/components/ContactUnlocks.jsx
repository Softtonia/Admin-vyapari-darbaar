import React, { useState } from 'react';
import commWheat from '../assets/comm_wheat.png';
import commMaize from '../assets/comm_maize.png';
import commMakhana from '../assets/comm_makhana.png';
import commMustard from '../assets/comm_mustard.png';
import commRice from '../assets/comm_rice.png';
import {
  ChevronDownIcon,
  SearchIcon,
  CalendarIcon,
  MoreVerticalIcon,
} from './Icons';
import './ContactUnlocks.css';

export default function ContactUnlocks() {
  const [activeTab, setActiveTab] = useState('All Unlocks');
  const [dateRange, setDateRange] = useState('01 Sep 2026 - 17 Sep 2026');
  const [commodityFilter, setCommodityFilter] = useState('All Commodities');
  const [buyerSellerFilter, setBuyerSellerFilter] = useState('All Types');
  const [userTypeFilter, setUserTypeFilter] = useState('All Users');
  const [paymentTypeFilter, setPaymentTypeFilter] = useState('All Methods');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('10 / page');
  const [revenueTimeframe, setRevenueTimeframe] = useState('Last 30 Days');

  // Contact Unlock Records Data (Exact 10 rows from screenshot)
  const unlockRecords = [
    {
      id: '#CU1024',
      badge: 'T',
      badgeBg: '#1e70bf',
      unlockedBy: 'Rajesh Traders',
      contactType: 'Seller Contact',
      company: 'ABC Foods',
      commodity: 'Makhana',
      location: 'Delhi',
      datetime: '17 Sep 2026\n10:42 AM',
      amount: '₹99',
      status: 'Success',
    },
    {
      id: '#CU1023',
      badge: 'S',
      badgeBg: '#16a34a',
      unlockedBy: 'Greenfield Foods',
      contactType: 'Buyer Contact',
      company: 'Kumar Export',
      commodity: 'Wheat',
      location: 'Bihar',
      datetime: '17 Sep 2026\n09:18 AM',
      amount: '₹99',
      status: 'Success',
    },
    {
      id: '#CU1022',
      badge: 'T',
      badgeBg: '#1e70bf',
      unlockedBy: 'Sharma Imports',
      contactType: 'Seller Contact',
      company: 'Shree Agri',
      commodity: 'Maize',
      location: 'Punjab',
      datetime: '16 Sep 2026\n06:22 PM',
      amount: '₹99',
      status: 'Success',
    },
    {
      id: '#CU1021',
      badge: 'T',
      badgeBg: '#d97706',
      unlockedBy: 'Agro Mart',
      contactType: 'Buyer Contact',
      company: 'Patel Traders',
      commodity: 'Mustard',
      location: 'Rajasthan',
      datetime: '16 Sep 2026\n04:10 PM',
      amount: '₹99',
      status: 'Success',
    },
    {
      id: '#CU1020',
      badge: 'S',
      badgeBg: '#7c3aed',
      unlockedBy: 'Bharat Commodities',
      contactType: 'Seller Contact',
      company: 'Jai Hind Exports',
      commodity: 'Chana',
      location: 'Madhya Pradesh',
      datetime: '16 Sep 2026\n01:45 PM',
      amount: '₹99',
      status: 'Success',
    },
    {
      id: '#CU1019',
      badge: 'S',
      badgeBg: '#16a34a',
      unlockedBy: 'Global Grains',
      contactType: 'Buyer Contact',
      company: 'Narmada Exports',
      commodity: 'Soyabean',
      location: 'Maharashtra',
      datetime: '15 Sep 2026\n11:30 AM',
      amount: '₹99',
      status: 'Success',
    },
    {
      id: '#CU1018',
      badge: 'T',
      badgeBg: '#1e70bf',
      unlockedBy: 'Kisan Supply Co.',
      contactType: 'Seller Contact',
      company: 'Madhubani Traders',
      commodity: 'Rice',
      location: 'Bihar',
      datetime: '15 Sep 2026\n10:12 AM',
      amount: '₹99',
      status: 'Failed',
    },
    {
      id: '#CU1017',
      badge: 'S',
      badgeBg: '#ea580c',
      unlockedBy: 'Desh Trading',
      contactType: 'Buyer Contact',
      company: 'Sahara Agro',
      commodity: 'Tur (Arhar)',
      location: 'Uttar Pradesh',
      datetime: '14 Sep 2026\n05:48 PM',
      amount: '₹99',
      status: 'Success',
    },
    {
      id: '#CU1016',
      badge: 'T',
      badgeBg: '#1e70bf',
      unlockedBy: 'Mala Organic',
      contactType: 'Seller Contact',
      company: 'Patna Foods',
      commodity: 'Pulses',
      location: 'Bihar',
      datetime: '14 Sep 2026\n03:22 PM',
      amount: '₹99',
      status: 'Success',
    },
    {
      id: '#CU1015',
      badge: 'S',
      badgeBg: '#16a34a',
      unlockedBy: 'Shivam Traders',
      contactType: 'Buyer Contact',
      company: 'Kolkata Grains',
      commodity: 'Sugar',
      location: 'West Bengal',
      datetime: '13 Sep 2026\n01:05 PM',
      amount: '₹99',
      status: 'Refunded',
    },
  ];

  // Top Commodities by Unlocks
  const topCommodities = [
    { rank: 1, name: 'Makhana', img: commMakhana, count: 642, width: '88%' },
    { rank: 2, name: 'Wheat', img: commWheat, count: 520, width: '71%' },
    { rank: 3, name: 'Maize', img: commMaize, count: 418, width: '57%' },
    { rank: 4, name: 'Mustard', img: commMustard, count: 312, width: '43%' },
    { rank: 5, name: 'Rice', img: commRice, count: 286, width: '39%' },
  ];

  // Recent Unlock Activity
  const recentActivities = [
    {
      badge: 'R',
      badgeBg: '#1e70bf',
      text: 'Rajesh Traders unlocked ABC Foods (Makhana)',
      time: '10 mins ago',
    },
    {
      badge: 'G',
      badgeBg: '#16a34a',
      text: 'Greenfield Foods unlocked Kumar Export (Wheat)',
      time: '22 mins ago',
    },
    {
      badge: 'S',
      badgeBg: '#1e70bf',
      text: 'Sharma Imports unlocked Shree Agri (Maize)',
      time: '46 mins ago',
    },
    {
      badge: 'A',
      badgeBg: '#d97706',
      text: 'Agro Mart unlocked Patel Traders (Mustard)',
      time: '1 hour ago',
    },
    {
      badge: 'B',
      badgeBg: '#7c3aed',
      text: 'Bharat Commodities unlocked Jai Hind Exports (Chana)',
      time: '2 hours ago',
    },
  ];

  // Daily revenue bars (sample heights for 25 days across Aug 18 to Sep 17)
  const revenueBars = [
    { height: 35, color: '#16a34a' },
    { height: 25, color: '#0d9488' },
    { height: 50, color: '#16a34a' },
    { height: 40, color: '#0d9488' },
    { height: 65, color: '#16a34a' },
    { height: 45, color: '#0d9488' },
    { height: 55, color: '#16a34a' },
    { height: 30, color: '#0d9488' },
    { height: 75, color: '#16a34a' },
    { height: 60, color: '#0d9488' },
    { height: 85, color: '#16a34a' },
    { height: 70, color: '#0d9488' },
    { height: 90, color: '#16a34a' },
    { height: 65, color: '#0d9488' },
    { height: 50, color: '#16a34a' },
    { height: 60, color: '#0d9488' },
    { height: 80, color: '#16a34a' },
    { height: 95, color: '#16a34a' },
    { height: 75, color: '#0d9488' },
    { height: 85, color: '#16a34a' },
    { height: 70, color: '#0d9488' },
    { height: 90, color: '#16a34a' },
  ];

  return (
    <div className="unlocks-container">
      {/* ====================================================================
          ROW 1: 4 KPI Cards
          ==================================================================== */}
      <div className="unlocks-kpi-row-4">
        {/* Card 1: Total Unlocks */}
        <div className="unlocks-kpi-card">
          <div className="unlocks-kpi-top">
            <div className="unlocks-icon-box amber-soft">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="unlocks-kpi-info">
              <span className="kpi-label">Total Unlocks</span>
              <span className="kpi-val">2,984</span>
              <span className="kpi-trend green">↑ 18.4% <small>vs last month</small></span>
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

        {/* Card 2: Revenue from Unlocks */}
        <div className="unlocks-kpi-card">
          <div className="unlocks-kpi-top">
            <div className="unlocks-icon-box green-soft">
              <span className="rupee-icon-text">₹</span>
            </div>
            <div className="unlocks-kpi-info">
              <span className="kpi-label">Revenue from Unlocks</span>
              <span className="kpi-val">₹2,98,400</span>
              <span className="kpi-trend green">↑ 24.6% <small>vs last month</small></span>
            </div>
            <div className="kpi-sparkline green-soft">
              <span style={{ height: '35%' }} />
              <span style={{ height: '50%' }} />
              <span style={{ height: '65%' }} />
              <span style={{ height: '60%' }} />
              <span style={{ height: '85%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>
        </div>

        {/* Card 3: Unique Buyers */}
        <div className="unlocks-kpi-card">
          <div className="unlocks-kpi-top">
            <div className="unlocks-icon-box red-soft">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="unlocks-kpi-info">
              <span className="kpi-label">Unique Buyers</span>
              <span className="kpi-val">1,842</span>
              <span className="kpi-trend green">↑ 12.3% <small>vs last month</small></span>
            </div>
            <div className="kpi-sparkline amber">
              <span style={{ height: '25%' }} />
              <span style={{ height: '40%' }} />
              <span style={{ height: '55%' }} />
              <span style={{ height: '65%' }} />
              <span style={{ height: '80%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>
        </div>

        {/* Card 4: Unique Sellers Contacted */}
        <div className="unlocks-kpi-card">
          <div className="unlocks-kpi-top">
            <div className="unlocks-icon-box blue-soft">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                <path d="M9 22v-4h6v4" />
                <line x1="8" y1="6" x2="8.01" y2="6" />
                <line x1="16" y1="6" x2="16.01" y2="6" />
                <line x1="12" y1="6" x2="12.01" y2="6" />
                <line x1="8" y1="10" x2="8.01" y2="10" />
                <line x1="16" y1="10" x2="16.01" y2="10" />
                <line x1="12" y1="10" x2="12.01" y2="10" />
                <line x1="8" y1="14" x2="8.01" y2="14" />
                <line x1="16" y1="14" x2="16.01" y2="14" />
                <line x1="12" y1="14" x2="12.01" y2="14" />
              </svg>
            </div>
            <div className="unlocks-kpi-info">
              <span className="kpi-label">Unique Sellers Contacted</span>
              <span className="kpi-val">1,620</span>
              <span className="kpi-trend green">↑ 15.8% <small>vs last month</small></span>
            </div>
            <div className="kpi-sparkline blue">
              <span style={{ height: '30%' }} />
              <span style={{ height: '45%' }} />
              <span style={{ height: '60%' }} />
              <span style={{ height: '70%' }} />
              <span style={{ height: '85%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          MAIN SPLIT: Left Area + Right Sidebar
          ==================================================================== */}
      <div className="unlocks-main-split">
        {/* Left Column: Records Management */}
        <div className="unlocks-left-content">
          {/* Top Bar: Tabs + Action Button */}
          <div className="unlocks-tabs-actions-bar">
            {/* Tabs */}
            <div className="unlocks-tabs-row">
              {['All Unlocks', 'By Traders', 'By Subscribers', 'By Commodity', 'By Location', 'Revenue Report'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`unlocks-tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Right Export Button */}
            <div className="unlocks-actions-group">
              <button type="button" className="btn-export-report">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* Filter Toolbar Card */}
          <div className="unlocks-filter-toolbar">
            <div className="filter-group date-group">
              <label className="filter-lbl">Date Range</label>
              <div className="filter-date-box">
                <CalendarIcon size={12} color="#9ca3af" />
                <input
                  type="text"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Commodity</label>
              <div className="filter-dropdown">
                <span>{commodityFilter}</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Buyer/Seller</label>
              <div className="filter-dropdown">
                <span>{buyerSellerFilter}</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">User Type</label>
              <div className="filter-dropdown">
                <span>{userTypeFilter}</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Payment Type</label>
              <div className="filter-dropdown">
                <span>{paymentTypeFilter}</span>
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
          <div className="unlocks-card unlocks-table-card">
            <div className="unlocks-card-header">
              <h3 className="unlocks-card-title">Contact Unlock Records (2,984)</h3>
            </div>

            <div className="unlocks-table-wrapper">
              <table className="unlocks-data-table">
                <thead>
                  <tr>
                    <th className="th-check"><input type="checkbox" /></th>
                    <th>#</th>
                    <th>Unlocked By</th>
                    <th>Contact Type</th>
                    <th>Trader / Company</th>
                    <th>Commodity</th>
                    <th>Location</th>
                    <th>Unlocked On</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {unlockRecords.map((item) => (
                    <tr key={item.id}>
                      <td className="td-check"><input type="checkbox" /></td>
                      <td className="td-id">{item.id}</td>
                      <td className="td-user-cell">
                        <div className="user-badge-circle" style={{ backgroundColor: item.badgeBg }}>
                          {item.badge}
                        </div>
                        <span className="user-name-text">{item.unlockedBy}</span>
                      </td>
                      <td className="td-contact-type">{item.contactType}</td>
                      <td className="td-company">{item.company}</td>
                      <td className="td-commodity">{item.commodity}</td>
                      <td className="td-location">{item.location}</td>
                      <td className="td-datetime">
                        {item.datetime.split('\n').map((line, idx) => (
                          <div key={idx} className={idx === 1 ? 'time-sub' : 'date-main'}>{line}</div>
                        ))}
                      </td>
                      <td className="td-amount">{item.amount}</td>
                      <td>
                        <span className={`unlocks-status-pill ${item.status.toLowerCase()}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="td-action">
                        <a href={`#view-${item.id}`} className="unlocks-action-link">View</a>
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
            <div className="unlocks-pagination-row">
              <span className="pagination-info">Showing 1 to 10 of 2,984 entries</span>

              <div className="pagination-nav-group">
                <button type="button" className="page-nav-btn" disabled>‹</button>
                <button type="button" className={`page-num-btn ${currentPage === 1 ? 'active' : ''}`}>1</button>
                <button type="button" className="page-num-btn">2</button>
                <button type="button" className="page-num-btn">3</button>
                <button type="button" className="page-num-btn">4</button>
                <button type="button" className="page-num-btn">5</button>
                <span className="page-ellipsis">...</span>
                <button type="button" className="page-num-btn">299</button>
                <button type="button" className="page-nav-btn">›</button>

                <div className="page-size-selector">
                  <span>{pageSize}</span>
                  <ChevronDownIcon size={11} color="#6b7280" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Insights */}
        <div className="unlocks-right-sidebar">
          {/* Card 1: Revenue Overview Bar Chart */}
          <div className="unlocks-card revenue-overview-card">
            <div className="unlocks-card-header">
              <h3 className="unlocks-card-title">Revenue Overview</h3>
              <div className="unlocks-dropdown-mini">
                <span>{revenueTimeframe}</span>
                <ChevronDownIcon size={11} color="#4b5563" />
              </div>
            </div>

            <div className="revenue-chart-body">
              <div className="revenue-chart-graphic">
                <div className="y-axis-labels">
                  <span>₹40K</span>
                  <span>₹30K</span>
                  <span>₹20K</span>
                  <span>₹10K</span>
                  <span>₹0</span>
                </div>
                <div className="chart-bars-area">
                  <div className="grid-lines">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="bars-container">
                    {revenueBars.map((bar, bIdx) => (
                      <div key={bIdx} className="chart-bar-wrap">
                        <span
                          className="revenue-bar-fill"
                          style={{
                            height: `${bar.height}%`,
                            backgroundColor: bar.color,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="x-axis-dates">
                <span>18 Aug</span>
                <span>25 Aug</span>
                <span>1 Sep</span>
                <span>8 Sep</span>
                <span>15 Sep</span>
              </div>
            </div>
          </div>

          {/* Card 2: Unlock Statistics Donut */}
          <div className="unlocks-card unlock-stats-card">
            <div className="unlocks-card-header">
              <div className="title-with-info">
                <h3 className="unlocks-card-title">Unlock Statistics</h3>
                <span className="info-icon" title="Unlock conversion breakdown">ⓘ</span>
              </div>
            </div>

            <div className="stats-donut-content">
              <div className="stats-donut-graphic">
                <svg width="95" height="95" viewBox="0 0 100 100">
                  {/* Success 89.9% (dark green) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#026544"
                    strokeWidth="12"
                    strokeDasharray="214 238"
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Failed 6.1% (gold/amber) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#e5a820"
                    strokeWidth="12"
                    strokeDasharray="14 238"
                    strokeDashoffset="-214"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Refunded 4.0% (red) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#dc3545"
                    strokeWidth="12"
                    strokeDasharray="10 238"
                    strokeDashoffset="-228"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="stats-donut-center">
                  <strong className="donut-big-num">2,984</strong>
                  <span className="donut-sub-lbl">Total Unlocks</span>
                </div>
              </div>

              <div className="stats-donut-legend">
                <div className="stats-legend-row">
                  <span className="dot green" />
                  <span className="leg-lbl">Success</span>
                  <strong className="leg-val">2,684 (89.9%)</strong>
                </div>
                <div className="stats-legend-row">
                  <span className="dot gold" />
                  <span className="leg-lbl">Failed</span>
                  <strong className="leg-val">182 (6.1%)</strong>
                </div>
                <div className="stats-legend-row">
                  <span className="dot red" />
                  <span className="leg-lbl">Refunded</span>
                  <strong className="leg-val">118 (4.0%)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Top Commodities by Unlocks */}
          <div className="unlocks-card top-commodities-card">
            <div className="unlocks-card-header">
              <h3 className="unlocks-card-title">Top Commodities by Unlocks</h3>
              <a href="#viewall" className="unlocks-card-link">View All →</a>
            </div>

            <div className="top-comm-bars-list">
              {topCommodities.map((comm) => (
                <div key={comm.rank} className="top-comm-bar-item">
                  <span className="comm-rank-num">{comm.rank}</span>
                  <img src={comm.img} alt={comm.name} className="comm-bar-thumb" />
                  <span className="comm-rank-name">{comm.name}</span>
                  <div className="comm-bar-track">
                    <span className="comm-bar-fill" style={{ width: comm.width }} />
                  </div>
                  <span className="comm-rank-count">{comm.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Recent Unlock Activity */}
          <div className="unlocks-card recent-activity-card">
            <div className="unlocks-card-header">
              <h3 className="unlocks-card-title">Recent Unlock Activity</h3>
              <a href="#viewall" className="unlocks-card-link">View All →</a>
            </div>

            <div className="recent-activity-list">
              {recentActivities.map((act, aIdx) => (
                <div key={aIdx} className="activity-item">
                  <div className="activity-avatar-circle" style={{ backgroundColor: act.badgeBg }}>
                    {act.badge}
                  </div>
                  <div className="activity-details">
                    <span className="activity-desc">{act.text}</span>
                  </div>
                  <span className="activity-timestamp">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          ROW 3: 4 Bottom Brand Value Cards
          ==================================================================== */}
      <div className="unlocks-bottom-values-row">
        {/* Value 1 */}
        <div className="unlocks-value-card">
          <div className="val-icon-box amber">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Increase Trader Engagement</h4>
            <p className="val-desc">More connections. More business.</p>
          </div>
        </div>

        {/* Value 2 */}
        <div className="unlocks-value-card">
          <div className="val-icon-box gold">
            <span className="val-rupee">₹</span>
          </div>
          <div className="val-text">
            <h4 className="val-title">Generate More Revenue</h4>
            <p className="val-desc">Contact unlocks drive sustainable income.</p>
          </div>
        </div>

        {/* Value 3 */}
        <div className="unlocks-value-card">
          <div className="val-icon-box green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Verify Genuine Traders</h4>
            <p className="val-desc">Trusted and quality business network.</p>
          </div>
        </div>

        {/* Value 4 */}
        <div className="unlocks-value-card">
          <div className="val-icon-box gold-soft">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Detailed Analytics</h4>
            <p className="val-desc">Track trends, users and revenue.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
