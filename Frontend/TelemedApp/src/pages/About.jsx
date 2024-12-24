import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/pages.css';
import medicalTeamImage from '../assets/images/medicalteam.jpg';

function About() {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      description: "With over 15 years of experience in telemedicine"
    },
    {
      name: "Dr. Michael Chen",
      role: "Head of Technology",
      description: "Leading our digital healthcare innovations"
    },
    {
      name: "Dr. Lisa Williams",
      role: "Patient Care Director",
      description: "Ensuring the highest standards of patient care"
    }
  ];

  const achievements = [
    {
      number: "50,000+",
      label: "Patients Served",
      icon: "fa-users"
    },
    {
      number: "1,000+",
      label: "Healthcare Providers",
      icon: "fa-user-md"
    },
    {
      number: "98%",
      label: "Patient Satisfaction",
      icon: "fa-heart"
    }
  ];

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
                Revolutionizing Healthcare Through Digital Innovation
              </p>
              <p className="text-white-50">
                Founded in 2020, TeleMed has grown to become a leading telemedicine platform, 
                connecting patients with healthcare providers nationwide. Our mission is to make 
                quality healthcare accessible to everyone, anywhere.
              </p>
            </div>
            <div className="col-md-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <img 
                src={medicalTeamImage}
                alt="Medical Team" 
                className="img-fluid rounded-4 shadow-lg"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: '1rem'
                }}
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
                <h3 className="section-title">Our Impact</h3>
                <div className="row mt-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="col-md-4 text-center mb-4">
                      <i className={`fas ${achievement.icon} fa-2x mb-3 text-primary`}></i>
                      <h2 className="h1 fw-bold">{achievement.number}</h2>
                      <p className="text-muted">{achievement.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <h2 className="section-title text-center mb-5">Our Leadership Team</h2>
          <div className="row">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="feature-card text-center h-100">
                  <div className="mb-4">
                    <i className="fas fa-user-md fa-3x text-primary"></i>
                  </div>
                  <h3 className="h4 mb-3">{member.name}</h3>
                  <p className="text-primary mb-2">{member.role}</p>
                  <p className="text-muted">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
