import React, { useState, useEffect, useRef, useCallback } from 'react';
import './SystemSettingsAudit.css';
import {
  getAdminSiteSettings,
  getPublicSiteSettings,
  updateAdminSiteSettings,
  getSiteLogoUrl,
  getAdminSocialLinks,
  updateAdminSocialLinks,
} from '../api/siteSettingService';
import {
  getActivityLogs,
  getActivityLogModules,
  getActivityLogActions,
  deleteActivityLog,
  bulkDeleteActivityLogs,
} from '../api/activityLogService';
import { useSiteSettings } from '../context/SiteSettingsContext';
import sidebarLogoImg from '../assets/sidebar_logo.png';

export default function SystemSettingsAudit({ defaultTab = 'Site Settings' }) {
  const { siteSettings, updateSiteSettingsState } = useSiteSettings();
  const [activeTab, setActiveTab] = useState(defaultTab || 'Site Settings');
  const [expandedSection, setExpandedSection] = useState('site'); // 'site' expanded by default

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  // Site Settings API State (/api/admin/site-settings)
  const [siteName, setSiteName] = useState(siteSettings?.site_name || 'Vyapari Darbar');
  const [siteTitle, setSiteTitle] = useState(siteSettings?.site_title || 'India Premier Mandi Platform');
  const [siteDescription, setSiteDescription] = useState(siteSettings?.site_description || 'Connecting mandi traders across India.');
  const [siteEmail, setSiteEmail] = useState(siteSettings?.email || siteSettings?.site_email || siteSettings?.admin_email || 'contact@vyaparidarbar.com');
  const [phoneNumber, setPhoneNumber] = useState(siteSettings?.phone_number || siteSettings?.phone || '+919876543210');
  const [socialLinks, setSocialLinks] = useState(siteSettings?.social_links || {
    facebook: 'https://facebook.com/vyaparidarbar',
    twitter: 'https://x.com/vyaparidarbar',
    instagram: 'https://instagram.com/vyaparidarbar',
    linkedin: 'https://linkedin.com/company/vyaparidarbar',
    youtube: 'https://youtube.com/@vyaparidarbar',
    whatsapp: 'https://wa.me/919876543210',
    telegram: 'https://t.me/vyaparidarbar',
  });
  const [timezone, setTimezone] = useState(siteSettings?.timezone || 'Asia/Kolkata');
  const [defaultLanguage, setDefaultLanguage] = useState(siteSettings?.default_language || 'en');
  const [currency, setCurrency] = useState(siteSettings?.currency || 'INR');
  const [webLogoUrl, setWebLogoUrl] = useState(siteSettings?.web_logo || null);
  const [mobileLogoUrl, setMobileLogoUrl] = useState(siteSettings?.mobile_logo || null);
  const [faviconUrl, setFaviconUrl] = useState(siteSettings?.favicon || null);
  const [webLogoFile, setWebLogoFile] = useState(null);
  const [webLogoPreview, setWebLogoPreview] = useState(siteSettings?.web_logo ? getSiteLogoUrl(siteSettings.web_logo) : null);
  const [mobileLogoFile, setMobileLogoFile] = useState(null);
  const [mobileLogoPreview, setMobileLogoPreview] = useState(siteSettings?.mobile_logo ? getSiteLogoUrl(siteSettings.mobile_logo) : null);
  const [faviconFile, setFaviconFile] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(siteSettings?.favicon ? getSiteLogoUrl(siteSettings.favicon) : null);
  const [siteMeta, setSiteMeta] = useState(null);
  const [isLoadingSite, setIsLoadingSite] = useState(false);
  const [isSavingSite, setIsSavingSite] = useState(false);
  const [isSavingSocial, setIsSavingSocial] = useState(false);
  const [isLoadingSocial, setIsLoadingSocial] = useState(false);
  const [socialCopyToast, setSocialCopyToast] = useState(null);
  const [socialFilter, setSocialFilter] = useState('all');
  const [siteToast, setSiteToast] = useState(null);

  const webLogoInputRef = useRef(null);
  const mobileLogoInputRef = useRef(null);
  const faviconInputRef = useRef(null);

  const showSiteToast = (msg, type = 'success') => {
    setSiteToast({ msg, type });
    setTimeout(() => setSiteToast(null), 4000);
  };

  const loadSiteSettings = async () => {
    setIsLoadingSite(true);
    try {
      let res;
      try {
        res = await getAdminSiteSettings();
      } catch {
        res = await getPublicSiteSettings();
      }
      const item = res?.data || res;
      if (item) {
        setSiteName(item.site_name || 'Vyapari Darbar');
        setSiteTitle(item.site_title !== undefined ? (item.site_title ?? '') : '');
        setSiteDescription(item.site_description !== undefined ? (item.site_description ?? '') : '');
        setSiteEmail(item.email || item.site_email || item.admin_email || 'contact@vyaparidarbar.com');
        setPhoneNumber(item.phone_number || item.phone || '');
        let parsedSocial = {};
        if (typeof item.social_links === 'string') {
          try {
            parsedSocial = JSON.parse(item.social_links);
          } catch {
            parsedSocial = {};
          }
        } else if (item.social_links && typeof item.social_links === 'object') {
          parsedSocial = item.social_links;
        }
        setSocialLinks({
          facebook: parsedSocial.facebook || '',
          twitter: parsedSocial.twitter || parsedSocial.x || '',
          instagram: parsedSocial.instagram || '',
          linkedin: parsedSocial.linkedin || '',
          youtube: parsedSocial.youtube || '',
          whatsapp: parsedSocial.whatsapp || '',
          telegram: parsedSocial.telegram || '',
        });
        setTimezone(item.timezone || 'Asia/Kolkata');
        setDefaultLanguage(item.default_language || 'en');
        setCurrency(item.currency || 'INR');
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
        updateSiteSettingsState(item);
      }
    } catch (err) {
      console.warn('Failed to load site settings from API:', err);
    } finally {
      setIsLoadingSite(false);
    }
  };

  // Sync state if context loads or changes
  useEffect(() => {
    if (siteSettings && !webLogoFile && !mobileLogoFile && !faviconFile) {
      if (siteSettings.site_name) setSiteName(siteSettings.site_name);
      if (siteSettings.site_title !== undefined) setSiteTitle(siteSettings.site_title || '');
      if (siteSettings.site_description !== undefined) setSiteDescription(siteSettings.site_description || '');
      if (siteSettings.email || siteSettings.site_email || siteSettings.admin_email) {
        setSiteEmail(siteSettings.email || siteSettings.site_email || siteSettings.admin_email);
      }
      if (siteSettings.phone_number !== undefined || siteSettings.phone !== undefined) {
        setPhoneNumber(siteSettings.phone_number || siteSettings.phone || '');
      }
      if (siteSettings.social_links) {
        let sLinks = {};
        if (typeof siteSettings.social_links === 'string') {
          try {
            sLinks = JSON.parse(siteSettings.social_links);
          } catch {
            sLinks = {};
          }
        } else if (typeof siteSettings.social_links === 'object') {
          sLinks = siteSettings.social_links;
        }
        setSocialLinks({
          facebook: sLinks.facebook || '',
          twitter: sLinks.twitter || sLinks.x || '',
          instagram: sLinks.instagram || '',
          linkedin: sLinks.linkedin || '',
          youtube: sLinks.youtube || '',
          whatsapp: sLinks.whatsapp || '',
          telegram: sLinks.telegram || '',
        });
      }
      if (siteSettings.timezone) setTimezone(siteSettings.timezone);
      if (siteSettings.default_language) setDefaultLanguage(siteSettings.default_language);
      if (siteSettings.currency) setCurrency(siteSettings.currency);
      if (siteSettings.web_logo) {
        setWebLogoUrl(siteSettings.web_logo);
        setWebLogoPreview(getSiteLogoUrl(siteSettings.web_logo));
      }
      if (siteSettings.mobile_logo) {
        setMobileLogoUrl(siteSettings.mobile_logo);
        setMobileLogoPreview(getSiteLogoUrl(siteSettings.mobile_logo));
      }
      if (siteSettings.favicon) {
        setFaviconUrl(siteSettings.favicon);
        setFaviconPreview(getSiteLogoUrl(siteSettings.favicon));
      }
    }
  }, [siteSettings]);

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
        email: siteEmail.trim(),
        site_email: siteEmail.trim(),
        admin_email: siteEmail.trim(),
        phone_number: phoneNumber.trim(),
        social_links: {
          facebook: (socialLinks.facebook || '').trim(),
          twitter: (socialLinks.twitter || '').trim(),
          instagram: (socialLinks.instagram || '').trim(),
          linkedin: (socialLinks.linkedin || '').trim(),
          youtube: (socialLinks.youtube || '').trim(),
        },
        timezone: timezone.trim(),
        default_language: defaultLanguage.trim(),
        currency: currency.trim(),
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
        if (updated.email !== undefined || updated.site_email !== undefined || updated.admin_email !== undefined) {
          setSiteEmail(updated.email || updated.site_email || updated.admin_email || '');
        }
        if (updated.phone_number !== undefined || updated.phone !== undefined) {
          setPhoneNumber(updated.phone_number || updated.phone || '');
        }
        if (updated.social_links) {
          let sLinks = {};
          if (typeof updated.social_links === 'string') {
            try {
              sLinks = JSON.parse(updated.social_links);
            } catch {
              sLinks = {};
            }
          } else if (typeof updated.social_links === 'object') {
            sLinks = updated.social_links;
          }
          setSocialLinks({
            facebook: sLinks.facebook || '',
            twitter: sLinks.twitter || sLinks.x || '',
            instagram: sLinks.instagram || '',
            linkedin: sLinks.linkedin || '',
            youtube: sLinks.youtube || '',
            whatsapp: sLinks.whatsapp || '',
            telegram: sLinks.telegram || '',
          });
        }
        if (updated.timezone) setTimezone(updated.timezone);
        if (updated.default_language) setDefaultLanguage(updated.default_language);
        if (updated.currency) setCurrency(updated.currency);

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
        updateSiteSettingsState(updated);
      }
    } catch (err) {
      showSiteToast(err.message || 'Failed to update site settings', 'error');
    } finally {
      setIsSavingSite(false);
    }
  };

  const SOCIAL_PLATFORMS = [
    {
      key: 'facebook',
      name: 'Facebook Page',
      desc: 'Official page for vyapari updates, events, and community',
      placeholder: 'https://facebook.com/vyaparidarbar',
      icon: 'f',
      bgColor: '#1877f2',
    },
    {
      key: 'twitter',
      name: 'X (formerly Twitter)',
      desc: 'Official feed for rapid mandi rates and announcements',
      placeholder: 'https://x.com/vyaparidarbar',
      icon: '𝕏',
      bgColor: '#0f1419',
    },
    {
      key: 'instagram',
      name: 'Instagram Profile',
      desc: 'Visual commodities, daily rate cards, and stories',
      placeholder: 'https://instagram.com/vyaparidarbar',
      icon: '📸',
      bgColor: '#e4405f',
    },
    {
      key: 'linkedin',
      name: 'LinkedIn Company',
      desc: 'Corporate profile, agri-tech networking, and partners',
      placeholder: 'https://linkedin.com/company/vyaparidarbar',
      icon: 'in',
      bgColor: '#0a66c2',
    },
    {
      key: 'youtube',
      name: 'YouTube Channel',
      desc: 'Mandi video broadcasts, market trends, and guides',
      placeholder: 'https://youtube.com/@vyaparidarbar',
      icon: '▶',
      bgColor: '#ff0000',
    },
    {
      key: 'whatsapp',
      name: 'WhatsApp Channel / Group',
      desc: 'Direct trader alerts, bhav broadcasts, and instant support',
      placeholder: 'https://wa.me/919876543210 or https://whatsapp.com/channel/...',
      icon: '💬',
      bgColor: '#25d366',
    },
    {
      key: 'telegram',
      name: 'Telegram Community',
      desc: 'High-speed daily rate broadcasts and trader community',
      placeholder: 'https://t.me/vyaparidarbar',
      icon: '✈',
      bgColor: '#229ed9',
    },
  ];

  const loadSocialLinks = useCallback(async () => {
    setIsLoadingSocial(true);
    try {
      let res;
      try {
        res = await getAdminSocialLinks();
      } catch {
        res = await getPublicSocialLinks();
      }
      const data = res?.data || res?.social_links || res;
      if (data && typeof data === 'object') {
        setSocialLinks((prev) => ({
          ...prev,
          ...data,
        }));
      }
    } catch (err) {
      console.warn('Failed to load social links via dedicated API:', err);
    } finally {
      setIsLoadingSocial(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'Social Links' || activeTab === 'Social Media') {
      loadSocialLinks();
    }
  }, [activeTab, loadSocialLinks]);

  const handleSaveSocialLinks = async (e) => {
    if (e) e.preventDefault();
    setIsSavingSocial(true);
    try {
      let res;
      try {
        res = await updateAdminSocialLinks(socialLinks);
      } catch (patchErr) {
        console.warn('Dedicated social-links patch failed, attempting fallback to site-settings:', patchErr);
        res = await updateAdminSiteSettings({ social_links: socialLinks });
      }

      if (res?.status || res?.data) {
        showSiteToast(res?.message || 'Social links updated successfully!', 'success');
        if (res?.data?.social_links) {
          let updated = res.data.social_links;
          if (typeof updated === 'string') {
            try { updated = JSON.parse(updated); } catch {}
          }
          setSocialLinks((prev) => ({ ...prev, ...updated }));
        }
        updateSiteSettingsState({ social_links: socialLinks });
      } else {
        showSiteToast(res?.message || 'Failed to update social links', 'error');
      }
    } catch (err) {
      showSiteToast(err?.message || 'Network error while saving social links', 'error');
    } finally {
      setIsSavingSocial(false);
    }
  };

  const handleCopySocialLink = (platformKey, url) => {
    if (!url) return;
    navigator.clipboard.writeText(url).then(() => {
      setSocialCopyToast(platformKey);
      setTimeout(() => setSocialCopyToast(null), 2000);
    }).catch(() => {
      showSiteToast('Failed to copy to clipboard', 'error');
    });
  };

  // Form states (System config)
  const [platformName, setPlatformName] = useState('Vyapari Darbaar');
  const [siteUrl, setSiteUrl] = useState('https://www.vyaparidarbaar.com');

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

  // ─── Audit Logs State ───
  const [searchLog, setSearchLog] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All Modules');
  const [actionFilter, setActionFilter] = useState('All Actions');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Live data from API
  const [auditLogs, setAuditLogs] = useState([]);
  const [totalLogs, setTotalLogs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [logsError, setLogsError] = useState(null);

  // Filter options from API
  const [moduleOptions, setModuleOptions] = useState([]);
  const [actionOptions, setActionOptions] = useState([]);

  // Debounce ref for search
  const searchTimerRef = useRef(null);

  // ─── Fetch activity logs ───
  const fetchActivityLogs = useCallback(async (pageNum = 1) => {
    setIsLoadingLogs(true);
    setLogsError(null);
    try {
      const res = await getActivityLogs({
        page: pageNum,
        per_page: perPage,
        search: searchLog || undefined,
        module: moduleFilter !== 'All Modules' ? moduleFilter : undefined,
        action: actionFilter !== 'All Actions' ? actionFilter : undefined,
        date_from: dateFrom || undefined,
        date_to: dateTo || undefined,
      });
      const data = res?.data || res;
      setAuditLogs(data?.items || []);
      setTotalLogs(data?.total_logs ?? data?.pagination?.total ?? 0);
      setCurrentPage(data?.pagination?.current_page ?? pageNum);
      setLastPage(data?.pagination?.last_page ?? 1);
    } catch (err) {
      console.error('Failed to fetch activity logs:', err);
      setLogsError(err.message || 'Failed to load activity logs');
      setAuditLogs([]);
    } finally {
      setIsLoadingLogs(false);
    }
  }, [perPage, searchLog, moduleFilter, actionFilter, dateFrom, dateTo]);

  // Fetch filter options on mount
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [modRes, actRes] = await Promise.all([
          getActivityLogModules(),
          getActivityLogActions(),
        ]);
        setModuleOptions(modRes?.data || []);
        setActionOptions(actRes?.data || []);
      } catch (err) {
        console.warn('Could not load filter options:', err);
      }
    };
    loadFilterOptions();
  }, []);

  // Fetch logs when tab switches to Audit Logs or filters/page change
  useEffect(() => {
    if (activeTab === 'Audit Logs') {
      fetchActivityLogs(currentPage);
    }
  }, [activeTab, currentPage, perPage, moduleFilter, actionFilter, dateFrom, dateTo]);

  // Debounced search: trigger after 500ms of no typing
  useEffect(() => {
    if (activeTab !== 'Audit Logs') return;
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setCurrentPage(1);
      fetchActivityLogs(1);
    }, 500);
    return () => clearTimeout(searchTimerRef.current);
  }, [searchLog]);

  // ─── Audit Logs Selection & Deletion State ───
  const [selectedLogIds, setSelectedLogIds] = useState([]);
  const [activeActionMenuId, setActiveActionMenuId] = useState(null);
  const [viewModalLog, setViewModalLog] = useState(null);
  const [deleteSingleLog, setDeleteSingleLog] = useState(null);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const [isDeletingLogs, setIsDeletingLogs] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [logToast, setLogToast] = useState(null);

  const headerCheckboxRef = useRef(null);

  const showLogToast = (msg, type = 'success') => {
    setLogToast({ msg, type });
    setTimeout(() => setLogToast(null), 4500);
  };

  // Multi-select helpers
  const isAllCurrentPageSelected = auditLogs.length > 0 && auditLogs.every((l) => selectedLogIds.includes(l.id));
  const isSomeCurrentPageSelected = auditLogs.some((l) => selectedLogIds.includes(l.id)) && !isAllCurrentPageSelected;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isSomeCurrentPageSelected;
    }
  }, [isSomeCurrentPageSelected]);

  // Click outside to close row action menu
  useEffect(() => {
    const handleGlobalClick = () => setActiveActionMenuId(null);
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  const handleClearSelection = () => {
    setSelectedLogIds([]);
  };

  const handleToggleSelectAll = () => {
    if (isAllCurrentPageSelected) {
      const pageIds = new Set(auditLogs.map((l) => l.id));
      setSelectedLogIds((prev) => prev.filter((id) => !pageIds.has(id)));
    } else {
      const newIds = new Set(selectedLogIds);
      auditLogs.forEach((l) => newIds.add(l.id));
      setSelectedLogIds(Array.from(newIds));
    }
  };

  const handleToggleSelectRow = (id) => {
    setSelectedLogIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Action: Single Delete
  const handleConfirmSingleDelete = async () => {
    if (!deleteSingleLog) return;
    setIsDeletingLogs(true);
    setModalError(null);
    try {
      await deleteActivityLog(deleteSingleLog.id);
      showLogToast(`Activity log #${deleteSingleLog.id} deleted successfully!`, 'success');
      setSelectedLogIds((prev) => prev.filter((id) => id !== deleteSingleLog.id));
      setDeleteSingleLog(null);
      fetchActivityLogs(currentPage);
    } catch (err) {
      const msg = err?.data?.message || err?.message || 'Failed to delete activity log';
      setModalError(msg);
      showLogToast(msg, 'error');
    } finally {
      setIsDeletingLogs(false);
    }
  };

  // Action: Bulk Delete Selected
  const handleConfirmBulkDelete = async () => {
    const cleanIds = selectedLogIds
      .map((id) => Number(id))
      .filter((id) => !isNaN(id) && id > 0);

    if (cleanIds.length === 0) {
      const msg = 'Please select at least one activity log to delete.';
      setModalError(msg);
      showLogToast(msg, 'error');
      return;
    }

    setIsDeletingLogs(true);
    setModalError(null);
    try {
      const res = await bulkDeleteActivityLogs({ ids: cleanIds });
      showLogToast(res?.message || `${cleanIds.length} activity logs deleted successfully!`, 'success');
      setSelectedLogIds([]);
      setIsBulkDeleteModalOpen(false);
      fetchActivityLogs(currentPage);
    } catch (err) {
      const msg = err?.data?.message || err?.message || 'Failed to bulk delete activity logs';
      setModalError(msg);
      showLogToast(msg, 'error');
    } finally {
      setIsDeletingLogs(false);
    }
  };

  // Action: Delete All Logs
  const handleConfirmDeleteAll = async () => {
    setIsDeletingLogs(true);
    setModalError(null);
    try {
      const res = await bulkDeleteActivityLogs({ delete_all: true });
      showLogToast(res?.message || 'All activity logs deleted successfully!', 'success');
      setSelectedLogIds([]);
      setIsDeleteAllModalOpen(false);
      setCurrentPage(1);
      fetchActivityLogs(1);
    } catch (err) {
      const msg = err?.data?.message || err?.message || 'Failed to clear all activity logs';
      setModalError(msg);
      showLogToast(msg, 'error');
    } finally {
      setIsDeletingLogs(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= lastPage && page !== currentPage) {
      setSelectedLogIds([]);
      setCurrentPage(page);
    }
  };

  const handlePerPageChange = (newPerPage) => {
    setSelectedLogIds([]);
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedLogIds([]);
    setSearchLog('');
    setModuleFilter('All Modules');
    setActionFilter('All Actions');
    setDateFrom('');
    setDateTo('');
    setCurrentPage(1);
  };

  const handleApplyFilters = () => {
    setSelectedLogIds([]);
    setCurrentPage(1);
    fetchActivityLogs(1);
  };

  // Build KPI from live total
  const formatNum = (n) => (n || 0).toLocaleString('en-IN');
  const kpiData = [
    {
      title: 'Total System Events',
      value: formatNum(totalLogs),
      trend: `${auditLogs.length} loaded`,
      trendType: 'up',
      icon: 'gear',
      colorClass: 'kpi-green',
      sparkBars: [40, 55, 45, 70, 85, 100],
    },
    {
      title: 'Current Page',
      value: `${currentPage} / ${lastPage}`,
      trend: `${perPage} per page`,
      trendType: 'up',
      icon: 'database',
      colorClass: 'kpi-purple',
      sparkBars: [45, 50, 60, 75, 85, 100],
    },
    {
      title: 'Modules Tracked',
      value: formatNum(moduleOptions.length),
      trend: moduleOptions.slice(0, 3).map((m) => m.module).join(', ') || '—',
      trendType: 'up',
      icon: 'shield',
      colorClass: 'kpi-blue',
      sparkBars: [30, 45, 40, 65, 80, 95],
    },
    {
      title: 'Actions Tracked',
      value: formatNum(actionOptions.length),
      trend: actionOptions.slice(0, 3).map((a) => a.action).join(', ') || '—',
      trendType: 'up',
      icon: 'user',
      colorClass: 'kpi-red',
      sparkBars: [80, 60, 75, 45, 55, 30],
    },
  ];

  // Pagination helper: generate page numbers
  const getPaginationPages = () => {
    const pages = [];
    if (lastPage <= 7) {
      for (let i = 1; i <= lastPage; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(lastPage - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < lastPage - 2) pages.push('...');
      pages.push(lastPage);
    }
    return pages;
  };

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
            'Social Links',
            'Email & Notifications',
            'Security',
            'Integrations',
            'Backup & Maintenance',
            'Audit Logs',
          ].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`sys-tab-btn ${activeTab === tab || (tab === 'Social Links' && activeTab === 'Social Media') ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Main Split Layout: Left Settings vs Right Audit Logs */}
      <div className={`sys-main-split ${activeTab === 'Audit Logs' ? 'full-width' : ''}`}>
        {/* ==================================================================
            Left Panel: Settings (Site Settings vs System Settings)
            Hidden on Audit Logs tab so Audit Logs displays 100% full width
            ================================================================== */}
        {activeTab !== 'Audit Logs' && (
        <div className="sys-settings-panel">
          <div className="sys-panel-header">
            <div>
              <h2 className="sys-panel-title">
                {activeTab === 'Site Settings'
                  ? 'Site Settings'
                  : activeTab === 'Social Media'
                  ? 'Social Media Management'
                  : 'System Settings'}
              </h2>
              <p className="sys-panel-subtitle">
                {activeTab === 'Site Settings'
                  ? 'Manage site branding, logos, and platform metadata.'
                  : activeTab === 'Social Media'
                  ? 'Configure official social profiles, trader community channels, and external links.'
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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '4px' }}>
                  <div className="sys-form-group">
                    <label>Site Email</label>
                    <input
                      type="email"
                      placeholder="contact@vyaparidarbar.com"
                      value={siteEmail}
                      onChange={(e) => setSiteEmail(e.target.value)}
                    />
                  </div>

                  <div className="sys-form-group">
                    <label>Phone Number / Helpline</label>
                    <input
                      type="tel"
                      maxLength={50}
                      placeholder="+919876543210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className="sys-form-group">
                    <label>Timezone</label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
                      <option value="UTC">UTC (GMT +0:00)</option>
                      <option value="America/New_York">America/New_York (EST -5:00)</option>
                      <option value="Europe/London">Europe/London (GMT +0:00)</option>
                      <option value="Asia/Dubai">Asia/Dubai (GST +4:00)</option>
                      <option value="Asia/Singapore">Asia/Singapore (SGT +8:00)</option>
                    </select>
                  </div>

                  <div className="sys-form-group">
                    <label>Default Language</label>
                    <select
                      value={defaultLanguage}
                      onChange={(e) => setDefaultLanguage(e.target.value)}
                    >
                      <option value="en">English (en)</option>
                      <option value="hi">Hindi (हिन्दी)</option>
                      <option value="gu">Gujarati (ગુજરાતી)</option>
                      <option value="mr">Marathi (मराठी)</option>
                      <option value="pa">Punjabi (ਪੰਜਾਬੀ)</option>
                    </select>
                  </div>

                  <div className="sys-form-group">
                    <label>Currency</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="AED">AED (د.إ)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
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
          ) : activeTab === 'Social Links' || activeTab === 'Social Media' ? (
            /* Dedicated Social Links Management View */
            <div className="site-settings-view social-mgmt-container">
              {/* Top Banner with Stats and Actions */}
              <div className="social-mgmt-stats-bar">
                <div className="social-mgmt-stats-left">
                  <div className="social-stat-pill">
                    <span className="social-stat-dot" />
                    <span>Active Channels: <strong className="social-stat-count">{Object.values(socialLinks || {}).filter(u => u && String(u).trim()).length}</strong> / 7</span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', marginLeft: '8px' }}>
                    <button
                      type="button"
                      className={`btn-filter-pill ${socialFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setSocialFilter('all')}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        border: '1px solid #d1d5db',
                        background: socialFilter === 'all' ? '#026544' : '#ffffff',
                        color: socialFilter === 'all' ? '#ffffff' : '#4b5563',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      All (7)
                    </button>
                    <button
                      type="button"
                      className={`btn-filter-pill ${socialFilter === 'configured' ? 'active' : ''}`}
                      onClick={() => setSocialFilter('configured')}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        border: '1px solid #d1d5db',
                        background: socialFilter === 'configured' ? '#026544' : '#ffffff',
                        color: socialFilter === 'configured' ? '#ffffff' : '#4b5563',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Configured ({Object.values(socialLinks || {}).filter(u => u && String(u).trim()).length})
                    </button>
                    <button
                      type="button"
                      className={`btn-filter-pill ${socialFilter === 'pending' ? 'active' : ''}`}
                      onClick={() => setSocialFilter('pending')}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        border: '1px solid #d1d5db',
                        background: socialFilter === 'pending' ? '#026544' : '#ffffff',
                        color: socialFilter === 'pending' ? '#ffffff' : '#4b5563',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Not Set ({7 - Object.values(socialLinks || {}).filter(u => u && String(u).trim()).length})
                    </button>
                  </div>
                </div>

                <div className="social-mgmt-actions">
                  <button
                    type="button"
                    className="btn-social-reload"
                    onClick={loadSocialLinks}
                    disabled={isLoadingSocial || isSavingSocial}
                    title="Reload from API"
                  >
                    <span>↻</span>
                    <span>{isLoadingSocial ? 'Loading...' : 'Reload'}</span>
                  </button>
                  <button
                    type="button"
                    className="btn-social-save"
                    onClick={handleSaveSocialLinks}
                    disabled={isSavingSocial}
                  >
                    <span>💾</span>
                    <span>{isSavingSocial ? 'Saving...' : 'Save Social Links'}</span>
                  </button>
                </div>
              </div>

              {/* Toast Feedback for Copy */}
              {socialCopyToast && (
                <div style={{
                  padding: '8px 14px',
                  background: '#dcfce7',
                  border: '1px solid #86efac',
                  color: '#166534',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>✓</span>
                  <span>Link copied to clipboard successfully!</span>
                </div>
              )}

              {/* Cards List */}
              <div className="social-cards-list">
                {SOCIAL_PLATFORMS.filter(p => {
                  const val = socialLinks[p.key];
                  const hasVal = val && String(val).trim().length > 0;
                  if (socialFilter === 'configured') return hasVal;
                  if (socialFilter === 'pending') return !hasVal;
                  return true;
                }).map((platform) => {
                  const val = socialLinks[platform.key] || '';
                  const isSet = Boolean(val && String(val).trim().length > 0);

                  return (
                    <div key={platform.key} className="social-platform-card">
                      <div className="social-platform-card-header">
                        <div className="social-platform-badge-group">
                          <div
                            className="social-platform-logo-badge"
                            style={{ backgroundColor: platform.bgColor }}
                          >
                            {platform.icon}
                          </div>
                          <div className="social-platform-info">
                            <span className="social-platform-name">{platform.name}</span>
                            <span className="social-platform-desc">{platform.desc}</span>
                          </div>
                        </div>

                        <span className={`social-status-pill ${isSet ? 'active' : 'empty'}`}>
                          {isSet ? 'Active' : 'Not Set'}
                        </span>
                      </div>

                      <div className="social-input-row">
                        <input
                          type="url"
                          className="social-url-input"
                          placeholder={platform.placeholder}
                          value={val}
                          onChange={(e) =>
                            setSocialLinks({
                              ...socialLinks,
                              [platform.key]: e.target.value,
                            })
                          }
                        />

                        <button
                          type="button"
                          className="social-btn-tool"
                          onClick={() => handleCopySocialLink(platform.key, val)}
                          disabled={!isSet}
                          title={isSet ? 'Copy URL' : 'Enter a URL first'}
                        >
                          📋 {socialCopyToast === platform.key ? 'Copied!' : 'Copy'}
                        </button>

                        <a
                          href={isSet ? val : undefined}
                          target="_blank"
                          rel="noreferrer"
                          className="social-btn-tool"
                          style={{
                            textDecoration: 'none',
                            pointerEvents: isSet ? 'auto' : 'none',
                            opacity: isSet ? 1 : 0.45,
                          }}
                          title={isSet ? 'Open in new tab' : 'Enter URL to test'}
                        >
                          ↗ Test
                        </a>

                        {isSet && (
                          <button
                            type="button"
                            className="social-btn-tool"
                            onClick={() =>
                              setSocialLinks({
                                ...socialLinks,
                                [platform.key]: '',
                              })
                            }
                            title="Clear this URL"
                            style={{ color: '#ef4444' }}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Public Portal Live Preview Widget */}
              <div className="social-preview-card">
                <div className="social-preview-header">
                  <span className="social-preview-title">Public Portal Live Preview (Header & Footer)</span>
                  <span style={{ fontSize: '11.5px', opacity: 0.8 }}>
                    Visible to mandi buyers, sellers, and app visitors
                  </span>
                </div>

                <div className="social-preview-icons-bar">
                  {SOCIAL_PLATFORMS.filter(p => socialLinks[p.key] && String(socialLinks[p.key]).trim()).length === 0 ? (
                    <span style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.7)', fontStyle: 'italic' }}>
                      No active channels configured. Enter URLs above and save to display public social badges.
                    </span>
                  ) : (
                    SOCIAL_PLATFORMS.filter(p => socialLinks[p.key] && String(socialLinks[p.key]).trim()).map((p) => (
                      <a
                        key={p.key}
                        href={socialLinks[p.key]}
                        target="_blank"
                        rel="noreferrer"
                        className="social-preview-icon-pill"
                        title={`Open ${p.name}`}
                      >
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: p.bgColor,
                          fontSize: '11px',
                          color: '#ffffff'
                        }}>
                          {p.icon}
                        </span>
                        <span>{p.name.split(' ')[0]}</span>
                        <span style={{ fontSize: '10px', opacity: 0.6 }}>↗</span>
                      </a>
                    ))
                  )}
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  className="btn-save-settings"
                  onClick={handleSaveSocialLinks}
                  disabled={isSavingSocial}
                  style={{ flex: 1, padding: '10px 18px', fontSize: '13.5px' }}
                >
                  {isSavingSocial ? 'Saving Social Channels...' : 'Save Social Media Channels'}
                </button>
                <button
                  type="button"
                  onClick={loadSocialLinks}
                  disabled={isLoadingSocial || isSavingSocial}
                  style={{
                    padding: '8px 18px',
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

              <div className="site-meta-footer" style={{ marginTop: '6px' }}>
                <span>Channels Configured: {Object.values(socialLinks || {}).filter((u) => u && String(u).trim()).length} of 7</span>
                <span>API Endpoint: /api/admin/site-settings/social-links (Postman Spec)</span>
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
                        <label>Site Email</label>
                        <input
                          type="email"
                          placeholder="contact@vyaparidarbar.com"
                          value={siteEmail}
                          onChange={(e) => setSiteEmail(e.target.value)}
                        />
                      </div>

                      <div className="sys-form-group">
                        <label>Timezone</label>
                        <select
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                        >
                          <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
                          <option value="UTC">UTC (GMT +0:00)</option>
                          <option value="America/New_York">America/New_York (EST -5:00)</option>
                          <option value="Europe/London">Europe/London (GMT +0:00)</option>
                          <option value="Asia/Dubai">Asia/Dubai (GST +4:00)</option>
                          <option value="Asia/Singapore">Asia/Singapore (SGT +8:00)</option>
                        </select>
                      </div>

                      <div className="sys-form-group">
                        <label>Default Language</label>
                        <select
                          value={defaultLanguage}
                          onChange={(e) => setDefaultLanguage(e.target.value)}
                        >
                          <option value="en">English (en)</option>
                          <option value="hi">Hindi (हिन्दी)</option>
                          <option value="gu">Gujarati (ગુજરાતી)</option>
                          <option value="mr">Marathi (मराठी)</option>
                          <option value="pa">Punjabi (ਪੰਜਾਬੀ)</option>
                        </select>
                      </div>

                      <div className="sys-form-group">
                        <label>Currency</label>
                        <select
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                        >
                          <option value="INR">INR (₹)</option>
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="AED">AED (د.إ)</option>
                          <option value="GBP">GBP (£)</option>
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
      )}

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
                  ) : activeTab === 'Social Media' ? (
            <div className="sys-logs-panel">
              <div className="sys-logs-header">
                <div>
                  <h2 className="sys-panel-title">Live Social Channels & Public Preview</h2>
                  <p className="sys-panel-subtitle">
                    Real-time preview of how official profiles appear on website headers, footers, and trader apps.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-export-logs"
                  onClick={() => setActiveTab('Site Settings')}
                  title="Switch to Site Settings"
                >
                  <span>Site Settings ⚙</span>
                </button>
              </div>

              {/* Status Summary Banner */}
              <div className="social-preview-summary-card">
                <div className="social-summary-item">
                  <span className="summary-num">
                    {Object.values(socialLinks).filter((u) => u && u.trim()).length} / 7
                  </span>
                  <span className="summary-label">Channels Connected</span>
                </div>
                <div className="social-summary-badges">
                  {socialLinks.facebook && <span className="preview-badge fb">Facebook</span>}
                  {socialLinks.twitter && <span className="preview-badge x">X / Twitter</span>}
                  {socialLinks.instagram && <span className="preview-badge insta">Instagram</span>}
                  {socialLinks.linkedin && <span className="preview-badge in">LinkedIn</span>}
                  {socialLinks.youtube && <span className="preview-badge yt">YouTube</span>}
                  {socialLinks.whatsapp && <span className="preview-badge wa">WhatsApp</span>}
                  {socialLinks.telegram && <span className="preview-badge tg">Telegram</span>}
                  {Object.values(socialLinks).every((u) => !u || !u.trim()) && (
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>No channels configured yet</span>
                  )}
                </div>
              </div>

              {/* Header Navbar Preview */}
              <div className="site-preview-header" style={{ marginTop: '14px' }}>
                <span>🌐 Website Header Utility Bar Preview</span>
              </div>
              <div className="simulated-social-header-bar">
                <div className="social-header-left">
                  <span>📞 {phoneNumber || '+91 98765 43210'}</span>
                  <span>✉ {siteEmail || 'contact@vyaparidarbar.com'}</span>
                </div>
                <div className="social-header-icons">
                  <span className="social-follow-text">Follow Us:</span>
                  {socialLinks.facebook && (
                    <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="preview-social-icon fb" title="Facebook">f</a>
                  )}
                  {socialLinks.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="preview-social-icon x" title="Twitter / X">𝕏</a>
                  )}
                  {socialLinks.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="preview-social-icon insta" title="Instagram">📸</a>
                  )}
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="preview-social-icon in" title="LinkedIn">in</a>
                  )}
                  {socialLinks.youtube && (
                    <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="preview-social-icon yt" title="YouTube">▶</a>
                  )}
                  {socialLinks.whatsapp && (
                    <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="preview-social-icon wa" title="WhatsApp">💬</a>
                  )}
                  {socialLinks.telegram && (
                    <a href={socialLinks.telegram} target="_blank" rel="noreferrer" className="preview-social-icon tg" title="Telegram">✈</a>
                  )}
                  {Object.values(socialLinks).every((u) => !u || !u.trim()) && (
                    <span style={{ fontSize: '11px', color: '#9ca3af', fontStyle: 'italic' }}>Links will appear here</span>
                  )}
                </div>
              </div>

              {/* Website Footer Preview */}
              <div className="site-preview-header" style={{ marginTop: '16px' }}>
                <span>🏛 Public Website Footer Preview</span>
              </div>
              <div className="simulated-footer-card">
                <div className="footer-brand-info">
                  <span className="footer-brand-name">{siteName || 'Vyapari Darbar'}</span>
                  <p className="footer-brand-desc">
                    {siteDescription || 'Connecting verified agricultural commodity traders, mandi brokers, and farmers.'}
                  </p>
                </div>

                <div className="footer-social-showcase">
                  <span className="footer-social-label">Connect With Our Trading Community</span>
                  <div className="footer-social-icons-row">
                    {socialLinks.facebook && (
                      <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="footer-social-btn fb-btn">
                        <span>f</span> Facebook
                      </a>
                    )}
                    {socialLinks.twitter && (
                      <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="footer-social-btn x-btn">
                        <span>𝕏</span> Twitter
                      </a>
                    )}
                    {socialLinks.instagram && (
                      <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="footer-social-btn insta-btn">
                        <span>📸</span> Instagram
                      </a>
                    )}
                    {socialLinks.linkedin && (
                      <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="footer-social-btn in-btn">
                        <span>in</span> LinkedIn
                      </a>
                    )}
                    {socialLinks.youtube && (
                      <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="footer-social-btn yt-btn">
                        <span>▶</span> YouTube
                      </a>
                    )}
                    {socialLinks.whatsapp && (
                      <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="footer-social-btn wa-btn">
                        <span>💬</span> WhatsApp
                      </a>
                    )}
                    {socialLinks.telegram && (
                      <a href={socialLinks.telegram} target="_blank" rel="noreferrer" className="footer-social-btn tg-btn">
                        <span>✈</span> Telegram
                      </a>
                    )}
                  </div>
                </div>

                <div className="footer-copyright-row">
                  <span>© 2026 {siteName || 'Vyapari Darbar'}. All rights reserved.</span>
                  <span>Helpline: {phoneNumber || '+91 98765 43210'}</span>
                </div>
              </div>

              {/* Direct Verification Checklist */}
              <div className="site-preview-header" style={{ marginTop: '16px' }}>
                <span>✓ Profile Verification Checklist</span>
              </div>
              <div className="social-checklist-card">
                {[
                  { key: 'facebook', label: 'Facebook', icon: 'f', color: '#1877f2' },
                  { key: 'twitter', label: 'Twitter / X', icon: '𝕏', color: '#111827' },
                  { key: 'instagram', label: 'Instagram', icon: '📸', color: '#e1306c' },
                  { key: 'linkedin', label: 'LinkedIn', icon: 'in', color: '#0a66c2' },
                  { key: 'youtube', label: 'YouTube', icon: '▶', color: '#ff0000' },
                  { key: 'whatsapp', label: 'WhatsApp Channel', icon: '💬', color: '#25d366' },
                  { key: 'telegram', label: 'Telegram Group', icon: '✈', color: '#0088cc' },
                ].map((item) => {
                  const url = socialLinks[item.key];
                  const hasUrl = Boolean(url && url.trim());
                  return (
                    <div key={item.key} className="checklist-row">
                      <div className="checklist-left">
                        <span className="checklist-icon" style={{ color: item.color, fontWeight: 700 }}>{item.icon}</span>
                        <span className="checklist-name">{item.label}</span>
                      </div>
                      <div className="checklist-right">
                        {hasUrl ? (
                          <>
                            <span className="checklist-status active">Connected</span>
                            <a href={url} target="_blank" rel="noreferrer" className="checklist-visit-btn">
                              Visit Profile ↗
                            </a>
                          </>
                        ) : (
                          <span className="checklist-status inactive">Not Configured</span>
                        )}
                      </div>
                    </div>
                  );
                })}
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
                onClick={handleClearFilters}
              >
                <span>✕</span>
                <span>Clear Filters</span>
              </button>
              <button
                type="button"
                className="btn-apply-filters"
                onClick={() => fetchActivityLogs(1)}
                disabled={isLoadingLogs}
                style={{ marginLeft: '4px' }}
              >
                {isLoadingLogs ? 'Loading...' : '↻ Refresh'}
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
                onChange={(e) => { setModuleFilter(e.target.value); setCurrentPage(1); }}
                className="logs-select"
              >
                <option>All Modules</option>
                {moduleOptions.map((m) => (
                  <option key={m.module} value={m.module}>
                    {m.module} ({m.count})
                  </option>
                ))}
              </select>

              <select
                value={actionFilter}
                onChange={(e) => { setActionFilter(e.target.value); setCurrentPage(1); }}
                className="logs-select"
              >
                <option>All Actions</option>
                {actionOptions.map((a) => (
                  <option key={a.action} value={a.action}>
                    {a.action} ({a.count})
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-row-2">
              <div className="logs-date-picker-box">
                <label style={{ fontSize: '11px', color: '#6b7280', marginRight: '4px' }}>From</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1); }}
                  style={{ border: 'none', background: 'transparent', fontSize: '12px', color: '#374151', outline: 'none' }}
                />
              </div>

              <div className="logs-date-picker-box">
                <label style={{ fontSize: '11px', color: '#6b7280', marginRight: '4px' }}>To</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1); }}
                  style={{ border: 'none', background: 'transparent', fontSize: '12px', color: '#374151', outline: 'none' }}
                />
              </div>

              <button type="button" className="btn-apply-filters" onClick={handleApplyFilters} disabled={isLoadingLogs}>
                {isLoadingLogs ? 'Loading...' : 'Apply Filters'}
              </button>
            </div>
          </div>

          {/* Activity Logs Table */}
          <div className="sys-table-section">
            <div className="sys-table-header-flex">
              <h3 className="sys-table-title" style={{ margin: 0 }}>
                System Activity Logs ({formatNum(totalLogs)})
                {isLoadingLogs && <span style={{ fontSize: '12px', color: '#9ca3af', marginLeft: '8px' }}>Loading...</span>}
              </h3>

              <div className="sys-table-bulk-actions">
                {selectedLogIds.length > 0 && (
                  <>
                    <span className="selection-count-badge">
                      {selectedLogIds.length} {selectedLogIds.length === 1 ? 'log' : 'logs'} selected
                    </span>
                    <button
                      type="button"
                      className="btn-bulk-delete"
                      onClick={() => setIsBulkDeleteModalOpen(true)}
                      disabled={isDeletingLogs}
                      title="Delete selected activity logs"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                      <span>Delete Selected ({selectedLogIds.length})</span>
                    </button>
                    <button
                      type="button"
                      className="btn-deselect-all"
                      onClick={handleClearSelection}
                      title="Clear selection"
                    >
                      <span>✕ Deselect</span>
                    </button>
                  </>
                )}

                {totalLogs > 0 && (
                  <button
                    type="button"
                    className="btn-clear-all-logs"
                    onClick={() => setIsDeleteAllModalOpen(true)}
                    disabled={isDeletingLogs}
                    title="Delete all activity logs from the database"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                    <span>Clear All Logs</span>
                  </button>
                )}
              </div>
            </div>

            {logToast && (
              <div className={`site-toast-banner ${logToast.type}`} style={{ marginBottom: '12px' }}>
                <span>{logToast.type === 'success' ? '✓' : '⚠'} {logToast.msg}</span>
                <button type="button" onClick={() => setLogToast(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: 'inherit' }}>✕</button>
              </div>
            )}

            {logsError && (
              <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>
                ⚠ {logsError}
                <button type="button" onClick={() => fetchActivityLogs(currentPage)} style={{ marginLeft: '10px', background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', textDecoration: 'underline', fontSize: '12px' }}>Retry</button>
              </div>
            )}

            <div className="sys-table-wrapper">
              <table className="sys-table">
                <thead>
                  <tr>
                    <th style={{ width: '38px', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        ref={headerCheckboxRef}
                        checked={isAllCurrentPageSelected}
                        onChange={handleToggleSelectAll}
                        disabled={auditLogs.length === 0}
                        title={isAllCurrentPageSelected ? 'Deselect all on this page' : 'Select all on this page'}
                        style={{ cursor: 'pointer', width: '15px', height: '15px', accentColor: '#026544' }}
                      />
                    </th>
                    <th style={{ width: '45px' }}>#</th>
                    <th style={{ width: '140px' }}>Date & Time</th>
                    <th style={{ width: '130px' }}>User</th>
                    <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
                    <th style={{ width: '95px' }}>Module</th>
                    <th>Description</th>
                    <th style={{ width: '100px' }}>IP Address</th>
                    <th style={{ width: '75px', textAlign: 'center' }}>Status</th>
                    <th style={{ width: '40px', textAlign: 'center' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingLogs && auditLogs.length === 0 ? (
                    <tr>
                      <td colSpan="10" style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '24px' }}>⏳</span>
                          <span>Loading activity logs...</span>
                        </div>
                      </td>
                    </tr>
                  ) : auditLogs.length === 0 ? (
                    <tr>
                      <td colSpan="10" style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '24px' }}>📭</span>
                          <span>No activity logs found</span>
                          <span style={{ fontSize: '11px' }}>Try adjusting your filters or search query</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    auditLogs.map((log) => {
                      const isSelected = selectedLogIds.includes(log.id);
                      return (
                        <tr
                          key={log.id}
                          className={isSelected ? 'row-selected' : ''}
                          style={{ opacity: isLoadingLogs ? 0.5 : 1, transition: 'background-color 0.15s, opacity 0.2s' }}
                        >
                          <td style={{ textAlign: 'center' }}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleSelectRow(log.id)}
                              style={{ cursor: 'pointer', width: '15px', height: '15px', accentColor: '#026544' }}
                              aria-label={`Select log #${log.id}`}
                            />
                          </td>
                          <td className="td-id">{log.id}</td>
                          <td className="td-datetime">
                            <span className="td-date">{log.date_time || '—'}</span>
                          </td>
                          <td className="td-user">
                            <span className="td-user-name">{log.user?.name || log.user?.full_name || 'System'}</span>
                            <span className="td-user-role">{log.user?.role || (log.user?.roles?.[0]?.name) || 'Automated'}</span>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <span className={`act-pill act-${(log.action || 'updated').toLowerCase()}`}>
                              {log.action}
                            </span>
                          </td>
                          <td className="td-module">{log.module}</td>
                          <td className="td-desc">{log.description}</td>
                          <td className="td-ip">{log.ip_address || '-'}</td>
                          <td style={{ textAlign: 'center' }}>
                            <span className={`status-pill ${(log.status || 'success').toLowerCase()}`}>{log.status}</span>
                          </td>
                          <td style={{ textAlign: 'center', position: 'relative' }}>
                            <button
                              type="button"
                              className={`btn-log-options ${activeActionMenuId === log.id ? 'active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveActionMenuId((prev) => (prev === log.id ? null : log.id));
                              }}
                              title="Actions"
                            >
                              ⋮
                            </button>

                            {activeActionMenuId === log.id && (
                              <div
                                className="log-row-menu-dropdown"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  type="button"
                                  className="log-menu-item"
                                  onClick={() => {
                                    setViewModalLog(log);
                                    setActiveActionMenuId(null);
                                  }}
                                >
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                  </svg>
                                  <span>View Details</span>
                                </button>

                                <button
                                  type="button"
                                  className="log-menu-item danger"
                                  onClick={() => {
                                    setDeleteSingleLog(log);
                                    setActiveActionMenuId(null);
                                  }}
                                >
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  </svg>
                                  <span>Delete Log</span>
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="sys-pagination-row">
              <span className="sys-pagination-info">
                Showing {auditLogs.length === 0 ? 0 : ((currentPage - 1) * perPage + 1)} to {Math.min(currentPage * perPage, totalLogs)} of {formatNum(totalLogs)} entries
              </span>

              <div className="sys-page-numbers">
                <button
                  type="button"
                  className="page-nav-btn"
                  disabled={currentPage <= 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >‹</button>

                {getPaginationPages().map((p, idx) =>
                  p === '...' ? (
                    <span key={`ellipsis-${idx}`} className="page-ellipsis">...</span>
                  ) : (
                    <button
                      key={p}
                      type="button"
                      className={`page-num-btn ${p === currentPage ? 'active' : ''}`}
                      onClick={() => handlePageChange(p)}
                    >
                      {formatNum(p)}
                    </button>
                  )
                )}

                <button
                  type="button"
                  className="page-nav-btn"
                  disabled={currentPage >= lastPage}
                  onClick={() => handlePageChange(currentPage + 1)}
                >›</button>
              </div>

              <div className="sys-page-size-box">
                <select
                  value={perPage}
                  onChange={(e) => handlePerPageChange(Number(e.target.value))}
                >
                  <option value="10">10 / page</option>
                  <option value="20">20 / page</option>
                  <option value="50">50 / page</option>
                  <option value="100">100 / page</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating UI Toast Notification (Displays above all modals) */}
      {logToast && (
        <div className={`sys-floating-toast ${logToast.type}`}>
          <div className="sys-floating-toast-icon">
            {logToast.type === 'success' ? '✓' : '⚠'}
          </div>
          <div className="sys-floating-toast-body">
            <span className="sys-floating-toast-title">
              {logToast.type === 'success' ? 'Success' : logToast.type === 'error' ? 'Error' : 'Notification'}
            </span>
            <span className="sys-floating-toast-msg">{logToast.msg}</span>
          </div>
          <button
            type="button"
            className="sys-floating-toast-close"
            onClick={() => setLogToast(null)}
            title="Close notification"
          >
            ✕
          </button>
        </div>
      )}

      {/* Modal 1: View Activity Log Details */}
      {viewModalLog && (
        <div className="sys-modal-backdrop" onClick={() => setViewModalLog(null)}>
          <div className="sys-modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="sys-modal-header">
              <h3 className="sys-modal-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#026544" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>Activity Log Details #{viewModalLog.id}</span>
              </h3>
              <button
                type="button"
                className="sys-modal-close-btn"
                onClick={() => setViewModalLog(null)}
              >
                ✕
              </button>
            </div>

            <div className="sys-modal-body">
              <div className="sys-detail-grid">
                <div className="sys-detail-item">
                  <span className="sys-detail-label">Log ID</span>
                  <span className="sys-detail-value">#{viewModalLog.id}</span>
                </div>
                <div className="sys-detail-item">
                  <span className="sys-detail-label">Date & Time</span>
                  <span className="sys-detail-value">{viewModalLog.date_time || viewModalLog.created_at || '—'}</span>
                </div>
                <div className="sys-detail-item">
                  <span className="sys-detail-label">User</span>
                  <span className="sys-detail-value">
                    {viewModalLog.user?.name || viewModalLog.user?.full_name || 'System / Automated'}
                    {viewModalLog.user?.email && ` (${viewModalLog.user.email})`}
                  </span>
                </div>
                <div className="sys-detail-item">
                  <span className="sys-detail-label">User Role</span>
                  <span className="sys-detail-value">{viewModalLog.user?.role || (viewModalLog.user?.roles?.[0]?.name) || 'Automated'}</span>
                </div>
                <div className="sys-detail-item">
                  <span className="sys-detail-label">Module</span>
                  <span className="sys-detail-value">{viewModalLog.module}</span>
                </div>
                <div className="sys-detail-item">
                  <span className="sys-detail-label">Action</span>
                  <span className="sys-detail-value">
                    <span className={`act-pill act-${(viewModalLog.action || 'updated').toLowerCase()}`}>
                      {viewModalLog.action}
                    </span>
                  </span>
                </div>
                <div className="sys-detail-item">
                  <span className="sys-detail-label">Status</span>
                  <span className="sys-detail-value">
                    <span className={`status-pill ${(viewModalLog.status || 'success').toLowerCase()}`}>
                      {viewModalLog.status}
                    </span>
                  </span>
                </div>
                <div className="sys-detail-item">
                  <span className="sys-detail-label">IP Address</span>
                  <span className="sys-detail-value">{viewModalLog.ip_address || '—'}</span>
                </div>
                <div className="sys-detail-item full-width">
                  <span className="sys-detail-label">Description</span>
                  <div className="sys-detail-box">{viewModalLog.description}</div>
                </div>
                {viewModalLog.user_agent && (
                  <div className="sys-detail-item full-width">
                    <span className="sys-detail-label">User Agent</span>
                    <span className="sys-detail-value" style={{ fontSize: '11.5px', color: '#64748b' }}>
                      {viewModalLog.user_agent}
                    </span>
                  </div>
                )}
                {viewModalLog.properties && Object.keys(viewModalLog.properties).length > 0 && (
                  <div className="sys-detail-item full-width">
                    <span className="sys-detail-label">Payload / Changes</span>
                    <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '12px', borderRadius: '6px', fontSize: '12px', overflowX: 'auto', maxHeight: '180px' }}>
                      {JSON.stringify(viewModalLog.properties, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            <div className="sys-modal-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setViewModalLog(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn-modal-danger"
                onClick={() => {
                  const logToDelete = viewModalLog;
                  setViewModalLog(null);
                  setModalError(null);
                  setDeleteSingleLog(logToDelete);
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                <span>Delete This Log</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Single Delete Confirmation */}
      {deleteSingleLog && (
        <div className="sys-modal-backdrop" onClick={() => !isDeletingLogs && setDeleteSingleLog(null)}>
          <div className="sys-modal-dialog modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="sys-modal-header">
              <h3 className="sys-modal-title" style={{ color: '#dc2626' }}>
                <span>Delete Activity Log #{deleteSingleLog.id}</span>
              </h3>
              <button
                type="button"
                className="sys-modal-close-btn"
                disabled={isDeletingLogs}
                onClick={() => { setModalError(null); setDeleteSingleLog(null); }}
              >
                ✕
              </button>
            </div>

            <div className="sys-modal-body">
              {modalError && (
                <div className="sys-modal-inline-error">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{modalError}</span>
                </div>
              )}

              <div className="sys-danger-box">
                <div className="sys-danger-icon-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </div>
                <div className="sys-danger-content">
                  <h4>Delete Log #{deleteSingleLog.id}?</h4>
                  <p>
                    Are you sure you want to delete this log entry for <strong>{deleteSingleLog.module}</strong> ({deleteSingleLog.action})? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            <div className="sys-modal-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                disabled={isDeletingLogs}
                onClick={() => { setModalError(null); setDeleteSingleLog(null); }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-modal-danger"
                disabled={isDeletingLogs}
                onClick={handleConfirmSingleDelete}
              >
                {isDeletingLogs ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Bulk Delete Confirmation */}
      {isBulkDeleteModalOpen && (
        <div className="sys-modal-backdrop" onClick={() => !isDeletingLogs && setIsBulkDeleteModalOpen(false)}>
          <div className="sys-modal-dialog modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="sys-modal-header">
              <h3 className="sys-modal-title" style={{ color: '#dc2626' }}>
                <span>Bulk Delete Activity Logs</span>
              </h3>
              <button
                type="button"
                className="sys-modal-close-btn"
                disabled={isDeletingLogs}
                onClick={() => { setModalError(null); setIsBulkDeleteModalOpen(false); }}
              >
                ✕
              </button>
            </div>

            <div className="sys-modal-body">
              {modalError && (
                <div className="sys-modal-inline-error">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{modalError}</span>
                </div>
              )}

              <div className="sys-danger-box">
                <div className="sys-danger-icon-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </div>
                <div className="sys-danger-content">
                  <h4>Delete {selectedLogIds.length} Activity Logs?</h4>
                  <p>
                    Are you sure you want to permanently delete all <strong>{selectedLogIds.length}</strong> selected activity log entries? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            <div className="sys-modal-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                disabled={isDeletingLogs}
                onClick={() => { setModalError(null); setIsBulkDeleteModalOpen(false); }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-modal-danger"
                disabled={isDeletingLogs}
                onClick={handleConfirmBulkDelete}
              >
                {isDeletingLogs ? 'Deleting...' : `Yes, Delete (${selectedLogIds.length})`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Delete ALL Logs Confirmation */}
      {isDeleteAllModalOpen && (
        <div className="sys-modal-backdrop" onClick={() => !isDeletingLogs && setIsDeleteAllModalOpen(false)}>
          <div className="sys-modal-dialog modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="sys-modal-header">
              <h3 className="sys-modal-title" style={{ color: '#dc2626' }}>
                <span>Clear All Activity Logs</span>
              </h3>
              <button
                type="button"
                className="sys-modal-close-btn"
                disabled={isDeletingLogs}
                onClick={() => { setModalError(null); setIsDeleteAllModalOpen(false); }}
              >
                ✕
              </button>
            </div>

            <div className="sys-modal-body">
              {modalError && (
                <div className="sys-modal-inline-error">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{modalError}</span>
                </div>
              )}

              <div className="sys-danger-box">
                <div className="sys-danger-icon-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </div>
                <div className="sys-danger-content">
                  <h4 style={{ color: '#dc2626' }}>Purge Entire Activity Log History?</h4>
                  <p>
                    <strong>Warning:</strong> You are about to permanently delete all <strong>{formatNum(totalLogs)}</strong> activity log records from the database. This purge is irreversible.
                  </p>
                </div>
              </div>
            </div>

            <div className="sys-modal-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                disabled={isDeletingLogs}
                onClick={() => { setModalError(null); setIsDeleteAllModalOpen(false); }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-modal-danger"
                disabled={isDeletingLogs}
                onClick={handleConfirmDeleteAll}
              >
                {isDeletingLogs ? 'Purging...' : 'Yes, Clear All Logs'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}
