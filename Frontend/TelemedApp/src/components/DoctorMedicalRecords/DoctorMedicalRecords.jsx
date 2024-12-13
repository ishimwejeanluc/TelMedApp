import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './DoctorMedicalRecords.module.css';

const MedicalRecords = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [doctorData, setDoctorData] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRecord, setNewRecord] = useState({
    condition: '',
    diagnosis: '',
    treatment: '',
    notes: ''
  });

  // First, fetch doctor details and then get their appointments
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'DOCTOR') {
      navigate('/unauthorized');
      return;
    }

    const fetchDoctorDataAndPatients = async () => {
      try {
        // First fetch doctor's details using the user ID
        const doctorResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/doctors/user/${user.id}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );

        if (!doctorResponse.ok) {
          throw new Error('Failed to fetch doctor data');
        }

        const doctorDetails = await doctorResponse.json();
        setDoctorData(doctorDetails);

        // Fetch scheduled patients directly using the new endpoint
        const scheduledPatientsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/appointments/doctor/${doctorDetails.id}/scheduled-patients`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );

        if (!scheduledPatientsResponse.ok) {
          throw new Error('Failed to fetch scheduled patients');
        }

        const scheduledPatients = await scheduledPatientsResponse.json();
        
        // Map the patients directly since they're already unique from the backend
        const formattedPatients = scheduledPatients.map(patient => ({
          id: patient.id,
          name: patient.name,
          email: patient.email
        }));
        
        setPatients(formattedPatients);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDataAndPatients();
  }, [isAuthenticated, user, navigate]);

  // Fetch medical records when doctorData is available
  useEffect(() => {
    const fetchMedicalRecords = async () => {
      if (!doctorData?.id) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/medicalrecords/doctor/${doctorData.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch medical records');
        }

        const records = await response.json();
        setMedicalRecords(records);
      } catch (error) {
        console.error('Error fetching medical records:', error);
        setError(error.message);
      }
    };

    fetchMedicalRecords();
  }, [doctorData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient || !doctorData?.id) return;

    try {
      const requestBody = {
        condition: newRecord.condition,
        treatment: newRecord.treatment,
        notes: newRecord.notes,
        recordDate: new Date().toISOString(),
        patient: {
          id: selectedPatient
        },
        doctor: {
          id: doctorData.id
        },
        diagnosisType: newRecord.diagnosis
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/medicalrecords/saveRecords`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add medical record');
      }

      const savedRecord = await response.json();
      
      // Add the new record to the existing records
      const formattedRecord = {
        id: savedRecord.id,
        date: savedRecord.recordDate,
        patient: {
          name: patients.find(p => p.id === selectedPatient)?.name,
          email: patients.find(p => p.id === selectedPatient)?.email
        },
        condition: savedRecord.condition,
        diagnosis: savedRecord.diagnosisType,
        treatment: savedRecord.treatment,
        notes: savedRecord.notes
      };

      setMedicalRecords(prevRecords => Array.isArray(prevRecords) ? [...prevRecords, formattedRecord] : [formattedRecord]);
      
      // Reset form
      setNewRecord({
        diagnosis: '',
        treatment: '',
        notes: '',
        condition: ''
      });
      setSelectedPatient('');

    } catch (error) {
      console.error('Error adding medical record:', error);
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Medical Records Management</h1>
        <p>Create and manage patient medical records</p>
        {doctorData && (
          <div className={styles.doctorInfo}>
            <p>Dr. {doctorData.name}</p>
            <p>Specialization: {doctorData.specialization}</p>
          </div>
        )}
      </header>

      <section className={styles.formSection}>
        <div className={styles.sectionHeader}>
          <h2>Add New Medical Record</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="patient">Patient</label>
            <select
              id="patient"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              required
            >
              <option value="">Select Patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="condition">Condition</label>
            <input
              id="condition"
              type="text"
              placeholder="Enter patient's condition"
              value={newRecord.condition}
              onChange={(e) => setNewRecord({...newRecord, condition: e.target.value})}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="diagnosis">Diagnosis Type</label>
            <select
              id="diagnosis"
              value={newRecord.diagnosis}
              onChange={(e) => setNewRecord({...newRecord, diagnosis: e.target.value})}
              required
            >
              <option value="">Select Diagnosis Type</option>
              <option value="GENERAL">General - Common health concerns</option>
              <option value="CHRONIC">Chronic - Long-term conditions</option>
              <option value="ACUTE">Acute - Short-term urgent conditions</option>
              <option value="PREVENTIVE">Preventive - Preventive care</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="treatment">Treatment</label>
            <input
              id="treatment"
              type="text"
              placeholder="Enter treatment details"
              value={newRecord.treatment}
              onChange={(e) => setNewRecord({...newRecord, treatment: e.target.value})}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              placeholder="Add any additional notes"
              value={newRecord.notes}
              onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Add Medical Record
          </button>
        </form>
      </section>

      <section className={styles.recordsSection}>
        <div className={styles.sectionHeader}>
          <h2>Medical Records History</h2>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Patient Name</th>
                <th>Condition</th>
                <th>Diagnosis</th>
                <th>treatment</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {medicalRecords.length > 0 ? (
                medicalRecords.map((record) => (
                  record && (
                    <tr key={record.id || Math.random()}>
                      <td>
                        <div className={styles.dateCell}>
                          <span className={styles.date}>
                            {record.date ? new Date(record.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            }) : 'N/A'}
                          </span>
                          <span className={styles.time}>
                            {record.date ? new Date(record.date).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : ''}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className={styles.patientCell}>
                          <span className={styles.patientName}>
                            {record.patient?.name || 'Unknown Patient'}
                          </span>
                          <span className={styles.patientEmail}>
                            {record.patient?.email || 'No email'}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className={styles.conditionCell}>
                          {record.condition || 'No condition specified'}
                        </div>
                      </td>
                      <td>
                        <span className={`${styles.diagnosisType} ${styles[record.diagnosis?.toLowerCase() || 'general']}`}>
                          {record.diagnosis || 'Not specified'}
                        </span>
                      </td>
                      <td>
                        <div className={styles.treatmentCell}>
                          {record.treatment || 'No prescription'}
                        </div>
                      </td>
                      <td>
                        <div className={styles.notesCell}>
                          {record.notes || 'No notes'}
                        </div>
                      </td>
                      <td>
                        <span className={`${styles.status} ${styles.completed}`}>
                          Completed
                        </span>
                      </td>
                    </tr>
                  )
                ))
              ) : (
                <tr>
                  <td colSpan="5" className={styles.noData}>
                    No medical records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default MedicalRecords;