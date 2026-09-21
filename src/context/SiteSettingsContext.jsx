import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getAdminSiteSettings,
  getPublicSiteSettings,
  getSiteLogoUrl,
} from '../api/siteSettingService';
import { getAdminToken } from '../api/config';
import defaultSidebarLogo from '../assets/sidebar_logo.png';

const EXTRA_SETTINGS_KEY = 'vyapari_extra_site_settings';

const DEFAULT_SETTINGS = {
  id: 1,
  site_name: 'Vyapari Darbar',
  site_title: "India's Agricultural Commodity Marketplace",
  site_description: 'Connecting mandi traders, brokers, and farmers across India with real-time commodity prices and market intelligence.',
  web_logo: null,
  mobile_logo: null,
  // Complementary contact details
  support_email: 'support@vyaparidarbar.com',
  support_phone: '+91 98765 43210',
  whatsapp_number: '+91 98765 43210',
  office_address: 'Mandi Gate No. 4, APMC Market Yard, New Delhi - 110001, India',
  // Complementary social links
  social_whatsapp: 'https://chat.whatsapp.com/vyaparidarbar',
  social_youtube: 'https://youtube.com/@vyaparidarbar',
  social_facebook: 'https://facebook.com/vyaparidarbar',
  social_twitter: 'https://twitter.com/vyaparidarbar',
  social_instagram: 'https://instagram.com/vyaparidarbar',
  social_linkedin: 'https://linkedin.com/company/vyaparidarbar',
  // SEO & General
  meta_keywords: 'mandi rates, agri commodity, vyapari darbar, wheat price, chana mandi, agricultural marketplace',
  copyright_text: '© 2026 Vyapari Darbaar. All rights reserved.',
  mandi_currency: 'INR (₹)',
  timezone: 'Asia/Kolkata (GMT +5:30)',
};

const SiteSettingsContext = createContext(null);

export function SiteSettingsProvider({ children }) {
  // Load initial extra settings from localStorage if available
  const [extraSettings, setExtraSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(EXTRA_SETTINGS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [siteSettings, setSiteSettings] = useState(() => ({
    ...DEFAULT_SETTINGS,
    ...extraSettings,
  }));

  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch settings from API
  const refreshSiteSettings = useCallback(async () => {
    try {
      setLoading(true);
      const token = getAdminToken();
      // Try admin endpoint if token exists, otherwise public endpoint
      const res = token
        ? await getAdminSiteSettings().catch(() => getPublicSiteSettings())
        : await getPublicSiteSettings();

      const item = res?.data || res;
      if (item && typeof item === 'object') {
        let storedExtras = {};
        try {
          const stored = localStorage.getItem(EXTRA_SETTINGS_KEY);
          if (stored) storedExtras = JSON.parse(stored);
        } catch {
          // Ignore parse errors
        }

        setSiteSettings((prev) => ({
          ...DEFAULT_SETTINGS,
          ...storedExtras,
          ...prev,
          site_name: item.site_name || prev.site_name || DEFAULT_SETTINGS.site_name,
          site_title: item.site_title !== undefined ? (item.site_title ?? '') : prev.site_title,
          site_description: item.site_description !== undefined ? (item.site_description ?? '') : prev.site_description,
          web_logo: item.web_logo || null,
          mobile_logo: item.mobile_logo || null,
          id: item.id || prev.id || 1,
          updated_at: item.updated_at || new Date().toISOString(),
        }));
        setLastUpdated(Date.now());
      }
    } catch (err) {
      console.warn('Failed to load site settings from server, using cached/defaults:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    refreshSiteSettings();
  }, [refreshSiteSettings]);

  // Update document title dynamically whenever site name or title changes
  useEffect(() => {
    if (siteSettings?.site_name) {
      const pageTitle = siteSettings.site_title
        ? `${siteSettings.site_name} | ${siteSettings.site_title}`
        : `${siteSettings.site_name} - Admin Portal`;
      document.title = pageTitle;
    }
  }, [siteSettings?.site_name, siteSettings?.site_title]);

  // Function to locally update settings (e.g. immediately after a save operation)
  const updateLocalSettings = useCallback((newSettings) => {
    setSiteSettings((prev) => {
      const updated = { ...prev, ...newSettings };

      // Persist extra complementary settings locally
      const extrasToPersist = {
        support_email: updated.support_email,
        support_phone: updated.support_phone,
        whatsapp_number: updated.whatsapp_number,
        office_address: updated.office_address,
        social_whatsapp: updated.social_whatsapp,
        social_youtube: updated.social_youtube,
        social_facebook: updated.social_facebook,
        social_twitter: updated.social_twitter,
        social_instagram: updated.social_instagram,
        social_linkedin: updated.social_linkedin,
        meta_keywords: updated.meta_keywords,
        copyright_text: updated.copyright_text,
        mandi_currency: updated.mandi_currency,
        timezone: updated.timezone,
      };

      try {
        localStorage.setItem(EXTRA_SETTINGS_KEY, JSON.stringify(extrasToPersist));
        setExtraSettings(extrasToPersist);
      } catch (err) {
        console.warn('Could not save extra site settings to localStorage:', err);
      }

      return updated;
    });
    setLastUpdated(Date.now());
  }, []);

  // Compute resolved logo URLs
  const rawWebLogo = siteSettings?.web_logo;
  const rawMobileLogo = siteSettings?.mobile_logo;
  const webLogoUrl = rawWebLogo ? getSiteLogoUrl(rawWebLogo) : null;
  const mobileLogoUrl = rawMobileLogo ? getSiteLogoUrl(rawMobileLogo) : null;

  const value = {
    siteSettings,
    webLogoUrl,
    mobileLogoUrl,
    defaultSidebarLogo,
    loading,
    lastUpdated,
    refreshSiteSettings,
    updateLocalSettings,
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
