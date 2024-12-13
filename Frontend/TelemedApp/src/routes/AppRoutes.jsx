// AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import all page components
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import About from '../pages/About';
import Contact from '../pages/Contact';
import VerifyOtp from '../pages/VerifyOtp';
import Dashboard from '../components/Dashboard/Dashboard';
import Doctorboard from '../pages/Doctorboard';
import DoctorsHome from '../pages/DoctorsHome';
import AdminDashboard from '../pages/AdminDashboard';
import DoctorsManager from '../components/admin/DoctorsManager/DoctorsManager';
import PatientsManager from '../components/admin/PatientsManager/PatientsManager';
import PatientRecords from '../components/admin/PatientsManager/PatientRecords';

// NotFound Component
const NotFound = () => (
  <div className="container mt-5 text-center">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <a href="/" className="btn btn-primary">Return to Home</a>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/doctors" element={<DoctorsHome />} />
      <Route path="/doctorboard" element={<Doctorboard />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/doctors" element={<DoctorsManager />} />
      <Route path="/admin/patients" element={<PatientsManager />} />
      <Route path="/admin/patients/:patientId/records" element={<PatientRecords />} />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;