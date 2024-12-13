import React, { useState } from 'react';
import styles from './DoctorTestResults.module.css';

const DoctorTestResults = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    testName: '',
    result: '',
    resultType: 'PENDING'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/test-results`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Test result saved successfully!');
        setFormData({
          patientId: '',
          testName: '',
          result: '',
          resultType: 'PENDING'
        });
      }
    } catch (error) {
      console.error('Error saving test result:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Register Test Result</h2>
        <p>Enter patient's test results below</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Patient ID</label>
          <input
            type="text"
            value={formData.patientId}
            onChange={(e) => setFormData({...formData, patientId: e.target.value})}
            required
            placeholder="Enter patient ID"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Test Name</label>
          <input
            type="text"
            value={formData.testName}
            onChange={(e) => setFormData({...formData, testName: e.target.value})}
            required
            placeholder="Enter test name"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Result</label>
          <textarea
            value={formData.result}
            onChange={(e) => setFormData({...formData, result: e.target.value})}
            required
            placeholder="Enter test results"
            rows={4}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Result Type</label>
          <select
            value={formData.resultType}
            onChange={(e) => setFormData({...formData, resultType: e.target.value})}
            required
          >
            <option value="POSITIVE">Positive</option>
            <option value="NEGATIVE">Negative</option>
            <option value="INCONCLUSIVE">Inconclusive</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>

        

        <button type="submit" className={styles.submitButton}>
          Save Test Result
        </button>
      </form>
    </div>
  );
};

export default DoctorTestResults; 