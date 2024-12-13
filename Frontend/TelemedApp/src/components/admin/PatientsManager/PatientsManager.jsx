import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PatientsManager.module.css';

const PatientsManager = () => {
  const navigate = useNavigate();
  const [patients] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 234-567-8900',
      age: 35,
      assignedDoctor: 'Dr. Lucas Smith',
      lastVisit: '2024-03-10',
      nextAppointment: '2024-03-25',
      status: 'active'
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '+1 234-567-8901',
      age: 28,
      assignedDoctor: 'Dr. Emily Lee',
      lastVisit: '2024-03-12',
      nextAppointment: '2024-03-28',
      status: 'active'
    }
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <button 
            className={styles.backButton} 
            onClick={() => navigate('/admin')}
          >
            <ArrowLeftIcon />
            Back to Dashboard
          </button>
          <h1>Patients Management</h1>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Assigned Doctor</th>
              <th>Last Visit</th>
              <th>Next Appointment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.phone}</td>
                <td>{patient.age}</td>
                <td>{patient.assignedDoctor}</td>
                <td>{patient.lastVisit}</td>
                <td>{patient.nextAppointment}</td>
                <td>
                  <span className={`${styles.status} ${styles[patient.status]}`}>
                    {patient.status}
                  </span>
                </td>
                <td className={styles.actions}>
                  <button
                    onClick={() => navigate(`/admin/patients/${patient.id}/records`)}
                    className={styles.viewButton}
                    title="View Records"
                  >
                    <ViewIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Icon components
const ArrowLeftIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
  </svg>
);

const ViewIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
  </svg>
);

export default PatientsManager; 