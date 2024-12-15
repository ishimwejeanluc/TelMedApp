import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/pages.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement contact form submission logic
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message. We will get back to you soon!');
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="container hero-content">
          <div className="text-center mb-5 animate-fadeInUp">
            <h1 className="display-4 text-white mb-3">Contact TeleMed</h1>
            <p className="lead text-white-50">
              We're here to help and answer any questions you might have
            </p>
          </div>
        </div>
      </section>

      <section className="page-section bg-light">
        <div className="container">
          <div className="row g-4">
            {/* Contact Form */}
            <div className="col-lg-7 animate-fadeInUp">
              <div className="feature-card h-100">
                <h2 className="section-title h3 mb-4">Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label">Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-user"></i>
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required 
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i>
                      </span>
                      <input 
                        type="email" 
                        className="form-control" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required 
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Phone Number (Optional)</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-phone"></i>
                      </span>
                      <input 
                        type="tel" 
                        className="form-control" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Your Message</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-message"></i>
                      </span>
                      <textarea 
                        className="form-control" 
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-gradient">
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-lg-5 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="feature-card mb-4">
                <h3 className="h4 mb-4">Contact Information</h3>
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3">
                    <i className="fas fa-location-dot fa-lg" style={{ color: 'var(--primary-color)' }}></i>
                  </div>
                  <div>
                    <h4 className="h6 mb-1">Address</h4>
                    <p className="mb-0 text-muted">123 Healthcare Lane, Medical City, HC 12345</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3">
                    <i className="fas fa-phone fa-lg" style={{ color: 'var(--primary-color)' }}></i>
                  </div>
                  <div>
                    <h4 className="h6 mb-1">Phone</h4>
                    <p className="mb-0 text-muted">(555) 123-4567</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <i className="fas fa-envelope fa-lg" style={{ color: 'var(--primary-color)' }}></i>
                  </div>
                  <div>
                    <h4 className="h6 mb-1">Email</h4>
                    <p className="mb-0 text-muted">support@telemed.com</p>
                  </div>
                </div>
              </div>

              <div className="feature-card">
                <h3 className="h4 mb-4">Support Hours</h3>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Monday - Friday</span>
                  <span className="fw-medium">8am - 8pm EST</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Saturday</span>
                  <span className="fw-medium">10am - 4pm EST</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Sunday</span>
                  <span className="fw-medium">Closed</span>
                </div>
              </div>

              <div className="info-section mt-4 text-center">
                <h3 className="h4 mb-4">Follow Us</h3>
                <div className="d-flex justify-content-center gap-4">
                  <a href="#" className="text-white text-decoration-none">
                    <i className="fab fa-facebook fa-2x"></i>
                  </a>
                  <a href="#" className="text-white text-decoration-none">
                    <i className="fab fa-twitter fa-2x"></i>
                  </a>
                  <a href="#" className="text-white text-decoration-none">
                    <i className="fab fa-instagram fa-2x"></i>
                  </a>
                  <a href="#" className="text-white text-decoration-none">
                    <i className="fab fa-linkedin fa-2x"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
