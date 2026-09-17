import React from 'react';

export function UserIcon({ className = '', size = 18, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function LockIcon({ className = '', size = 18, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function EyeIcon({ className = '', size = 18, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOffIcon({ className = '', size = 18, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export function CheckIcon({ className = '', size = 12, color = '#ffffff' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="3 8.5 6.5 12 13 4" />
    </svg>
  );
}

export function ShieldCheckIcon({ className = '', size = 18, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function SecureAccessIcon({ className = '', size = 22, color = '#2e3a47' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2L4 5.5v6.2c0 5.4 3.4 9.9 8 11.3 4.6-1.4 8-5.9 8-11.3V5.5L12 2z" />
      <rect x="9.5" y="11" width="5" height="4.5" rx="1" />
      <path d="M10.5 11V9.5a1.5 1.5 0 0 1 3 0V11" />
    </svg>
  );
}

export function TrustedPlatformIcon({ className = '', size = 22, color = '#2e3a47' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function EmpoweringTradeIcon({ className = '', size = 22, color = '#2e3a47' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function IndiaFlagIcon({ className = '', width = 20, height = 14 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 40"
      className={className}
      style={{ borderRadius: '2px', overflow: 'hidden', boxShadow: '0 0 0 0.5px rgba(0,0,0,0.15)' }}
    >
      <rect width="60" height="13.33" fill="#FF9933" />
      <rect y="13.33" width="60" height="13.33" fill="#FFFFFF" />
      <rect y="26.66" width="60" height="13.34" fill="#138808" />
      <circle cx="30" cy="20" r="4.8" fill="none" stroke="#000088" strokeWidth="1" />
      <circle cx="30" cy="20" r="1.2" fill="#000088" />
      {[...Array(12)].map((_, i) => (
        <line
          key={i}
          x1="30"
          y1="20"
          x2={30 + 4.8 * Math.cos((i * Math.PI) / 6)}
          y2={20 + 4.8 * Math.sin((i * Math.PI) / 6)}
          stroke="#000088"
          strokeWidth="0.6"
        />
      ))}
    </svg>
  );
}

export function ChevronDownIcon({ className = '', size = 14, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function FiligreeDivider({ className = '', color = '#c89e3a' }) {
  return (
    <svg
      width="140"
      height="14"
      viewBox="0 0 140 14"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left line */}
      <line x1="0" y1="7" x2="52" y2="7" stroke={color} strokeWidth="1" strokeOpacity="0.65" />
      {/* Left scroll / diamond accent */}
      <circle cx="56" cy="7" r="1.5" fill={color} />
      {/* Center diamond */}
      <path
        d="M70 2L74.5 7L70 12L65.5 7Z"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
      />
      <circle cx="70" cy="7" r="1.5" fill={color} />
      {/* Right scroll / diamond accent */}
      <circle cx="84" cy="7" r="1.5" fill={color} />
      {/* Right line */}
      <line x1="88" y1="7" x2="140" y2="7" stroke={color} strokeWidth="1" strokeOpacity="0.65" />
    </svg>
  );
}
