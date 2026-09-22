import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getAdminSiteSettings,
  getPublicSiteSettings,
  getSiteLogoUrl,
} from '../api/siteSettingService';
import { getAdminToken } from '../api/config';
import defaultSidebarLogo from '../assets/sidebar_logo.png';

const DEFAULT_SETTINGS = {
  id: 1,
  site_name: 'Vyapari Darbar',
  site_title: 'India Premier Mandi Platform',
  site_description: 'Connecting mandi traders across India.',
  email: 'contact@vyaparidarbar.com',
  site_email: 'contact@vyaparidarbar.com',
  admin_email: 'contact@vyaparidarbar.com',
  phone_number: '+919876543210',
  social_links: {
    facebook: 'https://facebook.com/vyaparidarbar',
    twitter: 'https://x.com/vyaparidarbar',
    instagram: 'https://instagram.com/vyaparidarbar',
    linkedin: 'https://linkedin.com/company/vyaparidarbar',
    youtube: 'https://youtube.com/@vyaparidarbar',
  },
  timezone: 'Asia/Kolkata',
  default_language: 'en',
  currency: 'INR',
  web_logo: null,
  mobile_logo: null,
  favicon: null,
};

const SiteSettingsContext = createContext(null);

/**
 * Dynamically apply favicon to the document head
 * @param {string|null} url 
 */
export function applyFaviconToDocument(url) {
  const iconHref = url || '/favicon.svg';
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = iconHref;

  const shortcutLink = document.querySelector("link[rel='shortcut icon']");
  if (shortcutLink) {
    shortcutLink.href = iconHref;
  }
}

/**
 * Dynamically apply browser page title
 * @param {string} title 
 */
export function applyTitleToDocument(title) {
  if (title) {
    document.title = title;
  }
}

export function SiteSettingsProvider({ children }) {
  const [siteSettings, setSiteSettings] = useState(() => {
    try {
      const cached = localStorage.getItem('vyapari_cached_site_settings');
      if (cached) return JSON.parse(cached);
    } catch {
      // Ignore parse error
    }
    return DEFAULT_SETTINGS;
  });

  const [loading, setLoading] = useState(false);

  // Fetch settings from API
  const refreshSiteSettings = useCallback(async () => {
    try {
      setLoading(true);
      const token = getAdminToken();
      const res = token
        ? await getAdminSiteSettings().catch(() => getPublicSiteSettings())
        : await getPublicSiteSettings();

      const item = res?.data || res;
      if (item && typeof item === 'object') {
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

        const merged = {
          id: item.id || 1,
          site_name: item.site_name || 'Vyapari Darbar',
          site_title: item.site_title !== undefined ? (item.site_title ?? '') : '',
          site_description: item.site_description !== undefined ? (item.site_description ?? '') : '',
          email: item.email || item.site_email || item.admin_email || '',
          site_email: item.email || item.site_email || item.admin_email || '',
          admin_email: item.email || item.site_email || item.admin_email || '',
          phone_number: item.phone_number || item.phone || '',
          social_links: parsedSocial,
          timezone: item.timezone || 'Asia/Kolkata',
          default_language: item.default_language || 'en',
          currency: item.currency || 'INR',
          web_logo: item.web_logo || null,
          mobile_logo: item.mobile_logo || null,
          favicon: item.favicon || null,
          created_at: item.created_at,
          updated_at: item.updated_at,
        };

        setSiteSettings(merged);
        try {
          localStorage.setItem('vyapari_cached_site_settings', JSON.stringify(merged));
        } catch {
          // Ignore storage quota error
        }

        // Apply favicon & document title immediately
        const resolvedFavicon = getSiteLogoUrl(merged.favicon);
        applyFaviconToDocument(resolvedFavicon);

        const pageTitle = merged.site_title
          ? `${merged.site_name} | ${merged.site_title}`
          : `${merged.site_name} - Admin Portal`;
        applyTitleToDocument(pageTitle);
      }
    } catch (err) {
      console.warn('Failed to load site settings from API, using defaults:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    refreshSiteSettings();
  }, [refreshSiteSettings]);

  // Update in-memory and document state immediately (called right after saving in UI)
  const updateSiteSettingsState = useCallback((updated) => {
    if (!updated || typeof updated !== 'object') return;
    setSiteSettings((prev) => {
      const next = {
        ...prev,
        ...updated,
      };
      try {
        localStorage.setItem('vyapari_cached_site_settings', JSON.stringify(next));
      } catch {
        // Ignore storage error
      }

      // Sync favicon & title immediately
      const resolvedFavicon = getSiteLogoUrl(next.favicon);
      applyFaviconToDocument(resolvedFavicon);

      const pageTitle = next.site_title
        ? `${next.site_name || 'Vyapari Darbar'} | ${next.site_title}`
        : `${next.site_name || 'Vyapari Darbar'} - Admin Portal`;
      applyTitleToDocument(pageTitle);

      return next;
    });
  }, []);

  // Compute resolved URLs
  const webLogoUrl = getSiteLogoUrl(siteSettings?.web_logo);
  const mobileLogoUrl = getSiteLogoUrl(siteSettings?.mobile_logo);
  const faviconUrl = getSiteLogoUrl(siteSettings?.favicon);

  const value = {
    siteSettings,
    webLogoUrl,
    mobileLogoUrl,
    faviconUrl,
    defaultSidebarLogo,
    loading,
    refreshSiteSettings,
    updateSiteSettingsState,
  };

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
}

export default SiteSettingsContext;
