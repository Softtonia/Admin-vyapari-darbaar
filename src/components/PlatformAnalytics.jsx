import React, { useState } from 'react';
import './PlatformAnalytics.css';
import makhanaImg from '../assets/comm_makhana.png';
import wheatImg from '../assets/comm_wheat.png';
import maizeImg from '../assets/comm_maize.png';
import mustardImg from '../assets/comm_mustard.png';
import riceImg from '../assets/comm_rice.png';

export default function PlatformAnalytics() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [dateRange, setDateRange] = useState('01 Sep 2026 - 17 Sep 2026');
  const [userGrowthPeriod, setUserGrowthPeriod] = useState('Last 30 Days');
  const [activityPeriod, setActivityPeriod] = useState('Last 30 Days');
  const [revenuePeriod, setRevenuePeriod] = useState('Last 6 Months');
  const [commoditiesPeriod, setCommoditiesPeriod] = useState('Last 30 Days');

  // Tabs
  const tabs = [
    'Overview',
    'Users',
    'Trading Activity',
    'Revenue',
    'Content',
    'Geographic',
    'Devices',
    'Custom Reports',
  ];

  // Top Commodities Data
  const topCommodities = [
    { rank: 1, name: 'Makhana', img: makhanaImg, views: '24,320', pct: 100 },
    { rank: 2, name: 'Wheat', img: wheatImg, views: '18,450', pct: 76 },
    { rank: 3, name: 'Maize', img: maizeImg, views: '12,840', pct: 53 },
    { rank: 4, name: 'Mustard', img: mustardImg, views: '10,230', pct: 42 },
    { rank: 5, name: 'Rice', img: riceImg, views: '8,940', pct: 37 },
  ];

  // Top Pages Data
  const topPages = [
    { rank: 1, page: 'Home', views: '524,320', uniqueViews: '412,650', avgTime: '2m 24s' },
    { rank: 2, page: 'Mandi Rates', views: '418,420', uniqueViews: '320,180', avgTime: '3m 12s' },
    { rank: 3, page: 'Commodity Prices', views: '385,210', uniqueViews: '298,430', avgTime: '2m 48s' },
    { rank: 4, page: 'Trader Directory', views: '310,540', uniqueViews: '248,120', avgTime: '2m 15s' },
    { rank: 5, page: 'News & Articles', views: '254,860', uniqueViews: '198,430', avgTime: '3m 05s' },
  ];

  // Top Locations Data
  const topLocations = [
    { rank: 1, state: 'Uttar Pradesh', pct: '18.2%' },
    { rank: 2, state: 'Bihar', pct: '12.6%' },
    { rank: 3, state: 'Maharashtra', pct: '11.4%' },
    { rank: 4, state: 'Delhi', pct: '8.9%' },
    { rank: 5, state: 'Rajasthan', pct: '7.3%' },
    { rank: 6, state: 'Madhya Pradesh', pct: '6.8%' },
    { rank: 7, state: 'Gujarat', pct: '6.2%' },
    { rank: 8, state: 'Others', pct: '28.4%' },
  ];

  return (
    <div className="analytics-viewport">
      {/* ====================================================================
          Row 1: 5 Summary KPI Cards
          ==================================================================== */}
      <div className="analytics-kpi-row">
        {/* Card 1: Total Users */}
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-left">
            <div className="analytics-kpi-icon-box green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="analytics-kpi-details">
              <span className="analytics-kpi-label">Total Users</span>
              <span className="analytics-kpi-value">25,842</span>
              <div className="analytics-kpi-trend green">
                <span className="analytics-trend-arrow">↑ 12.4%</span>
                <span className="analytics-trend-period">vs last month</span>
              </div>
            </div>
          </div>
          <div className="analytics-kpi-sparkline green">
            <span style={{ height: '35%' }} />
            <span style={{ height: '48%' }} />
            <span style={{ height: '62%' }} />
            <span style={{ height: '75%' }} />
            <span style={{ height: '90%' }} />
            <span style={{ height: '100%' }} />
          </div>
        </div>

        {/* Card 2: Active Users */}
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-left">
            <div className="analytics-kpi-icon-box cyan">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="analytics-kpi-details">
              <span className="analytics-kpi-label">Active Users</span>
              <span className="analytics-kpi-value">8,420</span>
              <div className="analytics-kpi-trend green">
                <span className="analytics-trend-arrow">↑ 18.6%</span>
                <span className="analytics-trend-period">vs last month</span>
              </div>
            </div>
          </div>
          <div className="analytics-kpi-sparkline cyan">
            <span style={{ height: '40%' }} />
            <span style={{ height: '52%' }} />
            <span style={{ height: '65%' }} />
            <span style={{ height: '70%' }} />
            <span style={{ height: '88%' }} />
            <span style={{ height: '100%' }} />
          </div>
        </div>

        {/* Card 3: Total Transactions */}
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-left">
            <div className="analytics-kpi-icon-box purple">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m16 3 4 4-4 4" />
                <path d="M20 7H4" />
                <path d="m8 21-4-4 4-4" />
                <path d="M4 17h16" />
              </svg>
            </div>
            <div className="analytics-kpi-details">
              <span className="analytics-kpi-label">Total Transactions</span>
              <span className="analytics-kpi-value">12,084</span>
              <div className="analytics-kpi-trend green">
                <span className="analytics-trend-arrow">↑ 22.1%</span>
                <span className="analytics-trend-period">vs last month</span>
              </div>
            </div>
          </div>
          <div className="analytics-kpi-sparkline purple">
            <span style={{ height: '30%' }} />
            <span style={{ height: '45%' }} />
            <span style={{ height: '58%' }} />
            <span style={{ height: '72%' }} />
            <span style={{ height: '85%' }} />
            <span style={{ height: '100%' }} />
          </div>
        </div>

        {/* Card 4: Total Revenue */}
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-left">
            <div className="analytics-kpi-icon-box green">
              <span className="analytics-rupee-icon">₹</span>
            </div>
            <div className="analytics-kpi-details">
              <span className="analytics-kpi-label">Total Revenue</span>
              <span className="analytics-kpi-value">₹12,48,320</span>
              <div className="analytics-kpi-trend green">
                <span className="analytics-trend-arrow">↑ 24.3%</span>
                <span className="analytics-trend-period">vs last month</span>
              </div>
            </div>
          </div>
          <div className="analytics-kpi-sparkline green">
            <span style={{ height: '35%' }} />
            <span style={{ height: '50%' }} />
            <span style={{ height: '60%' }} />
            <span style={{ height: '78%' }} />
            <span style={{ height: '88%' }} />
            <span style={{ height: '100%' }} />
          </div>
        </div>

        {/* Card 5: Page Views */}
        <div className="analytics-kpi-card">
          <div className="analytics-kpi-left">
            <div className="analytics-kpi-icon-box amber">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div className="analytics-kpi-details">
              <span className="analytics-kpi-label">Page Views</span>
              <span className="analytics-kpi-value">3.24M</span>
              <div className="analytics-kpi-trend green">
                <span className="analytics-trend-arrow">↑ 15.8%</span>
                <span className="analytics-trend-period">vs last month</span>
              </div>
            </div>
          </div>
          <div className="analytics-kpi-sparkline amber">
            <span style={{ height: '42%' }} />
            <span style={{ height: '56%' }} />
            <span style={{ height: '68%' }} />
            <span style={{ height: '75%' }} />
            <span style={{ height: '90%' }} />
            <span style={{ height: '100%' }} />
          </div>
        </div>
      </div>

      {/* ====================================================================
          Tab Navigation & Global Date / Export Controls
          ==================================================================== */}
      <div className="analytics-tabs-row">
        <div className="analytics-tabs-nav">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`analytics-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="analytics-tabs-actions">
          <button type="button" className="analytics-plus-btn" title="Add view or report">
            +
          </button>
          <div className="analytics-date-range-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{dateRange}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          <button type="button" className="analytics-export-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* ====================================================================
          Row 2: User Growth, Platform Activity, Revenue Trend
          ==================================================================== */}
      <div className="analytics-grid-3">
        {/* Card 1: User Growth */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <div className="analytics-card-title-group">
              <span className="analytics-card-title">User Growth</span>
              <span className="analytics-info-circle" title="Cumulative user growth">ⓘ</span>
            </div>
            <div className="analytics-select-wrapper">
              <select
                value={userGrowthPeriod}
                onChange={(e) => setUserGrowthPeriod(e.target.value)}
                className="analytics-header-select"
              >
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 90 Days">Last 90 Days</option>
              </select>
            </div>
          </div>

          <div className="analytics-growth-stat-bar">
            <span className="analytics-growth-total">25,842</span>
            <span className="analytics-growth-label">Total Users</span>
            <span className="analytics-growth-pill">↑ 12.4%</span>
          </div>

          <div className="analytics-chart-container">
            {/* SVG Area Chart */}
            <svg className="analytics-svg-chart" viewBox="0 0 460 170" preserveAspectRatio="none">
              <defs>
                <linearGradient id="userGrowthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="36" y1="18" x2="450" y2="18" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="36" y1="46" x2="450" y2="46" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="36" y1="74" x2="450" y2="74" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="36" y1="102" x2="450" y2="102" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="36" y1="130" x2="450" y2="130" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="36" y1="150" x2="450" y2="150" stroke="#e2e8f0" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="30" y="22" textAnchor="end" className="analytics-axis-text">10K</text>
              <text x="30" y="50" textAnchor="end" className="analytics-axis-text">8K</text>
              <text x="30" y="78" textAnchor="end" className="analytics-axis-text">6K</text>
              <text x="30" y="106" textAnchor="end" className="analytics-axis-text">4K</text>
              <text x="30" y="134" textAnchor="end" className="analytics-axis-text">2K</text>
              <text x="30" y="153" textAnchor="end" className="analytics-axis-text">0</text>

              {/* Area fill */}
              <path
                d="M 40 144 Q 85 136 120 120 T 200 102 T 280 84 T 360 62 T 435 32 L 435 150 L 40 150 Z"
                fill="url(#userGrowthGrad)"
              />

              {/* Line stroke */}
              <path
                d="M 40 144 Q 85 136 120 120 T 200 102 T 280 84 T 360 62 T 435 32"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Data points */}
              <circle cx="40" cy="144" r="3" fill="#10b981" />
              <circle cx="120" cy="120" r="3" fill="#10b981" />
              <circle cx="200" cy="102" r="3" fill="#10b981" />
              <circle cx="280" cy="84" r="3" fill="#10b981" />
              <circle cx="360" cy="62" r="3" fill="#10b981" />
              <circle cx="435" cy="32" r="4" fill="#026544" stroke="#ffffff" strokeWidth="1.5" />

              {/* Peak pill badge */}
              <g transform="translate(405, 14)">
                <text x="18" y="11" fill="#10b981" fontSize="10" fontWeight="600" textAnchor="middle">↑ 12.4%</text>
              </g>
            </svg>

            {/* X-Axis dates */}
            <div className="analytics-axis-x">
              <span>1 Sep</span>
              <span>4 Sep</span>
              <span>7 Sep</span>
              <span>10 Sep</span>
              <span>13 Sep</span>
              <span>16 Sep</span>
            </div>
          </div>
        </div>

        {/* Card 2: Platform Activity */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <span className="analytics-card-title">Platform Activity</span>
            <div className="analytics-select-wrapper">
              <select
                value={activityPeriod}
                onChange={(e) => setActivityPeriod(e.target.value)}
                className="analytics-header-select"
              >
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 90 Days">Last 90 Days</option>
              </select>
            </div>
          </div>

          {/* Activity Legend */}
          <div className="analytics-legend-row">
            <span className="analytics-legend-item">
              <span className="analytics-legend-dot" style={{ background: '#026544' }} />
              Buy Requirements
            </span>
            <span className="analytics-legend-item">
              <span className="analytics-legend-dot" style={{ background: '#0284c7' }} />
              Sell Requirements
            </span>
            <span className="analytics-legend-item">
              <span className="analytics-legend-dot" style={{ background: '#f59e0b' }} />
              Contact Unlocks
            </span>
            <span className="analytics-legend-item">
              <span className="analytics-legend-dot" style={{ background: '#8b5cf6' }} />
              Subscriptions
            </span>
          </div>

          <div className="analytics-chart-container">
            <svg className="analytics-svg-chart" viewBox="0 0 460 170" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="36" y1="18" x2="450" y2="18" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="36" y1="46" x2="450" y2="46" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="36" y1="74" x2="450" y2="74" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="36" y1="102" x2="450" y2="102" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="36" y1="130" x2="450" y2="130" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="36" y1="150" x2="450" y2="150" stroke="#e2e8f0" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="30" y="22" textAnchor="end" className="analytics-axis-text">500</text>
              <text x="30" y="50" textAnchor="end" className="analytics-axis-text">400</text>
              <text x="30" y="78" textAnchor="end" className="analytics-axis-text">300</text>
              <text x="30" y="106" textAnchor="end" className="analytics-axis-text">200</text>
              <text x="30" y="134" textAnchor="end" className="analytics-axis-text">100</text>
              <text x="30" y="153" textAnchor="end" className="analytics-axis-text">0</text>

              {/* Line 1: Buy Requirements (Dark Green #026544) */}
              <path
                d="M 40 85 Q 90 98 135 90 T 210 70 T 285 58 T 370 42 T 445 28"
                fill="none"
                stroke="#026544"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <circle cx="135" cy="90" r="2.8" fill="#026544" />
              <circle cx="210" cy="70" r="2.8" fill="#026544" />
              <circle cx="285" cy="58" r="2.8" fill="#026544" />
              <circle cx="445" cy="28" r="3" fill="#026544" />

              {/* Line 2: Sell Requirements (Teal Blue #0284c7) */}
              <path
                d="M 40 142 Q 95 130 145 125 T 225 110 T 300 70 T 375 92 T 445 105"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <circle cx="145" cy="125" r="2.8" fill="#0284c7" />
              <circle cx="300" cy="70" r="2.8" fill="#0284c7" />
              <circle cx="445" cy="105" r="3" fill="#0284c7" />

              {/* Line 3: Contact Unlocks (Gold/Amber #f59e0b) */}
              <path
                d="M 40 120 Q 95 102 140 108 T 220 85 T 300 95 T 375 75 T 445 68"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <circle cx="140" cy="108" r="2.8" fill="#f59e0b" />
              <circle cx="300" cy="95" r="2.8" fill="#f59e0b" />
              <circle cx="445" cy="68" r="3" fill="#f59e0b" />

              {/* Line 4: Subscriptions (Purple #8b5cf6) */}
              <path
                d="M 40 140 Q 95 136 145 130 T 225 124 T 300 108 T 375 88 T 445 58"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <circle cx="225" cy="124" r="2.8" fill="#8b5cf6" />
              <circle cx="375" cy="88" r="2.8" fill="#8b5cf6" />
              <circle cx="445" cy="58" r="3" fill="#8b5cf6" />
            </svg>

            <div className="analytics-axis-x">
              <span>1 Sep</span>
              <span>4 Sep</span>
              <span>7 Sep</span>
              <span>10 Sep</span>
              <span>13 Sep</span>
              <span>16 Sep</span>
            </div>
          </div>
        </div>

        {/* Card 3: Revenue Trend */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <div className="analytics-card-title-group">
              <span className="analytics-card-title">Revenue Trend</span>
              <span className="analytics-info-circle" title="Total revenue trajectory">ⓘ</span>
            </div>
            <div className="analytics-select-wrapper">
              <select
                value={revenuePeriod}
                onChange={(e) => setRevenuePeriod(e.target.value)}
                className="analytics-header-select"
              >
                <option value="Last 6 Months">Last 6 Months</option>
                <option value="Last 3 Months">Last 3 Months</option>
                <option value="Last 1 Year">Last 1 Year</option>
              </select>
            </div>
          </div>

          <div className="analytics-growth-stat-bar">
            <span className="analytics-growth-total">₹12,48,320</span>
            <span className="analytics-trend-green-text">↑ 18.4%</span>
          </div>

          <div className="analytics-chart-container">
            <svg className="analytics-svg-chart" viewBox="0 0 320 170" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="42" y1="18" x2="310" y2="18" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="42" y1="50" x2="310" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="42" y1="82" x2="310" y2="82" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="42" y1="114" x2="310" y2="114" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="42" y1="146" x2="310" y2="146" stroke="#e2e8f0" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="36" y="22" textAnchor="end" className="analytics-axis-text">₹2L</text>
              <text x="36" y="54" textAnchor="end" className="analytics-axis-text">₹1.5L</text>
              <text x="36" y="86" textAnchor="end" className="analytics-axis-text">₹1L</text>
              <text x="36" y="118" textAnchor="end" className="analytics-axis-text">₹50K</text>
              <text x="36" y="149" textAnchor="end" className="analytics-axis-text">₹0</text>

              {/* Bars: Apr, May, Jun, Jul, Aug, Sep */}
              {/* Apr: height ~35 */}
              <rect x="56" y="115" width="20" height="31" rx="3" fill="#10b981" />
              {/* May: height ~52 */}
              <rect x="99" y="98" width="20" height="48" rx="3" fill="#10b981" />
              {/* Jun: height ~75 */}
              <rect x="142" y="75" width="20" height="71" rx="3" fill="#10b981" />
              {/* Jul: height ~96 */}
              <rect x="185" y="54" width="20" height="92" rx="3" fill="#10b981" />
              {/* Aug: height ~114 */}
              <rect x="228" y="36" width="20" height="110" rx="3" fill="#10b981" />
              {/* Sep: height ~130 */}
              <rect x="271" y="20" width="20" height="126" rx="3" fill="#10b981" />
            </svg>

            <div className="analytics-axis-x" style={{ paddingLeft: '45px', paddingRight: '15px' }}>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          Row 3: User Distribution, Top Commodities, Traffic Sources
          ==================================================================== */}
      <div className="analytics-grid-3">
        {/* Card 1: User Distribution */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <span className="analytics-card-title">User Distribution</span>
          </div>

          <div className="analytics-donut-layout">
            <div className="analytics-donut-wrapper">
              <svg width="150" height="150" viewBox="0 0 160 160">
                {/* Background Ring */}
                <circle cx="80" cy="80" r="54" fill="none" stroke="#f1f5f9" strokeWidth="22" />
                
                {/* Segment 1: Traders (48.3%) #026544 */}
                {/* Circumference = 2 * PI * 54 = 339.29 */}
                {/* 48.3% = 163.88 */}
                <circle
                  cx="80"
                  cy="80"
                  r="54"
                  fill="none"
                  stroke="#026544"
                  strokeWidth="22"
                  strokeDasharray="163.88 339.29"
                  strokeDashoffset="0"
                  transform="rotate(-90 80 80)"
                />

                {/* Segment 2: Subscribers (26.9%) #0284c7 */}
                {/* 26.9% = 91.27 */}
                <circle
                  cx="80"
                  cy="80"
                  r="54"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="22"
                  strokeDasharray="91.27 339.29"
                  strokeDashoffset="-163.88"
                  transform="rotate(-90 80 80)"
                />

                {/* Segment 3: Advertisers (12.1%) #f59e0b */}
                {/* 12.1% = 41.05 */}
                <circle
                  cx="80"
                  cy="80"
                  r="54"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="22"
                  strokeDasharray="41.05 339.29"
                  strokeDashoffset="-255.15"
                  transform="rotate(-90 80 80)"
                />

                {/* Segment 4: Others (12.8%) #8b5cf6 */}
                {/* 12.8% = 43.43 */}
                <circle
                  cx="80"
                  cy="80"
                  r="54"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="22"
                  strokeDasharray="43.43 339.29"
                  strokeDashoffset="-296.2"
                  transform="rotate(-90 80 80)"
                />
              </svg>
              <div className="analytics-donut-center-text">
                <span className="analytics-donut-number">25,842</span>
                <span className="analytics-donut-sub">Total Users</span>
              </div>
            </div>

            <div className="analytics-donut-legend">
              <div className="analytics-legend-row-item">
                <span className="analytics-legend-dot" style={{ background: '#026544' }} />
                <div className="analytics-legend-item-text">
                  <span className="analytics-legend-title">Traders</span>
                  <span className="analytics-legend-val">12,480 (48.3%)</span>
                </div>
              </div>

              <div className="analytics-legend-row-item">
                <span className="analytics-legend-dot" style={{ background: '#0284c7' }} />
                <div className="analytics-legend-item-text">
                  <span className="analytics-legend-title">Subscribers</span>
                  <span className="analytics-legend-val">6,942 (26.9%)</span>
                </div>
              </div>

              <div className="analytics-legend-row-item">
                <span className="analytics-legend-dot" style={{ background: '#f59e0b' }} />
                <div className="analytics-legend-item-text">
                  <span className="analytics-legend-title">Advertisers</span>
                  <span className="analytics-legend-val">3,120 (12.1%)</span>
                </div>
              </div>

              <div className="analytics-legend-row-item">
                <span className="analytics-legend-dot" style={{ background: '#8b5cf6' }} />
                <div className="analytics-legend-item-text">
                  <span className="analytics-legend-title">Others</span>
                  <span className="analytics-legend-val">3,300 (12.8%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Top Commodities (Views) */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <span className="analytics-card-title">Top Commodities (Views)</span>
            <div className="analytics-select-wrapper">
              <select
                value={commoditiesPeriod}
                onChange={(e) => setCommoditiesPeriod(e.target.value)}
                className="analytics-header-select"
              >
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 90 Days">Last 90 Days</option>
              </select>
            </div>
          </div>

          <div className="analytics-commodities-list">
            {topCommodities.map((item) => (
              <div key={item.rank} className="analytics-comm-row">
                <span className="analytics-comm-rank">{item.rank}</span>
                <img src={item.img} alt={item.name} className="analytics-comm-thumb" />
                <span className="analytics-comm-name">{item.name}</span>
                <div className="analytics-comm-bar-track">
                  <div
                    className="analytics-comm-bar-fill"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <span className="analytics-comm-count">{item.views}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Traffic Sources */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <span className="analytics-card-title">Traffic Sources</span>
          </div>

          <div className="analytics-donut-layout">
            <div className="analytics-donut-wrapper">
              <svg width="150" height="150" viewBox="0 0 160 160">
                {/* Background Ring */}
                <circle cx="80" cy="80" r="54" fill="none" stroke="#f1f5f9" strokeWidth="22" />
                
                {/* Segment 1: Direct (38.4%) #026544 */}
                {/* 38.4% = 130.28 */}
                <circle
                  cx="80"
                  cy="80"
                  r="54"
                  fill="none"
                  stroke="#026544"
                  strokeWidth="22"
                  strokeDasharray="130.28 339.29"
                  strokeDashoffset="0"
                  transform="rotate(-90 80 80)"
                />

                {/* Segment 2: Organic Search (26.1%) #0284c7 */}
                {/* 26.1% = 88.55 */}
                <circle
                  cx="80"
                  cy="80"
                  r="54"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="22"
                  strokeDasharray="88.55 339.29"
                  strokeDashoffset="-130.28"
                  transform="rotate(-90 80 80)"
                />

                {/* Segment 3: Social Media (16.8%) #ec4899 */}
                {/* 16.8% = 57.0 */}
                <circle
                  cx="80"
                  cy="80"
                  r="54"
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="22"
                  strokeDasharray="57.0 339.29"
                  strokeDashoffset="-218.83"
                  transform="rotate(-90 80 80)"
                />

                {/* Segment 4: Referral (10.2%) #8b5cf6 */}
                {/* 10.2% = 34.6 */}
                <circle
                  cx="80"
                  cy="80"
                  r="54"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="22"
                  strokeDasharray="34.6 339.29"
                  strokeDashoffset="-275.83"
                  transform="rotate(-90 80 80)"
                />

                {/* Segment 5: Paid Ads (8.5%) #f43f5e */}
                {/* 8.5% = 28.84 */}
                <circle
                  cx="80"
                  cy="80"
                  r="54"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="22"
                  strokeDasharray="28.84 339.29"
                  strokeDashoffset="-310.43"
                  transform="rotate(-90 80 80)"
                />
              </svg>
              <div className="analytics-donut-center-text">
                <span className="analytics-donut-number">3.24M</span>
                <span className="analytics-donut-sub">Total Visits</span>
              </div>
            </div>

            <div className="analytics-donut-legend">
              <div className="analytics-legend-row-item">
                <span className="analytics-legend-dot" style={{ background: '#026544' }} />
                <div className="analytics-legend-item-text">
                  <span className="analytics-legend-title">Direct</span>
                  <span className="analytics-legend-val">38.4%</span>
                </div>
              </div>

              <div className="analytics-legend-row-item">
                <span className="analytics-legend-dot" style={{ background: '#0284c7' }} />
                <div className="analytics-legend-item-text">
                  <span className="analytics-legend-title">Organic Search</span>
                  <span className="analytics-legend-val">26.1%</span>
                </div>
              </div>

              <div className="analytics-legend-row-item">
                <span className="analytics-legend-dot" style={{ background: '#ec4899' }} />
                <div className="analytics-legend-item-text">
                  <span className="analytics-legend-title">Social Media</span>
                  <span className="analytics-legend-val">16.8%</span>
                </div>
              </div>

              <div className="analytics-legend-row-item">
                <span className="analytics-legend-dot" style={{ background: '#8b5cf6' }} />
                <div className="analytics-legend-item-text">
                  <span className="analytics-legend-title">Referral</span>
                  <span className="analytics-legend-val">10.2%</span>
                </div>
              </div>

              <div className="analytics-legend-row-item">
                <span className="analytics-legend-dot" style={{ background: '#f43f5e' }} />
                <div className="analytics-legend-item-text">
                  <span className="analytics-legend-title">Paid Ads</span>
                  <span className="analytics-legend-val">8.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          Row 4: Top Pages, Top Locations, Key Insights
          ==================================================================== */}
      <div className="analytics-grid-3">
        {/* Card 1: Top Pages */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <span className="analytics-card-title">Top Pages</span>
          </div>

          <div className="analytics-table-container">
            <table className="analytics-pages-table">
              <thead>
                <tr>
                  <th style={{ width: '28px' }}>#</th>
                  <th>Page</th>
                  <th>Views</th>
                  <th>Unique Views</th>
                  <th>Avg. Time</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((row) => (
                  <tr key={row.rank}>
                    <td className="analytics-td-rank">{row.rank}</td>
                    <td className="analytics-td-page">{row.page}</td>
                    <td className="analytics-td-views">{row.views}</td>
                    <td className="analytics-td-views">{row.uniqueViews}</td>
                    <td className="analytics-td-time">{row.avgTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Card 2: Top Locations */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <span className="analytics-card-title">Top Locations</span>
          </div>

          <div className="analytics-locations-split">
            {/* India Map Graphic */}
            <div className="analytics-map-container">
              <svg
                className="analytics-india-map"
                viewBox="0 0 200 240"
                fill="none"
              >
                {/* Abstract Stylized State Polygons of India in shades of green */}
                {/* Jammu & Kashmir / Ladakh */}
                <path
                  d="M 85 10 L 105 12 L 120 25 L 115 45 L 95 50 L 78 40 L 75 25 Z"
                  fill="#86efac"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                {/* Himachal / Punjab / Haryana */}
                <path
                  d="M 75 42 L 95 50 L 98 68 L 80 72 L 68 60 Z"
                  fill="#4ade80"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                {/* Rajasthan */}
                <path
                  d="M 45 65 L 75 68 L 78 98 L 65 115 L 38 105 L 35 85 Z"
                  fill="#22c55e"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                {/* Uttar Pradesh */}
                <path
                  d="M 78 72 L 115 65 L 135 85 L 125 108 L 85 102 L 78 98 Z"
                  fill="#059669"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                {/* Bihar */}
                <path
                  d="M 125 85 L 155 85 L 158 108 L 130 110 Z"
                  fill="#10b981"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                {/* West Bengal / North East */}
                <path
                  d="M 152 90 L 175 80 L 195 90 L 185 110 L 165 115 L 152 105 Z"
                  fill="#6ee7b7"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                {/* Gujarat */}
                <path
                  d="M 28 105 L 55 108 L 60 130 L 40 140 L 22 130 L 20 115 Z"
                  fill="#34d399"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                {/* Madhya Pradesh */}
                <path
                  d="M 62 105 L 125 108 L 120 140 L 75 142 L 58 130 Z"
                  fill="#16a34a"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                {/* Maharashtra */}
                <path
                  d="M 45 142 L 85 140 L 105 165 L 75 185 L 48 175 Z"
                  fill="#047857"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                {/* Odisha / Chhattisgarh / Jharkhand */}
                <path
                  d="M 115 115 L 150 115 L 140 155 L 108 145 Z"
                  fill="#4ade80"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                {/* Andhra / Telangana */}
                <path
                  d="M 85 168 L 125 155 L 115 195 L 85 195 Z"
                  fill="#22c55e"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                {/* Karnataka / Goa */}
                <path
                  d="M 52 178 L 78 185 L 75 220 L 58 215 Z"
                  fill="#10b981"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                {/* Tamil Nadu / Kerala */}
                <path
                  d="M 68 218 L 88 200 L 92 235 L 75 240 Z"
                  fill="#059669"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
              </svg>
            </div>

            {/* Ranked Locations List */}
            <div className="analytics-locations-list">
              {topLocations.map((loc) => (
                <div key={loc.rank} className="analytics-loc-row">
                  <span className="analytics-loc-rank">{loc.rank}</span>
                  <span className="analytics-loc-name">{loc.state}</span>
                  <span className="analytics-loc-pct">{loc.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Key Insights */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <span className="analytics-card-title">Key Insights</span>
          </div>

          <div className="analytics-insights-list">
            {/* Insight 1: User Growth */}
            <div className="analytics-insight-item">
              <div className="analytics-insight-icon green">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <div className="analytics-insight-text">
                <span className="analytics-insight-title">User Growth</span>
                <span className="analytics-insight-desc">User registrations increased by 12.4% this month.</span>
              </div>
            </div>

            {/* Insight 2: High Engagement */}
            <div className="analytics-insight-item">
              <div className="analytics-insight-icon cyan">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <div className="analytics-insight-text">
                <span className="analytics-insight-title">High Engagement</span>
                <span className="analytics-insight-desc">Mandi Rates page views up by 28.6%.</span>
              </div>
            </div>

            {/* Insight 3: Revenue Growth */}
            <div className="analytics-insight-item">
              <div className="analytics-insight-icon amber">
                <span className="analytics-rupee-symbol">₹</span>
              </div>
              <div className="analytics-insight-text">
                <span className="analytics-insight-title">Revenue Growth</span>
                <span className="analytics-insight-desc">Total revenue increased by 24.3% this month.</span>
              </div>
            </div>

            {/* Insight 4: Top Audience */}
            <div className="analytics-insight-item">
              <div className="analytics-insight-icon purple">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="analytics-insight-text">
                <span className="analytics-insight-title">Top Audience</span>
                <span className="analytics-insight-desc">Most users are from Uttar Pradesh (18.2%).</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
