import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'PATIENT'
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
    const response = await fetch('http://localhost:8080/api/accounts/createAccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (response.ok) {
        const data = await response.json().catch(() => null); // Handle empty response
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000); // Hide after 5 seconds
    } else {
        console.error('Error creating account:', response.statusText);
    }
} catch (error) {
    console.error('Error creating account:', error);
}
  };

  return (
    <div className="full-page register-page" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
      <Navbar />
      {showSuccess && (
        <div className="alert alert-success position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: 1050 }}>
          <strong>Success!</strong> Your account has been created successfully.
        </div>
      )}
      <div className="container-fluid h-100">
        <div className="row h-100">
          {/* Left Side - Registration Form */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="register-form-wrapper" style={{ backgroundColor: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', color: 'var(--text-color)' }}>
              <div className="text-center mb-4">
                <img 
                  src="/telemed-logo.svg" 
                  alt="TeleMed Logo" 
                  className="mb-3" 
                  style={{ maxWidth: '200px' }} 
                />
                <h2 style={{ color: 'var(--text-color)' }}>Create Your Account</h2>
                <p className="text-muted" style={{ color: 'var(--text-color-light)' }}>Join TeleMed Healthcare Platform</p>
              </div>

              <form className="register-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label" style={{ color: 'var(--text-color)' }}>Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label" style={{ color: 'var(--text-color)' }}>Phone Number</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-phone"></i>
                    </span>
                    <input 
                      type="tel" 
                      className="form-control" 
                      id="phone" 
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="dateOfBirth" className="form-label" style={{ color: 'var(--text-color)' }}>Date of Birth</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-calendar"></i>
                    </span>
                    <input 
                      type="date" 
                      className="form-control" 
                      id="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="gender" className="form-label" style={{ color: 'var(--text-color)' }}>Gender</label>
                  <select className="form-select" id="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label" style={{ color: 'var(--text-color)' }}>Address</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-map-marker-alt"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="address" 
                      placeholder="Enter your address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label" style={{ color: 'var(--text-color)' }}>Username</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-user-tag"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="username" 
                      placeholder="Choose a username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label" style={{ color: 'var(--text-color)' }}>Email address</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label" style={{ color: 'var(--text-color)' }}>Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label" style={{ color: 'var(--text-color)' }}>Confirm Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="confirmPassword" 
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ color: 'var(--text-color)' }}>Account Type</label>
                  <div className="d-flex">
                    <div className="form-check me-3">
                      <input 
                        type="radio" 
                        className="form-check-input" 
                        id="patientType" 
                        name="accountType"
                        checked={formData.role === 'PATIENT'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="patientType" style={{ color: 'var(--text-color)' }}>
                        Patient
                      </label>
                    </div>
                    <div className="form-check">
                      <input 
                        type="radio" 
                        className="form-check-input" 
                        id="doctorType" 
                        name="accountType"
                        checked={formData.role === 'DOCTOR'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="doctorType" style={{ color: 'var(--text-color)' }}>
                        Doctor
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-3 form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="termsCheck"
                  />
                  <label className="form-check-label" htmlFor="termsCheck" style={{ color: 'var(--text-color)' }}>
                    I agree to the Terms and Conditions
                  </label>
                </div>

                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}
                  >
                    Sign Up
                  </button>
                </div>

                <div className="text-center mt-3">
                  <p>
                    Already have an account? 
                    <a href="/login" className="ms-2 text-primary">
                      Login
                    </a>
                  </p>
                </div>

                <div className="text-center mt-4">
                  <p className="text-muted">Or register with</p>
                  <div className="social-register">
                    <a href="#" className="btn btn-outline-primary me-2">
                      <i className="fab fa-google"></i>
                    </a>
                    <a href="#" className="btn btn-outline-primary me-2">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="btn btn-outline-primary">
                      <i className="fab fa-apple"></i>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side - Benefits Section */}
          <div className="col-md-6 register-info-section d-none d-md-flex" style={{ backgroundColor: 'var(--primary-color-dark)', color: 'white' }}>
            <div className="overlay"></div>
            <div className="content text-white p-5 align-self-center">
              <h2>Why Join TeleMed?</h2>
              <ul className="benefits-list">
                <li>
                  <i className="fas fa-check-circle me-2"></i>
                  Convenient Online Consultations
                </li>
                <li>
                  <i className="fas fa-check-circle me-2"></i>
                  Secure and Private Healthcare
                </li>
                <li>
                  <i className="fas fa-check-circle me-2"></i>
                  Access to Top Medical Professionals
                </li>
                <li>
                  <i className="fas fa-check-circle me-2"></i>
                  Personalized Health Tracking
                </li>
                <li>
                  <i className="fas fa-check-circle me-2"></i>
                  24/7 Medical Support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
