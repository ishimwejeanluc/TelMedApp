import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentSection, setCurrentSection] = useState('dashboard');

  // Mock data - replace with API calls
  const mockData = {
    patients: [
      { id: 1, type: 'patient', name: 'John Smith', details: 'Patient • Age: 35 • Dr. Lucas Smith' },
      { id: 2, type: 'patient', name: 'Jane Doe', details: 'Patient • Age: 28 • Dr. Emily Lee' }
    ],
    doctors: [
      { id: 1, type: 'doctor', name: 'Dr. Lucas Smith', details: 'Cardiologist • Available' },
      { id: 2, type: 'doctor', name: 'Dr. Emily Lee', details: 'Pediatrician • Available' }
    ],
    appointments: [
      { id: 1, type: 'appointment', name: 'John Smith', details: 'With Dr. Lucas Smith • March 25, 2024' },
      { id: 2, type: 'appointment', name: 'Jane Doe', details: 'With Dr. Emily Lee • March 28, 2024' }
    ]
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    const results = [
      ...mockData.patients.filter(p => 
        p.name.toLowerCase().includes(term.toLowerCase()) ||
        p.details.toLowerCase().includes(term.toLowerCase())
      ),
      ...mockData.doctors.filter(d => 
        d.name.toLowerCase().includes(term.toLowerCase()) ||
        d.details.toLowerCase().includes(term.toLowerCase())
      ),
      ...mockData.appointments.filter(a => 
        a.name.toLowerCase().includes(term.toLowerCase()) ||
        a.details.toLowerCase().includes(term.toLowerCase())
      )
    ];

    setSearchResults(results);
  };

  const handleResultClick = (result) => {
    switch (result.type) {
      case 'patient':
        navigate(`/admin/patients/${result.id}/records`);
        break;
      case 'doctor':
        navigate(`/admin/doctors/${result.id}`);
        break;
      case 'appointment':
        navigate(`/admin/appointments/${result.id}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.adminDashboard}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Panel</h2>
        </div>
        <nav className={styles.nav}>
          <button
            className={`${styles.navItem} ${currentSection === 'dashboard' ? styles.active : ''}`}
            onClick={() => setCurrentSection('dashboard')}
          >
            <DashboardIcon />
            <span>Dashboard</span>
          </button>
          <button
            className={styles.navItem}
            onClick={() => navigate('/admin/doctors')}
          >
            <DoctorIcon />
            <span>Doctors</span>
          </button>
          <button
            className={styles.navItem}
            onClick={() => navigate('/admin/patients')}
          >
            <PatientIcon />
            <span>Patients</span>
          </button>
        </nav>
      </div>

      <main className={styles.mainContent}>
        <div className={styles.searchSection}>
          <div className={styles.searchBar}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search patients, doctors, appointments..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          {searchResults.length > 0 && (
            <div className={styles.searchResults}>
              {searchResults.map((result) => (
                <div
                  key={`${result.type}-${result.id}`}
                  className={styles.searchResult}
                  onClick={() => handleResultClick(result)}
                >
                  <div className={styles.resultIcon}>
                    {result.type === 'patient' && <PatientIcon />}
                    {result.type === 'doctor' && <DoctorIcon />}
                    {result.type === 'appointment' && <AppointmentIcon />}
                  </div>
                  <div className={styles.resultInfo}>
                    <div className={styles.resultName}>{result.name}</div>
                    <div className={styles.resultDetails}>{result.details}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.welcomeSection}>
          <div>
            <h1>Welcome back, Admin</h1>
            <p>Here's what's happening today</p>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <PatientIcon />
            </div>
            <div className={styles.statInfo}>
              <h3>Total Patients</h3>
              <div className={styles.statValue}>1,234</div>
              <div className={`${styles.trend} ${styles.trendUp}`}>↑ 12%</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <DoctorIcon />
            </div>
            <div className={styles.statInfo}>
              <h3>Active Doctors</h3>
              <div className={styles.statValue}>48</div>
              <div className={`${styles.trend} ${styles.trendUp}`}>↑ 8%</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <AppointmentIcon />
            </div>
            <div className={styles.statInfo}>
              <h3>Appointments</h3>
              <div className={styles.statValue}>156</div>
              <div className={`${styles.trend} ${styles.trendUp}`}>↑ 15%</div>
            </div>
          </div>
        </div>

        <div className={styles.recentAppointments}>
          <div className={styles.cardHeader}>
            <h2>Recent Appointments</h2>
            <button className={styles.viewAllButton}>View All</button>
          </div>
          <div className={styles.appointmentsList}>
            {mockData.appointments.map((appointment) => (
              <div key={appointment.id} className={styles.appointmentCard}>
                <div className={styles.appointmentInfo}>
                  <h4>{appointment.name}</h4>
                  <p>{appointment.details}</p>
                </div>
                <span className={`${styles.status} ${styles.scheduled}`}>
                  Scheduled
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// Icon components
const SearchIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

const PatientIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
);

const DoctorIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
  </svg>
);

const AppointmentIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);

const DashboardIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
  </svg>
);

export default AdminDashboard; 