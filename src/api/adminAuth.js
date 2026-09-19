/**
 * Vyapari Darbaar - Admin Authentication API Services
 * Endpoints based on Postman Collection:
 * - POST /api/auth/admin/login
 * - POST /api/auth/admin/forgot-password
 * - POST /api/auth/admin/reset-password
 * - POST /api/auth/admin/logout
 * - POST /api/auth/admin/logout-all
 * - GET  /api/admin/profile
 * - PATCH /api/admin/profile
 */

import {
  apiFetch,
  setAdminToken,
  setAdminUser,
  clearAdminSession,
  getAdminToken,
  getAdminUser,
} from './config';

/**
 * Admin Login
 * @param {Object} credentials
 * @param {string} credentials.email - Admin email address
 * @param {string} credentials.password - Admin password
 * @param {string} [credentials.device_name='Vyapari Darbaar Admin Web']
 * @returns {Promise<{ status: boolean, message: string, data: { token: string, user?: any } }>}
 */
export async function adminLogin({ email, password, device_name = 'Vyapari Darbaar Admin Web' }) {
  const payload = {
    email: email.trim(),
    password,
    device_name,
  };

  const response = await apiFetch('/api/auth/admin/login', {
    method: 'POST',
    body: payload,
    skipAuth: true,
  });

  // Check if token returned
  const token = response?.data?.token || response?.token || response?.data?.access_token;
  if (token) {
    setAdminToken(token);
  }

  // Extract and save user profile if returned
  const user = response?.data?.user || response?.data?.admin || response?.user || { email };
  setAdminUser(user);

  return response;
}

/**
 * Admin Forgot Password
 * @param {Object} payload
 * @param {string} payload.email
 * @returns {Promise<{ status: boolean, message: string }>}
 */
export async function adminForgotPassword({ email }) {
  return await apiFetch('/api/auth/admin/forgot-password', {
    method: 'POST',
    body: { email: email.trim() },
    skipAuth: true,
  });
}

/**
 * Admin Reset Password
 * @param {Object} payload
 * @param {string} payload.token - Reset token received via email
 * @param {string} payload.email
 * @param {string} payload.password - New password
 * @param {string} payload.password_confirmation
 * @returns {Promise<{ status: boolean, message: string }>}
 */
export async function adminResetPassword({ token, email, password, password_confirmation }) {
  return await apiFetch('/api/auth/admin/reset-password', {
    method: 'POST',
    body: {
      token,
      email: (email || '').trim(),
      password,
      password_confirmation,
    },
    skipAuth: true,
  });
}

/**
 * Admin Logout (Current Device)
 * @returns {Promise<{ status: boolean, message: string }>}
 */
export async function adminLogout() {
  try {
    const response = await apiFetch('/api/auth/admin/logout', {
      method: 'POST',
    });
    return response;
  } finally {
    clearAdminSession();
  }
}

/**
 * Admin Logout All Devices
 * @returns {Promise<{ status: boolean, message: string }>}
 */
export async function adminLogoutAll() {
  try {
    const response = await apiFetch('/api/auth/admin/logout-all', {
      method: 'POST',
    });
    return response;
  } finally {
    clearAdminSession();
  }
}

/**
 * Get Admin Profile
 * @returns {Promise<{ status: boolean, data: any }>}
 */
export async function getAdminProfile() {
  const response = await apiFetch('/api/admin/profile', {
    method: 'GET',
  });

  if (response?.data) {
    setAdminUser(response.data);
  }

  return response;
}

/**
 * Update Admin Profile (Name only)
 * @param {Object} payload
 * @param {string} payload.name
 * @returns {Promise<{ status: boolean, data: any }>}
 */
export async function updateAdminProfileName({ name }) {
  const response = await apiFetch('/api/admin/profile', {
    method: 'PATCH',
    body: { name },
  });

  if (response?.data) {
    const current = getAdminUser() || {};
    setAdminUser({ ...current, ...response.data });
  }

  return response;
}

/**
 * Send Email Update OTP
 * @param {Object} payload
 * @param {string} payload.email - New email address
 * @returns {Promise<{ status: boolean, message: string }>}
 */
export async function sendEmailUpdateOtp({ email }) {
  return await apiFetch('/api/admin/profile/send-email-otp', {
    method: 'POST',
    body: { email: email.trim() },
  });
}

/**
 * Update Admin Profile with Email & OTP
 * @param {Object} payload
 * @param {string} [payload.name]
 * @param {string} payload.email
 * @param {string} payload.otp
 * @returns {Promise<{ status: boolean, data: any }>}
 */
export async function updateAdminProfileEmail({ name, email, otp }) {
  const body = { email: email.trim(), otp };
  if (name) body.name = name;

  const response = await apiFetch('/api/admin/profile', {
    method: 'PATCH',
    body,
  });

  if (response?.data) {
    const current = getAdminUser() || {};
    setAdminUser({ ...current, ...response.data });
  }

  return response;
}

export default {
  login: adminLogin,
  forgotPassword: adminForgotPassword,
  resetPassword: adminResetPassword,
  logout: adminLogout,
  logoutAll: adminLogoutAll,
  getProfile: getAdminProfile,
  updateProfileName: updateAdminProfileName,
  sendEmailOtp: sendEmailUpdateOtp,
  updateProfileEmail: updateAdminProfileEmail,
  getToken: getAdminToken,
  getUser: getAdminUser,
};
