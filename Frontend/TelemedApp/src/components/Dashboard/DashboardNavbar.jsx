import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './DashboardNavbar.css';

const DashboardNavbar = () => {
  const { user, patientInfo, logout } = useAuth();

  return (
    <nav className="dashboard-navbar">
      <div className="navbar-brand">TeleMed</div>
      <div className="navbar-user">
        <span className="user-name">{patientInfo?.name || user?.username}</span>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default DashboardNavbar; 