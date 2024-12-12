import React from 'react';
import Navbar from '../components/Navbar';

function About() {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h1>About TeleMed</h1>
            <p className="lead">Transforming Healthcare Delivery Through Technology</p>
            <p>
              TeleMed is an innovative healthcare platform designed to bridge the gap between patients 
              and healthcare providers. Our mission is to make quality healthcare accessible, convenient, 
              and patient-centric.
            </p>
            <h3 className="mt-4">Our Vision</h3>
            <p>
              We envision a world where healthcare is just a click away. By leveraging cutting-edge 
              technology, we aim to remove geographical and logistical barriers to medical consultations.
            </p>
          </div>
          <div className="col-md-6">
            <img 
              src="/medical-team.jpg" 
              alt="Medical Team" 
              className="img-fluid rounded shadow" 
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h4 className="card-title">Our Values</h4>
                <ul className="list-unstyled">
                  <li>✓ Patient-First Approach</li>
                  <li>✓ Technological Innovation</li>
                  <li>✓ Privacy and Security</li>
                  <li>✓ Accessibility</li>
                  <li>✓ Continuous Improvement</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <h3>How We Work</h3>
            <p>
              TeleMed connects patients with licensed healthcare professionals through secure, 
              high-quality video consultations. Our platform ensures seamless communication, 
              easy appointment scheduling, and comprehensive medical record management.
            </p>
            <div className="d-flex justify-content-between mt-4">
              <div className="text-center">
                <i className="fas fa-users fa-3x text-primary"></i>
                <p className="mt-2">1000+ Doctors</p>
              </div>
              <div className="text-center">
                <i className="fas fa-globe fa-3x text-primary"></i>
                <p className="mt-2">Nationwide Coverage</p>
              </div>
              <div className="text-center">
                <i className="fas fa-shield-alt fa-3x text-primary"></i>
                <p className="mt-2">HIPAA Compliant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
