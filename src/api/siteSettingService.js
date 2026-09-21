/**
 * Vyapari Darbaar - Site Settings API Service
 * Handles fetching and updating site settings via /api/admin/site-settings
 */

import { apiFetch, API_BASE_URL } from './config';

/**
 * Helper to get clean image URL with full host if stored locally
 * @param {string} url
 * @returns {string|null}
 */
export function getSiteLogoUrl(url) {
  if (!url) return null;
  if (typeof url !== 'string') return null;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const cleanPath = url.replace(/^\/?storage\//, '').replace(/^\//, '');
  return `${API_BASE_URL}/storage/${cleanPath}`;
}

/**
 * Fetch Admin Site Settings
 * Endpoint: GET /api/admin/site-settings
 * @returns {Promise<{ status: boolean, message: string, data: { id: number, site_name: string, site_title: string|null, site_description: string|null, web_logo: string|null, mobile_logo: string|null, favicon: string|null, created_at: string, updated_at: string } }>}
 */
export async function getAdminSiteSettings() {
  return await apiFetch('/api/admin/site-settings', {
    method: 'GET',
  });
}

/**
 * Fetch Public Site Settings
 * Endpoint: GET /api/site-settings
 * @returns {Promise<any>}
 */
export async function getPublicSiteSettings() {
  return await apiFetch('/api/site-settings', {
    method: 'GET',
    skipAuth: true,
  });
}

/**
 * Update Admin Site Settings
 * Endpoint: POST /api/admin/site-settings
 * Uses multipart FormData with _method: 'PATCH' (matching Laravel method spoofing & Postman spec)
 *
 * @param {FormData|{ site_name?: string, site_title?: string, site_description?: string, web_logo?: File|Blob, mobile_logo?: File|Blob, favicon?: File|Blob }} payload
 * @returns {Promise<{ status: boolean, message: string, data: any }>}
 */
export async function updateAdminSiteSettings(payload) {
  let formData;

  if (payload instanceof FormData) {
    formData = payload;
  } else {
    formData = new FormData();

    if (payload.site_name !== undefined && payload.site_name !== null) {
      formData.append('site_name', String(payload.site_name).trim());
    }
    if (payload.site_title !== undefined && payload.site_title !== null) {
      formData.append('site_title', String(payload.site_title).trim());
    }
    if (payload.site_description !== undefined && payload.site_description !== null) {
      formData.append('site_description', String(payload.site_description).trim());
    }

    if (payload.web_logo && (payload.web_logo instanceof File || payload.web_logo instanceof Blob)) {
      formData.append('web_logo', payload.web_logo);
    }
    if (payload.mobile_logo && (payload.mobile_logo instanceof File || payload.mobile_logo instanceof Blob)) {
      formData.append('mobile_logo', payload.mobile_logo);
    }
    if (payload.favicon && (payload.favicon instanceof File || payload.favicon instanceof Blob)) {
      formData.append('favicon', payload.favicon);
    }
  }

  // Ensure Laravel method spoofing field is present in FormData
  if (!formData.has('_method')) {
    formData.append('_method', 'PATCH');
  }

  // Always POST with FormData containing _method='PATCH'
  return await apiFetch('/api/admin/site-settings', {
    method: 'POST',
    body: formData,
  });
}

