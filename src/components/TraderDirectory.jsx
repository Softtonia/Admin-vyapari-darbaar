import React, { useState } from 'react';
import commWheat from '../assets/comm_wheat.png';
import commMaize from '../assets/comm_maize.png';
import commMakhana from '../assets/comm_makhana.png';
import commRice from '../assets/comm_rice.png';
import commChana from '../assets/comm_chana.png';
import {
  ChevronDownIcon,
  SearchIcon,
  MoreVerticalIcon,
} from './Icons';
import './TraderDirectory.css';

export default function TraderDirectory() {
  const [activeTab, setActiveTab] = useState('All Traders');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('All Commodities');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('10 / page');
  const [insightsFilter, setInsightsFilter] = useState('Last 30 Days');

  // Traders List Data
  const tradersList = [
    {
      id: '#TR1024',
      badge: 'AB',
      badgeBg: '#1b4d3e',
      company: 'ABC Traders',
      contact: 'Rajesh Kumar',
      type: 'Wholesaler',
      commodities: 'Makhana, Fox Nuts',
      location: 'Delhi',
      verification: 'Verified',
      status: 'Active',
      joined: '12 Aug 2026',
      listings: 24,
    },
    {
      id: '#TR1025',
      badge: 'KF',
      badgeBg: '#4a5568',
      company: 'Kumar Foods',
      contact: 'Amit Kumar',
      type: 'Manufacturer',
      commodities: 'Wheat, Maize',
      location: 'Bihar',
      verification: 'Verified',
      status: 'Active',
      joined: '10 Aug 2026',
      listings: 18,
    },
    {
      id: '#TR1026',
      badge: 'ST',
      badgeBg: '#7c5a2c',
      company: 'Sharma Trading',
      contact: 'Sandeep Sharma',
      type: 'Trader',
      commodities: 'Rice, Pulses',
      location: 'Punjab',
      verification: 'Pending',
      status: 'Active',
      joined: '05 Aug 2026',
      listings: 12,
    },
    {
      id: '#TR1027',
      badge: 'JH',
      badgeBg: '#2c5282',
      company: 'Jai Hind Exports',
      contact: 'Vikram Singh',
      type: 'Exporter',
      commodities: 'Spices, Grains',
      location: 'Rajasthan',
      verification: 'Verified',
      status: 'Active',
      joined: '01 Aug 2026',
      listings: 36,
    },
    {
      id: '#TR1028',
      badge: 'GG',
      badgeBg: '#8c4b27',
      company: 'Global Grains',
      contact: 'Neha Verma',
      type: 'Importer',
      commodities: 'Wheat, Soybean',
      location: 'Maharashtra',
      verification: 'Verified',
      status: 'Active',
      joined: '30 Jul 2026',
      listings: 28,
    },
    {
      id: '#TR1029',
      badge: 'SA',
      badgeBg: '#2b6cb0',
      company: 'Shree Agri',
      contact: 'Mahesh Patil',
      type: 'Distributor',
      commodities: 'Maize, Rice',
      location: 'Madhya Pradesh',
      verification: 'Verified',
      status: 'Active',
      joined: '28 Jul 2026',
      listings: 16,
    },
    {
      id: '#TR1030',
      badge: 'PT',
      badgeBg: '#744210',
      company: 'Patel Traders',
      contact: 'Kirit Patel',
      type: 'Retailer',
      commodities: 'Groundnut, Cotton',
      location: 'Gujarat',
      verification: 'Suspended',
      status: 'Inactive',
      joined: '25 Jul 2026',
      listings: 9,
    },
    {
      id: '#TR1031',
      badge: 'KS',
      badgeBg: '#234e52',
      company: 'Kisan Supply Co.',
      contact: 'Rohit Yadav',
      type: 'Wholesaler',
      commodities: 'Pulses, Oilseeds',
      location: 'Uttar Pradesh',
      verification: 'Verified',
      status: 'Active',
      joined: '22 Jul 2026',
      listings: 22,
    },
    {
      id: '#TR1032',
      badge: 'BC',
      badgeBg: '#b7791f',
      company: 'Bharat Commodities',
      contact: 'Anita Sharma',
      type: 'Trader',
      commodities: 'Sugar, Maize',
      location: 'Karnataka',
      verification: 'Pending',
      status: 'Active',
      joined: '20 Jul 2026',
      listings: 14,
    },
    {
      id: '#TR1033',
      badge: 'NE',
      badgeBg: '#9b2c2c',
      company: 'Narmada Exports',
      contact: 'Deepak Jain',
      type: 'Exporter',
      commodities: 'Onion, Spices',
      location: 'Maharashtra',
      verification: 'Verified',
      status: 'Active',
      joined: '18 Jul 2026',
      listings: 30,
    },
  ];

  // Top Trader Locations
  const topLocations = [
    { rank: 1, name: 'Delhi', count: '1,240', width: '88%' },
    { rank: 2, name: 'Maharashtra', count: '980', width: '70%' },
    { rank: 3, name: 'Uttar Pradesh', count: '860', width: '61%' },
    { rank: 4, name: 'Gujarat', count: '720', width: '51%' },
    { rank: 5, name: 'Bihar', count: '642', width: '45%' },
  ];

  // Top Commodities by Traders
  const topCommoditiesTraders = [
    { rank: 1, name: 'Makhana', img: commMakhana, count: '1,820', width: '85%' },
    { rank: 2, name: 'Wheat', img: commWheat, count: '1,540', width: '72%' },
    { rank: 3, name: 'Maize', img: commMaize, count: '1,320', width: '62%' },
    { rank: 4, name: 'Rice', img: commRice, count: '980', width: '46%' },
    { rank: 5, name: 'Pulses', img: commChana, count: '860', width: '40%' },
  ];

  return (
    <div className="trader-dir-container">
      {/* ====================================================================
          ROW 1: 5 KPI Cards
          ==================================================================== */}
      <div className="trader-kpi-row-5">
        {/* Card 1: Total Traders */}
        <div className="trader-kpi-card">
          <div className="trader-kpi-top">
            <div className="trader-icon-box green">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="trader-kpi-info">
              <span className="kpi-label">Total Traders</span>
              <span className="kpi-val">8,642</span>
              <span className="kpi-trend green">↑ 12.4% <small>vs last month</small></span>
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

        {/* Card 2: Verified Traders */}
        <div className="trader-kpi-card">
          <div className="trader-kpi-top">
            <div className="trader-icon-box teal">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <div className="trader-kpi-info">
              <span className="kpi-label">Verified Traders</span>
              <span className="kpi-val">5,980</span>
              <span className="kpi-trend green">↑ 18.6%</span>
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

        {/* Card 3: Pending Verification */}
        <div className="trader-kpi-card">
          <div className="trader-kpi-top">
            <div className="trader-icon-box amber">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d49b16" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 22h14" />
                <path d="M5 2h14" />
                <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
                <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
              </svg>
            </div>
            <div className="trader-kpi-info">
              <span className="kpi-label">Pending Verification</span>
              <span className="kpi-val">426</span>
              <span className="kpi-trend red">↓ 6.2%</span>
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

        {/* Card 4: Suspended Traders */}
        <div className="trader-kpi-card">
          <div className="trader-kpi-top">
            <div className="trader-icon-box red">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="17" y1="8" x2="23" y2="14" />
                <line x1="23" y1="8" x2="17" y2="14" />
              </svg>
            </div>
            <div className="trader-kpi-info">
              <span className="kpi-label">Suspended Traders</span>
              <span className="kpi-val">112</span>
              <span className="kpi-trend green">↑ 2.1%</span>
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

        {/* Card 5: New this Month */}
        <div className="trader-kpi-card">
          <div className="trader-kpi-top">
            <div className="trader-icon-box green-tint">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
            </div>
            <div className="trader-kpi-info">
              <span className="kpi-label">New this Month</span>
              <span className="kpi-val">620</span>
              <span className="kpi-trend green">↑ 24.5%</span>
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
      </div>

      {/* ====================================================================
          MAIN SPLIT: Left Area (Tabs, Toolbar, Table) + Right Sidebar Cards
          ==================================================================== */}
      <div className="trader-main-split">
        {/* Left Column: Trader Management */}
        <div className="trader-left-content">
          {/* Top Bar: Tabs + Action Buttons */}
          <div className="trader-tabs-actions-bar">
            {/* Left Status Tabs */}
            <div className="trader-tabs-row">
              {['All Traders', 'Verified', 'Pending Verification', 'Suspended', 'Inactive'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`trader-tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Right Action Buttons */}
            <div className="trader-actions-group">
              <button type="button" className="btn-add-trader">
                <span className="add-sym">+</span>
                <span>Add New Trader</span>
                <ChevronDownIcon size={12} color="#ffffff" />
              </button>

              <button type="button" className="btn-trader-outline">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Export</span>
              </button>

              <button type="button" className="btn-trader-outline">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span>Import</span>
              </button>

              <button type="button" className="btn-trader-outline">
                <span>Bulk Actions</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </button>
            </div>
          </div>

          {/* Filter Toolbar Card */}
          <div className="trader-filter-toolbar">
            <div className="filter-group search-group">
              <label className="filter-lbl">Search</label>
              <div className="filter-search-box">
                <SearchIcon size={12} color="#9ca3af" />
                <input
                  type="text"
                  placeholder="Name, company, mobile..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Commodity</label>
              <div className="filter-dropdown">
                <span>{selectedCommodity}</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Location / State</label>
              <div className="filter-dropdown">
                <span>{selectedState}</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Trader Type</label>
              <div className="filter-dropdown">
                <span>{selectedType}</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Verification Status</label>
              <div className="filter-dropdown">
                <span>{selectedStatus}</span>
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
          <div className="trader-card trader-table-card">
            <div className="trader-card-header">
              <h3 className="trader-card-title">Traders (8,642)</h3>
            </div>

            <div className="trader-table-wrapper">
              <table className="trader-data-table">
                <thead>
                  <tr>
                    <th className="th-check"><input type="checkbox" /></th>
                    <th>#</th>
                    <th>Trader / Company</th>
                    <th>Trader Type</th>
                    <th>Commodities</th>
                    <th>Location</th>
                    <th>Verification</th>
                    <th>Status</th>
                    <th>Joined On</th>
                    <th>Listings</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {tradersList.map((trader) => (
                    <tr key={trader.id}>
                      <td className="td-check"><input type="checkbox" /></td>
                      <td className="td-id">{trader.id}</td>
                      <td className="td-company-cell">
                        <div className="trader-badge-icon" style={{ backgroundColor: trader.badgeBg }}>
                          {trader.badge}
                        </div>
                        <div className="trader-name-block">
                          <span className="company-bold">{trader.company}</span>
                          <span className="contact-sub">{trader.contact}</span>
                        </div>
                      </td>
                      <td className="td-type">{trader.type}</td>
                      <td className="td-commodities">{trader.commodities}</td>
                      <td className="td-loc">{trader.location}</td>
                      <td>
                        <span
                          className={`trader-verif-pill ${
                            trader.verification === 'Verified'
                              ? 'verified'
                              : trader.verification === 'Pending'
                              ? 'pending'
                              : 'suspended'
                          }`}
                        >
                          {trader.verification}
                        </span>
                      </td>
                      <td>
                        <span className={`trader-status-pill ${trader.status.toLowerCase()}`}>
                          {trader.status}
                        </span>
                      </td>
                      <td className="td-date">{trader.joined}</td>
                      <td className="td-listings">{trader.listings}</td>
                      <td className="td-action">
                        <a href={`#view-${trader.id}`} className="trader-action-link">View</a>
                      </td>
                      <td className="td-more">
                        <MoreVerticalIcon size={14} color="#9ca3af" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="trader-pagination-row">
              <span className="pagination-info">Showing 1 to 10 of 8,642 entries</span>

              <div className="pagination-nav-group">
                <button type="button" className="page-nav-btn" disabled>‹</button>
                <button type="button" className={`page-num-btn ${currentPage === 1 ? 'active' : ''}`}>1</button>
                <button type="button" className="page-num-btn">2</button>
                <button type="button" className="page-num-btn">3</button>
                <button type="button" className="page-num-btn">4</button>
                <button type="button" className="page-num-btn">5</button>
                <span className="page-ellipsis">...</span>
                <button type="button" className="page-num-btn">865</button>
                <button type="button" className="page-nav-btn">›</button>

                <div className="page-size-selector">
                  <span>{pageSize}</span>
                  <ChevronDownIcon size={11} color="#6b7280" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Insights & Leaderboards */}
        <div className="trader-right-sidebar">
          {/* Card 1: Trader Insights */}
          <div className="trader-card trader-insights-card">
            <div className="trader-card-header">
              <h3 className="trader-card-title">Trader Insights</h3>
              <div className="trader-dropdown-mini">
                <span>{insightsFilter}</span>
                <ChevronDownIcon size={11} color="#4b5563" />
              </div>
            </div>

            <div className="insights-donut-content">
              <div className="insights-donut-graphic">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  {/* Verified 69.3% (dark green) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#026544"
                    strokeWidth="12"
                    strokeDasharray="165 238"
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Pending 4.9% (gold/yellow) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#e5a820"
                    strokeWidth="12"
                    strokeDasharray="12 238"
                    strokeDashoffset="-165"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Suspended 1.3% (red) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#dc3545"
                    strokeWidth="12"
                    strokeDasharray="4 238"
                    strokeDashoffset="-177"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Inactive 24.6% (gray) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#adb5bd"
                    strokeWidth="12"
                    strokeDasharray="57 238"
                    strokeDashoffset="-181"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="insights-donut-center">
                  <strong className="donut-big-num">8,642</strong>
                  <span className="donut-sub-lbl">Total Traders</span>
                </div>
              </div>

              <div className="insights-donut-legend">
                <div className="insights-legend-row">
                  <span className="dot green" />
                  <span className="leg-lbl">Verified</span>
                  <strong className="leg-val">5,980 (69.3%)</strong>
                </div>
                <div className="insights-legend-row">
                  <span className="dot gold" />
                  <span className="leg-lbl">Pending</span>
                  <strong className="leg-val">426 (4.9%)</strong>
                </div>
                <div className="insights-legend-row">
                  <span className="dot red" />
                  <span className="leg-lbl">Suspended</span>
                  <strong className="leg-val">112 (1.3%)</strong>
                </div>
                <div className="insights-legend-row">
                  <span className="dot gray" />
                  <span className="leg-lbl">Inactive</span>
                  <strong className="leg-val">2,124 (24.6%)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Top Trader Locations */}
          <div className="trader-card top-locations-card">
            <div className="trader-card-header">
              <h3 className="trader-card-title">Top Trader Locations</h3>
              <a href="#viewall" className="trader-card-link">View All →</a>
            </div>

            <div className="top-loc-bars-list">
              {topLocations.map((loc) => (
                <div key={loc.rank} className="top-loc-bar-item">
                  <span className="loc-rank-num">{loc.rank}</span>
                  <div className="loc-state-icon">
                    <span>🏛</span>
                  </div>
                  <span className="loc-rank-name">{loc.name}</span>
                  <div className="loc-bar-track">
                    <span className="loc-bar-fill" style={{ width: loc.width }} />
                  </div>
                  <span className="loc-rank-count">{loc.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Top Commodities by Traders */}
          <div className="trader-card top-commodities-card">
            <div className="trader-card-header">
              <h3 className="trader-card-title">Top Commodities by Traders</h3>
              <a href="#viewall" className="trader-card-link">View All →</a>
            </div>

            <div className="top-loc-bars-list">
              {topCommoditiesTraders.map((comm) => (
                <div key={comm.rank} className="top-loc-bar-item">
                  <span className="loc-rank-num">{comm.rank}</span>
                  <img src={comm.img} alt={comm.name} className="comm-bar-thumb" />
                  <span className="loc-rank-name">{comm.name}</span>
                  <div className="loc-bar-track">
                    <span className="loc-bar-fill" style={{ width: comm.width }} />
                  </div>
                  <span className="loc-rank-count">{comm.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          ROW 3: 4 Bottom Brand Value Cards
          ==================================================================== */}
      <div className="trader-bottom-values-row">
        {/* Value 1 */}
        <div className="trader-value-card">
          <div className="val-icon-box green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Verify & Build Trust</h4>
            <p className="val-desc">Review documents and verify genuine traders.</p>
          </div>
        </div>

        {/* Value 2 */}
        <div className="trader-value-card">
          <div className="val-icon-box amber">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d49b16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Grow Trading Network</h4>
            <p className="val-desc">More traders, more opportunities.</p>
          </div>
        </div>

        {/* Value 3 */}
        <div className="trader-value-card">
          <div className="val-icon-box teal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Monitor Activity</h4>
            <p className="val-desc">Track listings, engagement and compliance.</p>
          </div>
        </div>

        {/* Value 4 */}
        <div className="trader-value-card">
          <div className="val-icon-box gold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Ensure Quality Marketplace</h4>
            <p className="val-desc">Remove fake or inactive accounts.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
