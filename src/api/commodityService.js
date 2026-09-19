/**
 * Vyapari Darbaar - Commodity API Service
 * Comprehensive API client for all Commodity Master endpoints:
 * - Commodity Categories (/api/admin/commodity-categories)
 * - Commodities (/api/admin/commodities)
 * - Commodity Subcategories (/api/admin/commodity-subcategories)
 * - Commodity Varieties (/api/admin/commodity-varieties)
 * - Commodity Grades (/api/admin/commodity-grades)
 */

import { apiFetch } from './config';

/**
 * Helper to build URL query strings cleanly from an object
 * @param {string} endpoint
 * @param {Record<string, any>} [params]
 * @returns {string}
 */
function buildUrl(endpoint, params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, String(value));
    }
  });
  const queryString = query.toString();
  return queryString ? `${endpoint}?${queryString}` : endpoint;
}

/* =========================================================================
 * 1. COMMODITY CATEGORIES API
 * ========================================================================= */

/**
 * List Commodity Categories with pagination, search, status, and sorting
 * @param {Object} [params]
 * @param {number} [params.page=1]
 * @param {number} [params.per_page=20]
 * @param {string} [params.search]
 * @param {boolean|number|string} [params.status]
 * @param {string} [params.sort_by='sort_order']
 * @param {'asc'|'desc'} [params.sort_order='asc']
 */
export async function getCommodityCategories(params = {}) {
  const url = buildUrl('/api/admin/commodity-categories', params);
  return await apiFetch(url, { method: 'GET' });
}

/**
 * Get Commodity Category dropdown options (id, name, slug)
 */
export async function getCommodityCategoryOptions() {
  return await apiFetch('/api/admin/commodity-categories/options', { method: 'GET' });
}

/**
 * Create a new Commodity Category
 * @param {Object} data
 * @param {string} data.name
 * @param {string} [data.slug]
 * @param {string} [data.description]
 * @param {number} [data.sort_order=1]
 * @param {boolean} [data.status=true]
 */
export async function createCommodityCategory(data) {
  return await apiFetch('/api/admin/commodity-categories', {
    method: 'POST',
    body: data,
  });
}

/**
 * Get Commodity Category detail by ID
 * @param {number|string} id
 */
export async function getCommodityCategory(id) {
  return await apiFetch(`/api/admin/commodity-categories/${id}`, { method: 'GET' });
}

/**
 * Update an existing Commodity Category
 * @param {number|string} id
 * @param {Object} data
 */
export async function updateCommodityCategory(id, data) {
  return await apiFetch(`/api/admin/commodity-categories/${id}`, {
    method: 'PUT',
    body: data,
  });
}

/**
 * Toggle single Commodity Category active/inactive status
 * @param {number|string} id
 * @param {boolean} status
 */
export async function updateCommodityCategoryStatus(id, status) {
  return await apiFetch(`/api/admin/commodity-categories/${id}/status`, {
    method: 'PATCH',
    body: { status },
  });
}

/**
 * Bulk update status for multiple Commodity Categories
 * @param {Array<number|string>} ids
 * @param {boolean} status
 */
export async function bulkUpdateCommodityCategoryStatus(ids, status) {
  return await apiFetch('/api/admin/commodity-categories/bulk-status', {
    method: 'PATCH',
    body: { ids, status },
  });
}

/**
 * Delete a Commodity Category by ID
 * @param {number|string} id
 */
export async function deleteCommodityCategory(id) {
  return await apiFetch(`/api/admin/commodity-categories/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Bulk delete Commodity Categories
 * @param {Array<number|string>} ids
 */
export async function bulkDeleteCommodityCategories(ids) {
  return await apiFetch('/api/admin/commodity-categories/bulk-delete', {
    method: 'POST',
    body: { ids },
  });
}

/* =========================================================================
 * 2. COMMODITIES API
 * ========================================================================= */

/**
 * List Commodities with filters, search, pagination, and sorting
 * @param {Object} [params]
 * @param {number} [params.page=1]
 * @param {number} [params.per_page=20]
 * @param {number|string} [params.commodity_category_id]
 * @param {string} [params.search]
 * @param {boolean|number|string} [params.status]
 * @param {string} [params.sort_by='sort_order']
 * @param {'asc'|'desc'} [params.sort_order='asc']
 */
export async function getCommodities(params = {}) {
  const url = buildUrl('/api/admin/commodities', params);
  return await apiFetch(url, { method: 'GET' });
}

/**
 * Get Commodity dropdown options (optionally filtered by category)
 * @param {Object} [params]
 * @param {number|string} [params.commodity_category_id]
 */
export async function getCommodityOptions(params = {}) {
  const url = buildUrl('/api/admin/commodities/options', params);
  return await apiFetch(url, { method: 'GET' });
}

/**
 * Create a new Commodity (supports FormData with image or JSON)
 * @param {FormData|Object} data
 * @example
 * // If FormData:
 * const fd = new FormData();
 * fd.append('commodity_category_id', 1);
 * fd.append('name', 'Wheat');
 * fd.append('unit', 'QUINTAL');
 * fd.append('image', file);
 */
export async function createCommodity(data) {
  return await apiFetch('/api/admin/commodities', {
    method: 'POST',
    body: data,
  });
}

/**
 * Get Commodity detail by ID
 * @param {number|string} id
 */
export async function getCommodity(id) {
  return await apiFetch(`/api/admin/commodities/${id}`, { method: 'GET' });
}

/**
 * Update an existing Commodity
 * Note: If using FormData with file upload, pass PUT or use POST with _method='PUT'
 * @param {number|string} id
 * @param {FormData|Object} data
 */
export async function updateCommodity(id, data) {
  return await apiFetch(`/api/admin/commodities/${id}`, {
    method: 'PUT',
    body: data,
  });
}

/**
 * Toggle single Commodity active/inactive status
 * @param {number|string} id
 * @param {boolean} status
 */
export async function updateCommodityStatus(id, status) {
  return await apiFetch(`/api/admin/commodities/${id}/status`, {
    method: 'PATCH',
    body: { status },
  });
}

/**
 * Bulk update status for multiple Commodities
 * @param {Array<number|string>} ids
 * @param {boolean} status
 */
export async function bulkUpdateCommodityStatus(ids, status) {
  return await apiFetch('/api/admin/commodities/bulk-status', {
    method: 'PATCH',
    body: { ids, status },
  });
}

/**
 * Delete a Commodity by ID
 * @param {number|string} id
 */
export async function deleteCommodity(id) {
  return await apiFetch(`/api/admin/commodities/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Bulk delete Commodities
 * @param {Array<number|string>} ids
 */
export async function bulkDeleteCommodities(ids) {
  return await apiFetch('/api/admin/commodities/bulk-delete', {
    method: 'POST',
    body: { ids },
  });
}

/* =========================================================================
 * 3. COMMODITY SUBCATEGORIES API
 * ========================================================================= */

/**
 * List Commodity Subcategories
 * @param {Object} [params]
 * @param {number} [params.page=1]
 * @param {number} [params.per_page=20]
 * @param {number|string} [params.commodity_id]
 * @param {number|string} [params.commodity_category_id]
 * @param {string} [params.search]
 * @param {boolean|number|string} [params.status]
 * @param {string} [params.sort_by='sort_order']
 * @param {'asc'|'desc'} [params.sort_order='asc']
 */
export async function getCommoditySubcategories(params = {}) {
  const url = buildUrl('/api/admin/commodity-subcategories', params);
  return await apiFetch(url, { method: 'GET' });
}

/**
 * Get Commodity Subcategory dropdown options (optionally filtered by commodity_id)
 * @param {Object} [params]
 * @param {number|string} [params.commodity_id]
 */
export async function getCommoditySubcategoryOptions(params = {}) {
  const url = buildUrl('/api/admin/commodity-subcategories/options', params);
  return await apiFetch(url, { method: 'GET' });
}

/**
 * Create a new Commodity Subcategory
 * @param {Object} data
 * @param {number|string} data.commodity_id
 * @param {string} data.name
 * @param {string} [data.slug]
 * @param {string} [data.description]
 * @param {number} [data.sort_order=1]
 * @param {boolean} [data.status=true]
 */
export async function createCommoditySubcategory(data) {
  return await apiFetch('/api/admin/commodity-subcategories', {
    method: 'POST',
    body: data,
  });
}

/**
 * Get Commodity Subcategory detail by ID
 * @param {number|string} id
 */
export async function getCommoditySubcategory(id) {
  return await apiFetch(`/api/admin/commodity-subcategories/${id}`, { method: 'GET' });
}

/**
 * Update an existing Commodity Subcategory
 * @param {number|string} id
 * @param {Object} data
 */
export async function updateCommoditySubcategory(id, data) {
  return await apiFetch(`/api/admin/commodity-subcategories/${id}`, {
    method: 'PUT',
    body: data,
  });
}

/**
 * Toggle single Commodity Subcategory active/inactive status
 * @param {number|string} id
 * @param {boolean} status
 */
export async function updateCommoditySubcategoryStatus(id, status) {
  return await apiFetch(`/api/admin/commodity-subcategories/${id}/status`, {
    method: 'PATCH',
    body: { status },
  });
}

/**
 * Bulk update status for multiple Commodity Subcategories
 * @param {Array<number|string>} ids
 * @param {boolean} status
 */
export async function bulkUpdateCommoditySubcategoryStatus(ids, status) {
  return await apiFetch('/api/admin/commodity-subcategories/bulk-status', {
    method: 'PATCH',
    body: { ids, status },
  });
}

/**
 * Delete a Commodity Subcategory by ID
 * @param {number|string} id
 */
export async function deleteCommoditySubcategory(id) {
  return await apiFetch(`/api/admin/commodity-subcategories/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Bulk delete Commodity Subcategories
 * @param {Array<number|string>} ids
 */
export async function bulkDeleteCommoditySubcategories(ids) {
  return await apiFetch('/api/admin/commodity-subcategories/bulk-delete', {
    method: 'POST',
    body: { ids },
  });
}

/* =========================================================================
 * 4. COMMODITY VARIETIES API
 * ========================================================================= */

/**
 * List Commodity Varieties
 * @param {Object} [params]
 * @param {number} [params.page=1]
 * @param {number} [params.per_page=20]
 * @param {number|string} [params.commodity_category_id]
 * @param {number|string} [params.commodity_id]
 * @param {number|string} [params.commodity_subcategory_id]
 * @param {string} [params.search]
 * @param {boolean|number|string} [params.status]
 * @param {string} [params.sort_by='sort_order']
 * @param {'asc'|'desc'} [params.sort_order='asc']
 */
export async function getCommodityVarieties(params = {}) {
  const url = buildUrl('/api/admin/commodity-varieties', params);
  return await apiFetch(url, { method: 'GET' });
}

/**
 * Get Commodity Variety dropdown options
 * @param {Object} [params]
 * @param {number|string} [params.commodity_id]
 * @param {number|string} [params.commodity_subcategory_id]
 */
export async function getCommodityVarietyOptions(params = {}) {
  const url = buildUrl('/api/admin/commodity-varieties/options', params);
  return await apiFetch(url, { method: 'GET' });
}

/**
 * Create a new Commodity Variety
 * @param {Object} data
 * @param {number|string} data.commodity_id
 * @param {number|string} [data.commodity_subcategory_id]
 * @param {string} data.name
 * @param {string} [data.slug]
 * @param {string} [data.description]
 * @param {number} [data.sort_order=1]
 * @param {boolean} [data.status=true]
 */
export async function createCommodityVariety(data) {
  return await apiFetch('/api/admin/commodity-varieties', {
    method: 'POST',
    body: data,
  });
}

/**
 * Get Commodity Variety detail by ID
 * @param {number|string} id
 */
export async function getCommodityVariety(id) {
  return await apiFetch(`/api/admin/commodity-varieties/${id}`, { method: 'GET' });
}

/**
 * Update an existing Commodity Variety
 * @param {number|string} id
 * @param {Object} data
 */
export async function updateCommodityVariety(id, data) {
  return await apiFetch(`/api/admin/commodity-varieties/${id}`, {
    method: 'PUT',
    body: data,
  });
}

/**
 * Toggle single Commodity Variety active/inactive status
 * @param {number|string} id
 * @param {boolean} status
 */
export async function updateCommodityVarietyStatus(id, status) {
  return await apiFetch(`/api/admin/commodity-varieties/${id}/status`, {
    method: 'PATCH',
    body: { status },
  });
}

/**
 * Bulk update status for multiple Commodity Varieties
 * @param {Array<number|string>} ids
 * @param {boolean} status
 */
export async function bulkUpdateCommodityVarietyStatus(ids, status) {
  return await apiFetch('/api/admin/commodity-varieties/bulk-status', {
    method: 'PATCH',
    body: { ids, status },
  });
}

/**
 * Delete a Commodity Variety by ID
 * @param {number|string} id
 */
export async function deleteCommodityVariety(id) {
  return await apiFetch(`/api/admin/commodity-varieties/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Bulk delete Commodity Varieties
 * @param {Array<number|string>} ids
 */
export async function bulkDeleteCommodityVarieties(ids) {
  return await apiFetch('/api/admin/commodity-varieties/bulk-delete', {
    method: 'POST',
    body: { ids },
  });
}

/* =========================================================================
 * 5. COMMODITY GRADES API
 * ========================================================================= */

/**
 * List Commodity Grades
 * @param {Object} [params]
 * @param {number} [params.page=1]
 * @param {number} [params.per_page=20]
 * @param {number|string} [params.commodity_id]
 * @param {string} [params.sort_by='sort_order']
 * @param {'asc'|'desc'} [params.sort_order='asc']
 */
export async function getCommodityGrades(params = {}) {
  const url = buildUrl('/api/admin/commodity-grades', params);
  return await apiFetch(url, { method: 'GET' });
}

/**
 * Get Commodity Grade dropdown options
 * @param {Object} [params]
 * @param {number|string} [params.commodity_id]
 */
export async function getCommodityGradeOptions(params = {}) {
  const url = buildUrl('/api/admin/commodity-grades/options', params);
  return await apiFetch(url, { method: 'GET' });
}

/**
 * Create a new Commodity Grade
 * @param {Object} data
 * @param {number|string} data.commodity_id
 * @param {number|string} [data.commodity_subcategory_id]
 * @param {number|string} [data.commodity_variety_id]
 * @param {string} data.name
 * @param {string} [data.slug]
 * @param {string} [data.description]
 * @param {number} [data.sort_order=1]
 * @param {boolean} [data.status=true]
 */
export async function createCommodityGrade(data) {
  return await apiFetch('/api/admin/commodity-grades', {
    method: 'POST',
    body: data,
  });
}

/**
 * Get Commodity Grade detail by ID
 * @param {number|string} id
 */
export async function getCommodityGrade(id) {
  return await apiFetch(`/api/admin/commodity-grades/${id}`, { method: 'GET' });
}

/**
 * Update an existing Commodity Grade
 * @param {number|string} id
 * @param {Object} data
 */
export async function updateCommodityGrade(id, data) {
  return await apiFetch(`/api/admin/commodity-grades/${id}`, {
    method: 'PUT',
    body: data,
  });
}

/**
 * Toggle single Commodity Grade active/inactive status
 * @param {number|string} id
 * @param {boolean} status
 */
export async function updateCommodityGradeStatus(id, status) {
  return await apiFetch(`/api/admin/commodity-grades/${id}/status`, {
    method: 'PATCH',
    body: { status },
  });
}

/**
 * Bulk update status for multiple Commodity Grades
 * @param {Array<number|string>} ids
 * @param {boolean} status
 */
export async function bulkUpdateCommodityGradeStatus(ids, status) {
  return await apiFetch('/api/admin/commodity-grades/bulk-status', {
    method: 'PATCH',
    body: { ids, status },
  });
}

/**
 * Delete a Commodity Grade by ID
 * @param {number|string} id
 */
export async function deleteCommodityGrade(id) {
  return await apiFetch(`/api/admin/commodity-grades/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Bulk delete Commodity Grades
 * @param {Array<number|string>} ids
 */
export async function bulkDeleteCommodityGrades(ids) {
  return await apiFetch('/api/admin/commodity-grades/bulk-delete', {
    method: 'POST',
    body: { ids },
  });
}

/* =========================================================================
 * 6. LOCATION & MANDI MASTERS API (OPTIONS)
 * ========================================================================= */

/**
 * Get State dropdown options
 */
export async function getStateOptions() {
  return await apiFetch('/api/admin/states/options', { method: 'GET' });
}

/**
 * Get District dropdown options
 * @param {Object} [params]
 * @param {number|string} [params.state_id]
 */
export async function getDistrictOptions(params = {}) {
  const url = buildUrl('/api/admin/districts/options', params);
  return await apiFetch(url, { method: 'GET' });
}

/**
 * Get Mandi dropdown options (district / state scoped)
 * @param {Object} [params]
 * @param {number|string} [params.district_id]
 * @param {number|string} [params.state_id]
 */
export async function getMandiOptions(params = {}) {
  const url = buildUrl('/api/admin/mandis/options', params);
  return await apiFetch(url, { method: 'GET' });
}

/* =========================================================================
 * 7. EXCHANGE & INSTRUMENT MASTERS API (OPTIONS)
 * ========================================================================= */

/**
 * Get Exchange dropdown options (MCX, NCDEX, etc.)
 */
export async function getExchangeOptions() {
  return await apiFetch('/api/admin/exchanges/options', { method: 'GET' });
}

/**
 * Get Commodity Mapping Options under an exchange
 * @param {Object} [params]
 * @param {number|string} [params.exchange_id]
 */
export async function getExchangeCommodityMappingOptions(params = {}) {
  const url = buildUrl('/api/admin/exchange-commodity-mappings/options', params);
  return await apiFetch(url, { method: 'GET' });
}

/**
 * Get Exchange Instrument Options under a mapping
 * @param {Object} [params]
 * @param {number|string} [params.exchange_commodity_mapping_id]
 */
export async function getExchangeInstrumentOptions(params = {}) {
  const url = buildUrl('/api/admin/exchange-instruments/options', params);
  return await apiFetch(url, { method: 'GET' });
}

export default {
  // Categories
  getCategories: getCommodityCategories,
  getCategoryOptions: getCommodityCategoryOptions,
  createCategory: createCommodityCategory,
  getCategory: getCommodityCategory,
  updateCategory: updateCommodityCategory,
  updateCategoryStatus: updateCommodityCategoryStatus,
  bulkUpdateCategoryStatus: bulkUpdateCommodityCategoryStatus,
  deleteCategory: deleteCommodityCategory,
  bulkDeleteCategories: bulkDeleteCommodityCategories,

  // Commodities
  getCommodities,
  getCommodityOptions,
  createCommodity,
  getCommodity,
  updateCommodity,
  updateCommodityStatus,
  bulkUpdateCommodityStatus,
  deleteCommodity,
  bulkDeleteCommodities,

  // Subcategories
  getSubcategories: getCommoditySubcategories,
  getSubcategoryOptions: getCommoditySubcategoryOptions,
  createSubcategory: createCommoditySubcategory,
  getSubcategory: getCommoditySubcategory,
  updateSubcategory: updateCommoditySubcategory,
  updateSubcategoryStatus: updateCommoditySubcategoryStatus,
  bulkUpdateSubcategoryStatus: bulkUpdateCommoditySubcategoryStatus,
  deleteSubcategory: deleteCommoditySubcategory,
  bulkDeleteSubcategories: bulkDeleteCommoditySubcategories,

  // Varieties
  getVarieties: getCommodityVarieties,
  getVarietyOptions: getCommodityVarietyOptions,
  createVariety: createCommodityVariety,
  getVariety: getCommodityVariety,
  updateVariety: updateCommodityVariety,
  updateVarietyStatus: updateCommodityVarietyStatus,
  bulkUpdateVarietyStatus: bulkUpdateCommodityVarietyStatus,
  deleteVariety: deleteCommodityVariety,
  bulkDeleteVarieties: bulkDeleteCommodityVarieties,

  // Grades
  getGrades: getCommodityGrades,
  getGradeOptions: getCommodityGradeOptions,
  createGrade: createCommodityGrade,
  getGrade: getCommodityGrade,
  updateGrade: updateCommodityGrade,
  updateGradeStatus: updateCommodityGradeStatus,
  bulkUpdateGradeStatus: bulkUpdateCommodityGradeStatus,
  deleteGrade: deleteCommodityGrade,
  bulkDeleteGrades: bulkDeleteCommodityGrades,

  // Locations & Mandis
  getStateOptions,
  getDistrictOptions,
  getMandiOptions,

  // Exchanges & Instruments
  getExchangeOptions,
  getExchangeCommodityMappingOptions,
  getExchangeInstrumentOptions,
};
