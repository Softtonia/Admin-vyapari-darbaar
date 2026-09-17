import React, { useState } from 'react';
import commWheat from '../assets/comm_wheat.png';
import commMaize from '../assets/comm_maize.png';
import commMakhana from '../assets/comm_makhana.png';
import commMustard from '../assets/comm_mustard.png';
import commChana from '../assets/comm_chana.png';
import commRice from '../assets/comm_rice.png';
import commSoybean from '../assets/comm_soybean.png';
import commCotton from '../assets/comm_cotton.png';
import commSugar from '../assets/comm_sugar.png';
import commTur from '../assets/comm_tur.png';
import './CommodityPrices.css';

export default function CommodityPrices() {
  const [timeRange, setTimeRange] = useState('1M');
  const [searchCommodity, setSearchCommodity] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [stateFilter, setStateFilter] = useState('All States');
  const [mandiFilter, setMandiFilter] = useState('All Mandis');

  // Top Commodity Ticker Cards (6 items)
  const tickerCommodities = [
    {
      name: 'Makhana',
      price: '₹1,250',
      change: '↑ 2.4%',
      trend: 'up',
      image: commMakhana,
    },
    {
      name: 'Wheat',
      price: '₹2,350',
      change: '↑ 1.8%',
      trend: 'up',
      image: commWheat,
    },
    {
      name: 'Rice',
      price: '₹3,120',
      change: '↓ 0.6%',
      trend: 'down',
      image: commRice,
    },
    {
      name: 'Maize',
      price: '₹2,180',
      change: '↑ 1.2%',
      trend: 'up',
      image: commMaize,
    },
    {
      name: 'Mustard',
      price: '₹5,420',
      change: '↑ 3.1%',
      trend: 'up',
      image: commMustard,
    },
    {
      name: 'Chana',
      price: '₹5,120',
      change: '↑ 0.8%',
      trend: 'up',
      image: commChana,
    },
  ];

  // Top Gainers (5 rows)
  const topGainers = [
    { id: 1, name: 'Mustard', price: '5,420', change: '+ 3.1%', image: commMustard },
    { id: 2, name: 'Makhana', price: '1,250', change: '+ 2.4%', image: commMakhana },
    { id: 3, name: 'Wheat', price: '2,350', change: '+ 1.8%', image: commWheat },
    { id: 4, name: 'Maize', price: '2,180', change: '+ 1.2%', image: commMaize },
    { id: 5, name: 'Soybean', price: '4,320', change: '+ 1.0%', image: commSoybean },
  ];

  // Top Losers (5 rows)
  const topLosers = [
    { id: 1, name: 'Turmeric', price: '8,120', change: '- 2.6%', image: commTur },
    { id: 2, name: 'Cotton', price: '6,380', change: '- 1.8%', image: commCotton },
    { id: 3, name: 'Sugar', price: '3,420', change: '- 1.4%', image: commSugar },
    { id: 4, name: 'Rice', price: '3,120', change: '- 0.6%', image: commRice },
    { id: 5, name: 'Chana', price: '5,120', change: '- 0.4%', image: commChana },
  ];

  // Live Mandi Rates Table Data (10 rows)
  const mandiRates = [
    {
      id: 1,
      name: 'Makhana',
      image: commMakhana,
      variety: 'Premium',
      mandi: 'Darbhanga',
      state: 'Bihar',
      price: '1,250',
      change: '↑ 2.4%',
      trend: 'up',
      updated: '10:20 AM',
    },
    {
      id: 2,
      name: 'Wheat',
      image: commWheat,
      variety: 'Lokwan',
      mandi: 'Indore',
      state: 'Madhya Pradesh',
      price: '2,350',
      change: '↑ 1.8%',
      trend: 'up',
      updated: '10:18 AM',
    },
    {
      id: 3,
      name: 'Rice',
      image: commRice,
      variety: 'Basmati',
      mandi: 'Karnal',
      state: 'Haryana',
      price: '3,120',
      change: '↓ 0.6%',
      trend: 'down',
      updated: '10:17 AM',
    },
    {
      id: 4,
      name: 'Maize',
      image: commMaize,
      variety: 'Hybrid',
      mandi: 'Ratlam',
      state: 'Madhya Pradesh',
      price: '2,180',
      change: '↑ 1.2%',
      trend: 'up',
      updated: '10:16 AM',
    },
    {
      id: 5,
      name: 'Mustard',
      image: commMustard,
      variety: 'Yellow',
      mandi: 'Jaipur',
      state: 'Rajasthan',
      price: '5,420',
      change: '↑ 3.1%',
      trend: 'up',
      updated: '10:15 AM',
    },
    {
      id: 6,
      name: 'Chana',
      image: commChana,
      variety: 'Desi',
      mandi: 'Latur',
      state: 'Maharashtra',
      price: '5,120',
      change: '↓ 0.4%',
      trend: 'down',
      updated: '10:14 AM',
    },
    {
      id: 7,
      name: 'Soybean',
      image: commSoybean,
      variety: 'Bold',
      mandi: 'Ujjain',
      state: 'Madhya Pradesh',
      price: '4,320',
      change: '↑ 1.0%',
      trend: 'up',
      updated: '10:13 AM',
    },
    {
      id: 8,
      name: 'Cotton',
      image: commCotton,
      variety: 'Shankar-6',
      mandi: 'Rajkot',
      state: 'Gujarat',
      price: '6,380',
      change: '↓ 1.8%',
      trend: 'down',
      updated: '10:12 AM',
    },
    {
      id: 9,
      name: 'Turmeric',
      image: commTur,
      variety: 'Salem',
      mandi: 'Erode',
      state: 'Tamil Nadu',
      price: '8,120',
      change: '↓ 2.6%',
      trend: 'down',
      updated: '10:11 AM',
    },
    {
      id: 10,
      name: 'Sugar',
      image: commSugar,
      variety: 'S-30',
      mandi: 'Muzaffarnagar',
      state: 'Uttar Pradesh',
      price: '3,420',
      change: '↓ 1.4%',
      trend: 'down',
      updated: '10:10 AM',
    },
  ];

  return (
    <div className="comm-prices-page">
      {/* 1. Row 1: Commodity Ticker Cards */}
      <div className="comm-ticker-row">
        {tickerCommodities.map((c, idx) => (
          <div key={idx} className="comm-ticker-card">
            <img src={c.image} alt={c.name} className="comm-ticker-img" />
            <div className="comm-ticker-data">
              <span className="comm-ticker-name">{c.name}</span>
              <span className="comm-ticker-price">{c.price}</span>
              <span className={`comm-ticker-trend ${c.trend}`}>
                {c.change}
              </span>
            </div>
          </div>
        ))}

        {/* View All Action Card */}
        <div className="comm-ticker-action-card">
          <div className="action-grid-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </div>
          <span className="action-card-text">View All Commodities →</span>
        </div>
      </div>

      {/* 2. Row 2 & 3: Main Layout with Left Content Area & Right Sidebar */}
      <div className="comm-main-layout">
        {/* Left Content Area (~75% width) */}
        <div className="comm-left-area">
          {/* Upper Split: Chart + Market Overview */}
          <div className="comm-chart-overview-split">
            {/* Price Trend Chart Card */}
            <div className="comm-card chart-card">
              <div className="chart-header">
                <h2 className="chart-title">Price Trend – Makhana (₹/Quintal)</h2>
                <div className="chart-pills">
                  {['7D', '1M', '3M', '6M', '1Y', 'All'].map((pill) => (
                    <button
                      key={pill}
                      type="button"
                      className={`chart-pill-btn ${timeRange === pill ? 'active' : ''}`}
                      onClick={() => setTimeRange(pill)}
                    >
                      {pill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart SVG Graphic */}
              <div className="chart-svg-container">
                <svg viewBox="0 0 540 180" className="trend-svg" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.01" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line x1="40" y1="20" x2="530" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="50" x2="530" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="85" x2="530" y2="85" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="120" x2="530" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="155" x2="530" y2="155" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Y-axis labels */}
                  <text x="32" y="24" className="chart-axis-text">1,600</text>
                  <text x="32" y="54" className="chart-axis-text">1,400</text>
                  <text x="32" y="89" className="chart-axis-text">1,200</text>
                  <text x="32" y="124" className="chart-axis-text">1,000</text>
                  <text x="32" y="158" className="chart-axis-text">800</text>

                  {/* Area fill */}
                  <path
                    d="M 40 142 C 70 142, 90 134, 110 138 C 130 142, 145 130, 165 130 C 185 130, 200 142, 220 142 C 245 142, 260 128, 285 125 C 315 122, 335 124, 360 121 C 385 118, 400 102, 425 106 C 450 110, 470 120, 495 110 C 510 105, 520 108, 530 106 L 530 155 L 40 155 Z"
                    fill="url(#areaGradient)"
                  />

                  {/* Trend line */}
                  <path
                    d="M 40 142 C 70 142, 90 134, 110 138 C 130 142, 145 130, 165 130 C 185 130, 200 142, 220 142 C 245 142, 260 128, 285 125 C 315 122, 335 124, 360 121 C 385 118, 400 102, 425 106 C 450 110, 470 120, 495 110 C 510 105, 520 108, 530 106"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Highlight point (10 Sep 2026) */}
                  <circle cx="395" cy="120" r="4.5" fill="#059669" stroke="#ffffff" strokeWidth="2" />
                </svg>

                {/* Interactive / Floating Tooltip Box */}
                <div className="chart-tooltip-pin">
                  <span className="tooltip-date">10 Sep 2026</span>
                  <div className="tooltip-val-row">
                    <span className="tooltip-val">₹1,240</span>
                    <span className="tooltip-trend">↑ 2.1%</span>
                  </div>
                </div>

                {/* X-axis labels */}
                <div className="chart-x-axis-row">
                  <span>18 Aug</span>
                  <span>22 Aug</span>
                  <span>26 Aug</span>
                  <span>30 Aug</span>
                  <span>3 Sep</span>
                  <span>7 Sep</span>
                  <span>11 Sep</span>
                  <span>15 Sep</span>
                </div>
              </div>
            </div>

            {/* Makhana - Market Overview Card */}
            <div className="comm-card overview-card">
              <div className="overview-header">
                <h3 className="overview-title">Makhana – Market Overview</h3>
                <span className="live-badge">● Live</span>
              </div>

              <div className="overview-rows-list">
                <div className="overview-row">
                  <span className="ov-label">Current Price</span>
                  <span className="ov-val bold">₹1,250 / Quintal</span>
                </div>
                <div className="overview-row">
                  <span className="ov-label">Change (Today)</span>
                  <span className="ov-val green">+ ₹30 (2.4%)</span>
                </div>
                <div className="overview-row">
                  <span className="ov-label">Yesterday's Close</span>
                  <span className="ov-val">₹1,220</span>
                </div>
                <div className="overview-row">
                  <span className="ov-label">Day High</span>
                  <span className="ov-val">₹1,280</span>
                </div>
                <div className="overview-row">
                  <span className="ov-label">Day Low</span>
                  <span className="ov-val">₹1,200</span>
                </div>
                <div className="overview-row">
                  <span className="ov-label">52 Week High</span>
                  <span className="ov-val">₹1,420</span>
                </div>
                <div className="overview-row">
                  <span className="ov-label">52 Week Low</span>
                  <span className="ov-val">₹980</span>
                </div>
                <div className="overview-row">
                  <span className="ov-label">Total Traded Volume</span>
                  <span className="ov-val">2,350 Quintals</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Section: Filter Toolbar + Live Mandi Rates Table */}
          {/* Filters Bar */}
          <div className="comm-filter-card">
            <div className="filter-item">
              <label>Search Commodities</label>
              <div className="filter-search-input">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by commodity name..."
                  value={searchCommodity}
                  onChange={(e) => setSearchCommodity(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-item">
              <label>Category</label>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option>All Categories</option>
                <option>Grains & Cereals</option>
                <option>Pulses</option>
                <option>Oilseeds</option>
                <option>Spices</option>
              </select>
            </div>

            <div className="filter-item">
              <label>State</label>
              <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
                <option>All States</option>
                <option>Madhya Pradesh</option>
                <option>Bihar</option>
                <option>Rajasthan</option>
                <option>Gujarat</option>
                <option>Haryana</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Mandi</label>
              <select value={mandiFilter} onChange={(e) => setMandiFilter(e.target.value)}>
                <option>All Mandis</option>
                <option>Indore</option>
                <option>Darbhanga</option>
                <option>Jaipur</option>
                <option>Ratlam</option>
                <option>Karnal</option>
              </select>
            </div>

            <div className="filter-buttons">
              <button type="button" className="btn-comm-apply">
                Apply Filters
              </button>
              <button
                type="button"
                className="btn-comm-reset"
                onClick={() => {
                  setSearchCommodity('');
                  setCategoryFilter('All Categories');
                  setStateFilter('All States');
                  setMandiFilter('All Mandis');
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Commodity Prices Table Card */}
          <div className="comm-card table-card">
            <div className="table-header-row">
              <h3 className="table-title">Commodity Prices (Live Mandi Rates)</h3>
              <div className="table-meta-right">
                <span className="last-upd-text">Last Updated: 17 Sep 2026, 10:24 AM</span>
                <button type="button" className="btn-refresh" title="Refresh">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="comm-table-wrapper">
              <table className="comm-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>#</th>
                    <th style={{ width: '150px' }}>Commodity</th>
                    <th style={{ width: '100px' }}>Variety</th>
                    <th style={{ width: '120px' }}>Mandi</th>
                    <th>State</th>
                    <th style={{ width: '110px' }}>Price (₹/Quintal)</th>
                    <th style={{ width: '90px', textAlign: 'center' }}>Change</th>
                    <th style={{ width: '100px' }}>Last Updated</th>
                    <th style={{ width: '70px', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mandiRates.map((r) => (
                    <tr key={r.id}>
                      <td className="td-id">{r.id}</td>
                      <td className="td-commodity">
                        <img src={r.image} alt={r.name} className="comm-thumb-sm" />
                        <span className="comm-name-bold">{r.name}</span>
                      </td>
                      <td className="td-variety">{r.variety}</td>
                      <td className="td-mandi">{r.mandi}</td>
                      <td className="td-state">{r.state}</td>
                      <td className="td-price">{r.price}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`change-pill ${r.trend}`}>
                          {r.change}
                        </span>
                      </td>
                      <td className="td-time">{r.updated}</td>
                      <td className="td-action" style={{ textAlign: 'center' }}>
                        <div className="table-action-btns">
                          <button type="button" className="btn-chart-icon" title="View Chart">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="20" x2="18" y2="10" />
                              <line x1="12" y1="20" x2="12" y2="4" />
                              <line x1="6" y1="20" x2="6" y2="14" />
                              <polyline points="4 8 10 2 16 7 22 1" />
                            </svg>
                          </button>
                          <button type="button" className="btn-options-icon" title="More Options">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#64748b">
                              <circle cx="12" cy="5" r="2" />
                              <circle cx="12" cy="12" r="2" />
                              <circle cx="12" cy="19" r="2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar (~25% width) */}
        <div className="comm-right-sidebar">
          {/* Card 1: Top Gainers */}
          <div className="comm-card mini-movers-card">
            <div className="movers-header">
              <h3 className="movers-title">Top Gainers (Today)</h3>
              <a href="#gainers" className="movers-link">View All →</a>
            </div>

            <table className="movers-table">
              <thead>
                <tr>
                  <th style={{ width: '24px' }}>#</th>
                  <th>Commodity</th>
                  <th style={{ width: '65px', textAlign: 'right' }}>Price (₹)</th>
                  <th style={{ width: '65px', textAlign: 'right' }}>Change</th>
                </tr>
              </thead>
              <tbody>
                {topGainers.map((g) => (
                  <tr key={g.id}>
                    <td className="mv-id">{g.id}</td>
                    <td className="mv-name-cell">
                      <img src={g.image} alt={g.name} className="mv-thumb" />
                      <span>{g.name}</span>
                    </td>
                    <td className="mv-price">{g.price}</td>
                    <td style={{ textAlign: 'right' }}>
                      <span className="mv-pill up">{g.change}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card 2: Top Losers */}
          <div className="comm-card mini-movers-card">
            <div className="movers-header">
              <h3 className="movers-title">Top Losers (Today)</h3>
              <a href="#losers" className="movers-link">View All →</a>
            </div>

            <table className="movers-table">
              <thead>
                <tr>
                  <th style={{ width: '24px' }}>#</th>
                  <th>Commodity</th>
                  <th style={{ width: '65px', textAlign: 'right' }}>Price (₹)</th>
                  <th style={{ width: '65px', textAlign: 'right' }}>Change</th>
                </tr>
              </thead>
              <tbody>
                {topLosers.map((l) => (
                  <tr key={l.id}>
                    <td className="mv-id">{l.id}</td>
                    <td className="mv-name-cell">
                      <img src={l.image} alt={l.name} className="mv-thumb" />
                      <span>{l.name}</span>
                    </td>
                    <td className="mv-price">{l.price}</td>
                    <td style={{ textAlign: 'right' }}>
                      <span className="mv-pill down">{l.change}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card 3: Market Insights */}
          <div className="comm-card insights-card">
            <div className="movers-header">
              <h3 className="movers-title">Market Insights</h3>
              <a href="#insights" className="movers-link">View Details →</a>
            </div>

            <div className="insights-list">
              <div className="insight-item">
                <div className="insight-icon-box in-green">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                  </svg>
                </div>
                <div className="insight-meta">
                  <span className="in-title">Makhana prices up 12% this month</span>
                  <span className="in-desc">Strong demand from export markets.</span>
                </div>
              </div>

              <div className="insight-item">
                <div className="insight-icon-box in-wheat">
                  <img src={commWheat} alt="Wheat" style={{ width: '16px', height: '16px' }} />
                </div>
                <div className="insight-meta">
                  <span className="in-title">Wheat stable ahead of new harvest</span>
                  <span className="in-desc">Prices may see upward movement.</span>
                </div>
              </div>

              <div className="insight-item">
                <div className="insight-icon-box in-orange">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                </div>
                <div className="insight-meta">
                  <span className="in-title">Global edible oil prices decline</span>
                  <span className="in-desc">Positive news for domestic market.</span>
                </div>
              </div>

              <div className="insight-item">
                <div className="insight-icon-box in-blue">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v2h20V7L12 2zm1 16h3v-7h-3v7zm-5 0h3v-7H8v7zm-5 0h3v-7H3v7zm18 0h-3v-7h3v7zM2 20v2h20v-2H2z" />
                  </svg>
                </div>
                <div className="insight-meta">
                  <span className="in-title">Government may increase MSP</span>
                  <span className="in-desc">Discussions underway for next season.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Set Price Alerts */}
          <div className="price-alert-banner-card">
            <div className="alert-left-content">
              <div className="alert-bell-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#d97706" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <div className="alert-text-group">
                <span className="alert-title">Set Price Alerts</span>
                <span className="alert-desc">
                  Get notified when prices reach your target level.
                </span>
              </div>
            </div>
            <button type="button" className="btn-create-alert">
              Create Alert →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
