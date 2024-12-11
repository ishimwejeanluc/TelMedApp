import React, { useState, useEffect } from 'react';

// Mock data for specialties and doctors
const specialties = [
  { id: 'cardiology', name: 'Cardiology' },
  { id: 'dermatology', name: 'Dermatology' },
  { id: 'neurology', name: 'Neurology' },
];

const doctors = [
  { id: 1, name: 'Dr. John Doe', specialty: 'cardiology' },
  { id: 2, name: 'Dr. Jane Smith', specialty: 'dermatology' },
  { id: 3, name: 'Dr. Sarah Connor', specialty: 'neurology' },
];

// Mock data for appointments
const initialAppointments = [
  {
    id: 1,
    date: '2023-12-15',
    time: '10:00 AM',
    status: 'SCHEDULED',
    doctor: 'Dr. John Doe',
  },
];

const AppointmentList = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
  });

  // Filter doctors based on the selected specialty
  useEffect(() => {
    if (selectedSpecialty) {
      const filteredDoctors = doctors.filter(
        (doc) => doc.specialty === selectedSpecialty
      );
      setAvailableDoctors(filteredDoctors);
      setSelectedDoctor('');
    }
  }, [selectedSpecialty]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle appointment booking
  const handleBookAppointment = () => {
    if (!formData.date || !formData.time || !selectedDoctor) {
      alert('Please fill all fields and select a doctor.');
      return;
    }

    const newAppointment = {
      id: appointments.length + 1,
      date: formData.date,
      time: formData.time,
      status: 'SCHEDULED',
      doctor: selectedDoctor,
    };

    setAppointments([...appointments, newAppointment]);
    setFormData({ date: '', time: '' });
    setSelectedDoctor('');
    setSelectedSpecialty('');
  };

  // Handle appointment deletion
  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  return (
    <div>
      <h2>Your Appointments</h2>

      {/* Booking Form */}
      <div className="appointment-form">
        <h3>Book an Appointment</h3>
        <div>
          <label>Specialty:</label>
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            <option value="">--Select Specialty--</option>
            {specialties.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Doctor:</label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            disabled={!availableDoctors.length}
          >
            <option value="">--Select Doctor--</option>
            {availableDoctors.map((doc) => (
              <option key={doc.id} value={doc.name}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleBookAppointment}>Book Appointment</button>
      </div>

      {/* Appointment List */}
      <div className="appointment-list">
        <h3>Appointments</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.doctor}</td>
                <td>{appointment.status}</td>
                <td>
                  <button onClick={() => handleDeleteAppointment(appointment.id)}>
                    Delete
                  </button>
                  {/* Additional actions like Reschedule can be added */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;
