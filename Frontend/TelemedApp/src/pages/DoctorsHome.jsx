import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from './DoctorsHome.module.css';

// Import doctor images
import drSmithImage from '../assets/images/Dr.smith.jpg';
import drJohnsonImage from '../assets/images/Dr.johnson.jpg';
import drleeImage from '../assets/images/Dr.lee.jpg';

const DoctorsHome = () => {
  const [viewedDoctorId, setViewedDoctorId] = useState(null);
  const navigate = useNavigate();

  const doctors = [
    {
      id: 1,
      name: 'Dr. Lucas Smith',
      age: 65,
      specialization: 'Cardiology',
      description: 'Expert in treating heart conditions with over 20 years of experience. Specialized in preventive cardiology and heart failure management.',
      image: drSmithImage,
      schedule: 'Monday - Friday: 9 AM - 12 PM',
      availability: '80%',
    },
    {
      id: 2,
      name: 'Dr. Michael Johnson',
      age: 38,
      specialization: 'Dermatology',
      description: 'Specialist in skin care and cosmetic dermatology. Expertise in treating various skin conditions and performing advanced cosmetic procedures.',
      image: drJohnsonImage,
      schedule: 'Tuesday, Thursday: 10 AM - 2 PM',
      availability: '60%',
    },
    {
      id: 3,
      name: 'Dr. Emily Lee',
      age: 35,
      specialization: 'Dentistry',
      description: 'Renowned dentist dedicated to providing exceptional oral care. Specialized in cosmetic dentistry and oral surgery.',
      image: drleeImage,
      schedule: 'Monday, Wednesday, Friday: 8 AM - 1 PM',
      availability: '75%',
    },
  ];

  const toggleSchedule = (id) => {
    setViewedDoctorId((prevId) => (prevId === id ? null : id));
  };

  const handleBookAppointment = (doctorId) => {
    navigate('/dashboard', { state: { doctorId } });
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Meet Our Expert Doctors</h1>
          <p className={styles.subtitle}>
            Connect with our experienced healthcare professionals who are dedicated to providing you with the best medical care.
          </p>
        </header>

        <div className={styles.doctorsList}>
          {doctors.map((doctor) => (
            <div key={doctor.id} className={styles.doctorCard}>
              <div className={styles.imageContainer}>
                <img
                  src={doctor.image}
                  alt={`Dr. ${doctor.name}`}
                  className={styles.doctorImage}
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.doctorName}>{doctor.name}</h3>
                <p className={styles.age}>{doctor.age} years old</p>
                <span className={styles.specialization}>
                  {doctor.specialization}
                </span>
                <p className={styles.description}>{doctor.description}</p>
                <button
                  className={styles.scheduleButton}
                  onClick={() => toggleSchedule(doctor.id)}
                >
                  {viewedDoctorId === doctor.id ? 'Hide Schedule' : 'View Schedule'}
                </button>
                
                {viewedDoctorId === doctor.id && (
                  <div className={styles.scheduleInfo}>
                    <p className={styles.scheduleText}>
                      <strong>Available:</strong> {doctor.schedule}
                    </p>
                    <button
                      className={styles.bookButton}
                      onClick={() => handleBookAppointment(doctor.id)}
                    >
                      Book Appointment
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} TeleMed. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default DoctorsHome;
