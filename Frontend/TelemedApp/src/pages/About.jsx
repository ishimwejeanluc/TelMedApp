import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/pages.css';

function About() {
  return (
    <div className="about-page">
      <Navbar />
      
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="container hero-content">
          <div className="row align-items-center">
            <div className="col-md-6 animate-fadeInUp">
              <h1 className="display-4 text-white mb-4">About TeleMed</h1>
              <p className="lead text-white-50">
                Transforming Healthcare Delivery Through Technology
              </p>
              <p className="text-white-50">
                TeleMed is an innovative healthcare platform designed to bridge the gap between patients 
                and healthcare providers. Our mission is to make quality healthcare accessible, convenient, 
                and patient-centric.
              </p>
            </div>
            <div className="col-md-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <img 
                src="/medical-team.jpg" 
                alt="Medical Team" 
                className="img-fluid rounded-4 shadow-lg" 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="page-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature-card h-100">
                <h4 className="section-title h3">Our Values</h4>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <i className="fas fa-check-circle text-primary me-2"></i>
                    Patient-First Approach
                  </li>
                  <li className="mb-3">
                    <i className="fas fa-check-circle text-primary me-2"></i>
                    Technological Innovation
                  </li>
                  <li className="mb-3">
                    <i className="fas fa-check-circle text-primary me-2"></i>
                    Privacy and Security
                  </li>
                  <li className="mb-3">
                    <i className="fas fa-check-circle text-primary me-2"></i>
                    Accessibility
                  </li>
                  <li className="mb-3">
                    <i className="fas fa-check-circle text-primary me-2"></i>
                    Continuous Improvement
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="feature-card">
                <h3 className="section-title">How We Work</h3>
                <p className="lead text-muted">
                  TeleMed connects patients with licensed healthcare professionals through secure, 
                  high-quality video consultations. Our platform ensures seamless communication, 
                  easy appointment scheduling, and comprehensive medical record management.
                </p>
                <div className="row mt-5">
                  <div className="col-md-4 text-center">
                    <i className="fas fa-users fa-3x mb-3" style={{ color: 'var(--primary-color)' }}></i>
                    <h4 className="h5">1000+ Doctors</h4>
                  </div>
                  <div className="col-md-4 text-center">
                    <i className="fas fa-globe fa-3x mb-3" style={{ color: 'var(--primary-color)' }}></i>
                    <h4 className="h5">Nationwide Coverage</h4>
                  </div>
                  <div className="col-md-4 text-center">
                    <i className="fas fa-shield-alt fa-3x mb-3" style={{ color: 'var(--primary-color)' }}></i>
                    <h4 className="h5">HIPAA Compliant</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
