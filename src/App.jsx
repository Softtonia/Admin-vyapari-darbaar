import React, { useState, useEffect, useRef } from 'react';
import leftBannerImg from './assets/left_banner_clean.png';
import DesignSystem from './components/DesignSystem';
import AdminDashboard from './components/AdminDashboard';
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
} from './components/Icons';
import './App.css';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
];

export default function App() {
  // Active View State ('ads', 'subscriptions', 'news-cms', 'contact-unlocks', 'trader-directory', 'buy-requirements', 'mandi-rates', 'market-overview', 'dashboard', 'design-system', or 'login')
  const [currentView, setCurrentView] = useState('ads');

  // Form State
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true); // checked by default in screenshot

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
    }, 3500);
  };

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      showToast('Please enter both Email/Mobile and Password.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast(`Welcome back! Authenticating ${identifier}...`);
    }, 1000);
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
    }, 1000);
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
      {/* Floating View Switcher */}
      <div className="view-switcher-pill">
        <button
          type="button"
          className={`switch-btn ${currentView === 'ads' ? 'active' : ''}`}
          onClick={() => setCurrentView('ads')}
        >
          📢 Advertisements
        </button>
        <button
          type="button"
          className={`switch-btn ${currentView === 'subscriptions' ? 'active' : ''}`}
          onClick={() => setCurrentView('subscriptions')}
        >
          💳 Subscriptions
        </button>
        <button
          type="button"
          className={`switch-btn ${currentView === 'news-cms' ? 'active' : ''}`}
          onClick={() => setCurrentView('news-cms')}
        >
          📰 News & CMS
        </button>
        <button
          type="button"
          className={`switch-btn ${currentView === 'contact-unlocks' ? 'active' : ''}`}
          onClick={() => setCurrentView('contact-unlocks')}
        >
          🔓 Contact Unlocks
        </button>
        <button
          type="button"
          className={`switch-btn ${currentView === 'trader-directory' ? 'active' : ''}`}
          onClick={() => setCurrentView('trader-directory')}
        >
          👥 Trader Directory
        </button>
        <button
          type="button"
          className={`switch-btn ${currentView === 'buy-requirements' ? 'active' : ''}`}
          onClick={() => setCurrentView('buy-requirements')}
        >
          📦 Buy Requirements
        </button>
        <button
          type="button"
          className={`switch-btn ${currentView === 'mandi-rates' ? 'active' : ''}`}
          onClick={() => setCurrentView('mandi-rates')}
        >
          🏛 Mandi Rates
        </button>
        <button
          type="button"
          className={`switch-btn ${currentView === 'market-overview' ? 'active' : ''}`}
          onClick={() => setCurrentView('market-overview')}
        >
          📈 Market Overview
        </button>
        <button
          type="button"
          className={`switch-btn ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentView('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          type="button"
          className={`switch-btn ${currentView === 'design-system' ? 'active' : ''}`}
          onClick={() => setCurrentView('design-system')}
        >
          🎨 Design System
        </button>
        <button
          type="button"
          className={`switch-btn ${currentView === 'login' ? 'active' : ''}`}
          onClick={() => setCurrentView('login')}
        >
          🔐 Login Portal
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && <div className="toast-notice">{toastMessage}</div>}

      {currentView === 'ads' ||
      currentView === 'subscriptions' ||
      currentView === 'news-cms' ||
      currentView === 'contact-unlocks' ||
      currentView === 'trader-directory' ||
      currentView === 'buy-requirements' ||
      currentView === 'mandi-rates' ||
      currentView === 'market-overview' ||
      currentView === 'dashboard' ? (
        <AdminDashboard
          initialNav={
            currentView === 'ads'
              ? 'Advertisements'
              : currentView === 'subscriptions'
              ? 'Subscription Plans'
              : currentView === 'news-cms'
              ? 'News & Articles'
              : currentView === 'contact-unlocks'
              ? 'Contact Unlocks'
              : currentView === 'trader-directory'
              ? 'Trader Directory'
              : currentView === 'buy-requirements'
              ? 'Buy Requirements'
              : currentView === 'mandi-rates'
              ? 'Mandi Rates'
              : currentView === 'market-overview'
              ? 'Market Overview'
              : 'Dashboard'
          }
          onNavigateToDesignSystem={() => setCurrentView('design-system')}
          onNavigateToLogin={() => setCurrentView('login')}
        />
      ) : currentView === 'design-system' ? (
        <DesignSystem onNavigateToLogin={() => setCurrentView('login')} />
      ) : (
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
                      showToast('Password reset link sent to your registered contact.');
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
    )}
  </>
  );
}
