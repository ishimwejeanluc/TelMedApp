import React, { useState } from 'react';
import styles from './DoctorsManager.module.css';
import DoctorFormModal from './DoctorFormModal';
import { useNavigate } from 'react-router-dom';

const DoctorsManager = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Lucas Smith',
      image: '/src/assets/images/Dr.smith.jpg',
      specialization: 'Cardiology',
      email: 'dr.smith@gmail.com',
      phone: '+1 234-567-8900',
      schedule: 'Mon-Fri, 9AM-5PM',
      patients: 125,
      experience: '15 years',
      rating: 4.8,
      status: 'active',
      nextAvailable: '2024-03-20'
    },
    {
      id: 2,
      name: 'Dr. Michael Johnson',
      image: '/src/assets/images/Dr.johnson.jpg',
      specialization: 'Neurology',
      email: 'dr.johnson@gmail.com',
      phone: '+1 234-567-8901',
      schedule: 'Mon-Thu, 10AM-6PM',
      patients: 98,
      experience: '12 years',
      rating: 4.9,
      status: 'active',
      nextAvailable: '2024-03-18'
    },
    // Add more mock doctors...
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const specializations = [
    'All Specializations',
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Dermatology',
    'Orthopedics',
    'Psychiatry',
    'General Medicine'
  ];

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setIsModalOpen(true);
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleDeleteDoctor = (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setDoctors(doctors.filter(d => d.id !== doctorId));
    }
  };

  const handleStatusChange = (doctorId, newStatus) => {
    setDoctors(doctors.map(doctor => 
      doctor.id === doctorId ? { ...doctor, status: newStatus } : doctor
    ));
  };

  const filteredDoctors = doctors
    .filter(doctor => {
      const matchesSearch = 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialization = !filterSpecialization || filterSpecialization === 'All Specializations' || 
        doctor.specialization === filterSpecialization;
      const matchesStatus = filterStatus === 'all' || doctor.status === filterStatus;
      return matchesSearch && matchesSpecialization && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'patients':
          return b.patients - a.patients;
        default:
          return 0;
      }
    });

  const handleSubmit = (formData) => {
    if (selectedDoctor) {
      // Update existing doctor
      setDoctors(doctors.map(doctor => 
        doctor.id === selectedDoctor.id 
          ? { 
              ...doctor, 
              ...formData,
              image: formData.imagePreview || doctor.image
            }
          : doctor
      ));
    } else {
      // Add new doctor
      const newDoctor = {
        id: Date.now(),
        ...formData,
        image: formData.imagePreview || '/src/assets/images/default-doctor.jpg',
        patients: 0,
        rating: 0,
        nextAvailable: new Date().toISOString().split('T')[0]
      };
      setDoctors([...doctors, newDoctor]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className={styles.doctorsManager}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <button 
            className={styles.backButton} 
            onClick={() => navigate('/admin')}
          >
            <ArrowLeftIcon />
            Back to Dashboard
          </button>
          <h2 className={styles.title}>Doctors Management</h2>
          <p className={styles.subtitle}>Manage and monitor all doctors in the system</p>
        </div>
        <button className={styles.addButton} onClick={handleAddDoctor}>
          <PlusIcon />
          Add New Doctor
        </button>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchAndFilters}>
          <div className={styles.searchBar}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search doctors by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.filters}>
            <select
              className={styles.filterSelect}
              value={filterSpecialization}
              onChange={(e) => setFilterSpecialization(e.target.value)}
            >
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>

            <select
              className={styles.filterSelect}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on-leave">On Leave</option>
            </select>

            <select
              className={styles.filterSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="rating">Sort by Rating</option>
              <option value="patients">Sort by Patients</option>
            </select>
          </div>
        </div>

        <div className={styles.statsBar}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Total Doctors</span>
            <span className={styles.statValue}>{doctors.length}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Active</span>
            <span className={styles.statValue}>
              {doctors.filter(d => d.status === 'active').length}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>On Leave</span>
            <span className={styles.statValue}>
              {doctors.filter(d => d.status === 'on-leave').length}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.doctorsGrid}>
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className={styles.doctorCard}>
            <div className={styles.cardHeader}>
              <img 
                src={doctor.image || '/default-doctor-avatar.png'} 
                alt={doctor.name}
                className={styles.doctorImage}
              />
              <div className={styles.doctorStatus}>
                <span className={`${styles.status} ${styles[doctor.status]}`}>
                  {doctor.status}
                </span>
              </div>
            </div>

            <div className={styles.cardBody}>
              <h3 className={styles.doctorName}>{doctor.name}</h3>
              <p className={styles.doctorSpecialization}>{doctor.specialization}</p>
              
              <div className={styles.doctorStats}>
                <div className={styles.statItem}>
                  <UserGroupIcon />
                  <span>{doctor.patients} patients</span>
                </div>
                <div className={styles.statItem}>
                  <StarIcon />
                  <span>{doctor.rating}</span>
                </div>
                <div className={styles.statItem}>
                  <ClockIcon />
                  <span>{doctor.experience}</span>
                </div>
              </div>

              <div className={styles.contactInfo}>
                <p><MailIcon />{doctor.email}</p>
                <p><PhoneIcon />{doctor.phone}</p>
              </div>

              <div className={styles.scheduleInfo}>
                <p><CalendarIcon />Available: {doctor.schedule}</p>
                <p>Next Available: {doctor.nextAvailable}</p>
              </div>
            </div>

            <div className={styles.cardActions}>
              <button
                className={styles.editButton}
                onClick={() => handleEditDoctor(doctor)}
              >
                <EditIcon />
                Edit
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteDoctor(doctor.id)}
              >
                <DeleteIcon />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <DoctorFormModal
          doctor={selectedDoctor}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          specializations={specializations.filter(s => s !== 'All Specializations')}
        />
      )}
    </div>
  );
};

// Icon components...

const PlusIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

const SearchIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

const UserGroupIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
  </svg>
);

const StarIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ClockIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

const MailIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);

const EditIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
  </svg>
);

export default DoctorsManager; 