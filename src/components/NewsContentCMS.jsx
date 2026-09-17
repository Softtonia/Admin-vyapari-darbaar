import React, { useState } from 'react';
import commWheat from '../assets/comm_wheat.png';
import commMaize from '../assets/comm_maize.png';
import commMakhana from '../assets/comm_makhana.png';
import commChana from '../assets/comm_chana.png';
import newsThumb1 from '../assets/news_thumb_1.png';
import newsThumb2 from '../assets/news_thumb_2.png';
import newsThumb3 from '../assets/news_thumb_3.png';
import newsThumb4 from '../assets/news_thumb_4.png';
import newsThumb5 from '../assets/news_thumb_5.png';
import {
  ChevronDownIcon,
  SearchIcon,
  CalendarIcon,
  MoreVerticalIcon,
} from './Icons';
import './NewsContentCMS.css';

export default function NewsContentCMS() {
  const [activeTab, setActiveTab] = useState('All Content');
  const [keywordSearch, setKeywordSearch] = useState('');
  const [contentType, setContentType] = useState('All Types');
  const [category, setCategory] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [authorFilter, setAuthorFilter] = useState('All Authors');
  const [dateRange, setDateRange] = useState('Select date range');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('10 / page');

  // Exact 10 rows from the screenshot
  const contentItems = [
    {
      rowNum: 1,
      id: '#NWS1024',
      thumb: commMakhana,
      isVideo: false,
      title: 'Makhana exports set to reach $248 million in FY2026',
      type: 'News',
      typeClass: 'news',
      category: 'Makhana',
      author: 'Rohit Sharma',
      publishedOn: '17 Sep 2026\n10:15 AM',
      status: 'Published',
      statusClass: 'published',
      views: '2.4K',
    },
    {
      rowNum: 2,
      id: '#GOV210',
      thumb: newsThumb1,
      isVideo: false,
      title: 'Government increases MSP for wheat by 5% for next season',
      type: 'Government',
      typeClass: 'government',
      category: 'Policy',
      author: 'Neha Verma',
      publishedOn: '16 Sep 2026\n05:40 PM',
      status: 'Published',
      statusClass: 'published',
      views: '1.8K',
    },
    {
      rowNum: 3,
      id: '#GLB318',
      thumb: newsThumb2,
      isVideo: false,
      title: "India's agri exports reach $24B in FY2026",
      type: 'Global Trade',
      typeClass: 'global',
      category: 'Exports',
      author: 'Amit Singh',
      publishedOn: '16 Sep 2026\n01:20 PM',
      status: 'Published',
      statusClass: 'published',
      views: '3.6K',
    },
    {
      rowNum: 4,
      id: '#VID112',
      thumb: newsThumb3,
      isVideo: true,
      title: "Mandi Bhav Analysis – This Week's Trends",
      type: 'Video',
      typeClass: 'video',
      category: 'Market Analysis',
      author: 'Pooja Mehta',
      publishedOn: '15 Sep 2026\n11:00 AM',
      status: 'Published',
      statusClass: 'published',
      views: '5.2K',
    },
    {
      rowNum: 5,
      id: '#NWS1023',
      thumb: newsThumb4,
      isVideo: false,
      title: 'Soybean prices likely to remain firm amid strong demand',
      type: 'News',
      typeClass: 'news',
      category: 'Soybean',
      author: 'Rohit Sharma',
      publishedOn: '15 Sep 2026\n09:30 AM',
      status: 'Draft',
      statusClass: 'draft',
      views: '0',
    },
    {
      rowNum: 6,
      id: '#NP048',
      thumb: newsThumb5,
      isVideo: false,
      title: 'Vyapari Darbaar Daily – 15 Sep 2026',
      type: 'Newspaper',
      typeClass: 'newspaper',
      category: 'Daily Edition',
      author: 'Editorial Team',
      publishedOn: '15 Sep 2026\n07:00 AM',
      status: 'Published',
      statusClass: 'published',
      views: '1.1K',
    },
    {
      rowNum: 7,
      id: '#GOV209',
      thumb: newsThumb1,
      isVideo: false,
      title: 'New export guidelines for rice and maize',
      type: 'Government',
      typeClass: 'government',
      category: 'Trade Policy',
      author: 'Neha Verma',
      publishedOn: '14 Sep 2026\n06:10 PM',
      status: 'Published',
      statusClass: 'published',
      views: '2.1K',
    },
    {
      rowNum: 8,
      id: '#GLB317',
      thumb: newsThumb2,
      isVideo: false,
      title: 'Global food prices show mixed trends in September',
      type: 'Global Trade',
      typeClass: 'global',
      category: 'International',
      author: 'Amit Singh',
      publishedOn: '14 Sep 2026\n02:45 PM',
      status: 'Published',
      statusClass: 'published',
      views: '1.9K',
    },
    {
      rowNum: 9,
      id: '#VID111',
      thumb: newsThumb3,
      isVideo: true,
      title: 'Expert Talk: Future of Indian Commodity Trade',
      type: 'Video',
      typeClass: 'video',
      category: 'Expert Insight',
      author: 'Pooja Mehta',
      publishedOn: '13 Sep 2026\n04:20 PM',
      status: 'Published',
      statusClass: 'published',
      views: '4.8K',
    },
    {
      rowNum: 10,
      id: '#NWS1022',
      thumb: commChana,
      isVideo: false,
      title: 'Tur (Arhar) prices rise 8% in key mandis',
      type: 'News',
      typeClass: 'news',
      category: 'Pulses',
      author: 'Rohit Sharma',
      publishedOn: '13 Sep 2026\n11:15 AM',
      status: 'Under Review',
      statusClass: 'under-review',
      views: '0',
    },
  ];

  // Quick Create items
  const quickCreateItems = [
    { title: 'News Article', icon: '📄', bg: '#dcfce7', color: '#15803d' },
    { title: 'Government Update', icon: '🏛', bg: '#f3e8ff', color: '#7e22ce' },
    { title: 'Global Trade Update', icon: '🌐', bg: '#e0f2fe', color: '#0369a1' },
    { title: 'Upload Video', icon: '▶', bg: '#fee2e2', color: '#b91c1c' },
    { title: 'Newspaper Edition', icon: '📰', bg: '#ccfbf1', color: '#0f766e' },
    { title: 'Announcement', icon: '📢', bg: '#fef3c7', color: '#b45309' },
  ];

  // Recent Published Content
  const recentPublished = [
    { thumb: commMakhana, title: 'Makhana exports set to reach $248 million...', date: '17 Sep 2026' },
    { thumb: newsThumb1, title: 'Government increases MSP for wheat...', date: '16 Sep 2026' },
    { thumb: newsThumb2, title: "India's agri exports reach $24B in FY2026", date: '16 Sep 2026' },
    { thumb: newsThumb3, isVideo: true, title: "Mandi Bhav Analysis – This Week's Trends", date: '15 Sep 2026' },
    { thumb: newsThumb5, title: 'Vyapari Darbaar Daily – 15 Sep 2026', date: '15 Sep 2026' },
  ];

  // Top Performing Content
  const topPerforming = [
    { rank: 1, thumb: commMakhana, title: 'Makhana exports set to reach $248 million...', views: '2.4K' },
    { rank: 2, thumb: newsThumb3, isVideo: true, title: 'Expert Talk: Future of Indian Commodity Trade', views: '4.8K' },
    { rank: 3, thumb: newsThumb2, title: "India's agri exports reach $24B in FY2026", views: '3.6K' },
    { rank: 4, thumb: newsThumb1, title: 'Government increases MSP for wheat...', views: '1.8K' },
    { rank: 5, thumb: newsThumb2, title: 'Global food prices show mixed trends...', views: '1.9K' },
  ];

  return (
    <div className="cms-container">
      {/* ====================================================================
          ROW 1: 6 KPI Cards
          ==================================================================== */}
      <div className="cms-kpi-row-6">
        {/* Card 1: Total Content */}
        <div className="cms-kpi-card">
          <div className="cms-kpi-top">
            <div className="cms-icon-box amber">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <div className="cms-kpi-info">
              <span className="cms-kpi-label">Total Content</span>
              <span className="cms-kpi-val">1,842</span>
              <span className="cms-kpi-trend green">↑ 12.4% <small>vs last month</small></span>
            </div>
          </div>
        </div>

        {/* Card 2: News Articles */}
        <div className="cms-kpi-card">
          <div className="cms-kpi-top">
            <div className="cms-icon-box green">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <div className="cms-kpi-info">
              <span className="cms-kpi-label">News Articles</span>
              <span className="cms-kpi-val">984</span>
              <span className="cms-kpi-trend green">↑ 18.2%</span>
            </div>
          </div>
        </div>

        {/* Card 3: Govt. Updates */}
        <div className="cms-kpi-card">
          <div className="cms-kpi-top">
            <div className="cms-icon-box red">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="2" y1="22" x2="22" y2="22" />
                <line x1="4" y1="10" x2="4" y2="18" />
                <line x1="10" y1="10" x2="10" y2="18" />
                <line x1="14" y1="10" x2="14" y2="18" />
                <line x1="20" y1="10" x2="20" y2="18" />
                <polygon points="12 2 2 7 22 7 12 2" />
              </svg>
            </div>
            <div className="cms-kpi-info">
              <span className="cms-kpi-label">Govt. Updates</span>
              <span className="cms-kpi-val">126</span>
              <span className="cms-kpi-trend green">↑ 6.8%</span>
            </div>
          </div>
        </div>

        {/* Card 4: Global Trade */}
        <div className="cms-kpi-card">
          <div className="cms-kpi-top">
            <div className="cms-icon-box orange">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <div className="cms-kpi-info">
              <span className="cms-kpi-label">Global Trade</span>
              <span className="cms-kpi-val">320</span>
              <span className="cms-kpi-trend green">↑ 14.6%</span>
            </div>
          </div>
        </div>

        {/* Card 5: Videos */}
        <div className="cms-kpi-card">
          <div className="cms-kpi-top">
            <div className="cms-icon-box blue">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2.5" />
                <polygon points="10 8 16 12 10 16 10 8" fill="#2563eb" />
              </svg>
            </div>
            <div className="cms-kpi-info">
              <span className="cms-kpi-label">Videos</span>
              <span className="cms-kpi-val">212</span>
              <span className="cms-kpi-trend green">↑ 22.1%</span>
            </div>
          </div>
        </div>

        {/* Card 6: Newspaper Editions */}
        <div className="cms-kpi-card">
          <div className="cms-kpi-top">
            <div className="cms-icon-box teal">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <line x1="6" y1="8" x2="10" y2="8" />
                <line x1="6" y1="12" x2="10" y2="12" />
                <line x1="14" y1="8" x2="18" y2="8" />
                <line x1="14" y1="12" x2="18" y2="12" />
                <line x1="6" y1="16" x2="18" y2="16" />
              </svg>
            </div>
            <div className="cms-kpi-info">
              <span className="cms-kpi-label">Newspaper Editions</span>
              <span className="cms-kpi-val">48</span>
              <span className="cms-kpi-trend green">↑ 9.3%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          MAIN SPLIT: Left Area + Right Sidebar
          ==================================================================== */}
      <div className="cms-main-split">
        {/* Left Column: Content Management */}
        <div className="cms-left-content">
          {/* Top Bar: Tabs + Create Button */}
          <div className="cms-tabs-actions-bar">
            {/* Tabs */}
            <div className="cms-tabs-row">
              {['All Content', 'News', 'Government Updates', 'Global Trade', 'Videos', 'Digital Newspaper'].map((tab) => (
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

            {/* Right Action Button */}
            <div className="cms-actions-group">
              <button type="button" className="btn-create-new">
                <span>+</span>
                <span>Create New</span>
                <ChevronDownIcon size={12} color="#ffffff" />
              </button>
            </div>
          </div>

          {/* Filter Toolbar Card */}
          <div className="cms-filter-toolbar">
            <div className="filter-group search-group">
              <label className="filter-lbl">Keyword Search</label>
              <div className="filter-search-box">
                <SearchIcon size={12} color="#9ca3af" />
                <input
                  type="text"
                  placeholder="Search title, content, tags..."
                  value={keywordSearch}
                  onChange={(e) => setKeywordSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Content Type</label>
              <div className="filter-dropdown">
                <span>{contentType}</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Category</label>
              <div className="filter-dropdown">
                <span>{category}</span>
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

            <div className="filter-group">
              <label className="filter-lbl">Author</label>
              <div className="filter-dropdown">
                <span>{authorFilter}</span>
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
              <button type="button" className="btn-cms-export">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Table Card */}
          <div className="cms-card cms-table-card">
            <div className="cms-card-header">
              <h3 className="cms-card-title">Content List (1,842)</h3>
            </div>

            <div className="cms-table-wrapper">
              <table className="cms-data-table">
                <thead>
                  <tr>
                    <th className="th-check"><input type="checkbox" /></th>
                    <th>#</th>
                    <th>Thumbnail</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Published On</th>
                    <th>Status</th>
                    <th>Views</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {contentItems.map((item) => (
                    <tr key={item.id}>
                      <td className="td-check"><input type="checkbox" /></td>
                      <td className="td-id">
                        {item.rowNum === 1 ? (
                          <div className="id-with-num">
                            <span className="row-order-num">1</span>
                            <span className="row-code-id">{item.id}</span>
                          </div>
                        ) : (
                          <span className="row-code-id">{item.id}</span>
                        )}
                      </td>
                      <td className="td-thumb-cell">
                        <div className="content-thumb-wrap">
                          <img src={item.thumb} alt="" className="content-img-thumb" />
                          {item.isVideo && (
                            <div className="video-play-overlay">
                              <span className="play-triangle">▶</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="td-title-cell">
                        <span className="content-title-text">{item.title}</span>
                      </td>
                      <td>
                        <span className={`cms-type-pill ${item.typeClass}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="td-category">{item.category}</td>
                      <td className="td-author">{item.author}</td>
                      <td className="td-published-date">
                        {item.publishedOn.split('\n').map((line, idx) => (
                          <div key={idx} className={idx === 1 ? 'time-sub' : 'date-main'}>{line}</div>
                        ))}
                      </td>
                      <td>
                        <span className={`cms-status-pill ${item.statusClass}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="td-views">{item.views}</td>
                      <td className="td-action">
                        <button type="button" className="cms-action-btn">Edit</button>
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
            <div className="cms-pagination-row">
              <span className="pagination-info">Showing 1 to 10 of 1,842 entries</span>

              <div className="pagination-nav-group">
                <button type="button" className="page-nav-btn" disabled>‹</button>
                <button type="button" className={`page-num-btn ${currentPage === 1 ? 'active' : ''}`}>1</button>
                <button type="button" className="page-num-btn">2</button>
                <button type="button" className="page-num-btn">3</button>
                <button type="button" className="page-num-btn">4</button>
                <button type="button" className="page-num-btn">5</button>
                <span className="page-ellipsis">...</span>
                <button type="button" className="page-num-btn">185</button>
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
        <div className="cms-right-sidebar">
          {/* Card 1: Content Status Donut */}
          <div className="cms-card status-donut-card">
            <div className="cms-card-header">
              <h3 className="cms-card-title">Content Status</h3>
            </div>

            <div className="donut-body-layout">
              <div className="donut-graphic-wrap">
                <svg width="95" height="95" viewBox="0 0 100 100">
                  {/* Published 69.7% (dark green) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#026544"
                    strokeWidth="12"
                    strokeDasharray="166 238"
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Draft 17.4% (gray) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#9ca3af"
                    strokeWidth="12"
                    strokeDasharray="41 238"
                    strokeDashoffset="-166"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Under Review 6.8% (gold/amber) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#f59e0b"
                    strokeWidth="12"
                    strokeDasharray="16 238"
                    strokeDashoffset="-207"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Rejected 6.1% (red) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#dc2626"
                    strokeWidth="12"
                    strokeDasharray="15 238"
                    strokeDashoffset="-223"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="donut-center-info">
                  <strong className="donut-big-num">1,842</strong>
                  <span className="donut-sub-lbl">Total Content</span>
                </div>
              </div>

              <div className="donut-legend-stack">
                <div className="legend-row">
                  <span className="dot green" />
                  <span className="leg-name">Published</span>
                  <strong className="leg-count">1,284 (69.7%)</strong>
                </div>
                <div className="legend-row">
                  <span className="dot gray" />
                  <span className="leg-name">Draft</span>
                  <strong className="leg-count">320 (17.4%)</strong>
                </div>
                <div className="legend-row">
                  <span className="dot gold" />
                  <span className="leg-name">Under Review</span>
                  <strong className="leg-count">126 (6.8%)</strong>
                </div>
                <div className="legend-row">
                  <span className="dot red" />
                  <span className="leg-name">Rejected</span>
                  <strong className="leg-count">112 (6.1%)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Quick Create */}
          <div className="cms-card quick-create-card">
            <div className="cms-card-header">
              <h3 className="cms-card-title">Quick Create</h3>
            </div>

            <div className="quick-create-grid">
              {quickCreateItems.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="quick-create-btn"
                  style={{ backgroundColor: item.bg }}
                >
                  <span className="quick-btn-icon" style={{ color: item.color }}>{item.icon}</span>
                  <span className="quick-btn-label">{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Card 3: Recent Published Content */}
          <div className="cms-card recent-published-card">
            <div className="cms-card-header">
              <h3 className="cms-card-title">Recent Published Content</h3>
              <a href="#viewall" className="cms-card-link">View All →</a>
            </div>

            <div className="recent-list-body">
              {recentPublished.map((item, idx) => (
                <div key={idx} className="recent-list-row">
                  <div className="recent-thumb-box">
                    <img src={item.thumb} alt="" className="recent-thumb-img" />
                    {item.isVideo && (
                      <span className="recent-play-badge">▶</span>
                    )}
                  </div>
                  <span className="recent-title-txt">{item.title}</span>
                  <span className="recent-date-txt">{item.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Top Performing Content */}
          <div className="cms-card top-performing-card">
            <div className="cms-card-header">
              <h3 className="cms-card-title">Top Performing Content</h3>
              <a href="#viewall" className="cms-card-link">View All →</a>
            </div>

            <div className="top-perf-body">
              {topPerforming.map((item) => (
                <div key={item.rank} className="top-perf-row">
                  <span className="top-perf-rank">{item.rank}</span>
                  <div className="top-perf-thumb-box">
                    <img src={item.thumb} alt="" className="top-perf-thumb-img" />
                    {item.isVideo && (
                      <span className="recent-play-badge">▶</span>
                    )}
                  </div>
                  <span className="top-perf-title">{item.title}</span>
                  <span className="top-perf-views">{item.views}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          ROW 3: 4 Bottom Brand Value Cards
          ==================================================================== */}
      <div className="cms-bottom-values-row">
        {/* Value 1 */}
        <div className="cms-value-card">
          <div className="val-icon-box red-soft">
            <span className="val-icon">📅</span>
          </div>
          <div className="val-text">
            <h4 className="val-title">Content Calendar</h4>
            <p className="val-desc">Plan and schedule content in advance.</p>
            <a href="#calendar" className="val-action-link">View Calendar →</a>
          </div>
        </div>

        {/* Value 2 */}
        <div className="cms-value-card">
          <div className="val-icon-box gold-soft">
            <span className="val-icon">📊</span>
          </div>
          <div className="val-text">
            <h4 className="val-title">SEO Tools</h4>
            <p className="val-desc">Optimize content for better reach.</p>
            <a href="#seo" className="val-action-link">Manage SEO →</a>
          </div>
        </div>

        {/* Value 3 */}
        <div className="cms-value-card">
          <div className="val-icon-box teal-soft">
            <span className="val-icon">📚</span>
          </div>
          <div className="val-text">
            <h4 className="val-title">Bulk Actions</h4>
            <p className="val-desc">Update, publish or delete multiple items.</p>
            <a href="#bulk" className="val-action-link">Go to Tools →</a>
          </div>
        </div>

        {/* Value 4 */}
        <div className="cms-value-card">
          <div className="val-icon-box amber-soft">
            <span className="val-icon">📈</span>
          </div>
          <div className="val-text">
            <h4 className="val-title">Content Analytics</h4>
            <p className="val-desc">Detailed insights on content performance.</p>
            <a href="#analytics" className="val-action-link">View Analytics →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
