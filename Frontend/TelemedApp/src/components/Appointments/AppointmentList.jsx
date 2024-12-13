import React, { useState } from 'react';

// Mock data for doctors
const doctors = [
  { id: 1, name: 'Dr. John Doe', specialty: 'Cardiology' },
  { id: 2, name: 'Dr. Jane Smith', specialty: 'Dermatology' },
  { id: 3, name: 'Dr. Sarah Connor', specialty: 'Neurology' },
];

const initialAppointments = [
  {
    id: 1,
    date: '2023-12-15',
    time: '10:00 AM',
    status: 'SCHEDULED',
    doctor: 'Dr. John Doe',
  },
];

const AppointmentList = ({ preselectedDoctorId }) => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
  });

  // Fetch the preselected doctor and their specialty
  const preselectedDoctor = doctors.find((doc) => doc.id === preselectedDoctorId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBookAppointment = () => {
    if (!formData.date || !formData.time) {
      alert('Please fill all fields.');
      return;
    }

    const newAppointment = {
      id: appointments.length + 1,
      date: formData.date,
      time: formData.time,
      status: 'SCHEDULED',
      doctor: preselectedDoctor.name,
    };

    setAppointments([...appointments, newAppointment]);
    setFormData({ date: '', time: '' });
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  return (
    <div>
      <h2>Your Appointments</h2>

      <div className="appointment-form">
        <h3>Book an Appointment</h3>
        <div>
          <label>Specialty:</label>
          <input
            type="text"
            value={preselectedDoctor?.specialty || ''}
            disabled
          />
        </div>
        <div>
          <label>Doctor:</label>
          <input
            type="text"
            value={preselectedDoctor?.name || ''}
            disabled
          />
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
