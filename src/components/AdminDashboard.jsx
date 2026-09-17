import React, { useState } from 'react';
import sidebarLogoImg from '../assets/sidebar_logo.png';
import adminAvatarImg from '../assets/admin_avatar.png';
import welcomeBgImg from '../assets/welcome_banner_sketch.png';
import commWheat from '../assets/comm_wheat.png';
import commMaize from '../assets/comm_maize.png';
import commMakhana from '../assets/comm_makhana.png';
import commMustard from '../assets/comm_mustard.png';
import commChana from '../assets/comm_chana.png';
import newsThumb1 from '../assets/news_thumb_1.png';
import newsThumb2 from '../assets/news_thumb_2.png';
import newsThumb3 from '../assets/news_thumb_3.png';
import newsThumb4 from '../assets/news_thumb_4.png';
import newsThumb5 from '../assets/news_thumb_5.png';
import {
  DashboardIcon,
  UsersIcon,
  TradersIcon,
  MarketIcon,
  NewsIcon,
  TradeIcon,
  PaymentsIcon,
  AdsIcon,
  ReportsIcon,
  SettingsIcon,
  BellIcon,
  SearchIcon,
  CalendarIcon,
  ChevronDownIcon,
  CheckIcon,
} from './Icons';
import MarketOverview from './MarketOverview';
import MandiRates from './MandiRates';
import TradeRequirements from './TradeRequirements';
import TraderDirectory from './TraderDirectory';
import ContactUnlocks from './ContactUnlocks';
import './AdminDashboard.css';

export default function AdminDashboard({
  onNavigateToDesignSystem,
  onNavigateToLogin,
  initialNav = 'Contact Unlocks',
}) {
  const [activeNav, setActiveNav] = useState(initialNav);

  React.useEffect(() => {
    if (initialNav) {
      setActiveNav(initialNav);
    }
  }, [initialNav]);

  const [searchQuery, setSearchQuery] = useState('');
  const [requirementsFilter, setRequirementsFilter] = useState('Last 30 Days');
  const [userGrowthFilter, setUserGrowthFilter] = useState('Last 6 Months');
  const [revenueFilter, setRevenueFilter] = useState('Last 30 Days');
  const [searchedCommFilter, setSearchedCommFilter] = useState('Last 30 Days');

  // Sidebar navigation data
  const navSections = [
    {
      items: [{ name: 'Dashboard', icon: 'dashboard', active: true }],
    },
    {
      title: 'MARKET INTELLIGENCE',
      items: [
        { name: 'Market Overview', icon: 'market' },
        { name: 'Commodity Prices', icon: 'prices' },
        { name: 'Mandi Rates', icon: 'mandi' },
        { name: 'Exchange Data', icon: 'exchange' },
        { name: 'Price Alerts', icon: 'alerts' },
      ],
    },
    {
      title: 'TRADE MARKETPLACE',
      items: [
        { name: 'Buy Requirements', icon: 'buy' },
        { name: 'Sell Requirements', icon: 'sell' },
        { name: 'Trader Directory', icon: 'directory' },
        { name: 'Contact Unlocks', icon: 'unlocks' },
        { name: 'Trade Categories', icon: 'categories' },
      ],
    },
    {
      title: 'CONTENT MANAGEMENT',
      items: [
        { name: 'News & Articles', icon: 'news' },
        { name: 'Government Updates', icon: 'gov' },
        { name: 'Global Trade', icon: 'global' },
        { name: 'Videos', icon: 'videos' },
        { name: 'Digital Newspaper', icon: 'newspaper' },
      ],
    },
    {
      title: 'USERS & ACCESS',
      items: [
        { name: 'Users', icon: 'users' },
        { name: 'Traders', icon: 'traders' },
        { name: 'Subscribers', icon: 'subscribers' },
        { name: 'Advertisers', icon: 'advertisers' },
        { name: 'Roles & Permissions', icon: 'roles' },
      ],
    },
    {
      title: 'MONETISATION',
      items: [
        { name: 'Subscription Plans', icon: 'plans' },
        { name: 'Payments', icon: 'payments' },
        { name: 'Advertisements', icon: 'ads' },
        { name: 'Advertising Slots', icon: 'slots' },
      ],
    },
    {
      title: 'ANALYTICS',
      items: [
        { name: 'Platform Analytics', icon: 'analytics1' },
        { name: 'Market Analytics', icon: 'analytics2' },
        { name: 'Revenue Analytics', icon: 'analytics3' },
      ],
    },
    {
      title: 'COMMUNICATION',
      items: [
        { name: 'Notifications', icon: 'bell' },
        { name: 'WhatsApp / SMS', icon: 'whatsapp' },
        { name: 'Alert Campaigns', icon: 'campaigns' },
      ],
    },
    {
      title: 'WEBSITE',
      items: [
        { name: 'Homepage', icon: 'home' },
        { name: 'Menus', icon: 'menus' },
        { name: 'Banners', icon: 'banners' },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { name: 'Settings', icon: 'settings' },
        { name: 'API / Data Sources', icon: 'api' },
        { name: 'Audit Logs', icon: 'logs' },
      ],
    },
  ];

  return (
    <div className="dash-viewport">
      {/* ====================================================================
          1. Left Royal Emerald Sidebar
          ==================================================================== */}
      <aside className="dash-sidebar">
        {/* Logo block */}
        <div className="dash-sidebar-header">
          <img src={sidebarLogoImg} alt="Vyapari Darbaar" className="dash-sidebar-logo" />
        </div>

        {/* Scrollable navigation menu */}
        <nav className="dash-sidebar-nav">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="dash-nav-section">
              {section.title && (
                <div className="dash-nav-section-title">{section.title}</div>
              )}
              {section.items.map((item, iIdx) => {
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={iIdx}
                    type="button"
                    className={`dash-nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveNav(item.name)}
                  >
                    <span className="dash-nav-icon">
                      {item.icon === 'dashboard' && <DashboardIcon size={14} />}
                      {item.icon === 'market' && <MarketIcon size={14} />}
                      {item.icon === 'prices' && <span>₹</span>}
                      {item.icon === 'mandi' && <span>🏛</span>}
                      {item.icon === 'exchange' && <span>⇄</span>}
                      {item.icon === 'alerts' && <span>🔔</span>}
                      {item.icon === 'buy' && <span>📥</span>}
                      {item.icon === 'sell' && <span>📤</span>}
                      {item.icon === 'directory' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="16" rx="2" />
                          <circle cx="9" cy="10" r="2" />
                          <line x1="15" y1="8" x2="17" y2="8" />
                          <line x1="15" y1="12" x2="17" y2="12" />
                          <path d="M7 16a2 2 0 0 1 4 0" />
                        </svg>
                      )}
                      {item.icon === 'unlocks' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                        </svg>
                      )}
                      {item.icon === 'categories' && <span>🏷</span>}
                      {item.icon === 'news' && <NewsIcon size={14} />}
                      {item.icon === 'gov' && <span>🏛</span>}
                      {item.icon === 'global' && <span>🌐</span>}
                      {item.icon === 'videos' && <span>▶</span>}
                      {item.icon === 'newspaper' && <span>📰</span>}
                      {item.icon === 'users' && <UsersIcon size={14} />}
                      {item.icon === 'traders' && <TradersIcon size={14} />}
                      {item.icon === 'subscribers' && <span>👑</span>}
                      {item.icon === 'advertisers' && <span>📢</span>}
                      {item.icon === 'roles' && <span>🛡</span>}
                      {item.icon === 'plans' && <span>📋</span>}
                      {item.icon === 'payments' && <PaymentsIcon size={14} />}
                      {item.icon === 'ads' && <AdsIcon size={14} />}
                      {item.icon === 'slots' && <span>🎯</span>}
                      {item.icon.startsWith('analytics') && <ReportsIcon size={14} />}
                      {item.icon === 'bell' && <BellIcon size={14} />}
                      {item.icon === 'whatsapp' && <span>💬</span>}
                      {item.icon === 'campaigns' && <span>⚡</span>}
                      {item.icon === 'home' && <span>🏠</span>}
                      {item.icon === 'menus' && <span>☰</span>}
                      {item.icon === 'banners' && <span>🖼</span>}
                      {item.icon === 'settings' && <SettingsIcon size={14} />}
                      {item.icon === 'api' && <span>🔌</span>}
                      {item.icon === 'logs' && <span>📜</span>}
                    </span>
                    <span className="dash-nav-text">{item.name}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar bottom branding */}
        <div className="dash-sidebar-footer">
          <span className="dash-sb-crown">👑</span>
          <span className="dash-sb-brand">VYAPARI DARBAAR</span>
        </div>
      </aside>

      {/* ====================================================================
          2. Main Dashboard Content Column
          ==================================================================== */}
      <div className="dash-main-area">
        {/* Top Header Bar */}
        <header className="dash-top-header">
          {/* Search bar */}
          <div className="dash-search-container">
            <SearchIcon size={14} color="#9ca3af" className="dash-search-icon" />
            <input
              type="text"
              className="dash-search-input"
              placeholder={
                activeNav === 'Contact Unlocks'
                  ? 'Search traders, commodity, location, transaction ID...'
                  : activeNav === 'Trader Directory'
                  ? 'Search traders, company name, email, mobile, location...'
                  : activeNav === 'Buy Requirements'
                  ? 'Search trade requirements, trader, commodity...'
                  : activeNav === 'Mandi Rates'
                    ? 'Search commodity, mandi, state...'
                    : activeNav === 'Market Overview'
                      ? 'Search commodity, mandi, trader, news...'
                      : 'Search here... (Commodity, Trader, News, etc.)'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="dash-search-kbd">Ctrl + K</span>
          </div>

          {/* Right actions */}
          <div className="dash-header-actions">
            {/* Date & Time */}
            <div className="dash-datetime-pill">
              <CalendarIcon size={14} color="#6b7280" />
              <span className="dash-datetime-text">Wed, 17 Sep 2026<br /><small>10:24 AM</small></span>
            </div>

            {/* Notification bell */}
            <button type="button" className="dash-notif-btn" title="12 unread notifications">
              <BellIcon size={16} color="#374151" />
              <span className="dash-notif-badge">12</span>
            </button>

            {/* View Website */}
            <a href="#website" className="dash-view-web-btn" target="_blank" rel="noreferrer">
              <span>⧉</span>
              <span>View Website</span>
            </a>

            {/* Admin Profile */}
            <div className="dash-admin-profile">
              <img src={adminAvatarImg} alt="Admin" className="dash-avatar-img" />
              <div className="dash-admin-meta">
                <span className="dash-admin-name">Admin</span>
                <span className="dash-admin-role">Super Administrator</span>
              </div>
              <ChevronDownIcon size={12} color="#6b7280" />
            </div>
          </div>
        </header>

        {/* Welcome Banner */}
        <div className="dash-welcome-banner">
          <div className="dash-welcome-left">
            <h1 className="dash-welcome-title">
              {activeNav === 'Contact Unlocks'
                ? 'Contact Unlocks'
                : activeNav === 'Trader Directory'
                ? 'Trader Management'
                : activeNav === 'Buy Requirements'
                ? 'Trade Requirements'
                : activeNav === 'Mandi Rates'
                  ? 'Mandi Rates'
                  : activeNav === 'Market Overview'
                    ? 'Market Intelligence'
                    : 'Welcome Back, Admin 👋'}
            </h1>
            <p className="dash-welcome-subtitle">
              {activeNav === 'Contact Unlocks'
                ? 'Track and manage contact information access. Monitor usage, revenue and connect genuine traders.'
                : activeNav === 'Trader Directory'
                ? 'Manage traders, verify profiles, monitor activity, and grow a trusted trading community.'
                : activeNav === 'Buy Requirements'
                ? 'Manage buy and sell requirements. Connect traders. Grow Indian trade.'
                : activeNav === 'Mandi Rates'
                  ? 'Get latest mandi rates from across India. Compare prices, track trends and make better business decisions.'
                  : activeNav === 'Market Overview'
                    ? 'Live commodity markets, mandi rates, exchange data and market insights.'
                    : "Here's what's happening with Vyapari Darbaar today."}
            </p>
          </div>

          <div className="dash-welcome-center">
            <span className="dash-welcome-quote">
              {activeNav === 'Contact Unlocks'
                ? '“Connections Create Stronger Markets.”'
                : activeNav === 'Trader Directory'
                ? '“Trusted Traders. Stronger Markets.”'
                : activeNav === 'Buy Requirements'
                ? '“Real Traders. Real Opportunities.”'
                : activeNav === 'Mandi Rates'
                  ? '“From Every Mandi To A Stronger Bharat”'
                  : activeNav === 'Market Overview'
                    ? '“Real Markets. Real Opportunities.”'
                    : '“Indian Commodities. Global Opportunities.”'}
            </span>
          </div>

          <div className="dash-welcome-right">
            <img src={welcomeBgImg} alt="" className="dash-welcome-sketch" />
          </div>
        </div>

        {/* ==================================================================
            Dashboard Content Container (Contact Unlocks vs Trader Directory vs Trade Requirements vs Mandi vs Overview vs Dashboard)
            ================================================================== */}
        <div className="dash-content-container">
          {activeNav === 'Contact Unlocks' ? (
            <ContactUnlocks />
          ) : activeNav === 'Trader Directory' ? (
            <TraderDirectory />
          ) : activeNav === 'Buy Requirements' ? (
            <TradeRequirements />
          ) : activeNav === 'Mandi Rates' ? (
            <MandiRates />
          ) : activeNav === 'Market Overview' ? (
            <MarketOverview />
          ) : (
            <>
              {/* Top Section: Main 3 rows + Right action column */}
              <div className="dash-top-split-layout">
                <div className="dash-top-left-area">
                  {/* Row 1: 4 Large KPI Cards */}
                  <div className="dash-kpi-row-4">
                    {/* Card 1: Total Users */}
                    <div className="dash-stat-card">
                      <div className="dash-stat-top">
                        <div className="dash-stat-icon-box green">
                          <UsersIcon size={18} color="#026544" />
                        </div>
                        <div className="dash-stat-data">
                          <span className="dash-stat-label">Total Users</span>
                          <span className="dash-stat-value">24,580</span>
                          <span className="dash-stat-trend green">↑ 12.4% <small>vs last month</small></span>
                        </div>
                        <div className="dash-stat-sparkline green">
                          <span style={{ height: '30%' }} />
                          <span style={{ height: '45%' }} />
                          <span style={{ height: '40%' }} />
                          <span style={{ height: '65%' }} />
                          <span style={{ height: '80%' }} />
                          <span style={{ height: '100%' }} />
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Active Traders */}
                    <div className="dash-stat-card">
                      <div className="dash-stat-top">
                        <div className="dash-stat-icon-box amber">
                          <TradersIcon size={18} color="#d4a017" />
                        </div>
                        <div className="dash-stat-data">
                          <span className="dash-stat-label">Active Traders</span>
                          <span className="dash-stat-value">8,642</span>
                          <span className="dash-stat-trend green">↑ 8.2% <small>vs last month</small></span>
                        </div>
                        <div className="dash-stat-sparkline amber">
                          <span style={{ height: '25%' }} />
                          <span style={{ height: '35%' }} />
                          <span style={{ height: '55%' }} />
                          <span style={{ height: '50%' }} />
                          <span style={{ height: '75%' }} />
                          <span style={{ height: '90%' }} />
                        </div>
                      </div>
                    </div>

                    {/* Card 3: Today's Listings */}
                    <div className="dash-stat-card">
                      <div className="dash-stat-top">
                        <div className="dash-stat-icon-box blue">
                          <span style={{ fontSize: '16px' }}>📄</span>
                        </div>
                        <div className="dash-stat-data">
                          <span className="dash-stat-label">Today's Listings</span>
                          <span className="dash-stat-value">1,284</span>
                          <span className="dash-stat-subdetail">Buy: 746 | Sell: 538</span>
                          <span className="dash-stat-trend green">↑ 15.6% <small>vs yesterday</small></span>
                        </div>
                      </div>
                    </div>

                    {/* Card 4: Today's Revenue */}
                    <div className="dash-stat-card">
                      <div className="dash-stat-top">
                        <div className="dash-stat-icon-box darkgreen">
                          <span style={{ fontSize: '16px' }}>💰</span>
                        </div>
                        <div className="dash-stat-data">
                          <span className="dash-stat-label">Today's Revenue</span>
                          <span className="dash-stat-value">₹1,84,620</span>
                          <span className="dash-stat-trend green">↑ 18.2% <small>vs yesterday</small></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: 4 Smaller Stat Cards */}
                  <div className="dash-mini-stat-row">
                    <div className="dash-mini-stat">
                      <div className="dash-mini-icon gold">👑</div>
                      <div className="dash-mini-text">
                        <span className="dash-mini-title">New Subscriptions</span>
                        <div className="dash-mini-num-row">
                          <strong className="dash-mini-val">125</strong>
                          <span className="dash-stat-trend green">↑ 22.5%</span>
                        </div>
                      </div>
                    </div>

                    <div className="dash-mini-stat">
                      <div className="dash-mini-icon beige">📞</div>
                      <div className="dash-mini-text">
                        <span className="dash-mini-title">Contact Unlocks</span>
                        <div className="dash-mini-num-row">
                          <strong className="dash-mini-val">342</strong>
                          <span className="dash-stat-trend green">↑ 16.8%</span>
                        </div>
                      </div>
                    </div>

                    <div className="dash-mini-stat">
                      <div className="dash-mini-icon pink">📢</div>
                      <div className="dash-mini-text">
                        <span className="dash-mini-title">Active Advertisements</span>
                        <div className="dash-mini-num-row">
                          <strong className="dash-mini-val">86</strong>
                          <span className="dash-stat-trend green">↑ 6.1%</span>
                        </div>
                      </div>
                    </div>

                    <div className="dash-mini-stat">
                      <div className="dash-mini-icon red">⏰</div>
                      <div className="dash-mini-text">
                        <span className="dash-mini-title">Pending Approvals</span>
                        <div className="dash-mini-num-row">
                          <strong className="dash-mini-val">28</strong>
                          <span className="dash-stat-trend red">↓ 12.5%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Analytics Row (Commodity Price Overview, Buy vs Sell, User Growth) */}
                  <div className="dash-analytics-row">
                    {/* Commodity Price Overview */}
                    <div className="dash-card dash-comm-prices-card">
                      <div className="dash-card-header">
                        <h3 className="dash-card-title">Commodity Price Overview</h3>
                        <a href="#viewall" className="dash-card-link">View All →</a>
                      </div>
                      <div className="dash-table-wrap">
                        <table className="dash-mini-table">
                          <thead>
                            <tr>
                              <th>Commodity</th>
                              <th>Latest Price (₹/Qt)</th>
                              <th>Change</th>
                              <th>Trend (7 Days)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div className="dash-comm-cell">
                                  <img src={commWheat} alt="Wheat" className="dash-comm-thumb" />
                                  <span>Wheat</span>
                                </div>
                              </td>
                              <td className="dash-num-cell">2,450</td>
                              <td className="dash-change-cell pos">+2.4%</td>
                              <td>
                                <svg width="46" height="16" viewBox="0 0 46 16" fill="none">
                                  <path d="M1 12L10 9L20 13L30 6L45 2" stroke="#198754" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="dash-comm-cell">
                                  <img src={commMaize} alt="Maize" className="dash-comm-thumb" />
                                  <span>Maize</span>
                                </div>
                              </td>
                              <td className="dash-num-cell">2,180</td>
                              <td className="dash-change-cell neg">-0.8%</td>
                              <td>
                                <svg width="46" height="16" viewBox="0 0 46 16" fill="none">
                                  <path d="M1 4L12 8L22 5L32 11L45 13" stroke="#dc3545" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="dash-comm-cell">
                                  <img src={commMakhana} alt="Makhana" className="dash-comm-thumb" />
                                  <span>Makhana</span>
                                </div>
                              </td>
                              <td className="dash-num-cell">8,500</td>
                              <td className="dash-change-cell pos">+4.2%</td>
                              <td>
                                <svg width="46" height="16" viewBox="0 0 46 16" fill="none">
                                  <path d="M1 14L12 11L22 8L32 10L45 3" stroke="#198754" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="dash-comm-cell">
                                  <img src={commMustard} alt="Mustard" className="dash-comm-thumb" />
                                  <span>Mustard</span>
                                </div>
                              </td>
                              <td className="dash-num-cell">6,240</td>
                              <td className="dash-change-cell pos">+1.1%</td>
                              <td>
                                <svg width="46" height="16" viewBox="0 0 46 16" fill="none">
                                  <path d="M1 11L12 7L24 10L34 5L45 4" stroke="#198754" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="dash-comm-cell">
                                  <img src={commChana} alt="Chana" className="dash-comm-thumb" />
                                  <span>Chana</span>
                                </div>
                              </td>
                              <td className="dash-num-cell">5,320</td>
                              <td className="dash-change-cell neg">-0.6%</td>
                              <td>
                                <svg width="46" height="16" viewBox="0 0 46 16" fill="none">
                                  <path d="M1 5L12 9L22 7L34 12L45 14" stroke="#dc3545" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Buy vs Sell Requirements */}
                    <div className="dash-card dash-donut-card">
                      <div className="dash-card-header">
                        <h3 className="dash-card-title">Buy vs Sell Requirements</h3>
                        <div className="dash-dropdown-trigger">
                          <span>{requirementsFilter}</span>
                          <ChevronDownIcon size={12} />
                        </div>
                      </div>

                      <div className="dash-donut-content">
                        <div className="dash-donut-graphic">
                          <svg width="120" height="120" viewBox="0 0 120 120">
                            <circle
                              cx="60"
                              cy="60"
                              r="45"
                              fill="transparent"
                              stroke="#026544"
                              strokeWidth="16"
                              strokeDasharray="155 283"
                              strokeDashoffset="0"
                              transform="rotate(-90 60 60)"
                            />
                            <circle
                              cx="60"
                              cy="60"
                              r="45"
                              fill="transparent"
                              stroke="#e5a820"
                              strokeWidth="16"
                              strokeDasharray="128 283"
                              strokeDashoffset="-155"
                              transform="rotate(-90 60 60)"
                            />
                          </svg>
                          <div className="dash-donut-center">
                            <strong className="dash-donut-big-val">3,842</strong>
                            <span className="dash-donut-sub-label">Total Requirements</span>
                          </div>
                        </div>

                        <div className="dash-donut-legend">
                          <div className="dash-legend-item">
                            <span className="dash-legend-dot" style={{ backgroundColor: '#026544' }} />
                            <div className="dash-legend-text">
                              <span className="dash-legend-name">Buy Requirements</span>
                              <strong className="dash-legend-val">2,104 (54.7%)</strong>
                            </div>
                          </div>
                          <div className="dash-legend-item">
                            <span className="dash-legend-dot" style={{ backgroundColor: '#e5a820' }} />
                            <div className="dash-legend-text">
                              <span className="dash-legend-name">Sell Requirements</span>
                              <strong className="dash-legend-val">1,738 (45.3%)</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* User Growth Line Chart */}
                    <div className="dash-card dash-linechart-card">
                      <div className="dash-card-header">
                        <h3 className="dash-card-title">User Growth</h3>
                        <div className="dash-dropdown-trigger">
                          <span>{userGrowthFilter}</span>
                          <ChevronDownIcon size={12} />
                        </div>
                      </div>

                      <div className="dash-linechart-wrap">
                        <svg className="dash-line-svg" viewBox="0 0 260 110" preserveAspectRatio="none">
                          <line x1="25" y1="20" x2="255" y2="20" stroke="#f0ece4" strokeWidth="1" />
                          <line x1="25" y1="45" x2="255" y2="45" stroke="#f0ece4" strokeWidth="1" />
                          <line x1="25" y1="70" x2="255" y2="70" stroke="#f0ece4" strokeWidth="1" />
                          <line x1="25" y1="95" x2="255" y2="95" stroke="#f0ece4" strokeWidth="1" />

                          <text x="20" y="23" className="chart-axis-text">10K</text>
                          <text x="20" y="48" className="chart-axis-text">6K</text>
                          <text x="20" y="73" className="chart-axis-text">4K</text>
                          <text x="20" y="98" className="chart-axis-text">2K</text>

                          <polygon
                            points="35,80 75,70 115,55 155,42 195,30 245,22 245,95 35,95"
                            fill="rgba(2, 101, 68, 0.08)"
                          />

                          <path
                            d="M35 80 L75 70 L115 55 L155 42 L195 30 L245 22"
                            fill="none"
                            stroke="#026544"
                            strokeWidth="2"
                          />
                          <path
                            d="M35 90 L75 80 L115 72 L155 60 L195 48 L245 40"
                            fill="none"
                            stroke="#e5a820"
                            strokeWidth="2"
                          />

                          {[[35, 80], [75, 70], [115, 55], [155, 42], [195, 30], [245, 22]].map(([cx, cy], i) => (
                            <circle key={i} cx={cx} cy={cy} r="2.5" fill="#026544" stroke="#fff" strokeWidth="1" />
                          ))}
                          {[[35, 90], [75, 80], [115, 72], [155, 60], [195, 48], [245, 40]].map(([cx, cy], i) => (
                            <circle key={i} cx={cx} cy={cy} r="2.5" fill="#e5a820" stroke="#fff" strokeWidth="1" />
                          ))}

                          <text x="35" y="107" className="chart-axis-text" textAnchor="middle">Apr</text>
                          <text x="75" y="107" className="chart-axis-text" textAnchor="middle">May</text>
                          <text x="115" y="107" className="chart-axis-text" textAnchor="middle">Jun</text>
                          <text x="155" y="107" className="chart-axis-text" textAnchor="middle">Jul</text>
                          <text x="195" y="107" className="chart-axis-text" textAnchor="middle">Aug</text>
                          <text x="245" y="107" className="chart-axis-text" textAnchor="middle">Sep</text>
                        </svg>

                        <div className="dash-chart-footer-legend">
                          <span className="dash-inline-legend"><span className="dot green" /> Total Users</span>
                          <span className="dash-inline-legend"><span className="dot gold" /> Active Traders</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Action Column (Platform Health, Quote, Quick Actions) */}
                <div className="dash-top-right-col">
                  {/* Platform Health Widget */}
                  <div className="dash-health-widget">
                    <div className="dash-health-crown">👑</div>
                    <div className="dash-health-title">Platform Health</div>
                    <div className="dash-health-status">
                      <span className="health-pulse-dot" />
                      <span>All Systems Operational</span>
                    </div>
                    <div className="dash-health-feed-row">
                      <span className="feed-dot" />
                      <span className="feed-txt">Live Data Feeds<br /><strong>5 / 5 Active</strong></span>
                      <span className="feed-arrow">›</span>
                    </div>
                  </div>

                  {/* Right Quote Calligraphy / Script */}
                  <div className="dash-side-quote">
                    “Empowering<br />
                    Indian Trade for a<br />
                    Stronger Bharat”
                  </div>

                  {/* Quick Actions Panel */}
                  <div className="dash-card dash-quick-actions-card">
                    <h3 className="dash-card-title">Quick Actions</h3>

                    <div className="dash-actions-buttons">
                      <button type="button" className="dash-action-btn primary">
                        <span className="btn-sym">+</span>
                        <span>Add Market Data</span>
                      </button>
                      <button type="button" className="dash-action-btn outline">
                        <span className="btn-sym">+</span>
                        <span>Publish News</span>
                      </button>
                      <button type="button" className="dash-action-btn outline">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 11 12 14 22 4" />
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                        </svg>
                        <span>Approve Listings</span>
                      </button>
                      <button type="button" className="dash-action-btn outline">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m3 11 18-5v12L3 14v-3z" />
                          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                        </svg>
                        <span>Manage Ads</span>
                      </button>
                      <button type="button" className="dash-action-btn outline">
                        <span className="btn-sym">+</span>
                        <span>Send Notification</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ==================================================================
              Full-width Row 4: Operational Data (Trade Requirements, News, Subscriptions)
              ================================================================== */}
              <div className="dash-operations-row">
                {/* Recent Trade Requirements Table */}
                <div className="dash-card dash-trade-req-card">
                  <div className="dash-card-header">
                    <h3 className="dash-card-title">Recent Trade Requirements</h3>
                    <a href="#viewall" className="dash-card-link">View All →</a>
                  </div>
                  <div className="dash-table-wrap">
                    <table className="dash-mini-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Trader Name</th>
                          <th>Type</th>
                          <th>Commodity</th>
                          <th>Quantity</th>
                          <th>Location</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="id-txt">#TR1024</td>
                          <td className="bold-txt">ABC Traders</td>
                          <td><span className="dash-type-pill buy">BUY</span></td>
                          <td>Makhana</td>
                          <td>500 KG</td>
                          <td>Delhi</td>
                          <td><span className="dash-status-pill active">Active</span></td>
                          <td><a href="#view" className="dash-action-link">View</a></td>
                        </tr>
                        <tr>
                          <td className="id-txt">#TR1025</td>
                          <td className="bold-txt">Kumar Foods</td>
                          <td><span className="dash-type-pill sell">SELL</span></td>
                          <td>Wheat</td>
                          <td>10 MT</td>
                          <td>Bihar</td>
                          <td><span className="dash-status-pill pending">Pending</span></td>
                          <td><a href="#review" className="dash-action-link">Review</a></td>
                        </tr>
                        <tr>
                          <td className="id-txt">#TR1026</td>
                          <td className="bold-txt">Sharma Trading</td>
                          <td><span className="dash-type-pill buy">BUY</span></td>
                          <td>Maize</td>
                          <td>5 MT</td>
                          <td>Punjab</td>
                          <td><span className="dash-status-pill active">Active</span></td>
                          <td><a href="#view" className="dash-action-link">View</a></td>
                        </tr>
                        <tr>
                          <td className="id-txt">#TR1027</td>
                          <td className="bold-txt">Jai Hind Exports</td>
                          <td><span className="dash-type-pill sell">SELL</span></td>
                          <td>Mustard</td>
                          <td>2 MT</td>
                          <td>Rajasthan</td>
                          <td><span className="dash-status-pill under-review">Under Review</span></td>
                          <td><a href="#review" className="dash-action-link">Review</a></td>
                        </tr>
                        <tr>
                          <td className="id-txt">#TR1028</td>
                          <td className="bold-txt">Global Grains</td>
                          <td><span className="dash-type-pill buy">BUY</span></td>
                          <td>Chana</td>
                          <td>25 MT</td>
                          <td>MP</td>
                          <td><span className="dash-status-pill active">Active</span></td>
                          <td><a href="#view" className="dash-action-link">View</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Latest News & Updates */}
                <div className="dash-card dash-news-card">
                  <div className="dash-card-header">
                    <h3 className="dash-card-title">Latest News & Updates</h3>
                    <a href="#viewall" className="dash-card-link">View All →</a>
                  </div>
                  <div className="dash-news-list">
                    <div className="dash-news-item">
                      <img src={newsThumb1} alt="" className="dash-news-thumb" />
                      <div className="dash-news-info">
                        <p className="dash-news-headline">Government increases MSP for wheat by 5% for next season</p>
                        <span className="dash-news-time">2 hours ago</span>
                      </div>
                      <span className="dash-news-tag gov">Government</span>
                    </div>

                    <div className="dash-news-item">
                      <img src={newsThumb2} alt="" className="dash-news-thumb" />
                      <div className="dash-news-info">
                        <p className="dash-news-headline">India's agri exports reach $24B in FY2026</p>
                        <span className="dash-news-time">4 hours ago</span>
                      </div>
                      <span className="dash-news-tag global">Global Trade</span>
                    </div>

                    <div className="dash-news-item">
                      <img src={newsThumb3} alt="" className="dash-news-thumb" />
                      <div className="dash-news-info">
                        <p className="dash-news-headline">Makhana demand rises in international markets</p>
                        <span className="dash-news-time">6 hours ago</span>
                      </div>
                      <span className="dash-news-tag market">Market News</span>
                    </div>

                    <div className="dash-news-item">
                      <img src={newsThumb4} alt="" className="dash-news-thumb" />
                      <div className="dash-news-info">
                        <p className="dash-news-headline">New export guidelines for rice and maize</p>
                        <span className="dash-news-time">1 day ago</span>
                      </div>
                      <span className="dash-news-tag policy">Policy Update</span>
                    </div>

                    <div className="dash-news-item">
                      <img src={newsThumb5} alt="" className="dash-news-thumb" />
                      <div className="dash-news-info">
                        <p className="dash-news-headline">Indian spice exports see 18% growth</p>
                        <span className="dash-news-time">1 day ago</span>
                      </div>
                      <span className="dash-news-tag biz">Business News</span>
                    </div>
                  </div>
                </div>

                {/* Recent Subscriptions */}
                <div className="dash-card dash-subs-card">
                  <div className="dash-card-header">
                    <h3 className="dash-card-title">Recent Subscriptions</h3>
                    <a href="#viewall" className="dash-card-link">View All →</a>
                  </div>
                  <div className="dash-table-wrap">
                    <table className="dash-mini-table">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Plan</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="bold-txt">Rajesh Traders</td>
                          <td><span className="dash-plan-badge pro">Pro</span></td>
                          <td className="date-txt">17 Sep 2026</td>
                        </tr>
                        <tr>
                          <td className="bold-txt">GreenField Foods</td>
                          <td><span className="dash-plan-badge premium">Premium</span></td>
                          <td className="date-txt">17 Sep 2026</td>
                        </tr>
                        <tr>
                          <td className="bold-txt">Sharma Exports</td>
                          <td><span className="dash-plan-badge pro">Pro</span></td>
                          <td className="date-txt">16 Sep 2026</td>
                        </tr>
                        <tr>
                          <td className="bold-txt">Agro Mart</td>
                          <td><span className="dash-plan-badge basic">Basic</span></td>
                          <td className="date-txt">16 Sep 2026</td>
                        </tr>
                        <tr>
                          <td className="bold-txt">Bharat Commodities</td>
                          <td><span className="dash-plan-badge premium">Premium</span></td>
                          <td className="date-txt">16 Sep 2026</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* ==================================================================
              Full-width Row 5: Bottom Analytics (Revenue, Ads, Top Commodities, Activity)
              ================================================================== */}
              <div className="dash-bottom-analytics-row">
                {/* Revenue Overview Multi-bar Chart */}
                <div className="dash-card dash-revenue-card">
                  <div className="dash-card-header">
                    <h3 className="dash-card-title">Revenue Overview</h3>
                    <div className="dash-dropdown-trigger">
                      <span>{revenueFilter}</span>
                      <ChevronDownIcon size={12} />
                    </div>
                  </div>

                  <div className="dash-rev-legend">
                    <span className="dash-inline-legend"><span className="dot blue" /> Subscriptions</span>
                    <span className="dash-inline-legend"><span className="dot cyan" /> Contact Unlocks</span>
                    <span className="dash-inline-legend"><span className="dot orange" /> Advertisements</span>
                    <span className="dash-inline-legend"><span className="dot gray" /> Others</span>
                  </div>

                  <div className="dash-rev-chart">
                    <div className="dash-rev-y-axis">
                      <span>₹60K</span>
                      <span>₹40K</span>
                      <span>₹20K</span>
                      <span>₹0</span>
                    </div>

                    <div className="dash-rev-bars-container">
                      {[
                        { date: '18 Aug', bars: [20, 35, 18, 12] },
                        { date: '25 Aug', bars: [35, 45, 28, 18] },
                        { date: '1 Sep', bars: [50, 60, 35, 22] },
                        { date: '8 Sep', bars: [30, 42, 25, 15] },
                        { date: '15 Sep', bars: [45, 55, 32, 20] },
                      ].map((item, idx) => (
                        <div key={idx} className="dash-rev-bar-group">
                          <div className="dash-grouped-bars">
                            <span className="bar c-blue" style={{ height: `${item.bars[0]}%` }} />
                            <span className="bar c-cyan" style={{ height: `${item.bars[1]}%` }} />
                            <span className="bar c-orange" style={{ height: `${item.bars[2]}%` }} />
                            <span className="bar c-gray" style={{ height: `${item.bars[3]}%` }} />
                          </div>
                          <span className="dash-bar-xlabel">{item.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Advertisements Donut */}
                <div className="dash-card dash-ads-card">
                  <div className="dash-card-header">
                    <h3 className="dash-card-title">Advertisements</h3>
                  </div>

                  <div className="dash-ads-content">
                    <div className="dash-ads-graphic">
                      <svg width="100" height="100" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#026544" strokeWidth="12" strokeDasharray="144 238" strokeDashoffset="0" transform="rotate(-90 50 50)" />
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#20c997" strokeWidth="12" strokeDasharray="50 238" strokeDashoffset="-144" transform="rotate(-90 50 50)" />
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#dc3545" strokeWidth="12" strokeDasharray="22 238" strokeDashoffset="-194" transform="rotate(-90 50 50)" />
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#6c757d" strokeWidth="12" strokeDasharray="22 238" strokeDashoffset="-216" transform="rotate(-90 50 50)" />
                      </svg>
                      <div className="dash-donut-center">
                        <strong className="dash-ads-big-num">86</strong>
                        <span className="dash-ads-sub-lbl">Total Ads</span>
                      </div>
                    </div>

                    <div className="dash-ads-legend">
                      <div className="dash-ads-leg-row">
                        <span className="dot green" />
                        <span className="lbl">Live</span>
                        <strong className="val">52 (60.5%)</strong>
                      </div>
                      <div className="dash-ads-leg-row">
                        <span className="dot teal" />
                        <span className="lbl">Pending</span>
                        <strong className="val">18 (20.9%)</strong>
                      </div>
                      <div className="dash-ads-leg-row">
                        <span className="dot red" />
                        <span className="lbl">Rejected</span>
                        <strong className="val">8 (9.3%)</strong>
                      </div>
                      <div className="dash-ads-leg-row">
                        <span className="dot gray" />
                        <span className="lbl">Expired</span>
                        <strong className="val">8 (9.3%)</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Searched Commodities */}
                <div className="dash-card dash-top-comm-card">
                  <div className="dash-card-header">
                    <h3 className="dash-card-title">Top Searched Commodities</h3>
                    <div className="dash-dropdown-trigger">
                      <span>{searchedCommFilter}</span>
                      <ChevronDownIcon size={12} />
                    </div>
                  </div>

                  <div className="dash-ranked-list">
                    <div className="dash-ranked-item">
                      <span className="rank-num">1</span>
                      <span className="comm-name">Makhana</span>
                      <span className="search-count">12,480</span>
                    </div>
                    <div className="dash-ranked-item">
                      <span className="rank-num">2</span>
                      <span className="comm-name">Wheat</span>
                      <span className="search-count">8,920</span>
                    </div>
                    <div className="dash-ranked-item">
                      <span className="rank-num">3</span>
                      <span className="comm-name">Maize</span>
                      <span className="search-count">6,780</span>
                    </div>
                    <div className="dash-ranked-item">
                      <span className="rank-num">4</span>
                      <span className="comm-name">Mustard</span>
                      <span className="search-count">5,420</span>
                    </div>
                    <div className="dash-ranked-item">
                      <span className="rank-num">5</span>
                      <span className="comm-name">Chana</span>
                      <span className="search-count">4,980</span>
                    </div>
                  </div>
                </div>

                {/* System Activity */}
                <div className="dash-card dash-activity-card">
                  <div className="dash-card-header">
                    <h3 className="dash-card-title">System Activity</h3>
                    <a href="#viewall" className="dash-card-link">View All →</a>
                  </div>

                  <div className="dash-timeline-list">
                    <div className="dash-timeline-item">
                      <span className="timeline-node green" />
                      <div className="timeline-content">
                        <span className="timeline-title">New trader registered</span>
                        <span className="timeline-time">2 minutes ago</span>
                      </div>
                    </div>

                    <div className="dash-timeline-item">
                      <span className="timeline-node blue" />
                      <div className="timeline-content">
                        <span className="timeline-title">Market data updated (Wheat)</span>
                        <span className="timeline-time">12 minutes ago</span>
                      </div>
                    </div>

                    <div className="dash-timeline-item">
                      <span className="timeline-node orange" />
                      <div className="timeline-content">
                        <span className="timeline-title">Advertisement submitted for approval</span>
                        <span className="timeline-time">28 minutes ago</span>
                      </div>
                    </div>

                    <div className="dash-timeline-item">
                      <span className="timeline-node cyan" />
                      <div className="timeline-content">
                        <span className="timeline-title">New subscription (Premium)</span>
                        <span className="timeline-time">1 hour ago</span>
                      </div>
                    </div>

                    <div className="dash-timeline-item">
                      <span className="timeline-node green" />
                      <div className="timeline-content">
                        <span className="timeline-title">News article published</span>
                        <span className="timeline-time">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Global Bottom Bar */}
        <footer className="dash-global-footer">
          <div className="dash-footer-left">
            <span className="dash-footer-crown">👑</span>
            <span className="dash-footer-brand">VYAPARI DARBAAR</span>
            <span className="dash-footer-pipe">|</span>
            <span className="dash-footer-version">Admin Panel | Version 1.0.0</span>
          </div>

          <div className="dash-footer-center">
            <span>Indian Commodities</span>
            <span className="dash-footer-pipe">|</span>
            <span>Global Opportunities</span>
            <span className="dash-footer-pipe">|</span>
            <span>Stronger Traders</span>
            <span className="dash-footer-pipe">|</span>
            <span className="dash-footer-highlight">Brighter Bharat</span>
          </div>

          <div className="dash-footer-right">
            <span>© 2026 Vyapari Darbaar. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
