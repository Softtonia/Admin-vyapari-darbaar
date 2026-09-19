import React, { createContext, useContext, useState, useEffect } from 'react';
import adminAuthService, {
  adminLogin,
  adminLogout,
  adminLogoutAll,
  adminForgotPassword,
  adminResetPassword,
  adminVerifyResetToken,
  getAdminProfile,
  sendLoginOtp as apiSendLoginOtp,
  loginWithOtp as apiLoginWithOtp,
} from '../api/adminAuth';
import { getAdminToken, getAdminUser } from '../api/config';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(getAdminToken());
  const [admin, setAdmin] = useState(getAdminUser());
  const [loading, setLoading] = useState(true);

  // Sync / validate session on app mount
  useEffect(() => {
    const existingToken = getAdminToken();
    const existingUser = getAdminUser();

    if (existingToken) {
      setToken(existingToken);
      setAdmin(existingUser);

      // Verify token with backend
      getAdminProfile()
        .then((res) => {
          if (res?.data) {
            setAdmin(res.data);
          }
        })
        .catch((err) => {
          // If token expired / invalid
          if (err.status === 401) {
            setToken(null);
            setAdmin(null);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password, deviceName) => {
    const res = await adminLogin({ email, password, device_name: deviceName });
    const newToken = res?.data?.token || res?.token || getAdminToken();
    const newUser = res?.data?.user || res?.data?.admin || getAdminUser() || { email };

    setToken(newToken);
    setAdmin(newUser);
    return res;
  };

  const logout = async () => {
    try {
      await adminLogout();
    } finally {
      setToken(null);
      setAdmin(null);
    }
  };

  const logoutAll = async () => {
    try {
      await adminLogoutAll();
    } finally {
      setToken(null);
      setAdmin(null);
    }
  };

  const forgotPassword = async (email) => {
    return await adminForgotPassword({ email });
  };

  const resetPassword = async (payload) => {
    return await adminResetPassword(payload);
  };

  const verifyResetToken = async ({ email, token }) => {
    return await adminVerifyResetToken({ email, token });
  };

  const sendLoginOtp = async (emailOrUsername, purpose = 'login') => {
    return await apiSendLoginOtp({ email: emailOrUsername, purpose });
  };

  const loginWithOtp = async (emailOrUsername, otp) => {
    const res = await apiLoginWithOtp({ email: emailOrUsername, otp });
    const newToken = res?.data?.token || res?.token || getAdminToken();
    const newUser = res?.data?.user || res?.data?.admin || getAdminUser() || { email: emailOrUsername };

    setToken(newToken);
    setAdmin(newUser);
    return res;
  };

  const refreshProfile = async () => {
    if (!token) return null;
    try {
      const res = await getAdminProfile();
      if (res?.data) {
        setAdmin(res.data);
      }
      return res?.data;
    } catch {
      return null;
    }
  };

  const value = {
    token,
    admin,
    isAuthenticated: Boolean(token),
    loading,
    login,
    logout,
    logoutAll,
    forgotPassword,
    resetPassword,
    verifyResetToken,
    sendLoginOtp,
    loginWithOtp,
    refreshProfile,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

export default AdminAuthContext;
