import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

/**
 * Loading screen shown while verifying stored admin token with backend
 */
function AuthLoadingScreen() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#052e16',
        backgroundImage: 'radial-gradient(ellipse at center, #083e28 0%, #031e13 100%)',
        gap: '16px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          width: '44px',
          height: '44px',
          border: '3px solid rgba(255, 255, 255, 0.15)',
          borderTopColor: '#e5b94c',
          borderRadius: '50%',
          animation: 'spinLoader 0.75s linear infinite',
        }}
      />
      <style>{`
        @keyframes spinLoader {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{ textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '15px', color: '#ffffff', fontWeight: 600, letterSpacing: '0.3px' }}>
          VYAPARI DARBAAR
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>
          Verifying secure admin session...
        </p>
      </div>
    </div>
  );
}

/**
 * ProtectedRoute: Blocks unauthenticated access and redirects to /login
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return <AuthLoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

/**
 * PublicRoute: Blocks authenticated users from accessing login page and redirects to /dashboard
 */
export function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return <AuthLoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

/**
 * RootRedirect: Directs root / and unknown routes to /dashboard if logged in, or /login if not
 */
export function RootRedirect() {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return <AuthLoadingScreen />;
  }

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectedRoute;
