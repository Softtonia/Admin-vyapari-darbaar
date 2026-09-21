import React, { useState, useRef } from 'react';
import mandiBannerThumb from '../assets/mandi_banner_thumb.png';
import './ImportMandiRates.css';

export default function ImportMandiRates({ onBack }) {
  // Stepper state: 1 = Upload File, 2 = Map Columns, 3 = Preview & Validate, 4 = Import
  const [currentStep, setCurrentStep] = useState(1);

  // File upload state
  const [uploadedFile, setUploadedFile] = useState({
    name: 'Mandi_Rates_Sept2026.xlsx',
    size: '245 KB',
  });
  const [isDragging, setIsDragging] = useState(false);
  const [skipErrors, setSkipErrors] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      const sizeKb = Math.round(file.size / 1024);
      setUploadedFile({
        name: file.name,
        size: sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`,
      });
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeKb = Math.round(file.size / 1024);
      setUploadedFile({
        name: file.name,
        size: sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`,
      });
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDownloadTemplate = (type = 'xlsx') => {
    const headers = 'Commodity,State,Mandi,Date,Min_Price,Modal_Price,Max_Price,Unit,Grade,Variety\n';
    const sample = 'Makhana,Bihar,Darbhanga,17-09-2026,1080,1250,1420,Quintal,A,-\n';
    const blob = new Blob([headers + sample], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mandi_Rates_Template.${type === 'xlsx' ? 'xlsx' : 'csv'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!uploadedFile) {
      setToastMsg('Please select a file to import');
      setTimeout(() => setToastMsg(null), 3000);
      return;
    }
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      setToastMsg('12 mandi rates imported successfully!');
      setTimeout(() => {
        setToastMsg(null);
        if (onBack) onBack();
      }, 1500);
    }, 800);
  };

  // Preview Data matching the screenshot
  const previewData = [
    {
      id: 1,
      commodity: 'Makhana',
      state: 'Bihar',
      mandi: 'Darbhanga',
      date: '17-09-2026',
      min: '1,080',
      modal: '1,250',
      max: '1,420',
      unit: 'Quintal',
      grade: 'A',
      variety: '-',
    },
    {
      id: 2,
      commodity: 'Maize',
      state: 'Bihar',
      mandi: 'Purnea',
      date: '17-09-2026',
      min: '1,850',
      modal: '1,920',
      max: '2,050',
      unit: 'Quintal',
      grade: 'FAQ',
      variety: '-',
    },
    {
      id: 3,
      commodity: 'Wheat',
      state: 'Madhya Pradesh',
      mandi: 'Indore',
      date: '17-09-2026',
      min: '2,150',
      modal: '2,280',
      max: '2,410',
      unit: 'Quintal',
      grade: 'FAQ',
      variety: 'Lokwan',
    },
    {
      id: 4,
      commodity: 'Rice',
      state: 'Uttar Pradesh',
      mandi: 'Lakhimpur',
      date: '17-09-2026',
      min: '1,980',
      modal: '2,100',
      max: '2,250',
      unit: 'Quintal',
      grade: 'Steam',
      variety: '-',
    },
    {
      id: 5,
      commodity: 'Tur (Arhar)',
      state: 'Maharashtra',
      mandi: 'Akola',
      date: '17-09-2026',
      min: '6,200',
      modal: '6,450',
      max: '6,800',
      unit: 'Quintal',
      grade: 'FAQ',
      variety: '-',
    },
  ];

  return (
    <div className="import-mandi-rates-page">
      {/* Toast */}
      {toastMsg && (
        <div className="imr-toast">
          <span>✓ {toastMsg}</span>
        </div>
      )}

      {/* Top Header Row */}
      <div className="imr-top-header-row">
        <div className="imr-header-left">
          <button type="button" className="imr-back-btn" onClick={onBack}>
            <span className="imr-back-arrow">←</span> Back to Mandi Rates
          </button>
          <h1 className="imr-page-title">Import Mandi Rates</h1>
          <p className="imr-page-subtitle">
            Bulk upload mandi rate data using Excel or CSV files. Save time and keep the market data updated.
          </p>
        </div>

        {/* Right Header Banner with Sketch & Quote */}
        <div className="imr-header-banner">
          <div className="imr-banner-quote">
            <span className="imr-quote-line">“Better Data</span>
            <span className="imr-quote-line">Stronger Markets</span>
            <span className="imr-quote-line">A Prosperous Bharat.”</span>
          </div>
          <div className="imr-banner-thumb-wrap">
            <img src={mandiBannerThumb} alt="Mandi Sacks" className="imr-banner-thumb" />
          </div>
          <div className="imr-banner-divider" />
          <div className="imr-banner-pillars">
            <span>TRADE</span>
            <span>INFORM</span>
            <span>CONNECT</span>
            <span>GROW</span>
          </div>
        </div>
      </div>

      {/* Horizontal Stepper */}
      <div className="imr-stepper-bar">
        <div className={`imr-step-item ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}>
          <span className="imr-step-circle">1</span>
          <div className="imr-step-meta">
            <span className="imr-step-name">Upload File</span>
            <span className="imr-step-desc">Select and upload file</span>
          </div>
        </div>
        <div className="imr-step-connector" />

        <div className={`imr-step-item ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}>
          <span className="imr-step-circle">2</span>
          <div className="imr-step-meta">
            <span className="imr-step-name">Map Columns</span>
            <span className="imr-step-desc">Match your data</span>
          </div>
        </div>
        <div className="imr-step-connector" />

        <div className={`imr-step-item ${currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : ''}`}>
          <span className="imr-step-circle">3</span>
          <div className="imr-step-meta">
            <span className="imr-step-name">Preview & Validate</span>
            <span className="imr-step-desc">Check for errors</span>
          </div>
        </div>
        <div className="imr-step-connector" />

        <div className={`imr-step-item ${currentStep === 4 ? 'active' : ''}`}>
          <span className="imr-step-circle">4</span>
          <div className="imr-step-meta">
            <span className="imr-step-name">Import</span>
            <span className="imr-step-desc">Save to database</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Upload & Template vs Right Guidelines & Help */}
      <div className="imr-top-grid">
        {/* Card 1: Upload File */}
        <div className="imr-card imr-upload-card">
          <div className="imr-card-header">
            <span className="imr-card-icon">📤</span>
            <div>
              <h2 className="imr-card-title">1. Upload File</h2>
              <p className="imr-card-sub">Upload an Excel (.xlsx) or CSV file with mandi rate data.</p>
            </div>
          </div>

          {/* Drag & Drop Box */}
          <div
            className={`imr-drop-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".xlsx,.xls,.csv"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
            <div className="imr-cloud-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="m12 12 4 4m-4-4-4 4m4-4v9" />
              </svg>
            </div>
            <span className="imr-drop-title">Drag & drop your file here</span>
            <span className="imr-drop-or">or</span>
            <button
              type="button"
              className="imr-btn-choose"
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
            >
              Choose File
            </button>
            <span className="imr-drop-hint">
              Supported formats: .xlsx, .xls, .csv (Max file size: 10 MB)
            </span>
          </div>

          {/* Selected File Card */}
          {uploadedFile && (
            <div className="imr-file-selected-row">
              <div className="imr-file-pill">
                <div className="imr-excel-badge">
                  <span>📊</span>
                </div>
                <div className="imr-file-info">
                  <span className="imr-file-name">{uploadedFile.name}</span>
                  <span className="imr-file-size">{uploadedFile.size}</span>
                </div>
              </div>
              <div className="imr-file-actions">
                <span className="imr-file-check" title="File ready">✔</span>
                <button
                  type="button"
                  className="imr-file-remove-btn"
                  onClick={handleRemoveFile}
                  title="Remove file"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Card 2: Download Template */}
        <div className="imr-card imr-template-card">
          <div className="imr-card-header">
            <span className="imr-card-icon">📥</span>
            <div>
              <h2 className="imr-card-title">Download Template</h2>
              <p className="imr-card-sub">
                Use our template file with the correct format and column structure to avoid errors.
              </p>
            </div>
          </div>

          <div className="imr-template-buttons">
            <button
              type="button"
              className="imr-btn-template-excel"
              onClick={() => handleDownloadTemplate('xlsx')}
            >
              <span className="imr-tmpl-icon">📊</span>
              <span>Download Excel Template (.xlsx)</span>
            </button>

            <button
              type="button"
              className="imr-btn-template-csv"
              onClick={() => handleDownloadTemplate('csv')}
            >
              <span className="imr-tmpl-icon">📄</span>
              <span>Download CSV Template (.csv)</span>
            </button>
          </div>

          <div className="imr-template-includes">
            <h4 className="imr-tmpl-inc-title">Template Includes</h4>
            <ul className="imr-tmpl-list">
              <li><span className="imr-chk">✓</span> Commodity name</li>
              <li><span className="imr-chk">✓</span> State and Mandi name</li>
              <li><span className="imr-chk">✓</span> Minimum, Modal and Maximum price</li>
              <li><span className="imr-chk">✓</span> Date (DD-MM-YYYY)</li>
              <li><span className="imr-chk">✓</span> Unit (Quintal/Kg)</li>
              <li><span className="imr-chk">✓</span> Optional fields (Grade, Variety, Arrival)</li>
            </ul>
          </div>
        </div>

        {/* Card 3: Right Guidelines & Support */}
        <div className="imr-sidebar-col">
          {/* File Format Guidelines */}
          <div className="imr-guide-card warm">
            <div className="imr-guide-header">
              <span className="imr-guide-icon">📖</span>
              <div>
                <h3 className="imr-guide-title">File Format Guidelines</h3>
                <p className="imr-guide-sub">Please follow these guidelines to ensure successful import.</p>
              </div>
            </div>
            <ul className="imr-guide-list">
              <li><span className="imr-chk green">✓</span> Use the provided template file.</li>
              <li><span className="imr-chk green">✓</span> Keep the column headers unchanged.</li>
              <li><span className="imr-chk green">✓</span> Date format: DD-MM-YYYY (e.g. 17-09-2026)</li>
              <li><span className="imr-chk green">✓</span> Use valid commodity names.</li>
              <li><span className="imr-chk green">✓</span> Use valid state and mandi names.</li>
              <li><span className="imr-chk green">✓</span> Enter numeric values for prices (no text).</li>
              <li><span className="imr-chk green">✓</span> Use consistent units (Quintal, Kg, etc.).</li>
              <li><span className="imr-chk green">✓</span> Remove merged cells.</li>
              <li><span className="imr-chk green">✓</span> Maximum file size: 10 MB.</li>
            </ul>
          </div>

          {/* Common Errors to Avoid */}
          <div className="imr-guide-card error">
            <div className="imr-guide-header">
              <span className="imr-guide-icon error">❗</span>
              <h3 className="imr-guide-title error">Common Errors to Avoid</h3>
            </div>
            <ul className="imr-guide-list">
              <li><span className="imr-cross">✕</span> Missing mandatory fields</li>
              <li><span className="imr-cross">✕</span> Incorrect date format</li>
              <li><span className="imr-cross">✕</span> Text in price columns</li>
              <li><span className="imr-cross">✕</span> Invalid mandi or commodity names</li>
              <li><span className="imr-cross">✕</span> Extra or duplicate columns</li>
            </ul>
          </div>

          {/* Need Help Box */}
          <div className="imr-help-card">
            <div className="imr-help-header">
              <span className="imr-help-icon">🎧</span>
              <div>
                <h3 className="imr-help-title">Need Help?</h3>
                <p className="imr-help-sub">If you face any issues, contact our support team.</p>
              </div>
            </div>
            <div className="imr-help-actions">
              <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="imr-btn-help whatsapp">
                <span>💬</span> Chat on WhatsApp
              </a>
              <a href="mailto:support@vyaparidarbaar.com" className="imr-btn-help email">
                <span>✉</span> support@vyaparidarbaar.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: 2. Data Preview Card */}
      <div className="imr-card imr-preview-card">
        <div className="imr-preview-header">
          <div className="imr-preview-title-wrap">
            <span className="imr-preview-icon">👁</span>
            <div>
              <h2 className="imr-card-title">2. Data Preview</h2>
              <p className="imr-card-sub">A preview of your file data. Check and confirm before importing.</p>
            </div>
          </div>
          <div className="imr-preview-badges">
            <span className="imr-badge-valid">
              <span className="imr-badge-chk">✓</span> 12 valid rows
            </span>
            <span className="imr-badge-errors">
              <span className="imr-badge-zero">0</span> 0 errors
            </span>
          </div>
        </div>

        {/* Data Preview Table */}
        <div className="imr-table-wrap">
          <table className="imr-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Commodity</th>
                <th>State</th>
                <th>Mandi</th>
                <th>Date</th>
                <th>Min Price (₹)</th>
                <th>Modal Price (₹)</th>
                <th>Max Price (₹)</th>
                <th>Unit</th>
                <th>Grade</th>
                <th>Variety</th>
              </tr>
            </thead>
            <tbody>
              {previewData.map((row) => (
                <tr key={row.id}>
                  <td className="imr-td-id">{row.id}</td>
                  <td className="imr-td-comm">{row.commodity}</td>
                  <td>{row.state}</td>
                  <td>{row.mandi}</td>
                  <td className="imr-td-date">{row.date}</td>
                  <td className="imr-td-num">{row.min}</td>
                  <td className="imr-td-num bold">{row.modal}</td>
                  <td className="imr-td-num">{row.max}</td>
                  <td>{row.unit}</td>
                  <td>{row.grade}</td>
                  <td className="imr-td-variety">{row.variety}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Controls Bar */}
        <div className="imr-actions-bar">
          <button type="button" className="imr-btn-cancel" onClick={onBack}>
            Cancel
          </button>

          <div className="imr-actions-right">
            <label className="imr-checkbox-label">
              <input
                type="checkbox"
                checked={skipErrors}
                onChange={(e) => setSkipErrors(e.target.checked)}
              />
              <span>Skip error rows and import valid data</span>
            </label>

            <button
              type="button"
              className="imr-btn-import"
              onClick={handleImport}
              disabled={isImporting || !uploadedFile}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>{isImporting ? 'Importing...' : 'Import Data'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
