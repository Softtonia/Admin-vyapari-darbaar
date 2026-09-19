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
 * @returns {Promise<{ status: boolean, message: string, data: { id: number, site_name: string, site_title: string|null, site_description: string|null, web_logo: string|null, mobile_logo: string|null, created_at: string, updated_at: string } }>}
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
 * Endpoint: PATCH /api/admin/site-settings
 * Supports multipart FormData (for web_logo, mobile_logo) and JSON
 *
 * @param {FormData|{ site_name?: string, site_title?: string, site_description?: string, web_logo?: File, mobile_logo?: File }} payload
 * @returns {Promise<{ status: boolean, message: string, data: any }>}
 */
export async function updateAdminSiteSettings(payload) {
  // If payload is already FormData
  if (payload instanceof FormData) {
    if (!payload.has('_method')) {
      payload.append('_method', 'PATCH');
    }
    return await apiFetch('/api/admin/site-settings', {
      method: 'POST',
      body: payload,
      headers: {
        'X-HTTP-Method-Override': 'PATCH',
      },
    });
  }

  // Check if any File object is present in payload
  const hasFiles =
    (payload.web_logo && payload.web_logo instanceof File) ||
    (payload.mobile_logo && payload.mobile_logo instanceof File);

  if (hasFiles) {
    const formData = new FormData();
    formData.append('_method', 'PATCH');
    if (payload.site_name !== undefined && payload.site_name !== null) {
      formData.append('site_name', String(payload.site_name).trim());
    }
    if (payload.site_title !== undefined && payload.site_title !== null) {
      formData.append('site_title', String(payload.site_title).trim());
    }
    if (payload.site_description !== undefined && payload.site_description !== null) {
      formData.append('site_description', String(payload.site_description).trim());
    }
    if (payload.web_logo instanceof File) {
      formData.append('web_logo', payload.web_logo);
    }
    if (payload.mobile_logo instanceof File) {
      formData.append('mobile_logo', payload.mobile_logo);
    }

    return await apiFetch('/api/admin/site-settings', {
      method: 'POST',
      body: formData,
      headers: {
        'X-HTTP-Method-Override': 'PATCH',
      },
    });
  }

  // Pure JSON update (when no new files are uploaded)
  const jsonBody = {};
  if (payload.site_name !== undefined && payload.site_name !== null) {
    jsonBody.site_name = String(payload.site_name).trim();
  }
  if (payload.site_title !== undefined && payload.site_title !== null) {
    jsonBody.site_title = String(payload.site_title).trim();
  }
  if (payload.site_description !== undefined && payload.site_description !== null) {
    jsonBody.site_description = String(payload.site_description).trim();
  }

  return await apiFetch('/api/admin/site-settings', {
    method: 'PATCH',
    body: jsonBody,
  });
}
