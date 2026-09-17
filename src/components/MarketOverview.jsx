import React, { useState } from 'react';
import commWheat from '../assets/comm_wheat.png';
import commMaize from '../assets/comm_maize.png';
import commMakhana from '../assets/comm_makhana.png';
import commMustard from '../assets/comm_mustard.png';
import commChana from '../assets/comm_chana.png';
import commSoybean from '../assets/comm_soybean.png';
import commTur from '../assets/comm_tur.png';
import commRice from '../assets/comm_rice.png';
import commSugar from '../assets/comm_sugar.png';
import commCotton from '../assets/comm_cotton.png';
import newsThumb1 from '../assets/news_thumb_1.png';
import newsThumb2 from '../assets/news_thumb_2.png';
import newsThumb3 from '../assets/news_thumb_3.png';
import newsThumb4 from '../assets/news_thumb_4.png';
import newsThumb5 from '../assets/news_thumb_5.png';
import {
  ChevronDownIcon,
} from './Icons';
import './MarketOverview.css';

export default function MarketOverview() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [trendDuration, setTrendDuration] = useState('1 Month');
  const [selectedCommodity, setSelectedCommodity] = useState('Makhana');
  const [selectedMandi, setSelectedMandi] = useState('All Mandis');

  // Top Commodities List Data
  const commoditiesList = [
    { id: 1, name: 'Makhana', img: commMakhana, price: '8,500', change: '+4.2%', pos: true, points: 'M1 10L10 8L20 12L30 5L45 2', color: '#198754' },
    { id: 2, name: 'Wheat', img: commWheat, price: '2,450', change: '+2.4%', pos: true, points: 'M1 12L10 9L20 13L30 6L45 3', color: '#198754' },
    { id: 3, name: 'Maize', img: commMaize, price: '2,180', change: '-0.8%', pos: false, points: 'M1 3L12 6L22 4L32 10L45 13', color: '#dc3545' },
    { id: 4, name: 'Mustard', img: commMustard, price: '6,240', change: '+1.1%', pos: true, points: 'M1 11L11 9L21 11L31 6L45 4', color: '#198754' },
    { id: 5, name: 'Chana', img: commChana, price: '5,320', change: '-0.6%', pos: false, points: 'M1 4L10 7L20 5L30 11L45 12', color: '#dc3545' },
    { id: 6, name: 'Soybean', img: commSoybean, price: '4,890', change: '+3.5%', pos: true, points: 'M1 12L10 8L22 11L32 5L45 2', color: '#198754' },
    { id: 7, name: 'Tur (Arhar)', img: commTur, price: '7,120', change: '+1.8%', pos: true, points: 'M1 11L12 8L22 10L32 6L45 3', color: '#198754' },
    { id: 8, name: 'Rice (Basmati)', img: commRice, price: '6,780', change: '-1.2%', pos: false, points: 'M1 3L11 7L21 5L31 12L45 14', color: '#dc3545' },
    { id: 9, name: 'Sugar', img: commSugar, price: '3,450', change: '+0.9%', pos: true, points: 'M1 10L10 9L20 11L30 7L45 4', color: '#198754' },
    { id: 10, name: 'Cotton', img: commCotton, price: '7,890', change: '+2.6%', pos: true, points: 'M1 13L10 8L20 11L30 5L45 2', color: '#198754' },
  ];

  // Price Comparison Mandis
  const mandiPrices = [
    { mandi: 'Darbhanga (Bihar)', price: '8,500', change: '+4.2%' },
    { mandi: 'Patna (Bihar)', price: '8,200', change: '+3.1%' },
    { mandi: 'Delhi (Azadpur)', price: '8,350', change: '+2.8%' },
    { mandi: 'Kolkata', price: '8,100', change: '+1.5%' },
    { mandi: 'Mumbai (APMC)', price: '8,400', change: '+3.6%' },
    { mandi: 'Indore (MP)', price: '8,250', change: '+2.9%' },
    { mandi: 'Kanpur (UP)', price: '8,180', change: '+2.3%' },
    { mandi: 'Ahmedabad (Gujarat)', price: '8,300', change: '+3.0%' },
  ];

  // Top Gainers
  const topGainers = [
    { name: 'Makhana', img: commMakhana, price: '8,500', change: '+4.2%' },
    { name: 'Soybean', img: commSoybean, price: '4,890', change: '+3.5%' },
    { name: 'Wheat', img: commWheat, price: '2,450', change: '+2.4%' },
    { name: 'Tur (Arhar)', img: commTur, price: '7,120', change: '+1.8%' },
    { name: 'Mustard', img: commMustard, price: '6,240', change: '+1.1%' },
  ];

  // Top Losers
  const topLosers = [
    { name: 'Cotton', img: commCotton, price: '7,890', change: '-2.6%' },
    { name: 'Rice', img: commRice, price: '6,780', change: '-1.2%' },
    { name: 'Maize', img: commMaize, price: '2,180', change: '-0.8%' },
    { name: 'Chana', img: commChana, price: '5,320', change: '-0.6%' },
    { name: 'Sugar', img: commSugar, price: '3,450', change: '-0.4%' },
  ];

  // Exchange Rates Live
  const exchangeRates = [
    { exchange: 'MCX', symbol: 'RMSEED', price: '5,620', change: '+1.8%', pos: true },
    { exchange: 'MCX', symbol: 'SOYBEAN', price: '4,912', change: '+2.1%', pos: true },
    { exchange: 'NCDEX', symbol: 'JEERA', price: '21,450', change: '-0.6%', pos: false },
    { exchange: 'NCDEX', symbol: 'DHANIYA', price: '7,850', change: '+1.4%', pos: true },
    { exchange: 'BSE', symbol: 'WHEAT', price: '2,462', change: '+1.9%', pos: true },
    { exchange: 'NSE', symbol: 'SUGAR', price: '3,468', change: '-0.8%', pos: false },
  ];

  // Latest Market News
  const latestNews = [
    { thumb: newsThumb1, title: 'Government increases MSP for wheat by 5% for next season', time: '2 hours ago' },
    { thumb: newsThumb2, title: "India's agri exports reach $24B in FY2025", time: '4 hours ago' },
    { thumb: newsThumb3, title: 'Makhana demand rises in international markets', time: '6 hours ago' },
    { thumb: newsThumb4, title: 'New export guidelines for rice and maize', time: '1 day ago' },
    { thumb: newsThumb5, title: 'Indian spice exports see 18% growth', time: '1 day ago' },
  ];

  return (
    <div className="market-overview-container">
      {/* ====================================================================
          ROW 1: 4 Stat Cards + WhatsApp Live Alerts Banner
          ==================================================================== */}
      <div className="mkt-top-stats-row">
        {/* Stat 1: Commodities Tracked */}
        <div className="mkt-stat-card">
          <div className="mkt-stat-icon-box green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <div className="mkt-stat-details">
            <span className="mkt-stat-number">612</span>
            <span className="mkt-stat-label">Commodities Tracked</span>
            <span className="mkt-stat-trend green">↑ +12 new this month</span>
          </div>
        </div>

        {/* Stat 2: Mandi Markets */}
        <div className="mkt-stat-card">
          <div className="mkt-stat-icon-box amber">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d49b16" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div className="mkt-stat-details">
            <span className="mkt-stat-number">1,248</span>
            <span className="mkt-stat-label">Mandi Markets</span>
            <span className="mkt-stat-caption">Across India</span>
          </div>
        </div>

        {/* Stat 3: Exchanges */}
        <div className="mkt-stat-card">
          <div className="mkt-stat-icon-box green-light">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
              <path d="M2 7h20" />
            </svg>
          </div>
          <div className="mkt-stat-details">
            <span className="mkt-stat-number">8</span>
            <span className="mkt-stat-label">Exchanges</span>
            <span className="mkt-stat-caption">MCX, NCDEX, BSE, NSE...</span>
          </div>
        </div>

        {/* Stat 4: Data Sync Status */}
        <div className="mkt-stat-card">
          <div className="mkt-stat-icon-box teal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </div>
          <div className="mkt-stat-details">
            <span className="mkt-stat-number">100%</span>
            <span className="mkt-stat-label">Data Sync Status</span>
            <span className="mkt-stat-status-dot">
              <span className="dot green" />
              <span>Last updated 5 mins ago</span>
            </span>
          </div>
        </div>

        {/* Banner 5: WhatsApp Alert Banner */}
        <div className="mkt-whatsapp-banner">
          <div className="whatsapp-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <div className="whatsapp-info">
            <span className="whatsapp-title">Live Market Updates on WhatsApp</span>
            <span className="whatsapp-desc">Get instant price alerts & market news</span>
            <button type="button" className="whatsapp-btn">
              <span>Manage Alerts →</span>
            </button>
          </div>
        </div>
      </div>

      {/* ====================================================================
          ROW 2: Top Commodities Table + Price Trend Chart + Price Comparison
          ==================================================================== */}
      <div className="mkt-main-row-3">
        {/* Left: Top Commodities Table */}
        <div className="mkt-card mkt-top-commodities-card">
          <div className="mkt-card-header">
            <h3 className="mkt-card-title">Top Commodities (Today)</h3>
            <a href="#viewall" className="mkt-card-link">View All →</a>
          </div>

          {/* Filter Pills */}
          <div className="mkt-category-pills">
            {['All', 'Grains', 'Pulses', 'Oilseeds', 'Spices', 'Dry Fruits', 'Others'].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`mkt-cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="mkt-table-wrapper">
            <table className="mkt-data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Commodity</th>
                  <th>Latest Price (₹/Quintal)</th>
                  <th>Change</th>
                  <th>Trend (7 Days)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {commoditiesList.map((item) => (
                  <tr key={item.id}>
                    <td className="col-rank">{item.id}</td>
                    <td className="col-comm">
                      <img src={item.img} alt={item.name} className="comm-circle-thumb" />
                      <span className="comm-name-bold">{item.name}</span>
                    </td>
                    <td className="col-price">{item.price}</td>
                    <td className={`col-change ${item.pos ? 'pos' : 'neg'}`}>
                      {item.change}
                    </td>
                    <td className="col-sparkline">
                      <svg width="46" height="15" viewBox="0 0 46 15" fill="none">
                        <path d={item.points} stroke={item.color} strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </td>
                    <td className="col-action">
                      <a href={`#view-${item.name}`} className="mkt-action-link">View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Center: Price Trend – Makhana */}
        <div className="mkt-card mkt-price-trend-card">
          <div className="mkt-card-header">
            <h3 className="mkt-card-title">Price Trend – Makhana</h3>
            <div className="mkt-dropdown-btn">
              <span>{trendDuration}</span>
              <ChevronDownIcon size={12} color="#4b5563" />
            </div>
          </div>

          {/* Price Header */}
          <div className="mkt-trend-price-row">
            <div className="mkt-trend-big-price">
              <span className="currency-val">₹8,500</span>
              <span className="unit-txt">/ Quintal</span>
            </div>
            <div className="mkt-trend-pct-badge">
              <span>↑ +4.2% (+340)</span>
            </div>
          </div>

          {/* Interactive Trend SVG Area Chart */}
          <div className="mkt-trend-chart-box">
            <svg width="100%" height="160" viewBox="0 0 340 160" preserveAspectRatio="none" className="mkt-trend-svg">
              <defs>
                <linearGradient id="mktTrendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#198754" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#198754" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Gridlines & Y-Axis Labels */}
              <line x1="38" y1="20" x2="330" y2="20" stroke="#f1ece3" strokeWidth="1" />
              <text x="32" y="23" textAnchor="end" className="mkt-axis-txt">9,000</text>

              <line x1="38" y1="48" x2="330" y2="48" stroke="#f1ece3" strokeWidth="1" />
              <text x="32" y="51" textAnchor="end" className="mkt-axis-txt">8,500</text>

              <line x1="38" y1="76" x2="330" y2="76" stroke="#f1ece3" strokeWidth="1" />
              <text x="32" y="79" textAnchor="end" className="mkt-axis-txt">8,000</text>

              <line x1="38" y1="104" x2="330" y2="104" stroke="#f1ece3" strokeWidth="1" />
              <text x="32" y="107" textAnchor="end" className="mkt-axis-txt">7,500</text>

              <line x1="38" y1="132" x2="330" y2="132" stroke="#f1ece3" strokeWidth="1" />
              <text x="32" y="135" textAnchor="end" className="mkt-axis-txt">7,000</text>

              {/* Area fill */}
              <path
                d="M40 98 L50 92 L62 80 L75 83 L88 74 L102 81 L115 67 L128 78 L142 84 L156 73 L170 70 L184 75 L198 62 L212 66 L226 62 L240 68 L255 58 L270 52 L284 46 L300 48 L314 36 L328 28 L328 132 L40 132 Z"
                fill="url(#mktTrendGrad)"
              />

              {/* Green Line Path */}
              <path
                d="M40 98 L50 92 L62 80 L75 83 L88 74 L102 81 L115 67 L128 78 L142 84 L156 73 L170 70 L184 75 L198 62 L212 66 L226 62 L240 68 L255 58 L270 52 L284 46 L300 48 L314 36 L328 28"
                fill="none"
                stroke="#198754"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 8 Sep Highlight Point */}
              <circle cx="240" cy="68" r="4.5" fill="#198754" stroke="#ffffff" strokeWidth="2" />

              {/* X-axis date labels */}
              <text x="50" y="148" textAnchor="middle" className="mkt-axis-txt">18 Aug</text>
              <text x="115" y="148" textAnchor="middle" className="mkt-axis-txt">25 Aug</text>
              <text x="184" y="148" textAnchor="middle" className="mkt-axis-txt">1 Sep</text>
              <text x="240" y="148" textAnchor="middle" className="mkt-axis-txt">8 Sep</text>
              <text x="300" y="148" textAnchor="middle" className="mkt-axis-txt">15 Sep</text>
            </svg>

            {/* Floating Tooltip at 8 Sep */}
            <div className="mkt-chart-tooltip" style={{ left: '66%', top: '32%' }}>
              <span className="tooltip-date">8 Sep 2026</span>
              <strong className="tooltip-price">₹8,210</strong>
            </div>
          </div>

          {/* 3 Metric Stats Bottom Bar */}
          <div className="mkt-trend-summary-row">
            <div className="mkt-summary-item">
              <span className="summary-val">7,820</span>
              <span className="summary-lbl">1 Month Low</span>
            </div>
            <div className="mkt-summary-item">
              <span className="summary-val">8,950</span>
              <span className="summary-lbl">1 Month High</span>
            </div>
            <div className="mkt-summary-item">
              <span className="summary-val">8,200</span>
              <span className="summary-lbl">Prev. Close</span>
            </div>
          </div>
        </div>

        {/* Right: Price Comparison */}
        <div className="mkt-card mkt-comparison-card">
          <div className="mkt-card-header">
            <h3 className="mkt-card-title">Price Comparison</h3>
          </div>

          {/* Dual Dropdowns */}
          <div className="mkt-comparison-controls">
            <div className="mkt-select-box">
              <label className="mkt-select-label">Select Commodity</label>
              <div className="mkt-select-trigger">
                <span>{selectedCommodity}</span>
                <ChevronDownIcon size={12} color="#6b7280" />
              </div>
            </div>

            <div className="mkt-select-box">
              <label className="mkt-select-label">Select Mandis</label>
              <div className="mkt-select-trigger">
                <span>{selectedMandi}</span>
                <ChevronDownIcon size={12} color="#6b7280" />
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mkt-comp-table-wrap">
            <table className="mkt-data-table mini">
              <thead>
                <tr>
                  <th>Mandi</th>
                  <th>Price (₹/Quintal)</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {mandiPrices.map((row, idx) => (
                  <tr key={idx}>
                    <td className="col-mandi">{row.mandi}</td>
                    <td className="col-price">{row.price}</td>
                    <td className="col-change pos">{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ====================================================================
          ROW 3: Top Gainers | Top Losers | Exchange Rates (Live) | Market News
          ==================================================================== */}
      <div className="mkt-quad-row">
        {/* Card 1: Top Gainers */}
        <div className="mkt-card mkt-quad-card">
          <div className="mkt-card-header">
            <div className="mkt-title-with-icon">
              <div className="mkt-icon-badge green">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#198754" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
              <h3 className="mkt-card-title">Top Gainers</h3>
            </div>
            <a href="#viewall" className="mkt-card-link">View All →</a>
          </div>

          <table className="mkt-mini-table">
            <thead>
              <tr>
                <th>Commodity</th>
                <th>Price</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {topGainers.map((item, idx) => (
                <tr key={idx}>
                  <td className="comm-cell">
                    <img src={item.img} alt={item.name} className="comm-circle-thumb" />
                    <span>{item.name}</span>
                  </td>
                  <td className="price-cell">{item.price}</td>
                  <td className="change-cell pos">{item.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card 2: Top Losers */}
        <div className="mkt-card mkt-quad-card">
          <div className="mkt-card-header">
            <div className="mkt-title-with-icon">
              <div className="mkt-icon-badge red">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="7" x2="17" y2="17" />
                  <polyline points="17 7 17 17 7 17" />
                </svg>
              </div>
              <h3 className="mkt-card-title">Top Losers</h3>
            </div>
            <a href="#viewall" className="mkt-card-link">View All →</a>
          </div>

          <table className="mkt-mini-table">
            <thead>
              <tr>
                <th>Commodity</th>
                <th>Price</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {topLosers.map((item, idx) => (
                <tr key={idx}>
                  <td className="comm-cell">
                    <img src={item.img} alt={item.name} className="comm-circle-thumb" />
                    <span>{item.name}</span>
                  </td>
                  <td className="price-cell">{item.price}</td>
                  <td className="change-cell neg">{item.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card 3: Exchange Rates (Live) */}
        <div className="mkt-card mkt-quad-card">
          <div className="mkt-card-header">
            <div className="mkt-title-with-icon">
              <div className="mkt-icon-badge green">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#198754" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h3 className="mkt-card-title">Exchange Rates (Live)</h3>
            </div>
            <a href="#viewall" className="mkt-card-link">View All →</a>
          </div>

          <table className="mkt-mini-table">
            <thead>
              <tr>
                <th>Exchange</th>
                <th>Symbol</th>
                <th>Price</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {exchangeRates.map((ex, idx) => (
                <tr key={idx}>
                  <td className="bold-cell">{ex.exchange}</td>
                  <td className="symbol-cell">{ex.symbol}</td>
                  <td className="price-cell">{ex.price}</td>
                  <td className={`change-cell ${ex.pos ? 'pos' : 'neg'}`}>{ex.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card 4: Market News (Latest) */}
        <div className="mkt-card mkt-quad-card">
          <div className="mkt-card-header">
            <div className="mkt-title-with-icon">
              <div className="mkt-icon-badge blue">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d6efd" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                  <path d="M18 14h-8" />
                  <path d="M15 18h-5" />
                  <path d="M10 6h8v4h-8V6Z" />
                </svg>
              </div>
              <h3 className="mkt-card-title">Market News (Latest)</h3>
            </div>
            <a href="#viewall" className="mkt-card-link">View All →</a>
          </div>

          <div className="mkt-news-mini-list">
            {latestNews.map((news, idx) => (
              <div key={idx} className="mkt-news-item">
                <img src={news.thumb} alt="" className="mkt-news-thumb" />
                <div className="mkt-news-text">
                  <p className="mkt-news-headline">{news.title}</p>
                  <span className="mkt-news-time">{news.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====================================================================
          ROW 4: Market Insights (4 cards) + Premium Market Intelligence Banner
          ==================================================================== */}
      <div className="mkt-bottom-insights-row">
        {/* Left: Market Insights Container */}
        <div className="mkt-card mkt-insights-main-card">
          <h3 className="mkt-card-title">Market Insights</h3>

          <div className="mkt-insights-grid">
            {/* Insight 1: Expert Analysis */}
            <div className="mkt-insight-box">
              <div className="insight-icon-box amber">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d49b16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                </svg>
              </div>
              <div className="insight-body">
                <h4 className="insight-title">Expert Analysis</h4>
                <p className="insight-desc">Get expert market analysis and future trends.</p>
                <a href="#reports" className="insight-action-link">View Reports →</a>
              </div>
            </div>

            {/* Insight 2: Seasonal Trends */}
            <div className="mkt-insight-box">
              <div className="insight-icon-box green">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="insight-body">
                <h4 className="insight-title">Seasonal Trends</h4>
                <p className="insight-desc">Track seasonal price patterns.</p>
                <a href="#trends" className="insight-action-link">View Trends →</a>
              </div>
            </div>

            {/* Insight 3: Demand & Supply */}
            <div className="mkt-insight-box">
              <div className="insight-icon-box teal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <div className="insight-body">
                <h4 className="insight-title">Demand & Supply</h4>
                <p className="insight-desc">Real-time demand supply insights.</p>
                <a href="#insights" className="insight-action-link">View Insights →</a>
              </div>
            </div>

            {/* Insight 4: Market Alerts */}
            <div className="mkt-insight-box">
              <div className="insight-icon-box red">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <div className="insight-body">
                <h4 className="insight-title">Market Alerts</h4>
                <p className="insight-desc">Set custom alerts for price changes.</p>
                <a href="#alerts" className="insight-action-link">Manage Alerts →</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Premium Market Intelligence Banner */}
        <div className="mkt-premium-banner">
          <div className="premium-crown">
            <svg width="24" height="20" viewBox="0 0 24 24" fill="#e5b94c">
              <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
            </svg>
          </div>
          <div className="premium-content">
            <h4 className="premium-title">Premium Market Intelligence</h4>
            <p className="premium-desc">Get advanced analytics, expert reports and AI-based market predictions.</p>
          </div>
          <button type="button" className="premium-upgrade-btn">
            <span>Upgrade to Premium →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
