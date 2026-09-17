import React, { useState } from 'react';
import commWheat from '../assets/comm_wheat.png';
import commMaize from '../assets/comm_maize.png';
import commMakhana from '../assets/comm_makhana.png';
import commMustard from '../assets/comm_mustard.png';
import commChana from '../assets/comm_chana.png';
import {
  ChevronDownIcon,
  CalendarIcon,
  SearchIcon,
  MoreVerticalIcon,
} from './Icons';
import './TradeRequirements.css';

export default function TradeRequirements() {
  const [activeTab, setActiveTab] = useState('All Requirements');
  const [selectedCommodity, setSelectedCommodity] = useState('All Commodities');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('10 / page');
  const [insightsFilter, setInsightsFilter] = useState('Last 30 Days');

  // Trade Requirements Table Data
  const requirementsList = [
    { id: '#TR1024', trader: 'ABC Traders', type: 'BUY', comm: 'Makhana', qty: '500 KG', location: 'Delhi', posted: '17 Sep 2026', validity: '30 Days', status: 'Active' },
    { id: '#TR1025', trader: 'Kumar Foods', type: 'SELL', comm: 'Wheat', qty: '10 MT', location: 'Bihar', posted: '17 Sep 2026', validity: '45 Days', status: 'Pending' },
    { id: '#TR1026', trader: 'Sharma Trading', type: 'BUY', comm: 'Maize', qty: '5 MT', location: 'Punjab', posted: '16 Sep 2026', validity: '30 Days', status: 'Active' },
    { id: '#TR1027', trader: 'Jai Hind Exports', type: 'SELL', comm: 'Mustard', qty: '2 MT', location: 'Rajasthan', posted: '16 Sep 2026', validity: '20 Days', status: 'Under Review' },
    { id: '#TR1028', trader: 'Global Grains', type: 'BUY', comm: 'Chana', qty: '25 MT', location: 'Madhya Pradesh', posted: '16 Sep 2026', validity: '60 Days', status: 'Active' },
    { id: '#TR1029', trader: 'Shree Agri', type: 'SELL', comm: 'Soya bean', qty: '50 MT', location: 'Maharashtra', posted: '16 Sep 2026', validity: '30 Days', status: 'Active' },
    { id: '#TR1030', trader: 'Patel Traders', type: 'BUY', comm: 'Rice (Basmati)', qty: '1 MT', location: 'Uttar Pradesh', posted: '15 Sep 2026', validity: '15 Days', status: 'Expired' },
    { id: '#TR1031', trader: 'Kisan Supply Co.', type: 'SELL', comm: 'Tur (Arhar)', qty: '12 MT', location: 'Gujarat', posted: '15 Sep 2026', validity: '30 Days', status: 'Active' },
    { id: '#TR1032', trader: 'Bharat Commodities', type: 'BUY', comm: 'Sugar', qty: '20 MT', location: 'Karnataka', posted: '15 Sep 2026', validity: '45 Days', status: 'Active' },
    { id: '#TR1033', trader: 'Narmada Exports', type: 'SELL', comm: 'Onion', qty: '3 MT', location: 'Maharashtra', posted: '15 Sep 2026', validity: '20 Days', status: 'Rejected' },
  ];

  // Top Commodities Ranking
  const topCommodities = [
    { rank: 1, name: 'Makhana', img: commMakhana, count: 642, width: '85%' },
    { rank: 2, name: 'Wheat', img: commWheat, count: 520, width: '68%' },
    { rank: 3, name: 'Maize', img: commMaize, count: 418, width: '55%' },
    { rank: 4, name: 'Mustard', img: commMustard, count: 312, width: '42%' },
    { rank: 5, name: 'Chana', img: commChana, count: 286, width: '38%' },
  ];

  // Recent Requirements Feed
  const recentReqs = [
    { type: 'BUY', title: '500 KG Makhana – Delhi', by: 'by ABC Traders', time: '10 mins ago' },
    { type: 'SELL', title: '10 MT Wheat – Bihar', by: 'by Kumar Foods', time: '22 mins ago' },
    { type: 'BUY', title: '5 MT Maize – Punjab', by: 'by Sharma Trading', time: '45 mins ago' },
    { type: 'SELL', title: '2 MT Mustard – Rajasthan', by: 'by Jai Hind Exports', time: '1 hour ago' },
    { type: 'BUY', title: '25 MT Chana – MP', by: 'by Global Grains', time: '2 hours ago' },
  ];

  return (
    <div className="trade-req-container">
      {/* ====================================================================
          ROW 1: 4 KPI Cards + Add New Requirement Button
          ==================================================================== */}
      <div className="trade-kpi-row">
        {/* Card 1: Total Requirements */}
        <div className="trade-stat-card">
          <div className="trade-stat-top">
            <div className="trade-stat-icon blue">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d6efd" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <div className="trade-stat-data">
              <span className="trade-stat-label">Total Requirements</span>
              <span className="trade-stat-value">3,842</span>
              <span className="trade-stat-trend green">↑ 12.5% <small>vs last month</small></span>
            </div>
            <div className="trade-stat-sparkline blue">
              <span style={{ height: '35%' }} />
              <span style={{ height: '45%' }} />
              <span style={{ height: '60%' }} />
              <span style={{ height: '50%' }} />
              <span style={{ height: '80%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>
        </div>

        {/* Card 2: Buy Requirements */}
        <div className="trade-stat-card">
          <div className="trade-stat-top">
            <div className="trade-stat-icon green">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <div className="trade-stat-data">
              <span className="trade-stat-label">Buy Requirements</span>
              <span className="trade-stat-value">2,104</span>
              <span className="trade-stat-trend green">↑ 15.6%</span>
            </div>
            <div className="trade-stat-sparkline green">
              <span style={{ height: '30%' }} />
              <span style={{ height: '50%' }} />
              <span style={{ height: '40%' }} />
              <span style={{ height: '70%' }} />
              <span style={{ height: '85%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>
        </div>

        {/* Card 3: Sell Requirements */}
        <div className="trade-stat-card">
          <div className="trade-stat-top">
            <div className="trade-stat-icon amber">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d49b16" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                <path d="M12 9l3 3m0 0l-3 3m3-3H9" />
              </svg>
            </div>
            <div className="trade-stat-data">
              <span className="trade-stat-label">Sell Requirements</span>
              <span className="trade-stat-value">1,738</span>
              <span className="trade-stat-trend green">↑ 8.4%</span>
            </div>
            <div className="trade-stat-sparkline amber">
              <span style={{ height: '40%' }} />
              <span style={{ height: '45%' }} />
              <span style={{ height: '55%' }} />
              <span style={{ height: '65%' }} />
              <span style={{ height: '80%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>
        </div>

        {/* Card 4: Pending Approval */}
        <div className="trade-stat-card">
          <div className="trade-stat-top">
            <div className="trade-stat-icon red">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="trade-stat-data">
              <span className="trade-stat-label">Pending Approval</span>
              <span className="trade-stat-value">428</span>
              <span className="trade-stat-trend red">↓ 6.8%</span>
            </div>
            <div className="trade-stat-sparkline red">
              <span style={{ height: '100%' }} />
              <span style={{ height: '85%' }} />
              <span style={{ height: '70%' }} />
              <span style={{ height: '55%' }} />
              <span style={{ height: '40%' }} />
              <span style={{ height: '30%' }} />
            </div>
          </div>
        </div>

        {/* Right Button: + Add New Requirement */}
        <div className="trade-add-btn-wrap">
          <button type="button" className="trade-add-btn">
            <span className="add-sym">+</span>
            <span>Add New Requirement</span>
            <ChevronDownIcon size={12} color="#ffffff" />
          </button>
        </div>
      </div>

      {/* ====================================================================
          MAIN SPLIT: Left Area (Tabs, Toolbar, Table) + Right Sidebar Cards
          ==================================================================== */}
      <div className="trade-main-split">
        {/* Left Column: Requirements Management */}
        <div className="trade-left-content">
          {/* Status Tabs Bar */}
          <div className="trade-status-tabs-row">
            {['All Requirements', 'Buy Requirements', 'Sell Requirements', 'Pending Approval', 'Expired', 'Rejected'].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`trade-status-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filter Toolbar Card */}
          <div className="trade-filter-toolbar">
            <div className="filter-group">
              <label className="filter-lbl">Commodity</label>
              <div className="filter-dropdown">
                <span>{selectedCommodity}</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Requirement Type</label>
              <div className="filter-dropdown">
                <span>{selectedType}</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">State</label>
              <div className="filter-dropdown">
                <span>{selectedState}</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Location / City</label>
              <div className="filter-dropdown">
                <span>{selectedLocation}</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Date Range</label>
              <div className="filter-date-input">
                <CalendarIcon size={12} color="#6b7280" />
                <span>Select date range</span>
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Status</label>
              <div className="filter-dropdown">
                <span>{selectedStatus}</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </div>
            </div>

            <div className="filter-actions">
              <button type="button" className="btn-filter-apply">
                Apply Filters
              </button>
              <button type="button" className="btn-filter-reset">
                Reset
              </button>
            </div>
          </div>

          {/* Table Card */}
          <div className="trade-card trade-table-card">
            <div className="trade-card-header">
              <h3 className="trade-card-title">Trade Requirements (3,842)</h3>
              <button type="button" className="btn-export-table">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Export</span>
              </button>
            </div>

            <div className="trade-table-wrapper">
              <table className="trade-data-table">
                <thead>
                  <tr>
                    <th className="th-check"><input type="checkbox" /></th>
                    <th>ID</th>
                    <th>Trader Name</th>
                    <th>Type</th>
                    <th>Commodity</th>
                    <th>Quantity</th>
                    <th>Location</th>
                    <th>Posted On</th>
                    <th>Validity</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {requirementsList.map((item, idx) => (
                    <tr key={idx}>
                      <td className="td-check"><input type="checkbox" /></td>
                      <td className="td-id">{item.id}</td>
                      <td className="td-trader">{item.trader}</td>
                      <td>
                        <span className={`trade-type-pill ${item.type.toLowerCase()}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="td-comm">{item.comm}</td>
                      <td className="td-qty">{item.qty}</td>
                      <td className="td-loc">{item.location}</td>
                      <td className="td-posted">{item.posted}</td>
                      <td className="td-validity">{item.validity}</td>
                      <td>
                        <span
                          className={`trade-status-pill ${
                            item.status === 'Active'
                              ? 'active'
                              : item.status === 'Pending'
                              ? 'pending'
                              : item.status === 'Under Review'
                              ? 'under-review'
                              : item.status === 'Expired'
                              ? 'expired'
                              : 'rejected'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="td-action">
                        <a href={`#view-${item.id}`} className="trade-action-link">View</a>
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
            <div className="trade-pagination-row">
              <span className="pagination-info">Showing 1 to 10 of 3,842 entries</span>

              <div className="pagination-nav-group">
                <button type="button" className="page-nav-btn" disabled>‹</button>
                <button type="button" className={`page-num-btn ${currentPage === 1 ? 'active' : ''}`}>1</button>
                <button type="button" className="page-num-btn">2</button>
                <button type="button" className="page-num-btn">3</button>
                <button type="button" className="page-num-btn">4</button>
                <button type="button" className="page-num-btn">5</button>
                <span className="page-ellipsis">...</span>
                <button type="button" className="page-num-btn">385</button>
                <button type="button" className="page-nav-btn">›</button>

                <div className="page-size-selector">
                  <span>{pageSize}</span>
                  <ChevronDownIcon size={11} color="#6b7280" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Insights & Leaderboard */}
        <div className="trade-right-sidebar">
          {/* Card 1: Requirement Insights */}
          <div className="trade-card requirement-insights-card">
            <div className="trade-card-header">
              <h3 className="trade-card-title">Requirement Insights</h3>
              <div className="trade-dropdown-mini">
                <span>{insightsFilter}</span>
                <ChevronDownIcon size={11} color="#4b5563" />
              </div>
            </div>

            <div className="insights-donut-content">
              <div className="insights-donut-graphic">
                <svg width="105" height="105" viewBox="0 0 100 100">
                  {/* Buy Requirements 54.7% (green) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#026544"
                    strokeWidth="12"
                    strokeDasharray="130 238"
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Sell Requirements 45.3% (gold) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#e5a820"
                    strokeWidth="12"
                    strokeDasharray="108 238"
                    strokeDashoffset="-130"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="insights-donut-center">
                  <strong className="donut-big-num">3,842</strong>
                  <span className="donut-sub-lbl">Total Requirements</span>
                </div>
              </div>

              <div className="insights-donut-legend">
                <div className="insights-legend-item">
                  <span className="dot green" />
                  <div className="leg-details">
                    <span className="leg-lbl">Buy Requirements</span>
                    <strong className="leg-val">2,104 (54.7%)</strong>
                  </div>
                </div>

                <div className="insights-legend-item">
                  <span className="dot gold" />
                  <div className="leg-details">
                    <span className="leg-lbl">Sell Requirements</span>
                    <strong className="leg-val">1,738 (45.3%)</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Top Commodities */}
          <div className="trade-card top-commodities-card">
            <div className="trade-card-header">
              <h3 className="trade-card-title">Top Commodities</h3>
              <a href="#viewall" className="trade-card-link">View All →</a>
            </div>

            <div className="top-comm-bars-list">
              {topCommodities.map((comm) => (
                <div key={comm.rank} className="top-comm-bar-item">
                  <span className="comm-rank-num">{comm.rank}</span>
                  <img src={comm.img} alt={comm.name} className="comm-rank-thumb" />
                  <span className="comm-rank-name">{comm.name}</span>
                  <div className="comm-bar-track">
                    <span className="comm-bar-fill" style={{ width: comm.width }} />
                  </div>
                  <span className="comm-rank-count">{comm.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Recent Requirements Feed */}
          <div className="trade-card recent-requirements-card">
            <div className="trade-card-header">
              <h3 className="trade-card-title">Recent Requirements</h3>
              <a href="#viewall" className="trade-card-link">View All →</a>
            </div>

            <div className="recent-reqs-list">
              {recentReqs.map((req, idx) => (
                <div key={idx} className="recent-req-item">
                  <span className={`trade-type-pill-mini ${req.type.toLowerCase()}`}>
                    {req.type}
                  </span>
                  <div className="recent-req-info">
                    <p className="recent-req-title">{req.title}</p>
                    <span className="recent-req-by">{req.by}</span>
                  </div>
                  <span className="recent-req-time">{req.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          ROW 3: 4 Bottom Value Brand Cards
          ==================================================================== */}
      <div className="trade-bottom-values-row">
        {/* Value 1 */}
        <div className="trade-value-card">
          <div className="val-icon-box amber">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d49b16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Connect Genuine Traders</h4>
            <p className="val-desc">Verified buyers and sellers across India.</p>
          </div>
        </div>

        {/* Value 2 */}
        <div className="trade-value-card">
          <div className="val-icon-box gold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Increase Trade Opportunities</h4>
            <p className="val-desc">Help businesses find the right partners.</p>
          </div>
        </div>

        {/* Value 3 */}
        <div className="trade-value-card">
          <div className="val-icon-box green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Trusted & Verified Listings</h4>
            <p className="val-desc">Ensure quality and authenticity.</p>
          </div>
        </div>

        {/* Value 4 */}
        <div className="trade-value-card">
          <div className="val-icon-box amber">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d49b16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Stronger Indian Trade</h4>
            <p className="val-desc">From local mandis to global markets.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
