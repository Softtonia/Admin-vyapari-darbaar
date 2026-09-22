/**
 * Vyapari Darbaar - Activity Log API Service
 * Handles fetching system activity logs via /api/admin/activity-logs
 */

import { apiFetch } from './config';

/**
 * Fetch paginated system activity logs
 * Endpoint: GET /api/admin/activity-logs
 *
 * @param {Object} params
 * @param {number}  [params.page=1]
 * @param {number}  [params.per_page=20]
 * @param {string}  [params.search]       - Keyword search across description, module, action, IP, user
 * @param {string}  [params.module]       - Filter by module (e.g. "Website", "News")
 * @param {string}  [params.action]       - Filter by action (e.g. "Updated", "Created")
 * @param {string}  [params.status]       - Filter by status (e.g. "Success", "Failed")
 * @param {string}  [params.date_from]    - ISO date string (e.g. "2026-09-01")
 * @param {string}  [params.date_to]      - ISO date string (e.g. "2026-09-30")
 * @param {string}  [params.sort_by]      - Sort field: id, created_at, module, action, status
 * @param {string}  [params.sort_order]   - "asc" or "desc"
 * @returns {Promise<{ status: boolean, message: string, data: { total_logs: number, items: Array, pagination: { current_page: number, per_page: number, total: number, last_page: number } } }>}
 */
export async function getActivityLogs(params = {}) {
  const query = new URLSearchParams();

  if (params.page) query.set('page', String(params.page));
  if (params.per_page) query.set('per_page', String(params.per_page));
  if (params.search) query.set('search', params.search);
  if (params.module && params.module !== 'All Modules') query.set('module', params.module);
  if (params.action && params.action !== 'All Actions') query.set('action', params.action);
  if (params.status && params.status !== 'All Status') query.set('status', params.status);
  if (params.date_from) query.set('date_from', params.date_from);
  if (params.date_to) query.set('date_to', params.date_to);
  if (params.sort_by) query.set('sort_by', params.sort_by);
  if (params.sort_order) query.set('sort_order', params.sort_order);

  const qs = query.toString();
  const url = `/api/admin/activity-logs${qs ? `?${qs}` : ''}`;

  return await apiFetch(url, { method: 'GET' });
}

/**
 * Fetch a single activity log detail
 * Endpoint: GET /api/admin/activity-logs/:id
 *
 * @param {number|string} id
 * @returns {Promise<{ status: boolean, message: string, data: Object }>}
 */
export async function getActivityLogDetail(id) {
  return await apiFetch(`/api/admin/activity-logs/${id}`, { method: 'GET' });
}

/**
 * Fetch distinct modules for filter dropdown
 * Endpoint: GET /api/admin/activity-logs/modules
 *
 * @returns {Promise<{ status: boolean, message: string, data: Array<{ module: string, count: number }> }>}
 */
export async function getActivityLogModules() {
  return await apiFetch('/api/admin/activity-logs/modules', { method: 'GET' });
}

/**
 * Fetch distinct actions for filter dropdown
 * Endpoint: GET /api/admin/activity-logs/actions
 *
 * @returns {Promise<{ status: boolean, message: string, data: Array<{ action: string, count: number }> }>}
 */
export async function getActivityLogActions() {
  return await apiFetch('/api/admin/activity-logs/actions', { method: 'GET' });
}

/**
 * Delete a single activity log entry
 * Endpoint: DELETE /api/admin/activity-logs/:id
 *
 * @param {number|string} id
 * @returns {Promise<{ status: boolean, message: string }>}
 */
export async function deleteActivityLog(id) {
  return await apiFetch(`/api/admin/activity-logs/${id}`, { method: 'DELETE' });
}

/**
 * Bulk delete activity log entries
 * Endpoint: POST /api/admin/activity-logs/bulk-delete
 *
 * @param {Object} payload - { ids?: number[], delete_all?: boolean }
 * @returns {Promise<{ status: boolean, message: string, data?: { deleted_count: number } }>}
 */
export async function bulkDeleteActivityLogs(payload) {
  return await apiFetch('/api/admin/activity-logs/bulk-delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
  });
}
