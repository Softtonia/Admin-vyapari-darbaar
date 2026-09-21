import React, { useState } from 'react';
import mandiBannerThumb from '../assets/mandi_banner_thumb.png';
import {
  ChevronDownIcon,
  CalendarIcon,
  SearchIcon,
} from './Icons';
import './MandiRates.css';

export default function MandiRates({ onNavigateToAdd, onNavigateToImport }) {
  const [selectedCommodity, setSelectedCommodity] = useState('Makhana');
  const [selectedState, setSelectedState] = useState('Bihar');
  const [selectedMandi, setSelectedMandi] = useState('All Mandis');
  const [selectedDate, setSelectedDate] = useState('17 Sep 2026');
  const [trendRange, setTrendRange] = useState('7 Days');
  const [compCommodity, setCompCommodity] = useState('Makhana');
  const [compDuration, setCompDuration] = useState('Last 7 Days');

  // Main Mandi Rates Table Data (Bihar - Makhana)
  const mandiRatesData = [
    { id: 1, name: 'Darbhanga', district: 'Darbhanga', min: '7,800', max: '9,200', modal: '8,500', change: '↑ +4.2%', time: '10:15 AM' },
    { id: 2, name: 'Madhubani', district: 'Madhubani', min: '7,200', max: '8,800', modal: '8,000', change: '↑ +3.1%', time: '10:10 AM' },
    { id: 3, name: 'Saharsa', district: 'Saharsa', min: '7,000', max: '8,200', modal: '7,600', change: '↑ +2.8%', time: '10:05 AM' },
    { id: 4, name: 'Purnia', district: 'Purnia', min: '7,500', max: '8,900', modal: '8,200', change: '↑ +1.9%', time: '10:10 AM' },
    { id: 5, name: 'Katihar', district: 'Katihar', min: '6,800', max: '8,000', modal: '7,400', change: '↑ +2.3%', time: '09:58 AM' },
    { id: 6, name: 'Samastipur', district: 'Samastipur', min: '7,600', max: '9,000', modal: '8,300', change: '↑ +3.6%', time: '10:12 AM' },
    { id: 7, name: 'Muzaffarpur', district: 'Muzaffarpur', min: '7,900', max: '9,400', modal: '8,700', change: '↑ +4.1%', time: '10:18 AM' },
    { id: 8, name: 'Begusarai', district: 'Begusarai', min: '7,300', max: '8,600', modal: '7,950', change: '↑ +2.5%', time: '10:06 AM' },
    { id: 9, name: 'Sitamarhi', district: 'Sitamarhi', min: '7,100', max: '8,300', modal: '7,700', change: '↑ +1.8%', time: '10:00 AM' },
    { id: 10, name: 'Gaya', district: 'Gaya', min: '6,900', max: '8,100', modal: '7,500', change: '↑ +2.1%', time: '10:08 AM' },
  ];

  // Top Mandis (Makhana)
  const topMandisList = [
    { rank: 1, name: 'Muzaffarpur', price: '₹8,700', change: '↑ +4.1%' },
    { rank: 2, name: 'Darbhanga', price: '₹8,500', change: '↑ +4.2%' },
    { rank: 3, name: 'Samastipur', price: '₹8,300', change: '↑ +3.6%' },
    { rank: 4, name: 'Purnia', price: '₹8,200', change: '↑ +1.9%' },
    { rank: 5, name: 'Madhubani', price: '₹8,000', change: '↑ +3.1%' },
  ];

  // Recent Updates Feed
  const recentUpdates = [
    { time: '10:15 AM', mandi: 'Darbhanga', comm: 'Makhana', price: '8,500', change: '↑ +4.2%' },
    { time: '10:12 AM', mandi: 'Samastipur', comm: 'Makhana', price: '8,300', change: '↑ +3.6%' },
    { time: '10:10 AM', mandi: 'Madhubani', comm: 'Makhana', price: '8,000', change: '↑ +3.1%' },
    { time: '10:08 AM', mandi: 'Gaya', comm: 'Makhana', price: '7,500', change: '↑ +2.1%' },
    { time: '10:05 AM', mandi: 'Saharsa', comm: 'Makhana', price: '7,600', change: '↑ +2.8%' },
  ];

  return (
    <div className="mandi-rates-container">
      {/* ====================================================================
          ROW 1: KPI Stats (4 Cards) + Bulk Data Management Card
          ==================================================================== */}
      <div className="mandi-kpi-row">
        {/* Stat 1: Total Mandis Covered */}
        <div className="mandi-stat-card">
          <div className="mandi-icon-box green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
              <path d="M2 7h20" />
            </svg>
          </div>
          <div className="mandi-stat-data">
            <span className="mandi-stat-val">1,248</span>
            <span className="mandi-stat-lbl">Total Mandis Covered</span>
            <span className="mandi-stat-trend">↑ 12 new this month</span>
          </div>
        </div>

        {/* Stat 2: Commodities Tracked */}
        <div className="mandi-stat-card">
          <div className="mandi-icon-box amber">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d49b16" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div className="mandi-stat-data">
            <span className="mandi-stat-val">612</span>
            <span className="mandi-stat-lbl">Commodities Tracked</span>
          </div>
        </div>

        {/* Stat 3: States & 8 UTs */}
        <div className="mandi-stat-card">
          <div className="mandi-icon-box teal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18" />
              <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
              <path d="M9 7h1" /><path d="M9 11h1" /><path d="M9 15h1" />
              <path d="M14 7h1" /><path d="M14 11h1" /><path d="M14 15h1" />
            </svg>
          </div>
          <div className="mandi-stat-data">
            <span className="mandi-stat-val">28</span>
            <span className="mandi-stat-lbl">States & 8 UTs</span>
          </div>
        </div>

        {/* Stat 4: Live Updates */}
        <div className="mandi-stat-card">
          <div className="mandi-icon-box green-light">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#198754" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </div>
          <div className="mandi-stat-data">
            <span className="mandi-stat-title-txt">Live Updates</span>
            <span className="mandi-stat-sub-txt">Last updated 5 mins ago</span>
          </div>
        </div>

        {/* Card 5: Bulk Data Management */}
        <div className="mandi-bulk-card" onClick={onNavigateToImport} style={{ cursor: 'pointer' }} role="button" tabIndex={0}>
          <div className="mandi-icon-box green-tint">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
          </div>
          <div className="mandi-bulk-text">
            <span className="bulk-title">Bulk Data Management</span>
            <span className="bulk-sub">Upload, sync and manage mandi data</span>
          </div>
          <span className="bulk-chevron">›</span>
        </div>
      </div>

      {/* ====================================================================
          ROW 2: Filter Toolbar & Action Buttons Bar
          ==================================================================== */}
      <div className="mandi-toolbar-card">
        {/* Left Filter Controls */}
        <div className="mandi-filter-inputs">
          {/* Select Commodity */}
          <div className="mandi-field-group">
            <label className="mandi-field-lbl">Select Commodity</label>
            <div className="mandi-tag-input">
              <span className="mandi-tag">
                {selectedCommodity}
                <button type="button" className="tag-remove-btn">×</button>
              </span>
              <ChevronDownIcon size={12} color="#6b7280" />
            </div>
          </div>

          {/* Select State */}
          <div className="mandi-field-group">
            <label className="mandi-field-lbl">Select State</label>
            <div className="mandi-select-trigger">
              <span>{selectedState}</span>
              <ChevronDownIcon size={12} color="#6b7280" />
            </div>
          </div>

          {/* Select Mandi */}
          <div className="mandi-field-group">
            <label className="mandi-field-lbl">Select Mandi</label>
            <div className="mandi-select-trigger">
              <span>{selectedMandi}</span>
              <ChevronDownIcon size={12} color="#6b7280" />
            </div>
          </div>

          {/* Date */}
          <div className="mandi-field-group">
            <label className="mandi-field-lbl">Date</label>
            <div className="mandi-date-trigger">
              <CalendarIcon size={13} color="#6b7280" />
              <span>{selectedDate}</span>
            </div>
          </div>

          {/* Filter Action Buttons */}
          <div className="mandi-filter-btns">
            <button type="button" className="btn-apply-filters">
              Apply Filters
            </button>
            <button type="button" className="btn-reset-filters">
              Reset
            </button>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="mandi-actions-right">
          <button type="button" className="btn-tool-outline">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Export</span>
          </button>

          <button type="button" className="btn-tool-outline" onClick={onNavigateToImport}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>Import Data</span>
          </button>

          <button type="button" className="btn-tool-gold" onClick={onNavigateToAdd}>
            <span>+ Add / Update Rates</span>
          </button>
        </div>
      </div>

      {/* ====================================================================
          ROW 3: Mandi Rates Table + Mandi Locations Bihar Map
          ==================================================================== */}
      <div className="mandi-main-split-row">
        {/* Left: Rates Table */}
        <div className="mkt-card mandi-table-card">
          <div className="mkt-card-header">
            <div className="mandi-title-wrap">
              <h3 className="mkt-card-title">Makhana Mandi Rates – Bihar</h3>
              <span className="mandi-last-updated-pill">Last Updated: 17 Sep 2026, 10:20 AM</span>
              <span className="mandi-live-badge">
                <span className="live-dot" />
                Live
              </span>
            </div>
          </div>

          <div className="mandi-table-wrap">
            <table className="mkt-data-table mandi-rates-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Mandi Name</th>
                  <th>District</th>
                  <th>Min Price<br /><small>(₹/Quintal)</small></th>
                  <th>Max Price<br /><small>(₹/Quintal)</small></th>
                  <th>Modal Price<br /><small>(₹/Quintal)</small></th>
                  <th>Change<br /><small>(vs. yesterday)</small></th>
                  <th>Last Updated</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mandiRatesData.map((row) => (
                  <tr key={row.id}>
                    <td className="col-rank">{row.id}</td>
                    <td className="col-name-mandi">{row.name}</td>
                    <td className="col-district">{row.district}</td>
                    <td className="col-num">{row.min}</td>
                    <td className="col-num">{row.max}</td>
                    <td className="col-num bold">{row.modal}</td>
                    <td className="col-change pos">{row.change}</td>
                    <td className="col-time">{row.time}</td>
                    <td className="col-action">
                      <a href={`#view-${row.name}`} className="mkt-action-link">View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Mandi Locations - Bihar Map */}
        <div className="mkt-card mandi-map-card">
          <div className="mkt-card-header">
            <h3 className="mkt-card-title">Mandi Locations – Bihar</h3>
            <a href="#all-states" className="mkt-card-link">View All States →</a>
          </div>

          <div className="mandi-map-inner-layout">
            {/* Map Graphic Box */}
            <div className="mandi-bihar-map-box">
              <svg width="100%" height="220" viewBox="0 0 320 220" className="bihar-svg-map">
                {/* Bihar State Outline Silhouette */}
                <path
                  d="M40 85 C60 65, 90 55, 130 50 C170 45, 210 40, 250 55 C280 65, 300 90, 295 120 C290 145, 275 165, 240 180 C200 195, 160 190, 120 185 C80 180, 50 160, 42 135 C35 110, 30 95, 40 85 Z"
                  fill="#eaf6ec"
                  stroke="#a7ddb3"
                  strokeWidth="1.5"
                />

                {/* Mandi Green Pins */}
                <circle cx="75" cy="95" r="4" fill="#026544" />
                <circle cx="95" cy="120" r="4" fill="#026544" />
                <circle cx="110" cy="85" r="4" fill="#026544" />
                <circle cx="130" cy="145" r="4" fill="#026544" />
                <circle cx="145" cy="115" r="4" fill="#026544" />
                <circle cx="155" cy="170" r="4" fill="#026544" />
                <circle cx="190" cy="90" r="4" fill="#026544" />
                <circle cx="205" cy="130" r="4" fill="#026544" />
                <circle cx="215" cy="150" r="4" fill="#026544" />
                <circle cx="240" cy="110" r="4" fill="#026544" />
                <circle cx="260" cy="135" r="4" fill="#026544" />
                <circle cx="270" cy="160" r="4" fill="#026544" />

                {/* Selected Mandi: Darbhanga Pin (Amber) & Highlight Stem */}
                <line x1="170" y1="105" x2="170" y2="80" stroke="#d49b16" strokeWidth="1.5" strokeDasharray="2 2" />
                <circle cx="170" cy="105" r="6" fill="#d49b16" stroke="#ffffff" strokeWidth="2" />
              </svg>

              {/* Floating Tooltip for Darbhanga */}
              <div className="map-tooltip-callout" style={{ left: '53%', top: '26%' }}>
                <span className="tooltip-mandi-name">Darbhanga</span>
                <strong className="tooltip-mandi-price">₹8,500 / Qtl</strong>
              </div>

              {/* Map Bottom Legend */}
              <div className="mandi-map-legend">
                <span className="legend-item"><span className="dot green" /> Mandi Location</span>
                <span className="legend-item"><span className="dot amber" /> Selected Mandi</span>
              </div>
            </div>

            {/* Top Mandis Leaderboard Column */}
            <div className="mandi-top-ranking-col">
              <h4 className="top-ranking-title">Top Mandis (Makhana)</h4>
              <div className="top-ranking-list">
                {topMandisList.map((mandi) => (
                  <div key={mandi.rank} className="top-mandi-item">
                    <span className="rank-badge">{mandi.rank}</span>
                    <span className="mandi-name">{mandi.name}</span>
                    <span className="mandi-price">{mandi.price}</span>
                    <span className="mandi-change">{mandi.change}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          ROW 4: Price Trend (7 Days) + Price Comparison Bars + Recent Updates
          ==================================================================== */}
      <div className="mandi-bottom-analytics-row">
        {/* Card 1: Price Trend – Makhana (Darbhanga) */}
        <div className="mkt-card mandi-trend-card">
          <div className="mkt-card-header">
            <h3 className="mkt-card-title">Price Trend – Makhana (Darbhanga)</h3>
            <div className="trend-range-pills">
              {['7 Days', '1 Month', '3 Months', '1 Year'].map((range) => (
                <button
                  key={range}
                  type="button"
                  className={`range-pill ${trendRange === range ? 'active' : ''}`}
                  onClick={() => setTrendRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="trend-chart-container">
            <svg width="100%" height="150" viewBox="0 0 340 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="mandiTrendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#198754" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#198754" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Gridlines */}
              <line x1="45" y1="20" x2="330" y2="20" stroke="#f1ece3" strokeWidth="1" />
              <text x="40" y="23" textAnchor="end" className="mkt-axis-txt">₹10,000</text>

              <line x1="45" y1="50" x2="330" y2="50" stroke="#f1ece3" strokeWidth="1" />
              <text x="40" y="53" textAnchor="end" className="mkt-axis-txt">₹9,000</text>

              <line x1="45" y1="80" x2="330" y2="80" stroke="#f1ece3" strokeWidth="1" />
              <text x="40" y="83" textAnchor="end" className="mkt-axis-txt">₹8,000</text>

              <line x1="45" y1="110" x2="330" y2="110" stroke="#f1ece3" strokeWidth="1" />
              <text x="40" y="113" textAnchor="end" className="mkt-axis-txt">₹7,000</text>

              <line x1="45" y1="130" x2="330" y2="130" stroke="#f1ece3" strokeWidth="1" />
              <text x="40" y="133" textAnchor="end" className="mkt-axis-txt">₹6,000</text>

              {/* Area */}
              <path
                d="M50 110 L90 98 L135 92 L180 84 L225 80 L270 82 L315 65 L315 130 L50 130 Z"
                fill="url(#mandiTrendGrad)"
              />

              {/* Curve Line */}
              <path
                d="M50 110 L90 98 L135 92 L180 84 L225 80 L270 82 L315 65"
                fill="none"
                stroke="#198754"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Markers on each day */}
              <circle cx="50" cy="110" r="3" fill="#198754" />
              <circle cx="90" cy="98" r="3" fill="#198754" />
              <circle cx="135" cy="92" r="3" fill="#198754" />
              <circle cx="180" cy="84" r="3" fill="#198754" />
              <circle cx="225" cy="80" r="3" fill="#198754" />
              <circle cx="270" cy="82" r="3" fill="#198754" />
              <circle cx="315" cy="65" r="4.5" fill="#198754" stroke="#ffffff" strokeWidth="2" />

              {/* X Axis labels */}
              <text x="50" y="144" textAnchor="middle" className="mkt-axis-txt">11 Sep</text>
              <text x="90" y="144" textAnchor="middle" className="mkt-axis-txt">12 Sep</text>
              <text x="135" y="144" textAnchor="middle" className="mkt-axis-txt">13 Sep</text>
              <text x="180" y="144" textAnchor="middle" className="mkt-axis-txt">14 Sep</text>
              <text x="225" y="144" textAnchor="middle" className="mkt-axis-txt">15 Sep</text>
              <text x="270" y="144" textAnchor="middle" className="mkt-axis-txt">16 Sep</text>
              <text x="315" y="144" textAnchor="middle" className="mkt-axis-txt">17 Sep</text>
            </svg>

            {/* Tooltip on 17 Sep */}
            <div className="trend-tooltip-badge" style={{ right: '8px', top: '15px' }}>
              <span className="tt-date">17 Sep 2026</span>
              <strong className="tt-price">₹8,500</strong>
              <span className="tt-change">↑ +4.2%</span>
            </div>
          </div>
        </div>

        {/* Card 2: Price Comparison */}
        <div className="mkt-card mandi-comparison-card">
          <div className="mkt-card-header">
            <h3 className="mkt-card-title">Price Comparison</h3>
            <div className="dual-dropdowns-row">
              <div className="mandi-mini-dropdown">
                <span>{compCommodity}</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </div>
              <div className="mandi-mini-dropdown">
                <span>{compDuration}</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </div>
            </div>
          </div>

          <div className="mandi-comp-bar-chart">
            <div className="comp-y-axis">
              <span>₹12,000</span>
              <span>₹9,000</span>
              <span>₹6,000</span>
              <span>₹3,000</span>
              <span>₹0</span>
            </div>

            <div className="comp-bars-container">
              {[
                { name: 'Darbhanga', val: '8,500', height: '71%', color: '#198754' },
                { name: 'Madhubani', val: '8,000', height: '66%', color: '#198754' },
                { name: 'Muzaffarpur', val: '8,700', height: '73%', color: '#198754' },
                { name: 'Patna', val: '8,250', height: '69%', color: '#0f766e' },
                { name: 'Delhi (APMC)', val: '9,800', height: '82%', color: '#0d6efd' },
              ].map((bar, idx) => (
                <div key={idx} className="comp-single-bar-col">
                  <span className="bar-top-val">{bar.val}</span>
                  <div className="bar-track">
                    <span className="bar-fill" style={{ height: bar.height, backgroundColor: bar.color }} />
                  </div>
                  <span className="bar-bottom-name">{bar.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Recent Updates */}
        <div className="mkt-card mandi-recent-updates-card">
          <div className="mkt-card-header">
            <h3 className="mkt-card-title">Recent Updates</h3>
            <a href="#viewall" className="mkt-card-link">View All →</a>
          </div>

          <table className="mkt-mini-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Mandi</th>
                <th>Commodity</th>
                <th>Price (₹/Qtl)</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {recentUpdates.map((item, idx) => (
                <tr key={idx}>
                  <td className="col-time-feed">{item.time}</td>
                  <td className="col-mandi-feed">{item.mandi}</td>
                  <td className="col-comm-feed">{item.comm}</td>
                  <td className="price-cell">{item.price}</td>
                  <td className="col-change pos">{item.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ====================================================================
          ROW 5: Authentic Mandi Data Strip (4 Highlights) + Need API Access
          ==================================================================== */}
      <div className="mandi-bottom-feature-row">
        {/* Left: Authentic Mandi Data Strip */}
        <div className="mandi-feature-strip-card">
          <div className="mandi-feature-left-banner">
            <img src={mandiBannerThumb} alt="Authentic Mandi Data" className="feature-banner-img" />
            <div className="feature-banner-text">
              <h4 className="feature-banner-title">Authentic Mandi Data.<br />Better Business Decisions.</h4>
              <p className="feature-banner-sub">Real-time mandi rates. Trusted by traders across India.</p>
            </div>
          </div>

          <div className="mandi-feature-items-grid">
            {/* Feature 1 */}
            <div className="mandi-feature-item">
              <div className="feature-icon amber">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d49b16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div className="feature-details">
                <span className="feat-title">Wide Mandi Coverage</span>
                <span className="feat-val">1,200+ Mandis</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="mandi-feature-item">
              <div className="feature-icon green">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#198754" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="feature-details">
                <span className="feat-title">Daily Updates</span>
                <span className="feat-val">Real-time Data</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="mandi-feature-item">
              <div className="feature-icon teal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <div className="feature-details">
                <span className="feat-title">Verified Sources</span>
                <span className="feat-val">Trusted & Accurate</span>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="mandi-feature-item">
              <div className="feature-icon gold">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <div className="feature-details">
                <span className="feat-title">Historical Data</span>
                <span className="feat-val">Track Price Trends</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Need API Access Card */}
        <div className="mandi-api-access-card">
          <div className="api-code-icon">
            <span>&lt;/&gt;</span>
          </div>
          <div className="api-info-content">
            <h4 className="api-title">Need API Access?</h4>
            <p className="api-desc">Get real-time mandi data for your systems</p>
            <a href="#contact" className="api-link">Contact our team →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
