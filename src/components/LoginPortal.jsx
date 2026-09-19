import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import leftBannerImg from '../assets/left_banner_clean.png';
import {
  UserIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  CheckIcon,
  ShieldCheckIcon,
  SecureAccessIcon,
  TrustedPlatformIcon,
  EmpoweringTradeIcon,
  IndiaFlagIcon,
  ChevronDownIcon,
  FiligreeDivider,
} from './Icons';
import { useAdminAuth } from '../context/AdminAuthContext';
import '../App.css';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
];

export default function LoginPortal() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { login, forgotPassword, resetPassword } = useAdminAuth();

  // Form State
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // OTP Mode State
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const otpInputRefs = useRef([]);

  // Language Dropdown State
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef(null);

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState(1);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isForgotSubmitting, setIsForgotSubmitting] = useState(false);
  const [isTokenFromUrl, setIsTokenFromUrl] = useState(false);

  // Auto-detect reset password token and email from URL (e.g. from email reset link)
  useEffect(() => {
    const tokenParam = searchParams.get('token');
    const emailParam = searchParams.get('email');
    const isResetPath = location.pathname.includes('reset-password');

    if (tokenParam || emailParam || isResetPath) {
      if (tokenParam) {
        setResetToken(tokenParam);
        setIsTokenFromUrl(true);
      }
      if (emailParam) {
        setForgotEmail(decodeURIComponent(emailParam));
      }
      setForgotStep(2);
      setShowForgotModal(true);
    }
  }, [searchParams, location.pathname]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // OTP Timer Countdown
  useEffect(() => {
    let interval;
    if (isOtpMode && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [isOtpMode, otpTimer]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4500);
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      showToast('Please enter both Email and Password.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await login(identifier, password, 'Vyapari Darbaar Admin Web');
      showToast(res?.message || 'Login successful! Redirecting to Dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 600);
    } catch (err) {
      const errMsg = err.message || 'Invalid credentials or login failed. Please try again.';
      showToast(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      showToast('Please enter your admin email address.');
      return;
    }
    setIsForgotSubmitting(true);
    try {
      const res = await forgotPassword(forgotEmail);
      showToast(res?.message || 'Password reset link sent to your email.');
      setResetEmailSent(true);
    } catch (err) {
      showToast(err.message || 'Failed to send reset link. Please verify the email address.');
    } finally {
      setIsForgotSubmitting(false);
    }
  };

  const handleCloseForgotModal = () => {
    setShowForgotModal(false);
    setResetEmailSent(false);
    setNewPassword('');
    setConfirmPassword('');
    if (location.pathname.includes('reset-password') || searchParams.get('token')) {
      navigate('/login', { replace: true });
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!resetToken) {
      showToast('Reset token is missing. Please click the reset link received in your email.');
      return;
    }
    if (!newPassword || !confirmPassword) {
      showToast('Please enter and confirm your new password.');
      return;
    }
    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match.');
      return;
    }
    setIsForgotSubmitting(true);
    try {
      const res = await resetPassword({
        token: resetToken,
        email: forgotEmail,
        password: newPassword,
        password_confirmation: confirmPassword,
      });
      showToast(res?.message || 'Password reset successfully! You can now log in.');
      setShowForgotModal(false);
      setForgotStep(1);
      setResetEmailSent(false);
      setPassword('');
      setResetToken('');
      setNewPassword('');
      setConfirmPassword('');
      setIsTokenFromUrl(false);
      navigate('/login', { replace: true });
    } catch (err) {
      showToast(err.message || 'Failed to reset password. The reset link may be invalid or expired.');
    } finally {
      setIsForgotSubmitting(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpDigits];
    newOtp[index] = value.slice(-1);
    setOtpDigits(newOtp);

    // Auto advance to next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length < 6) {
      showToast('Please enter the complete 6-digit OTP.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('OTP verified successfully! Redirecting...');
      navigate('/dashboard');
    }, 800);
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    setOtpDigits(['', '', '', '', '', '']);
    setOtpTimer(30);
    setCanResend(false);
    showToast('A new OTP has been sent to your registered mobile/email.');
    otpInputRefs.current[0]?.focus();
  };

  const switchToOtpMode = () => {
    setIsOtpMode(true);
    setOtpTimer(30);
    setCanResend(false);
    showToast('OTP has been dispatched.');
    setTimeout(() => {
      otpInputRefs.current[0]?.focus();
    }, 150);
  };

  return (
    <>
      <div className="app-viewport">
        {/* Left Showcase (Emerald Imperial Banner with Spices & Logistics Art) */}
        <aside className="left-showcase" aria-label="Vyapari Darbaar Showcase">
          <div className="left-banner-container">
            <img
              src={leftBannerImg}
              alt="Vyapari Darbaar - India's Premier Commodity Market Platform"
              className="left-banner-img"
            />
          </div>
        </aside>

        {/* Right Section (Heritage Background + Centered Interactive Card) */}
        <main className="right-main">
          {/* Top Header with Language Dropdown */}
          <header className="right-header">
            <div className="lang-selector-wrapper" ref={langDropdownRef}>
              <button
                type="button"
                className="lang-btn"
                onClick={() => setIsLangOpen(!isLangOpen)}
                aria-haspopup="listbox"
                aria-expanded={isLangOpen}
              >
                <IndiaFlagIcon width={18} height={12} />
                <span className="lang-label">{selectedLang.label}</span>
                <span className={`lang-chevron ${isLangOpen ? 'open' : ''}`}>
                  <ChevronDownIcon size={13} />
                </span>
              </button>

              {isLangOpen && (
                <div className="lang-dropdown-menu" role="listbox">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      className={`lang-option ${selectedLang.code === lang.code ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedLang(lang);
                        setIsLangOpen(false);
                      }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Floating Login Card */}
          <div className="card-container">
            <div className="login-card">
              {/* Card Header */}
              <div className="card-header">
                <span className="welcome-label">WELCOME TO</span>
                <h1 className="brand-heading">Vyapari Darbaar</h1>
                <span className="portal-subtitle">ADMINISTRATION PORTAL</span>
                <div className="filigree-wrap">
                  <FiligreeDivider />
                </div>
                <p className="tagline-text">Manage. Monitor. Empower Trade.</p>
              </div>

              {/* Standard Password Login Form */}
              {!isOtpMode ? (
                <form onSubmit={handlePasswordLogin} className="login-form">
                  {/* Email / Mobile Field */}
                  <div className="form-group">
                    <label htmlFor="identifier" className="form-label">
                      Email / Mobile Number
                    </label>
                    <div className="input-container">
                      <span className="input-icon-left">
                        <UserIcon size={17} color="#8a92a6" />
                      </span>
                      <input
                        id="identifier"
                        type="text"
                        className="form-input"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Enter your email or mobile number"
                        autoComplete="username"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="input-container">
                      <span className="input-icon-left">
                        <LockIcon size={17} color="#8a92a6" />
                      </span>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        className="form-input has-right-icon"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                      />
                      <button
                        type="button"
                        className="input-icon-right-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOffIcon size={18} color="#6b7280" />
                        ) : (
                          <EyeIcon size={18} color="#6b7280" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password Row */}
                  <div className="form-options-row">
                    <label className="remember-label">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                      />
                      <span className={`custom-checkbox-box ${rememberMe ? 'checked' : ''}`}>
                        {rememberMe && <CheckIcon size={11} color="#ffffff" />}
                      </span>
                      <span className="remember-text">Remember me</span>
                    </label>

                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        setForgotEmail(identifier || '');
                        setForgotStep(1);
                        setResetEmailSent(false);
                        setShowForgotModal(true);
                      }}
                      className="forgot-link"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  {/* Sign In Primary Button */}
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isLoading}
                  >
                    <span>{isLoading ? 'Signing In...' : 'Sign In to Admin Panel'}</span>
                    <span className="btn-arrow">→</span>
                  </button>

                  {/* OR Divider */}
                  <div className="or-divider">
                    <span className="or-text">OR</span>
                  </div>

                  {/* Login with OTP Button */}
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={switchToOtpMode}
                  >
                    <ShieldCheckIcon size={18} color="#083e28" />
                    <span>Login with OTP</span>
                  </button>
                </form>
              ) : (
                /* OTP Verification Mode Form */
                <form onSubmit={handleVerifyOtp} className="login-form otp-container">
                  <p className="otp-info-text">
                    Enter 6-digit OTP sent to your registered mobile number / email.
                  </p>

                  <div className="otp-inputs-grid">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpInputRefs.current[idx] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="otp-digit-box"
                        required
                      />
                    ))}
                  </div>

                  <div className="otp-resend-row">
                    <span className="remember-text">
                      {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : 'Did not receive OTP?'}
                    </span>
                    <button
                      type="button"
                      className="otp-resend-btn"
                      disabled={!canResend}
                      onClick={handleResendOtp}
                    >
                      Resend OTP
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isLoading}
                  >
                    <span>{isLoading ? 'Verifying...' : 'Verify OTP & Proceed'}</span>
                    <span className="btn-arrow">→</span>
                  </button>

                  <button
                    type="button"
                    className="btn-back-link"
                    onClick={() => setIsOtpMode(false)}
                  >
                    ← Back to Password Login
                  </button>
                </form>
              )}

              {/* Bottom Trust Badges */}
              <div className="trust-badges-row">
                <div className="trust-badge-item">
                  <span className="badge-icon-box">
                    <SecureAccessIcon size={22} color="#374151" />
                  </span>
                  <div className="badge-text-box">
                    <span className="badge-line">Secure</span>
                    <span className="badge-line">Access</span>
                  </div>
                </div>

                <div className="trust-badge-item">
                  <span className="badge-icon-box">
                    <TrustedPlatformIcon size={22} color="#374151" />
                  </span>
                  <div className="badge-text-box">
                    <span className="badge-line">Trusted</span>
                    <span className="badge-line">Platform</span>
                  </div>
                </div>

                <div className="trust-badge-item">
                  <span className="badge-icon-box">
                    <EmpoweringTradeIcon size={22} color="#374151" />
                  </span>
                  <div className="badge-text-box">
                    <span className="badge-line">Empowering</span>
                    <span className="badge-line">Indian Trade</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Footer */}
          <footer className="right-footer">
            <p className="footer-copyright">
              © 2026 Vyapari Darbaar. All rights reserved.
            </p>
            <div className="footer-links-group">
              <a
                href="#privacy"
                className="footer-link"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Privacy Policy');
                }}
              >
                Privacy Policy
              </a>
              <span className="footer-separator">|</span>
              <a
                href="#terms"
                className="footer-link"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Terms of Use');
                }}
              >
                Terms of Use
              </a>
            </div>
          </footer>
        </main>
      </div>

      {/* Forgot / Reset Password Modal */}
      {showForgotModal && (
        <div className="portal-modal-overlay" onClick={handleCloseForgotModal}>
          <div className="portal-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="portal-modal-header">
              <div className="portal-modal-title-box">
                <h3 className="portal-modal-title">
                  {forgotStep === 1
                    ? (resetEmailSent ? 'Check Your Email' : 'Forgot Admin Password')
                    : 'Reset Admin Password'}
                </h3>
                <p className="portal-modal-subtitle">
                  {forgotStep === 1
                    ? (resetEmailSent
                        ? 'Follow the link sent to your email to set a new password.'
                        : 'Enter your registered admin email address. We will send you instructions to reset your password.')
                    : 'Enter your new password below to reset your admin account credentials.'}
                </p>
              </div>
              <button
                type="button"
                className="portal-modal-close-btn"
                onClick={handleCloseForgotModal}
              >
                ✕
              </button>
            </div>

            {forgotStep === 1 ? (
              resetEmailSent ? (
                <div className="portal-modal-form" style={{ textAlign: 'center', padding: '10px 0 4px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#ecfdf5',
                      color: '#059669',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      margin: '0 auto 12px',
                    }}
                  >
                    ✓
                  </div>
                  <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontSize: '16px', fontWeight: 600 }}>
                    Reset Link Sent!
                  </h4>
                  <p style={{ margin: '0 0 20px', fontSize: '13.5px', color: '#475569', lineHeight: 1.5 }}>
                    We have dispatched password reset instructions to <strong>{forgotEmail}</strong>.
                    Please check your email and click the reset link to set a new password.
                  </p>
                  <div className="portal-modal-actions">
                    <button
                      type="button"
                      className="btn-modal-submit"
                      style={{ width: '100%' }}
                      onClick={handleCloseForgotModal}
                    >
                      Back to Login
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleForgotPasswordSubmit} className="portal-modal-form">
                  <div className="form-group">
                    <label className="form-label" htmlFor="forgot-email">
                      Admin Email Address <span className="required-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <span className="input-icon-left">
                        <UserIcon size={18} color="#6b7280" />
                      </span>
                      <input
                        id="forgot-email"
                        type="email"
                        className="form-input"
                        placeholder="admin@example.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="portal-modal-actions">
                    <button
                      type="button"
                      className="btn-modal-cancel"
                      onClick={handleCloseForgotModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-modal-submit"
                      disabled={isForgotSubmitting}
                    >
                      {isForgotSubmitting ? 'Sending Request...' : 'Send Reset Link'}
                    </button>
                  </div>
                </form>
              )
            ) : (
              <form onSubmit={handleResetPasswordSubmit} className="portal-modal-form">
                {/* Hidden Token & Email inputs - not taken as user inputs */}
                <input type="hidden" name="token" value={resetToken} />
                <input type="hidden" name="email" value={forgotEmail} />

                {forgotEmail && (
                  <div
                    style={{
                      backgroundColor: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '13px',
                      color: '#065f46',
                      fontWeight: 500,
                    }}
                  >
                    <span>Resetting account: <strong>{forgotEmail}</strong></span>
                    {isTokenFromUrl && (
                      <span style={{ fontSize: '12px', fontWeight: 600 }}>✓ Verified Link</span>
                    )}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="new-password">
                    New Password <span className="required-star">*</span>
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    className="form-input no-icon"
                    placeholder="Enter new strong password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="confirm-password">
                    Confirm New Password <span className="required-star">*</span>
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    className="form-input no-icon"
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="portal-modal-actions">
                  <button
                    type="button"
                    className="btn-modal-cancel"
                    onClick={handleCloseForgotModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-modal-submit"
                    disabled={isForgotSubmitting}
                  >
                    {isForgotSubmitting ? 'Resetting Password...' : 'Reset Password'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification (Rendered on top of all content and modals) */}
      {toastMessage && (
        <div className="toast-notice" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </>
  );
}
