import { apiFetch } from './config';

const BASE_URL = '/api/admin/email-templates';

export async function fetchEmailTemplates(params = {}) {
  const query = new URLSearchParams(params).toString();
  return await apiFetch(`${BASE_URL}?${query}`, { method: 'GET' });
}

export async function fetchEmailTemplate(id) {
  return await apiFetch(`${BASE_URL}/${id}`, { method: 'GET' });
}

export async function createEmailTemplate(data) {
  return await apiFetch(BASE_URL, {
    method: 'POST',
    body: data,
  });
}

export async function updateEmailTemplate(id, data) {
  return await apiFetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: data,
  });
}

export async function toggleEmailTemplateStatus(id, isActive) {
  return await apiFetch(`${BASE_URL}/${id}/status`, {
    method: 'PATCH',
    body: { is_active: isActive },
  });
}

export async function deleteEmailTemplate(id) {
  return await apiFetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
}

export async function bulkDeleteEmailTemplates(ids) {
  return await apiFetch(`${BASE_URL}/bulk-delete`, {
    method: 'POST',
    body: { ids },
  });
}

export async function fetchPlaceholders() {
  return await apiFetch(`${BASE_URL}/placeholders`, { method: 'GET' });
}

export async function previewEmailTemplate(data) {
  return await apiFetch(`${BASE_URL}/preview`, {
    method: 'POST',
    body: data,
  });
}
