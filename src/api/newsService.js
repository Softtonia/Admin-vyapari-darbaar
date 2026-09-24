import { apiFetch } from './config';

/**
 * Fetch News Articles
 * @param {Object} params - Query parameters (page, per_page, search, status, etc.)
 */
export const getAdminNewsArticles = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return await apiFetch(`/api/admin/news?${query}`);
};

/**
 * Get Single News Article Details
 * @param {number|string} id - Article ID
 */
export const getAdminNewsArticleDetails = async (id) => {
  return await apiFetch(`/api/admin/news/${id}`);
};

/**
 * Create a new News Article
 * @param {Object} data - Article payload
 */
export const createAdminNewsArticle = async (data) => {
  return await apiFetch('/api/admin/news', {
    method: 'POST',
    body: data,
  });
};

/**
 * Update an existing News Article
 * @param {number|string} id - Article ID
 * @param {FormData|Object} data - Article payload
 */
export const updateAdminNewsArticle = async (id, data) => {
  if (data instanceof FormData) {
    if (!data.has('_method')) {
      data.append('_method', 'PATCH');
    }
    return await apiFetch(`/api/admin/news/${id}`, {
      method: 'POST',
      body: data,
    });
  }
  return await apiFetch(`/api/admin/news/${id}`, {
    method: 'PATCH',
    body: data,
  });
};

/**
 * Update Article Status
 * @param {number|string} id - Article ID
 * @param {string} status - New status ('published', 'draft', 'scheduled', 'archived')
 */
export const updateAdminNewsStatus = async (id, status) => {
  return await apiFetch(`/api/admin/news/${id}/status`, {
    method: 'PATCH',
    body: { status },
  });
};

/**
 * Toggle Featured Status
 * @param {number|string} id - Article ID
 * @param {boolean} is_featured - Featured status
 */
export const toggleAdminNewsFeatured = async (id, is_featured) => {
  return await apiFetch(`/api/admin/news/${id}/featured`, {
    method: 'PATCH',
    body: { is_featured },
  });
};

/**
 * Toggle Breaking Status
 * @param {number|string} id - Article ID
 * @param {boolean} is_breaking - Breaking status
 */
export const toggleAdminNewsBreaking = async (id, is_breaking) => {
  return await apiFetch(`/api/admin/news/${id}/breaking`, {
    method: 'PATCH',
    body: { is_breaking },
  });
};

/**
 * Delete News Article
 * @param {number|string} id - Article ID
 */
export const deleteAdminNewsArticle = async (id) => {
  return await apiFetch(`/api/admin/news/${id}`, {
    method: 'DELETE',
  });
};

// ----------------------------------------------------------------------
// CATEGORIES
// ----------------------------------------------------------------------

/**
 * Fetch News Categories list (Admin)
 * @param {Object} params - Query parameters (page, per_page, search, status)
 */
export const getAdminNewsCategories = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return await apiFetch(`/api/admin/news-categories?${query}`);
};

/**
 * Fetch News Categories Options for dropdowns
 */
export const getAdminNewsCategoriesOptions = async () => {
  return await apiFetch('/api/admin/news-categories/options');
};

/**
 * Create a new News Category
 * @param {Object} data 
 */
export const createAdminNewsCategory = async (data) => {
  return await apiFetch('/api/admin/news-categories', {
    method: 'POST',
    body: data,
  });
};

/**
 * Update an existing News Category
 * @param {number|string} id 
 * @param {Object} data 
 */
export const updateAdminNewsCategory = async (id, data) => {
  return await apiFetch(`/api/admin/news-categories/${id}`, {
    method: 'PUT',
    body: data,
  });
};

/**
 * Delete a News Category
 * @param {number|string} id 
 */
export const deleteAdminNewsCategory = async (id) => {
  return await apiFetch(`/api/admin/news-categories/${id}`, {
    method: 'DELETE',
  });
};

// ==========================================
// NEWS SOURCES API
// ==========================================

export const getAdminNewsSources = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return await apiFetch(`/api/admin/news-sources?${query}`);
};

export const createAdminNewsSource = async (data) => {
  return await apiFetch('/api/admin/news-sources', {
    method: 'POST',
    body: data,
  });
};

export const updateAdminNewsSource = async (id, data) => {
  return await apiFetch(`/api/admin/news-sources/${id}`, {
    method: 'PUT',
    body: data,
  });
};

export const deleteAdminNewsSource = async (id) => {
  return await apiFetch(`/api/admin/news-sources/${id}`, {
    method: 'DELETE',
  });
};

// ----------------------------------------------------------------------
// SOURCES
// ----------------------------------------------------------------------

/**
 * Fetch News Sources Options for dropdowns
 */
export const getAdminNewsSourcesOptions = async () => {
  return await apiFetch('/api/admin/news-sources/options');
};

// ==========================================
// NEWS IMPORTS API
// ==========================================

export const triggerAdminNewsImport = async (source) => {
  return await apiFetch('/api/admin/news-import/runs/trigger', {
    method: 'POST',
    body: { source },
  });
};

export const getAdminNewsImportRuns = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return await apiFetch(`/api/admin/news-import/runs?${query}`);
};

export const getAdminNewsImportRunDetail = async (id) => {
  return await apiFetch(`/api/admin/news-import/runs/${id}`);
};
