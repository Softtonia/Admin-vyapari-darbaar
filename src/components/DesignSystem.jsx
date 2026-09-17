import React, { useState } from 'react';
import brandCrestImg from '../assets/brand_crest.png';
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
  HelpCircleIcon,
  SearchIcon,
  CalendarIcon,
  UploadCloudIcon,
  AlertSuccessIcon,
  AlertInfoIcon,
  AlertWarningIcon,
  AlertDangerIcon,
  CloseIcon,
  HomeIcon,
  MoreVerticalIcon,
  UserIcon,
  ChevronDownIcon,
  FiligreeDivider,
  CheckIcon
} from './Icons';
import './DesignSystem.css';

export default function DesignSystem({ onNavigateToLogin }) {
  // Interactive UI states
  const [activeTab, setActiveTab] = useState('Overview');
  const [activePage, setActivePage] = useState(1);
  const [checkboxState, setCheckboxState] = useState(true);
  const [toggleState, setToggleState] = useState(true);
  const [selectedTableRows, setSelectedTableRows] = useState([false, false, false]);
  const [dismissedAlerts, setDismissedAlerts] = useState({});

  const toggleTableRow = (idx) => {
    const updated = [...selectedTableRows];
    updated[idx] = !updated[idx];
    setSelectedTableRows(updated);
  };

  const toggleSelectAllRows = () => {
    const allSelected = selectedTableRows.every(Boolean);
    setSelectedTableRows([!allSelected, !allSelected, !allSelected]);
  };

  const dismissAlert = (key) => {
    setDismissedAlerts(prev => ({ ...prev, [key]: true }));
  };

  return (
    <div className="ds-page">
      {/* ----------------------------------------------------------------------
          Top Header Bar
          ---------------------------------------------------------------------- */}
      <header className="ds-header">
        <div className="ds-header-left">
          <img src={brandCrestImg} alt="Vyapari Darbaar" className="ds-header-badge" />
          <div className="ds-header-title-block">
            <h1 className="ds-title">Design System</h1>
            <h2 className="ds-subtitle">ADMIN PANEL UI FOUNDATION</h2>
            <div className="ds-tagline">CONSISTENT • SCALABLE • MODERN • ROYAL</div>
          </div>
        </div>

        <div className="ds-header-right">
          <div className="ds-header-mission">
            Powering<br />
            Indian Commodity Trade<br />
            for a Stronger Bharat
          </div>
          <div className="ds-header-vertical-sep" />
          <div className="ds-header-pillars">
            <span>TRADE</span>
            <span>INFORM</span>
            <span>CONNECT</span>
            <span>GROW</span>
          </div>

          {onNavigateToLogin && (
            <button
              type="button"
              className="ds-login-portal-btn"
              onClick={onNavigateToLogin}
              title="Switch to Admin Login Portal view"
            >
              Admin Portal →
            </button>
          )}
        </div>
      </header>

      {/* ----------------------------------------------------------------------
          Main Content Grid
          ---------------------------------------------------------------------- */}
      <main className="ds-main-grid">

        {/* ==================================================================
            Row 1: 01. Brand Identity | 02. Color Palette | 03. Typography
            ================================================================== */}
        <div className="ds-row ds-row-3col">
          {/* 01. Brand Identity */}
          <section className="ds-card ds-brand-card">
            <h3 className="ds-card-heading">01. Brand Identity</h3>
            <div className="ds-brand-content">
              <div className="ds-brand-crest-box">
                <img src={brandCrestImg} alt="Vyapari Darbaar Crest" className="ds-brand-crest-img" />
              </div>
              <h4 className="ds-brand-name">VYAPARI DARBAAR</h4>
              <span className="ds-brand-panel-tag">Admin Panel</span>
              <div className="ds-brand-divider">
                <FiligreeDivider color="#c89e3a" />
              </div>
              <p className="ds-brand-slogan">Manage. Monitor. Empower Trade.</p>
            </div>
          </section>

          {/* 02. Color Palette */}
          <section className="ds-card ds-palette-card">
            <h3 className="ds-card-heading">02. Color Palette</h3>
            
            <div className="ds-subgroup">
              <h4 className="ds-subgroup-title">Primary Colors</h4>
              <div className="ds-primary-swatches-grid">
                <div className="ds-color-tile">
                  <div className="ds-color-box" style={{ backgroundColor: '#026544' }} />
                  <span className="ds-color-name">Primary Green</span>
                  <span className="ds-color-hex">#026544</span>
                  <span className="ds-color-role">Brand / Navigation</span>
                </div>

                <div className="ds-color-tile">
                  <div className="ds-color-box" style={{ backgroundColor: '#D4A017' }} />
                  <span className="ds-color-name">Royal Gold</span>
                  <span className="ds-color-hex">#D4A017</span>
                  <span className="ds-color-role">CTA / Accent</span>
                </div>

                <div className="ds-color-tile">
                  <div className="ds-color-box border" style={{ backgroundColor: '#FFF7E8' }} />
                  <span className="ds-color-name">Warm Ivory</span>
                  <span className="ds-color-hex">#FFF7E8</span>
                  <span className="ds-color-role">Background</span>
                </div>

                <div className="ds-color-tile">
                  <div className="ds-color-box" style={{ backgroundColor: '#1F2937' }} />
                  <span className="ds-color-name">Deep Charcoal</span>
                  <span className="ds-color-hex">#1F2937</span>
                  <span className="ds-color-role">Text Primary</span>
                </div>
              </div>
            </div>

            <div className="ds-subgroup" style={{ marginTop: '14px' }}>
              <h4 className="ds-subgroup-title">Secondary Colors</h4>
              <div className="ds-secondary-swatches-row">
                <div className="ds-sec-tile">
                  <div className="ds-sec-box" style={{ backgroundColor: '#0F7A5A' }} />
                  <span className="ds-sec-name">Emerald Light</span>
                  <span className="ds-sec-hex">#0F7A5A</span>
                  <span className="ds-sec-role">Hover / Active</span>
                </div>
                <div className="ds-sec-tile">
                  <div className="ds-sec-box" style={{ backgroundColor: '#FBD368' }} />
                  <span className="ds-sec-name">Gold Light</span>
                  <span className="ds-sec-hex">#FBD368</span>
                  <span className="ds-sec-role">Highlights</span>
                </div>
                <div className="ds-sec-tile">
                  <div className="ds-sec-box" style={{ backgroundColor: '#F3E9D7' }} />
                  <span className="ds-sec-name">Sand Beige</span>
                  <span className="ds-sec-hex">#F3E9D7</span>
                  <span className="ds-sec-role">Surfaces</span>
                </div>
                <div className="ds-sec-tile">
                  <div className="ds-sec-box" style={{ backgroundColor: '#6B3E20' }} />
                  <span className="ds-sec-name">Brown</span>
                  <span className="ds-sec-hex">#6B3E20</span>
                  <span className="ds-sec-role">Secondary</span>
                </div>
                <div className="ds-sec-tile">
                  <div className="ds-sec-box" style={{ backgroundColor: '#DC3545' }} />
                  <span className="ds-sec-name">Red</span>
                  <span className="ds-sec-hex">#DC3545</span>
                  <span className="ds-sec-role">Error / Danger</span>
                </div>
                <div className="ds-sec-tile">
                  <div className="ds-sec-box" style={{ backgroundColor: '#0D6EFD' }} />
                  <span className="ds-sec-name">Blue</span>
                  <span className="ds-sec-hex">#0D6EFD</span>
                  <span className="ds-sec-role">Info / Links</span>
                </div>
                <div className="ds-sec-tile">
                  <div className="ds-sec-box" style={{ backgroundColor: '#198754' }} />
                  <span className="ds-sec-name">Success</span>
                  <span className="ds-sec-hex">#198754</span>
                  <span className="ds-sec-role">Success</span>
                </div>
                <div className="ds-sec-tile">
                  <div className="ds-sec-box" style={{ backgroundColor: '#6C757D' }} />
                  <span className="ds-sec-name">Gray</span>
                  <span className="ds-sec-hex">#6C757D</span>
                  <span className="ds-sec-role">Disabled</span>
                </div>
              </div>
            </div>
          </section>

          {/* 03. Typography */}
          <section className="ds-card ds-typography-card">
            <h3 className="ds-card-heading">03. Typography</h3>
            <div className="ds-type-grid">
              <div className="ds-type-specimens">
                <div className="ds-specimen-block">
                  <div className="ds-specimen-heading-row">
                    <span className="ds-big-sample serif">Aa</span>
                    <div className="ds-specimen-meta">
                      <strong className="ds-font-family-name">Playfair Display</strong>
                      <span className="ds-font-usage">(Headings)</span>
                    </div>
                  </div>
                  <div className="ds-char-sample serif">
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                    abcdefghijklmnopqrstuvwxyz<br />
                    0123456789
                  </div>
                </div>

                <div className="ds-specimen-block" style={{ marginTop: '16px' }}>
                  <div className="ds-specimen-heading-row">
                    <span className="ds-big-sample sans">Aa</span>
                    <div className="ds-specimen-meta">
                      <strong className="ds-font-family-name">Inter</strong>
                      <span className="ds-font-usage">(UI Text)</span>
                    </div>
                  </div>
                  <div className="ds-char-sample sans">
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                    abcdefghijklmnopqrstuvwxyz<br />
                    0123456789
                  </div>
                </div>
              </div>

              <div className="ds-type-scale-table">
                <div className="ds-type-row">
                  <span className="ds-type-label">Display / Dashboard KPI</span>
                  <span className="ds-type-value">32 / 700</span>
                </div>
                <div className="ds-type-row">
                  <span className="ds-type-label">Page Heading</span>
                  <span className="ds-type-value">24 / 700</span>
                </div>
                <div className="ds-type-row">
                  <span className="ds-type-label">Section Heading</span>
                  <span className="ds-type-value">18 / 600</span>
                </div>
                <div className="ds-type-row">
                  <span className="ds-type-label">Card Heading</span>
                  <span className="ds-type-value">16 / 600</span>
                </div>
                <div className="ds-type-row">
                  <span className="ds-type-label">Body Large</span>
                  <span className="ds-type-value">16 / 400</span>
                </div>
                <div className="ds-type-row">
                  <span className="ds-type-label">Body</span>
                  <span className="ds-type-value">14 / 400</span>
                </div>
                <div className="ds-type-row">
                  <span className="ds-type-label">Body Small</span>
                  <span className="ds-type-value">12 / 400</span>
                </div>
                <div className="ds-type-row">
                  <span className="ds-type-label">Label</span>
                  <span className="ds-type-value">12 / 500</span>
                </div>
                <div className="ds-type-row">
                  <span className="ds-type-label">Caption</span>
                  <span className="ds-type-value">12 / 400</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ==================================================================
            Row 2: 04. Buttons | 05. Form Elements | 06. Icons (Sample)
            ================================================================== */}
        <div className="ds-row ds-row-3col">
          {/* 04. Buttons */}
          <section className="ds-card ds-buttons-card">
            <h3 className="ds-card-heading">04. Buttons</h3>

            <div className="ds-buttons-row">
              <div className="ds-btn-col">
                <span className="ds-mini-label">Primary Button</span>
                <button type="button" className="ds-btn ds-btn-primary">
                  <span>Save Changes</span>
                  <span className="ds-arrow">→</span>
                </button>
              </div>

              <div className="ds-btn-col">
                <span className="ds-mini-label">Secondary Button</span>
                <button type="button" className="ds-btn ds-btn-secondary">
                  View Details
                </button>
              </div>

              <div className="ds-btn-col">
                <span className="ds-mini-label">Accent Button</span>
                <button type="button" className="ds-btn ds-btn-accent">
                  + Add New
                </button>
              </div>

              <div className="ds-btn-col">
                <span className="ds-mini-label">Danger Button</span>
                <button type="button" className="ds-btn ds-btn-danger">
                  Delete
                </button>
              </div>
            </div>

            <div className="ds-subgroup" style={{ marginTop: '22px' }}>
              <h4 className="ds-subgroup-title">Button States</h4>
              <div className="ds-btn-states-grid">
                <button type="button" className="ds-btn ds-state-btn default">
                  Default
                </button>
                <button type="button" className="ds-btn ds-state-btn hover">
                  Hover
                </button>
                <button type="button" className="ds-btn ds-state-btn pressed">
                  Pressed
                </button>
                <button type="button" className="ds-btn ds-state-btn disabled" disabled>
                  Disabled
                </button>
              </div>
            </div>
          </section>

          {/* 05. Form Elements */}
          <section className="ds-card ds-forms-card">
            <h3 className="ds-card-heading">05. Form Elements</h3>

            <div className="ds-form-elements-grid">
              {/* Left Column */}
              <div className="ds-form-col">
                <div className="ds-form-item">
                  <label className="ds-field-label">Text Input</label>
                  <div className="ds-input-icon-wrap">
                    <UserIcon size={14} color="#9ca3af" className="ds-field-icon" />
                    <input type="text" className="ds-field-input" placeholder="Enter text here" />
                  </div>
                </div>

                <div className="ds-form-item">
                  <label className="ds-field-label">Select Dropdown</label>
                  <div className="ds-select-wrap">
                    <select className="ds-field-select" defaultValue="option">
                      <option value="option">Select option</option>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                    </select>
                    <ChevronDownIcon size={14} color="#6b7280" className="ds-select-arrow" />
                  </div>
                </div>

                <div className="ds-form-item">
                  <label className="ds-field-label">Search Input</label>
                  <div className="ds-input-icon-wrap">
                    <SearchIcon size={14} color="#9ca3af" className="ds-field-icon" />
                    <input type="text" className="ds-field-input" placeholder="Search..." />
                  </div>
                </div>

                <div className="ds-form-item">
                  <label className="ds-field-label">Textarea</label>
                  <textarea className="ds-field-textarea" placeholder="Write your message..." rows={2} />
                </div>
              </div>

              {/* Right Column */}
              <div className="ds-form-col">
                <div className="ds-form-item">
                  <label className="ds-field-label">Date Picker</label>
                  <div className="ds-select-wrap">
                    <CalendarIcon size={14} color="#9ca3af" className="ds-field-icon" style={{ left: '10px' }} />
                    <input
                      type="text"
                      className="ds-field-input"
                      placeholder="Select date"
                      style={{ paddingLeft: '32px' }}
                      readOnly
                    />
                    <ChevronDownIcon size={14} color="#6b7280" className="ds-select-arrow" />
                  </div>
                </div>

                <div className="ds-form-item">
                  <label className="ds-field-label">File Upload</label>
                  <div className="ds-dropzone">
                    <UploadCloudIcon size={20} color="#6b7280" />
                    <span className="ds-dropzone-prompt">Click to upload or drag and drop</span>
                    <span className="ds-dropzone-sub">PNG, JPG, PDF (Max 5MB)</span>
                  </div>
                </div>

                <div className="ds-form-item">
                  <label className="ds-field-label">Checkbox</label>
                  <label className="ds-check-label">
                    <input
                      type="checkbox"
                      checked={checkboxState}
                      onChange={() => setCheckboxState(!checkboxState)}
                      style={{ display: 'none' }}
                    />
                    <span className={`ds-custom-check ${checkboxState ? 'checked' : ''}`}>
                      {checkboxState && <CheckIcon size={10} color="#fff" />}
                    </span>
                    <span className="ds-check-text">I agree to the terms</span>
                  </label>
                </div>

                <div className="ds-form-item">
                  <label className="ds-field-label">Toggle</label>
                  <label className="ds-toggle-label">
                    <input
                      type="checkbox"
                      checked={toggleState}
                      onChange={() => setToggleState(!toggleState)}
                      style={{ display: 'none' }}
                    />
                    <span className={`ds-switch ${toggleState ? 'on' : ''}`}>
                      <span className="ds-switch-handle" />
                    </span>
                    <span className="ds-check-text">Enable notifications</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* 06. Icons (Sample) */}
          <section className="ds-card ds-icons-card">
            <h3 className="ds-card-heading">06. Icons (Sample)</h3>
            <div className="ds-icons-grid">
              <div className="ds-icon-box">
                <DashboardIcon size={20} color="#1f2937" />
                <span className="ds-icon-label">Dashboard</span>
              </div>
              <div className="ds-icon-box">
                <UserIcon size={20} color="#1f2937" />
                <span className="ds-icon-label">Users</span>
              </div>
              <div className="ds-icon-box">
                <TradersIcon size={20} color="#1f2937" />
                <span className="ds-icon-label">Traders</span>
              </div>
              <div className="ds-icon-box">
                <MarketIcon size={20} color="#1f2937" />
                <span className="ds-icon-label">Market</span>
              </div>

              <div className="ds-icon-box">
                <NewsIcon size={20} color="#1f2937" />
                <span className="ds-icon-label">News</span>
              </div>
              <div className="ds-icon-box">
                <TradeIcon size={20} color="#1f2937" />
                <span className="ds-icon-label">Trade</span>
              </div>
              <div className="ds-icon-box">
                <PaymentsIcon size={20} color="#1f2937" />
                <span className="ds-icon-label">Payments</span>
              </div>
              <div className="ds-icon-box">
                <AdsIcon size={20} color="#1f2937" />
                <span className="ds-icon-label">Ads</span>
              </div>

              <div className="ds-icon-box">
                <ReportsIcon size={20} color="#1f2937" />
                <span className="ds-icon-label">Reports</span>
              </div>
              <div className="ds-icon-box">
                <SettingsIcon size={20} color="#1f2937" />
                <span className="ds-icon-label">Settings</span>
              </div>
              <div className="ds-icon-box">
                <BellIcon size={20} color="#1f2937" />
                <span className="ds-icon-label">Notifications</span>
              </div>
              <div className="ds-icon-box">
                <HelpCircleIcon size={20} color="#1f2937" />
                <span className="ds-icon-label">Help</span>
              </div>
            </div>
          </section>
        </div>

        {/* ==================================================================
            Row 3: 07. Status Badges | 08. Alerts / Notifications | 09. Cards
            ================================================================== */}
        <div className="ds-row ds-row-3col">
          {/* 07. Status Badges */}
          <section className="ds-card ds-badges-card">
            <h3 className="ds-card-heading">07. Status Badges</h3>
            <div className="ds-badges-content">
              <div className="ds-badge-row">
                <span className="ds-status-pill active">Active</span>
                <span className="ds-status-pill pending">Pending</span>
                <span className="ds-status-pill under-review">Under Review</span>
                <span className="ds-status-pill approved">Approved</span>
              </div>
              <div className="ds-badge-row" style={{ marginTop: '14px' }}>
                <span className="ds-status-pill rejected">Rejected</span>
                <span className="ds-status-pill suspended">Suspended</span>
                <span className="ds-status-pill expired">Expired</span>
                <span className="ds-status-pill draft">Draft</span>
              </div>
            </div>
          </section>

          {/* 08. Alerts / Notifications */}
          <section className="ds-card ds-alerts-card">
            <h3 className="ds-card-heading">08. Alerts / Notifications</h3>
            <div className="ds-alerts-list">
              {!dismissedAlerts.success && (
                <div className="ds-alert ds-alert-success">
                  <div className="ds-alert-body">
                    <AlertSuccessIcon size={16} color="#198754" />
                    <span className="ds-alert-text">Success! Your changes have been saved.</span>
                  </div>
                  <button type="button" className="ds-alert-close" onClick={() => dismissAlert('success')}>
                    <CloseIcon size={12} />
                  </button>
                </div>
              )}

              {!dismissedAlerts.info && (
                <div className="ds-alert ds-alert-info">
                  <div className="ds-alert-body">
                    <AlertInfoIcon size={16} color="#0d6efd" />
                    <span className="ds-alert-text">Information about the update.</span>
                  </div>
                  <button type="button" className="ds-alert-close" onClick={() => dismissAlert('info')}>
                    <CloseIcon size={12} />
                  </button>
                </div>
              )}

              {!dismissedAlerts.warning && (
                <div className="ds-alert ds-alert-warning">
                  <div className="ds-alert-body">
                    <AlertWarningIcon size={16} color="#ffc107" />
                    <span className="ds-alert-text">Please review the highlighted fields.</span>
                  </div>
                  <button type="button" className="ds-alert-close" onClick={() => dismissAlert('warning')}>
                    <CloseIcon size={12} />
                  </button>
                </div>
              )}

              {!dismissedAlerts.danger && (
                <div className="ds-alert ds-alert-danger">
                  <div className="ds-alert-body">
                    <AlertDangerIcon size={16} color="#dc3545" />
                    <span className="ds-alert-text">Something went wrong. Please try again.</span>
                  </div>
                  <button type="button" className="ds-alert-close" onClick={() => dismissAlert('danger')}>
                    <CloseIcon size={12} />
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* 09. Cards */}
          <section className="ds-card ds-kpi-card-section">
            <h3 className="ds-card-heading">09. Cards</h3>
            <div className="ds-kpi-cards-grid">
              {/* Card 1 */}
              <div className="ds-kpi-tile">
                <div className="ds-kpi-icon-wrap beige">
                  <UsersIcon size={18} color="#b8860b" />
                </div>
                <div className="ds-kpi-details">
                  <span className="ds-kpi-title">Total Users</span>
                  <span className="ds-kpi-number">24,580</span>
                  <span className="ds-kpi-trend positive">↑ 12.4%</span>
                </div>
                <div className="ds-kpi-chart">
                  <span className="bar b1" />
                  <span className="bar b2" />
                  <span className="bar b3" />
                  <span className="bar b4" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="ds-kpi-tile">
                <div className="ds-kpi-icon-wrap gold">
                  <span className="ds-rupee-symbol">₹</span>
                </div>
                <div className="ds-kpi-details">
                  <span className="ds-kpi-title">Today's Revenue</span>
                  <span className="ds-kpi-number">₹1,84,620</span>
                  <span className="ds-kpi-trend positive">↑ 18.2%</span>
                </div>
                <div className="ds-kpi-chart">
                  <span className="bar b2" />
                  <span className="bar b3" />
                  <span className="bar b4" />
                  <span className="bar b5" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ==================================================================
            Row 4: 10. Table | Sidebar Preview | Navigation, Tabs, Pagination, Progress Bar
            ================================================================== */}
        <div className="ds-row ds-row-complex">
          {/* 10. Table */}
          <section className="ds-card ds-table-card">
            <h3 className="ds-card-heading">10. Table</h3>
            <div className="ds-table-container">
              <table className="ds-table">
                <thead>
                  <tr>
                    <th style={{ width: '30px' }}>
                      <input
                        type="checkbox"
                        checked={selectedTableRows.every(Boolean)}
                        onChange={toggleSelectAllRows}
                      />
                    </th>
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
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedTableRows[0]}
                        onChange={() => toggleTableRow(0)}
                      />
                    </td>
                    <td className="id-col">#TR1024</td>
                    <td className="name-col">ABC Traders</td>
                    <td>
                      <span className="ds-type-pill buy">BUY</span>
                    </td>
                    <td>Makhana</td>
                    <td>500 KG</td>
                    <td>Delhi</td>
                    <td>
                      <span className="ds-status-pill table active">Active</span>
                    </td>
                    <td className="action-col">
                      <a href="#view" className="ds-view-link">View</a>
                      <button type="button" className="ds-more-btn">
                        <MoreVerticalIcon size={14} />
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedTableRows[1]}
                        onChange={() => toggleTableRow(1)}
                      />
                    </td>
                    <td className="id-col">#TR1025</td>
                    <td className="name-col">Kumar Foods</td>
                    <td>
                      <span className="ds-type-pill sell">SELL</span>
                    </td>
                    <td>Wheat</td>
                    <td>10 MT</td>
                    <td>Bihar</td>
                    <td>
                      <span className="ds-status-pill table pending">Pending</span>
                    </td>
                    <td className="action-col">
                      <a href="#view" className="ds-view-link">View</a>
                      <button type="button" className="ds-more-btn">
                        <MoreVerticalIcon size={14} />
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedTableRows[2]}
                        onChange={() => toggleTableRow(2)}
                      />
                    </td>
                    <td className="id-col">#TR1026</td>
                    <td className="name-col">Sharma Trading</td>
                    <td>
                      <span className="ds-type-pill buy">BUY</span>
                    </td>
                    <td>Maize</td>
                    <td>5 MT</td>
                    <td>Punjab</td>
                    <td>
                      <span className="ds-status-pill table under-review">Under Review</span>
                    </td>
                    <td className="action-col">
                      <a href="#view" className="ds-view-link">View</a>
                      <button type="button" className="ds-more-btn">
                        <MoreVerticalIcon size={14} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="ds-table-footer">
              <span className="ds-entries-info">Showing 1 to 3 of 50 entries</span>
              <div className="ds-table-controls">
                <div className="ds-mini-pagination">
                  <button type="button" className="ds-pag-arrow">‹</button>
                  <button type="button" className="ds-pag-num active">1</button>
                  <button type="button" className="ds-pag-num">2</button>
                  <button type="button" className="ds-pag-num">3</button>
                  <button type="button" className="ds-pag-num">4</button>
                  <button type="button" className="ds-pag-num">5</button>
                  <button type="button" className="ds-pag-arrow">›</button>
                </div>
                <div className="ds-per-page-select">
                  <span>10 / page</span>
                  <ChevronDownIcon size={12} color="#6b7280" />
                </div>
              </div>
            </div>
          </section>

          {/* Sidebar Component Preview */}
          <aside className="ds-sidebar-preview">
            <div className="ds-sidebar-brand">
              <span className="ds-sidebar-crown">👑</span>
              <div className="ds-sidebar-brand-text">
                <span className="ds-sb-name">VYAPARI</span>
                <span className="ds-sb-sub">DARBAAR</span>
              </div>
            </div>

            <nav className="ds-sidebar-menu">
              <div className="ds-sb-item active">
                <DashboardIcon size={15} />
                <span>Dashboard</span>
              </div>
              <div className="ds-sb-item">
                <MarketIcon size={15} />
                <span>Market Data</span>
              </div>
              <div className="ds-sb-item">
                <TradeIcon size={15} />
                <span>Trade</span>
              </div>
              <div className="ds-sb-item">
                <NewsIcon size={15} />
                <span>Content Management</span>
              </div>
              <div className="ds-sb-item">
                <UsersIcon size={15} />
                <span>Users & Access</span>
              </div>
              <div className="ds-sb-item">
                <PaymentsIcon size={15} />
                <span>Monetisation</span>
              </div>
              <div className="ds-sb-item">
                <ReportsIcon size={15} />
                <span>Analytics</span>
              </div>
              <div className="ds-sb-item">
                <BellIcon size={15} />
                <span>Notifications</span>
              </div>
              <div className="ds-sb-item">
                <TradeIcon size={15} />
                <span>Website</span>
              </div>
              <div className="ds-sb-item">
                <SettingsIcon size={15} />
                <span>System</span>
              </div>
            </nav>
          </aside>

          {/* Right Components Stack: 11. Navigation | 13. Tabs | 14. Pagination | 15. Progress Bar */}
          <div className="ds-components-stack">
            {/* 11. Navigation (Breadcrumbs) */}
            <section className="ds-card ds-nav-card">
              <h3 className="ds-card-heading">11. Navigation</h3>
              <div className="ds-breadcrumbs">
                <HomeIcon size={14} color="#6b7280" className="ds-bread-home" />
                <span className="ds-bread-sep">/</span>
                <span className="ds-bread-link">Trade</span>
                <span className="ds-bread-sep">/</span>
                <span className="ds-bread-link">Buy Requirements</span>
                <span className="ds-bread-sep">/</span>
                <span className="ds-bread-current">View</span>
              </div>
            </section>

            {/* 13. Tabs */}
            <section className="ds-card ds-tabs-card">
              <h3 className="ds-card-heading">13. Tabs</h3>
              <div className="ds-tabs-row">
                {['Overview', 'Listings', 'Analytics', 'Payments'].map(tab => (
                  <button
                    key={tab}
                    type="button"
                    className={`ds-tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </section>

            {/* 14. Pagination */}
            <section className="ds-card ds-pagination-card">
              <h3 className="ds-card-heading">14. Pagination</h3>
              <div className="ds-pagination-row">
                <button
                  type="button"
                  className="ds-pag-btn arrow"
                  onClick={() => setActivePage(Math.max(1, activePage - 1))}
                >
                  ‹
                </button>
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    type="button"
                    className={`ds-pag-btn ${activePage === num ? 'active' : ''}`}
                    onClick={() => setActivePage(num)}
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  className="ds-pag-btn arrow"
                  onClick={() => setActivePage(Math.min(5, activePage + 1))}
                >
                  ›
                </button>
              </div>
            </section>

            {/* 15. Progress Bar */}
            <section className="ds-card ds-progress-card">
              <h3 className="ds-card-heading">15. Progress Bar</h3>
              <div className="ds-progress-row">
                <div className="ds-progress-track">
                  <div className="ds-progress-fill" style={{ width: '70%' }} />
                </div>
                <span className="ds-progress-text">70%</span>
              </div>
            </section>
          </div>
        </div>

        {/* ==================================================================
            Row 5: 16. Shadows & Elevation | 17. Border Radius
            ================================================================== */}
        <div className="ds-row ds-row-2col">
          {/* 16. Shadows & Elevation */}
          <section className="ds-card ds-shadows-card">
            <h3 className="ds-card-heading">16. Shadows & Elevation</h3>
            <div className="ds-elevation-grid">
              <div className="ds-elevation-item">
                <div className="ds-shadow-box level-0" />
                <span className="ds-elev-name">Level 0</span>
                <span className="ds-elev-role">None</span>
              </div>
              <div className="ds-elevation-item">
                <div className="ds-shadow-box level-1" />
                <span className="ds-elev-name">Level 1</span>
                <span className="ds-elev-role">Subtle</span>
              </div>
              <div className="ds-elevation-item">
                <div className="ds-shadow-box level-2" />
                <span className="ds-elev-name">Level 2</span>
                <span className="ds-elev-role">Card</span>
              </div>
              <div className="ds-elevation-item">
                <div className="ds-shadow-box level-3" />
                <span className="ds-elev-name">Level 3</span>
                <span className="ds-elev-role">Modal</span>
              </div>
            </div>
          </section>

          {/* 17. Border Radius */}
          <section className="ds-card ds-radius-card">
            <h3 className="ds-card-heading">17. Border Radius</h3>
            <div className="ds-radius-grid">
              <div className="ds-radius-item">
                <div className="ds-radius-box r-4" />
                <span className="ds-radius-val">4px</span>
                <span className="ds-radius-role">Small</span>
              </div>
              <div className="ds-radius-item">
                <div className="ds-radius-box r-8" />
                <span className="ds-radius-val">8px</span>
                <span className="ds-radius-role">Default</span>
              </div>
              <div className="ds-radius-item">
                <div className="ds-radius-box r-12" />
                <span className="ds-radius-val">12px</span>
                <span className="ds-radius-role">Large</span>
              </div>
              <div className="ds-radius-item">
                <div className="ds-radius-box r-16" />
                <span className="ds-radius-val">16px</span>
                <span className="ds-radius-role">Extra Large</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ----------------------------------------------------------------------
          Bottom Footer Bar
          ---------------------------------------------------------------------- */}
      <footer className="ds-footer">
        <div className="ds-footer-left">
          <span className="ds-footer-crown">👑</span>
          <span className="ds-footer-brand">VYAPARI DARBAAR</span>
          <span className="ds-footer-title">Admin Panel Design System</span>
          <div className="ds-footer-divider">
            <FiligreeDivider color="#c89e3a" />
          </div>
        </div>

        <div className="ds-footer-right">
          <span>Indian Commodities</span>
          <span className="ds-pipe">|</span>
          <span>Global Opportunities</span>
          <span className="ds-pipe">|</span>
          <span>Stronger Traders</span>
          <span className="ds-pipe">|</span>
          <span className="ds-highlight">Brighter Bharat »</span>
        </div>
      </footer>
    </div>
  );
}
