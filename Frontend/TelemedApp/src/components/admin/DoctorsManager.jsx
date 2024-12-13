import React, { useState } from 'react';
import styles from './DoctorsManager.module.css';

const DoctorsManager = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Smith',
      specialization: 'Cardiology',
      email: 'dr.smith@example.com',
      phone: '+1 234-567-8900',
      availability: 'Available',
      schedule: 'Mon-Fri, 9AM-5PM',
      rating: 4.8,
      status: 'active',
      image: '/doctors/dr-smith.jpg'
    },
    // Add more mock data...
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: '',
    schedule: '',
    status: 'active',
    image: null
  });

  const specializations = [
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Psychiatry',
    'General Medicine'
  ];

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setFormData({
      name: '',
      specialization: '',
      email: '',
      phone: '',
      schedule: '',
      status: 'active',
      image: null
    });
    setIsModalOpen(true);
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      email: doctor.email,
      phone: doctor.phone,
      schedule: doctor.schedule,
      status: doctor.status,
      image: doctor.image
    });
    setIsModalOpen(true);
  };

  const handleDeleteDoctor = async (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      // API call would go here
      setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedDoctor) {
      // Update existing doctor
      setDoctors(doctors.map(doctor => 
        doctor.id === selectedDoctor.id 
          ? { ...doctor, ...formData }
          : doctor
      ));
    } else {
      // Add new doctor
      const newDoctor = {
        id: Date.now(),
        ...formData,
        rating: 0,
        availability: 'Available'
      };
      setDoctors([...doctors, newDoctor]);
    }
    
    setIsModalOpen(false);
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = !filterSpecialization || 
                                 doctor.specialization === filterSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className={styles.doctorsManager}>
      <div className={styles.header}>
        <h2 className={styles.title}>Doctors Management</h2>
        <button className={styles.addButton} onClick={handleAddDoctor}>
          <PlusIcon />
          Add New Doctor
        </button>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBar}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search doctors..."
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
            <option value="">All Specializations</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.doctorsTable}>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Contact</th>
              <th>Schedule</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor) => (
              <tr key={doctor.id}>
                <td className={styles.doctorCell}>
                  <img 
                    src={doctor.image || '/default-avatar.png'} 
                    alt={doctor.name}
                    className={styles.doctorImage}
                  />
                  <div className={styles.doctorInfo}>
                    <span className={styles.doctorName}>{doctor.name}</span>
                    <span className={styles.doctorRating}>⭐ {doctor.rating}</span>
                  </div>
                </td>
                <td>{doctor.specialization}</td>
                <td>
                  <div>{doctor.email}</div>
                  <div>{doctor.phone}</div>
                </td>
                <td>{doctor.schedule}</td>
                <td>
                  <span className={`${styles.status} ${styles[doctor.status]}`}>
                    {doctor.status}
                  </span>
                </td>
                <td className={styles.actions}>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleEditDoctor(doctor)}
                    title="Edit"
                  >
                    <EditIcon />
                  </button>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleDeleteDoctor(doctor.id)}
                    title="Delete"
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Doctor Form Modal */}
      {isModalOpen && (
        <DoctorFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          specializations={specializations}
          isEditing={!!selectedDoctor}
        />
      )}
    </div>
  );
};

// Continue with icons and modal component...

export default DoctorsManager; 