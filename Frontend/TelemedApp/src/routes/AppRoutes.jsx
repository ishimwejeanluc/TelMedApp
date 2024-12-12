// AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import all page components
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import About from '../pages/About';
import Contact from '../pages/Contact';
import VerifyOtp from '../pages/VerifyOtp';
import Dashboard from '../components/Dashboard/Dashboard';
import Settings from '../components/Settings/Settings';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if user has permission
  if (allowedRoles.length > 0 && (!user?.role || !allowedRoles.includes(user.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Unauthorized Component
const Unauthorized = () => (
  <div className="container mt-5 text-center">
    <h1>Unauthorized Access</h1>
    <p>You don't have permission to access this page.</p>
    <a href="/" className="btn btn-primary">Return to Home</a>
  </div>
);

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Patient Routes */}
      <Route 
        path="/patient/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['PATIENT']}>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/patient/settings" 
        element={
          <ProtectedRoute allowedRoles={['PATIENT']}>
            <Settings />
          </ProtectedRoute>
        } 
      />

      {/* TODO: Implement these routes later */}
      {/* Doctor and Admin routes are commented out until implemented */}
      {/* 
      <Route 
        path="/doctor/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['DOCTOR']}>
            <DoctorDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      /> 
      */}

      {/* 404 Route - Always keep this as the last route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// NotFound Component
const NotFound = () => (
  <div className="container mt-5 text-center">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <a href="/" className="btn btn-primary">Return to Home</a>
  </div>
);

export default AppRoutes;