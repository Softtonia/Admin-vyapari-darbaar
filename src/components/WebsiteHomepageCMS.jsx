import React, { useState } from 'react';
import './WebsiteHomepageCMS.css';
import heroBannerImg from '../assets/homepage_hero_banner.jpg';
import makhanaImg from '../assets/comm_makhana.png';
import wheatImg from '../assets/comm_wheat.png';
import riceImg from '../assets/comm_rice.png';
import maizeImg from '../assets/comm_maize.png';
import mustardImg from '../assets/comm_mustard.png';
import chanaImg from '../assets/comm_chana.png';
import soybeanImg from '../assets/comm_soybean.png';
import adminAvatarImg from '../assets/admin_avatar.png';

export default function WebsiteHomepageCMS() {
  const [activeTab, setActiveTab] = useState('Homepage Sections');
  const [activeDevice, setActiveDevice] = useState('desktop');
  const [searchCommodity, setSearchCommodity] = useState('');

  // 11 Sections
  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'Hero Section',
      subtitle: 'Main banner, headline, CTA',
      active: true,
      thumb: 'hero',
    },
    {
      id: 2,
      title: 'Key Features',
      subtitle: 'Platform highlights',
      active: true,
      thumb: 'features',
    },
    {
      id: 3,
      title: 'Market Prices',
      subtitle: 'Live commodity prices',
      active: true,
      thumb: 'prices',
    },
    {
      id: 4,
      title: 'Buy/Sell Section',
      subtitle: 'Trade requirements CTA',
      active: true,
      thumb: 'buysell',
    },
    {
      id: 5,
      title: 'Categories',
      subtitle: 'Popular commodities',
      active: true,
      thumb: 'categories',
    },
    {
      id: 6,
      title: 'Latest News',
      subtitle: 'News & articles slider',
      active: true,
      thumb: 'news',
    },
    {
      id: 7,
      title: 'Success Stories',
      subtitle: 'Trader testimonials',
      active: true,
      thumb: 'testimonials',
    },
    {
      id: 8,
      title: 'App Download',
      subtitle: 'Mobile app promotion',
      active: true,
      thumb: 'app',
    },
    {
      id: 9,
      title: 'Newsletter',
      subtitle: 'Email subscription',
      active: true,
      thumb: 'newsletter',
    },
    {
      id: 10,
      title: 'Partners',
      subtitle: 'Logos & trust badges',
      active: true,
      thumb: 'partners',
    },
    {
      id: 11,
      title: 'Footer',
      subtitle: 'Links, contact, social',
      active: true,
      thumb: 'footer',
    },
  ]);

  const toggleSection = (id) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === id ? { ...sec, active: !sec.active } : sec))
    );
  };

  const tabs = [
    'Homepage Sections',
    'Pages',
    'Menus & Navigation',
    'Media Library',
    'SEO & Meta',
    'Settings',
  ];

  // Live prices in preview
  const livePrices = [
    { name: 'Makhana', price: '₹1,250', change: '↑ 2.4%', up: true, img: makhanaImg },
    { name: 'Wheat', price: '₹2,350', change: '↑ 1.8%', up: true, img: wheatImg },
    { name: 'Rice', price: '₹3,120', change: '↓ 0.6%', up: false, img: riceImg },
    { name: 'Maize', price: '₹2,180', change: '↑ 1.2%', up: true, img: maizeImg },
    { name: 'Mustard', price: '₹5,420', change: '↑ 3.1%', up: true, img: mustardImg },
  ];

  // Popular commodities in preview
  const popularCommodities = [
    { name: 'Makhana', img: makhanaImg },
    { name: 'Wheat', img: wheatImg },
    { name: 'Rice', img: riceImg },
    { name: 'Maize', img: maizeImg },
    { name: 'Mustard', img: mustardImg },
    { name: 'Chana', img: chanaImg },
    { name: 'Soyabean', img: soybeanImg },
    { name: 'Turmeric', img: makhanaImg, isTurmeric: true },
  ];

  return (
    <div className="cms-viewport">
      {/* ====================================================================
          Row 1: 4 KPI Cards & Right Action Buttons
          ==================================================================== */}
      <div className="cms-top-row">
        <div className="cms-kpi-grid">
          {/* Card 1: Total Pages */}
          <div className="cms-kpi-card">
            <div className="cms-kpi-icon-box purple">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <div className="cms-kpi-details">
              <span className="cms-kpi-label">Total Pages</span>
              <span className="cms-kpi-value">24</span>
              <span className="cms-kpi-trend green">↑ 9.1%</span>
            </div>
          </div>

          {/* Card 2: Active Sections */}
          <div className="cms-kpi-card">
            <div className="cms-kpi-icon-box green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </div>
            <div className="cms-kpi-details">
              <span className="cms-kpi-label">Active Sections</span>
              <span className="cms-kpi-value">12</span>
              <span className="cms-kpi-trend green">↑ 20%</span>
            </div>
          </div>

          {/* Card 3: Last Updated */}
          <div className="cms-kpi-card">
            <div className="cms-kpi-icon-box cyan">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="cms-kpi-details">
              <span className="cms-kpi-label">Last Updated</span>
              <span className="cms-kpi-value text-base">17 Sep 2026</span>
              <span className="cms-kpi-subtext">10:15 AM</span>
            </div>
          </div>

          {/* Card 4: Website Status */}
          <div className="cms-kpi-card">
            <div className="cms-kpi-icon-box green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <div className="cms-kpi-details">
              <span className="cms-kpi-label">Website Status</span>
              <div className="cms-status-live">
                <span className="cms-live-dot" />
                <span className="cms-live-text">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right CTA buttons */}
        <div className="cms-top-actions">
          <button type="button" className="cms-visit-btn">
            <span>Visit Website</span>
            <span className="cms-btn-arrow">→</span>
          </button>
          <button type="button" className="cms-view-changes-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>View Changes</span>
            <span className="cms-btn-arrow">↗</span>
          </button>
        </div>
      </div>

      {/* ====================================================================
          Tabs Row & Top Actions
          ==================================================================== */}
      <div className="cms-tabs-row">
        <div className="cms-tabs-nav">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`cms-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="cms-tabs-actions">
          <button type="button" className="cms-preview-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>Preview</span>
          </button>
          <button type="button" className="cms-add-section-btn">
            <span>+ Add Section</span>
          </button>
        </div>
      </div>

      {/* ====================================================================
          Main Split Area: Left Sections List vs Right Live Preview
          ==================================================================== */}
      <div className="cms-main-split">
        {/* Left Area: Homepage Sections Manager */}
        <div className="cms-sections-col">
          <div className="cms-sections-header">
            <h2 className="cms-sections-title">Homepage Sections</h2>
            <p className="cms-sections-desc">Drag and drop to reorder sections. Click to edit content.</p>
          </div>

          <div className="cms-sections-list">
            {sections.map((sec) => (
              <div key={sec.id} className="cms-section-item">
                <span className="cms-sec-idx">{sec.id}</span>
                <div className="cms-sec-info">
                  <span className="cms-sec-name">{sec.title}</span>
                  <span className="cms-sec-sub">{sec.subtitle}</span>
                </div>

                {/* Section Visual Thumbnail */}
                <div className="cms-sec-thumb-box">
                  {sec.thumb === 'hero' && (
                    <div className="cms-thumb-hero">
                      <span className="cms-thumb-hero-txt">VYAPARI DARBAAR</span>
                    </div>
                  )}
                  {sec.thumb === 'features' && (
                    <div className="cms-thumb-features">
                      <span /><span /><span /><span />
                    </div>
                  )}
                  {sec.thumb === 'prices' && (
                    <div className="cms-thumb-prices">
                      <div className="cms-tb-row" /><div className="cms-tb-row" /><div className="cms-tb-row" />
                    </div>
                  )}
                  {sec.thumb === 'buysell' && (
                    <div className="cms-thumb-buysell">
                      <div className="cms-thumb-box green" />
                      <div className="cms-thumb-box gold" />
                    </div>
                  )}
                  {sec.thumb === 'categories' && (
                    <div className="cms-thumb-categories">
                      <span /><span /><span /><span /><span />
                    </div>
                  )}
                  {sec.thumb === 'news' && (
                    <div className="cms-thumb-news">
                      <span /><span /><span /><span />
                    </div>
                  )}
                  {sec.thumb === 'testimonials' && (
                    <div className="cms-thumb-testimonials">
                      <div className="cms-thumb-avatar" />
                      <div className="cms-thumb-lines">
                        <span /><span />
                      </div>
                    </div>
                  )}
                  {sec.thumb === 'app' && (
                    <div className="cms-thumb-app">
                      <div className="cms-thumb-phone" />
                      <span className="cms-thumb-app-txt">App</span>
                    </div>
                  )}
                  {sec.thumb === 'newsletter' && (
                    <div className="cms-thumb-newsletter">
                      <span />
                    </div>
                  )}
                  {sec.thumb === 'partners' && (
                    <div className="cms-thumb-partners">
                      <span /><span /><span /><span />
                    </div>
                  )}
                  {sec.thumb === 'footer' && (
                    <div className="cms-thumb-footer">
                      <span /><span /><span />
                    </div>
                  )}
                </div>

                {/* Active Toggle Switch */}
                <div className="cms-sec-toggle-wrap" onClick={() => toggleSection(sec.id)}>
                  <div className={`cms-toggle-switch ${sec.active ? 'active' : ''}`}>
                    <span className="cms-toggle-slider" />
                  </div>
                  <span className="cms-sec-toggle-label">{sec.active ? 'Active' : 'Inactive'}</span>
                </div>

                {/* Edit Button */}
                <button type="button" className="cms-sec-edit-btn">
                  Edit
                </button>

                {/* More options menu */}
                <button type="button" className="cms-sec-more-btn" title="More options">
                  ⋮
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Area: Live Preview Window */}
        <div className="cms-preview-col">
          <div className="cms-preview-topbar">
            <span className="cms-preview-title">Live Preview</span>
            <div className="cms-device-toggles">
              <button
                type="button"
                className={`cms-device-btn ${activeDevice === 'desktop' ? 'active' : ''}`}
                onClick={() => setActiveDevice('desktop')}
                title="Desktop View"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </button>
              <button
                type="button"
                className={`cms-device-btn ${activeDevice === 'tablet' ? 'active' : ''}`}
                onClick={() => setActiveDevice('tablet')}
                title="Tablet View"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
                </svg>
              </button>
              <button
                type="button"
                className={`cms-device-btn ${activeDevice === 'mobile' ? 'active' : ''}`}
                onClick={() => setActiveDevice('mobile')}
                title="Mobile View"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Scaled Preview Frame */}
          <div className={`cms-preview-frame ${activeDevice}`}>
            {/* 1. Miniature Top Navbar */}
            <div className="prev-navbar">
              <div className="prev-nav-topline">
                <span className="prev-nav-tag">India's Leading B2B Platform for Commodities</span>
                <div className="prev-nav-top-right">
                  <span className="prev-lang">🌐 EN ▾</span>
                  <button type="button" className="prev-btn-login">Login</button>
                  <button type="button" className="prev-btn-signup">Sign Up</button>
                </div>
              </div>
              <div className="prev-nav-main">
                <div className="prev-brand">
                  <span className="prev-brand-crown">👑</span>
                  <span className="prev-brand-title">VYAPARI DARBAAR</span>
                </div>
                <div className="prev-menu-links">
                  <span className="prev-link active">Home</span>
                  <span className="prev-link">Market Prices</span>
                  <span className="prev-link">Buy</span>
                  <span className="prev-link">Sell</span>
                  <span className="prev-link">Traders</span>
                  <span className="prev-link">News</span>
                  <span className="prev-link">Government Desk</span>
                  <span className="prev-link">More ▾</span>
                </div>
              </div>
            </div>

            {/* 2. Miniature Hero Section */}
            <div className="prev-hero-section">
              <div className="prev-hero-left">
                <h1 className="prev-hero-h1">
                  Connect.<br />Trade. Grow.
                </h1>
                <p className="prev-hero-sub">
                  A trusted platform for traders, farmers, wholesalers and businesses in the commodity market.
                </p>

                {/* Hero Search Input */}
                <div className="prev-hero-search">
                  <input
                    type="text"
                    placeholder="Search commodities, mandi rates, traders..."
                    value={searchCommodity}
                    onChange={(e) => setSearchCommodity(e.target.value)}
                    className="prev-hero-input"
                  />
                  <button type="button" className="prev-search-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </button>
                </div>

                <div className="prev-hero-popular">
                  <span className="prev-pop-label">Popular:</span>
                  <span className="prev-pop-tag">Makhana</span>
                  <span className="prev-pop-tag">Wheat</span>
                  <span className="prev-pop-tag">Rice</span>
                  <span className="prev-pop-tag">Maize</span>
                  <span className="prev-pop-tag">Mustard</span>
                </div>

                {/* 4 Stat Badges */}
                <div className="prev-hero-stats">
                  <div className="prev-stat-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                    <div className="prev-stat-text">
                      <span className="prev-stat-num">25,000+</span>
                      <span className="prev-stat-lbl">Verified Traders</span>
                    </div>
                  </div>
                  <div className="prev-stat-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m7.5 4.27 9 5.15" />
                      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    </svg>
                    <div className="prev-stat-text">
                      <span className="prev-stat-num">500+</span>
                      <span className="prev-stat-lbl">Commodities</span>
                    </div>
                  </div>
                  <div className="prev-stat-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <line x1="7" y1="8" x2="17" y2="8" />
                    </svg>
                    <div className="prev-stat-text">
                      <span className="prev-stat-num">1,00,000+</span>
                      <span className="prev-stat-lbl">Trade Requirements</span>
                    </div>
                  </div>
                  <div className="prev-stat-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <div className="prev-stat-text">
                      <span className="prev-stat-num">24/7</span>
                      <span className="prev-stat-lbl">Market Updates</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Right Banner Image */}
              <div className="prev-hero-right">
                <img src={heroBannerImg} alt="Indian Commodities Global Opportunities" className="prev-hero-img" />
                <div className="prev-hero-img-overlay">
                  <span className="prev-overlay-title">INDIAN COMMODITIES</span>
                  <span className="prev-overlay-sub">GLOBAL OPPORTUNITIES</span>
                </div>
              </div>
            </div>

            {/* 3. Live Market Prices Section */}
            <div className="prev-section-prices">
              <div className="prev-section-header">
                <span className="prev-sec-heading">Live Market Prices</span>
                <a href="#prices" className="prev-view-all">View All Prices →</a>
              </div>
              <div className="prev-prices-grid">
                {livePrices.map((p, idx) => (
                  <div key={idx} className="prev-price-card">
                    <img src={p.img} alt={p.name} className="prev-comm-icon" />
                    <div className="prev-price-meta">
                      <span className="prev-price-name">{p.name}</span>
                      <span className="prev-price-val">{p.price}</span>
                      <span className={`prev-price-change ${p.up ? 'green' : 'red'}`}>{p.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Dual Action Cards: I Want to Buy / I Want to Sell */}
            <div className="prev-dual-cards">
              <div className="prev-buy-card">
                <div className="prev-dual-content">
                  <h3 className="prev-dual-title">I Want to Buy</h3>
                  <p className="prev-dual-sub">Post your requirement and connect with verified suppliers.</p>
                  <button type="button" className="prev-buy-btn">
                    Post Buy Requirement →
                  </button>
                </div>
                <div className="prev-dual-icon green">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                </div>
              </div>

              <div className="prev-sell-card">
                <div className="prev-dual-content">
                  <h3 className="prev-dual-title gold">I Want to Sell</h3>
                  <p className="prev-dual-sub">List your products and reach thousands of buyers.</p>
                  <button type="button" className="prev-sell-btn">
                    Post Sell Requirement →
                  </button>
                </div>
                <div className="prev-dual-icon gold">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 5. Popular Commodities Carousel */}
            <div className="prev-section-comm">
              <div className="prev-section-header">
                <span className="prev-sec-heading">Popular Commodities</span>
                <div className="prev-comm-nav-wrap">
                  <a href="#comm" className="prev-view-all">View All →</a>
                  <button type="button" className="prev-carousel-arrow">‹</button>
                  <button type="button" className="prev-carousel-arrow">›</button>
                </div>
              </div>
              <div className="prev-commodities-row">
                {popularCommodities.map((item, idx) => (
                  <div key={idx} className="prev-commodity-item">
                    <div className="prev-comm-img-box">
                      <img src={item.img} alt={item.name} className={`prev-comm-circle-img ${item.isTurmeric ? 'turmeric-filter' : ''}`} />
                    </div>
                    <span className="prev-comm-lbl">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
