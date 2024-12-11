// AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Corrected import path

// Import all page components
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import About from '../pages/About';
import Contact from '../pages/Contact';
import VerifyOtp from '../pages/VerifyOtp';
import Dashboard from '../components/Dashboard/Dashboard';

// NotFound Component
const NotFound = () => (
  <div className="container mt-5 text-center">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <a href="/" className="btn btn-primary">Return to Home</a>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Login />;
};

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
      <Route path="/dashboard" element={<Dashboard />} />

      {/* 404 Route - Always keep this as the last route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;