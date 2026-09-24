import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import LoginPortal from './components/LoginPortal';
import DesignSystem from './components/DesignSystem';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { SiteSettingsProvider } from './context/SiteSettingsContext';
import { ProtectedRoute, PublicRoute, RootRedirect } from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <SiteSettingsProvider>
          <Routes>
          {/* Root: Opens Login if not logged in; Opens Dashboard if logged in */}
          <Route path="/" element={<RootRedirect />} />

          {/* Auth Route: Only accessible when NOT logged in */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPortal />
              </PublicRoute>
            }
          />

          {/* Reset Password Routes (from email link) */}
          <Route
            path="/admin/reset-password"
            element={<LoginPortal />}
          />
          <Route
            path="/reset-password"
            element={<LoginPortal />}
          />

          <Route
            path="/design-system"
            element={
              <ProtectedRoute>
                <DesignSystem onNavigateToLogin={() => (window.location.href = '/login')} />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Routes: Inaccessible without login */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Dashboard" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/market-overview"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Market Overview" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/commodity-prices"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Commodity Prices" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-commodities"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="All Commodities" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-commodity"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Add Commodity" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mandi-rates"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Mandi Rates" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-mandi-rate"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Add Mandi Rate" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mandi-rates/add"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Add Mandi Rate" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/import-mandi-rates"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Import Mandi Rates" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mandi-rates/import"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Import Mandi Rates" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/buy-requirements"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Buy Requirements" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trader-directory"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Trader Directory" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact-unlocks"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Contact Unlocks" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/news-articles"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="News & Articles" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/news-categories"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Manage Categories" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/news-sources"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Manage Sources" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/news-imports"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Automated Imports" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/news-imports/:runId"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Automated Import Detail" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roles-permissions"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Roles & Permissions" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subscription-plans"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Subscription Plans" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Payments" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/advertisements"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Advertisements" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/platform-analytics"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Platform Analytics" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Notifications" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/homepage"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Homepage" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/site-settings"
            element={<Navigate to="/system-settings" replace />}
          />
          <Route
            path="/system-settings"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="System Settings" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/social-links"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Social Links" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audit-logs"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Audit Logs" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-profile"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Admin Profile" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-list"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="User List" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/traders"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Traders" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subscribers"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Subscribers" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/advertisers"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Advertisers" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pending-verification"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Pending Verification" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/email-templates"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Email Templates" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/email-templates/create"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Email Template Form" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/email-templates/:id/edit"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Email Template Form" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/campaigns"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Campaigns" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/campaigns/create"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Campaign Form" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/campaigns/:id/edit"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="Campaign Form" />
              </ProtectedRoute>
            }
          />

          {/* Fallback for undefined routes */}
          <Route path="*" element={<RootRedirect />} />
        </Routes>
        </SiteSettingsProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}
