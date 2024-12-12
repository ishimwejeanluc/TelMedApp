import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AppointmentList.css';
import Notification from '../Notification/Notification';
import ConfirmationModal from '../Modal/ConfirmationModal';

// Mock data for specialties
const specialties = [
  { id: 'cardiology', name: 'Cardiology' },
  { id: 'dermatology', name: 'Dermatology' },
  { id: 'neurology', name: 'Neurology' },
  { id: 'oncology', name: 'Oncology' },
  { id: 'ophthalmology', name: 'Ophthalmology' },
  { id: 'orthopedics', name: 'Orthopedics' },
  { id: 'pediatrics', name: 'Pediatrics' },
  { id: 'psychiatry', name: 'Psychiatry' }
];

const AppointmentList = () => {
  const { user, patientInfo, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
  });
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [notification, setNotification] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    appointmentId: null
  });
  const [isLoading, setIsLoading] = useState(true);

  // Add check for authentication and patient info
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!patientInfo) {
      showNotification('Patient information not found', 'error');
      return;
    }
  }, [isAuthenticated, patientInfo, navigate]);

  // Update useEffect to fetch doctors from API when specialty changes
  useEffect(() => {
    const fetchDoctors = async () => {
      if (selectedSpecialty) {
        try {
          // Capitalize first letter of specialty for API endpoint
          const capitalizedSpecialty = selectedSpecialty.charAt(0).toUpperCase() + selectedSpecialty.slice(1);
          const response = await fetch(`http://localhost:8080/api/doctors/specialization/${capitalizedSpecialty}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch doctors');
          }
          
          const data = await response.json();
          setAvailableDoctors(data); // Assuming the API returns an array of doctor objects
          setSelectedDoctor('');
        } catch (error) {
          console.error('Error fetching doctors:', error);
          setAvailableDoctors([]);
          setSelectedDoctor('');
        }
      }
    };

    fetchDoctors();
  }, [selectedSpecialty]);

  // Create a reusable function for fetching appointments
  const fetchPatientAppointments = async () => {
    if (!patientInfo) return;

    try {
      const response = await fetch(`http://localhost:8080/api/appointments/patient/${patientInfo.id}`);
      if (!response.ok) throw new Error('Failed to fetch appointments');

      const data = await response.json();
      console.log('Raw appointment data:', data);

      // Let's check the structure of a single appointment
      if (data.length > 0) {
        console.log('First appointment structure:', data[0]);
        console.log('Doctor info in first appointment:', data[0].doctor);
      }

      const formattedAppointments = data.map(apt => {
        console.log('Processing appointment:', apt);
        return {
          id: apt.id,
          date: apt.date,
          time: apt.time,
          doctor: apt.doctor?.name || `Doctor ID: ${apt.doctor_id}`,
          status: apt.status
        };
      });

      console.log('Formatted appointments:', formattedAppointments);
      setAppointments(formattedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      showNotification('Failed to load appointments', 'error');
    }
  };

  // Use it in useEffect
  useEffect(() => {
    fetchPatientAppointments();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // First, let's modify the setupAppointmentEdit function (previously handleUpdateAppointment)
  const setupAppointmentEdit = (appointment) => {
    const doctorObj = availableDoctors.find(doc => doc.name === appointment.doctor);
    setSelectedSpecialty(doctorObj?.specialization?.toLowerCase() || '');
    setSelectedDoctor(appointment.doctor);
    setFormData({
      date: appointment.date,
      time: appointment.time,
    });
    setEditingAppointment(appointment.id);
  };

  // Separate update function
  const handleUpdateAppointment = async () => {
    if (!patientInfo) {
      showNotification('Patient information not found', 'error');
      return;
    }

    if (!formData.date || !formData.time || !selectedDoctor) {
      showNotification('Please fill all fields and select a doctor.', 'error');
      return;
    }

    try {
      const selectedDoctorObj = availableDoctors.find(doc => doc.name === selectedDoctor);
      
      const appointmentData = {
        date: formData.date,
        time: formData.time,
        patient: {
          id: patientInfo.id
        },
        doctor: {
          id: selectedDoctorObj?.id
        },
        status: 'SCHEDULED'
      };

      const response = await fetch(`http://localhost:8080/api/appointments/${editingAppointment}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
      });

      const responseText = await response.text();
      let updatedAppointment;
      try {
        updatedAppointment = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response:', responseText);
        throw new Error('Invalid response format from server');
      }

      if (!response.ok) {
        throw new Error(`Failed to update appointment: ${responseText}`);
      }

      // Update the appointments list
      setAppointments(appointments.map(apt => 
        apt.id === editingAppointment ? {
          id: updatedAppointment.id,
          date: formData.date,
          time: formData.time,
          status: updatedAppointment.status,
          doctor: selectedDoctor
        } : apt
      ));

      // Reset form and editing state
      setFormData({ date: '', time: '' });
      setSelectedDoctor('');
      setSelectedSpecialty('');
      setEditingAppointment(null);

      showNotification('Appointment updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating appointment:', error);
      showNotification('Failed to update appointment. Please try again.', 'error');
    }
  };

  // Handle appointment booking or update
  const handleBookAppointment = async () => {
    if (!patientInfo) {
      showNotification('Patient information not found', 'error');
      return;
    }

    if (!formData.date || !formData.time || !selectedDoctor) {
      showNotification('Please fill all fields and select a doctor', 'error');
      return;
    }

    try {
      const selectedDoctorObj = availableDoctors.find(doc => doc.name === selectedDoctor);
      
      const appointmentData = {
        date: formData.date,
        time: formData.time,
        status: 'SCHEDULED'
      };

      const url = `http://localhost:8080/api/appointments?patientId=${encodeURIComponent(patientInfo.id)}&doctorId=${encodeURIComponent(selectedDoctorObj?.id)}`;

      console.log('Request URL:', url);
      console.log('Appointment Data being sent:', appointmentData);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
      });

      // First try to get the response as text
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let newAppointment;
      try {
        // Then try to parse it as JSON
        newAppointment = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error('Invalid response format from server');
      }

      if (!response.ok) {
        throw new Error(`Failed to book appointment: ${responseText}`);
      }

      // Fetch updated list instead of manually updating state
      await fetchPatientAppointments();

      // Reset form
      setFormData({ date: '', time: '' });
      setSelectedDoctor('');
      setSelectedSpecialty('');

      showNotification('Appointment booked successfully!', 'success');
    } catch (error) {
      console.error('Error booking appointment:', error);
      showNotification('Failed to book appointment', 'error');
    }
  };

  // Handle appointment deletion
  const handleDeleteAppointment = async (id) => {
    setConfirmModal({
      isOpen: true,
      appointmentId: id
    });
  };

  // Add this new function to handle the actual deletion
  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/appointments/${confirmModal.appointmentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }

      await fetchPatientAppointments();
      showNotification('Appointment deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      showNotification('Failed to delete appointment. Please try again.', 'error');
    } finally {
      // Close the modal after deletion (whether successful or not)
      setConfirmModal({ isOpen: false, appointmentId: null });
    }
  };

  // Add this helper function to show notifications
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  useEffect(() => {
    const loadPatientData = async () => {
      try {
        if (!patientInfo && user?.id) {
          // If we don't have patient info but have user ID, fetch it
          const response = await fetch(`http://localhost:8080/api/patients/user/${user.id}`);
          if (response.ok) {
            const data = await response.json();
            console.log('Fetched patient data:', data);
            // You'll need to add updatePatientInfo to your AuthContext
            updatePatientInfo(data);
          }
        }
      } catch (error) {
        console.error('Error loading patient data:', error);
      }
    };

    loadPatientData();
  }, [user?.id, patientInfo]);

  return (
    <div>
      {/* Add this near the top of your return statement */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Add the confirmation modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        message="Are you sure you want to delete this appointment?"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmModal({ isOpen: false, appointmentId: null })}
      />

      {/* Booking Form */}
      <div className="appointments-pages-container">
        <h3>{editingAppointment ? 'Update Appointment' : 'Book an Appointment'}</h3>
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
        <button 
          onClick={editingAppointment ? handleUpdateAppointment : handleBookAppointment}
        >
          {editingAppointment ? 'Update Appointment' : 'Book Appointment'}
        </button>
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
                <td className="action-buttons">
                  <button 
                    className="update-btn"
                    onClick={() => setupAppointmentEdit(appointment)}
                  >
                    Update
                  </button>
                  <button 
                    onClick={() => handleDeleteAppointment(appointment.id)}
                  >
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