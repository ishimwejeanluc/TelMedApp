import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Appointments from '../Appointments/AppointmentList';
import MedicalRecords from '../MedicalRecords/MedicalRecords';
import TestResults from '../TestResults/TestResults';
import Settings from '../Settings/Settings';

const Dashboard = ({ doctorName, specialization }) => {
  const [activePage, setActivePage] = useState('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'appointments':
        return (
          <Appointments
            preselectedDoctor={doctorName}
            preselectedSpecialization={specialization}
          />
        );
      case 'medicalRecords':
        return <MedicalRecords />;
      case 'testResults':
        return <TestResults />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <div>
            <h1>Welcome to the TeleMed Dashboard!</h1>
            <p className="text-muted">
              You are currently viewing the profile of <strong>{doctorName}</strong>, a specialist in{' '}
              <strong>{specialization}</strong>.
            </p>
            <p>
              Use the sidebar to navigate through your appointments, medical records, test results, and settings.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar activeItem={activePage} onMenuItemClick={setActivePage} />
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
