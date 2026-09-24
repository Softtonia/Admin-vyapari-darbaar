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
 * Verify Reset Password Token
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.token
 * @returns {Promise<{ status: boolean, message: string, data?: any }>}
 */
export async function adminVerifyResetToken({ email, token }) {
  const query = `?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
  try {
    return await apiFetch(`/api/user/verify-reset-token${query}`, {
      method: 'GET',
      skipAuth: true,
    });
  } catch (err) {
    if (err.status === 404 || (err.message && (err.message.includes('404') || err.message.includes('Not Found')))) {
      return await apiFetch(`/api/auth/admin/verify-reset-token${query}`, {
        method: 'GET',
        skipAuth: true,
      });
    }
    throw err;
  }
}

/**
 * Send Login OTP (Email / Phone / Username)
 * @param {Object} payload
 * @param {string} payload.email - email, username, or phone_number
 * @param {string} [payload.purpose] - default 'login'
 * @returns {Promise<{ status: boolean, message: string }>}
 */
export async function sendLoginOtp({ email, purpose = 'login' }) {
  try {
    return await apiFetch('/api/user/send-login-otp', {
      method: 'POST',
      body: {
        email: email.trim(),
        purpose,
      },
      skipAuth: true,
    });
  } catch (err) {
    if (err.status === 404 || (err.message && (err.message.includes('404') || err.message.includes('Not Found')))) {
      return await apiFetch('/api/auth/admin/send-login-otp', {
        method: 'POST',
        body: {
          email: email.trim(),
          purpose,
        },
        skipAuth: true,
      });
    }
    throw err;
  }
}

/**
 * Login with OTP
 * @param {Object} payload
 * @param {string} payload.email - email, username, or phone_number
 * @param {string} payload.otp - 6-digit OTP code
 * @returns {Promise<{ status: boolean, message: string, data?: { token: string, user?: any } }>}
 */
export async function loginWithOtp({ email, otp }) {
  let response;
  try {
    response = await apiFetch('/api/auth/admin/login-with-otp', {
      method: 'POST',
      body: {
        email: email.trim(),
        otp: otp.trim(),
      },
      skipAuth: true,
    });
  } catch (err) {
    if (err.status === 404 || (err.message && (err.message.includes('404') || err.message.includes('Not Found')))) {
      response = await apiFetch('/api/auth/admin/login-with-otp', {
        method: 'POST',
        body: {
          email: email.trim(),
          otp: otp.trim(),
        },
        skipAuth: true,
      });
    } else {
      throw err;
    }
  }

  const token = response?.data?.token || response?.token || response?.data?.access_token;
  if (token) {
    setAdminToken(token);
    try {
      localStorage.setItem('auth_token', token);
    } catch {}
  }
  const user = response?.data?.user || response?.user || response?.data?.admin;
  if (user) {
    setAdminUser(user);
  }

  return response;
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
 * Get Admin Sessions
 * @returns {Promise<{ status: boolean, message: string, data: any[] }>}
 */
export async function getAdminSessions() {
  return await apiFetch('/api/admin/profile/sessions', {
    method: 'GET',
  });
}

/**
 * Revoke Admin Session
 * @param {number|string} sessionId
 * @returns {Promise<{ status: boolean, message: string }>}
 */
export async function revokeAdminSession(sessionId) {
  return await apiFetch(`/api/admin/profile/sessions/${sessionId}`, {
    method: 'DELETE',
  });
}

/**
 * Update Admin Profile (Name only)
 * @param {Object} payload
 * @param {string} [payload.name]
 * @param {string} [payload.first_name]
 * @param {string} [payload.last_name]
 * @returns {Promise<{ status: boolean, data: any }>}
 */
export async function updateAdminProfileName({ name, first_name, last_name }) {
  const response = await apiFetch('/api/admin/profile', {
    method: 'PATCH',
    body: { name, first_name, last_name },
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
 * @param {string} [payload.first_name]
 * @param {string} [payload.last_name]
 * @param {string} payload.email
 * @param {string} payload.otp
 * @returns {Promise<{ status: boolean, data: any }>}
 */
export async function updateAdminProfileEmail({ name, first_name, last_name, email, otp }) {
  const body = { email: email.trim(), otp };
  if (name) body.name = name;
  if (first_name) body.first_name = first_name;
  if (last_name) body.last_name = last_name;

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

/**
 * Change Admin Password
 * @param {Object} payload
 * @param {string} payload.current_password
 * @param {string} payload.password
 * @param {string} payload.password_confirmation
 * @returns {Promise<{ status: boolean, message: string }>}
 */
export async function changeAdminPassword(payload) {
  return await apiFetch('/api/admin/change-password', {
    method: 'POST',
    body: payload,
  });
}

export default {
  login: adminLogin,
  forgotPassword: adminForgotPassword,
  resetPassword: adminResetPassword,
  verifyResetToken: adminVerifyResetToken,
  logout: adminLogout,
  logoutAll: adminLogoutAll,
  getProfile: getAdminProfile,
  updateProfileName: updateAdminProfileName,
  sendEmailOtp: sendEmailUpdateOtp,
  sendLoginOtp,
  loginWithOtp,
  getToken: getAdminToken,
  getUser: getAdminUser,
  changePassword: changeAdminPassword,
};
