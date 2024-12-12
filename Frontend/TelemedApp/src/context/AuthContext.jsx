import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);

  const login = async (data) => {
    try {
      console.log('Login data received:', data);

      // Store user data
      setUser(data.user);
      setIsAuthenticated(true);

      // If patient data is included in the response, store it directly
      if (data.patient) {
        console.log('Setting patient info:', data.patient);
        setPatientInfo(data.patient);
      } else {
        console.log('No patient data found in response. Full response:', data);
        // Try to get patient info using user ID
        if (data.user?.id) {
          await fetchPatientInfo(data.user.id);
        }
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const fetchPatientInfo = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/patients/user/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch patient info');

      const patientData = await response.json();
      console.log('Fetched patient data:', patientData);
      setPatientInfo(patientData);
    } catch (error) {
      console.error('Error fetching patient info:', error);
    }
  };

  const updatePatientInfo = (newInfo) => {
    setPatientInfo(newInfo);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setPatientInfo(null);
    // Navigate to home page after logout
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      patientInfo,
      login, 
      logout,
      updatePatientInfo 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
