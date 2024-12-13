import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'var(--surface-color)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src="/telemed-logo.svg" 
            alt="TeleMed Logo" 
            width="40" 
            height="40" 
            className="me-2" 
          />
          <span className="fw-bold" style={{ color: 'var(--primary-color)' }}>TeleMed</span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: 'var(--text-color)' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={{ color: 'var(--text-color)' }}>About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" style={{ color: 'var(--text-color)' }}>Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/doctors" style={{ color: 'var(--text-color)' }}>Doctors</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" style={{ color: 'var(--text-color)' }}>Login</Link>
            </li>
            

            <li className="nav-item">
              <Link 
                className="nav-link btn text-white rounded-pill px-3" 
                to="/register"
                style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
