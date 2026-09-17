import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import LoginPortal from './components/LoginPortal';
import DesignSystem from './components/DesignSystem';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth & Standalone Routes */}
        <Route path="/login" element={<LoginPortal />} />
        <Route
          path="/design-system"
          element={<DesignSystem onNavigateToLogin={() => (window.location.href = '/login')} />}
        />

        {/* Implemented Admin Modules - Routes created exclusively for worked views */}
        <Route path="/" element={<AdminDashboard initialNav="Dashboard" />} />
        <Route path="/dashboard" element={<AdminDashboard initialNav="Dashboard" />} />
        <Route path="/market-overview" element={<AdminDashboard initialNav="Market Overview" />} />
        <Route path="/commodity-prices" element={<AdminDashboard initialNav="Commodity Prices" />} />
        <Route path="/mandi-rates" element={<AdminDashboard initialNav="Mandi Rates" />} />
        <Route path="/buy-requirements" element={<AdminDashboard initialNav="Buy Requirements" />} />
        <Route path="/trader-directory" element={<AdminDashboard initialNav="Trader Directory" />} />
        <Route path="/contact-unlocks" element={<AdminDashboard initialNav="Contact Unlocks" />} />
        <Route path="/news-articles" element={<AdminDashboard initialNav="News & Articles" />} />
        <Route path="/roles-permissions" element={<AdminDashboard initialNav="Roles & Permissions" />} />
        <Route path="/subscription-plans" element={<AdminDashboard initialNav="Subscription Plans" />} />
        <Route path="/payments" element={<AdminDashboard initialNav="Payments" />} />
        <Route path="/advertisements" element={<AdminDashboard initialNav="Advertisements" />} />
        <Route path="/platform-analytics" element={<AdminDashboard initialNav="Platform Analytics" />} />
        <Route path="/notifications" element={<AdminDashboard initialNav="Notifications" />} />
        <Route path="/homepage" element={<AdminDashboard initialNav="Homepage" />} />
        <Route path="/system-settings" element={<AdminDashboard initialNav="System Settings" />} />
        <Route path="/audit-logs" element={<AdminDashboard initialNav="Audit Logs" />} />

        {/* Fallback for undefined routes */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
