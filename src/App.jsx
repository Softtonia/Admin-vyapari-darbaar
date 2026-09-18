import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import LoginPortal from './components/LoginPortal';
import DesignSystem from './components/DesignSystem';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ProtectedRoute, PublicRoute, RootRedirect } from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
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
            path="/system-settings"
            element={
              <ProtectedRoute>
                <AdminDashboard initialNav="System Settings" />
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

          {/* Fallback for undefined routes */}
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}
