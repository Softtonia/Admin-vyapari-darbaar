import { apiFetch } from './config';

const BASE_URL = '/api/admin/campaigns';

export async function fetchCampaignEvents() {
  return await apiFetch(`${BASE_URL}/events`, { method: 'GET' });
}

export async function fetchCampaigns(params = {}) {
  const query = new URLSearchParams(params).toString();
  return await apiFetch(`${BASE_URL}?${query}`, { method: 'GET' });
}

export async function fetchCampaign(id) {
  return await apiFetch(`${BASE_URL}/${id}`, { method: 'GET' });
}

export async function createCampaign(data) {
  return await apiFetch(BASE_URL, {
    method: 'POST',
    body: data,
  });
}

export async function updateCampaign(id, data) {
  return await apiFetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: data,
  });
}

export async function toggleCampaignStatus(id, isActive) {
  return await apiFetch(`${BASE_URL}/${id}/status`, {
    method: 'PATCH',
    body: { is_active: isActive },
  });
}

export async function deleteCampaign(id) {
  return await apiFetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
}

export async function bulkDeleteCampaigns(ids) {
  return await apiFetch(`${BASE_URL}/bulk-delete`, {
    method: 'POST',
    body: { ids },
  });
}

export async function fetchAdminUsers(params = {}) {
  const query = new URLSearchParams(params).toString();
  return await apiFetch(`/api/admin/users?${query}`, { method: 'GET' });
}
