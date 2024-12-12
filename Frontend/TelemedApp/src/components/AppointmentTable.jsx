import React, { useState } from 'react';
import styles from './AppointmentTable.module.css';

// Mock data for appointments
const appointmentsData = [
  { id: 1, patientName: 'John Doe', time: '10:00 AM', status: 'Scheduled' },
  { id: 2, patientName: 'Jane Smith', time: '11:00 AM', status: 'Scheduled' },
  { id: 3, patientName: 'Sam Wilson', time: '12:00 PM', status: 'Completed' },
  { id: 4, patientName: 'Mary Johnson', time: '2:00 PM', status: 'Scheduled' },
  { id: 5, patientName: 'Robert Brown', time: '3:30 PM', status: 'Completed' },
];

// Add these icons (you can use any icon library you prefer)
const SearchIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

const ViewIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
  </svg>
);

const EditIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);

const AssignIcon = () => (
  <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const AppointmentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    patientName: '',
    time: '',
    status: ''
  });
  
  const itemsPerPage = 5;

  // Filter the data based on search inputs
  const filteredItems = appointmentsData.filter(appointment => {
    const nameMatch = appointment.patientName.toLowerCase().includes(filters.patientName.toLowerCase());
    const timeMatch = appointment.time.toLowerCase().includes(filters.time.toLowerCase());
    const statusMatch = appointment.status.toLowerCase().includes(filters.status.toLowerCase());
    return nameMatch && timeMatch && statusMatch;
  });
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleViewRecords = (id) => {
    console.log(`Viewing records for patient ID: ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Editing appointment ID: ${id}`);
  };

  const handleAssignResults = (id) => {
    console.log(`Assigning results for patient ID: ${id}`);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <div className={styles.columnHeader}>
                <span>Patient Name</span>
                <div className={styles.inputWrapper}>
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search name..."
                    value={filters.patientName}
                    onChange={(e) => handleFilterChange('patientName', e.target.value)}
                    className={styles.columnFilter}
                  />
                </div>
              </div>
            </th>
            <th>
              <div className={styles.columnHeader}>
                <span>Time</span>
                <input
                  type="text"
                  placeholder="Search time..."
                  value={filters.time}
                  onChange={(e) => handleFilterChange('time', e.target.value)}
                  className={styles.columnFilter}
                />
              </div>
            </th>
            <th>
              <div className={styles.columnHeader}>
                <span>Status</span>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className={styles.columnFilter}
                >
                  <option value="">All</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patientName}</td>
              <td>{appointment.time}</td>
              <td>
                <span 
                  className={`${styles.status} ${
                    appointment.status.toLowerCase() === 'completed' 
                      ? styles.completed 
                      : styles.pending
                  }`}
                >
                  {appointment.status}
                </span>
              </td>
              <td className={styles.actionButtons}>
                <button 
                  className={`${styles.actionButton} ${styles.viewButton}`}
                  onClick={() => handleViewRecords(appointment.id)}
                >
                  <ViewIcon />
                  View Records
                </button>
                <button 
                  className={`${styles.actionButton} ${styles.editButton}`}
                  onClick={() => handleEdit(appointment.id)}
                >
                  <EditIcon />
                  Edit
                </button>
                <button 
                  className={`${styles.actionButton} ${styles.assignButton}`}
                  onClick={() => handleAssignResults(appointment.id)}
                >
                  <AssignIcon />
                  Assign Results
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className={styles.pagination}>
        <button 
          className={styles.paginationButton}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>
        <span className={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button 
          className={styles.paginationButton}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default AppointmentTable;
