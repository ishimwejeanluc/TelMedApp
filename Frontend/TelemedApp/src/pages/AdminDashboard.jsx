import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/admin/AdminSidebar/AdminSidebar';
import DoctorsManager from '../components/admin/DoctorsManager/DoctorsManager';
import PatientsManager from '../components/admin/PatientsManager/PatientsManager';
import AppointmentsManager from '../components/admin/AppointmentsManager/AppointmentsManager';
import ResultsManager from '../components/admin/ResultsManager/ResultsManager';
import GlobalSearch from '../components/GlobalSearch/GlobalSearch';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');

  const handleMenuItemClick = (page) => {
    setActivePage(page);
  };

  const renderDashboardContent = () => (
    <div className={styles.dashboardContent}>
      <h1>Welcome, {user?.username}!</h1>
      <GlobalSearch onMenuItemClick={handleMenuItemClick} />
      {/* Add your dashboard stats or other content here */}
    </div>
  );

  const renderContent = () => {
    switch (activePage) {
      case 'doctors':
        return <DoctorsManager />;
      case 'patients':
        return <PatientsManager />;
      case 'appointments':
        return <AppointmentsManager />;
      case 'results':
        return <ResultsManager />;
      default:
        return renderDashboardContent();
    }
  };

  return (
    <div className={styles.adminDashboard}>
      <AdminSidebar 
        activeItem={activePage} 
        onMenuItemClick={handleMenuItemClick} 
      />
      <main className={styles.mainContent}>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard; 