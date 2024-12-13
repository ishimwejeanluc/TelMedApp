import React from 'react';
import './Sidebar.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUserMd, FaCalendarAlt, FaFileMedical, FaFlask, FaCog } from 'react-icons/fa';

const Sidebar = ({ activeItem, onMenuItemClick }) => {
  const { logout: authLogout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaHome /> },
    { id: 'appointments', label: 'Appointments', icon: <FaCalendarAlt /> },
    { id: 'medicalRecords', label: 'Medical Records', icon: <FaFileMedical /> },
    { id: 'testResults', label: 'Test Results', icon: <FaFlask /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> },
  ];

  const handleLogout = async () => {
    try {
      await authLogout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="sidebar">
      <h2>TeleMed</h2>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={activeItem === item.id ? 'active' : ''}
            onClick={() => onMenuItemClick(item.id)}
          >
            {item.icon} <span>{item.label}</span>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout} className="btn btn-danger logout-button">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
