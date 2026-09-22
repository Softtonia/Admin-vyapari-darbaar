/**
 * Vyapari Darbaar - Admin API Configuration & Client
 * Base URL: https://api.vyaparidarbar.com
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://api.vyaparidarbar.com';

export const STORAGE_KEYS = {
  ADMIN_TOKEN: 'vyapari_admin_token',
  ADMIN_USER: 'vyapari_admin_user',
};

// Storage Helpers
export const getAdminToken = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN) || null;
  } catch {
    return null;
  }
};

export const setAdminToken = (token) => {
  try {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
    }
  } catch (err) {
    console.error('Failed to save admin token:', err);
  }
};

export const removeAdminToken = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
  } catch (err) {
    console.error('Failed to remove admin token:', err);
  }
};

export const getAdminUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setAdminUser = (user) => {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
    }
  } catch (err) {
    console.error('Failed to save admin user:', err);
  }
};

export const removeAdminUser = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
  } catch (err) {
    console.error('Failed to remove admin user:', err);
  }
};

export const clearAdminSession = () => {
  removeAdminToken();
  removeAdminUser();
};

/**
 * Generic API fetch wrapper
 * @param {string} endpoint - e.g. '/api/auth/admin/login'
 * @param {RequestInit} [options]
 * @returns {Promise<any>}
 */
export async function apiFetch(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  const token = getAdminToken();

  const headers = {
    Accept: 'application/json',
    ...(options.headers || {}),
  };

  // Auto attach token if available and not explicitly disabled
  if (token && !headers.Authorization && !options.skipAuth) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Handle body JSON stringification & Content-Type
  let body = options.body;
  if (body && !(body instanceof FormData)) {
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
    if (typeof body === 'object') {
      body = JSON.stringify(body);
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
    body,
  });

  let data = null;
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = { message: await response.text() };
  }

  if (!response.ok || data?.status === false) {
    // Format error message from backend
    let errMsg = data?.message || `Request failed with status ${response.status}`;
    if (data?.errors && typeof data.errors === 'object') {
      const fieldErrors = Object.values(data.errors)
        .flat()
        .filter(Boolean);
      if (fieldErrors.length > 0) {
        errMsg = fieldErrors.join(' ');
      }
    }

    const error = new Error(errMsg);
    error.status = response.status;
    error.data = data;
    error.errors = data?.errors || null;

    // Auto clear session on 401 Unauthorized
    if (response.status === 401) {
      clearAdminSession();
    }

    throw error;
  }

  return data;
}
