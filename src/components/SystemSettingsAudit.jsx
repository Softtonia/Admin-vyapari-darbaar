import React, { useState, useEffect, useRef } from 'react';
import './SystemSettingsAudit.css';
import {
  getAdminSiteSettings,
  updateAdminSiteSettings,
  getSiteLogoUrl,
} from '../api/siteSettingService';
import sidebarLogoImg from '../assets/sidebar_logo.png';

export default function SystemSettingsAudit({ defaultTab = 'Site Settings' }) {
  const [activeTab, setActiveTab] = useState(defaultTab || 'Site Settings');
  const [expandedSection, setExpandedSection] = useState('site'); // 'site' expanded by default

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  // Site Settings API State (/api/admin/site-settings)
  const [siteName, setSiteName] = useState('Vyapari Darbar');
  const [siteTitle, setSiteTitle] = useState('');
  const [siteDescription, setSiteDescription] = useState('');
  const [webLogoUrl, setWebLogoUrl] = useState(null);
  const [mobileLogoUrl, setMobileLogoUrl] = useState(null);
  const [faviconUrl, setFaviconUrl] = useState(null);
  const [webLogoFile, setWebLogoFile] = useState(null);
  const [webLogoPreview, setWebLogoPreview] = useState(null);
  const [mobileLogoFile, setMobileLogoFile] = useState(null);
  const [mobileLogoPreview, setMobileLogoPreview] = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);
  const [siteMeta, setSiteMeta] = useState(null);
  const [isLoadingSite, setIsLoadingSite] = useState(false);
  const [isSavingSite, setIsSavingSite] = useState(false);
  const [siteToast, setSiteToast] = useState(null);

  const webLogoInputRef = useRef(null);
  const mobileLogoInputRef = useRef(null);
  const faviconInputRef = useRef(null);

  const showSiteToast = (msg, type = 'success') => {
    setSiteToast({ msg, type });
    setTimeout(() => setSiteToast(null), 4000);
  };

  const loadSiteSettings = () => {
    setIsLoadingSite(true);
    getAdminSiteSettings()
      .then((res) => {
        const item = res?.data || res;
        if (item) {
          setSiteName(item.site_name || 'Vyapari Darbar');
          setSiteTitle(item.site_title || '');
          setSiteDescription(item.site_description || '');
          setWebLogoUrl(item.web_logo || null);
          setMobileLogoUrl(item.mobile_logo || null);
          setFaviconUrl(item.favicon || null);
          setWebLogoPreview(item.web_logo ? getSiteLogoUrl(item.web_logo) : null);
          setMobileLogoPreview(item.mobile_logo ? getSiteLogoUrl(item.mobile_logo) : null);
          setFaviconPreview(item.favicon ? getSiteLogoUrl(item.favicon) : null);
          if (item.favicon) {
            const fUrl = getSiteLogoUrl(item.favicon);
            const link = document.querySelector("link[rel~='icon']");
            if (link) link.href = fUrl;
          }
          setSiteMeta({
            id: item.id || 1,
            created_at: item.created_at,
            updated_at: item.updated_at,
          });
        }
      })
      .catch((err) => {
        console.warn('Failed to load site settings from API:', err);
      })
      .finally(() => {
        setIsLoadingSite(false);
      });
  };

  useEffect(() => {
    loadSiteSettings();
  }, []);

  const handleWebLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showSiteToast('Web logo file size exceeds 2MB limit', 'error');
      return;
    }
    setWebLogoFile(file);
    setWebLogoPreview(URL.createObjectURL(file));
  };

  const handleMobileLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showSiteToast('Mobile logo file size exceeds 2MB limit', 'error');
      return;
    }
    setMobileLogoFile(file);
    setMobileLogoPreview(URL.createObjectURL(file));
  };

  const handleClearWebLogo = () => {
    setWebLogoFile(null);
    setWebLogoPreview(webLogoUrl ? getSiteLogoUrl(webLogoUrl) : null);
    if (webLogoInputRef.current) webLogoInputRef.current.value = '';
  };

  const handleClearMobileLogo = () => {
    setMobileLogoFile(null);
    setMobileLogoPreview(mobileLogoUrl ? getSiteLogoUrl(mobileLogoUrl) : null);
    if (mobileLogoInputRef.current) mobileLogoInputRef.current.value = '';
  };

  const handleFaviconChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showSiteToast('Favicon file size exceeds 2MB limit', 'error');
      return;
    }
    setFaviconFile(file);
    setFaviconPreview(URL.createObjectURL(file));
  };

  const handleClearFavicon = () => {
    setFaviconFile(null);
    setFaviconPreview(faviconUrl ? getSiteLogoUrl(faviconUrl) : null);
    if (faviconInputRef.current) faviconInputRef.current.value = '';
  };

  const handleSaveSiteSettings = async (e) => {
    if (e) e.preventDefault();
    if (!siteName.trim()) {
      showSiteToast('Site Name is required', 'error');
      return;
    }
    setIsSavingSite(true);
    try {
      const payload = {
        site_name: siteName.trim(),
        site_title: siteTitle.trim(),
        site_description: siteDescription.trim(),
      };
      if (webLogoFile) {
        payload.web_logo = webLogoFile;
      }
      if (mobileLogoFile) {
        payload.mobile_logo = mobileLogoFile;
      }
      if (faviconFile) {
        payload.favicon = faviconFile;
      }
      const res = await updateAdminSiteSettings(payload);
      showSiteToast('Site settings updated successfully!', 'success');
      const updated = res?.data || res;
      if (updated) {
        if (updated.site_name) setSiteName(updated.site_name);
        if (updated.site_title !== undefined) setSiteTitle(updated.site_title || '');
        if (updated.site_description !== undefined) setSiteDescription(updated.site_description || '');
        if (updated.web_logo) {
          setWebLogoUrl(updated.web_logo);
          setWebLogoPreview(getSiteLogoUrl(updated.web_logo));
          setWebLogoFile(null);
        }
        if (updated.mobile_logo) {
          setMobileLogoUrl(updated.mobile_logo);
          setMobileLogoPreview(getSiteLogoUrl(updated.mobile_logo));
          setMobileLogoFile(null);
        }
        if (updated.favicon !== undefined) {
          setFaviconUrl(updated.favicon);
          setFaviconPreview(updated.favicon ? getSiteLogoUrl(updated.favicon) : null);
          setFaviconFile(null);
          if (updated.favicon) {
            const fUrl = getSiteLogoUrl(updated.favicon);
            const link = document.querySelector("link[rel~='icon']");
            if (link) link.href = fUrl;
          }
        }
        if (webLogoInputRef.current) webLogoInputRef.current.value = '';
        if (mobileLogoInputRef.current) mobileLogoInputRef.current.value = '';
        if (faviconInputRef.current) faviconInputRef.current.value = '';
        setSiteMeta((prev) => ({
          ...prev,
          updated_at: updated.updated_at || new Date().toISOString(),
        }));
      }
    } catch (err) {
      showSiteToast(err.message || 'Failed to update site settings', 'error');
    } finally {
      setIsSavingSite(false);
    }
  };

  // Form states (System config)
  const [platformName, setPlatformName] = useState('Vyapari Darbaar');
  const [siteUrl, setSiteUrl] = useState('https://www.vyaparidarbaar.com');
  const [adminEmail, setAdminEmail] = useState('admin@vyaparidarbaar.com');
  const [timezone, setTimezone] = useState('Asia/Kolkata (GMT +5:30)');
  const [defaultLanguage, setDefaultLanguage] = useState('English');
  const [currency, setCurrency] = useState('INR (₹)');

  // Feature Toggles state
  const [features, setFeatures] = useState({
    userRegistration: true,
    newsArticles: true,
    traderVerification: true,
    advertisements: true,
    marketplaceListings: true,
    subscriptionPlans: true,
  });

  const toggleFeature = (key) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Filter states for Audit Logs
  const [searchLog, setSearchLog] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All Modules');
  const [actionFilter, setActionFilter] = useState('All Actions');
  const [userFilter, setUserFilter] = useState('All Users');
  const [severityFilter, setSeverityFilter] = useState('All Severity');

  // KPI Data
  const kpiData = [
    {
      title: 'Total System Events',
      value: '12,584',
      trend: '↑ 18.6% vs last month',
      trendType: 'up',
      icon: 'gear',
      colorClass: 'kpi-green',
      sparkBars: [40, 55, 45, 70, 85, 100],
    },
    {
      title: 'Security Events',
      value: '328',
      trend: '↓ 12.4% vs last month',
      trendType: 'down',
      icon: 'shield',
      colorClass: 'kpi-red',
      sparkBars: [80, 60, 75, 45, 55, 30],
    },
    {
      title: 'Admin Actions',
      value: '2,486',
      trend: '↑ 9.8% vs last month',
      trendType: 'up',
      icon: 'user',
      colorClass: 'kpi-blue',
      sparkBars: [30, 45, 40, 65, 80, 95],
    },
    {
      title: 'Data Changes',
      value: '4,932',
      trend: '↑ 16.2% vs last month',
      trendType: 'up',
      icon: 'database',
      colorClass: 'kpi-purple',
      sparkBars: [45, 50, 60, 75, 85, 100],
    },
  ];

  // Audit Logs Rows
  const auditLogs = [
    {
      id: 1,
      date: '17 Sep 2026',
      time: '10:22 AM',
      user: 'Admin',
      userRole: 'Super Admin',
      action: 'Updated',
      actionType: 'updated',
      module: 'Website',
      description: 'Updated homepage banner',
      ip: '103.21.45.67',
      status: 'Success',
    },
    {
      id: 2,
      date: '17 Sep 2026',
      time: '09:48 AM',
      user: 'Rohit Kumar',
      userRole: 'Content Manager',
      action: 'Created',
      actionType: 'created',
      module: 'News',
      description: 'Published new article: Makhana Market Growth',
      ip: '49.36.12.89',
      status: 'Success',
    },
    {
      id: 3,
      date: '17 Sep 2026',
      time: '08:31 AM',
      user: 'Neha Singh',
      userRole: 'Trader Manager',
      action: 'Updated',
      actionType: 'updated',
      module: 'Users',
      description: 'Updated trader verification status',
      ip: '103.21.45.67',
      status: 'Success',
    },
    {
      id: 4,
      date: '16 Sep 2026',
      time: '07:15 PM',
      user: 'System',
      userRole: 'Automated',
      action: 'Login',
      actionType: 'login',
      module: 'Auth',
      description: 'User login successful',
      ip: '-',
      status: 'Success',
    },
    {
      id: 5,
      date: '16 Sep 2026',
      time: '06:42 PM',
      user: 'Amit Verma',
      userRole: 'Marketing Manager',
      action: 'Created',
      actionType: 'created',
      module: 'Ads',
      description: 'Created new advertisement campaign',
      ip: '182.74.33.12',
      status: 'Success',
    },
    {
      id: 6,
      date: '16 Sep 2026',
      time: '05:28 PM',
      user: 'Pooja Mehta',
      userRole: 'Finance Manager',
      action: 'Updated',
      actionType: 'updated',
      module: 'Payments',
      description: 'Updated payment status for order #PAY10248',
      ip: '49.36.12.89',
      status: 'Success',
    },
    {
      id: 7,
      date: '16 Sep 2026',
      time: '04:11 PM',
      user: 'System',
      userRole: 'Automated',
      action: 'Backup',
      actionType: 'backup',
      module: 'System',
      description: 'Automatic database backup completed',
      ip: '-',
      status: 'Success',
    },
    {
      id: 8,
      date: '16 Sep 2026',
      time: '03:56 PM',
      user: 'Karan Sharma',
      userRole: 'Support Executive',
      action: 'Deleted',
      actionType: 'deleted',
      module: 'Content',
      description: 'Deleted draft article',
      ip: '103.21.45.67',
      status: 'Success',
    },
    {
      id: 9,
      date: '16 Sep 2026',
      time: '02:34 PM',
      user: 'Admin',
      userRole: 'Super Admin',
      action: 'Updated',
      actionType: 'updated',
      module: 'Settings',
      description: 'Changed email configuration',
      ip: '103.21.45.67',
      status: 'Success',
    },
    {
      id: 10,
      date: '16 Sep 2026',
      time: '01:20 PM',
      user: 'Sanjay Kumar',
      userRole: 'Moderator',
      action: 'Login',
      actionType: 'login',
      module: 'Auth',
      description: 'User login successful',
      ip: '49.36.12.89',
      status: 'Success',
    },
  ];

  return (
    <div className="sys-settings-page">
      {/* 1. Row 1: 4 KPI Cards */}
      <div className="sys-kpi-row">
        {kpiData.map((kpi, idx) => (
          <div key={idx} className="sys-kpi-card">
            <div className={`sys-kpi-icon-box ${kpi.colorClass}`}>
              {kpi.icon === 'gear' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                </svg>
              )}
              {kpi.icon === 'shield' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v6h-2V7zm0 8h2v2h-2v-2z" />
                </svg>
              )}
              {kpi.icon === 'user' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
              {kpi.icon === 'database' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                </svg>
              )}
            </div>

            <div className="sys-kpi-content">
              <span className="sys-kpi-label">{kpi.title}</span>
              <span className="sys-kpi-value">{kpi.value}</span>
              <span className={`sys-kpi-trend ${kpi.trendType}`}>
                {kpi.trend}
              </span>
            </div>

            <div className={`sys-kpi-sparkline ${kpi.colorClass}`}>
              {kpi.sparkBars.map((h, bIdx) => (
                <span key={bIdx} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 2. Row 2: Tabs Bar */}
      {/* 2. Row 2: Tabs Bar */}
      <div className="sys-tabs-bar">
        <div className="sys-nav-tabs">
          {[
            'Site Settings',
            'General Settings',
            'Email & Notifications',
            'Security',
            'Integrations',
            'Backup & Maintenance',
            'Audit Logs',
          ].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`sys-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Main Split Layout: Left Settings vs Right Audit Logs */}
      <div className="sys-main-split">
        {/* ==================================================================
            Left Panel: Settings (Site Settings vs System Settings)
            ================================================================== */}
        <div className="sys-settings-panel">
          <div className="sys-panel-header">
            <div>
              <h2 className="sys-panel-title">
                {activeTab === 'Site Settings' ? 'Site Settings' : 'System Settings'}
              </h2>
              <p className="sys-panel-subtitle">
                {activeTab === 'Site Settings'
                  ? 'Manage site branding, logos, and platform metadata.'
                  : 'Manage platform configuration and preferences.'}
              </p>
            </div>
            <button
              type="button"
              className="btn-save-settings"
              onClick={handleSaveSiteSettings}
              disabled={isSavingSite}
            >
              {isSavingSite ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {siteToast && (
            <div className={`site-toast-banner ${siteToast.type}`}>
              <span>{siteToast.msg}</span>
              <button
                type="button"
                onClick={() => setSiteToast(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}
              >
                ✕
              </button>
            </div>
          )}

          {activeTab === 'Site Settings' ? (
            /* Dedicated Site Settings Form (Directly integrated with api/admin/site-settings) */
            <div className="site-settings-view">
              <div className="sys-form-grid" style={{ gridTemplateColumns: '1fr' }}>
                <div className="sys-form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label>Site Name <span style={{ color: '#dc2626' }}>*</span></label>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>{siteName.length}/150</span>
                  </div>
                  <input
                    type="text"
                    maxLength={150}
                    placeholder="Enter site name (e.g. Vyapari Darbar)"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                </div>

                <div className="sys-form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label>Site Title / Tagline</label>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>{siteTitle.length}/255</span>
                  </div>
                  <input
                    type="text"
                    maxLength={255}
                    placeholder="Enter site title (e.g. Indian Commodities, Global Opportunities)"
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                  />
                </div>

                <div className="sys-form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label>Site Description</label>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>{siteDescription.length}/5000</span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={5000}
                    placeholder="Provide a comprehensive description of the platform for search engines and traders..."
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '13px',
                      color: '#111827',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Logo Uploads Grid */}
              <div className="site-logo-grid">
                {/* Web Logo */}
                <div className="site-logo-card">
                  <div className="site-logo-header">
                    <span className="site-logo-title">Web Logo</span>
                    <span className="site-logo-badge">Navbar Brand</span>
                  </div>

                  <div className="site-logo-preview-box">
                    {webLogoPreview ? (
                      <img src={webLogoPreview} alt="Web Logo Preview" className="site-logo-img" />
                    ) : (
                      <div className="site-logo-placeholder">
                        <img src={sidebarLogoImg} alt="Default Logo" style={{ height: '36px', opacity: 0.6 }} />
                        <span>No custom logo</span>
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={webLogoInputRef}
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    style={{ display: 'none' }}
                    onChange={handleWebLogoChange}
                  />

                  <div className="site-logo-actions">
                    <button
                      type="button"
                      className="btn-upload-logo"
                      onClick={() => webLogoInputRef.current?.click()}
                    >
                      {webLogoFile ? 'Change File' : webLogoPreview ? 'Replace Logo' : 'Upload Web Logo'}
                    </button>
                    {webLogoFile && (
                      <button
                        type="button"
                        className="btn-clear-logo"
                        onClick={handleClearWebLogo}
                        title="Revert to stored logo"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <span className="site-logo-hint">
                    PNG, JPG, WEBP • Max 2MB {webLogoFile && `(${webLogoFile.name})`}
                  </span>
                </div>

                {/* Mobile Logo */}
                <div className="site-logo-card">
                  <div className="site-logo-header">
                    <span className="site-logo-title">Mobile Logo</span>
                    <span className="site-logo-badge">App & Icon</span>
                  </div>

                  <div className="site-logo-preview-box">
                    {mobileLogoPreview ? (
                      <img src={mobileLogoPreview} alt="Mobile Logo Preview" className="site-logo-img" />
                    ) : (
                      <div className="site-logo-placeholder">
                        <span style={{ fontSize: '24px' }}>📱</span>
                        <span>No mobile logo</span>
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={mobileLogoInputRef}
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    style={{ display: 'none' }}
                    onChange={handleMobileLogoChange}
                  />

                  <div className="site-logo-actions">
                    <button
                      type="button"
                      className="btn-upload-logo"
                      onClick={() => mobileLogoInputRef.current?.click()}
                    >
                      {mobileLogoFile ? 'Change File' : mobileLogoPreview ? 'Replace Logo' : 'Upload Mobile Logo'}
                    </button>
                    {mobileLogoFile && (
                      <button
                        type="button"
                        className="btn-clear-logo"
                        onClick={handleClearMobileLogo}
                        title="Revert to stored logo"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <span className="site-logo-hint">
                    Square ratio recommended • Max 2MB {mobileLogoFile && `(${mobileLogoFile.name})`}
                  </span>
                </div>

                {/* Favicon */}
                <div className="site-logo-card">
                  <div className="site-logo-header">
                    <span className="site-logo-title">Favicon</span>
                    <span className="site-logo-badge">Browser Tab</span>
                  </div>

                  <div className="site-logo-preview-box">
                    {faviconPreview ? (
                      <img
                        src={faviconPreview}
                        alt="Favicon Preview"
                        className="site-logo-img"
                        style={{ maxWidth: '44px', maxHeight: '44px', objectFit: 'contain' }}
                      />
                    ) : (
                      <div className="site-logo-placeholder">
                        <span style={{ fontSize: '24px' }}>🌐</span>
                        <span>No favicon</span>
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={faviconInputRef}
                    accept=".ico,image/x-icon,image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                    style={{ display: 'none' }}
                    onChange={handleFaviconChange}
                  />

                  <div className="site-logo-actions">
                    <button
                      type="button"
                      className="btn-upload-logo"
                      onClick={() => faviconInputRef.current?.click()}
                    >
                      {faviconFile ? 'Change File' : faviconPreview ? 'Replace Favicon' : 'Upload Favicon'}
                    </button>
                    {faviconFile && (
                      <button
                        type="button"
                        className="btn-clear-logo"
                        onClick={handleClearFavicon}
                        title="Revert to stored favicon"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <span className="site-logo-hint">
                    ICO, PNG, SVG • Max 2MB {faviconFile && `(${faviconFile.name})`}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                <button
                  type="button"
                  className="btn-save-settings"
                  onClick={handleSaveSiteSettings}
                  disabled={isSavingSite}
                  style={{ flex: 1 }}
                >
                  {isSavingSite ? 'Saving Settings...' : 'Save Site Settings'}
                </button>
                <button
                  type="button"
                  onClick={loadSiteSettings}
                  disabled={isLoadingSite || isSavingSite}
                  style={{
                    padding: '7px 14px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    background: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    color: '#374151',
                  }}
                >
                  Reload
                </button>
              </div>

              {/* Meta footer */}
              <div className="site-meta-footer">
                <span>Setting ID: #{siteMeta?.id || 1}</span>
                <span>
                  {siteMeta?.updated_at
                    ? `Last updated: ${new Date(siteMeta.updated_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}`
                    : 'Synced with live database'}
                </span>
              </div>
            </div>
          ) : (
            /* Accordion Container for General/Other Settings */
            <div className="sys-accordions-group">
              {/* Accordion 1: Site Configuration (Connected to api/admin/site-settings) */}
              <div className="sys-accordion-card">
                <div
                  className="sys-accordion-header active"
                  onClick={() =>
                    setExpandedSection(expandedSection === 'site' ? '' : 'site')
                  }
                >
                  <div className="sys-acc-title-wrap">
                    <span className="acc-icon">⚙</span>
                    <span className="acc-title">Site Configuration (API Connected)</span>
                  </div>
                  <span className="acc-chevron">
                    {expandedSection === 'site' ? '▲' : '▼'}
                  </span>
                </div>

                {expandedSection === 'site' && (
                  <div className="sys-accordion-body">
                    <div className="sys-form-grid">
                      <div className="sys-form-group">
                        <label>Site Name</label>
                        <input
                          type="text"
                          value={siteName}
                          onChange={(e) => setSiteName(e.target.value)}
                        />
                      </div>

                      <div className="sys-form-group">
                        <label>Site Title</label>
                        <input
                          type="text"
                          value={siteTitle}
                          onChange={(e) => setSiteTitle(e.target.value)}
                        />
                      </div>

                      <div className="sys-form-group">
                        <label>Admin Email</label>
                        <input
                          type="email"
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                        />
                      </div>

                      <div className="sys-form-group">
                        <label>Timezone</label>
                        <select
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                        >
                          <option>Asia/Kolkata (GMT +5:30)</option>
                          <option>UTC (GMT +0:00)</option>
                          <option>America/New_York (GMT -5:00)</option>
                        </select>
                      </div>

                      <div className="sys-form-group">
                        <label>Default Language</label>
                        <select
                          value={defaultLanguage}
                          onChange={(e) => setDefaultLanguage(e.target.value)}
                        >
                          <option>English</option>
                          <option>Hindi (हिन्दी)</option>
                          <option>Gujarati (ગુજરાતી)</option>
                          <option>Marathi (मराठी)</option>
                        </select>
                      </div>

                      <div className="sys-form-group">
                        <label>Currency</label>
                        <select
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                        >
                          <option>INR (₹)</option>
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                        </select>
                      </div>
                    </div>

                  {/* Platform Features Sub-section */}
                  <div className="sys-features-section">
                    <div className="features-header">
                      <span className="features-flag-icon">🔖</span>
                      <span className="features-title">Platform Features</span>
                    </div>

                    <div className="features-grid">
                      {/* Feature 1 */}
                      <div className="feature-item-card">
                        <div className="feat-icon-box feat-blue">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                        <div className="feat-meta">
                          <span className="feat-name">User Registration</span>
                          <span className="feat-desc">Allow new user signups</span>
                        </div>
                        <label className="sys-toggle-switch">
                          <input
                            type="checkbox"
                            checked={features.userRegistration}
                            onChange={() => toggleFeature('userRegistration')}
                          />
                          <span className="sys-toggle-slider" />
                        </label>
                      </div>

                      {/* Feature 2 */}
                      <div className="feature-item-card">
                        <div className="feat-icon-box feat-green">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                        </div>
                        <div className="feat-meta">
                          <span className="feat-name">News & Articles</span>
                          <span className="feat-desc">Enable content publishing</span>
                        </div>
                        <label className="sys-toggle-switch">
                          <input
                            type="checkbox"
                            checked={features.newsArticles}
                            onChange={() => toggleFeature('newsArticles')}
                          />
                          <span className="sys-toggle-slider" />
                        </label>
                      </div>

                      {/* Feature 3 */}
                      <div className="feature-item-card">
                        <div className="feat-icon-box feat-teal">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                          </svg>
                        </div>
                        <div className="feat-meta">
                          <span className="feat-name">Trader Verification</span>
                          <span className="feat-desc">Enable trader verification</span>
                        </div>
                        <label className="sys-toggle-switch">
                          <input
                            type="checkbox"
                            checked={features.traderVerification}
                            onChange={() => toggleFeature('traderVerification')}
                          />
                          <span className="sys-toggle-slider" />
                        </label>
                      </div>

                      {/* Feature 4 */}
                      <div className="feature-item-card">
                        <div className="feat-icon-box feat-amber">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                          </svg>
                        </div>
                        <div className="feat-meta">
                          <span className="feat-name">Advertisements</span>
                          <span className="feat-desc">Enable ad management</span>
                        </div>
                        <label className="sys-toggle-switch">
                          <input
                            type="checkbox"
                            checked={features.advertisements}
                            onChange={() => toggleFeature('advertisements')}
                          />
                          <span className="sys-toggle-slider" />
                        </label>
                      </div>

                      {/* Feature 5 */}
                      <div className="feature-item-card">
                        <div className="feat-icon-box feat-orange">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                          </svg>
                        </div>
                        <div className="feat-meta">
                          <span className="feat-name">Marketplace Listings</span>
                          <span className="feat-desc">Enable buy/sell requirements</span>
                        </div>
                        <label className="sys-toggle-switch">
                          <input
                            type="checkbox"
                            checked={features.marketplaceListings}
                            onChange={() => toggleFeature('marketplaceListings')}
                          />
                          <span className="sys-toggle-slider" />
                        </label>
                      </div>

                      {/* Feature 6 */}
                      <div className="feature-item-card">
                        <div className="feat-icon-box feat-gold">
                          <span>👑</span>
                        </div>
                        <div className="feat-meta">
                          <span className="feat-name">Subscription Plans</span>
                          <span className="feat-desc">Enable premium subscriptions</span>
                        </div>
                        <label className="sys-toggle-switch">
                          <input
                            type="checkbox"
                            checked={features.subscriptionPlans}
                            onChange={() => toggleFeature('subscriptionPlans')}
                          />
                          <span className="sys-toggle-slider" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Email & Notification Settings */}
            <div className="sys-accordion-card">
              <div
                className="sys-accordion-header"
                onClick={() =>
                  setExpandedSection(expandedSection === 'email' ? '' : 'email')
                }
              >
                <div className="sys-acc-title-wrap">
                  <span className="acc-icon">✉</span>
                  <span className="acc-title">Email & Notification Settings</span>
                </div>
                <span className="acc-chevron">
                  {expandedSection === 'email' ? '▲' : '▼'}
                </span>
              </div>
            </div>

            {/* Accordion 3: Security Settings */}
            <div className="sys-accordion-card">
              <div
                className="sys-accordion-header"
                onClick={() =>
                  setExpandedSection(expandedSection === 'sec' ? '' : 'sec')
                }
              >
                <div className="sys-acc-title-wrap">
                  <span className="acc-icon">🔒</span>
                  <span className="acc-title">Security Settings</span>
                </div>
                <span className="acc-chevron">
                  {expandedSection === 'sec' ? '▲' : '▼'}
                </span>
              </div>
            </div>

            {/* Accordion 4: Backup & Maintenance */}
            <div className="sys-accordion-card">
              <div
                className="sys-accordion-header"
                onClick={() =>
                  setExpandedSection(expandedSection === 'backup' ? '' : 'backup')
                }
              >
                <div className="sys-acc-title-wrap">
                  <span className="acc-icon">💾</span>
                  <span className="acc-title">Backup & Maintenance</span>
                </div>
                <span className="acc-chevron">
                  {expandedSection === 'backup' ? '▲' : '▼'}
                </span>
              </div>
            </div>

            {/* Accordion 5: SEO & Meta Settings */}
            <div className="sys-accordion-card">
              <div
                className="sys-accordion-header"
                onClick={() =>
                  setExpandedSection(expandedSection === 'seo' ? '' : 'seo')
                }
              >
                <div className="sys-acc-title-wrap">
                  <span className="acc-icon">🔍</span>
                  <span className="acc-title">SEO & Meta Settings</span>
                </div>
                <span className="acc-chevron">
                  {expandedSection === 'seo' ? '▲' : '▼'}
                </span>
              </div>
            </div>

            {/* Accordion 6: Advanced Settings */}
            <div className="sys-accordion-card">
              <div
                className="sys-accordion-header"
                onClick={() =>
                  setExpandedSection(expandedSection === 'adv' ? '' : 'adv')
                }
              >
                <div className="sys-acc-title-wrap">
                  <span className="acc-icon">⚡</span>
                  <span className="acc-title">Advanced Settings</span>
                </div>
                <span className="acc-chevron">
                  {expandedSection === 'adv' ? '▲' : '▼'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

        {/* ==================================================================
            Right Panel: Live Branding Preview (when Site Settings) or Audit Logs
            ================================================================== */}
        {activeTab === 'Site Settings' ? (
          <div className="sys-logs-panel">
            <div className="sys-logs-header">
              <div>
                <h2 className="sys-panel-title">Live Branding & Search Preview</h2>
                <p className="sys-panel-subtitle">
                  Preview how your site name, tagline, and logo appear to users and search engines.
                </p>
              </div>
              <button
                type="button"
                className="btn-export-logs"
                onClick={() => setActiveTab('Audit Logs')}
                title="Switch to Audit Trail"
              >
                <span>View Audit Logs →</span>
              </button>
            </div>

            {/* Desktop Navbar Preview */}
            <div className="site-preview-card">
              <div className="site-preview-header">
                <span>🖥 Desktop Navbar Preview</span>
              </div>
              <div className="simulated-navbar">
                {webLogoPreview ? (
                  <img src={webLogoPreview} alt="Logo" className="simulated-nav-logo" />
                ) : (
                  <img src={sidebarLogoImg} alt="Default" className="simulated-nav-logo" />
                )}
                <div className="simulated-nav-info">
                  <span className="simulated-nav-name">{siteName || 'Vyapari Darbar'}</span>
                  <span className="simulated-nav-title">
                    {siteTitle || "India's Agricultural Commodity Marketplace"}
                  </span>
                </div>
              </div>

              {/* Mobile Header Preview */}
              <div className="site-preview-header" style={{ marginTop: '14px' }}>
                <span>📱 Mobile Header Preview</span>
              </div>
              <div
                style={{
                  background: '#026544',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#ffffff',
                }}
              >
                {mobileLogoPreview ? (
                  <img
                    src={mobileLogoPreview}
                    alt="Mobile Icon"
                    style={{ width: '24px', height: '24px', borderRadius: '4px', background: '#fff', objectFit: 'contain' }}
                  />
                ) : (
                  <span style={{ fontSize: '18px' }}>🌾</span>
                )}
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{siteName || 'Vyapari Darbar'}</span>
              </div>

              {/* Browser Tab & Favicon Preview */}
              <div className="site-preview-header" style={{ marginTop: '14px' }}>
                <span>📑 Browser Tab & Favicon Preview</span>
              </div>
              <div className="simulated-browser-tab">
                {faviconPreview ? (
                  <img src={faviconPreview} alt="Favicon" className="simulated-tab-favicon" />
                ) : (
                  <span style={{ fontSize: '13px' }}>🌐</span>
                )}
                <span className="simulated-tab-title">{siteTitle || siteName || 'Vyapari Darbar'}</span>
                <span className="simulated-tab-close">✕</span>
              </div>

              {/* Google SERP Snippet Preview */}
              <div className="site-preview-header" style={{ marginTop: '16px' }}>
                <span>🔍 Search Engine Preview (Google SERP)</span>
              </div>
              <div className="simulated-serp">
                <div className="serp-url">https://www.vyaparidarbar.com</div>
                <div className="serp-title">
                  {siteTitle ? `${siteTitle} | ${siteName}` : `${siteName} - Leading Agri Commodity Marketplace`}
                </div>
                <div className="serp-desc">
                  {siteDescription ||
                    'Explore real-time mandi rates, commodity prices, and connect with trusted agricultural traders across India on Vyapari Darbaar.'}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="sys-logs-panel">
            <div className="sys-logs-header">
              <div>
                <h2 className="sys-panel-title">Audit Logs</h2>
                <p className="sys-panel-subtitle">
                  Track all important system activities and changes.
                </p>
              </div>
            <div className="sys-logs-top-actions">
              <button type="button" className="btn-export-logs">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Export Logs</span>
              </button>
              <button
                type="button"
                className="btn-clear-filters"
                onClick={() => {
                  setSearchLog('');
                  setModuleFilter('All Modules');
                  setActionFilter('All Actions');
                  setUserFilter('All Users');
                  setSeverityFilter('All Severity');
                }}
              >
                <span>✕</span>
                <span>Clear Filters</span>
              </button>
            </div>
          </div>

          {/* Filter Toolbar */}
          <div className="sys-logs-filter-toolbar">
            <div className="filter-row-1">
              <div className="logs-search-box">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by user, action, module, description..."
                  value={searchLog}
                  onChange={(e) => setSearchLog(e.target.value)}
                />
              </div>

              <select
                value={moduleFilter}
                onChange={(e) => setModuleFilter(e.target.value)}
                className="logs-select"
              >
                <option>All Modules</option>
                <option>Website</option>
                <option>News</option>
                <option>Users</option>
                <option>Auth</option>
                <option>Ads</option>
                <option>Payments</option>
                <option>System</option>
                <option>Content</option>
                <option>Settings</option>
              </select>

              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="logs-select"
              >
                <option>All Actions</option>
                <option>Updated</option>
                <option>Created</option>
                <option>Login</option>
                <option>Backup</option>
                <option>Deleted</option>
              </select>
            </div>

            <div className="filter-row-2">
              <select
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                className="logs-select"
              >
                <option>All Users</option>
                <option>Admin</option>
                <option>Rohit Kumar</option>
                <option>Neha Singh</option>
                <option>System</option>
              </select>

              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="logs-select"
              >
                <option>All Severity</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <div className="logs-date-picker-box">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>01 Sep 2026 - 17 Sep 2026</span>
              </div>

              <button type="button" className="btn-apply-filters">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Activity Logs Table */}
          <div className="sys-table-section">
            <h3 className="sys-table-title">System Activity Logs (12,584)</h3>

            <div className="sys-table-wrapper">
              <table className="sys-table">
                <thead>
                  <tr>
                    <th style={{ width: '30px' }}>
                      <input type="checkbox" />
                    </th>
                    <th style={{ width: '35px' }}>#</th>
                    <th style={{ width: '100px' }}>Date & Time</th>
                    <th style={{ width: '130px' }}>User</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
                    <th style={{ width: '85px' }}>Module</th>
                    <th>Description</th>
                    <th style={{ width: '100px' }}>IP Address</th>
                    <th style={{ width: '75px', textAlign: 'center' }}>Status</th>
                    <th style={{ width: '35px', textAlign: 'center' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td className="td-id">{log.id}</td>
                      <td className="td-datetime">
                        <span className="td-date">{log.date}</span>
                        <span className="td-time">{log.time}</span>
                      </td>
                      <td className="td-user">
                        <span className="td-user-name">{log.user}</span>
                        <span className="td-user-role">{log.userRole}</span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`act-pill act-${log.actionType}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="td-module">{log.module}</td>
                      <td className="td-desc">{log.description}</td>
                      <td className="td-ip">{log.ip}</td>
                      <td style={{ textAlign: 'center' }}>
                        <span className="status-pill success">{log.status}</span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button type="button" className="btn-log-options">
                          ⋮
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="sys-pagination-row">
              <span className="sys-pagination-info">
                Showing 1 to 10 of 12,584 entries
              </span>

              <div className="sys-page-numbers">
                <button type="button" className="page-nav-btn">‹</button>
                <button type="button" className="page-num-btn active">1</button>
                <button type="button" className="page-num-btn">2</button>
                <button type="button" className="page-num-btn">3</button>
                <button type="button" className="page-num-btn">4</button>
                <button type="button" className="page-num-btn">5</button>
                <span className="page-ellipsis">...</span>
                <button type="button" className="page-num-btn">1,259</button>
                <button type="button" className="page-nav-btn">›</button>
              </div>

              <div className="sys-page-size-box">
                <select defaultValue="10">
                  <option value="10">10 / page</option>
                  <option value="25">25 / page</option>
                  <option value="50">50 / page</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}
