import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { updateAdminProfileName, sendEmailUpdateOtp, updateAdminProfileEmail, getAdminSessions } from '../api/adminAuth';
import './AdminProfile.css';

export default function AdminProfile() {
  const { admin, refreshProfile, logoutAll } = useAdminAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [nameMessage, setNameMessage] = useState('');
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [sessionsError, setSessionsError] = useState('');

  useEffect(() => {
    if (admin) {
      setFirstName(admin.first_name || '');
      setLastName(admin.last_name || '');
      setEmail(admin.email || '');
    }
  }, [admin]);

  useEffect(() => {
    async function fetchSessions() {
      setLoadingSessions(true);
      setSessionsError('');
      try {
        const res = await getAdminSessions();
        if (res?.status) {
          setSessions(res.data || []);
        } else {
          setSessionsError(res?.message || 'Failed to load sessions.');
        }
      } catch (err) {
        setSessionsError(err.message || 'Error loading sessions.');
      } finally {
        setLoadingSessions(false);
      }
    }
    fetchSessions();
  }, []);

  const handleUpdateName = async (e) => {
    e.preventDefault();
    setNameError('');
    setNameMessage('');
    setIsUpdatingName(true);
    try {
      const computedName = `${firstName} ${lastName}`.trim();
      const res = await updateAdminProfileName({ first_name: firstName, last_name: lastName, name: computedName });
      if (res?.status) {
        setNameMessage('Profile updated successfully.');
        await refreshProfile();
      } else {
        setNameError(res?.message || 'Failed to update profile.');
      }
    } catch (err) {
      setNameError(err.message || 'Error updating profile.');
    } finally {
      setIsUpdatingName(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setEmailError('');
    setEmailMessage('');
    if (!email || email === admin.email) {
      setEmailError('Please enter a new email address.');
      return;
    }
    setIsSendingOtp(true);
    try {
      const res = await sendEmailUpdateOtp({ email });
      if (res?.status) {
        setOtpSent(true);
        setEmailMessage('OTP sent to new email address.');
      } else {
        setEmailError(res?.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setEmailError(err.message || 'Error sending OTP.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    setEmailError('');
    setEmailMessage('');
    if (!otp) {
      setEmailError('Please enter the OTP.');
      return;
    }
    setIsUpdatingEmail(true);
    try {
      const computedName = `${firstName} ${lastName}`.trim();
      const res = await updateAdminProfileEmail({ 
        first_name: firstName, 
        last_name: lastName, 
        name: computedName, 
        email, 
        otp 
      });
      if (res?.status) {
        setEmailMessage('Email updated successfully.');
        setOtpSent(false);
        setOtp('');
        await refreshProfile();
      } else {
        setEmailError(res?.message || 'Failed to update email.');
      }
    } catch (err) {
      setEmailError(err.message || 'Error updating email.');
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  const handleLogoutAll = async () => {
    if (window.confirm("Are you sure you want to log out from all devices? You will be logged out of this device as well.")) {
      await logoutAll();
      navigate('/login');
    }
  };

  return (
    <div className="admin-profile-wrapper">
      <h2 className="admin-profile-title">Admin Profile</h2>
      <p className="admin-profile-desc">Update your personal details and contact information.</p>
      
      <div className="profile-cards-container">
        {/* Account Info Card */}
        <div className="profile-card full-width">
          <h3>Account Information</h3>
          <div className="account-info-grid">
            <div className="info-item">
              <span className="info-label">Full Name</span>
              <span className="info-value">
                {admin?.full_name || admin?.name || 'N/A'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Roles</span>
              <span className="info-value">
                {admin?.roles?.map(r => r.name.replace('_', ' ').toUpperCase()).join(', ') || 'N/A'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Status</span>
              <span className={`info-badge ${admin?.status === 'active' ? 'active' : 'inactive'}`}>
                {admin?.status ? admin.status.toUpperCase() : 'N/A'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Login</span>
              <span className="info-value">
                {admin?.last_login_at ? new Date(admin.last_login_at).toLocaleString() : 'N/A'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since</span>
              <span className="info-value">
                {admin?.created_at ? new Date(admin.created_at).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Update Personal Details Card */}
        <div className="profile-card">
          <h3>Personal Details</h3>
          {nameMessage && <div className="alert success">{nameMessage}</div>}
          {nameError && <div className="alert error">{nameError}</div>}
          <form onSubmit={handleUpdateName}>
            <div className="form-group">
              <label>First Name</label>
              <input 
                type="text" 
                value={firstName} 
                onChange={e => setFirstName(e.target.value)} 
                placeholder="Enter First Name"
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input 
                type="text" 
                value={lastName} 
                onChange={e => setLastName(e.target.value)} 
                placeholder="Enter Last Name"
              />
            </div>
            <button 
              type="submit" 
              className="btn primary"
              disabled={isUpdatingName}
            >
              {isUpdatingName ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Update Email Card */}
        <div className="profile-card">
          <h3>Update Email</h3>
          {emailMessage && <div className="alert success">{emailMessage}</div>}
          {emailError && <div className="alert error">{emailError}</div>}
          <form onSubmit={otpSent ? handleUpdateEmail : handleSendOtp}>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => {
                  setEmail(e.target.value);
                  setOtpSent(false);
                  setOtp('');
                }} 
                placeholder="Enter new email address"
                required
              />
            </div>

            {otpSent && (
              <div className="form-group">
                <label>Verification OTP</label>
                <input 
                  type="text" 
                  value={otp} 
                  onChange={e => setOtp(e.target.value)} 
                  placeholder="Enter 6-digit OTP"
                  required
                />
              </div>
            )}

            {!otpSent ? (
              <button 
                type="submit" 
                className="btn primary"
                disabled={isSendingOtp || email === admin?.email}
              >
                {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
              </button>
            ) : (
              <div className="btn-group">
                <button 
                  type="submit" 
                  className="btn primary"
                  disabled={isUpdatingEmail}
                >
                  {isUpdatingEmail ? 'Updating Email...' : 'Verify & Update Email'}
                </button>
                <button 
                  type="button" 
                  className="btn text-btn"
                  onClick={handleSendOtp}
                  disabled={isSendingOtp}
                >
                  Resend OTP
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Active Sessions Card */}
        <div className="profile-card full-width">
          <h3>Active Sessions</h3>
          <p className="admin-profile-desc" style={{ marginBottom: '20px' }}>
            Here is a list of devices that have logged into your account.
          </p>

          {loadingSessions ? (
            <div className="sessions-skeleton">
              <div className="skeleton-item" />
              <div className="skeleton-item" />
              <div className="skeleton-item" />
            </div>
          ) : sessionsError ? (
            <div className="alert error">{sessionsError}</div>
          ) : sessions.length === 0 ? (
            <div className="no-data">No active sessions found.</div>
          ) : (
            <div className="sessions-list">
              {sessions.map((session) => {
                const isMobile = (session.device_name || '').toLowerCase().match(/iphone|android|mobile/);
                return (
                  <div key={session.id} className={`session-item ${session.is_current_device ? 'current' : ''}`}>
                    <div className="session-icon">
                      {isMobile ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                          <line x1="12" y1="18" x2="12.01" y2="18"></line>
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                          <line x1="8" y1="21" x2="16" y2="21"></line>
                          <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                      )}
                    </div>
                    <div className="session-details">
                      <div className="session-device-name">
                        {session.device_name || 'Unknown Device'}
                        {session.is_current_device && <span className="current-badge">Current Device</span>}
                      </div>
                      <div className="session-meta">
                        <span>Last used: {session.last_used_at || 'Unknown'}</span>
                        <span className="dot">•</span>
                        <span>Started on: {session.created_at || 'Unknown'}</span>
                      </div>
                    </div>
                    {!session.is_current_device && (
                      <button className="btn revoke-btn" onClick={() => alert('Revoke functionality to be added.')}>
                        Revoke
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Security Card */}
        <div className="profile-card full-width">
          <h3>Security</h3>
          <p className="admin-profile-desc" style={{ marginBottom: '16px' }}>
            Secure your account by managing your active sessions across devices.
          </p>
          <button 
            type="button" 
            className="btn primary" 
            style={{ backgroundColor: '#dc2626' }}
            onClick={handleLogoutAll}
          >
            Logout All Devices
          </button>
        </div>
      </div>
    </div>
  );
}
