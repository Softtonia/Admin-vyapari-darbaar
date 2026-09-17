import React, { useState } from 'react';
import {
  SearchIcon,
  CalendarIcon,
  ChevronDownIcon,
  MoreVerticalIcon,
} from './Icons';
import commMakhana from '../assets/comm_makhana.png';
import newsThumb1 from '../assets/news_thumb_1.png';
import newsThumb2 from '../assets/news_thumb_2.png';
import newsThumb3 from '../assets/news_thumb_3.png';
import newsThumb4 from '../assets/news_thumb_4.png';
import newsThumb5 from '../assets/news_thumb_5.png';
import brandCrest from '../assets/brand_crest.png';
import './AdvertisementManagement.css';

export default function AdvertisementManagement() {
  const [activeTab, setActiveTab] = useState('All Advertisements');
  const [searchQuery, setSearchQuery] = useState('');
  const [adType, setAdType] = useState('All Types');
  const [placement, setPlacement] = useState('All Placements');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [dateRange, setDateRange] = useState('01 Sep 2026 - 17 Sep 2026');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState('10 / page');
  const [revenueRange, setRevenueRange] = useState('Last 30 Days');

  // Exact 10 rows from the screenshot
  const advertisements = [
    {
      id: '#AD1024',
      thumbImg: commMakhana,
      thumbBg: '#064e3b',
      title: 'Premium Makhana Wholesale',
      advertiser: 'Popsmagic Foods',
      type: 'Banner',
      typeClass: 'banner',
      placement: 'Homepage Top Banner',
      startDate: '01 Sep 2026',
      endDate: '30 Sep 2026',
      status: 'Active',
      statusClass: 'active',
      impressions: '245,320',
      clicks: '4,820',
      ctr: '1.97%',
    },
    {
      id: '#AD1023',
      thumbImg: newsThumb2,
      thumbBg: '#1e3a8a',
      title: 'Agri Equipment for Modern Farmers',
      advertiser: 'KisanTech',
      type: 'Banner',
      typeClass: 'banner',
      placement: 'Sidebar',
      startDate: '01 Sep 2026',
      endDate: '30 Sep 2026',
      status: 'Active',
      statusClass: 'active',
      impressions: '182,450',
      clicks: '3,120',
      ctr: '1.71%',
    },
    {
      id: '#AD1022',
      thumbImg: newsThumb4,
      thumbBg: '#111827',
      isVideo: true,
      title: 'Commodity Trading Made Easy',
      advertiser: 'TradePro',
      type: 'Video',
      typeClass: 'video',
      placement: 'Homepage Video Section',
      startDate: '05 Sep 2026',
      endDate: '05 Oct 2026',
      status: 'Active',
      statusClass: 'active',
      impressions: '420,600',
      clicks: '8,240',
      ctr: '1.96%',
    },
    {
      id: '#AD1021',
      thumbImg: newsThumb3,
      thumbBg: '#1e40af',
      title: 'Warehousing & Logistics',
      advertiser: 'Bharat Logistics',
      type: 'Banner',
      typeClass: 'banner',
      placement: 'Mandi Rates Page',
      startDate: '01 Sep 2026',
      endDate: '30 Sep 2026',
      status: 'Active',
      statusClass: 'active',
      impressions: '98,320',
      clicks: '1,980',
      ctr: '2.01%',
    },
    {
      id: '#AD1020',
      thumbImg: null,
      thumbBg: '#0284c7',
      thumbText: 'SBI',
      title: 'Get Business Loan for Traders',
      advertiser: 'SBI',
      type: 'Banner',
      typeClass: 'banner',
      placement: 'Sidebar',
      startDate: '10 Sep 2026',
      endDate: '10 Oct 2026',
      status: 'Scheduled',
      statusClass: 'scheduled',
      impressions: '0',
      clicks: '0',
      ctr: '0%',
    },
    {
      id: '#AD1019',
      thumbImg: newsThumb1,
      thumbBg: '#047857',
      title: 'Export Your Agri Products',
      advertiser: 'APEDA',
      type: 'Native',
      typeClass: 'native',
      placement: 'News Details Page',
      startDate: '05 Sep 2026',
      endDate: '05 Oct 2026',
      status: 'Active',
      statusClass: 'active',
      impressions: '156,780',
      clicks: '2,940',
      ctr: '1.88%',
    },
    {
      id: '#AD1018',
      thumbImg: newsThumb2,
      thumbBg: '#991b1b',
      title: 'Tractor & Farm Machinery',
      advertiser: 'Mahindra',
      type: 'Banner',
      typeClass: 'banner',
      placement: 'Category Pages',
      startDate: '01 Sep 2026',
      endDate: '30 Sep 2026',
      status: 'Paused',
      statusClass: 'paused',
      impressions: '64,220',
      clicks: '980',
      ctr: '1.53%',
    },
    {
      id: '#AD1017',
      thumbImg: newsThumb5,
      thumbBg: '#0369a1',
      title: 'Global Trade Opportunities',
      advertiser: 'Exim India',
      type: 'Banner',
      typeClass: 'banner',
      placement: 'Global Trade Page',
      startDate: '01 Sep 2026',
      endDate: '30 Sep 2026',
      status: 'Active',
      statusClass: 'active',
      impressions: '112,450',
      clicks: '2,340',
      ctr: '2.08%',
    },
    {
      id: '#AD1016',
      thumbImg: null,
      thumbBg: '#0284c7',
      thumbText: 'HDFC',
      title: 'Commodity Insurance for Farmers',
      advertiser: 'HDFC Ergo',
      type: 'Banner',
      typeClass: 'banner',
      placement: 'Sidebar',
      startDate: '28 Aug 2026',
      endDate: '28 Sep 2026',
      status: 'Completed',
      statusClass: 'completed',
      impressions: '210,500',
      clicks: '3,980',
      ctr: '1.89%',
    },
    {
      id: '#AD1015',
      thumbImg: brandCrest,
      thumbBg: '#1f2937',
      title: 'Join Our Business Network',
      advertiser: 'Vyapari Darbaar',
      type: 'Banner',
      typeClass: 'banner',
      placement: 'Footer Banner',
      startDate: '01 Sep 2026',
      endDate: '31 Dec 2026',
      status: 'Active',
      statusClass: 'active',
      impressions: '336,800',
      clicks: '5,420',
      ctr: '1.61%',
    },
  ];

  // Top Performing Ads list (from right sidebar)
  const topPerformingAds = [
    {
      rank: 1,
      thumb: commMakhana,
      title: 'Premium Makhana Wholesale',
      ctr: '4.8% CTR',
    },
    {
      rank: 2,
      thumb: newsThumb4,
      title: 'Commodity Trading Made Easy',
      ctr: '3.9% CTR',
    },
    {
      rank: 3,
      thumb: newsThumb5,
      title: 'Global Trade Opportunities',
      ctr: '3.2% CTR',
    },
    {
      rank: 4,
      thumb: newsThumb2,
      title: 'Agri Equipment for Farmers',
      ctr: '2.8% CTR',
    },
    {
      rank: 5,
      thumb: newsThumb3,
      title: 'Warehousing & Logistics',
      ctr: '2.6% CTR',
    },
  ];

  // Recent Advertisers list
  const recentAdvertisers = [
    {
      name: 'Popsmagic Foods',
      campaigns: '2 campaigns',
      status: 'Active',
      statusClass: 'active',
      icon: '🌿',
      iconBg: '#dcfce7',
    },
    {
      name: 'KisanTech',
      campaigns: '1 campaign',
      status: 'Active',
      statusClass: 'active',
      icon: '⚙️',
      iconBg: '#dcfce7',
    },
    {
      name: 'SBI',
      campaigns: '1 campaign',
      status: 'Scheduled',
      statusClass: 'scheduled',
      icon: '🏛',
      iconBg: '#e0f2fe',
    },
    {
      name: 'APEDA',
      campaigns: '1 campaign',
      status: 'Active',
      statusClass: 'active',
      icon: '🌱',
      iconBg: '#ccfbf1',
    },
    {
      name: 'Mahindra',
      campaigns: '1 campaign',
      status: 'Paused',
      statusClass: 'paused',
      icon: '🚜',
      iconBg: '#fee2e2',
    },
  ];

  // 30 days bar chart data (around 25 vertical bars)
  const dailyRevenueBars = [
    { height: '18%' },
    { height: '26%' },
    { height: '32%' },
    { height: '24%' },
    { height: '40%' },
    { height: '36%' },
    { height: '48%' },
    { height: '58%' },
    { height: '52%' },
    { height: '44%' },
    { height: '62%' },
    { height: '68%' },
    { height: '60%' },
    { height: '56%' },
    { height: '74%' },
    { height: '80%' },
    { height: '70%' },
    { height: '76%' },
    { height: '90%' },
    { height: '84%' },
    { height: '78%' },
    { height: '94%' },
    { height: '88%' },
    { height: '100%' },
  ];

  return (
    <div className="ad-container">
      {/* ====================================================================
          ROW 1: 5 KPI Cards
          ==================================================================== */}
      <div className="ad-kpi-row-5">
        {/* Card 1: Total Advertisers */}
        <div className="ad-kpi-card">
          <div className="ad-kpi-top">
            <div className="ad-icon-box green">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            </div>
            <div className="ad-kpi-info">
              <span className="ad-kpi-label">Total Advertisers</span>
              <span className="ad-kpi-val">482</span>
              <span className="ad-kpi-trend green">↑ 12.4% <small>vs last month</small></span>
            </div>
            <div className="ad-sparkline green">
              <span style={{ height: '30%' }} />
              <span style={{ height: '45%' }} />
              <span style={{ height: '40%' }} />
              <span style={{ height: '65%' }} />
              <span style={{ height: '80%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>
        </div>

        {/* Card 2: Active Campaigns */}
        <div className="ad-kpi-card">
          <div className="ad-kpi-top">
            <div className="ad-icon-box purple">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <div className="ad-kpi-info">
              <span className="ad-kpi-label">Active Campaigns</span>
              <span className="ad-kpi-val">264</span>
              <span className="ad-kpi-trend green">↑ 18.6%</span>
            </div>
            <div className="ad-sparkline cyan">
              <span style={{ height: '25%' }} />
              <span style={{ height: '40%' }} />
              <span style={{ height: '55%' }} />
              <span style={{ height: '50%' }} />
              <span style={{ height: '75%' }} />
              <span style={{ height: '95%' }} />
            </div>
          </div>
        </div>

        {/* Card 3: Total Revenue */}
        <div className="ad-kpi-card">
          <div className="ad-kpi-top">
            <div className="ad-icon-box amber">
              <span className="ad-rupee-symbol">₹</span>
            </div>
            <div className="ad-kpi-info">
              <span className="ad-kpi-label">Total Revenue</span>
              <span className="ad-kpi-val">₹8,42,600</span>
              <span className="ad-kpi-trend green">↑ 24.3%</span>
            </div>
            <div className="ad-sparkline amber">
              <span style={{ height: '35%' }} />
              <span style={{ height: '50%' }} />
              <span style={{ height: '60%' }} />
              <span style={{ height: '75%' }} />
              <span style={{ height: '85%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>
        </div>

        {/* Card 4: Total Impressions */}
        <div className="ad-kpi-card">
          <div className="ad-kpi-top">
            <div className="ad-icon-box green-tint">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div className="ad-kpi-info">
              <span className="ad-kpi-label">Total Impressions</span>
              <span className="ad-kpi-val">12.6M</span>
              <span className="ad-kpi-trend green">↑ 15.8%</span>
            </div>
            <div className="ad-sparkline green-tint">
              <span style={{ height: '30%' }} />
              <span style={{ height: '45%' }} />
              <span style={{ height: '55%' }} />
              <span style={{ height: '70%' }} />
              <span style={{ height: '85%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>
        </div>

        {/* Card 5: Total Clicks */}
        <div className="ad-kpi-card">
          <div className="ad-kpi-top">
            <div className="ad-icon-box blue">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                <path d="M13 13l6 6" />
              </svg>
            </div>
            <div className="ad-kpi-info">
              <span className="ad-kpi-label">Total Clicks</span>
              <span className="ad-kpi-val">248.5K</span>
              <span className="ad-kpi-trend green">↑ 11.2%</span>
            </div>
            <div className="ad-sparkline pink">
              <span style={{ height: '30%' }} />
              <span style={{ height: '40%' }} />
              <span style={{ height: '55%' }} />
              <span style={{ height: '65%' }} />
              <span style={{ height: '80%' }} />
              <span style={{ height: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          MAIN SPLIT: Left Area + Right Sidebar
          ==================================================================== */}
      <div className="ad-main-split">
        {/* Left Column: Advertisements List & Management */}
        <div className="ad-left-content">
          {/* Tabs & Action Bar */}
          <div className="ad-tabs-actions-bar">
            <div className="ad-tabs-row">
              {['All Advertisements', 'Active', 'Scheduled', 'Paused', 'Completed', 'By Placement', 'By Advertiser'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`ad-tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="ad-actions-group">
              <button type="button" className="btn-create-ad">
                <span>+</span>
                <span>Create Advertisement</span>
                <ChevronDownIcon size={12} color="#ffffff" />
              </button>
            </div>
          </div>

          {/* Filter Toolbar Card */}
          <div className="ad-filter-toolbar">
            <div className="filter-group search-group">
              <label className="filter-lbl">Search</label>
              <div className="filter-search-box">
                <SearchIcon size={12} color="#9ca3af" />
                <input
                  type="text"
                  placeholder="Ad title, advertiser, campaign..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Ad Type</label>
              <div className="filter-dropdown">
                <span>{adType}</span>
                <ChevronDownIcon size={11} color="#6b7280" />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-lbl">Placement</label>
              <div className="filter-dropdown">
                <span>{placement}</span>
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
            </div>
          </div>

          {/* Advertisements Table Card */}
          <div className="ad-card ad-table-card">
            <div className="ad-card-header">
              <h3 className="ad-card-title">Advertisements (182)</h3>
            </div>

            <div className="ad-table-wrapper">
              <table className="ad-data-table">
                <thead>
                  <tr>
                    <th className="th-check"><input type="checkbox" /></th>
                    <th>#</th>
                    <th>Ad Preview</th>
                    <th>Ad Title</th>
                    <th>Advertiser</th>
                    <th>Type</th>
                    <th>Placement</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Impressions</th>
                    <th>Clicks</th>
                    <th>CTR</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {advertisements.map((item) => (
                    <tr key={item.id}>
                      <td className="td-check"><input type="checkbox" /></td>
                      <td className="td-id">{item.id}</td>
                      <td className="td-preview">
                        <div className="ad-thumb-box" style={{ backgroundColor: item.thumbBg }}>
                          {item.thumbImg ? (
                            <img src={item.thumbImg} alt={item.title} className="ad-thumb-img" />
                          ) : (
                            <span className="ad-thumb-text">{item.thumbText}</span>
                          )}
                          {item.isVideo && (
                            <span className="ad-thumb-play-icon">▶</span>
                          )}
                        </div>
                      </td>
                      <td className="td-title">
                        <span className="ad-main-title">{item.title}</span>
                      </td>
                      <td className="td-advertiser">{item.advertiser}</td>
                      <td>
                        <span className={`ad-type-pill ${item.typeClass}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="td-placement">{item.placement}</td>
                      <td className="td-date">{item.startDate}</td>
                      <td className="td-date">{item.endDate}</td>
                      <td>
                        <span className={`ad-status-pill ${item.statusClass}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="td-num">{item.impressions}</td>
                      <td className="td-num">{item.clicks}</td>
                      <td className="td-ctr">{item.ctr}</td>
                      <td className="td-action">
                        <button type="button" className="ad-action-btn">View</button>
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
            <div className="ad-pagination-row">
              <span className="pagination-info">Showing 1 to 10 of 182 entries</span>

              <div className="pagination-nav-group">
                <button type="button" className="page-nav-btn" disabled>‹</button>
                <button type="button" className={`page-num-btn ${currentPage === 1 ? 'active' : ''}`}>1</button>
                <button type="button" className="page-num-btn">2</button>
                <button type="button" className="page-num-btn">3</button>
                <button type="button" className="page-num-btn">4</button>
                <button type="button" className="page-num-btn">5</button>
                <span className="page-ellipsis">...</span>
                <button type="button" className="page-num-btn">19</button>
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
        <div className="ad-right-sidebar">
          {/* Card 1: Ad Revenue Chart */}
          <div className="ad-card rev-chart-card">
            <div className="ad-card-header">
              <h3 className="ad-card-title">Ad Revenue</h3>
              <div className="ad-dropdown-mini">
                <span>{revenueRange}</span>
                <ChevronDownIcon size={11} color="#4b5563" />
              </div>
            </div>

            <div className="ad-rev-body">
              <div className="ad-rev-header-stats">
                <strong className="ad-rev-big-num">₹8,42,600</strong>
                <span className="ad-growth-pill">↑ 24.3% <small>vs last month</small></span>
              </div>

              <div className="ad-rev-chart-wrap">
                <div className="ad-y-axis">
                  <span>₹100K</span>
                  <span>₹75K</span>
                  <span>₹50K</span>
                  <span>₹25K</span>
                  <span>₹0</span>
                </div>
                <div className="ad-bars-container">
                  <div className="ad-bars-track">
                    {dailyRevenueBars.map((bar, idx) => (
                      <div key={idx} className="ad-bar-col">
                        <div className="ad-bar-slot">
                          <span className="ad-bar-fill" style={{ height: bar.height }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="ad-x-axis-dates">
                    <span>18 Aug</span>
                    <span>25 Aug</span>
                    <span>1 Sep</span>
                    <span>8 Sep</span>
                    <span>15 Sep</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Ad Type Distribution Donut */}
          <div className="ad-card ad-dist-card">
            <div className="ad-card-header">
              <h3 className="ad-card-title">Ad Type Distribution</h3>
            </div>

            <div className="ad-donut-body">
              <div className="ad-donut-wrap">
                <svg width="95" height="95" viewBox="0 0 100 100">
                  {/* Banner 53.8% (dark green) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#026544"
                    strokeWidth="12"
                    strokeDasharray="128 238"
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Video 13.2% (orange) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#ea580c"
                    strokeWidth="12"
                    strokeDasharray="31 238"
                    strokeDashoffset="-128"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Native 9.9% (gold) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#eab308"
                    strokeWidth="12"
                    strokeDasharray="24 238"
                    strokeDashoffset="-159"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Text 6.6% (purple) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#8b5cf6"
                    strokeWidth="12"
                    strokeDasharray="16 238"
                    strokeDashoffset="-183"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Popup 5.5% (pink) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#ec4899"
                    strokeWidth="12"
                    strokeDasharray="13 238"
                    strokeDashoffset="-199"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Others 11.0% (slate) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="transparent"
                    stroke="#64748b"
                    strokeWidth="12"
                    strokeDasharray="26 238"
                    strokeDashoffset="-212"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="ad-donut-center">
                  <strong className="donut-big-num">182</strong>
                  <span className="donut-sub-lbl">Total Ads</span>
                </div>
              </div>

              <div className="ad-donut-legend">
                <div className="ad-leg-row">
                  <span className="dot darkgreen" />
                  <span className="leg-title">Banner</span>
                  <strong className="leg-val">98 (53.8%)</strong>
                </div>
                <div className="ad-leg-row">
                  <span className="dot orange" />
                  <span className="leg-title">Video</span>
                  <strong className="leg-val">24 (13.2%)</strong>
                </div>
                <div className="ad-leg-row">
                  <span className="dot gold" />
                  <span className="leg-title">Native</span>
                  <strong className="leg-val">18 (9.9%)</strong>
                </div>
                <div className="ad-leg-row">
                  <span className="dot purple" />
                  <span className="leg-title">Text</span>
                  <strong className="leg-val">12 (6.6%)</strong>
                </div>
                <div className="ad-leg-row">
                  <span className="dot pink" />
                  <span className="leg-title">Popup</span>
                  <strong className="leg-val">10 (5.5%)</strong>
                </div>
                <div className="ad-leg-row">
                  <span className="dot slate" />
                  <span className="leg-title">Others</span>
                  <strong className="leg-val">20 (11.0%)</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Top Performing Ads */}
          <div className="ad-card top-ads-card">
            <div className="ad-card-header">
              <h3 className="ad-card-title">Top Performing Ads</h3>
              <a href="#viewall" className="ad-card-link">View All →</a>
            </div>

            <div className="top-ads-body">
              {topPerformingAds.map((item) => (
                <div key={item.rank} className="top-ad-item-row">
                  <span className="top-ad-rank-badge">{item.rank}</span>
                  <img src={item.thumb} alt={item.title} className="top-ad-thumb-mini" />
                  <span className="top-ad-title-txt">{item.title}</span>
                  <strong className="top-ad-ctr-txt">{item.ctr}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Recent Advertisers */}
          <div className="ad-card recent-adv-card">
            <div className="ad-card-header">
              <h3 className="ad-card-title">Recent Advertisers</h3>
              <a href="#viewall" className="ad-card-link">View All →</a>
            </div>

            <div className="recent-adv-body">
              {recentAdvertisers.map((item, idx) => (
                <div key={idx} className="adv-item-row">
                  <div className="adv-icon-circle" style={{ backgroundColor: item.iconBg }}>
                    <span>{item.icon}</span>
                  </div>
                  <div className="adv-info-col">
                    <span className="adv-name-txt">{item.name}</span>
                  </div>
                  <span className="adv-campaigns-txt">{item.campaigns}</span>
                  <span className={`ad-status-pill mini ${item.statusClass}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          ROW 3: 4 Bottom Brand Value Cards
          ==================================================================== */}
      <div className="ad-bottom-values-row">
        {/* Value 1 */}
        <div className="ad-value-card">
          <div className="val-icon-box gold">
            <span className="val-icon">💼</span>
          </div>
          <div className="val-text">
            <h4 className="val-title">Increase Revenue</h4>
            <p className="val-desc">Monetize with targeted ads.</p>
          </div>
        </div>

        {/* Value 2 */}
        <div className="ad-value-card">
          <div className="val-icon-box amber-soft">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Target Right Audience</h4>
            <p className="val-desc">Reach verified traders & businesses.</p>
          </div>
        </div>

        {/* Value 3 */}
        <div className="ad-value-card">
          <div className="val-icon-box brown">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Flexible Ad Slots</h4>
            <p className="val-desc">Banner, video, native & more.</p>
          </div>
        </div>

        {/* Value 4 */}
        <div className="ad-value-card">
          <div className="val-icon-box gold-soft">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <div className="val-text">
            <h4 className="val-title">Detailed Analytics</h4>
            <p className="val-desc">Track performance in real-time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
