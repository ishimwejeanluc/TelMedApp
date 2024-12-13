import React from 'react';
import Cards from '../components/Cards';
import AppointmentTable from '../components/AppointmentTable';
import styles from './Doctorboard.module.css';

const Doctorboard = () => {
  // Example appointment data (usually fetched from an API)
  const appointments = [
    { id: 1, patient: 'John Doe', status: 'completed' },
    { id: 2, patient: 'Jane Smith', status: 'pending' },
    { id: 3, patient: 'Alice Johnson', status: 'completed' },
    { id: 4, patient: 'Bob Brown', status: 'pending' },
  ];

  // Calculate statistics from appointments
  const totalAppointments = appointments.length;
  const completedAppointments = appointments.filter((a) => a.status === 'completed').length;
  const pendingAppointments = appointments.filter((a) => a.status === 'pending').length;

  const stats = {
    totalAppointments,
    completedAppointments,
    pendingAppointments,
  };

  return (
    <div className={styles.doctorDashboard}>
      <header className={styles.header}>
        <h1>Welcome, Dr. John Doe</h1>
        <p>Here's what you have planned for today.</p>
      </header>
      <div className={styles.cardsContainer}>
        <Cards stats={stats} />
      </div>
      <section className={styles.appointmentSection}>
        <h2>Today's Appointments</h2>
        <div className={styles.tableContainer}>
          <AppointmentTable data={appointments} />
        </div>
      </section>
    </div>
  );
};

export default Doctorboard;
