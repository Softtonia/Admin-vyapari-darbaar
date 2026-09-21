import React, { useState, useEffect } from 'react';
import mandiBannerThumb from '../assets/mandi_banner_thumb.png';
import commMakhana from '../assets/comm_makhana.png';
import {
  getCommodityOptions,
  getStateOptions,
  getMandiOptions,
} from '../api/commodityService';
import './AddMandiRate.css';

export default function AddMandiRate({ onBack }) {
  // Form States
  const [commodity, setCommodity] = useState('Makhana (Fox Nut)');
  const [stateName, setStateName] = useState('Bihar');
  const [mandiName, setMandiName] = useState('Darbhanga Mandi');
  const [date, setDate] = useState('17 Sep 2026');
  const [priceUnit, setPriceUnit] = useState('Quintal (100 Kg)');
  const [minPrice, setMinPrice] = useState('1,080');
  const [modalPrice, setModalPrice] = useState('1,250');
  const [maxPrice, setMaxPrice] = useState('1,420');
  const [prevModalPrice, setPrevModalPrice] = useState('1,220');
  const [gradeVariety, setGradeVariety] = useState('Premium');
  const [arrivalQty, setArrivalQty] = useState('500');
  const [arrivalUnit, setArrivalUnit] = useState('Quintal');
  const [remarks, setRemarks] = useState('Good quality, steady demand in local market.');
  const [addAnother, setAddAnother] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  // Timeframe for right chart
  const [trendRange, setTrendRange] = useState('7D');

  // Master options from backend
  const [commoditiesList, setCommoditiesList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [mandisList, setMandisList] = useState([]);

  useEffect(() => {
    let isMounted = true;

    getCommodityOptions()
      .then((res) => {
        if (isMounted && res) {
          const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
          if (list.length > 0) setCommoditiesList(list);
        }
      })
      .catch(() => {});

    getStateOptions()
      .then((res) => {
        if (isMounted && res) {
          const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
          if (list.length > 0) setStatesList(list);
        }
      })
      .catch(() => {});

    getMandiOptions()
      .then((res) => {
        if (isMounted && res) {
          const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
          if (list.length > 0) setMandisList(list);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Calculate change vs previous modal price
  const calcChange = () => {
    const cur = parseFloat(String(modalPrice).replace(/,/g, ''));
    const prev = parseFloat(String(prevModalPrice).replace(/,/g, ''));
    if (isNaN(cur) || isNaN(prev) || prev === 0) return { diff: '+30', pct: '2.5%', pos: true };
    const diff = cur - prev;
    const pct = ((diff / prev) * 100).toFixed(1);
    return {
      diff: diff >= 0 ? `+${diff}` : `${diff}`,
      pct: `${Math.abs(pct)}%`,
      pos: diff >= 0,
    };
  };

  const changeInfo = calcChange();

  const handleSave = (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setToastMsg('Mandi rate saved successfully!');
      setTimeout(() => {
        setToastMsg(null);
        if (!addAnother && onBack) {
          onBack();
        }
      }, 1500);
    }, 600);
  };

  const recentRatesData = [
    { date: '17 Sep 2026', min: '1,080', modal: '1,250', max: '1,420', change: '↑ 2.5%', pos: true },
    { date: '16 Sep 2026', min: '1,050', modal: '1,220', max: '1,400', change: '↑ 1.7%', pos: true },
    { date: '15 Sep 2026', min: '1,030', modal: '1,200', max: '1,380', change: '↓ 1.6%', pos: false },
    { date: '14 Sep 2026', min: '1,040', modal: '1,220', max: '1,390', change: '↑ 3.4%', pos: true },
    { date: '13 Sep 2026', min: '1,000', modal: '1,180', max: '1,350', change: '↑ 0.9%', pos: true },
  ];

  return (
    <div className="add-mandi-rate-page">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="amr-toast">
          <span>✓ {toastMsg}</span>
        </div>
      )}

      {/* Top Breadcrumb & Page Header */}
      <div className="amr-top-header-row">
        <div className="amr-header-left">
          <button type="button" className="amr-back-btn" onClick={onBack}>
            <span className="amr-back-arrow">←</span> Back to Mandi Rates
          </button>
          <h1 className="amr-page-title">Add / Update Mandi Rate</h1>
          <p className="amr-page-subtitle">
            Add new mandi rate or update existing rates for a selected commodity, mandi and date.
          </p>
        </div>

        {/* Right Header Banner with Sketch & Quote */}
        <div className="amr-header-banner">
          <div className="amr-banner-quote">
            <span className="amr-quote-line">“Real-Time Mandi Rates</span>
            <span className="amr-quote-line">Real Opportunities</span>
            <span className="amr-quote-line">for a Stronger Bharat.”</span>
          </div>
          <div className="amr-banner-thumb-wrap">
            <img src={mandiBannerThumb} alt="Mandi Sacks" className="amr-banner-thumb" />
          </div>
          <div className="amr-banner-divider" />
          <div className="amr-banner-pillars">
            <span>TRADE</span>
            <span>INFORM</span>
            <span>CONNECT</span>
            <span>GROW</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Left Form vs Right Widgets */}
      <div className="amr-main-grid">
        {/* ====================================================================
            Left Column: Form Sections 1 to 4 + Actions
            ==================================================================== */}
        <div className="amr-form-card">
          <form onSubmit={handleSave}>
            {/* Section 1: Select Commodity */}
            <div className="amr-section-block">
              <div className="amr-section-header">
                <span className="amr-sec-icon leaf">🍃</span>
                <h2 className="amr-sec-title">1. Select Commodity</h2>
              </div>
              <div className="amr-field-group">
                <label className="amr-label">
                  Commodity <span className="req">*</span>
                </label>
                <div className="amr-select-commodity-box">
                  <div className="amr-comm-preview">
                    <img src={commMakhana} alt="Makhana" className="amr-comm-thumb" />
                    <span className="amr-comm-name">{commodity}</span>
                  </div>
                  <select
                    className="amr-native-select"
                    value={commodity}
                    onChange={(e) => setCommodity(e.target.value)}
                  >
                    <option value="Makhana (Fox Nut)">Makhana (Fox Nut)</option>
                    <option value="Wheat (Kanak)">Wheat (Kanak)</option>
                    <option value="Rice (Basmati)">Rice (Basmati)</option>
                    <option value="Soybean (Yellow)">Soybean (Yellow)</option>
                    <option value="Mustard (Sarson)">Mustard (Sarson)</option>
                    <option value="Tur / Arhar (Pigeon Pea)">Tur / Arhar (Pigeon Pea)</option>
                    <option value="Chana (Gram)">Chana (Gram)</option>
                    <option value="Maize (Corn)">Maize (Corn)</option>
                    {commoditiesList.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <span className="amr-select-arrow">▼</span>
                </div>
              </div>
            </div>

            {/* Section 2: Select Mandi */}
            <div className="amr-section-block">
              <div className="amr-section-header">
                <span className="amr-sec-icon pin">📍</span>
                <h2 className="amr-sec-title">2. Select Mandi</h2>
              </div>
              <div className="amr-grid-2col">
                <div className="amr-field-group">
                  <label className="amr-label">
                    State <span className="req">*</span>
                  </label>
                  <div className="amr-input-wrapper">
                    <select
                      className="amr-select-input"
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                    >
                      <option value="Bihar">Bihar</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Haryana">Haryana</option>
                      {statesList.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    <span className="amr-select-arrow">▼</span>
                  </div>
                </div>

                <div className="amr-field-group">
                  <label className="amr-label">
                    Mandi <span className="req">*</span>
                  </label>
                  <div className="amr-input-wrapper">
                    <select
                      className="amr-select-input"
                      value={mandiName}
                      onChange={(e) => setMandiName(e.target.value)}
                    >
                      <option value="Darbhanga Mandi">Darbhanga Mandi</option>
                      <option value="Madhubani Mandi">Madhubani Mandi</option>
                      <option value="Muzaffarpur Mandi">Muzaffarpur Mandi</option>
                      <option value="Samastipur Mandi">Samastipur Mandi</option>
                      <option value="Purnia Mandi">Purnia Mandi</option>
                      <option value="Katihar Mandi">Katihar Mandi</option>
                      <option value="Saharsa Mandi">Saharsa Mandi</option>
                      <option value="Begusarai Mandi">Begusarai Mandi</option>
                      {mandisList.map((m) => (
                        <option key={m.id} value={m.name}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                    <span className="amr-select-arrow">▼</span>
                  </div>
                  <div className="amr-mandi-helper">
                    <span>Can't find your mandi?</span>{' '}
                    <a href="#add-mandi" className="amr-helper-link">
                      + Add New Mandi
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Rate Details */}
            <div className="amr-section-block">
              <div className="amr-section-header">
                <span className="amr-sec-icon rupee">₹</span>
                <h2 className="amr-sec-title">3. Rate Details</h2>
              </div>
              <div className="amr-grid-2col" style={{ marginBottom: '14px' }}>
                <div className="amr-field-group">
                  <label className="amr-label">
                    Date <span className="req">*</span>
                  </label>
                  <div className="amr-date-input-wrap">
                    <span className="amr-calendar-icon">📅</span>
                    <input
                      type="text"
                      className="amr-text-input amr-date-input"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="amr-field-group">
                  <label className="amr-label">
                    Price Unit <span className="req">*</span>
                  </label>
                  <div className="amr-input-wrapper">
                    <select
                      className="amr-select-input"
                      value={priceUnit}
                      onChange={(e) => setPriceUnit(e.target.value)}
                    >
                      <option value="Quintal (100 Kg)">Quintal (100 Kg)</option>
                      <option value="Kilogram (1 Kg)">Kilogram (1 Kg)</option>
                      <option value="Metric Tonne (1,000 Kg)">Metric Tonne (1,000 Kg)</option>
                      <option value="Bori / Bag (50 Kg)">Bori / Bag (50 Kg)</option>
                    </select>
                    <span className="amr-select-arrow">▼</span>
                  </div>
                </div>
              </div>

              {/* Min, Modal, Max Prices */}
              <div className="amr-grid-3col" style={{ marginBottom: '14px' }}>
                <div className="amr-field-group">
                  <label className="amr-label">
                    Minimum Price (₹) <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    className="amr-text-input"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>

                <div className="amr-field-group">
                  <label className="amr-label">
                    Modal Price (₹) <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    className="amr-text-input bold"
                    value={modalPrice}
                    onChange={(e) => setModalPrice(e.target.value)}
                  />
                </div>

                <div className="amr-field-group">
                  <label className="amr-label">
                    Maximum Price (₹) <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    className="amr-text-input"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>

              {/* Previous Modal Price & Change */}
              <div className="amr-prev-price-row">
                <div className="amr-field-group" style={{ flex: 1 }}>
                  <label className="amr-label">Previous Modal Price (₹)</label>
                  <input
                    type="text"
                    className="amr-text-input readonly"
                    value={prevModalPrice}
                    onChange={(e) => setPrevModalPrice(e.target.value)}
                  />
                </div>

                <div className="amr-field-group amr-change-group">
                  <label className="amr-label">Change</label>
                  <div className={`amr-change-pill ${changeInfo.pos ? 'pos' : 'neg'}`}>
                    <span>
                      {changeInfo.pos ? '↑' : '↓'} {changeInfo.diff} ({changeInfo.pct})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Additional Information */}
            <div className="amr-section-block">
              <div className="amr-section-header">
                <span className="amr-sec-icon doc">📄</span>
                <h2 className="amr-sec-title">4. Additional Information</h2>
              </div>
              <div className="amr-grid-3col">
                <div className="amr-field-group">
                  <label className="amr-label">Grade / Variety (Optional)</label>
                  <div className="amr-input-wrapper">
                    <select
                      className="amr-select-input"
                      value={gradeVariety}
                      onChange={(e) => setGradeVariety(e.target.value)}
                    >
                      <option value="Premium">Premium</option>
                      <option value="Grade A">Grade A</option>
                      <option value="FAQ (Fair Average Quality)">FAQ (Fair Average Quality)</option>
                      <option value="Desi / Local">Desi / Local</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                    <span className="amr-select-arrow">▼</span>
                  </div>
                </div>

                <div className="amr-field-group">
                  <label className="amr-label">Arrival Quantity (Optional)</label>
                  <div className="amr-addon-input-wrap">
                    <input
                      type="text"
                      className="amr-text-input amr-addon-input"
                      value={arrivalQty}
                      onChange={(e) => setArrivalQty(e.target.value)}
                    />
                    <span className="amr-input-addon">{arrivalUnit}</span>
                  </div>
                </div>

                <div className="amr-field-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="amr-label">Quality Remarks (Optional)</label>
                    <span className="amr-char-count">{remarks.length}/200</span>
                  </div>
                  <input
                    type="text"
                    maxLength={200}
                    className="amr-text-input"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="amr-actions-bar">
              <button type="button" className="amr-btn-cancel" onClick={onBack}>
                Cancel
              </button>

              <div className="amr-actions-right-wrap">
                <label className="amr-checkbox-label">
                  <input
                    type="checkbox"
                    checked={addAnother}
                    onChange={(e) => setAddAnother(e.target.checked)}
                  />
                  <span>Add another entry</span>
                </label>

                <button type="submit" className="amr-btn-save" disabled={isSaving}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  <span>{isSaving ? 'Saving...' : 'Save Rate'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* ====================================================================
            Right Column: Widgets (Recent Rates, Trend Chart, Insights, Guidelines, Pro Tip)
            ==================================================================== */}
        <div className="amr-widgets-col">
          {/* Widget 1: Recent Rates Table */}
          <div className="amr-widget-card">
            <div className="amr-widget-header">
              <div className="amr-w-title-wrap">
                <span className="amr-w-icon">📈</span>
                <h3 className="amr-w-title">Recent Rates (Darbhanga Mandi - Makhana)</h3>
              </div>
              <a href="#view-all" className="amr-w-link">
                View All →
              </a>
            </div>

            <div className="amr-mini-table-wrap">
              <table className="amr-mini-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Min Price (₹)</th>
                    <th>Modal Price (₹)</th>
                    <th>Max Price (₹)</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRatesData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="amr-td-date">{row.date}</td>
                      <td>{row.min}</td>
                      <td className="bold">{row.modal}</td>
                      <td>{row.max}</td>
                      <td>
                        <span className={`amr-mini-change ${row.pos ? 'pos' : 'neg'}`}>
                          {row.change}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Widget 2: Price Trend Chart */}
          <div className="amr-widget-card">
            <div className="amr-widget-header">
              <div className="amr-w-title-wrap">
                <span className="amr-w-icon">📉</span>
                <h3 className="amr-w-title">Price Trend (Modal Price)</h3>
              </div>
              <div className="amr-range-pills">
                {['7D', '1M', '3M', '6M', '1Y'].map((range) => (
                  <button
                    key={range}
                    type="button"
                    className={`amr-range-pill ${trendRange === range ? 'active' : ''}`}
                    onClick={() => setTrendRange(range)}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Trend Line Chart */}
            <div className="amr-chart-box">
              <svg width="100%" height="150" viewBox="0 0 420 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="amrChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y-axis gridlines & labels */}
                <line x1="38" y1="18" x2="410" y2="18" stroke="#f3f4f6" strokeWidth="1" />
                <text x="32" y="22" fill="#9ca3af" fontSize="9" textAnchor="end">1,800</text>

                <line x1="38" y1="52" x2="410" y2="52" stroke="#f3f4f6" strokeWidth="1" />
                <text x="32" y="56" fill="#9ca3af" fontSize="9" textAnchor="end">1,400</text>

                <line x1="38" y1="88" x2="410" y2="88" stroke="#f3f4f6" strokeWidth="1" />
                <text x="32" y="92" fill="#9ca3af" fontSize="9" textAnchor="end">1,000</text>

                <line x1="38" y1="124" x2="410" y2="124" stroke="#f3f4f6" strokeWidth="1" />
                <text x="32" y="128" fill="#9ca3af" fontSize="9" textAnchor="end">600</text>

                {/* Filled gradient area */}
                <polygon
                  points="
                    50,88
                    110,68
                    170,72
                    230,64
                    290,56
                    350,52
                    400,42
                    400,130
                    50,130
                  "
                  fill="url(#amrChartGrad)"
                />

                {/* Chart trend line */}
                <polyline
                  points="
                    50,88
                    110,68
                    170,72
                    230,64
                    290,56
                    350,52
                    400,42
                  "
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points */}
                <circle cx="50" cy="88" r="3" fill="#059669" />
                <circle cx="110" cy="68" r="3" fill="#059669" />
                <circle cx="170" cy="72" r="3" fill="#059669" />
                <circle cx="230" cy="64" r="3" fill="#059669" />
                <circle cx="290" cy="56" r="3" fill="#059669" />
                <circle cx="350" cy="52" r="3" fill="#059669" />
                <circle cx="400" cy="42" r="3.5" fill="#047857" stroke="#fff" strokeWidth="1.5" />

                {/* X-axis date labels */}
                <text x="50" y="142" fill="#9ca3af" fontSize="9" textAnchor="middle">11 Sep</text>
                <text x="110" y="142" fill="#9ca3af" fontSize="9" textAnchor="middle">12 Sep</text>
                <text x="170" y="142" fill="#9ca3af" fontSize="9" textAnchor="middle">13 Sep</text>
                <text x="230" y="142" fill="#9ca3af" fontSize="9" textAnchor="middle">14 Sep</text>
                <text x="290" y="142" fill="#9ca3af" fontSize="9" textAnchor="middle">15 Sep</text>
                <text x="350" y="142" fill="#9ca3af" fontSize="9" textAnchor="middle">16 Sep</text>
                <text x="400" y="142" fill="#9ca3af" fontSize="9" textAnchor="middle">17 Sep</text>
              </svg>
            </div>
          </div>

          {/* 2-Column Info Grid: Market Insights vs Data Guidelines */}
          <div className="amr-insights-grid">
            {/* Market Insights Box */}
            <div className="amr-callout-card green">
              <div className="amr-callout-header">
                <span className="amr-callout-icon">💡</span>
                <span className="amr-callout-title green">Market Insights</span>
              </div>
              <ul className="amr-callout-list">
                <li><span className="amr-chk green">✓</span> Prices up 2.5% compared to previous day.</li>
                <li><span className="amr-chk green">✓</span> Steady demand from wholesalers.</li>
                <li><span className="amr-chk green">✓</span> Good quality arrivals reported.</li>
                <li><span className="amr-chk green">✓</span> Export inquiries increasing.</li>
                <li><span className="amr-chk green">✓</span> Expected to remain stable in coming days.</li>
              </ul>
            </div>

            {/* Data Guidelines Box */}
            <div className="amr-callout-card blue">
              <div className="amr-callout-header">
                <span className="amr-callout-icon">ℹ</span>
                <span className="amr-callout-title blue">Data Guidelines</span>
              </div>
              <ul className="amr-callout-list">
                <li><span className="amr-chk blue">✓</span> Ensure accurate and verified data.</li>
                <li><span className="amr-chk blue">✓</span> Update rates daily for better insights.</li>
                <li><span className="amr-chk blue">✓</span> Use correct unit (Quintal, Kg, etc.).</li>
                <li><span className="amr-chk blue">✓</span> Include grade/variety if available.</li>
                <li><span className="amr-chk blue">✓</span> Add remarks for market condition.</li>
                <li><span className="amr-chk blue">✓</span> Avoid duplicate entries for the same date.</li>
              </ul>
            </div>
          </div>

          {/* Pro Tip Box */}
          <div className="amr-protip-card">
            <div className="amr-protip-icon">🎓</div>
            <div className="amr-protip-content">
              <div className="amr-protip-title">Pro Tip</div>
              <div className="amr-protip-desc">
                Keep mandi rates updated daily to build trust and provide reliable market insights to traders.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
